import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { nutritionApi, mealsApi, aiApi } from '../lib/api';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { format } from 'date-fns';

interface MealPlan {
  meals: Array<{
    mealType: string;
    name: string;
    description: string;
    calories: number;
    proteinG: number;
    carbsG: number;
    fatG: number;
    cost?: number;
    prepTime?: string;
  }>;
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  totalCost?: number;
  budgetStatus?: string;
  summary: string;
}

export default function DashboardPage() {
  const [mealPlan, setMealPlan] = useState<MealPlan | null>(null);

  const { data: dailyNutrition } = useQuery({
    queryKey: ['nutrition', 'daily'],
    queryFn: () => nutritionApi.getDaily(),
  });

  const { data: todaysMeals } = useQuery({
    queryKey: ['meals', format(new Date(), 'yyyy-MM-dd')],
    queryFn: () => mealsApi.list(format(new Date(), 'yyyy-MM-dd')),
  });

  const { data: stats } = useQuery({
    queryKey: ['nutrition', 'stats'],
    queryFn: () => nutritionApi.getStats(),
  });

  const generatePlanMutation = useMutation({
    mutationFn: aiApi.generateDailyPlan,
    onSuccess: (response) => {
      setMealPlan(response.data);
    },
  });

  const current = dailyNutrition?.data?.current || { totalCalories: 0, totalProteinG: 0, totalCarbsG: 0, totalFatG: 0, mealsCount: 0 };
  const targets = dailyNutrition?.data?.targets || { targetCalories: 0, targetProteinG: 0, targetCarbsG: 0, targetFatG: 0 };

  const calcPercent = (current: number, target: number) => target > 0 ? Math.round((current / target) * 100) : 0;

  const getMealTypeColor = (type: string) => {
    switch (type) {
      case 'BREAKFAST': return 'border-yellow-500 bg-yellow-50';
      case 'LUNCH': return 'border-green-500 bg-green-50';
      case 'DINNER': return 'border-blue-500 bg-blue-50';
      case 'SNACK': return 'border-purple-500 bg-purple-50';
      default: return 'border-gray-500 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Track your nutrition journey</p>
        </div>
        <Button
          variant="primary"
          onClick={() => generatePlanMutation.mutate()}
          isLoading={generatePlanMutation.isPending}
        >
          ✨ Generate Daily Plan
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <div className="text-sm text-gray-600">Calories</div>
          <div className="text-2xl font-bold">{current.totalCalories} / {targets.targetCalories}</div>
          <div className="mt-2 bg-gray-200 rounded-full h-2">
            <div className="bg-primary-600 h-2 rounded-full" style={{ width: `${Math.min(calcPercent(current.totalCalories, targets.targetCalories), 100)}%` }} />
          </div>
        </Card>

        <Card>
          <div className="text-sm text-gray-600">Protein</div>
          <div className="text-2xl font-bold">{Math.round(current.totalProteinG)}g / {targets.targetProteinG}g</div>
          <div className="mt-2 bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${Math.min(calcPercent(current.totalProteinG, targets.targetProteinG), 100)}%` }} />
          </div>
        </Card>

        <Card>
          <div className="text-sm text-gray-600">Carbs</div>
          <div className="text-2xl font-bold">{Math.round(current.totalCarbsG)}g / {targets.targetCarbsG}g</div>
          <div className="mt-2 bg-gray-200 rounded-full h-2">
            <div className="bg-yellow-600 h-2 rounded-full" style={{ width: `${Math.min(calcPercent(current.totalCarbsG, targets.targetCarbsG), 100)}%` }} />
          </div>
        </Card>

        <Card>
          <div className="text-sm text-gray-600">Fat</div>
          <div className="text-2xl font-bold">{Math.round(current.totalFatG)}g / {targets.targetFatG}g</div>
          <div className="mt-2 bg-gray-200 rounded-full h-2">
            <div className="bg-red-600 h-2 rounded-full" style={{ width: `${Math.min(calcPercent(current.totalFatG, targets.targetFatG), 100)}%` }} />
          </div>
        </Card>
      </div>

      {/* AI Generated Meal Plan */}
      {mealPlan && (
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">🍽️ Your AI Meal Plan</h2>
            <button onClick={() => setMealPlan(null)} className="text-gray-500 hover:text-gray-700">✕</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {mealPlan.meals.map((meal, index) => (
              <div key={index} className={`border-l-4 ${getMealTypeColor(meal.mealType)} rounded-lg p-4`}>
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-semibold uppercase text-gray-500">{meal.mealType}</span>
                    <h3 className="font-bold text-lg">{meal.name}</h3>
                  </div>
                  <div className="text-right">
                    <span className="bg-gray-100 px-2 py-1 rounded text-sm font-semibold">{meal.calories} cal</span>
                    {meal.cost && <div className="text-green-600 font-bold text-sm mt-1">€{meal.cost}</div>}
                  </div>
                </div>
                <p className="text-gray-600 text-sm mt-2">{meal.description}</p>
                <div className="flex justify-between items-center mt-3">
                  <div className="flex gap-3 text-xs text-gray-500">
                    <span>🥩 {meal.proteinG}g</span>
                    <span>🍞 {meal.carbsG}g</span>
                    <span>🧈 {meal.fatG}g</span>
                  </div>
                  {meal.prepTime && <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">⏱️ {meal.prepTime}</span>}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-around text-center mb-3">
              <div>
                <div className="text-2xl font-bold text-primary-600">{mealPlan.totalCalories}</div>
                <div className="text-xs text-gray-500">Total Calories</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">{mealPlan.totalProtein}g</div>
                <div className="text-xs text-gray-500">Protein</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-600">{mealPlan.totalCarbs}g</div>
                <div className="text-xs text-gray-500">Carbs</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-600">{mealPlan.totalFat}g</div>
                <div className="text-xs text-gray-500">Fat</div>
              </div>
              {mealPlan.totalCost && (
                <div>
                  <div className="text-2xl font-bold text-green-600">€{mealPlan.totalCost}</div>
                  <div className="text-xs text-gray-500">Total Cost</div>
                </div>
              )}
            </div>
            {mealPlan.budgetStatus && (
              <p className="text-center text-green-600 font-semibold mb-2">💰 {mealPlan.budgetStatus}</p>
            )}
            <p className="text-gray-600 text-sm text-center">{mealPlan.summary}</p>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <div className="text-sm text-gray-600">Meals Today</div>
          <div className="text-3xl font-bold">{current.mealsCount}</div>
        </Card>
        <Card>
          <div className="text-sm text-gray-600">Current Streak</div>
          <div className="text-3xl font-bold">{stats?.data?.currentStreak || 0} days</div>
        </Card>
        <Card>
          <div className="text-sm text-gray-600">Total Meals Logged</div>
          <div className="text-3xl font-bold">{stats?.data?.totalMealsLogged || 0}</div>
        </Card>
      </div>

      <Card>
        <h2 className="text-xl font-bold mb-4">Today's Meals</h2>
        {todaysMeals?.data && todaysMeals.data.length > 0 ? (
          <div className="space-y-3">
            {todaysMeals.data.map((meal: any) => (
              <div key={meal.id} className="border-l-4 border-primary-600 pl-4 py-2">
                <div className="font-semibold">{meal.name}</div>
                <div className="text-sm text-gray-600">{meal.mealType}</div>
                <div className="text-sm text-gray-500">
                  {meal.calories} cal | {meal.proteinG}g protein | {meal.carbsG}g carbs | {meal.fatG}g fat
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No meals logged today. Start tracking!</p>
        )}
      </Card>
    </div>
  );
}
