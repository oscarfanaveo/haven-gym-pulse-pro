
import { useState } from "react";
import {
  User, Plus, Search, Filter, MoreHorizontal, Calendar,
  Trash2, Edit, Clock, UsersRound
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

// Datos de ejemplo para suscripciones
const subscriptionsData = [
  {
    id: "1",
    name: "Juan Pérez",
    plan: "Básico",
    startDate: "2025-03-15",
    endDate: "2025-04-15",
    status: "Activo",
    price: 135
  },
  {
    id: "2",
    name: "Maria Garcia",
    plan: "Premium",
    startDate: "2025-03-10",
    endDate: "2025-04-10",
    status: "Activo",
    price: 200
  },
  {
    id: "3",
    name: "Carlos Rodriguez",
    plan: "Regular",
    startDate: "2025-03-05",
    endDate: "2025-04-05",
    status: "Activo",
    price: 160
  },
  {
    id: "4",
    name: "Ana Martinez",
    plan: "Básico",
    startDate: "2025-02-20",
    endDate: "2025-03-20",
    status: "Expirado",
    price: 135
  },
  {
    id: "5",
    name: "Luis Fernandez",
    plan: "Premium",
    startDate: "2025-03-01",
    endDate: "2025-04-01",
    status: "Activo",
    price: 200
  },
  {
    id: "6",
    name: "Sofia Morales",
    plan: "Regular",
    startDate: "2025-02-15",
    endDate: "2025-03-15",
    status: "Expirado",
    price: 160
  },
  {
    id: "7",
    name: "Diego Sanchez",
    plan: "Temporal",
    startDate: "2025-03-15",
    endDate: "2025-03-17",
    status: "Activo",
    price: 50
  },
];

const getStatusBadgeClass = (status: string) => {
  switch (status) {
    case "Activo":
      return "bg-green-500/20 text-green-400";
    case "Expirado":
      return "bg-red-500/20 text-red-400";
    case "Pendiente":
      return "bg-yellow-500/20 text-yellow-400";
    default:
      return "bg-gray-500/20 text-gray-400";
  }
};

const getPlanBadgeClass = (plan: string) => {
  switch (plan) {
    case "Básico":
      return "bg-blue-500/20 text-blue-400";
    case "Regular":
      return "bg-purple-500/20 text-purple-400";
    case "Premium":
      return "bg-pink-500/20 text-pink-400";
    case "Temporal":
      return "bg-yellow-500/20 text-yellow-400";
    default:
      return "bg-gray-500/20 text-gray-400";
  }
};

const activeSubscriptions = subscriptionsData.filter(sub => sub.status === "Activo").length;
const expiredSubscriptions = subscriptionsData.filter(sub => sub.status === "Expirado").length;
const plans = [
  { name: "Básico", price: 135, description: "Acceso 3 veces por semana" },
  { name: "Regular", price: 160, description: "Acceso completo al gimnasio y máquinas" },
  { name: "Premium", price: 200, description: "Acceso completo más clases complementarias" },
  { name: "Temporal", price: "Variable", description: "Eventos especiales y clases" }
];

const Subscriptions = () => {
  const [openNewSubscription, setOpenNewSubscription] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white">Suscripciones</h2>
          <p className="text-white/60">Gestionar suscripciones y planes de miembros</p>
        </div>
        <Dialog open={openNewSubscription} onOpenChange={setOpenNewSubscription}>
          <DialogTrigger asChild>
            <Button className="bg-haven-red hover:bg-haven-red/90">
              <Plus className="mr-2 h-4 w-4" /> Añadir Nuevo Miembro
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-haven-gray text-white border-white/10">
            <DialogHeader>
              <DialogTitle>Añadir Nuevo Miembro</DialogTitle>
              <DialogDescription className="text-white/60">
                Complete el formulario para registrar un nuevo miembro
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="name" className="text-right">
                  Nombre
                </label>
                <Input
                  id="name"
                  placeholder="Nombre completo"
                  className="col-span-3 bg-haven-dark border-white/10"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="email" className="text-right">
                  Correo
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Dirección de correo"
                  className="col-span-3 bg-haven-dark border-white/10"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="phone" className="text-right">
                  Teléfono
                </label>
                <Input
                  id="phone"
                  placeholder="Número de teléfono"
                  className="col-span-3 bg-haven-dark border-white/10"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="plan" className="text-right">
                  Plan
                </label>
                <Select>
                  <SelectTrigger className="col-span-3 bg-haven-dark border-white/10">
                    <SelectValue placeholder="Seleccionar plan" />
                  </SelectTrigger>
                  <SelectContent className="bg-haven-gray border-white/10">
                    <SelectItem value="basic">Básico (135 Bs)</SelectItem>
                    <SelectItem value="regular">Regular (160 Bs)</SelectItem>
                    <SelectItem value="premium">Premium (200 Bs)</SelectItem>
                    <SelectItem value="temporary">Temporal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="startDate" className="text-right">
                  Fecha Inicio
                </label>
                <Input
                  id="startDate"
                  type="date"
                  className="col-span-3 bg-haven-dark border-white/10"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpenNewSubscription(false)} className="border-white/10 hover:bg-haven-dark">
                Cancelar
              </Button>
              <Button className="bg-haven-red hover:bg-haven-red/90">
                Añadir Miembro
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="haven-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-white/60">Miembros Activos</p>
                <p className="text-2xl font-bold">{activeSubscriptions}</p>
                <p className="text-xs text-green-500">Actualmente suscritos</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-haven-red/20 flex items-center justify-center">
                <UsersRound className="text-haven-red" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="haven-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-white/60">Suscripciones Expiradas</p>
                <p className="text-2xl font-bold">{expiredSubscriptions}</p>
                <p className="text-xs text-yellow-500">Necesitan renovación</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center">
                <Clock className="text-yellow-500" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="haven-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-white/60">Próximas Renovaciones</p>
                <p className="text-2xl font-bold">5</p>
                <p className="text-xs text-blue-500">Para esta semana</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                <Calendar className="text-blue-500" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="members" className="w-full">
        <TabsList className="bg-haven-dark grid grid-cols-2 w-full max-w-md">
          <TabsTrigger value="members" className="data-[state=active]:bg-haven-red">Miembros</TabsTrigger>
          <TabsTrigger value="plans" className="data-[state=active]:bg-haven-red">Planes de Suscripción</TabsTrigger>
        </TabsList>
        <TabsContent value="members" className="mt-4">
          <Card className="haven-card">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4 justify-between mb-6">
                <div className="relative max-w-md w-full">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-white/40" />
                  <Input
                    placeholder="Buscar miembros..."
                    className="bg-haven-dark border-white/10 pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="border-white/10 hover:bg-haven-dark">
                    <Filter className="mr-2 h-4 w-4" />
                    Filtrar
                  </Button>
                  <Select>
                    <SelectTrigger className="w-[180px] bg-haven-dark border-white/10">
                      <SelectValue placeholder="Todos los planes" />
                    </SelectTrigger>
                    <SelectContent className="bg-haven-gray border-white/10">
                      <SelectItem value="all">Todos los planes</SelectItem>
                      <SelectItem value="basic">Básico</SelectItem>
                      <SelectItem value="regular">Regular</SelectItem>
                      <SelectItem value="premium">Premium</SelectItem>
                      <SelectItem value="temporary">Temporal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/10 hover:bg-transparent">
                      <TableHead>Miembro</TableHead>
                      <TableHead>Plan</TableHead>
                      <TableHead>Fecha Inicio</TableHead>
                      <TableHead>Fecha Fin</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Precio</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {subscriptionsData.map((subscription) => (
                      <TableRow key={subscription.id} className="border-white/10 hover:bg-haven-dark/70">
                        <TableCell className="font-medium">{subscription.name}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${getPlanBadgeClass(subscription.plan)}`}>
                            {subscription.plan}
                          </span>
                        </TableCell>
                        <TableCell>{subscription.startDate}</TableCell>
                        <TableCell>{subscription.endDate}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadgeClass(subscription.status)}`}>
                            {subscription.status}
                          </span>
                        </TableCell>
                        <TableCell>{subscription.price} Bs</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-haven-gray border-white/10">
                              <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                                <Edit className="h-4 w-4" /> Editar Miembro
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                                <Calendar className="h-4 w-4" /> Renovar Suscripción
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex items-center gap-2 text-red-500 cursor-pointer">
                                <Trash2 className="h-4 w-4" /> Eliminar
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="plans" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan) => (
              <Card key={plan.name} className="haven-card">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold">{plan.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs ${getPlanBadgeClass(plan.name)}`}>
                        {plan.name}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <p className="text-2xl font-bold">{plan.price} {typeof plan.price === 'number' ? 'Bs' : ''}</p>
                      <p className="text-sm text-white/60">{plan.description}</p>
                    </div>
                    <Button className="w-full bg-haven-red hover:bg-haven-red/90">
                      Ver Detalles
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Subscriptions;
