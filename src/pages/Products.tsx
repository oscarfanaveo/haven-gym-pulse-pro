
import { useState, useEffect } from "react";
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
import { CartProvider } from "@/contexts/CartContext";
import ShoppingCartComponent from "@/components/ShoppingCart";
import { fetchProducts, Product } from "@/utils/productUtils";
import { useToast } from "@/hooks/use-toast";

const ProductsContent = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await fetchProducts();
      setProducts(data);
    } catch (error) {
      console.error("Error loading products:", error);
      toast({
        title: "Error",
        description: "No se pudieron cargar los productos",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const lowStockItems = products.filter(product => product.status === "Poco Stock").length;
  const outOfStockItems = products.filter(product => product.status === "Sin Stock").length;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-white">Cargando productos...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white">Productos</h2>
          <p className="text-white/60">Gestión de inventario y ventas de productos</p>
        </div>
        <div className="flex gap-2">
          <AddProductDialog onProductAdded={loadProducts} />
          <ShoppingCartComponent />
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
        totalProducts={products.length}
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
              <ProductsTable products={products} onProductUpdated={loadProducts} />
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

const Products = () => {
  return (
    <CartProvider>
      <ProductsContent />
    </CartProvider>
  );
};

export default Products;
