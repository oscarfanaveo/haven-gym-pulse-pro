
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Loader2, CheckCircle, Mail } from "lucide-react";

const Login = () => {
  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  
  // Signup form state
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupFullName, setSignupFullName] = useState("");
  const [signupRole, setSignupRole] = useState<'admin' | 'recepcion' | 'trainer'>('recepcion');
  
  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [showEmailSent, setShowEmailSent] = useState(false);
  const [emailSentTo, setEmailSentTo] = useState("");
  
  const { login, signup, isAuthenticated, getDefaultRoute, loading, user, profile } = useAuth();
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

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!signupEmail || !signupPassword || !signupFullName) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Por favor complete todos los campos obligatorios."
      });
      return;
    }

    if (signupPassword.length < 6) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "La contraseña debe tener al menos 6 caracteres."
      });
      return;
    }

    console.log('📝 Iniciando proceso de registro...');
    setIsLoading(true);
    
    const { error } = await signup(signupEmail, signupPassword, signupFullName, signupRole);
    
    if (error) {
      console.error('❌ Error en registro:', error);
      
      // Mensajes de error más específicos
      let errorMessage = error;
      if (error.includes('User already registered')) {
        errorMessage = "Este email ya está registrado. Intenta iniciar sesión.";
      } else if (error.includes('Password should be at least 6 characters')) {
        errorMessage = "La contraseña debe tener al menos 6 caracteres.";
      } else if (error.includes('Unable to validate email address')) {
        errorMessage = "Email inválido. Por favor verifica el formato.";
      }
      
      toast({
        variant: "destructive",
        title: "Error de registro",
        description: errorMessage
      });
    } else {
      console.log('✅ Registro exitoso');
      // Mostrar pantalla de confirmación de email
      setShowEmailSent(true);
      setEmailSentTo(signupEmail);
      toast({
        title: "Registro exitoso",
        description: "Te hemos enviado un email de confirmación. Revisa tu bandeja de entrada."
      });
      
      // Clear signup form
      setSignupEmail("");
      setSignupPassword("");
      setSignupFullName("");
      setSignupRole('recepcion');
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

  // Pantalla de confirmación de email enviado
  if (showEmailSent) {
    return (
      <div className="min-h-screen bg-haven-dark flex items-center justify-center p-4">
        <Card className="w-full max-w-md haven-card">
          <CardHeader className="space-y-1 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-haven-red/10">
              <Mail className="h-6 w-6 text-haven-red" />
            </div>
            <CardTitle className="text-2xl text-white">
              Confirma tu email
            </CardTitle>
            <CardDescription className="text-white/60">
              Te hemos enviado un enlace de confirmación
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert className="border-haven-red/20 bg-haven-red/5">
              <CheckCircle className="h-4 w-4 text-haven-red" />
              <AlertDescription className="text-white">
                Hemos enviado un enlace de confirmación a <strong>{emailSentTo}</strong>.
                Haz clic en el enlace del email para activar tu cuenta.
              </AlertDescription>
            </Alert>
            
            <div className="space-y-2 text-sm text-white/60">
              <p>• Revisa tu bandeja de entrada y la carpeta de spam</p>
              <p>• El enlace expira en 24 horas</p>
              <p>• Una vez confirmado, podrás iniciar sesión</p>
            </div>
            
            <Button 
              onClick={() => setShowEmailSent(false)}
              variant="outline"
              className="w-full"
            >
              Volver al login
            </Button>
          </CardContent>
        </Card>
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
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-haven-gray">
              <TabsTrigger value="login" className="data-[state=active]:bg-haven-red">
                Iniciar Sesión
              </TabsTrigger>
              <TabsTrigger value="signup" className="data-[state=active]:bg-haven-red">
                Registrarse
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="login" className="space-y-4 mt-4">
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
            </TabsContent>
            
            <TabsContent value="signup" className="space-y-4 mt-4">
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="signup-name" className="text-sm font-medium text-white">
                    Nombre Completo
                  </label>
                  <Input
                    id="signup-name"
                    type="text"
                    placeholder="Tu nombre completo"
                    value={signupFullName}
                    onChange={(e) => setSignupFullName(e.target.value)}
                    className="bg-haven-gray border-white/10 text-white"
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="signup-email" className="text-sm font-medium text-white">
                    Correo Electrónico
                  </label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="tu@correo.com"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    className="bg-haven-gray border-white/10 text-white"
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="signup-password" className="text-sm font-medium text-white">
                    Contraseña
                  </label>
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="Mínimo 6 caracteres"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    className="bg-haven-gray border-white/10 text-white"
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="signup-role" className="text-sm font-medium text-white">
                    Rol
                  </label>
                  <Select value={signupRole} onValueChange={(value: 'admin' | 'recepcion' | 'trainer') => setSignupRole(value)}>
                    <SelectTrigger className="bg-haven-gray border-white/10 text-white">
                      <SelectValue placeholder="Selecciona un rol" />
                    </SelectTrigger>
                    <SelectContent className="bg-haven-gray border-white/10">
                      <SelectItem value="recepcion">Recepción</SelectItem>
                      <SelectItem value="trainer">Entrenador</SelectItem>
                      <SelectItem value="admin">Administrador</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Alert className="border-blue-200/20 bg-blue-500/5">
                  <Mail className="h-4 w-4 text-blue-400" />
                  <AlertDescription className="text-white/80 text-sm">
                    Te enviaremos un email de confirmación para activar tu cuenta.
                  </AlertDescription>
                </Alert>
                
                <Button 
                  type="submit" 
                  className="w-full bg-haven-red hover:bg-haven-red/90"
                  disabled={isLoading}
                >
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Crear Cuenta
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
