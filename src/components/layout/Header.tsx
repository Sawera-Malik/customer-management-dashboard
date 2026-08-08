import React from 'react';
import { Menu, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

interface HeaderProps {
  onMenuClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between transition-colors duration-200">
      <div className="flex items-center space-x-3 sm:space-x-4 min-w-0">
        <button
          onClick={onMenuClick}
          className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl lg:hidden transition-colors"
          aria-label="Open mobile menu"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      <div className="flex items-center space-x-2 sm:space-x-4">

        <button
          onClick={toggleTheme}
          className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors relative"
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          aria-label="Toggle dark/light theme"
        >
          {theme === 'dark' ? (
            <Sun className="w-5 h-5 text-amber-400 transition-transform duration-200 hover:rotate-45" />
          ) : (
            <Moon className="w-5 h-5 text-indigo-600 transition-transform duration-200 hover:-rotate-12" />
          )}
        </button>

        <div className="flex items-center space-x-2 pl-2 border-l border-slate-200 dark:border-slate-800">
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-8 h-8 rounded-full object-cover ring-2 ring-brand-500/30"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-brand-600 flex items-center justify-center text-white text-xs font-bold">
              {user?.name?.charAt(0) || 'U'}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
