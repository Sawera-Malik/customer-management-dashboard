import React from 'react';
import { useTheme } from '../../../components/ui/Theme/ThemeContext';
import { useAuth } from '../../auth/hooks/AuthContext';
import { useCustomers } from '../../customers/components/CustomerContext';
import { Button } from '../../../components/ui/Button/Button';
import {
  User,
  Sun,
  Moon,
  RotateCcw,
  Shield,
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { resetDemoData } = useCustomers();

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-200">
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
          Settings & Preferences
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Manage your user profile, app appearance, and local database controls.
        </p>
      </div>

      {/* Profile Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center space-x-3 pb-4 border-b border-slate-200/80 dark:border-slate-800">
          <div className="p-2.5 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Admin Profile</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Current authenticated session details
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 space-y-1">
            <span className="text-xs text-slate-400 font-medium">Display Name</span>
            <p className="font-semibold text-slate-900 dark:text-white">{user?.name || 'Admin User'}</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 space-y-1">
            <span className="text-xs text-slate-400 font-medium">Email Address</span>
            <p className="font-semibold text-slate-900 dark:text-white">{user?.email || 'admin@crm.com'}</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 space-y-1 sm:col-span-2">
            <span className="text-xs text-slate-400 font-medium">System Role</span>
            <div className="flex items-center space-x-2 mt-0.5">
              <Shield className="w-4 h-4 text-brand-500" />
              <p className="font-semibold text-slate-900 dark:text-white">
                {user?.role || 'Super Admin (Full Access)'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Appearance & Theme Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200/80 dark:border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
              {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Appearance Theme</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Toggle between light and high-contrast dark themes
              </p>
            </div>
          </div>

          <Button
            variant="outline"
            onClick={toggleTheme}
            leftIcon={theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-500" />}
          >
            Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
          </Button>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 flex items-center justify-between text-xs">
          <span className="text-slate-600 dark:text-slate-300 font-medium">Active Palette</span>
          <span className="font-semibold text-brand-600 dark:text-brand-400 capitalize">
            {theme} Mode (Persisted in LocalStorage)
          </span>
        </div>
      </div>

      {/* Danger Zone: Data Management */}
      <div className="bg-white dark:bg-slate-900 border border-rose-200/80 dark:border-rose-950/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center space-x-3 pb-4 border-b border-rose-100 dark:border-rose-950">
          <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400">
            <RotateCcw className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Database Reset</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Clear local overrides and restore original sample customer dataset
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-md">
            Clicking reset will wipe any customer records created or edited locally and reload the initial API users dataset.
          </p>

          <Button
            variant="danger"
            leftIcon={<RotateCcw className="w-4 h-4" />}
            onClick={resetDemoData}
          >
            Reset Demo Data
          </Button>
        </div>
      </div>
    </div>
  );
};
