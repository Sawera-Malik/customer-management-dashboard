import { Customer, CustomerStatus, JSONPlaceholderUser } from '../../../types';
import { storageService } from '../../../libs/storageService';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

const AVATAR_COLORS = [
  'bg-blue-500',
  'bg-indigo-500',
  'bg-purple-500',
  'bg-emerald-500',
  'bg-amber-500',
  'bg-rose-500',
  'bg-cyan-500',
  'bg-teal-500',
];

function mapApiUserToCustomer(user: JSONPlaceholderUser): Customer {
  const status: CustomerStatus = user.id % 3 === 0 ? 'Inactive' : 'Active';
  const colorIndex = (user.id - 1) % AVATAR_COLORS.length;
  const mockRevenue = (user.id * 1450 + 2300);

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    company: user.company?.name || 'Independent Partner',
    status: status,
    address: {
      street: user.address?.street || '123 Tech Blvd',
      suite: user.address?.suite || 'Suite 400',
      city: user.address?.city || 'San Francisco',
      zipcode: user.address?.zipcode || '94107',
    },
    website: user.website ? (user.website.startsWith('http') ? user.website : `https://${user.website}`) : 'https://example.com',
    avatarColor: AVATAR_COLORS[colorIndex],
    createdAt: new Date(Date.now() - user.id * 86400000 * 12).toISOString(),
    monthlyRevenue: mockRevenue,
  };
}

export const customerService = {
 
  async fetchCustomers(): Promise<Customer[]> {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`Failed to load customers (HTTP ${response.status})`);
    }

    const rawData: JSONPlaceholderUser[] = await response.json();
    const apiCustomers: Customer[] = rawData.map(mapApiUserToCustomer);

    const deletedIds = storageService.getDeletedCustomerIds();
    const editedCustomersMap = storageService.getEditedCustomers();
    const localAdditions = storageService.getLocalCustomers();

    const filteredApiCustomers = apiCustomers.filter(
      (cust) => !deletedIds.includes(cust.id)
    );

    const updatedApiCustomers = filteredApiCustomers.map((cust) => {
      if (editedCustomersMap[cust.id]) {
        return { ...cust, ...editedCustomersMap[cust.id] };
      }
      return cust;
    });

    const activeLocalAdditions = localAdditions.filter(
      (cust) => !deletedIds.includes(cust.id)
    );

    return [...activeLocalAdditions, ...updatedApiCustomers];
  },
};
