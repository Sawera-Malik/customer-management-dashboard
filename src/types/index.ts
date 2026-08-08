export type CustomerStatus = 'Active' | 'Inactive';

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
}

export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: CustomerStatus;
  address: Address;
  website: string;
  avatarColor?: string;
  createdAt: string; // ISO date string
  monthlyRevenue?: number;
}

export type ActivityType = 'added' | 'updated' | 'status_changed' | 'deleted';

export interface Activity {
  id: string;
  type: ActivityType;
  customerName: string;
  description: string;
  timestamp: string; // ISO date string or formatted time string
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: string;
}

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastMessage {
  id: string;
  type: ToastType;
  title: string;
  message: string;
}

export type SortField = 'name' | 'company' | 'email';
export type SortOrder = 'asc' | 'desc';

export interface CustomerFilterState {
  search: string;
  status: 'All' | CustomerStatus;
  sortOrder: SortOrder;
  page: number;
  pageSize: number;
}

export interface JSONPlaceholderUser {
  id: number;
  name: string;
  username: string;
  email: string;
  address?: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo?: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company?: {
    name: string;
    catchPhrase?: string;
    bs?: string;
  };
}
