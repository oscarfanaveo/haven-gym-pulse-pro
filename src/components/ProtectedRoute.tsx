
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, hasPermission, getDefaultRoute } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Verificar si el usuario tiene permiso para acceder a esta ruta
  if (!hasPermission(location.pathname)) {
    // Redirigir a la ruta por defecto del rol en lugar de la raíz
    return <Navigate to={getDefaultRoute()} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
