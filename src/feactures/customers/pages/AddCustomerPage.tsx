import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCustomers } from '../components/CustomerContext';
import { Customer } from '../../../types';
import { ArrowLeft, UserPlus } from 'lucide-react';
import { Button } from '../../../components/ui/Button/Button';
import { CustomerForm } from '../components/CustomerForm';

export const AddCustomerPage: React.FC = () => {
  const navigate = useNavigate();
  const { addCustomer } = useCustomers();

  const handleSubmit = async (customerData: Omit<Customer, 'id' | 'createdAt'>) => {
    await addCustomer(customerData);
    navigate('/customers');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-200">
      <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/customers')}
            leftIcon={<ArrowLeft className="w-4 h-4" />}
          >
            Back
          </Button>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-brand-500" />
              Add New Customer
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Create a new customer profile in your directory
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
        <CustomerForm
          onSubmit={handleSubmit}
          onCancel={() => navigate('/customers')}
          submitText="Create Customer Profile"
        />
      </div>
    </div>
  );
};
