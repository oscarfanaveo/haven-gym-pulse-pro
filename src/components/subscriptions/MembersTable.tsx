
import { Search, Filter, MoreHorizontal, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import SubscriptionRenewal from "@/components/SubscriptionRenewal";

interface Subscription {
  id: number;
  name: string;
  plan: string;
  startDate: string;
  endDate: string;
  status: string;
  price: number;
  cliente_id: number;
}

interface MembersTableProps {
  subscriptions: Subscription[];
}

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

const MembersTable = ({ subscriptions }: MembersTableProps) => {
  return (
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
              {subscriptions.map((subscription) => (
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
                        <DropdownMenuItem>
                          <SubscriptionRenewal 
                            memberName={subscription.name} 
                            planType={subscription.plan} 
                            price={subscription.price} 
                          />
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
  );
};

export default MembersTable;
