import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react';
import { Customer, Activity, CustomerStatus, SortOrder } from '../types';
import { customerService } from '../services/customerService';
import { storageService } from '../services/storageService';
import { useToast } from './ToastContext';

interface CustomerContextType {
  customers: Customer[];
  filteredCustomers: Customer[];
  paginatedCustomers: Customer[];
  activities: Activity[];
  loading: boolean;
  error: string | null;

  search: string;
  setSearch: (query: string) => void;
  emailSearch: string;
  setEmailSearch: (query: string) => void;
  statusFilter: 'All' | CustomerStatus;
  setStatusFilter: (status: 'All' | CustomerStatus) => void;
  sortOrder: SortOrder;
  setSortOrder: (order: SortOrder) => void;
  page: number;
  setPage: (page: number | ((prev: number) => number)) => void;
  pageSize: number;
  setPageSize: (size: number) => void;
  totalPages: number;

  // Modals & Drawers
  selectedCustomer: Customer | null;
  setSelectedCustomer: (customer: Customer | null) => void;
  editingCustomer: Customer | null;
  setEditingCustomer: (customer: Customer | null) => void;
  deletingCustomer: Customer | null;
  setDeletingCustomer: (customer: Customer | null) => void;

  // Operations
  fetchCustomers: () => Promise<void>;
  addCustomer: (customerData: Omit<Customer, 'id' | 'createdAt'>) => Promise<Customer>;
  updateCustomer: (id: number, customerData: Partial<Customer>) => Promise<Customer>;
  deleteCustomer: (id: number) => Promise<void>;
  resetDemoData: () => Promise<void>;
}

const CustomerContext = createContext<CustomerContextType | undefined>(undefined);

export const CustomerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { showToast } = useToast();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [activities, setActivities] = useState<Activity[]>(() => storageService.getActivities());
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearchState] = useState<string>('');
  const [emailSearch, setEmailSearchState] = useState<string>('');
  const [statusFilter, setStatusFilterState] = useState<'All' | CustomerStatus>('All');
  const [sortOrder, setSortOrderState] = useState<SortOrder>('asc');
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);

  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [deletingCustomer, setDeletingCustomer] = useState<Customer | null>(null);

  const fetchCustomers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await customerService.fetchCustomers();
      setCustomers(data);
    } catch (err: any) {
      console.error('Error fetching customers:', err);
      setError(err.message || 'Unable to connect to customer database. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  const setSearch = (query: string) => {
    setSearchState(query);
    setPage(1);
  };

  const setEmailSearch = (query: string) => {
    setEmailSearchState(query);
    setPage(1);
  };

  const setStatusFilter = (status: 'All' | CustomerStatus) => {
    setStatusFilterState(status);
    setPage(1);
  };

  const setSortOrder = (order: SortOrder) => {
    setSortOrderState(order);
    setPage(1);
  };

  const filteredCustomers = useMemo(() => {
    let result = [...customers];

    if (search.trim()) {
      const query = search.toLowerCase().trim();
      result = result.filter((c) => c.name.toLowerCase().includes(query));
    }

    if (emailSearch.trim()) {
      const query = emailSearch.toLowerCase().trim();
      result = result.filter((c) => c.email.toLowerCase().includes(query));
    }

    if (statusFilter !== 'All') {
      result = result.filter((c) => c.status === statusFilter);
    }

    result.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      if (sortOrder === 'asc') {
        return nameA.localeCompare(nameB);
      } else {
        return nameB.localeCompare(nameA);
      }
    });

    return result;
  }, [customers, emailSearch, search, statusFilter, sortOrder]);

  const totalPages = Math.ceil(filteredCustomers.length / pageSize) || 1;

  const paginatedCustomers = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredCustomers.slice(start, start + pageSize);
  }, [filteredCustomers, page, pageSize]);

  useEffect(() => {
    if (page > totalPages && totalPages > 0) {
      setPage(totalPages);
    }
  }, [totalPages, page]);

  const logActivity = (type: Activity['type'], customerName: string, description: string) => {
    const act = storageService.addActivity({
      type,
      customerName,
      description,
    });
    setActivities((prev) => [act, ...prev.slice(0, 49)]);
  };

  const addCustomer = async (customerData: Omit<Customer, 'id' | 'createdAt'>): Promise<Customer> => {
    const newId = Date.now();
    const colors = [
      'bg-blue-500',
      'bg-indigo-500',
      'bg-purple-500',
      'bg-emerald-500',
      'bg-amber-500',
      'bg-rose-500',
      'bg-cyan-500',
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const newCustomer: Customer = {
      ...customerData,
      id: newId,
      createdAt: new Date().toISOString(),
      avatarColor: randomColor,
      monthlyRevenue: customerData.monthlyRevenue || 3500,
    };

    storageService.saveLocalCustomer(newCustomer);

    setCustomers((prev) => [newCustomer, ...prev]);

    logActivity('added', newCustomer.name, 'Added as a new customer');

    showToast('Customer Created', `${newCustomer.name} was added successfully!`, 'success');

    return newCustomer;
  };

  const updateCustomer = async (id: number, customerData: Partial<Customer>): Promise<Customer> => {
    let updatedObj: Customer | null = null;

    setCustomers((prev) => {
      return prev.map((c) => {
        if (c.id === id) {
          updatedObj = { ...c, ...customerData };
          return updatedObj;
        }
        return c;
      });
    });

    if (!updatedObj) {
      throw new Error('Customer not found');
    }

    const finalCustomer = updatedObj as Customer;

    const original = customers.find((c) => c.id === id);
    if (original && original.status !== finalCustomer.status) {
      logActivity(
        'status_changed',
        finalCustomer.name,
        `Status changed from ${original.status} to ${finalCustomer.status}`
      );
    } else {
      logActivity('updated', finalCustomer.name, 'Updated customer details');
    }

    storageService.saveEditedCustomer(finalCustomer);

    if (selectedCustomer?.id === id) {
      setSelectedCustomer(finalCustomer);
    }

    showToast('Customer Updated', `${finalCustomer.name}'s profile has been updated.`, 'success');

    return finalCustomer;
  };

  const deleteCustomer = async (id: number): Promise<void> => {
    const customerToDelete = customers.find((c) => c.id === id);
    const name = customerToDelete?.name || 'Customer';

    storageService.addDeletedCustomerId(id);

    setCustomers((prev) => prev.filter((c) => c.id !== id));

    if (selectedCustomer?.id === id) {
      setSelectedCustomer(null);
    }

    logActivity('deleted', name, 'Customer record permanently removed');

    showToast('Customer Deleted', `${name} has been removed.`, 'info');
  };

  const resetDemoData = async () => {
    storageService.resetAllData();
    showToast('Demo Data Reset', 'Restored initial sample customer dataset.', 'info');
    await fetchCustomers();
    setActivities(storageService.getActivities());
  };

  return (
    <CustomerContext.Provider
      value={{
        customers,
        filteredCustomers,
        paginatedCustomers,
        activities,
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
        addCustomer,
        updateCustomer,
        deleteCustomer,
        resetDemoData,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
};

export const useCustomers = (): CustomerContextType => {
  const context = useContext(CustomerContext);
  if (!context) {
    throw new Error('useCustomers must be used within a CustomerProvider');
  }
  return context;
};
