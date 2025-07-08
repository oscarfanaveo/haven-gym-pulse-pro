
import { Card, CardContent } from "@/components/ui/card";
import { UsersRound, Clock, Calendar } from "lucide-react";

interface Subscription {
  id: number;
  name: string;
  plan: string;
  startDate: string;
  endDate: string;
  status: string;
  price: number;
  cliente_id: number;
}

interface SubscriptionStatsProps {
  subscriptions: Subscription[];
}

const SubscriptionStats = ({ subscriptions }: SubscriptionStatsProps) => {
  const activeSubscriptions = subscriptions.filter(sub => sub.status === "Activo").length;
  const expiredSubscriptions = subscriptions.filter(sub => sub.status === "Expirado").length;
  
  const upcomingRenewals = subscriptions.filter(sub => {
    const endDate = new Date(sub.endDate);
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);
    return endDate <= nextWeek && endDate > new Date();
  }).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="haven-card">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm text-white/60">Miembros Activos</p>
              <p className="text-2xl font-bold">{activeSubscriptions}</p>
              <p className="text-xs text-green-500">Actualmente suscritos</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-haven-red/20 flex items-center justify-center">
              <UsersRound className="text-haven-red" size={24} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="haven-card">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm text-white/60">Suscripciones Expiradas</p>
              <p className="text-2xl font-bold">{expiredSubscriptions}</p>
              <p className="text-xs text-yellow-500">Necesitan renovación</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center">
              <Clock className="text-yellow-500" size={24} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="haven-card">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm text-white/60">Próximas Renovaciones</p>
              <p className="text-2xl font-bold">{upcomingRenewals}</p>
              <p className="text-xs text-blue-500">Para esta semana</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
              <Calendar className="text-blue-500" size={24} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubscriptionStats;
