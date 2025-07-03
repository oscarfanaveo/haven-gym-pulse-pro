
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserCheck, Users, Clock, AlertCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

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

const ClientTracking = () => {
  const [openEntryDialog, setOpenEntryDialog] = useState(false);
  const [clientCode, setClientCode] = useState("");
  const [clients, setClients] = useState<Client[]>([]);
  const [entryHistory, setEntryHistory] = useState<EntryRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchClientsData = async () => {
    try {
      const { data, error } = await supabase
        .from('suscripciones')
        .select(`
          id,
          cliente_id,
          fecha_inicio,
          fecha_fin,
          estado,
          clientes (
            id,
            nombre,
            apellido,
            codigo
          ),
          planes (
            id,
            nombre,
            precio,
            entradas,
            horario
          )
        `);

      if (error) {
        console.error('Error fetching clients:', error);
        toast({
          title: "Error",
          description: "No se pudieron cargar los datos de clientes",
          variant: "destructive",
        });
        return;
      }

      const formattedClients = data?.map(sub => ({
        id: sub.id,
        cliente_id: sub.cliente_id,
        suscripcion_id: sub.id,
        name: `${sub.clientes.nombre} ${sub.clientes.apellido}`,
        plan: sub.planes.nombre,
        startDate: sub.fecha_inicio,
        endDate: sub.fecha_fin,
        status: new Date(sub.fecha_fin) < new Date() ? 'Expirado' : sub.estado,
        price: sub.planes.precio,
        entradas: sub.planes.entradas,
        codigo: sub.clientes.codigo,
        horario: sub.planes.horario,
        lastEntry: null
      })) || [];

      setClients(formattedClients);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Error al cargar los datos",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClientsData();
  }, []);

  const activeClients = clients.filter(client => client.status === "Activo");
  const todayEntries = entryHistory.filter(entry => {
    const today = new Date().toDateString();
    const entryDate = new Date(entry.date).toDateString();
    return today === entryDate;
  });

  const handleEntry = async () => {
    if (clientCode.length !== 6) {
      toast({
        title: "Código inválido",
        description: "El código debe tener 6 dígitos",
        variant: "destructive",
      });
      return;
    }

    const client = clients.find(c => c.codigo === clientCode);
    
    if (!client) {
      toast({
        title: "Cliente no encontrado",
        description: "El código ingresado no corresponde a ningún cliente",
        variant: "destructive",
      });
      return;
    }

    // Check if subscription is expired
    const today = new Date();
    const endDate = new Date(client.endDate);
    
    if (endDate < today) {
      toast({
        title: "Suscripción Vencida",
        description: `La suscripción de ${client.name} ha expirado`,
        variant: "destructive",
      });
      setOpenEntryDialog(false);
      setClientCode("");
      return;
    }

    // Check schedule restrictions (for "solo mañanas" plans)
    if (client.horario === "mañanas") {
      const currentHour = new Date().getHours();
      if (currentHour >= 12) { // After 12 PM
        toast({
          title: "Fuera de horario",
          description: `${client.name} solo puede ingresar en horario de mañanas`,
          variant: "destructive",
        });
        setOpenEntryDialog(false);
        setClientCode("");
        return;
      }
    }

    // Record entry time
    const now = new Date();
    const entryTime = now.toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
    const entryDate = now.toISOString();

    try {
      // Insert entry record into database
      const { error } = await supabase
        .from('registros_entrada')
        .insert({
          cliente_id: client.cliente_id,
          suscripcion_id: client.suscripcion_id,
          fecha_entrada: entryDate
        });

      if (error) {
        console.error('Error recording entry:', error);
        toast({
          title: "Error",
          description: "No se pudo registrar la entrada",
          variant: "destructive",
        });
        return;
      }

      // Create entry record for local state
      const newEntry: EntryRecord = {
        id: Date.now().toString(),
        clientId: client.id.toString(),
        clientName: client.name,
        entryTime: entryTime,
        date: entryDate
      };

      // Update entry history
      setEntryHistory(prev => [...prev, newEntry]);

      // Update client's last entry time
      const updatedClients = clients.map(c => 
        c.codigo === clientCode 
          ? { ...c, lastEntry: entryTime }
          : c
      );
      
      setClients(updatedClients);
      
      toast({
        title: `Bienvenido ${client.name}`,
        description: `Entrada registrada a las ${entryTime}`,
        variant: "default",
      });

      console.log('Nueva entrada registrada:', newEntry);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Error al registrar la entrada",
        variant: "destructive",
      });
    }

    setOpenEntryDialog(false);
    setClientCode("");
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center p-8">
          <div className="text-white">Cargando datos...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white">Seguimiento Cliente</h2>
          <p className="text-white/60">Control de ingresos y seguimiento de clientes activos</p>
        </div>
        <Button 
          className="bg-haven-red hover:bg-haven-red/90 text-lg px-8 py-3"
          onClick={() => setOpenEntryDialog(true)}
        >
          <UserCheck className="mr-2 h-5 w-5" /> 
          Ingreso
        </Button>
      </div>

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
                  {activeClients.map((client) => (
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
                        {client.lastEntry ? (
                          <span className="text-blue-400 font-mono text-sm">
                            {client.lastEntry}
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
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Today's Entry History */}
      {todayEntries.length > 0 && (
        <Card className="haven-card">
          <CardContent className="p-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-500" />
                Ingresos de Hoy
              </h3>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/10 hover:bg-transparent">
                      <TableHead>Cliente</TableHead>
                      <TableHead>Hora de Entrada</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {todayEntries.map((entry) => (
                      <TableRow key={entry.id} className="border-white/10 hover:bg-haven-dark/70">
                        <TableCell className="font-medium">{entry.clientName}</TableCell>
                        <TableCell className="font-mono text-blue-400">{entry.entryTime}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Dialog open={openEntryDialog} onOpenChange={setOpenEntryDialog}>
        <DialogContent className="bg-haven-gray text-white border-white/10 max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <UserCheck className="h-5 w-5 text-haven-red" />
              Ingreso de Cliente
            </DialogTitle>
            <DialogDescription className="text-white/60">
              Ingrese el código de 6 dígitos del cliente
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Input
                placeholder="Código del cliente"
                value={clientCode}
                onChange={(e) => setClientCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                className="bg-haven-dark border-white/10 text-center text-2xl font-mono tracking-widest"
                maxLength={6}
              />
              <p className="text-xs text-white/40 text-center">
                Solo números, 6 dígitos
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => {
                setOpenEntryDialog(false);
                setClientCode("");
              }}
              className="border-white/10 hover:bg-haven-dark"
            >
              Cancelar
            </Button>
            <Button 
              className="bg-haven-red hover:bg-haven-red/90"
              onClick={handleEntry}
              disabled={clientCode.length !== 6}
            >
              Confirmar Ingreso
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ClientTracking;
