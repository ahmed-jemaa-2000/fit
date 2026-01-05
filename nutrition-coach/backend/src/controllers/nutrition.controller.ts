import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { prisma } from '../config/database';
import { startOfDay, subDays, endOfDay } from 'date-fns';

export class NutritionController {
  /**
   * GET /api/nutrition/daily?date=YYYY-MM-DD
   */
  async getDailyNutrition(req: AuthRequest, res: Response): Promise<void> {
    const userId = req.userId!;
    const dateParam = req.query.date as string;
    const date = dateParam ? new Date(dateParam) : new Date();

    const dailyNutrition = await prisma.dailyNutrition.findUnique({
      where: {
        userId_date: {
          userId,
          date: startOfDay(date),
        },
      },
    });

    // Get user targets
    const profile = await prisma.userProfile.findUnique({
      where: { userId },
      select: {
        targetCalories: true,
        targetProteinG: true,
        targetCarbsG: true,
        targetFatG: true,
      },
    });

    res.json({
      date: startOfDay(date),
      current: dailyNutrition || {
        totalCalories: 0,
        totalProteinG: 0,
        totalCarbsG: 0,
        totalFatG: 0,
        mealsCount: 0,
      },
      targets: profile || null,
    });
  }

  /**
   * GET /api/nutrition/weekly
   */
  async getWeeklyNutrition(req: AuthRequest, res: Response): Promise<void> {
    const userId = req.userId!;
    const weekStart = startOfDay(subDays(new Date(), 7));
    const weekEnd = endOfDay(new Date());

    const weeklyData = await prisma.dailyNutrition.findMany({
      where: {
        userId,
        date: {
          gte: weekStart,
          lte: weekEnd,
        },
      },
      orderBy: { date: 'asc' },
    });

    res.json(weeklyData);
  }

  /**
   * GET /api/nutrition/stats
   */
  async getStats(req: AuthRequest, res: Response): Promise<void> {
    const userId = req.userId!;

    // Get total meals logged
    const totalMeals = await prisma.meal.count({
      where: { userId },
    });

    // Get current streak
    const streak = await this.calculateStreak(userId);

    // Get average daily calories (last 30 days)
    const thirtyDaysAgo = startOfDay(subDays(new Date(), 30));
    const recentDays = await prisma.dailyNutrition.findMany({
      where: {
        userId,
        date: { gte: thirtyDaysAgo },
      },
    });

    const avgCalories =
      recentDays.length > 0
        ? Math.round(
            recentDays.reduce((sum, day) => sum + day.totalCalories, 0) /
              recentDays.length
          )
        : 0;

    res.json({
      totalMealsLogged: totalMeals,
      currentStreak: streak,
      avgDailyCalories: avgCalories,
      daysTracked: recentDays.length,
    });
  }

  /**
   * Calculate current logging streak
   */
  private async calculateStreak(userId: string): Promise<number> {
    let streak = 0;
    let currentDate = startOfDay(new Date());

    while (true) {
      const dayData = await prisma.dailyNutrition.findUnique({
        where: {
          userId_date: {
            userId,
            date: currentDate,
          },
        },
      });

      if (!dayData || dayData.mealsCount === 0) {
        break;
      }

      streak++;
      currentDate = startOfDay(subDays(currentDate, 1));

      // Cap at 365 days to avoid infinite loop
      if (streak >= 365) break;
    }

    return streak;
  }
}

export const nutritionController = new NutritionController();
