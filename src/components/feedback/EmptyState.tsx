import React from 'react';
import { SearchX, Users, Inbox, LucideIcon } from 'lucide-react';
import { Button } from '../ui/Button/Button';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: 'search' | 'users' | 'inbox' | LucideIcon;
  actionText?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon = 'users',
  actionText,
  onAction,
}) => {
  const renderIcon = () => {
    if (typeof icon !== 'string') {
      const CustomIcon = icon;
      return <CustomIcon className="w-10 h-10 text-slate-400 dark:text-slate-500" />;
    }
    switch (icon) {
      case 'search':
        return <SearchX className="w-10 h-10 text-slate-400 dark:text-slate-500" />;
      case 'inbox':
        return <Inbox className="w-10 h-10 text-slate-400 dark:text-slate-500" />;
      case 'users':
      default:
        return <Users className="w-10 h-10 text-slate-400 dark:text-slate-500" />;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm my-4">
      <div className="p-4 bg-slate-100 dark:bg-slate-800/70 rounded-2xl mb-4 shrink-0">
        {renderIcon()}
      </div>
      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
      <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400 max-w-md leading-relaxed">
        {description}
      </p>
      {actionText && onAction && (
        <div className="mt-6">
          <Button variant="outline" size="sm" onClick={onAction}>
            {actionText}
          </Button>
        </div>
      )}
    </div>
  );
};
