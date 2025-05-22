
import { Package, AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface ProductStatsProps {
  totalProducts: number;
  lowStockItems: number;
  outOfStockItems: number;
}

const ProductStatsCards = ({ totalProducts, lowStockItems, outOfStockItems }: ProductStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="bg-haven-gray border-white/10 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm text-white/60">Total Productos</p>
              <p className="text-2xl font-bold">{totalProducts}</p>
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
  );
};

export default ProductStatsCards;
