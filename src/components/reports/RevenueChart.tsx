
import { TrendingUp } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const RevenueChart = () => {
  return (
    <Card className="haven-card lg:col-span-2">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Desglose de Ingresos</CardTitle>
            <CardDescription>Ingresos mensuales por tipo de suscripción</CardDescription>
          </div>
          <Select defaultValue="6months">
            <SelectTrigger className="w-[180px] bg-haven-dark border-white/10">
              <SelectValue placeholder="Período de tiempo" />
            </SelectTrigger>
            <SelectContent className="bg-haven-gray border-white/10">
              <SelectItem value="30days">Últimos 30 días</SelectItem>
              <SelectItem value="3months">3 meses</SelectItem>
              <SelectItem value="6months">6 meses</SelectItem>
              <SelectItem value="year">1 año</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="h-72 flex items-center justify-center">
        <div className="text-center text-white/60">
          <TrendingUp size={64} className="mx-auto mb-4 text-haven-red" />
          <p>La visualización del gráfico de ingresos se mostrará aquí</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default RevenueChart;
