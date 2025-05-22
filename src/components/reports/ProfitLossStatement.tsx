
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const ProfitLossStatement = () => {
  return (
    <Card className="haven-card">
      <CardHeader className="pb-2">
        <CardTitle>Ganancias y Pérdidas Mensuales</CardTitle>
        <CardDescription>Seguimiento del rendimiento financiero</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <span className="font-medium">Ingresos Totales</span>
            <span className="font-bold">Bs 37,850</span>
          </div>
          
          <div>
            <div className="text-sm text-white/60 mb-1">Desglose de Ingresos</div>
            <div className="space-y-2 pl-2 border-l border-white/10">
              <div className="flex justify-between">
                <span className="text-sm">Suscripciones de Membresía</span>
                <span className="text-sm">Bs 32,450</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Ventas de Productos</span>
                <span className="text-sm">Bs 3,200</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Eventos Especiales</span>
                <span className="text-sm">Bs 2,200</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <span className="font-medium">Gastos Totales</span>
            <span className="font-bold">Bs 12,520</span>
          </div>
          
          <div>
            <div className="text-sm text-white/60 mb-1">Desglose de Gastos</div>
            <div className="space-y-2 pl-2 border-l border-white/10">
              <div className="flex justify-between">
                <span className="text-sm">Alquiler y Servicios</span>
                <span className="text-sm">Bs 7,500</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Salarios del Personal</span>
                <span className="text-sm">Bs 3,800</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Mantenimiento de Equipos</span>
                <span className="text-sm">Bs 620</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Otros Gastos</span>
                <span className="text-sm">Bs 600</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-2 border-t border-white/10">
            <span className="font-medium">Beneficio Neto</span>
            <span className="font-bold text-green-500">Bs 25,330</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfitLossStatement;
