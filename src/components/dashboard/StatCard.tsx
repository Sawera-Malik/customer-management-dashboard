import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  supportingText: string;
  icon: LucideIcon;
  trend?: 'up' | 'down' | 'neutral';
  colorScheme?: 'blue' | 'emerald' | 'amber' | 'indigo' | 'purple';
}

export const StatCard: React.FC<StatCardProps> = React.memo(({
  label,
  value,
  supportingText,
  icon: Icon,
  trend = 'up',
  colorScheme = 'blue',
}) => {
  const colorMap = {
    blue: {
      bg: 'bg-blue-50 dark:bg-blue-950/50',
      text: 'text-blue-600 dark:text-blue-400',
      border: 'border-blue-200/60 dark:border-blue-800/40',
      glow: 'shadow-blue-500/10',
    },
    emerald: {
      bg: 'bg-emerald-50 dark:bg-emerald-950/50',
      text: 'text-emerald-600 dark:text-emerald-400',
      border: 'border-emerald-200/60 dark:border-emerald-800/40',
      glow: 'shadow-emerald-500/10',
    },
    amber: {
      bg: 'bg-amber-50 dark:bg-amber-950/50',
      text: 'text-amber-600 dark:text-amber-400',
      border: 'border-amber-200/60 dark:border-amber-800/40',
      glow: 'shadow-amber-500/10',
    },
    indigo: {
      bg: 'bg-indigo-50 dark:bg-indigo-950/50',
      text: 'text-indigo-600 dark:text-indigo-400',
      border: 'border-indigo-200/60 dark:border-indigo-800/40',
      glow: 'shadow-indigo-500/10',
    },
    purple: {
      bg: 'bg-purple-50 dark:bg-purple-950/50',
      text: 'text-purple-600 dark:text-purple-400',
      border: 'border-purple-200/60 dark:border-purple-800/40',
      glow: 'shadow-purple-500/10',
    },
  };

  const currentTheme = colorMap[colorScheme];

  return (
    <div className={`p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md ${currentTheme.glow} transition-all duration-200 group`}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          {label}
        </span>
        <div className={`p-2.5 rounded-xl ${currentTheme.bg} ${currentTheme.text} ${currentTheme.border} transition-transform duration-200 group-hover:scale-110`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div className="mt-4 flex items-baseline justify-between">
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {value}
        </h3>
      </div>

      <div className="mt-3 flex items-center space-x-1.5 text-xs">
        <span
          className={`font-medium ${
            trend === 'up'
              ? 'text-emerald-600 dark:text-emerald-400'
              : trend === 'down'
              ? 'text-amber-600 dark:text-amber-400'
              : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          {supportingText}
        </span>
      </div>
    </div>
  );
});
