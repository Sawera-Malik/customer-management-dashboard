import React from 'react';
import { Customer } from '../../../types';
import { Eye, Edit3, Trash2, Globe, Building2, Phone, Mail } from 'lucide-react';
import { CustomerAvatar } from './CustomerAvatar';
import { Badge } from '../../../components/ui/Badge/Badge';

interface CustomerRowProps {
  customer: Customer;
  onView: (customer: Customer) => void;
  onEdit: (customer: Customer) => void;
  onDelete: (customer: Customer) => void;
}

export const CustomerRow: React.FC<CustomerRowProps> = React.memo(({
  customer,
  onView,
  onEdit,
  onDelete,
}) => {
  return (
    <>
      <tr className="hidden md:table-row hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors border-b border-slate-200/60 dark:border-slate-800/60 group">
        <td className="py-4 px-6">
          <div className="flex items-center space-x-3.5">
            <CustomerAvatar name={customer.name} bgColor={customer.avatarColor} />
            <div className="min-w-0">
              <button
                onClick={() => onView(customer)}
                className="text-sm font-semibold text-slate-900 dark:text-slate-100 hover:text-brand-600 dark:hover:text-brand-400 text-left truncate block transition-colors"
              >
                {customer.name}
              </button>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{customer.email}</p>
            </div>
          </div>
        </td>

        <td className="py-4 px-6 text-sm text-slate-600 dark:text-slate-300 truncate max-w-[200px]">
          {customer.email}
        </td>

        <td className="py-4 px-6 text-sm text-slate-600 dark:text-slate-300 truncate max-w-[150px]">
          {customer.phone}
        </td>

        <td className="py-4 px-6 text-sm text-slate-600 dark:text-slate-300 truncate max-w-[160px]">
          <div className="flex items-center space-x-2">
            <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
            <span className="truncate">{customer.company}</span>
          </div>
        </td>

        <td className="py-4 px-6">
          <Badge status={customer.status} />
        </td>

        <td className="py-4 px-6 text-right">
          <div className="flex items-center justify-end space-x-1">
            <button
              onClick={() => onView(customer)}
              className="p-1.5 text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-950/50 rounded-lg transition-colors"
              title="View Customer Details"
              aria-label={`View details for ${customer.name}`}
            >
              <Eye className="w-4 h-4" />
            </button>

            <button
              onClick={() => onEdit(customer)}
              className="p-1.5 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 rounded-lg transition-colors"
              title="Edit Customer"
              aria-label={`Edit ${customer.name}`}
            >
              <Edit3 className="w-4 h-4" />
            </button>

            <button
              onClick={() => onDelete(customer)}
              className="p-1.5 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 rounded-lg transition-colors"
              title="Delete Customer"
              aria-label={`Delete ${customer.name}`}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </td>
      </tr>

      <div className="md:hidden p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm space-y-3.5 my-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <CustomerAvatar name={customer.name} bgColor={customer.avatarColor} />
            <div>
              <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">{customer.name}</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">{customer.company}</p>
            </div>
          </div>
          <Badge status={customer.status} size="sm" />
        </div>

        <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300">
          <div className="flex items-center space-x-2">
            <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{customer.email}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>{customer.phone}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Globe className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{customer.website}</span>
          </div>
        </div>

        <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={() => onView(customer)}
            className="px-3 py-1.5 text-xs font-medium text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/60 rounded-lg"
          >
            View Details
          </button>
          <button
            onClick={() => onEdit(customer)}
            className="px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 rounded-lg"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(customer)}
            className="px-3 py-1.5 text-xs font-medium text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/50 rounded-lg"
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
});
