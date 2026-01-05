import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from './store/auth';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import ProfileSetupPage from './pages/ProfileSetupPage';
import MealsPage from './pages/MealsPage';
import CoachPage from './pages/CoachPage';
import ProgressPage from './pages/ProgressPage';
import GroceryPage from './pages/GroceryPage';
import Layout from './components/Layout';

function ProtectedRoute() {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

function App() {
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
          <Route path="/grocery" element={<GroceryPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;

