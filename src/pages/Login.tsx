
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated, getDefaultRoute, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (isAuthenticated && !loading) {
      navigate(getDefaultRoute());
    }
  }, [isAuthenticated, loading, navigate, getDefaultRoute]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Por favor complete todos los campos."
      });
      return;
    }

    setIsLoading(true);
    
    const { error } = await login(email, password);
    
    if (error) {
      toast({
        variant: "destructive",
        title: "Error de acceso",
        description: error
      });
    } else {
      toast({
        title: "Bienvenido",
        description: "Has iniciado sesión correctamente."
      });
    }
    
    setIsLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-haven-dark flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-haven-red" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-haven-dark flex items-center justify-center p-4">
      <Card className="w-full max-w-md haven-card">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center text-white">
            Haven Gym
          </CardTitle>
          <CardDescription className="text-center text-white/60">
            Ingresa tus credenciales para acceder al sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-white">
                Correo Electrónico
              </label>
              <Input
                id="email"
                type="email"
                placeholder="tu@correo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-haven-gray border-white/10 text-white"
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-white">
                Contraseña
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
          
          <div className="mt-6 p-4 bg-haven-gray/50 rounded-lg">
            <p className="text-sm text-white/60 mb-2">Credenciales de prueba:</p>
            <p className="text-xs text-white/80">
              <strong>Admin:</strong> admin@havengym.com / admin123<br/>
              <strong>Recepción:</strong> recepcion@havengym.com / recepcion123
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
