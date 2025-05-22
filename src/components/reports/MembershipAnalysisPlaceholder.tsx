
import { Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const MembershipAnalysisPlaceholder = () => {
  return (
    <Card className="haven-card">
      <CardHeader className="pb-2">
        <CardTitle>Análisis de Membresías</CardTitle>
        <CardDescription>Seguimiento del crecimiento y actividad de miembros</CardDescription>
      </CardHeader>
      <CardContent className="p-6 min-h-[400px] flex items-center justify-center">
        <div className="text-center text-white/60">
          <Users size={64} className="mx-auto mb-4 text-haven-red" />
          <p className="text-xl font-medium mb-2">Tendencias de Membresía</p>
          <p>Visualiza datos de adquisición y actividad de miembros</p>
          <Button className="mt-4 bg-haven-red hover:bg-haven-red/90">Generar Reporte</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MembershipAnalysisPlaceholder;
