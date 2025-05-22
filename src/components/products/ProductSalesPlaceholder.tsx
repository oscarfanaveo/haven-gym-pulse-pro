
import { Package } from "lucide-react";
import { Button } from "@/components/ui/button";

const ProductSalesPlaceholder = () => {
  return (
    <div className="text-center text-white/60">
      <Package size={64} className="mx-auto mb-4 text-haven-red" />
      <p className="text-xl font-medium mb-2">Historial de Ventas</p>
      <p>Visualiza el historial y rendimiento de ventas de productos</p>
      <Button className="mt-4 bg-haven-red hover:bg-haven-red/90">Ver Reportes de Ventas</Button>
    </div>
  );
};

export default ProductSalesPlaceholder;
