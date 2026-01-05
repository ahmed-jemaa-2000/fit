import { ActivityLevel, FitnessGoal, Gender } from '@prisma/client';

interface UserMetrics {
  age: number;
  gender: Gender;
  weightKg: number;
  heightCm: number;
  activityLevel: ActivityLevel;
  goal: FitnessGoal;
}

interface NutritionTargets {
  calories: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
}

// Mifflin-St Jeor BMR Calculation
function calculateBMR(
  weightKg: number,
  heightCm: number,
  age: number,
  gender: Gender
): number {
  const baseCalories = 10 * weightKg + 6.25 * heightCm - 5 * age;
  return gender === 'MALE' ? baseCalories + 5 : baseCalories - 161;
}

// Activity multipliers
const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, number> = {
  SEDENTARY: 1.2,
  LIGHT: 1.375,
  MODERATE: 1.55,
  ACTIVE: 1.725,
  VERY_ACTIVE: 1.9,
};

// Goal adjustments (calories +/-)
const GOAL_ADJUSTMENTS: Record<FitnessGoal, number> = {
  LOSE_WEIGHT: -500,
  MAINTAIN: 0,
  GAIN_WEIGHT: 300,
  BUILD_MUSCLE: 400,
};

export function calculateNutritionTargets(
  metrics: UserMetrics
): NutritionTargets {
  // Calculate BMR
  const bmr = calculateBMR(
    metrics.weightKg,
    metrics.heightCm,
    metrics.age,
    metrics.gender
  );

  // Calculate TDEE (Total Daily Energy Expenditure)
  const tdee = bmr * ACTIVITY_MULTIPLIERS[metrics.activityLevel];

  // Adjust for goal
  const targetCalories = Math.round(
    tdee + GOAL_ADJUSTMENTS[metrics.goal]
  );

  // Macro distribution based on goal
  let proteinG: number;
  let fatG: number;
  let carbsG: number;

  switch (metrics.goal) {
    case 'BUILD_MUSCLE':
      // High protein: 2.2g/kg bodyweight
      proteinG = Math.round(metrics.weightKg * 2.2);
      // Moderate fat: 25% of calories
      fatG = Math.round((targetCalories * 0.25) / 9);
      // Rest from carbs
      carbsG = Math.round(
        (targetCalories - proteinG * 4 - fatG * 9) / 4
      );
      break;

    case 'LOSE_WEIGHT':
      // High protein for satiety: 2.0g/kg
      proteinG = Math.round(metrics.weightKg * 2.0);
      // Lower fat: 20% of calories
      fatG = Math.round((targetCalories * 0.2) / 9);
      // Rest from carbs
      carbsG = Math.round(
        (targetCalories - proteinG * 4 - fatG * 9) / 4
      );
      break;

    case 'GAIN_WEIGHT':
      // Moderate protein: 1.8g/kg
      proteinG = Math.round(metrics.weightKg * 1.8);
      // Moderate fat: 30% of calories
      fatG = Math.round((targetCalories * 0.3) / 9);
      // Higher carbs for energy
      carbsG = Math.round(
        (targetCalories - proteinG * 4 - fatG * 9) / 4
      );
      break;

    case 'MAINTAIN':
    default:
      // Balanced: 1.6g/kg protein
      proteinG = Math.round(metrics.weightKg * 1.6);
      // Moderate fat: 25% of calories
      fatG = Math.round((targetCalories * 0.25) / 9);
      // Rest from carbs
      carbsG = Math.round(
        (targetCalories - proteinG * 4 - fatG * 9) / 4
      );
  }

  return {
    calories: targetCalories,
    proteinG,
    carbsG,
    fatG,
  };
}
