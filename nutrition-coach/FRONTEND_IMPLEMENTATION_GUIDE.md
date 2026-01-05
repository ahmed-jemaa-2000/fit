# Frontend Implementation Guide

This guide provides detailed instructions for implementing the complete frontend application.

## Core Files Already Created

- ✅ package.json with all dependencies
- ✅ vite.config.ts
- ✅ tsconfig.json
- ✅ tailwind.config.js
- ✅ postcss.config.js
- ✅ index.html
- ✅ Basic styles

## Files to Implement

### 1. Main Entry Point

**src/main.tsx**
```typescript
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import './styles/index.css';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
```

### 2. App Router

**src/App.tsx**
```typescript
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/auth';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import ProfileSetupPage from './pages/ProfileSetupPage';
import MealsPage from './pages/MealsPage';
import CoachPage from './pages/CoachPage';
import ProgressPage from './pages/ProgressPage';
import Layout from './components/Layout';

function App() {
  const { isAuthenticated } = useAuthStore();

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/profile-setup" element={<ProfileSetupPage />} />
          <Route path="/meals" element={<MealsPage />} />
          <Route path="/coach" element={<CoachPage />} />
          <Route path="/progress" element={<ProgressPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

function ProtectedRoute() {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

export default App;
```

### 3. API Client

**src/lib/api.ts**
```typescript
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth
export const auth = {
  signup: (data: SignupData) => api.post('/auth/signup', data),
  login: (data: LoginData) => api.post('/auth/login', data),
};

// Profile
export const profile = {
  get: () => api.get('/profile'),
  create: (data: ProfileData) => api.post('/profile', data),
  update: (data: Partial<ProfileData>) => api.patch('/profile', data),
};

// Meals
export const meals = {
  list: (date?: string) => api.get('/meals', { params: { date } }),
  get: (id: string) => api.get(`/meals/${id}`),
  create: (data: MealData) => api.post('/meals', data),
  update: (id: string, data: Partial<MealData>) => api.patch(`/meals/${id}`, data),
  delete: (id: string) => api.delete(`/meals/${id}`),
};

// AI
export const ai = {
  chat: (message: string) => api.post('/ai/chat', { message }),
  getChatHistory: () => api.get('/ai/chat/history'),
  suggestMeals: (mealType: string) => api.post('/ai/suggest-meals', { mealType }),
  getProgressAnalysis: () => api.get('/ai/progress-analysis'),
};

// Nutrition
export const nutrition = {
  getDaily: (date?: string) => api.get('/nutrition/daily', { params: { date } }),
  getWeekly: () => api.get('/nutrition/weekly'),
  getStats: () => api.get('/nutrition/stats'),
};

export default api;
```

### 4. Auth Store (Zustand)

**src/store/auth.ts**
```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthStore {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      login: (token, user) => {
        localStorage.setItem('token', token);
        set({ token, user, isAuthenticated: true });
      },
      logout: () => {
        localStorage.removeItem('token');
        set({ token: null, user: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
```

### 5. Key Pages

#### DashboardPage
- Display today's nutrition summary
- Show recent meals
- Display streak and quick stats
- Quick access to log meal and chat with coach

#### LoginPage / SignupPage
- Form with validation
- Error handling
- Redirect after success

#### ProfileSetupPage
- Multi-step form:
  1. Basic info (age, gender, height, weight)
  2. Activity level
  3. Goals and dietary restrictions
- Calculate and display targets
- Save profile

#### MealsPage
- Calendar/date picker
- List of meals for selected date
- Add meal form/modal
- Edit/delete meals
- Nutrition totals for the day

#### CoachPage
- Chat interface with AI
- Message history
- Loading states
- Meal suggestion feature

#### ProgressPage
- Weekly/monthly nutrition charts (Recharts)
- Macro distribution pie chart
- Calorie trend line chart
- Weekly progress analysis from AI

### 6. Key Components

#### Layout
- Navigation bar
- Sidebar (desktop)
- Bottom nav (mobile)
- User menu
- Logout button

#### NutritionCard
- Display calories, protein, carbs, fat
- Progress bars showing % of targets
- Color coding (green=good, yellow=warning, red=over)

#### MealCard
- Meal name, type, time
- Nutrition breakdown
- Edit/delete actions

#### MacroRing (or MacroPieChart)
- Visual macro distribution
- Using Recharts

#### ProgressChart
- Line/bar charts for trends
- Using Recharts
- Date range selector

#### ChatBubble
- User vs AI message styling
- Timestamp
- Markdown support (optional)

#### MealForm
- Form with validation
- Nutrition inputs
- Meal type selector
- DateTime picker

### 7. Hooks

**src/hooks/useMeals.ts**
```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { meals } from '../lib/api';

export function useMeals(date?: string) {
  return useQuery({
    queryKey: ['meals', date],
    queryFn: () => meals.list(date),
  });
}

export function useCreateMeal() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: meals.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meals'] });
      queryClient.invalidateQueries({ queryKey: ['nutrition'] });
    },
  });
}

// Similar hooks for update, delete
```

**src/hooks/useProfile.ts**
**src/hooks/useNutrition.ts**
**src/hooks/useAI.ts**

### 8. Types

**src/types/index.ts**
```typescript
export interface User {
  id: string;
  email: string;
  name: string;
}

export interface UserProfile {
  id: string;
  age: number;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  weightKg: number;
  heightCm: number;
  activityLevel: ActivityLevel;
  goal: FitnessGoal;
  targetCalories: number;
  targetProteinG: number;
  targetCarbsG: number;
  targetFatG: number;
  dietaryRestrictions: string[];
  allergies: string[];
}

export type ActivityLevel = 'SEDENTARY' | 'LIGHT' | 'MODERATE' | 'ACTIVE' | 'VERY_ACTIVE';
export type FitnessGoal = 'LOSE_WEIGHT' | 'MAINTAIN' | 'GAIN_WEIGHT' | 'BUILD_MUSCLE';
export type MealType = 'BREAKFAST' | 'LUNCH' | 'DINNER' | 'SNACK';

export interface Meal {
  id: string;
  name: string;
  description?: string;
  mealType: MealType;
  consumedAt: string;
  calories: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
  fiberG?: number;
  notes?: string;
}

export interface DailyNutrition {
  date: string;
  totalCalories: number;
  totalProteinG: number;
  totalCarbsG: number;
  totalFatG: number;
  me
