import { Response } from 'express';
import { z } from 'zod';
import { AuthRequest } from '../middleware/auth';
import { prisma } from '../config/database';
import { geminiService } from '../services/gemini.service';
import { startOfDay, subDays, endOfDay } from 'date-fns';

const chatSchema = z.object({
  message: z.string().min(1),
});

const suggestMealsSchema = z.object({
  mealType: z.enum(['BREAKFAST', 'LUNCH', 'DINNER', 'SNACK']),
});

export class AIController {
  /**
   * POST /api/ai/chat
   */
  async chat(req: AuthRequest, res: Response): Promise<void> {
    try {
      const userId = req.userId!;
      const data = chatSchema.parse(req.body);

      // Get user profile
      const profile = await prisma.userProfile.findUnique({
        where: { userId },
      });

      if (!profile) {
        res.status(400).json({ error: 'Please complete your profile first' });
        return;
      }

      // Get recent meals (last 7 days)
      const recentMeals = await prisma.meal.findMany({
        where: {
          userId,
          consumedAt: {
            gte: subDays(new Date(), 7),
          },
        },
        orderBy: { consumedAt: 'desc' },
        take: 50,
      });

      // Save user message
      await prisma.chatMessage.create({
        data: {
          userId,
          role: 'USER',
          content: data.message,
        },
      });

      // Get AI response
      const aiResponse = await geminiService.getCoachingAdvice({
        userProfile: profile,
        recentMeals,
        userMessage: data.message,
      });

      // Save AI message
      await prisma.chatMessage.create({
        data: {
          userId,
          role: 'ASSISTANT',
          content: aiResponse,
        },
      });

      res.json({ message: aiResponse });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: 'Validation error', details: error.errors });
        return;
      }
      throw error;
    }
  }

  /**
   * GET /api/ai/chat/history
   */
  async getChatHistory(req: AuthRequest, res: Response): Promise<void> {
    const userId = req.userId!;
    const limit = parseInt(req.query.limit as string) || 50;

    const messages = await prisma.chatMessage.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });

    res.json(messages.reverse());
  }

  /**
   * POST /api/ai/suggest-meals
   */
  async suggestMeals(req: AuthRequest, res: Response): Promise<void> {
    try {
      const userId = req.userId!;
      const data = suggestMealsSchema.parse(req.body);

      // Get user profile
      const profile = await prisma.userProfile.findUnique({
        where: { userId },
      });

      if (!profile) {
        res.status(400).json({ error: 'Please complete your profile first' });
        return;
      }

      // Get today's nutrition
      const today = startOfDay(new Date());
      const dailyNutrition = await prisma.dailyNutrition.findUnique({
        where: {
          userId_date: {
            userId,
            date: today,
          },
        },
      });

      const currentNutrition = dailyNutrition || {
        totalCalories: 0,
        totalProteinG: 0,
        totalCarbsG: 0,
        totalFatG: 0,
      };

      // Get suggestions
      const suggestions = await geminiService.suggestMeals({
        userProfile: profile,
        dailyNutrition: currentNutrition,
        mealType: data.mealType,
      });

      res.json({ suggestions });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: 'Validation error', details: error.errors });
        return;
      }
      throw error;
    }
  }

  /**
   * GET /api/ai/progress-analysis
   */
  async getProgressAnalysis(req: AuthRequest, res: Response): Promise<void> {
    const userId = req.userId!;

    // Get user profile
    const profile = await prisma.userProfile.findUnique({
      where: { userId },
    });

    if (!profile) {
      res.status(400).json({ error: 'Please complete your profile first' });
      return;
    }

    // Get last 7 days of meals
    const weekStart = startOfDay(subDays(new Date(), 7));
    const weekEnd = endOfDay(new Date());

    const weeklyMeals = await prisma.meal.findMany({
      where: {
        userId,
        consumedAt: {
          gte: weekStart,
          lte: weekEnd,
        },
      },
      orderBy: { consumedAt: 'desc' },
    });

    // Get analysis
    const analysis = await geminiService.analyzeProgress({
      userProfile: profile,
      weeklyMeals,
    });

    res.json({ analysis });
  }

  /**
   * POST /api/ai/generate-daily-plan
   */
  async generateDailyPlan(req: AuthRequest, res: Response): Promise<void> {
    const userId = req.userId!;

    // Get user profile
    const profile = await prisma.userProfile.findUnique({
      where: { userId },
    });

    if (!profile) {
      res.status(400).json({ error: 'Please complete your profile first' });
      return;
    }

    // Get user's grocery items
    const groceryItems = await prisma.groceryItem.findMany({
      where: { userId },
      orderBy: { name: 'asc' },
    });

    // Simplify grocery data for AI - just name, price, size, difficulty
    const simplifiedGrocery = groceryItems.map(item => ({
      name: item.name,
      packagePrice: item.packagePrice,
      packageSize: item.packageSize,
      packageUnit: item.packageUnit,
      difficulty: item.difficulty,
    }));

    try {
      // Generate meal plan with grocery items
      const planJson = await geminiService.generateDailyPlanWithBudget({
        userProfile: profile,
        groceryItems: simplifiedGrocery,
      });

      // Try to parse JSON response
      let plan;
      try {
        // Clean up potential markdown formatting
        const cleanJson = planJson.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        plan = JSON.parse(cleanJson);
      } catch {
        // If parsing fails, return raw response
        res.json({ rawPlan: planJson });
        return;
      }

      res.json(plan);
    } catch (error) {
      res.status(500).json({ error: 'Failed to generate meal plan' });
    }
  }
}

export const aiController = new AIController();
