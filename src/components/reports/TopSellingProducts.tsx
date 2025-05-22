
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const TopSellingProducts = () => {
  return (
    <Card className="haven-card">
      <CardHeader className="pb-2">
        <CardTitle>Rendimiento de Ventas de Productos</CardTitle>
        <CardDescription>Productos más vendidos este mes</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <span className="text-blue-400 font-bold">1</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Proteína en Polvo</h4>
                <span className="font-bold">Bs 5,600</span>
              </div>
              <div className="flex items-center justify-between text-sm text-white/60">
                <span>16 unidades vendidas</span>
                <span>350 Bs / unidad</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-silver/20 flex items-center justify-center">
              <span className="text-white/80 font-bold">2</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Suplemento Pre-Entrenamiento</h4>
                <span className="font-bold">Bs 3,300</span>
              </div>
              <div className="flex items-center justify-between text-sm text-white/60">
                <span>15 unidades vendidas</span>
                <span>220 Bs / unidad</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-amber-500/20 flex items-center justify-center">
              <span className="text-amber-400 font-bold">3</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Barras de Proteína</h4>
                <span className="font-bold">Bs 1,650</span>
              </div>
              <div className="flex items-center justify-between text-sm text-white/60">
                <span>110 unidades vendidas</span>
                <span>15 Bs / unidad</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-haven-dark flex items-center justify-center">
              <span className="text-white/60 font-bold">4</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Guantes de Gimnasio</h4>
                <span className="font-bold">Bs 1,320</span>
              </div>
              <div className="flex items-center justify-between text-sm text-white/60">
                <span>11 unidades vendidas</span>
                <span>120 Bs / unidad</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TopSellingProducts;
