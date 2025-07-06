
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Loader2, AlertCircle } from "lucide-react";

const Login = () => {
  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  
  // UI state
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, isAuthenticated, getDefaultRoute, loading, user, profile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();

  // Debug: mostrar estado de autenticación
  useEffect(() => {
    console.log('🔍 Estado de Login:', { 
      isAuthenticated, 
      loading, 
      user: user?.id, 
      profile: profile?.role 
    });
  }, [isAuthenticated, loading, user, profile]);

  // Manejar confirmación de email desde URL
  useEffect(() => {
    const error = searchParams.get('error');
    const errorDescription = searchParams.get('error_description');
    
    if (error) {
      console.error('❌ Error de confirmación:', error, errorDescription);
      toast({
        variant: "destructive",
        title: "Error de confirmación",
        description: errorDescription || "Hubo un problema al confirmar tu email."
      });
    } else if (searchParams.get('type') === 'signup') {
      console.log('✅ Email confirmado exitosamente');
      toast({
        title: "Email confirmado",
        description: "Tu cuenta ha sido activada exitosamente. Ya puedes iniciar sesión."
      });
    }
  }, [searchParams, toast]);

  useEffect(() => {
    if (isAuthenticated && !loading) {
      console.log('✅ Usuario autenticado, redirigiendo...');
      const defaultRoute = getDefaultRoute();
      console.log('🎯 Ruta de destino:', defaultRoute);
      navigate(defaultRoute);
    }
  }, [isAuthenticated, loading, navigate, getDefaultRoute]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!loginEmail || !loginPassword) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Por favor complete todos los campos."
      });
      return;
    }

    console.log('🔐 Iniciando proceso de login...');
    setIsLoading(true);
    
    const { error } = await login(loginEmail, loginPassword);
    
    if (error) {
      console.error('❌ Error en login:', error);
      
      // Mensajes de error más específicos
      let errorMessage = error;
      if (error.includes('Invalid login credentials')) {
        errorMessage = "Credenciales incorrectas. Verifica tu email y contraseña.";
      } else if (error.includes('Email not confirmed')) {
        errorMessage = "Tu email aún no ha sido confirmado. Revisa tu bandeja de entrada y confirma tu cuenta antes de iniciar sesión.";
      } else if (error.includes('Too many requests')) {
        errorMessage = "Demasiados intentos. Espera un momento antes de intentar nuevamente.";
      }
      
      toast({
        variant: "destructive",
        title: "Error de acceso",
        description: errorMessage
      });
    } else {
      console.log('✅ Login exitoso');
      toast({
        title: "Bienvenido",
        description: "Has iniciado sesión correctamente."
      });
    }
    
    setIsLoading(false);
  };

  if (loading) {
    console.log('⏳ Cargando autenticación...');
    return (
      <div className="min-h-screen bg-haven-dark flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-haven-red mx-auto mb-4" />
          <p className="text-white/60">Verificando autenticación...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-haven-dark flex items-center justify-center p-4">
      <Card className="w-full max-w-md haven-card">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl text-white">
            Haven Gym
          </CardTitle>
          <CardDescription className="text-white/60">
            Sistema de gestión del gimnasio
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="login-email" className="text-sm font-medium text-white">
                Correo Electrónico
              </label>
              <Input
                id="login-email"
                type="email"
                placeholder="tu@correo.com"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="bg-haven-gray border-white/10 text-white"
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="login-password" className="text-sm font-medium text-white">
                Contraseña
              </label>
              <Input
                id="login-password"
                type="password"
                placeholder="Ingresa tu contraseña"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="bg-haven-gray border-white/10 text-white"
                disabled={isLoading}
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-haven-red hover:bg-haven-red/90"
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Iniciar Sesión
            </Button>
          </form>
          
          <Alert className="mt-4 border-blue-200/20 bg-blue-500/5">
            <AlertCircle className="h-4 w-4 text-blue-400" />
            <AlertDescription className="text-white/80 text-sm">
              Para crear nuevos usuarios, contacta al administrador del sistema.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
