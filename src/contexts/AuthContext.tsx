import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface UserProfile {
  id: string;
  full_name: string;
  role: 'admin' | 'recepcion' | 'trainer';
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  session: Session | null;
  login: (email: string, password: string) => Promise<{ error: string | null }>;
  signup: (email: string, password: string, fullName: string, role?: 'admin' | 'recepcion' | 'trainer') => Promise<{ error: string | null }>;
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

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  // Permisos por rol - Actualizados para que recepcion tenga acceso limitado a usuarios
  const ROLE_PERMISSIONS = {
    admin: ['/', '/subscriptions', '/sales', '/products', '/reports', '/training', '/users', '/subscription-plans', '/client-tracking'],
    recepcion: ['/', '/subscriptions', '/sales', '/products', '/training', '/client-tracking', '/users'], // Agregado /users para recepcion
    trainer: ['/training', '/client-tracking']
  };

  // Rutas por defecto por rol
  const DEFAULT_ROUTES = {
    admin: '/',
    recepcion: '/client-tracking',
    trainer: '/training'
  };

  const fetchUserProfile = async (userId: string) => {
    try {
      console.log('🔍 Obteniendo perfil del usuario:', userId);
      const { data, error } = await supabase
        .from('profiles')
        .select('id, full_name, role')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('❌ Error al obtener perfil:', error);
        return null;
      }

      console.log('✅ Perfil obtenido:', data);
      return data;
    } catch (error) {
      console.error('💥 Error general al obtener perfil:', error);
      return null;
    }
  };

  useEffect(() => {
    console.log('🚀 Inicializando AuthProvider...');
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('🔄 Estado de autenticación cambió:', event, session?.user?.id);
        
        // Manejar eventos específicos de confirmación
        if (event === 'SIGNED_IN' && session?.user) {
          console.log('✅ Usuario confirmado y autenticado');
        }
        
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Fetch user profile after auth state change
          setTimeout(async () => {
            const userProfile = await fetchUserProfile(session.user.id);
            setProfile(userProfile);
            setLoading(false);
          }, 0);
        } else {
          setProfile(null);
          setLoading(false);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('🔍 Sesión existente:', session?.user?.id);
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        fetchUserProfile(session.user.id).then((userProfile) => {
          setProfile(userProfile);
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const hasPermission = (page: string): boolean => {
    if (!profile) {
      console.log('❌ No hay perfil, sin permisos para:', page);
      return false;
    }
    
    const permissions = ROLE_PERMISSIONS[profile.role] || [];
    const hasAccess = permissions.includes(page);
    
    console.log('🔐 Verificando permisos:');
    console.log('  - Usuario:', profile.full_name);
    console.log('  - Rol:', profile.role);
    console.log('  - Página:', page);
    console.log('  - Permisos disponibles:', permissions);
    console.log('  - Acceso permitido:', hasAccess);
    
    return hasAccess;
  };

  const getDefaultRoute = (): string => {
    if (!profile) return '/';
    return DEFAULT_ROUTES[profile.role] || '/';
  };

  const login = async (email: string, password: string) => {
    try {
      console.log('🔐 Intentando iniciar sesión para:', email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('❌ Error en login:', error);
        return { error: error.message };
      }

      console.log('✅ Login exitoso:', data.user?.id);
      return { error: null };
    } catch (error) {
      console.error('💥 Error general en login:', error);
      return { error: 'Error de conexión. Intente nuevamente.' };
    }
  };

  const signup = async (email: string, password: string, fullName: string, role: 'admin' | 'recepcion' | 'trainer' = 'recepcion') => {
    try {
      console.log('📝 Registrando nuevo usuario:', email, role);
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/login`,
          data: {
            full_name: fullName,
            role: role
          }
        }
      });

      if (error) {
        console.error('❌ Error en registro:', error);
        return { error: error.message };
      }

      console.log('✅ Registro exitoso - Confirmación requerida:', data.user?.id);
      
      // Si el usuario necesita confirmación de email
      if (data.user && !data.user.email_confirmed_at) {
        console.log('📧 Email de confirmación enviado');
      }
      
      return { error: null };
    } catch (error) {
      console.error('💥 Error general en registro:', error);
      return { error: 'Error de conexión. Intente nuevamente.' };
    }
  };

  const logout = async () => {
    console.log('👋 Cerrando sesión...');
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    setSession(null);
  };

  const value = {
    user,
    profile,
    session,
    login,
    signup,
    logout,
    isAuthenticated: !!user && !!profile,
    hasPermission,
    getDefaultRoute,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
