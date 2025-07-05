
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

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

interface ActiveClientsTableProps {
  clients: Client[];
  entryHistory?: EntryRecord[];
}

const getStatusBadgeClass = (status: string) => {
  switch (status) {
    case "Activo":
      return "bg-green-500/20 text-green-400";
    case "Expirado":
      return "bg-red-500/20 text-red-400";
    default:
      return "bg-gray-500/20 text-gray-400";
  }
};

export const ActiveClientsTable = ({ clients, entryHistory = [] }: ActiveClientsTableProps) => {
  const activeClients = clients.filter(client => client.status === "Activo");

  // Get the latest entry for each client
  const getLatestEntryForClient = (clientId: number) => {
    const clientEntries = entryHistory.filter(entry => 
      entry.clientId === clientId.toString()
    );
    if (clientEntries.length === 0) return null;
    
    // Sort by date and get the most recent
    const latestEntry = clientEntries.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    )[0];
    
    return latestEntry.entryTime;
  };

  return (
    <Card className="haven-card">
      <CardContent className="p-6">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white">Clientes Activos</h3>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-white/10 hover:bg-transparent">
                  <TableHead>Cliente</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Código</TableHead>
                  <TableHead>Entradas Disponibles</TableHead>
                  <TableHead>Última Entrada</TableHead>
                  <TableHead>Horario</TableHead>
                  <TableHead>Vencimiento</TableHead>
                  <TableHead>Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activeClients.map((client) => {
                  const latestEntry = getLatestEntryForClient(client.cliente_id);
                  
                  return (
                    <TableRow key={client.id} className="border-white/10 hover:bg-haven-dark/70">
                      <TableCell className="font-medium">{client.name}</TableCell>
                      <TableCell>{client.plan}</TableCell>
                      <TableCell className="font-mono">{client.codigo}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          client.entradas > 10 ? 'bg-green-500/20 text-green-400' :
                          client.entradas > 5 ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {client.entradas}
                        </span>
                      </TableCell>
                      <TableCell>
                        {latestEntry ? (
                          <span className="text-blue-400 font-mono text-sm">
                            {latestEntry}
                          </span>
                        ) : (
                          <span className="text-white/40 text-sm">Sin registros</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          client.horario === 'mañanas' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-blue-500/20 text-blue-400'
                        }`}>
                          {client.horario === 'mañanas' ? 'Solo mañanas' : 'Completo'}
                        </span>
                      </TableCell>
                      <TableCell>{client.endDate}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadgeClass(client.status)}`}>
                          {client.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  )}
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
