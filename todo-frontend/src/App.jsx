import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Dashboard from './pages/Dashboard';
import Landing from './pages/Landing';

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public landing page — has its own Navbar */}
        <Route path="/landing" element={<Landing />} />

        {/* App shell with sticky Navbar */}
        <Route path="/*" element={
          <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 flex flex-col transition-colors duration-200">
            <Navbar />
            <main className="flex-1">
              <Routes>
                {/* Protected */}
                <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

                {/* Public auth */}
                <Route path="/login"          element={<Login />} />
                <Route path="/signup"         element={<Signup />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />

                {/* Fallback → landing */}
                <Route path="*" element={<Navigate to="/landing" replace />} />
              </Routes>
            </main>
          </div>
        } />
      </Routes>

      <Toaster
        position="top-right"
        toastOptions={{
          className: 'dark:bg-gray-900 dark:text-white dark:border dark:border-gray-800',
          duration: 3500,
        }}
      />
    </AuthProvider>
  );
}

export default App;

