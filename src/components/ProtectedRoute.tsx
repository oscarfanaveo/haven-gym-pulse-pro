
import { useAuth } from "@/contexts/AuthContext";
import { useLocation, Navigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, loading, hasPermission, getDefaultRoute } = useAuth();
  const location = useLocation();

  console.log('🔒 ProtectedRoute - Ruta:', location.pathname);
  console.log('🔒 ProtectedRoute - Autenticado:', isAuthenticated);
  console.log('🔒 ProtectedRoute - Cargando:', loading);

  if (loading) {
    return (
      <div className="min-h-screen bg-haven-dark flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-haven-red" />
      </div>
    );
  }

  if (!isAuthenticated) {
    console.log('❌ No autenticado, redirigiendo a login');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if user has permission to access this route
  if (!hasPermission(location.pathname)) {
    console.log('❌ Sin permisos para:', location.pathname);
    const defaultRoute = getDefaultRoute();
    console.log('🔄 Redirigiendo a ruta por defecto:', defaultRoute);
    return <Navigate to={defaultRoute} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
