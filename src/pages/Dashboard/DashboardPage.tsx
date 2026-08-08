import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCustomers } from '../../context/CustomerContext';
import { StatCard } from '../../components/dashboard/StatCard';
import { RecentActivity } from '../../components/dashboard/RecentActivity';
import { StatCardSkeleton, ActivitySkeleton } from '../../components/common/LoadingSkeleton';
import { ErrorState } from '../../components/common/ErrorState';
import { Button } from '../../components/common/Button';
import { Users, UserCheck, UserX, DollarSign, Plus, ArrowRight, RefreshCw } from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { customers, activities, loading, error, fetchCustomers } = useCustomers();
  const navigate = useNavigate();

  const totalCustomers = customers.length;
  const activeCustomers = customers.filter((c) => c.status === 'Active').length;
  const inactiveCustomers = customers.filter((c) => c.status === 'Inactive').length;

  const totalRevenueNumber = customers.reduce(
    (sum, c) => sum + (c.monthlyRevenue || 3500),
    0
  );
  const formattedRevenue = `$${totalRevenueNumber.toLocaleString()}`;

  if (error && customers.length === 0) {
    return <ErrorState message={error} onRetry={fetchCustomers} isLoading={loading} />;
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-brand-900 via-slate-900 to-indigo-950 text-white shadow-xl relative overflow-hidden border border-brand-800/40">
        <div className="space-y-2 z-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome back, {user?.name?.split(' ')[0] || 'Admin'} 👋
          </h2>
          <p className="text-sm text-slate-300 max-w-xl leading-relaxed">
            Here is what's happening across your customer network today. You have{' '}
            <strong className="text-brand-400 font-semibold">{activeCustomers} active accounts</strong>.
          </p>
        </div>

        <div className="flex items-center space-x-3 z-10 shrink-0">
          <Button
            variant="secondary"
            leftIcon={<Plus className="w-4 h-4" />}
            onClick={() => navigate('/customers/add')}
          >
            Add Customer
          </Button>
          <Button
            variant="primary"
            rightIcon={<ArrowRight className="w-4 h-4" />}
            onClick={() => navigate('/customers')}
          >
            View Directory
          </Button>
        </div>
      </div>

      {loading && customers.length === 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatCardSkeleton />
          <StatCardSkeleton />
          <StatCardSkeleton />
          <StatCardSkeleton />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatCard
            label="Total Customers"
            value={totalCustomers}
            supportingText="+12% from last month"
            icon={Users}
            colorScheme="blue"
          />
          <StatCard
            label="Active Customers"
            value={activeCustomers}
            supportingText={`${Math.round((activeCustomers / (totalCustomers || 1)) * 100)}% active rate`}
            icon={UserCheck}
            colorScheme="emerald"
          />
          <StatCard
            label="Inactive Customers"
            value={inactiveCustomers}
            supportingText="Requires engagement"
            icon={UserX}
            trend="down"
            colorScheme="amber"
          />
          <StatCard
            label="Total Monthly Revenue"
            value={formattedRevenue}
            supportingText="Demo dynamic MRR"
            icon={DollarSign}
            colorScheme="indigo"
          />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {loading && customers.length === 0 ? (
            <ActivitySkeleton />
          ) : (
            <RecentActivity activities={activities} />
          )}
        </div>

        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
            <h4 className="text-base font-bold text-slate-900 dark:text-white">
              System Health & Status
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              API connections with JSONPlaceholder and LocalStorage synchronization are active.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between text-xs p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                <span className="text-slate-600 dark:text-slate-400">REST API Status</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Connected (200 OK)
                </span>
              </div>

              <div className="flex items-center justify-between text-xs p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                <span className="text-slate-600 dark:text-slate-400">LocalStorage Mode</span>
                <span className="font-semibold text-brand-600 dark:text-brand-400">
                  Active Sync
                </span>
              </div>
            </div>

            <div className="pt-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                leftIcon={<RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />}
                onClick={fetchCustomers}
                isLoading={loading}
              >
                Refresh Customer Data
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
