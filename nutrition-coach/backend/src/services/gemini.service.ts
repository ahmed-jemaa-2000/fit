import { GoogleGenerativeAI } from '@google/generative-ai';
import { config } from '../config/env';
import { UserProfile, Meal } from '@prisma/client';

const genAI = new GoogleGenerativeAI(config.gemini.apiKey);

export class GeminiService {
  private model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

  /**
   * Generate nutrition coaching advice
   */
  async getCoachingAdvice(params: {
    userProfile: UserProfile;
    recentMeals: Meal[];
    userMessage: string;
  }): Promise<string> {
    const { userProfile, recentMeals, userMessage } = params;

    const contextPrompt = this.buildContextPrompt(userProfile, recentMeals);
    const fullPrompt = `${contextPrompt}\n\nUser: ${userMessage}\n\nAs a professional nutritionist and personal coach, provide helpful, encouraging, and evidence-based advice:`;

    const result = await this.model.generateContent(fullPrompt);
    const response = await result.response;
    return response.text();
  }

  /**
   * Suggest meals based on user goals and remaining macros
   */
  async suggestMeals(params: {
    userProfile: UserProfile;
    dailyNutrition: {
      totalCalories: number;
      totalProteinG: number;
      totalCarbsG: number;
      totalFatG: number;
    };
    mealType: string;
  }): Promise<string> {
    const { userProfile, dailyNutrition, mealType } = params;

    const remainingCalories = userProfile.targetCalories - dailyNutrition.totalCalories;
    const remainingProtein = userProfile.targetProteinG - dailyNutrition.totalProteinG;
    const remainingCarbs = userProfile.targetCarbsG - dailyNutrition.totalCarbsG;
    const remainingFat = userProfile.targetFatG - dailyNutrition.totalFatG;

    const prompt = `As a professional nutritionist, suggest 3 specific meal ideas for ${mealType}.

User Profile:
- Goal: ${userProfile.goal}
- Dietary Restrictions: ${userProfile.dietaryRestrictions.join(', ') || 'None'}
- Allergies: ${userProfile.allergies.join(', ') || 'None'}

Remaining Daily Targets:
- Calories: ${remainingCalories} kcal
- Protein: ${remainingProtein}g
- Carbs: ${remainingCarbs}g
- Fat: ${remainingFat}g

Please provide:
1. Meal name
2. Brief ingredients list
3. Approximate nutrition (calories, protein, carbs, fat)
4. Why it fits their goals

Keep suggestions realistic, delicious, and aligned with their targets.`;

    const result = await this.model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  }

  /**
   * Analyze nutrition progress and provide insights
   */
  async analyzeProgress(params: {
    userProfile: UserProfile;
    weeklyMeals: Meal[];
  }): Promise<string> {
    const { userProfile, weeklyMeals } = params;

    const totalCalories = weeklyMeals.reduce((sum, meal) => sum + meal.calories, 0);
    const avgDailyCalories = Math.round(totalCalories / 7);
    const totalProtein = weeklyMeals.reduce((sum, meal) => sum + meal.proteinG, 0);
    const avgDailyProtein = Math.round(totalProtein / 7);

    const prompt = `As a professional nutritionist, analyze this user's week of nutrition:

User Profile:
- Goal: ${userProfile.goal}
- Target Calories: ${userProfile.targetCalories}/day
- Target Protein: ${userProfile.targetProteinG}g/day

This Week's Performance:
- Meals Logged: ${weeklyMeals.length}
- Avg Daily Calories: ${avgDailyCalories} (target: ${userProfile.targetCalories})
- Avg Daily Protein: ${avgDailyProtein}g (target: ${userProfile.targetProteinG}g)

Provide:
1. Progress assessment (honest but encouraging)
2. What they're doing well
3. Areas for improvement
4. One actionable tip for next week

Be supportive, specific, and professional.`;

    const result = await this.model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  }

