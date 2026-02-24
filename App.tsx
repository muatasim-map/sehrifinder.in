import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Toaster, toast } from 'sonner';
import { ReloadPrompt } from './components/ReloadPrompt';
import { SplashScreen } from './components/SplashScreen';
import { IslamicPattern } from './components/Pattern';

// Pages
import LandingPage from './pages/LandingPage';
import AppPage from './pages/AppPage';
import SubmitPage from './pages/SubmitPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';

export default function App() {
  const [showSplash, setShowSplash] = useState(() => {
    try {
      if (typeof window === 'undefined' || !window.sessionStorage) return false;
      return !window.sessionStorage.getItem('hasShownSplash');
    } catch (e) {
      return false;
    }
  });

  const navigate = useNavigate();

  const handleSplashComplete = () => {
    setShowSplash(false);
    if (typeof window !== 'undefined' && window.sessionStorage) {
      window.sessionStorage.setItem('hasShownSplash', 'true');
    }
  };

  // Keyboard Shortcut for Admin
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Shift + A for Admin
      if (e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        navigate('/admin');
        toast.info('Opening Admin Login...');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  return (
    <ErrorBoundary>
      <Analytics />
      <SpeedInsights />
      <div className="min-h-screen bg-zillij font-sans relative overflow-x-hidden">
        {/* Global Background Pattern */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <IslamicPattern opacity={0.06} variant="hexagonal" className="text-primary-dark" />
        </div>

        {/* Global Toast Notification */}
        <Toaster position="top-center" richColors />

        <ReloadPrompt />

        {/* Splash Screen - only for sessions that haven't seen it */}
        {showSplash && (
          <SplashScreen onComplete={handleSplashComplete} />
        )}

        <AnimatePresence mode="wait">
          <Routes>
            {/* Landing Page */}
            <Route path="/" element={<LandingPage />} />

            {/* Main App Routes */}
            <Route path="/find" element={<AppPage />} />
            <Route path="/find/:city" element={<AppPage />} />

            {/* Feature Routes */}
            <Route path="/submit" element={<SubmitPage />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLoginPage />} />
            <Route path="/admin/dashboard" element={<AdminDashboardPage />} />

            {/* Redirects */}
            <Route path="/launch" element={<Navigate to="/find" replace />} />
            <Route path="/admin-login" element={<Navigate to="/admin" replace />} />
            <Route path="/admin-dashboard" element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
      </div>
    </ErrorBoundary>
  );
}
