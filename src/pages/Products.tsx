
import { useState } from "react";
import { Plus, Search, Filter, MoreHorizontal, Package, Trash2, Edit, AlertTriangle, ArrowUpDown, ShoppingCart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

// Mock data for products
const productsData = [
  {
    id: "1",
    name: "Proteína en Polvo",
    category: "Suplemento",
    price: 350,
    stock: 24,
    status: "En Stock"
  },
  {
    id: "2",
    name: "Guantes de Gimnasio",
    category: "Accesorio",
    price: 120,
    stock: 15,
    status: "En Stock"
  },
  {
    id: "3",
    name: "Barra de Proteína",
    category: "Suplemento",
    price: 15,
    stock: 36,
    status: "En Stock"
  },
  {
    id: "4",
    name: "Leggings para Mujer",
    category: "Ropa",
    price: 180,
    stock: 2,
    status: "Poco Stock"
  },
  {
    id: "5",
    name: "Botella Shaker",
    category: "Accesorio",
    price: 45,
    stock: 0,
    status: "Sin Stock"
  },
  {
    id: "6",
    name: "Suplemento Pre-Entrenamiento",
    category: "Suplemento",
    price: 220,
    stock: 8,
    status: "En Stock"
  },
  {
    id: "7",
    name: "Camiseta para Hombre",
    category: "Ropa",
    price: 150,
    stock: 0,
    status: "Sin Stock"
  },
];

const getStatusBadgeClass = (status: string) => {
  switch (status) {
    case "En Stock":
      return "bg-green-500/20 text-green-400";
    case "Poco Stock":
      return "bg-yellow-500/20 text-yellow-400";
    case "Sin Stock":
      return "bg-red-500/20 text-red-400";
    default:
      return "bg-gray-500/20 text-gray-400";
  }
};

const getCategoryBadgeClass = (category: string) => {
  switch (category) {
    case "Suplemento":
      return "bg-blue-500/20 text-blue-400";
    case "Accesorio":
      return "bg-purple-500/20 text-purple-400";
    case "Ropa":
      return "bg-pink-500/20 text-pink-400";
    default:
      return "bg-gray-500/20 text-gray-400";
  }
};

const lowStockItems = productsData.filter(product => product.status === "Poco Stock").length;
const outOfStockItems = productsData.filter(product => product.status === "Sin Stock").length;

const Products = () => {
  const [openNewProduct, setOpenNewProduct] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white">Productos</h2>
          <p className="text-white/60">Gestión de inventario y ventas de productos</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={openNewProduct} onOpenChange={setOpenNewProduct}>
            <DialogTrigger asChild>
              <Button className="bg-haven-red hover:bg-haven-red/90">
                <Plus className="mr-2 h-4 w-4" /> Añadir Producto
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-haven-gray text-white border-white/10">
              <DialogHeader>
                <DialogTitle>Añadir Nuevo Producto</DialogTitle>
                <DialogDescription className="text-white/60">
                  Completa el formulario para añadir un nuevo producto al inventario
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Nombre
                  </Label>
                  <Input
                    id="name"
                    placeholder="Nombre del producto"
                    className="col-span-3 bg-haven-dark border-white/10"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category" className="text-right">
                    Categoría
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3 bg-haven-dark border-white/10">
                      <SelectValue placeholder="Seleccionar categoría" />
                    </SelectTrigger>
                    <SelectContent className="bg-haven-gray border-white/10">
                      <SelectItem value="supplement">Suplemento</SelectItem>
                      <SelectItem value="accessory">Accesorio</SelectItem>
                      <SelectItem value="clothing">Ropa</SelectItem>
                      <SelectItem value="other">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="price" className="text-right">
                    Precio (Bs)
                  </Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="0.00"
                    className="col-span-3 bg-haven-dark border-white/10"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="stock" className="text-right">
                    Cantidad en Stock
                  </Label>
                  <Input
                    id="stock"
                    type="number"
                    placeholder="0"
                    className="col-span-3 bg-haven-dark border-white/10"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Descripción
                  </Label>
                  <Input
                    id="description"
                    placeholder="Descripción del producto"
                    className="col-span-3 bg-haven-dark border-white/10"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpenNewProduct(false)} className="border-white/10 hover:bg-haven-dark">
                  Cancelar
                </Button>
                <Button className="bg-haven-red hover:bg-haven-red/90">
                  Añadir Producto
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button 
            variant="outline" 
            className="border-white/10 bg-haven-dark hover:bg-haven-dark/80"
            onClick={() => window.location.href = '/sales'}
          >
            <ShoppingCart className="mr-2 h-4 w-4" /> Ir a Ventas
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-haven-gray border-white/10 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-white/60">Total Productos</p>
                <p className="text-2xl font-bold">{productsData.length}</p>
                <p className="text-xs text-white/60">En todas las categorías</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-haven-red/20 flex items-center justify-center">
                <Package className="text-haven-red" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-haven-gray border-white/10 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-white/60">Alerta de Poco Stock</p>
                <p className="text-2xl font-bold">{lowStockItems}</p>
                <p className="text-xs text-yellow-500">Requieren reabastecimiento pronto</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center">
                <AlertTriangle className="text-yellow-500" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-haven-gray border-white/10 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-white/60">Sin Stock</p>
                <p className="text-2xl font-bold">{outOfStockItems}</p>
                <p className="text-xs text-red-500">Productos que requieren pedido</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                <Package className="text-red-500" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="inventory" className="w-full">
        <TabsList className="bg-haven-dark grid grid-cols-2 w-full max-w-md">
          <TabsTrigger value="inventory" className="data-[state=active]:bg-haven-red">Inventario</TabsTrigger>
          <TabsTrigger value="sales" className="data-[state=active]:bg-haven-red">Historial de Ventas</TabsTrigger>
        </TabsList>
        <TabsContent value="inventory" className="mt-4">
          <Card className="bg-haven-gray border-white/10 text-white">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4 justify-between mb-6">
                <div className="relative max-w-md w-full">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-white/40" />
                  <Input
                    placeholder="Buscar productos..."
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
                      <SelectValue placeholder="Todas las categorías" />
                    </SelectTrigger>
                    <SelectContent className="bg-haven-gray border-white/10">
                      <SelectItem value="all">Todas las categorías</SelectItem>
                      <SelectItem value="supplement">Suplementos</SelectItem>
                      <SelectItem value="accessory">Accesorios</SelectItem>
                      <SelectItem value="clothing">Ropa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/10 hover:bg-transparent">
                      <TableHead>
                        <div className="flex items-center">
                          Producto <ArrowUpDown className="ml-1 h-3 w-3" />
                        </div>
                      </TableHead>
                      <TableHead>Categoría</TableHead>
                      <TableHead>
                        <div className="flex items-center">
                          Precio (Bs) <ArrowUpDown className="ml-1 h-3 w-3" />
                        </div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center">
                          Stock <ArrowUpDown className="ml-1 h-3 w-3" />
                        </div>
                      </TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {productsData.map((product) => (
                      <TableRow key={product.id} className="border-white/10 hover:bg-haven-dark/70">
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${getCategoryBadgeClass(product.category)}`}>
                            {product.category}
                          </span>
                        </TableCell>
                        <TableCell>{product.price} Bs</TableCell>
                        <TableCell>{product.stock}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadgeClass(product.status)}`}>
                            {product.status}
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
                              <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                                <Edit className="h-4 w-4" /> Editar Producto
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                                <Package className="h-4 w-4" /> Actualizar Stock
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
        <TabsContent value="sales" className="mt-4">
          <Card className="bg-haven-gray border-white/10 text-white">
            <CardContent className="p-6 flex items-center justify-center min-h-[300px]">
              <div className="text-center text-white/60">
                <Package size={64} className="mx-auto mb-4 text-haven-red" />
                <p className="text-xl font-medium mb-2">Historial de Ventas</p>
                <p>Visualiza el historial y rendimiento de ventas de productos</p>
                <Button className="mt-4 bg-haven-red hover:bg-haven-red/90">Ver Reportes de Ventas</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Products;
