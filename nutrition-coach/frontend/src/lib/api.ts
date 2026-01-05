import axios from 'axios';
import type {
  AuthResponse,
  UserProfile,
  Meal,
  DailyNutritionResponse,
  NutritionStats,
  ChatMessage,
} from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
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
export const authApi = {
  signup: (data: { email: string; password: string; name: string }) =>
    api.post<AuthResponse>('/auth/signup', data),
  login: (data: { email: string; password: string }) =>
    api.post<AuthResponse>('/auth/login', data),
};

// Profile
export const profileApi = {
  get: () => api.get<UserProfile>('/profile'),
  create: (data: Partial<UserProfile>) => api.post<UserProfile>('/profile', data),
  update: (data: Partial<UserProfile>) => api.patch<UserProfile>('/profile', data),
};

// Meals
export const mealsApi = {
  list: (date?: string) => api.get<Meal[]>('/meals', { params: { date } }),
  get: (id: string) => api.get<Meal>(`/meals/${id}`),
  create: (data: Partial<Meal>) => api.post<Meal>('/meals', data),
  update: (id: string, data: Partial<Meal>) => api.patch<Meal>(`/meals/${id}`, data),
  delete: (id: string) => api.delete(`/meals/${id}`),
};

// Nutrition
export const nutritionApi = {
  getDaily: (date?: string) =>
    api.get<DailyNutritionResponse>('/nutrition/daily', { params: { date } }),
  getWeekly: () => api.get<any[]>('/nutrition/weekly'),
  getStats: () => api.get<NutritionStats>('/nutrition/stats'),
};

// AI
export const aiApi = {
  chat: (message: string) => api.post<{ message: string }>('/ai/chat', { message }),
  getChatHistory: () => api.get<ChatMessage[]>('/ai/chat/history'),
  suggestMeals: (mealType: string) =>
    api.post<{ suggestions: string }>('/ai/suggest-meals', { mealType }),
  getProgressAnalysis: () => api.get<{ analysis: string }>('/ai/progress-analysis'),
  generateDailyPlan: () => api.post<any>('/ai/generate-daily-plan'),
};

// Grocery
export const groceryApi = {
  list: () => api.get<any[]>('/grocery'),
  get: (id: string) => api.get<any>(`/grocery/${id}`),
  create: (data: any) => api.post<any>('/grocery', data),
  update: (id: string, data: any) => api.patch<any>(`/grocery/${id}`, data),
  delete: (id: string) => api.delete(`/grocery/${id}`),
};

export default api;
