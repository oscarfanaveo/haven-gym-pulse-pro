
import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import ProductStatsCards from "@/components/products/ProductStatsCards";
import ProductsTable from "@/components/products/ProductsTable";
import AddProductDialog from "@/components/products/AddProductDialog";
import ProductSalesPlaceholder from "@/components/products/ProductSalesPlaceholder";

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

const lowStockItems = productsData.filter(product => product.status === "Poco Stock").length;
const outOfStockItems = productsData.filter(product => product.status === "Sin Stock").length;

const Products = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white">Productos</h2>
          <p className="text-white/60">Gestión de inventario y ventas de productos</p>
        </div>
        <div className="flex gap-2">
          <AddProductDialog />
          <Button 
            variant="outline" 
            className="border-white/10 bg-haven-dark hover:bg-haven-dark/80"
            onClick={() => window.location.href = '/sales'}
          >
            <ShoppingCart className="mr-2 h-4 w-4" /> Ir a Ventas
          </Button>
        </div>
      </div>

      <ProductStatsCards 
        totalProducts={productsData.length}
        lowStockItems={lowStockItems}
        outOfStockItems={outOfStockItems}
      />

      <Tabs defaultValue="inventory" className="w-full">
        <TabsList className="bg-haven-dark grid grid-cols-2 w-full max-w-md">
          <TabsTrigger value="inventory" className="data-[state=active]:bg-haven-red">Inventario</TabsTrigger>
          <TabsTrigger value="sales" className="data-[state=active]:bg-haven-red">Historial de Ventas</TabsTrigger>
        </TabsList>
        <TabsContent value="inventory" className="mt-4">
          <Card className="bg-haven-gray border-white/10 text-white">
            <CardContent className="p-6">
              <ProductsTable products={productsData} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="sales" className="mt-4">
          <Card className="bg-haven-gray border-white/10 text-white">
            <CardContent className="p-6 flex items-center justify-center min-h-[300px]">
              <ProductSalesPlaceholder />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Products;
