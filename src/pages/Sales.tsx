
import { useState } from "react";
import { ShoppingCart, Search, Filter, MoreHorizontal, Package, Trash2, Receipt, ArrowUpDown } from "lucide-react";
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

// Datos de ejemplo para ventas
const salesData = [
  {
    id: "1",
    date: "10/05/2025",
    customer: "Miguel Rodríguez",
    items: ["Whey Protein Powder", "Shaker Bottle"],
    amount: 395,
    status: "Completada"
  },
  {
    id: "2",
    date: "09/05/2025",
    customer: "Laura Sánchez",
    items: ["Women's Leggings", "Protein Bar"],
    amount: 195,
    status: "Completada"
  },
  {
    id: "3",
    date: "09/05/2025",
    customer: "Carlos Mendoza",
    items: ["Pre-Workout Supplement"],
    amount: 220,
    status: "Completada"
  },
  {
    id: "4",
    date: "08/05/2025",
    customer: "Ana Martínez",
    items: ["Gym Gloves", "Protein Bar"],
    amount: 135,
    status: "Completada"
  },
  {
    id: "5",
    date: "07/05/2025",
    customer: "José García",
    items: ["Whey Protein Powder"],
    amount: 350,
    status: "Completada"
  }
];

const getStatusBadgeClass = (status: string) => {
  switch (status) {
    case "Completada":
      return "bg-green-500/20 text-green-400";
    case "Pendiente":
      return "bg-yellow-500/20 text-yellow-400";
    case "Cancelada":
      return "bg-red-500/20 text-red-400";
    default:
      return "bg-gray-500/20 text-gray-400";
  }
};

// Calcular estadísticas
const totalSales = salesData.reduce((sum, sale) => sum + sale.amount, 0);
const totalTransactions = salesData.length;
const avgSale = totalSales / totalTransactions;

const Sales = () => {
  const [openNewSale, setOpenNewSale] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white">Ventas</h2>
          <p className="text-white/60">Gestión de ventas y transacciones</p>
        </div>
        <Dialog open={openNewSale} onOpenChange={setOpenNewSale}>
          <DialogTrigger asChild>
            <Button className="bg-haven-red hover:bg-haven-red/90">
              <ShoppingCart className="mr-2 h-4 w-4" /> Nueva Venta
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-haven-gray text-white border-white/10">
            <DialogHeader>
              <DialogTitle>Nueva Venta</DialogTitle>
              <DialogDescription className="text-white/60">
                Registre una nueva venta de productos
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="customer" className="text-right">
                  Cliente
                </label>
                <Input
                  id="customer"
                  placeholder="Nombre del cliente"
                  className="col-span-3 bg-haven-dark border-white/10"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="product" className="text-right">
                  Producto
                </label>
                <Select>
                  <SelectTrigger className="col-span-3 bg-haven-dark border-white/10">
                    <SelectValue placeholder="Seleccionar producto" />
                  </SelectTrigger>
                  <SelectContent className="bg-haven-gray border-white/10">
                    <SelectItem value="protein">Whey Protein Powder</SelectItem>
                    <SelectItem value="gloves">Gym Gloves</SelectItem>
                    <SelectItem value="bar">Protein Bar</SelectItem>
                    <SelectItem value="leggings">Women's Leggings</SelectItem>
                    <SelectItem value="shaker">Shaker Bottle</SelectItem>
                    <SelectItem value="preworkout">Pre-Workout Supplement</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="quantity" className="text-right">
                  Cantidad
                </label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  defaultValue="1"
                  className="col-span-3 bg-haven-dark border-white/10"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="price" className="text-right">
                  Precio (Bs)
                </label>
                <Input
                  id="price"
                  type="number"
                  placeholder="0.00"
                  className="col-span-3 bg-haven-dark border-white/10"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpenNewSale(false)} className="border-white/10 hover:bg-haven-dark">
                Cancelar
              </Button>
              <Button className="bg-haven-red hover:bg-haven-red/90">
                Completar Venta
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
                <p className="text-sm text-white/60">Ventas Totales</p>
                <p className="text-2xl font-bold">{totalSales} Bs</p>
                <p className="text-xs text-white/60">En los últimos 7 días</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-haven-red/20 flex items-center justify-center">
                <ShoppingCart className="text-haven-red" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="haven-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-white/60">Transacciones</p>
                <p className="text-2xl font-bold">{totalTransactions}</p>
                <p className="text-xs text-white/60">Total de ventas realizadas</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                <Receipt className="text-blue-500" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="haven-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-white/60">Venta Promedio</p>
                <p className="text-2xl font-bold">{avgSale.toFixed(2)} Bs</p>
                <p className="text-xs text-white/60">Por transacción</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                <ArrowUpDown className="text-purple-500" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="haven-card">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 justify-between mb-6">
            <div className="relative max-w-md w-full">
              <Search className="absolute left-3 top-3 h-4 w-4 text-white/40" />
              <Input
                placeholder="Buscar ventas..."
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
                  <SelectValue placeholder="Todos" />
                </SelectTrigger>
                <SelectContent className="bg-haven-gray border-white/10">
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="today">Hoy</SelectItem>
                  <SelectItem value="week">Esta Semana</SelectItem>
                  <SelectItem value="month">Este Mes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-white/10 hover:bg-transparent">
                  <TableHead>ID</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Productos</TableHead>
                  <TableHead>Total (Bs)</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {salesData.map((sale) => (
                  <TableRow key={sale.id} className="border-white/10 hover:bg-haven-dark/70">
                    <TableCell className="font-medium">#{sale.id}</TableCell>
                    <TableCell>{sale.date}</TableCell>
                    <TableCell>{sale.customer}</TableCell>
                    <TableCell>
                      <ul className="space-y-1">
                        {sale.items.map((item, i) => (
                          <li key={i} className="text-sm">{item}</li>
                        ))}
                      </ul>
                    </TableCell>
                    <TableCell>{sale.amount} Bs</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadgeClass(sale.status)}`}>
                        {sale.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-haven-gray border-white/10">
                          <DropdownMenuItem className="cursor-pointer">
                            Ver Detalles
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">
                            Imprimir Recibo
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer text-red-500">
                            Anular Venta
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
    </div>
  );
};

export default Sales;
