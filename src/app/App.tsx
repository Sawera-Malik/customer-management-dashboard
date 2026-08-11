import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '../components/ui/Theme/ThemeContext';
import { ToastProvider } from '../components/ui/Toast/ToastContext';
import { CustomerProvider } from '../feactures/customers/components/CustomerContext';

import { DashboardPage } from '../feactures/dashboard/pages/DashboardPage';
import { CustomersPage } from '../feactures/customers/pages/CustomersPage';
import { AddCustomerPage } from '../feactures/customers/pages/AddCustomerPage';
import { SettingsPage } from '../feactures/settings/pages/SettingsPage';
import { LoginPage } from '../feactures/auth/pages/LoginPage';
import { ProtectedRoute } from './ProtectedRoute';
import { AuthProvider, useAuth } from '../feactures/auth/hooks/AuthContext';

const RootRedirect: React.FC = () => {
  const { isAuthenticated } = useAuth();
  return <Navigate to={isAuthenticated ? '/dashboard' : '/login'} replace />;
};

export const AppContent: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/customers"
        element={
          <ProtectedRoute>
            <CustomersPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/customers/add"
        element={
          <ProtectedRoute>
            <AddCustomerPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <SettingsPage />
          </ProtectedRoute>
        }
      />

      <Route path="/" element={<RootRedirect />} />
      <Route path="*" element={<RootRedirect />} />
    </Routes>
  );
};

export function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <CustomerProvider>
            <BrowserRouter>
              <AppContent />
            </BrowserRouter>
          </CustomerProvider>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
