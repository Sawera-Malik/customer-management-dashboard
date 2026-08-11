import React from 'react';
import { CustomerStatus } from '../../../types';
interface BadgeProps {
  status: CustomerStatus;
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({ status, size = 'md' }) => {
  const isPageSm = size === 'sm';

  if (status === 'Active') {
    return (
      <span
        className={`inline-flex items-center gap-1.5 font-medium rounded-full ${
          isPageSm ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs'
        } bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/40`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
        Active
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-full ${
        isPageSm ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs'
      } bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 border border-slate-200 dark:border-slate-700`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
      Inactive
    </span>
  );
};
