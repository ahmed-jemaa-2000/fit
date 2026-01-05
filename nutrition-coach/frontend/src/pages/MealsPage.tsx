import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { mealsApi } from '../lib/api';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Select } from '../components/Select';
import { Modal } from '../components/Modal';
import { format } from 'date-fns';

export default function MealsPage() {
  const queryClient = useQueryClient();
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    mealType: 'BREAKFAST',
    calories: '',
    proteinG: '',
    carbsG: '',
    fatG: '',
  });

  const { data: meals } = useQuery({
    queryKey: ['meals', selectedDate],
    queryFn: () => mealsApi.list(selectedDate),
  });

  const createMealMutation = useMutation({
    mutationFn: mealsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meals'] });
      queryClient.invalidateQueries({ queryKey: ['nutrition'] });
      setIsModalOpen(false);
      setFormData({ name: '', mealType: 'BREAKFAST', calories: '', proteinG: '', carbsG: '', fatG: '' });
    },
  });

  const deleteMealMutation = useMutation({
    mutationFn: mealsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meals'] });
      queryClient.invalidateQueries({ queryKey: ['nutrition'] });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMealMutation.mutate({
      name: formData.name,
      mealType: formData.mealType as any,
      calories: parseInt(formData.calories),
      proteinG: parseFloat(formData.proteinG),
      carbsG: parseFloat(formData.carbsG),
      fatG: parseFloat(formData.fatG),
      consumedAt: new Date(selectedDate).toISOString(),
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Meals</h1>
        <Button variant="primary" onClick={() => setIsModalOpen(true)}>
          Log Meal
        </Button>
      </div>

      <Card>
        <Input
          type="date"
          label="Select Date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </Card>

      <div className="space-y-4">
        {meals?.data && meals.data.length > 0 ? (
          meals.data.map((meal: any) => (
            <Card key={meal.id}>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{meal.name}</h3>
                  <p className="text-sm text-gray-600">{meal.mealType}</p>
                  <div className="mt-2 grid grid-cols-4 gap-4 text-sm">
                    <div><span className="font-medium">{meal.calories}</span> cal</div>
                    <div><span className="font-medium">{meal.proteinG}g</span> protein</div>
                    <div><span className="font-medium">{meal.carbsG}g</span> carbs</div>
                    <div><span className="font-medium">{meal.fatG}g</span> fat</div>
                  </div>
                </div>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => deleteMealMutation.mutate(meal.id)}
                >
                  Delete
                </Button>
              </div>
            </Card>
          ))
        ) : (
          <Card><p className="text-gray-500 text-center">No meals logged for this date</p></Card>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Log Meal">
        <form onSubmit={handleSubmit}>
          <Input label="Meal Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
          <Select label="Meal Type" value={formData.mealType} onChange={(e) => setFormData({ ...formData, mealType: e.target.value })} options={[{ value: 'BREAKFAST', label: 'Breakfast' }, { value: 'LUNCH', label: 'Lunch' }, { value: 'DINNER', label: 'Dinner' }, { value: 'SNACK', label: 'Snack' }]} />
          <div className="grid grid-cols-2 gap-4">
            <Input type="number" label="Calories" value={formData.calories} onChange={(e) => setFormData({ ...formData, calories: e.target.value })} required />
            <Input type="number" step="0.1" label="Protein (g)" value={formData.proteinG} onChange={(e) => setFormData({ ...formData, proteinG: e.target.value })} required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input type="number" step="0.1" label="Carbs (g)" value={formData.carbsG} onChange={(e) => setFormData({ ...formData, carbsG: e.target.value })} required />
            <Input type="number" step="0.1" label="Fat (g)" value={formData.fatG} onChange={(e) => setFormData({ ...formData, fatG: e.target.value })} required />
          </div>
          <div className="flex gap-2 mt-4">
            <Button type="submit" variant="primary" isLoading={createMealMutation.isPending}>Log Meal</Button>
            <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
