import React from 'react';
import { CustomerStatus } from '../../../types';
import { Filter } from 'lucide-react';

interface StatusFilterProps {
  value: 'All' | CustomerStatus;
  onChange: (status: 'All' | CustomerStatus) => void;
}

export const StatusFilter: React.FC<StatusFilterProps> = ({ value, onChange }) => {
  const options: ('All' | CustomerStatus)[] = ['All', 'Active', 'Inactive'];

  return (
    <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-900 p-1 rounded-xl border border-slate-200/80 dark:border-slate-800 shrink-0">
      <div className="px-2 py-1 text-slate-400 hidden sm:block">
        <Filter className="w-3.5 h-3.5" />
      </div>
      {options.map((opt) => {
        const isSelected = value === opt;
        return (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
              isSelected
                ? 'bg-white dark:bg-slate-800 text-brand-600 dark:text-brand-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
};
