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
    name: "Whey Protein Powder",
    category: "Supplement",
    price: 350,
    stock: 24,
    status: "In Stock"
  },
  {
    id: "2",
    name: "Gym Gloves",
    category: "Accessory",
    price: 120,
    stock: 15,
    status: "In Stock"
  },
  {
    id: "3",
    name: "Protein Bar",
    category: "Supplement",
    price: 15,
    stock: 36,
    status: "In Stock"
  },
  {
    id: "4",
    name: "Women's Leggings",
    category: "Clothing",
    price: 180,
    stock: 2,
    status: "Low Stock"
  },
  {
    id: "5",
    name: "Shaker Bottle",
    category: "Accessory",
    price: 45,
    stock: 0,
    status: "Out of Stock"
  },
  {
    id: "6",
    name: "Pre-Workout Supplement",
    category: "Supplement",
    price: 220,
    stock: 8,
    status: "In Stock"
  },
  {
    id: "7",
    name: "Men's T-Shirt",
    category: "Clothing",
    price: 150,
    stock: 0,
    status: "Out of Stock"
  },
];

const getStatusBadgeClass = (status: string) => {
  switch (status) {
    case "In Stock":
      return "bg-green-500/20 text-green-400";
    case "Low Stock":
      return "bg-yellow-500/20 text-yellow-400";
    case "Out of Stock":
      return "bg-red-500/20 text-red-400";
    default:
      return "bg-gray-500/20 text-gray-400";
  }
};

const getCategoryBadgeClass = (category: string) => {
  switch (category) {
    case "Supplement":
      return "bg-blue-500/20 text-blue-400";
    case "Accessory":
      return "bg-purple-500/20 text-purple-400";
    case "Clothing":
      return "bg-pink-500/20 text-pink-400";
    default:
      return "bg-gray-500/20 text-gray-400";
  }
};

const lowStockItems = productsData.filter(product => product.status === "Low Stock").length;
const outOfStockItems = productsData.filter(product => product.status === "Out of Stock").length;

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
                <DialogTitle>Add New Product</DialogTitle>
                <DialogDescription className="text-white/60">
                  Fill out the form below to add a new product to inventory
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="Product name"
                    className="col-span-3 bg-haven-dark border-white/10"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category" className="text-right">
                    Category
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3 bg-haven-dark border-white/10">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="bg-haven-gray border-white/10">
                      <SelectItem value="supplement">Supplement</SelectItem>
                      <SelectItem value="accessory">Accessory</SelectItem>
                      <SelectItem value="clothing">Clothing</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="price" className="text-right">
                    Price (Bs)
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
                    Stock Quantity
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
                    Description
                  </Label>
                  <Input
                    id="description"
                    placeholder="Product description"
                    className="col-span-3 bg-haven-dark border-white/10"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpenNewProduct(false)} className="border-white/10 hover:bg-haven-dark">
                  Cancel
                </Button>
                <Button className="bg-haven-red hover:bg-haven-red/90">
                  Add Product
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
                <p className="text-sm text-white/60">Total Products</p>
                <p className="text-2xl font-bold">{productsData.length}</p>
                <p className="text-xs text-white/60">Across all categories</p>
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
                <p className="text-sm text-white/60">Low Stock Alert</p>
                <p className="text-2xl font-bold">{lowStockItems}</p>
                <p className="text-xs text-yellow-500">Items need restock soon</p>
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
                <p className="text-sm text-white/60">Out of Stock</p>
                <p className="text-2xl font-bold">{outOfStockItems}</p>
                <p className="text-xs text-red-500">Items requiring reorder</p>
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
          <TabsTrigger value="inventory" className="data-[state=active]:bg-haven-red">Inventory</TabsTrigger>
          <TabsTrigger value="sales" className="data-[state=active]:bg-haven-red">Sales History</TabsTrigger>
        </TabsList>
        <TabsContent value="inventory" className="mt-4">
          <Card className="bg-haven-gray border-white/10 text-white">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4 justify-between mb-6">
                <div className="relative max-w-md w-full">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-white/40" />
                  <Input
                    placeholder="Search products..."
                    className="bg-haven-dark border-white/10 pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="border-white/10 hover:bg-haven-dark">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                  <Select>
                    <SelectTrigger className="w-[180px] bg-haven-dark border-white/10">
                      <SelectValue placeholder="All categories" />
                    </SelectTrigger>
                    <SelectContent className="bg-haven-gray border-white/10">
                      <SelectItem value="all">All categories</SelectItem>
                      <SelectItem value="supplement">Supplements</SelectItem>
                      <SelectItem value="accessory">Accessories</SelectItem>
                      <SelectItem value="clothing">Clothing</SelectItem>
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
                          Product <ArrowUpDown className="ml-1 h-3 w-3" />
                        </div>
                      </TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>
                        <div className="flex items-center">
                          Price (Bs) <ArrowUpDown className="ml-1 h-3 w-3" />
                        </div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center">
                          Stock <ArrowUpDown className="ml-1 h-3 w-3" />
                        </div>
                      </TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
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
                                <Edit className="h-4 w-4" /> Edit Product
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                                <Package className="h-4 w-4" /> Update Stock
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex items-center gap-2 text-red-500 cursor-pointer">
                                <Trash2 className="h-4 w-4" /> Delete
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
                <p className="text-xl font-medium mb-2">Sales History</p>
                <p>Track your product sales history and performance</p>
                <Button className="mt-4 bg-haven-red hover:bg-haven-red/90">View Sales Reports</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Products;
