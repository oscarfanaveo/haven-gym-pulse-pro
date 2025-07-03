
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
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  
  // Usuarios hardcodeados para mostrar
  const [users] = useState<User[]>([
    {
      id: '1',
      username: 'admin',
      fullName: 'Administrador',
      role: 'admin'
    },
    {
      id: '2',
      username: 'Rolo',
      fullName: 'Rolo García',
      role: 'recepcion'
    }
  ]);
  
  // Estado para formulario
  const [formData, setFormData] = useState<FormData>({
    username: "",
    fullName: "",
    role: "recepcion",
    password: "",
    confirmPassword: "",
  });

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
    toast({
      variant: "destructive",
      title: "Usuario Hardcodeado",
      description: "En esta versión, los usuarios están hardcodeados. Use 'admin' o 'Rolo' para iniciar sesión."
    });
  };

  const handleEditUser = async () => {
    toast({
      variant: "destructive",
      title: "Usuario Hardcodeado",
      description: "En esta versión, los usuarios están hardcodeados y no se pueden editar."
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
      title: "Usuario Hardcodeado",
      description: "En esta versión, los usuarios están hardcodeados y no se pueden eliminar."
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
            Usuarios hardcodeados del sistema
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
                Nota: En esta versión los usuarios están hardcodeados.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="username">Nombre de Usuario</label>
                <Input
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="Nombre de usuario"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="fullName">Nombre Completo</label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Nombre completo"
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
                    <SelectItem value="recepcion">Recepción</SelectItem>
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
                Nota: En esta versión los usuarios están hardcodeados.
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
              <TableHead>Usuario</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Rol</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.username}</TableCell>
                <TableCell>{user.fullName}</TableCell>
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
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Users;
