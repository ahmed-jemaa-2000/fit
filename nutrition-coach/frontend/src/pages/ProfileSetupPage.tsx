import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { profileApi } from '../lib/api';
import { Input } from '../components/Input';
import { Select } from '../components/Select';
import { Button } from '../components/Button';
import { Card } from '../components/Card';

export default function ProfileSetupPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    age: '',
    gender: 'MALE',
    weightKg: '',
    heightCm: '',
    activityLevel: 'MODERATE',
    goal: 'MAINTAIN',
    dietaryRestrictions: '',
    allergies: '',
    likedFoods: '',
    dislikedFoods: '',
    dailyBudget: '',
    cookingPreference: 'EASY',
  });

  const profileMutation = useMutation({
    mutationFn: profileApi.create,
    onSuccess: () => {
      navigate('/');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    profileMutation.mutate({
      age: parseInt(formData.age),
      gender: formData.gender as any,
      weightKg: parseFloat(formData.weightKg),
      heightCm: parseFloat(formData.heightCm),
      activityLevel: formData.activityLevel as any,
      goal: formData.goal as any,
      dietaryRestrictions: formData.dietaryRestrictions ? formData.dietaryRestrictions.split(',').map(s => s.trim()) : [],
      allergies: formData.allergies ? formData.allergies.split(',').map(s => s.trim()) : [],
      likedFoods: formData.likedFoods ? formData.likedFoods.split(',').map(s => s.trim()) : [],
      dislikedFoods: formData.dislikedFoods ? formData.dislikedFoods.split(',').map(s => s.trim()) : [],
      dailyBudget: formData.dailyBudget ? parseFloat(formData.dailyBudget) : null,
      cookingPreference: formData.cookingPreference as any,
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <h1 className="text-2xl font-bold mb-6">Complete Your Profile</h1>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <Input type="number" label="Age" value={formData.age} onChange={(e) => setFormData({ ...formData, age: e.target.value })} required />
            <Select label="Gender" value={formData.gender} onChange={(e) => setFormData({ ...formData, gender: e.target.value })} options={[{ value: 'MALE', label: 'Male' }, { value: 'FEMALE', label: 'Female' }, { value: 'OTHER', label: 'Other' }]} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input type="number" label="Weight (kg)" value={formData.weightKg} onChange={(e) => setFormData({ ...formData, weightKg: e.target.value })} required />
            <Input type="number" label="Height (cm)" value={formData.heightCm} onChange={(e) => setFormData({ ...formData, heightCm: e.target.value })} required />
          </div>
          <Select label="Activity Level" value={formData.activityLevel} onChange={(e) => setFormData({ ...formData, activityLevel: e.target.value })} options={[{ value: 'SEDENTARY', label: 'Sedentary' }, { value: 'LIGHT', label: 'Light' }, { value: 'MODERATE', label: 'Moderate' }, { value: 'ACTIVE', label: 'Active' }, { value: 'VERY_ACTIVE', label: 'Very Active' }]} />
          <Select label="Goal" value={formData.goal} onChange={(e) => setFormData({ ...formData, goal: e.target.value })} options={[{ value: 'LOSE_WEIGHT', label: 'Lose Weight' }, { value: 'MAINTAIN', label: 'Maintain' }, { value: 'GAIN_WEIGHT', label: 'Gain Weight' }, { value: 'BUILD_MUSCLE', label: 'Build Muscle' }]} />
          <Input label="Dietary Restrictions (comma-separated)" value={formData.dietaryRestrictions} onChange={(e) => setFormData({ ...formData, dietaryRestrictions: e.target.value })} placeholder="vegetarian, gluten-free" />
          <Input label="Allergies (comma-separated)" value={formData.allergies} onChange={(e) => setFormData({ ...formData, allergies: e.target.value })} placeholder="peanuts, shellfish" />

          <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
            <h3 className="font-semibold text-green-800 mb-3">🍽️ Food Preferences for AI Meal Planning</h3>
            <Input
              label="Foods You Like (comma-separated)"
              value={formData.likedFoods}
              onChange={(e) => setFormData({ ...formData, likedFoods: e.target.value })}
              placeholder="chicken, rice, eggs, pasta, salmon, vegetables"
            />
            <Input
              label="Foods You Dislike (comma-separated)"
              value={formData.dislikedFoods}
              onChange={(e) => setFormData({ ...formData, dislikedFoods: e.target.value })}
              placeholder="fish, mushrooms, olives"
            />
          </div>

          <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <h3 className="font-semibold text-yellow-800 mb-3">💰 Budget & Cooking Preferences</h3>
            <Input
              type="number"
              step="0.01"
              label="Daily Food Budget (€)"
              value={formData.dailyBudget}
              onChange={(e) => setFormData({ ...formData, dailyBudget: e.target.value })}
              placeholder="10.00"
            />
            <Select
              label="Cooking Preference"
              value={formData.cookingPreference}
              onChange={(e) => setFormData({ ...formData, cookingPreference: e.target.value })}
              options={[
                { value: 'NO_COOKING', label: '🥗 No cooking (ready to eat only)' },
                { value: 'VERY_EASY', label: '⚡ Very easy (5 min, microwave/boil)' },
                { value: 'EASY', label: '👍 Easy (10-15 min, simple meals)' },
                { value: 'MEDIUM', label: '👨‍🍳 Medium (20+ min, some cooking)' },
                { value: 'COMPLEX', label: '🔥 Any complexity (I love cooking!)' },
              ]}
            />
          </div>

          <Button type="submit" variant="primary" className="w-full mt-4" isLoading={profileMutation.isPending}>Save Profile</Button>
        </form>
      </Card>
    </div>
  );
}
