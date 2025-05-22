
import { useState } from "react";
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
import { useToast } from "@/hooks/use-toast";

const Users = () => {
  const { toast } = useToast();
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<null | User>(null);
  
  // Estado para formulario
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "staff",
    password: "",
    confirmPassword: "",
  });

  // Datos de muestra
  const [users, setUsers] = useState<User[]>([
    { id: "1", name: "Admin Principal", email: "admin@havengym.com", role: "admin" },
    { id: "2", name: "Recepcionista", email: "recepcion@havengym.com", role: "staff" },
    { id: "3", name: "Entrenador", email: "entrenador@havengym.com", role: "trainer" },
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (value: string) => {
    setFormData((prev) => ({ ...prev, role: value }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      role: "staff",
      password: "",
      confirmPassword: "",
    });
  };

  const handleAddUser = () => {
    // Validación básica
    if (!formData.name || !formData.email || !formData.password) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Por favor complete todos los campos requeridos."
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

    // En un caso real, aquí enviaríamos los datos al servidor
    const newUser = {
      id: (users.length + 1).toString(),
      name: formData.name,
      email: formData.email,
      role: formData.role,
    };

    setUsers([...users, newUser]);
    resetForm();
    setIsAddUserModalOpen(false);
    
    toast({
      title: "Éxito",
      description: "Usuario agregado correctamente."
    });
  };

  const handleEditUser = () => {
    if (!selectedUser) return;
    
    // Validación básica
    if (!formData.name || !formData.email) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Por favor complete los campos requeridos."
      });
      return;
    }

    // Validar contraseñas solo si se está actualizando la contraseña
    if (formData.password && formData.password !== formData.confirmPassword) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Las contraseñas no coinciden."
      });
      return;
    }

    // Actualizar usuario
    const updatedUsers = users.map(user => {
      if (user.id === selectedUser.id) {
        return { 
          ...user, 
          name: formData.name,
          email: formData.email,
          role: formData.role
        };
      }
      return user;
    });

    setUsers(updatedUsers);
    resetForm();
    setIsEditUserModalOpen(false);
    
    toast({
      title: "Éxito",
      description: "Usuario actualizado correctamente."
    });
  };

  const openEditModal = (user: User) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      password: "",
      confirmPassword: "",
    });
    setIsEditUserModalOpen(true);
  };

  const handleDeleteUser = (userId: string) => {
    if (confirm("¿Está seguro que desea eliminar este usuario?")) {
      setUsers(users.filter(user => user.id !== userId));
      toast({
        title: "Éxito",
        description: "Usuario eliminado correctamente."
      });
    }
  };

  const getRoleDisplayText = (role: string) => {
    switch (role) {
      case "admin": return "Administrador";
      case "staff": return "Recepción";
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
            Administre los usuarios que tienen acceso al sistema
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
              <DialogTitle>Añadir Nuevo Usuario</DialogTitle>
              <DialogDescription>
                Complete el formulario para crear un nuevo usuario del sistema.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="name">Nombre Completo</label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Nombre y apellido"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="email">Correo Electrónico</label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="correo@ejemplo.com"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="role">Rol</label>
                <Select value={formData.role} onValueChange={handleRoleChange}>
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Seleccione un rol" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Administrador</SelectItem>
                    <SelectItem value="staff">Recepción</SelectItem>
                    <SelectItem value="trainer">Entrenador</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <label htmlFor="password">Contraseña</label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Contraseña"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="confirmPassword">Confirmar Contraseña</label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirmar contraseña"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => {
                resetForm();
                setIsAddUserModalOpen(false);
              }}>
                Cancelar
              </Button>
              <Button type="submit" onClick={handleAddUser}>
                Guardar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={isEditUserModalOpen} onOpenChange={setIsEditUserModalOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Editar Usuario</DialogTitle>
              <DialogDescription>
                Modifique la información del usuario.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="edit-name">Nombre Completo</label>
                <Input
                  id="edit-name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Nombre y apellido"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="edit-email">Correo Electrónico</label>
                <Input
                  id="edit-email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="correo@ejemplo.com"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="edit-role">Rol</label>
                <Select value={formData.role} onValueChange={handleRoleChange}>
                  <SelectTrigger id="edit-role">
                    <SelectValue placeholder="Seleccione un rol" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Administrador</SelectItem>
                    <SelectItem value="staff">Recepción</SelectItem>
                    <SelectItem value="trainer">Entrenador</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <label htmlFor="edit-password">Nueva Contraseña (opcional)</label>
                <Input
                  id="edit-password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Dejar en blanco para mantener la actual"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="edit-confirmPassword">Confirmar Nueva Contraseña</label>
                <Input
                  id="edit-confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirmar contraseña"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => {
                resetForm();
                setIsEditUserModalOpen(false);
              }}>
                Cancelar
              </Button>
              <Button type="submit" onClick={handleEditUser}>
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
              <TableHead>Nombre</TableHead>
              <TableHead>Correo Electrónico</TableHead>
              <TableHead>Rol</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{getRoleDisplayText(user.role)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => openEditModal(user)}
                    >
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Editar</span>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                      <span className="sr-only">Eliminar</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {users.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  No hay usuarios para mostrar
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

// Definir tipos
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export default Users;
