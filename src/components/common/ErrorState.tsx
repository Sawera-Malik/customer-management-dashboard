import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from './Button';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry: () => void;
  isLoading?: boolean;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Unable to load customers',
  message = 'We encountered a problem fetching customer data from the server. Please check your network connection and try again.',
  onRetry,
  isLoading = false,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-10 text-center rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/50 my-6 shadow-sm">
      <div className="p-3 bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400 rounded-2xl mb-4">
        <AlertCircle className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 max-w-md leading-relaxed">
        {message}
      </p>
      <div className="mt-6">
        <Button
          variant="primary"
          leftIcon={<RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />}
          onClick={onRetry}
          isLoading={isLoading}
        >
          Retry Request
        </Button>
      </div>
    </div>
  );
};
