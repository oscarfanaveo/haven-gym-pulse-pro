
import { useState } from "react";
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

// Extended subscription data with new client tracking fields
const clientsData = [
  {
    id: "1",
    name: "Juan Pérez",
    plan: "Básico",
    startDate: "2025-03-15",
    endDate: "2025-04-15",
    status: "Activo",
    price: 135,
    entradas: 31,
    codigo: "123456",
    horario: "completo"
  },
  {
    id: "2",
    name: "Maria Garcia",
    plan: "Premium",
    startDate: "2025-03-10",
    endDate: "2025-04-10",
    status: "Activo",
    price: 200,
    entradas: 90,
    codigo: "789012",
    horario: "completo"
  },
  {
    id: "3",
    name: "Carlos Rodriguez",
    plan: "Regular",
    startDate: "2025-03-05",
    endDate: "2025-04-05",
    status: "Activo",
    price: 160,
    entradas: 31,
    codigo: "345678",
    horario: "completo"
  },
  {
    id: "4",
    name: "Ana Martinez",
    plan: "Básico",
    startDate: "2025-02-20",
    endDate: "2025-03-20",
    status: "Expirado",
    price: 135,
    entradas: 15,
    codigo: "901234",
    horario: "completo"
  },
  {
    id: "5",
    name: "Luis Fernandez",
    plan: "Premium",
    startDate: "2025-03-01",
    endDate: "2025-04-01",
    status: "Activo",
    price: 200,
    entradas: 90,
    codigo: "567890",
    horario: "completo"
  },
  {
    id: "6",
    name: "Sofia Morales",
    plan: "Mensual, solo mañanas",
    startDate: "2025-02-15",
    endDate: "2025-04-15",
    status: "Activo",
    price: 160,
    entradas: 31,
    codigo: "234567",
    horario: "mañanas"
  },
  {
    id: "7",
    name: "Diego Sanchez",
    plan: "Mensual, día por medio",
    startDate: "2025-03-15",
    endDate: "2025-04-17",
    status: "Activo",
    price: 120,
    entradas: 12,
    codigo: "678901",
    horario: "completo"
  },
];

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
  const [clients, setClients] = useState(clientsData);
  const { toast } = useToast();

  const activeClients = clients.filter(client => client.status === "Activo");

  const handleEntry = () => {
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

    // Check if client has entries left
    if (client.entradas <= 0) {
      toast({
        title: "Entradas agotadas",
        description: `${client.name} ha agotado sus entradas del mes`,
        variant: "destructive",
      });
      setOpenEntryDialog(false);
      setClientCode("");
      return;
    }

    // Process successful entry
    const updatedClients = clients.map(c => 
      c.codigo === clientCode 
        ? { ...c, entradas: c.entradas - 1 }
        : c
    );
    
    setClients(updatedClients);
    
    toast({
      title: `Bienvenido ${client.name}`,
      description: `Entradas restantes: ${client.entradas - 1}`,
      variant: "default",
    });

    setOpenEntryDialog(false);
    setClientCode("");
  };

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
                <p className="text-2xl font-bold">24</p>
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
                <p className="text-2xl font-bold">1</p>
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
                    <TableHead>Entradas Restantes</TableHead>
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