  /**
   * Generate a complete daily meal plan
   */
  async generateDailyPlan(params: {
    userProfile: UserProfile;
  }): Promise<string> {
    const { userProfile } = params;

    const likedFoods = (userProfile as any).likedFoods?.join(', ') || 'No specific preferences';
    const dislikedFoods = (userProfile as any).dislikedFoods?.join(', ') || 'None';

    const prompt = `You are a professional nutritionist creating a personalized daily meal plan.

User Profile:
- Age: ${userProfile.age}, Gender: ${userProfile.gender}
- Weight: ${userProfile.weightKg}kg, Height: ${userProfile.heightCm}cm
- Activity Level: ${userProfile.activityLevel}
- Goal: ${userProfile.goal}
- Dietary Restrictions: ${userProfile.dietaryRestrictions.join(', ') || 'None'}
- Allergies: ${userProfile.allergies.join(', ') || 'None'}
- Liked Foods: ${likedFoods}
- Disliked Foods: ${dislikedFoods}

Daily Targets:
- Calories: ${userProfile.targetCalories} kcal
- Protein: ${userProfile.targetProteinG}g
- Carbs: ${userProfile.targetCarbsG}g
- Fat: ${userProfile.targetFatG}g

Create a complete daily meal plan with EXACTLY this JSON format (no markdown, just pure JSON):
{
  "meals": [
    {
      "mealType": "BREAKFAST",
      "name": "Meal name",
      "description": "Brief description with ingredients",
      "calories": 500,
      "proteinG": 30,
      "carbsG": 50,
      "fatG": 15
    },
    {
      "mealType": "LUNCH",
      "name": "Meal name",
      "description": "Brief description with ingredients",
      "calories": 700,
      "proteinG": 45,
      "carbsG": 70,
      "fatG": 20
    },
    {
      "mealType": "DINNER",
      "name": "Meal name",
      "description": "Brief description with ingredients",
      "calories": 600,
      "proteinG": 40,
      "carbsG": 55,
      "fatG": 18
    },
    {
      "mealType": "SNACK",
      "name": "Snack name",
      "description": "Brief description",
      "calories": 200,
      "proteinG": 10,
      "carbsG": 25,
      "fatG": 5
    }
  ],
  "totalCalories": 2000,
  "totalProtein": 125,
  "totalCarbs": 200,
  "totalFat": 58,
  "summary": "Brief summary of the meal plan and why it fits their goals"
}

IMPORTANT:
1. Use the user's LIKED FOODS as much as possible
2. AVOID all disliked foods and allergens
3. Respect dietary restrictions
4. Make totals add up close to daily targets
5. Return ONLY valid JSON, no additional text`;

    const result = await this.model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  }

