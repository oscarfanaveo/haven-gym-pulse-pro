
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Plan {
  id: number;
  name: string;
  price: number;
  description: string;
  categoria: string;
}

interface PlansGridProps {
  plans: Plan[];
}

const getPlanBadgeClass = (plan: string) => {
  switch (plan) {
    case "Básico":
      return "bg-blue-500/20 text-blue-400";
    case "Regular":
      return "bg-purple-500/20 text-purple-400";
    case "Premium":
      return "bg-pink-500/20 text-pink-400";
    case "Temporal":
      return "bg-yellow-500/20 text-yellow-400";
    default:
      return "bg-gray-500/20 text-gray-400";
  }
};

const PlansGrid = ({ plans }: PlansGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {plans.map((plan) => (
        <Card key={plan.id} className="haven-card">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <span className={`px-2 py-1 rounded-full text-xs ${getPlanBadgeClass(plan.name)}`}>
                  {plan.categoria}
                </span>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold">{plan.price} Bs</p>
                <p className="text-sm text-white/60">{plan.description}</p>
              </div>
              <Button className="w-full bg-haven-red hover:bg-haven-red/90">
                Ver Detalles
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PlansGrid;
