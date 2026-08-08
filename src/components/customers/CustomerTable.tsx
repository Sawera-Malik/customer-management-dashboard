import React from 'react';
import { Customer } from '../../types';
import { CustomerRow } from './CustomerRow';
import { Pagination } from './Pagination';
import { EmptyState } from '../common/EmptyState';

interface CustomerTableProps {
  customers: Customer[];
  allFilteredCount: number;
  currentPage: number;
  totalPages: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  onViewCustomer: (customer: Customer) => void;
  onEditCustomer: (customer: Customer) => void;
  onDeleteCustomer: (customer: Customer) => void;
  onClearFilters?: () => void;
}

export const CustomerTable: React.FC<CustomerTableProps> = ({
  customers,
  allFilteredCount,
  currentPage,
  totalPages,
  pageSize,
  onPageChange,
  onPageSizeChange,
  onViewCustomer,
  onEditCustomer,
  onDeleteCustomer,
  onClearFilters,
}) => {
  if (allFilteredCount === 0) {
    return (
      <EmptyState
        icon="search"
        title="No customers found"
        description="No customer records match your current search parameters or status filters."
        actionText={onClearFilters ? 'Clear all filters' : undefined}
        onAction={onClearFilters}
      />
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden transition-colors">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[768px]">
          <thead>
            <tr className="bg-slate-50/90 dark:bg-slate-850 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              <th scope="col" className="py-3.5 px-6">
                Customer
              </th>
              <th scope="col" className="py-3.5 px-6">
                Email
              </th>
              <th scope="col" className="py-3.5 px-6">
                Phone
              </th>
              <th scope="col" className="py-3.5 px-6">
                Company
              </th>
              <th scope="col" className="py-3.5 px-6">
                Status
              </th>
              <th scope="col" className="py-3.5 px-6 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200/60 dark:divide-slate-800/60">
            {customers.map((customer) => (
              <CustomerRow
                key={customer.id}
                customer={customer}
                onView={onViewCustomer}
                onEdit={onEditCustomer}
                onDelete={onDeleteCustomer}
              />
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalCount={allFilteredCount}
        pageSize={pageSize}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />
    </div>
  );
};
