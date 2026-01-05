import { Response } from 'express';
import { z } from 'zod';
import { AuthRequest } from '../middleware/auth';
import { prisma } from '../config/database';
import { calculateNutritionTargets } from '../utils/nutrition-calculator';
import { ActivityLevel, FitnessGoal, Gender } from '@prisma/client';

const createProfileSchema = z.object({
  age: z.number().int().min(13).max(120),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER']),
  weightKg: z.number().min(20).max(300),
  heightCm: z.number().min(100).max(250),
  activityLevel: z.enum([
    'SEDENTARY',
    'LIGHT',
    'MODERATE',
    'ACTIVE',
    'VERY_ACTIVE',
  ]),
  goal: z.enum([
    'LOSE_WEIGHT',
    'MAINTAIN',
    'GAIN_WEIGHT',
    'BUILD_MUSCLE',
  ]),
  dietaryRestrictions: z.array(z.string()).optional().default([]),
  allergies: z.array(z.string()).optional().default([]),
  likedFoods: z.array(z.string()).optional().default([]),
  dislikedFoods: z.array(z.string()).optional().default([]),
  dailyBudget: z.number().positive().optional().nullable(),
  cookingPreference: z.enum(['NO_COOKING', 'VERY_EASY', 'EASY', 'MEDIUM', 'COMPLEX']).optional().nullable(),
});

export class ProfileController {
  /**
   * POST /api/profile
   */
  async createProfile(req: AuthRequest, res: Response): Promise<void> {
    try {
      const userId = req.userId!;
      const data = createProfileSchema.parse(req.body);

      // Calculate nutrition targets
      const targets = calculateNutritionTargets({
        age: data.age,
        gender: data.gender as Gender,
        weightKg: data.weightKg,
        heightCm: data.heightCm,
        activityLevel: data.activityLevel as ActivityLevel,
        goal: data.goal as FitnessGoal,
      });

      // Create or update profile
      const profile = await prisma.userProfile.upsert({
        where: { userId },
        create: {
          userId,
          ...data,
          targetCalories: targets.calories,
          targetProteinG: targets.proteinG,
          targetCarbsG: targets.carbsG,
          targetFatG: targets.fatG,
        },
        update: {
          ...data,
          targetCalories: targets.calories,
          targetProteinG: targets.proteinG,
          targetCarbsG: targets.carbsG,
          targetFatG: targets.fatG,
        },
      });

      res.json(profile);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: 'Validation error', details: error.errors });
        return;
      }
      throw error;
    }
  }

  /**
   * GET /api/profile
   */
  async getProfile(req: AuthRequest, res: Response): Promise<void> {
    const userId = req.userId!;

    const profile = await prisma.userProfile.findUnique({
      where: { userId },
    });

    if (!profile) {
      res.status(404).json({ error: 'Profile not found' });
      return;
    }

    res.json(profile);
  }

  /**
   * PATCH /api/profile
   */
  async updateProfile(req: AuthRequest, res: Response): Promise<void> {
    try {
      const userId = req.userId!;
      const data = createProfileSchema.partial().parse(req.body);

      // Get existing profile
      const existingProfile = await prisma.userProfile.findUnique({
        where: { userId },
      });

      if (!existingProfile) {
        res.status(404).json({ error: 'Profile not found' });
        return;
      }

      // Merge data
      const mergedData = { ...existingProfile, ...data };

      // Recalculate targets if relevant fields changed
      let targets;
      if (
        data.age ||
        data.gender ||
        data.weightKg ||
        data.heightCm ||
        data.activityLevel ||
        data.goal
      ) {
        targets = calculateNutritionTargets({
          age: mergedData.age,
          gender: mergedData.gender,
          weightKg: mergedData.weightKg,
          heightCm: mergedData.heightCm,
          activityLevel: mergedData.activityLevel,
          goal: mergedData.goal,
        });
      }

      // Update profile
      const profile = await prisma.userProfile.update({
        where: { userId },
        data: {
          ...data,
          ...(targets && {
            targetCalories: targets.calories,
            targetProteinG: targets.proteinG,
            targetCarbsG: targets.carbsG,
            targetFatG: targets.fatG,
          }),
        },
      });

      res.json(profile);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: 'Validation error', details: error.errors });
        return;
      }
      throw error;
    }
  }
}

export const profileController = new ProfileController();
