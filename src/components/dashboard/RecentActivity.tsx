import React from 'react';
import { Activity } from '../../types';
import { UserPlus, UserCheck, RefreshCw, UserX, Clock } from 'lucide-react';
import { EmptyState } from '../common/EmptyState';

interface RecentActivityProps {
  activities: Activity[];
}

export const RecentActivity: React.FC<RecentActivityProps> = ({ activities }) => {
  if (!activities || activities.length === 0) {
    return (
      <EmptyState
        icon="inbox"
        title="No recent activity"
        description="Activity events will appear here when customers are added, edited, or deleted."
      />
    );
  }

  const formatRelativeTime = (timestamp: string) => {
    try {
      const date = new Date(timestamp);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffMins = Math.floor(diffMs / (1000 * 60));
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

      if (diffMins < 1) return 'Just now';
      if (diffMins < 60) return `${diffMins}m ago`;
      if (diffHours < 24) return `${diffHours}h ago`;
      if (diffDays === 1) return 'Yesterday';
      return `${diffDays}d ago`;
    } catch {
      return 'Recently';
    }
  };

  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'added':
        return <UserPlus className="w-4 h-4 text-emerald-500" />;
      case 'status_changed':
        return <UserCheck className="w-4 h-4 text-blue-500" />;
      case 'updated':
        return <RefreshCw className="w-4 h-4 text-indigo-500" />;
      case 'deleted':
        return <UserX className="w-4 h-4 text-rose-500" />;
    }
  };

  const getActivityBadgeBg = (type: Activity['type']) => {
    switch (type) {
      case 'added':
        return 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200/50 dark:border-emerald-900/50';
      case 'status_changed':
        return 'bg-blue-50 dark:bg-blue-950/60 border-blue-200/50 dark:border-blue-900/50';
      case 'updated':
        return 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-200/50 dark:border-indigo-900/50';
      case 'deleted':
        return 'bg-rose-50 dark:bg-rose-950/60 border-rose-200/50 dark:border-rose-900/50';
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Recent Activity</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Audit log of recent system modifications
          </p>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
          Live Feed
        </span>
      </div>

      <div className="space-y-4">
        {activities.slice(0, 8).map((act) => (
          <div
            key={act.id}
            className="flex items-start justify-between p-3.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors border border-transparent hover:border-slate-200/60 dark:hover:border-slate-800"
          >
            <div className="flex items-start space-x-3 min-w-0">
              <div
                className={`p-2 rounded-xl border ${getActivityBadgeBg(act.type)} shrink-0 mt-0.5`}
              >
                {getActivityIcon(act.type)}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
                  {act.customerName}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                  {act.description}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-1 text-[11px] text-slate-400 dark:text-slate-500 shrink-0 ml-2 mt-0.5">
              <Clock className="w-3 h-3" />
              <span>{formatRelativeTime(act.timestamp)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
