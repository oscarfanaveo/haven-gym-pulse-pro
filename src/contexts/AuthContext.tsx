
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  username: string;
  role: 'admin' | 'recepcion' | 'trainer';
  fullName: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<{ error: string | null }>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  hasPermission: (page: string) => boolean;
  getDefaultRoute: () => string;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Usuarios hardcodeados
const HARDCODED_USERS: User[] = [
  {
    id: '1',
    username: 'admin',
    role: 'admin',
    fullName: 'Administrador'
  },
  {
    id: '2',
    username: 'Rolo',
    role: 'recepcion',
    fullName: 'Rolo García'
  }
];

// Contraseñas hardcodeadas
const USER_PASSWORDS: { [key: string]: string } = {
  'admin': '205531',
  'Rolo': 'date123'
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Permisos por rol
  const ROLE_PERMISSIONS = {
    admin: ['/', '/subscriptions', '/sales', '/products', '/reports', '/training', '/users', '/subscription-plans', '/client-tracking'],
    recepcion: ['/subscriptions', '/sales', '/products', '/training', '/client-tracking'],
    trainer: ['/training', '/client-tracking']
  };

  // Rutas por defecto por rol
  const DEFAULT_ROUTES = {
    admin: '/',
    recepcion: '/client-tracking',
    trainer: '/training'
  };

  useEffect(() => {
    // Verificar si hay un usuario guardado en localStorage
    const savedUser = localStorage.getItem('haven-gym-user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('haven-gym-user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    try {
      // Verificar credenciales
      const foundUser = HARDCODED_USERS.find(u => u.username === username);
      
      if (!foundUser) {
        return { error: 'Usuario no encontrado' };
      }

      if (USER_PASSWORDS[username] !== password) {
        return { error: 'Contraseña incorrecta' };
      }

      // Guardar usuario en localStorage y estado
      setUser(foundUser);
      localStorage.setItem('haven-gym-user', JSON.stringify(foundUser));

      return { error: null };
    } catch (error) {
      return { error: 'Error de conexión. Intente nuevamente.' };
    }
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem('haven-gym-user');
  };

  const hasPermission = (page: string): boolean => {
    if (!user) return false;
    const permissions = ROLE_PERMISSIONS[user.role] || [];
    return permissions.includes(page);
  };

  const getDefaultRoute = (): string => {
    if (!user) return '/';
    return DEFAULT_ROUTES[user.role] || '/';
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    hasPermission,
    getDefaultRoute,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
