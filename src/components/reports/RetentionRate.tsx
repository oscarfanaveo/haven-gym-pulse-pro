
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const RetentionRate = () => {
  return (
    <Card className="haven-card">
      <CardHeader className="pb-2">
        <CardTitle>Tasa de Retención</CardTitle>
        <CardDescription>Análisis de retención de miembros</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="text-4xl font-bold">92%</div>
            <div className="text-sm text-white/60">Tasa de retención general</div>
          </div>
          <div className="w-20 h-20 rounded-full border-4 border-green-500 flex items-center justify-center">
            <span className="text-green-500 font-bold">92%</span>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">Plan Básico</span>
              <span className="text-sm font-bold">85%</span>
            </div>
            <div className="w-full bg-haven-dark rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: "85%" }}></div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">Plan Regular</span>
              <span className="text-sm font-bold">94%</span>
            </div>
            <div className="w-full bg-haven-dark rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: "94%" }}></div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">Plan Premium</span>
              <span className="text-sm font-bold">98%</span>
            </div>
            <div className="w-full bg-haven-dark rounded-full h-2">
              <div className="bg-haven-red h-2 rounded-full" style={{ width: "98%" }}></div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RetentionRate;
