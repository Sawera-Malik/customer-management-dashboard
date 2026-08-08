import React from 'react';
import { Customer } from '../../types';
import { CustomerForm } from './CustomerForm';
import { X } from 'lucide-react';

interface EditCustomerModalProps {
  customer: Customer | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (id: number, values: Partial<Customer>) => Promise<Customer>;
}

export const EditCustomerModal: React.FC<EditCustomerModalProps> = ({
  customer,
  isOpen,
  onClose,
  onSubmit,
}) => {
  if (!isOpen || !customer) return null;

  const handleSubmit = async (values: Omit<Customer, 'id' | 'createdAt'>) => {
    await onSubmit(customer.id, values);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 my-8 animate-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              Edit Customer Profile
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Update details for <strong className="font-semibold text-slate-700 dark:text-slate-200">{customer.name}</strong>
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <CustomerForm
          initialValues={customer}
          onSubmit={handleSubmit}
          onCancel={onClose}
          submitText="Update Customer"
        />
      </div>
    </div>
  );
};
