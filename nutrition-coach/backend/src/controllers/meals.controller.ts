import { Response } from 'express';
import { z } from 'zod';
import { AuthRequest } from '../middleware/auth';
import { prisma } from '../config/database';
import { startOfDay, endOfDay } from 'date-fns';

const createMealSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  mealType: z.enum(['BREAKFAST', 'LUNCH', 'DINNER', 'SNACK']),
  consumedAt: z.string().datetime().optional(),
  calories: z.number().int().min(0),
  proteinG: z.number().min(0),
  carbsG: z.number().min(0),
  fatG: z.number().min(0),
  fiberG: z.number().min(0).optional(),
  notes: z.string().optional(),
});

export class MealsController {
  /**
   * POST /api/meals
   */
  async createMeal(req: AuthRequest, res: Response): Promise<void> {
    try {
      const userId = req.userId!;
      const data = createMealSchema.parse(req.body);

      const meal = await prisma.meal.create({
        data: {
          userId,
          name: data.name,
          description: data.description,
          mealType: data.mealType,
          consumedAt: data.consumedAt ? new Date(data.consumedAt) : new Date(),
          calories: data.calories,
          proteinG: data.proteinG,
          carbsG: data.carbsG,
          fatG: data.fatG,
          fiberG: data.fiberG,
          notes: data.notes,
        },
      });

      // Update daily nutrition aggregate
      await this.updateDailyNutrition(userId, meal.consumedAt);

      res.status(201).json(meal);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: 'Validation error', details: error.errors });
        return;
      }
      throw error;
    }
  }

  /**
   * GET /api/meals?date=YYYY-MM-DD
   */
  async getMeals(req: AuthRequest, res: Response): Promise<void> {
    const userId = req.userId!;
    const dateParam = req.query.date as string | undefined;

    let whereClause: any = { userId };

    if (dateParam) {
      const date = new Date(dateParam);
      whereClause.consumedAt = {
        gte: startOfDay(date),
        lte: endOfDay(date),
      };
    }

    const meals = await prisma.meal.findMany({
      where: whereClause,
      orderBy: { consumedAt: 'desc' },
    });

    res.json(meals);
  }

  /**
   * GET /api/meals/:id
   */
  async getMeal(req: AuthRequest, res: Response): Promise<void> {
    const userId = req.userId!;
    const { id } = req.params;

    const meal = await prisma.meal.findFirst({
      where: { id, userId },
    });

    if (!meal) {
      res.status(404).json({ error: 'Meal not found' });
      return;
    }

    res.json(meal);
  }

  /**
   * PATCH /api/meals/:id
   */
  async updateMeal(req: AuthRequest, res: Response): Promise<void> {
    try {
      const userId = req.userId!;
      const { id } = req.params;
      const data = createMealSchema.partial().parse(req.body);

      const existingMeal = await prisma.meal.findFirst({
        where: { id, userId },
      });

      if (!existingMeal) {
        res.status(404).json({ error: 'Meal not found' });
        return;
      }

      const meal = await prisma.meal.update({
        where: { id },
        data: {
          ...data,
          consumedAt: data.consumedAt ? new Date(data.consumedAt) : undefined,
        },
      });

      // Update daily nutrition
      await this.updateDailyNutrition(userId, meal.consumedAt);

      res.json(meal);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: 'Validation error', details: error.errors });
        return;
      }
      throw error;
    }
  }

  /**
   * DELETE /api/meals/:id
   */
  async deleteMeal(req: AuthRequest, res: Response): Promise<void> {
    const userId = req.userId!;
    const { id } = req.params;

    const meal = await prisma.meal.findFirst({
      where: { id, userId },
    });

    if (!meal) {
      res.status(404).json({ error: 'Meal not found' });
      return;
    }

    await prisma.meal.delete({ where: { id } });

    // Update daily nutrition
    await this.updateDailyNutrition(userId, meal.consumedAt);

    res.status(204).send();
  }

  /**
   * Helper: Update daily nutrition aggregate
   */
  private async updateDailyNutrition(
    userId: string,
    date: Date
  ): Promise<void> {
    const dayStart = startOfDay(date);
    const dayEnd = endOfDay(date);

    const meals = await prisma.meal.findMany({
      where: {
        userId,
        consumedAt: {
          gte: dayStart,
          lte: dayEnd,
        },
      },
    });

    const totals = meals.reduce(
      (acc, meal) => ({
        calories: acc.calories + meal.calories,
        proteinG: acc.proteinG + meal.proteinG,
        carbsG: acc.carbsG + meal.carbsG,
        fatG: acc.fatG + meal.fatG,
        count: acc.count + 1,
      }),
      { calories: 0, proteinG: 0, carbsG: 0, fatG: 0, count: 0 }
    );

    await prisma.dailyNutrition.upsert({
      where: {
        userId_date: {
          userId,
          date: dayStart,
        },
      },
      create: {
        userId,
        date: dayStart,
        totalCalories: totals.calories,
        totalProteinG: totals.proteinG,
        totalCarbsG: totals.carbsG,
        totalFatG: totals.fatG,
        mealsCount: totals.count,
      },
      update: {
        totalCalories: totals.calories,
        totalProteinG: totals.proteinG,
        totalCarbsG: totals.carbsG,
        totalFatG: totals.fatG,
        mealsCount: totals.count,
      },
    });
  }
}

export const mealsController = new MealsController();