  /**
   * Generate a budget-aware daily meal plan using grocery items
   * AI will estimate nutrition and serving sizes
   */
  async generateDailyPlanWithBudget(params: {
    userProfile: UserProfile;
    groceryItems: Array<{
      name: string;
      packagePrice: number;
      packageSize: number;
      packageUnit: string;
      difficulty: string;
    }>;
  }): Promise<string> {
    const { userProfile, groceryItems } = params;

    const budget = (userProfile as any).dailyBudget || 'No limit';
    const maxDifficulty = (userProfile as any).cookingPreference || 'EASY';
    const likedFoods = (userProfile as any).likedFoods?.join(', ') || 'No specific preferences';
    const dislikedFoods = (userProfile as any).dislikedFoods?.join(', ') || 'None';

    // Format grocery items for the prompt - AI will estimate nutrition
    const groceryList = groceryItems.length > 0
      ? groceryItems.map(item =>
        `- ${item.name}: €${item.packagePrice} for ${item.packageSize}${item.packageUnit}, cooking: ${item.difficulty}`
      ).join('\n')
      : 'No grocery items added yet. Suggest general affordable meals.';

    const difficultyOrder = ['NO_COOKING', 'VERY_EASY', 'EASY', 'MEDIUM', 'COMPLEX'];
    const maxDifficultyIndex = difficultyOrder.indexOf(maxDifficulty);
    const allowedDifficulties = difficultyOrder.slice(0, maxDifficultyIndex + 1).join(', ');

    const prompt = `You are a professional nutritionist creating a BUDGET-FRIENDLY, EASY-TO-MAKE daily meal plan.

User Profile:
- Age: ${userProfile.age}, Gender: ${userProfile.gender}
- Activity Level: ${userProfile.activityLevel}
- Goal: ${userProfile.goal}
- Dietary Restrictions: ${userProfile.dietaryRestrictions.join(', ') || 'None'}
- Allergies: ${userProfile.allergies.join(', ') || 'None'}
- Liked Foods: ${likedFoods}
- Disliked Foods: ${dislikedFoods}

IMPORTANT CONSTRAINTS:
- Daily Budget: €${budget}
- Cooking Preference: ${maxDifficulty} (only use foods with difficulty: ${allowedDifficulties})

Nutrition Targets:
- Calories: ${userProfile.targetCalories} kcal
- Protein: ${userProfile.targetProteinG}g
- Carbs: ${userProfile.targetCarbsG}g
- Fat: ${userProfile.targetFatG}g

Available Grocery Items (USE THESE):
${groceryList}

Create a meal plan using the AVAILABLE GROCERY ITEMS. Return EXACTLY this JSON format:
{
  "meals": [
    {
      "mealType": "BREAKFAST",
      "name": "Meal name",
      "description": "Brief description with ingredients",
      "ingredients": ["item1", "item2"],
      "calories": 500,
      "proteinG": 30,
      "carbsG": 50,
      "fatG": 15,
      "cost": 2.50,
      "prepTime": "5 min"
    },
    {
      "mealType": "LUNCH",
      "name": "Meal name",
      "description": "Brief description",
      "ingredients": ["item1", "item2"],
      "calories": 700,
      "proteinG": 45,
      "carbsG": 70,
      "fatG": 20,
      "cost": 3.50,
      "prepTime": "10 min"
    },
    {
      "mealType": "DINNER",
      "name": "Meal name",
      "description": "Brief description",
      "ingredients": ["item1", "item2"],
      "calories": 600,
      "proteinG": 40,
      "carbsG": 55,
      "fatG": 18,
      "cost": 4.00,
      "prepTime": "15 min"
    },
    {
      "mealType": "SNACK",
      "name": "Snack name",
      "description": "Brief description",
      "ingredients": ["item1"],
      "calories": 200,
      "proteinG": 10,
      "carbsG": 25,
      "fatG": 5,
      "cost": 1.00,
      "prepTime": "0 min"
    }
  ],
  "totalCalories": 2000,
  "totalProtein": 125,
  "totalCarbs": 200,
  "totalFat": 58,
  "totalCost": 11.00,
  "budgetStatus": "Under budget by €1.00",
  "summary": "Budget-friendly meal plan summary"
}

CRITICAL RULES:
1. STAY WITHIN BUDGET (€${budget}/day)
2. Only use meals with allowed cooking difficulty (${allowedDifficulties})
3. Use the user's grocery items when available
4. Keep prep times SHORT
5. Return ONLY valid JSON, no markdown`;

    const result = await this.model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  }

  /**
   * Build context prompt for chat
   */
  private buildContextPrompt(
    userProfile: UserProfile,
    recentMeals: Meal[]
  ): string {
    const todaysMeals = recentMeals.filter((meal) => {
      const today = new Date();
      const mealDate = new Date(meal.consumedAt);
      return mealDate.toDateString() === today.toDateString();
    });

    const todaysCalories = todaysMeals.reduce(
      (sum, meal) => sum + meal.calories,
      0
    );
    const todaysProtein = todaysMeals.reduce(
      (sum, meal) => sum + meal.proteinG,
      0
    );

    return `You are a professional nutritionist and personal coach. Be supportive, evidence-based, and helpful.

User Profile:
- Age: ${userProfile.age}
- Gender: ${userProfile.gender}
- Weight: ${userProfile.weightKg}kg
- Height: ${userProfile.heightCm}cm
- Activity Level: ${userProfile.activityLevel}
- Goal: ${userProfile.goal}
- Dietary Restrictions: ${userProfile.dietaryRestrictions.join(', ') || 'None'}
- Allergies: ${userProfile.allergies.join(', ') || 'None'}

Daily Targets:
- Calories: ${userProfile.targetCalories}
- Protein: ${userProfile.targetProteinG}g
- Carbs: ${userProfile.targetCarbsG}g
- Fat: ${userProfile.targetFatG}g

Today's Progress:
- Calories: ${todaysCalories}/${userProfile.targetCalories}
- Protein: ${Math.round(todaysProtein)}g/${userProfile.targetProteinG}g
- Meals logged: ${todaysMeals.length}`;
  }
}

export const geminiService = new GeminiService();
