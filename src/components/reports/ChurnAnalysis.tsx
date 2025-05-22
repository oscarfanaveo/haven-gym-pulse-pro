
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const ChurnAnalysis = () => {
  return (
    <Card className="haven-card">
      <CardHeader className="pb-2">
        <CardTitle>Análisis de Abandono</CardTitle>
        <CardDescription>Entendiendo las cancelaciones de membresía</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          <div>
            <div className="text-white/60 mb-2">Razones de Cancelación</div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span>Razones financieras</span>
                <span>40%</span>
              </div>
              <div className="w-full bg-haven-dark rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "40%" }}></div>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span>Cambio de domicilio</span>
              <span>30%</span>
            </div>
            <div className="w-full bg-haven-dark rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: "30%" }}></div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span>Cambio a competidor</span>
              <span>15%</span>
            </div>
            <div className="w-full bg-haven-dark rounded-full h-2">
              <div className="bg-red-500 h-2 rounded-full" style={{ width: "15%" }}></div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span>No usa la membresía</span>
              <span>10%</span>
            </div>
            <div className="w-full bg-haven-dark rounded-full h-2">
              <div className="bg-purple-500 h-2 rounded-full" style={{ width: "10%" }}></div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span>Otras razones</span>
              <span>5%</span>
            </div>
            <div className="w-full bg-haven-dark rounded-full h-2">
              <div className="bg-gray-500 h-2 rounded-full" style={{ width: "5%" }}></div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChurnAnalysis;
