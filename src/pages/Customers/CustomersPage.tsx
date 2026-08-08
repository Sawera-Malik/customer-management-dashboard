import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCustomers } from '../../context/CustomerContext';
import { SearchBar } from '../../components/customers/SearchBar';
import { StatusFilter } from '../../components/customers/StatusFilter';
import { Mail } from 'lucide-react';
import { SortControl } from '../../components/customers/SortControl';
import { CustomerTable } from '../../components/customers/CustomerTable';
import { CustomerDetailsDrawer } from '../../components/customers/CustomerDetailsDrawer';
import { EditCustomerModal } from '../../components/forms/EditCustomerModal';
import { ConfirmDialog } from '../../components/common/ConfirmDialog';
import { TableSkeleton } from '../../components/common/LoadingSkeleton';
import { ErrorState } from '../../components/common/ErrorState';
import { Button } from '../../components/common/Button';
import { Plus } from 'lucide-react';

export const CustomersPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    customers,
    filteredCustomers,
    paginatedCustomers,
    loading,
    error,
    search,
    setSearch,
    emailSearch,
    setEmailSearch,
    statusFilter,
    setStatusFilter,
    sortOrder,
    setSortOrder,
    page,
    setPage,
    pageSize,
    setPageSize,
    totalPages,
    selectedCustomer,
    setSelectedCustomer,
    editingCustomer,
    setEditingCustomer,
    deletingCustomer,
    setDeletingCustomer,
    fetchCustomers,
    updateCustomer,
    deleteCustomer,
  } = useCustomers();

  const handleClearFilters = () => {
    setSearch('');
    setEmailSearch('');
    setStatusFilter('All');
    setSortOrder('asc');
  };

  const handleConfirmDelete = async () => {
    if (deletingCustomer) {
      await deleteCustomer(deletingCustomer.id);
      setDeletingCustomer(null);
    }
  };

  if (error && customers.length === 0) {
    return <ErrorState message={error} onRetry={fetchCustomers} isLoading={loading} />;
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
            Customer Directory
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            View, search, filter and manage customer accounts.
          </p>
        </div>

        <Button
          variant="primary"
          leftIcon={<Plus className="w-4 h-4" />}
          onClick={() => navigate('/customers/add')}
        >
          Add Customer
        </Button>
      </div>

      <div className="flex flex-col gap-3 p-4 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-sm">
        <div className="grid gap-3 md:grid-cols-3">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search by customer name..."
            ariaLabel="Search by customer name"
          />

          <SearchBar
            value={emailSearch}
            onChange={setEmailSearch}
            placeholder="Search by email..."
            ariaLabel="Search by email"
            icon={Mail}
          />
          <div className="flex items-center gap-2.5 shrink-0 overflow-x-auto pb-1 sm:pb-0">
            <StatusFilter value={statusFilter} onChange={setStatusFilter} />
            <SortControl order={sortOrder} onChange={setSortOrder} />
          </div>
        </div>


      </div>

      {loading && customers.length === 0 ? (
        <TableSkeleton rows={pageSize} />
      ) : (
        <CustomerTable
          customers={paginatedCustomers}
          allFilteredCount={filteredCustomers.length}
          currentPage={page}
          totalPages={totalPages}
          pageSize={pageSize}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
          onViewCustomer={(cust) => setSelectedCustomer(cust)}
          onEditCustomer={(cust) => setEditingCustomer(cust)}
          onDeleteCustomer={(cust) => setDeletingCustomer(cust)}
          onClearFilters={handleClearFilters}
        />
      )}

      <CustomerDetailsDrawer
        customer={selectedCustomer}
        onClose={() => setSelectedCustomer(null)}
        onEdit={(cust) => {
          setSelectedCustomer(null);
          setEditingCustomer(cust);
        }}
        onDelete={(cust) => {
          setSelectedCustomer(null);
          setDeletingCustomer(cust);
        }}
      />

      <EditCustomerModal
        customer={editingCustomer}
        isOpen={!!editingCustomer}
        onClose={() => setEditingCustomer(null)}
        onSubmit={updateCustomer}
      />

      <ConfirmDialog
        isOpen={!!deletingCustomer}
        title="Delete Customer"
        message={`Are you sure you want to delete ${deletingCustomer?.name || 'this customer'}? This action will permanently remove their profile and records.`}
        confirmText="Delete Customer"
        onConfirm={handleConfirmDelete}
        onClose={() => setDeletingCustomer(null)}
      />
    </div>
  );
};
