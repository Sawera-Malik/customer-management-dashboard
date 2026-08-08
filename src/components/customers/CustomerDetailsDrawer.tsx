import React, { useEffect } from 'react';
import { Customer } from '../../types';
import { CustomerAvatar } from '../common/CustomerAvatar';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import {
  X,
  Mail,
  Phone,
  Building2,
  MapPin,
  Globe,
  Calendar,
  Edit3,
  Trash2,
  ExternalLink,
  DollarSign,
} from 'lucide-react';

interface CustomerDetailsDrawerProps {
  customer: Customer | null;
  onClose: () => void;
  onEdit: (customer: Customer) => void;
  onDelete: (customer: Customer) => void;
}

export const CustomerDetailsDrawer: React.FC<CustomerDetailsDrawerProps> = ({
  customer,
  onClose,
  onEdit,
  onDelete,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && customer) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [customer, onClose]);

  if (!customer) return null;

  const formattedDate = customer.createdAt
    ? new Date(customer.createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : 'Recently';

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity animate-in fade-in"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-250">
          <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-850/50">
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
              Customer Profile
            </h3>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
              aria-label="Close details drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 p-6 space-y-6 overflow-y-auto">
            <div className="flex items-center space-x-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60">
              <CustomerAvatar name={customer.name} size="xl" bgColor={customer.avatarColor} />
              <div className="min-w-0 flex-1">
                <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100 truncate">
                  {customer.name}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{customer.email}</p>
                <div className="mt-2.5">
                  <Badge status={customer.status} />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h5 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Contact & Company
              </h5>

              <div className="space-y-3 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 text-sm">
                <div className="flex items-center justify-between text-slate-700 dark:text-slate-300">
                  <div className="flex items-center space-x-3 text-slate-500 dark:text-slate-400">
                    <Mail className="w-4 h-4 shrink-0" />
                    <span>Email</span>
                  </div>
                  <a
                    href={`mailto:${customer.email}`}
                    className="font-medium text-brand-600 dark:text-brand-400 hover:underline truncate max-w-[200px]"
                  >
                    {customer.email}
                  </a>
                </div>

                <div className="flex items-center justify-between text-slate-700 dark:text-slate-300">
                  <div className="flex items-center space-x-3 text-slate-500 dark:text-slate-400">
                    <Phone className="w-4 h-4 shrink-0" />
                    <span>Phone</span>
                  </div>
                  <span className="font-medium text-slate-900 dark:text-slate-100">
                    {customer.phone}
                  </span>
                </div>

                <div className="flex items-center justify-between text-slate-700 dark:text-slate-300">
                  <div className="flex items-center space-x-3 text-slate-500 dark:text-slate-400">
                    <Building2 className="w-4 h-4 shrink-0" />
                    <span>Company</span>
                  </div>
                  <span className="font-medium text-slate-900 dark:text-slate-100">
                    {customer.company}
                  </span>
                </div>

                <div className="flex items-center justify-between text-slate-700 dark:text-slate-300">
                  <div className="flex items-center space-x-3 text-slate-500 dark:text-slate-400">
                    <Globe className="w-4 h-4 shrink-0" />
                    <span>Website</span>
                  </div>
                  <a
                    href={customer.website}
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium text-brand-600 dark:text-brand-400 hover:underline flex items-center space-x-1"
                  >
                    <span className="truncate max-w-[150px]">{customer.website}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h5 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Postal Address
              </h5>
              <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-2 text-sm">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
                  <div className="text-slate-700 dark:text-slate-300 space-y-0.5">
                    <p className="font-medium text-slate-900 dark:text-slate-100">
                      {customer.address.street}, {customer.address.suite}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {customer.address.city}, {customer.address.zipcode}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h5 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Account Metadata
              </h5>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800">
                  <div className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400 mb-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Member Since</span>
                  </div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {formattedDate}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800">
                  <div className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400 mb-1">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Monthly Value</span>
                  </div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    ${(customer.monthlyRevenue || 3500).toLocaleString()}/mo
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850/50 flex items-center justify-between gap-3">
            <Button
              variant="danger"
              leftIcon={<Trash2 className="w-4 h-4" />}
              onClick={() => onDelete(customer)}
            >
              Delete
            </Button>

            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
              <Button
                variant="primary"
                leftIcon={<Edit3 className="w-4 h-4" />}
                onClick={() => onEdit(customer)}
              >
                Edit Customer
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
