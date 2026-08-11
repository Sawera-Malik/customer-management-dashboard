import React from 'react';

export const StatCardSkeleton: React.FC = () => {
  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm animate-pulse space-y-4">
      <div className="flex items-center justify-between">
        <div className="h-4 w-28 bg-slate-200 dark:bg-slate-800 rounded"></div>
        <div className="h-10 w-10 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
      </div>
      <div className="h-8 w-24 bg-slate-200 dark:bg-slate-800 rounded"></div>
      <div className="h-3 w-36 bg-slate-200 dark:bg-slate-800 rounded"></div>
    </div>
  );
};

export const TableSkeleton: React.FC<{ rows?: number }> = ({ rows = 5 }) => {
  return (
    <div className="w-full space-y-4 animate-pulse">
      <div className="h-10 bg-slate-100 dark:bg-slate-800/60 rounded-xl"></div>
      {Array.from({ length: rows }).map((_, idx) => (
        <div
          key={idx}
          className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-xl space-x-4"
        >
          <div className="flex items-center space-x-3 w-1/4">
            <div className="w-10 h-10 bg-slate-200 dark:bg-slate-800 rounded-full shrink-0"></div>
            <div className="space-y-2 flex-1">
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-3/4"></div>
              <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-1/2"></div>
            </div>
          </div>
          <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/5 hidden md:block"></div>
          <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/6 hidden lg:block"></div>
          <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded-full w-16"></div>
          <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded-lg w-20"></div>
        </div>
      ))}
    </div>
  );
};

export const ActivitySkeleton: React.FC = () => {
  return (
    <div className="space-y-4 animate-pulse">
      {Array.from({ length: 4 }).map((_, idx) => (
        <div key={idx} className="flex items-start space-x-3 p-3">
          <div className="w-8 h-8 bg-slate-200 dark:bg-slate-800 rounded-lg shrink-0"></div>
          <div className="space-y-2 flex-1">
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-3/4"></div>
            <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-1/3"></div>
          </div>
        </div>
      ))}
    </div>
  );
};
