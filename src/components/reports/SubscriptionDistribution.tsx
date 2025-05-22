
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const SubscriptionDistribution = () => {
  return (
    <Card className="haven-card">
      <CardHeader className="pb-2">
        <CardTitle>Distribución de Suscripciones</CardTitle>
        <CardDescription>Membresías activas actualmente</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm">Plan Básico</span>
            <span className="text-sm font-bold">36 (14%)</span>
          </div>
          <div className="w-full bg-haven-dark rounded-full h-2">
            <div className="bg-blue-500 h-2 rounded-full" style={{ width: "14%" }}></div>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm">Plan Regular</span>
            <span className="text-sm font-bold">128 (50%)</span>
          </div>
          <div className="w-full bg-haven-dark rounded-full h-2">
            <div className="bg-green-500 h-2 rounded-full" style={{ width: "50%" }}></div>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm">Plan Premium</span>
            <span className="text-sm font-bold">75 (30%)</span>
          </div>
          <div className="w-full bg-haven-dark rounded-full h-2">
            <div className="bg-haven-red h-2 rounded-full" style={{ width: "30%" }}></div>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm">Plan Temporal</span>
            <span className="text-sm font-bold">15 (6%)</span>
          </div>
          <div className="w-full bg-haven-dark rounded-full h-2">
            <div className="bg-purple-500 h-2 rounded-full" style={{ width: "6%" }}></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SubscriptionDistribution;
