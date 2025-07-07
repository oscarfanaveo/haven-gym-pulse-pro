
import { useState, useEffect } from "react";
import { 
  UserPlus, Pencil, Trash2, UserCog
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2, Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface User {
  id: string;
  username: string;
  fullName: string;
  role: 'admin' | 'recepcion' | 'trainer';
}

interface FormData {
  username: string;
  fullName: string;
  role: 'admin' | 'recepcion' | 'trainer';
  password: string;
  confirmPassword: string;
}

const Users = () => {
  const { toast } = useToast();
  const { signup } = useAuth();
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  
  // Estado para usuarios reales desde la base de datos
  const [users, setUsers] = useState<User[]>([]);
  
  // Estado para formulario
  const [formData, setFormData] = useState<FormData>({
    username: "",
    fullName: "",
    role: "recepcion",
    password: "",
    confirmPassword: "",
  });

  // Función para obtener usuarios desde la base de datos
  const fetchUsers = async () => {
    try {
      console.log('🔍 Obteniendo usuarios desde la base de datos...');
      setIsLoadingUsers(true);
      
      // Obtener perfiles con información de los usuarios
      const { data: profiles, error } = await supabase
        .from('profiles')
        .select('id, full_name, role')
        .order('full_name');

      if (error) {
        console.error('❌ Error al obtener usuarios:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "No se pudieron cargar los usuarios."
        });
        return;
      }

      // Transformar los datos al formato esperado
      const transformedUsers: User[] = profiles.map(profile => ({
        id: profile.id,
        username: profile.id, // Usamos el ID como username temporalmente
        fullName: profile.full_name || 'Sin nombre',
        role: profile.role
      }));

      console.log('✅ Usuarios obtenidos:', transformedUsers.length);
      setUsers(transformedUsers);
    } catch (error) {
      console.error('💥 Error general al obtener usuarios:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Hubo un problema al cargar los usuarios."
      });
    } finally {
      setIsLoadingUsers(false);
    }
  };

  // Effect para cargar usuarios al montar el componente
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (value: string) => {
    setFormData((prev) => ({ ...prev, role: value as 'admin' | 'recepcion' | 'trainer' }));
  };

  const resetForm = () => {
    setFormData({
      username: "",
      fullName: "",
      role: "recepcion",
      password: "",
      confirmPassword: "",
    });
  };

  const handleAddUser = async () => {
    if (!formData.username || !formData.password || !formData.fullName) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Por favor complete todos los campos obligatorios."
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Las contraseñas no coinciden."
      });
      return;
    }

    if (formData.password.length < 6) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "La contraseña debe tener al menos 6 caracteres."
      });
      return;
    }

    console.log('📝 Creando nuevo usuario desde admin...');
    setIsLoading(true);
    
    const { error } = await signup(formData.username, formData.password, formData.fullName, formData.role);
    
    if (error) {
      console.error('❌ Error al crear usuario:', error);
      
      // Mensajes de error más específicos
      let errorMessage = error;
      if (error.includes('User already registered')) {
        errorMessage = "Este email ya está registrado.";
      } else if (error.includes('Password should be at least 6 characters')) {
        errorMessage = "La contraseña debe tener al menos 6 caracteres.";
      } else if (error.includes('Unable to validate email address')) {
        errorMessage = "Email inválido. Por favor verifica el formato.";
      }
      
      toast({
        variant: "destructive",
        title: "Error al crear usuario",
        description: errorMessage
      });
    } else {
      console.log('✅ Usuario creado exitosamente');
      toast({
        title: "Usuario creado",
        description: "El usuario ha sido creado exitosamente. Se ha enviado un email de confirmación."
      });
      
      resetForm();
      setIsAddUserModalOpen(false);
      
      // Recargar la lista de usuarios
      fetchUsers();
    }
    
    setIsLoading(false);
  };

  const handleEditUser = async () => {
    toast({
      variant: "destructive",
      title: "Funcionalidad no disponible",
      description: "La edición de usuarios aún no está implementada."
    });
  };

  const openEditModal = (user: User) => {
    setSelectedUser(user);
    setFormData({
      username: user.username,
      fullName: user.fullName,
      role: user.role,
      password: "",
      confirmPassword: "",
    });
    setIsEditUserModalOpen(true);
  };

  const handleDeleteUser = async (userId: string) => {
    toast({
      variant: "destructive",
      title: "Funcionalidad no disponible",
      description: "La eliminación de usuarios aún no está implementada."
    });
  };

  const getRoleDisplayText = (role: string) => {
    switch (role) {
      case "admin": return "Administrador";
      case "recepcion": return "Recepción";
      case "trainer": return "Entrenador";
      default: return role;
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <UserCog className="h-6 w-6" />
            Gestión de Usuarios
          </h1>
          <p className="text-muted-foreground">
            Administra los usuarios del sistema
          </p>
        </div>
        <Dialog open={isAddUserModalOpen} onOpenChange={setIsAddUserModalOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <UserPlus className="h-5 w-5" />
              Añadir Usuario
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Crear Nuevo Usuario</DialogTitle>
              <DialogDescription>
                Complete los datos para crear un nuevo usuario del sistema.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="fullName" className="text-sm font-medium">
                  Nombre Completo
                </label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Nombre completo del usuario"
                  disabled={isLoading}
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="username" className="text-sm font-medium">
                  Correo Electrónico
                </label>
                <Input
                  id="username"
                  name="username"
                  type="email"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="usuario@correo.com"
                  disabled={isLoading}
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="role" className="text-sm font-medium">
                  Rol
                </label>
                <Select 
                  value={formData.role} 
                  onValueChange={handleRoleChange}
                  disabled={isLoading}
                >
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Seleccione un rol" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recepcion">Recepción</SelectItem>
                    <SelectItem value="trainer">Entrenador</SelectItem>
                    <SelectItem value="admin">Administrador</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Contraseña
                </label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Mínimo 6 caracteres"
                  disabled={isLoading}
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="confirmPassword" className="text-sm font-medium">
                  Confirmar Contraseña
                </label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirmar contraseña"
                  disabled={isLoading}
                />
              </div>
              
              <Alert className="border-blue-200/20 bg-blue-500/5">
                <Mail className="h-4 w-4 text-blue-400" />
                <AlertDescription className="text-sm">
                  Se enviará un email de confirmación al usuario para activar su cuenta.
                </AlertDescription>
              </Alert>
            </div>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => {
                  resetForm();
                  setIsAddUserModalOpen(false);
                }}
                disabled={isLoading}
              >
                Cancelar
              </Button>
              <Button 
                type="submit" 
                onClick={handleAddUser}
                disabled={isLoading}
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Crear Usuario
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={isEditUserModalOpen} onOpenChange={setIsEditUserModalOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Editar Usuario</DialogTitle>
              <DialogDescription>
                Funcionalidad de edición pendiente de implementar.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="edit-username">Nombre de Usuario</label>
                <Input
                  id="edit-username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="Nombre de usuario"
                  disabled
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="edit-fullName">Nombre Completo</label>
                <Input
                  id="edit-fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Nombre completo"
                  disabled
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="edit-role">Rol</label>
                <Select value={formData.role} onValueChange={handleRoleChange} disabled>
                  <SelectTrigger id="edit-role">
                    <SelectValue placeholder="Seleccione un rol" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Administrador</SelectItem>
                    <SelectItem value="recepcion">Recepción</SelectItem>
                    <SelectItem value="trainer">Entrenador</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => {
                resetForm();
                setIsEditUserModalOpen(false);
              }}>
                Cancelar
              </Button>
              <Button type="submit" onClick={handleEditUser} disabled>
                Actualizar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Rol</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoadingUsers ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8">
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Cargando usuarios...
                  </div>
                </TableCell>
              </TableRow>
            ) : users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                  No hay usuarios registrados en el sistema
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-mono text-sm">{user.id.substring(0, 8)}...</TableCell>
                  <TableCell className="font-medium">{user.fullName}</TableCell>
                  <TableCell>{getRoleDisplayText(user.role)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => openEditModal(user)}
                        disabled
                      >
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Editar</span>
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleDeleteUser(user.id)}
                        disabled
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                        <span className="sr-only">Eliminar</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Users;
