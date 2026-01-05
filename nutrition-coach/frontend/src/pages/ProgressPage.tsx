import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { nutritionApi } from '../lib/api';
import { Card } from '../components/Card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#3b82f6', '#eab308', '#ef4444'];

export default function ProgressPage() {
  const { data: weeklyData } = useQuery({
    queryKey: ['nutrition', 'weekly'],
    queryFn: () => nutritionApi.getWeekly(),
  });

  const { data: dailyData } = useQuery({
    queryKey: ['nutrition', 'daily'],
    queryFn: () => nutritionApi.getDaily(),
  });

  const chartData = weeklyData?.data?.map((day: any) => ({
    date: new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    calories: day.totalCalories,
    protein: day.totalProteinG,
    carbs: day.totalCarbsG,
    fat: day.totalFatG,
  })) || [];

  const macroData = dailyData?.data?.current ? [
    { name: 'Protein', value: dailyData.data.current.totalProteinG * 4 },
    { name: 'Carbs', value: dailyData.data.current.totalCarbsG * 4 },
    { name: 'Fat', value: dailyData.data.current.totalFatG * 9 },
  ] : [];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Progress</h1>

      <Card>
        <h2 className="text-xl font-bold mb-4">Weekly Calorie Trend</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="calories" stroke="#16a34a" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-xl font-bold mb-4">Weekly Macros</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="protein" stroke="#3b82f6" />
              <Line type="monotone" dataKey="carbs" stroke="#eab308" />
              <Line type="monotone" dataKey="fat" stroke="#ef4444" />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <h2 className="text-xl font-bold mb-4">Today's Macro Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={macroData} cx="50%" cy="50%" labelLine={false} label outerRadius={80} fill="#8884d8" dataKey="value">
                {macroData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
}
