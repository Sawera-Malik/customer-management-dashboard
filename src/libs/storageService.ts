import { Customer, Activity, AuthUser } from '../types';

const KEYS = {
  AUTH_USER: 'crm_auth_user',
  IS_AUTH: 'crm_is_authenticated',
  LOCAL_CUSTOMERS: 'crm_local_customers',
  EDITED_CUSTOMERS: 'crm_edited_customers',
  DELETED_IDS: 'crm_deleted_customer_ids',
  ACTIVITIES: 'crm_recent_activities',
  THEME: 'crm_app_theme',
};

const DEFAULT_ACTIVITIES: Activity[] = [
  {
    id: 'act-1',
    type: 'added',
    customerName: 'Sarah Jenkins',
    description: 'New customer profile registered',
    timestamp: new Date(Date.now() - 1000 * 60 * 25).toISOString(), // 25 mins ago
  },
  {
    id: 'act-2',
    type: 'status_changed',
    customerName: 'Leanne Graham',
    description: 'Subscription status changed to Active',
    timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString(), // 3 hours ago
  },
  {
    id: 'act-3',
    type: 'updated',
    customerName: 'Ervin Howell',
    description: 'Company information updated',
    timestamp: new Date(Date.now() - 1000 * 60 * 600).toISOString(), // 10 hours ago
  },
  {
    id: 'act-4',
    type: 'deleted',
    customerName: 'Marcus Vance',
    description: 'Customer record removed by admin',
    timestamp: new Date(Date.now() - 1000 * 60 * 1440).toISOString(), // 1 day ago
  },
];

export const storageService = {
  getAuthUser(): AuthUser | null {
    try {
      const data = localStorage.getItem(KEYS.AUTH_USER);
      return data ? JSON.parse(data) : null;
    } catch (err) {
      console.error('Error reading auth user from storage:', err);
      return null;
    }
  },

  setAuthUser(user: AuthUser | null): void {
    try {
      if (user) {
        localStorage.setItem(KEYS.AUTH_USER, JSON.stringify(user));
        localStorage.setItem(KEYS.IS_AUTH, 'true');
      } else {
        localStorage.removeItem(KEYS.AUTH_USER);
        localStorage.removeItem(KEYS.IS_AUTH);
      }
    } catch (err) {
      console.error('Error saving auth user to storage:', err);
    }
  },

  isAuthenticated(): boolean {
    return localStorage.getItem(KEYS.IS_AUTH) === 'true';
  },

  getLocalCustomers(): Customer[] {
    try {
      const data = localStorage.getItem(KEYS.LOCAL_CUSTOMERS);
      return data ? JSON.parse(data) : [];
    } catch (err) {
      console.error('Error reading local customers from storage:', err);
      return [];
    }
  },

  saveLocalCustomer(customer: Customer): void {
    try {
      const current = this.getLocalCustomers();
      const index = current.findIndex((c) => c.id === customer.id);
      if (index >= 0) {
        current[index] = customer;
      } else {
        current.unshift(customer);
      }
      localStorage.setItem(KEYS.LOCAL_CUSTOMERS, JSON.stringify(current));
    } catch (err) {
      console.error('Error saving local customer to storage:', err);
    }
  },

  getEditedCustomers(): Record<number, Partial<Customer>> {
    try {
      const data = localStorage.getItem(KEYS.EDITED_CUSTOMERS);
      return data ? JSON.parse(data) : {};
    } catch (err) {
      console.error('Error reading edited customers from storage:', err);
      return {};
    }
  },

  saveEditedCustomer(customer: Customer): void {
    try {
      const current = this.getEditedCustomers();
      current[customer.id] = customer;
      localStorage.setItem(KEYS.EDITED_CUSTOMERS, JSON.stringify(current));
    } catch (err) {
      console.error('Error saving edited customer:', err);
    }
  },

  getDeletedCustomerIds(): number[] {
    try {
      const data = localStorage.getItem(KEYS.DELETED_IDS);
      return data ? JSON.parse(data) : [];
    } catch (err) {
      console.error('Error reading deleted customer IDs from storage:', err);
      return [];
    }
  },

  addDeletedCustomerId(id: number): void {
    try {
      const deletedIds = this.getDeletedCustomerIds();
      if (!deletedIds.includes(id)) {
        deletedIds.push(id);
        localStorage.setItem(KEYS.DELETED_IDS, JSON.stringify(deletedIds));
      }

      const localCustomers = this.getLocalCustomers().filter((c) => c.id !== id);
      localStorage.setItem(KEYS.LOCAL_CUSTOMERS, JSON.stringify(localCustomers));
    } catch (err) {
      console.error('Error adding deleted customer ID:', err);
    }
  },

  getActivities(): Activity[] {
    try {
      const data = localStorage.getItem(KEYS.ACTIVITIES);
      return data ? JSON.parse(data) : DEFAULT_ACTIVITIES;
    } catch (err) {
      console.error('Error reading activities from storage:', err);
      return DEFAULT_ACTIVITIES;
    }
  },

  addActivity(activity: Omit<Activity, 'id' | 'timestamp'>): Activity {
    const newActivity: Activity = {
      ...activity,
      id: `act-${Date.now()}`,
      timestamp: new Date().toISOString(),
    };

    try {
      const activities = this.getActivities();
      activities.unshift(newActivity);
      // Keep last 50 activities
      const trimmed = activities.slice(0, 50);
      localStorage.setItem(KEYS.ACTIVITIES, JSON.stringify(trimmed));
    } catch (err) {
      console.error('Error adding activity to storage:', err);
    }

    return newActivity;
  },

  getTheme(): 'dark' | 'light' {
    try {
      const theme = localStorage.getItem(KEYS.THEME);
      if (theme === 'dark' || theme === 'light') return theme;
      // Default to dark mode for SaaS look
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } catch {
      return 'dark';
    }
  },

  setTheme(theme: 'dark' | 'light'): void {
    try {
      localStorage.setItem(KEYS.THEME, theme);
    } catch (err) {
      console.error('Error saving theme:', err);
    }
  },

  resetAllData(): void {
    try {
      localStorage.removeItem(KEYS.LOCAL_CUSTOMERS);
      localStorage.removeItem(KEYS.EDITED_CUSTOMERS);
      localStorage.removeItem(KEYS.DELETED_IDS);
      localStorage.setItem(KEYS.ACTIVITIES, JSON.stringify(DEFAULT_ACTIVITIES));
    } catch (err) {
      console.error('Error resetting data:', err);
    }
  },
};
