import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { Button } from '../../../components/ui/Button/Button';
import { SortOrder } from '../../../types';

interface SortControlProps {
  order: SortOrder;
  onChange: (order: SortOrder) => void;
}

export const SortControl: React.FC<SortControlProps> = ({ order, onChange }) => {
  const toggleSort = () => {
    onChange(order === 'asc' ? 'desc' : 'asc');
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleSort}
      leftIcon={
        order === 'asc' ? (
          <ArrowUp className="w-3.5 h-3.5 text-brand-500" />
        ) : (
          <ArrowDown className="w-3.5 h-3.5 text-brand-500" />
        )
      }
      className="shrink-0"
      title="Sort customer list alphabetically"
    >
      <span className="hidden sm:inline">Sort:</span> {order === 'asc' ? 'A → Z' : 'Z → A'}
    </Button>
  );
};
