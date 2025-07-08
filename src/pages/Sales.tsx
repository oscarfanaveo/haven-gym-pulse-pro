import { useState, useEffect } from "react";
import { Search, Filter, MoreHorizontal, Package, Trash2, Receipt, ArrowUpDown, ShoppingCart as CartIcon } from "lucide-react";
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
import { Separator } from "@/components/ui/separator";
import { CartProvider, useCart } from "@/contexts/CartContext";
import ShoppingCart from "@/components/ShoppingCart";
import { fetchSalesData, fetchProductsData, Sale, Product } from "@/utils/salesUtils";
import { toast } from "sonner";

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


const SalesContent = () => {
  const [openNewSale, setOpenNewSale] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [salesData, setSalesData] = useState<Sale[]>([]);
  const [productsData, setProductsData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [sales, products] = await Promise.all([
          fetchSalesData(),
          fetchProductsData()
        ]);
        setSalesData(sales);
        setProductsData(products);
      } catch (error) {
        console.error('Error cargando datos:', error);
        toast.error('Error al cargar los datos de ventas');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Calcular estadísticas
  const totalSales = salesData.reduce((sum, sale) => sum + sale.amount, 0);
  const totalTransactions = salesData.length;
  const avgSale = totalTransactions > 0 ? totalSales / totalTransactions : 0;

  // Filtrar productos por categoría y término de búsqueda
  const filteredProducts = productsData.filter(product => {
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Obtener categorías únicas
  const categories = Array.from(new Set(productsData.map(product => product.category)));

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center h-48">
          <p className="text-white/60">Cargando datos de ventas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white">Ventas</h2>
          <p className="text-white/60">Gestión de ventas y transacciones</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={openNewSale} onOpenChange={setOpenNewSale}>
            <DialogTrigger asChild>
              <Button className="bg-haven-red hover:bg-haven-red/90">
                <CartIcon className="mr-2 h-4 w-4" /> Nueva Venta
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-haven-gray text-white border-white/10 sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Nueva Venta</DialogTitle>
                <DialogDescription className="text-white/60">
                  Registre una nueva venta seleccionando productos
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
              </div>
              
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Buscar productos..."
                    className="flex-1 bg-haven-dark border-white/10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Select
                    value={selectedCategory || "todas"}
                    onValueChange={(value) => setSelectedCategory(value === "todas" ? null : value)}
                  >
                    <SelectTrigger className="w-[180px] bg-haven-dark border-white/10">
                      <SelectValue placeholder="Categoría" />
                    </SelectTrigger>
                    <SelectContent className="bg-haven-gray border-white/10">
                      <SelectItem value="todas">Todas</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <Separator className="bg-white/10 my-4" />
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[40vh] overflow-y-auto pr-1">
                  {filteredProducts.map((product) => (
                    <div 
                      key={product.id} 
                      className="border border-white/10 rounded-md p-3 flex justify-between items-center hover:bg-haven-dark/50"
                    >
                      <div>
                        <h4 className="font-medium">{product.name}</h4>
                        <p className="text-sm text-white/60">{product.price} Bs</p>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="border-white/10 hover:bg-haven-dark"
                        onClick={() => addItem(product)}
                      >
                        Agregar
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpenNewSale(false)} className="border-white/10 hover:bg-haven-dark">
                  Cerrar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <ShoppingCart />
        </div>
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
                <CartIcon size={24} className="text-haven-red" />
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
                <Receipt size={24} className="text-blue-500" />
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
                <ArrowUpDown size={24} className="text-purple-500" />
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

const Sales = () => {
  return (
    <CartProvider>
      <SalesContent />
    </CartProvider>
  );
};

export default Sales;
