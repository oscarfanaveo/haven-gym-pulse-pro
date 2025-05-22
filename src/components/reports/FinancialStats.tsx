
import { TrendingUp, TrendingDown, DollarSign, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface FinancialStatsProps {
  monthlyIncome: string;
  expenses: string;
  newMembers: number;
  cancellations: number;
}

const FinancialStats = ({ monthlyIncome, expenses, newMembers, cancellations }: FinancialStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="haven-card">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm text-white/60">Ingresos Mensuales</p>
              <p className="text-2xl font-bold">{monthlyIncome}</p>
              <p className="text-xs text-green-500 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" /> +12% respecto al mes anterior
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-haven-red/20 flex items-center justify-center">
              <DollarSign className="text-haven-red" size={24} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="haven-card">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm text-white/60">Gastos</p>
              <p className="text-2xl font-bold">{expenses}</p>
              <p className="text-xs text-red-500 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" /> +8% respecto al mes anterior
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
              <DollarSign className="text-red-500" size={24} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="haven-card">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm text-white/60">Nuevos Miembros</p>
              <p className="text-2xl font-bold">{newMembers}</p>
              <p className="text-xs text-green-500 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" /> +15% respecto al mes anterior
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
              <Users className="text-blue-500" size={24} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="haven-card">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm text-white/60">Cancelaciones</p>
              <p className="text-2xl font-bold">{cancellations}</p>
              <p className="text-xs text-red-500 flex items-center">
                <TrendingDown className="h-3 w-3 mr-1" /> -10% respecto al mes anterior
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center">
              <Users className="text-yellow-500" size={24} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinancialStats;
