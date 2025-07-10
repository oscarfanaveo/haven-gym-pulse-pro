
import { Filter, MoreHorizontal, Edit, Package, Trash2, ArrowUpDown, Search, Plus } from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCart } from "@/contexts/CartContext";

interface Product {
  id: number;
  nombre: string;
  categoria: string | null;
  precio: number;
  stock: number;
  status: string;
}

interface ProductsTableProps {
  products: Product[];
  onProductUpdated?: () => void;
}

export const getStatusBadgeClass = (status: string) => {
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

export const getCategoryBadgeClass = (category: string) => {
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

const ProductsTable = ({ products }: ProductsTableProps) => {
  const { addItem } = useCart();

  const handleAddToCart = (product: Product) => {
    if (product.status === "Sin Stock") return;
    
    addItem({
      id: product.id.toString(),
      name: product.nombre,
      price: product.precio
    });
  };

  return (
    <div className="overflow-x-auto">
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
            <TableHead>Carrito</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id} className="border-white/10 hover:bg-haven-dark/70">
              <TableCell className="font-medium">{product.nombre}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs ${getCategoryBadgeClass(product.categoria || 'Sin categoría')}`}>
                  {product.categoria || 'Sin categoría'}
                </span>
              </TableCell>
              <TableCell>{product.precio} Bs</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadgeClass(product.status)}`}>
                  {product.status}
                </span>
              </TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-white/10 hover:bg-haven-red hover:border-haven-red disabled:opacity-50"
                  onClick={() => handleAddToCart(product)}
                  disabled={product.status === "Sin Stock"}
                >
                  <Plus className="h-4 w-4" />
                </Button>
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
  );
};

export default ProductsTable;
