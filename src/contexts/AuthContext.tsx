
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  username: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
  hasPermission: (page: string) => boolean;
  getDefaultRoute: () => string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Usuarios del sistema con sus credenciales y roles
  const USERS = [
    {
      username: "Admin",
      password: "205531",
      role: "admin"
    },
    {
      username: "Rolo",
      password: "date123", 
      role: "recepcion"
    }
  ];

  // Permisos por rol
  const ROLE_PERMISSIONS = {
    admin: ['/', '/subscriptions', '/sales', '/products', '/reports', '/training', '/users', '/subscription-plans', '/client-tracking'],
    recepcion: ['/subscriptions', '/sales', '/products', '/training', '/client-tracking']
  };

  // Rutas por defecto por rol
  const DEFAULT_ROUTES = {
    admin: '/',
    recepcion: '/client-tracking'
  };

  useEffect(() => {
    // Check if user is already logged in (from localStorage)
    const savedUser = localStorage.getItem('havenGymUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (username: string, password: string): boolean => {
    const foundUser = USERS.find(u => u.username === username && u.password === password);
    
    if (foundUser) {
      const userData = { username: foundUser.username, role: foundUser.role };
      setUser(userData);
      localStorage.setItem('havenGymUser', JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('havenGymUser');
  };

  const hasPermission = (page: string): boolean => {
    if (!user) return false;
    const permissions = ROLE_PERMISSIONS[user.role as keyof typeof ROLE_PERMISSIONS] || [];
    return permissions.includes(page);
  };

  const getDefaultRoute = (): string => {
    if (!user) return '/';
    return DEFAULT_ROUTES[user.role as keyof typeof DEFAULT_ROUTES] || '/';
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    hasPermission,
    getDefaultRoute,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
