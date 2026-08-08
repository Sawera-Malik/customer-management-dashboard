import React, { createContext, useContext, useState } from 'react';
import { AuthUser } from '../types';
import { storageService } from '../services/storageService';

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (email: string) => Promise<boolean>;
  logout: () => void;
}

const DEFAULT_USER: AuthUser = {
  id: 'usr-1',
  name: 'Alex Morgan',
  email: 'alex.morgan@saascorp.com',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  role: 'Senior CRM Lead',
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(() => {
    if (storageService.isAuthenticated()) {
      return storageService.getAuthUser() || DEFAULT_USER;
    }
    return null;
  });

  const isAuthenticated = !!user;

  const login = async (email: string): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 800));

    const loggedInUser: AuthUser = {
      ...DEFAULT_USER,
      email: email || DEFAULT_USER.email,
    };

    setUser(loggedInUser);
    storageService.setAuthUser(loggedInUser);
    return true;
  };

  const logout = () => {
    setUser(null);
    storageService.setAuthUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
