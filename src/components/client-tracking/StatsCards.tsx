
import { Card, CardContent } from "@/components/ui/card";
import { Users, UserCheck, Clock } from "lucide-react";

interface Client {
  id: number;
  cliente_id: number;
  name: string;
  plan: string;
  startDate: string;
  endDate: string;
  status: string;
  price: number;
  entradas: number;
  codigo: string;
  horario: string;
  lastEntry: string | null;
  suscripcion_id: number;
}

interface EntryRecord {
  id: string;
  clientId: string;
  clientName: string;
  entryTime: string;
  date: string;
}

interface StatsCardsProps {
  clients: Client[];
  entryHistory: EntryRecord[];
}

export const StatsCards = ({ clients, entryHistory }: StatsCardsProps) => {
  const activeClients = clients.filter(client => client.status === "Activo");
  const todayEntries = entryHistory.filter(entry => {
    const today = new Date().toDateString();
    const entryDate = new Date(entry.date).toDateString();
    return today === entryDate;
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="haven-card">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm text-white/60">Clientes Activos</p>
              <p className="text-2xl font-bold">{activeClients.length}</p>
              <p className="text-xs text-green-500">Con suscripción vigente</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
              <Users className="text-green-500" size={24} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="haven-card">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm text-white/60">Ingresos Hoy</p>
              <p className="text-2xl font-bold">{todayEntries.length}</p>
              <p className="text-xs text-blue-500">Registros del día</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
              <UserCheck className="text-blue-500" size={24} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="haven-card">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm text-white/60">Horario Restringido</p>
              <p className="text-2xl font-bold">{activeClients.filter(c => c.horario === 'mañanas').length}</p>
              <p className="text-xs text-yellow-500">Solo mañanas</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center">
              <Clock className="text-yellow-500" size={24} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
