
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserCheck } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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

interface EntryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  clients: Client[];
  onEntryRecorded: (entry: EntryRecord, updatedClients: Client[]) => void;
}

export const EntryDialog = ({ open, onOpenChange, clients, onEntryRecorded }: EntryDialogProps) => {
  const [clientCode, setClientCode] = useState("");
  const { toast } = useToast();

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
      onOpenChange(false);
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
        onOpenChange(false);
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

      // Update client's last entry time
      const updatedClients = clients.map(c => 
        c.codigo === clientCode 
          ? { ...c, lastEntry: entryTime }
          : c
      );
      
      onEntryRecorded(newEntry, updatedClients);
      
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

    onOpenChange(false);
    setClientCode("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
              onOpenChange(false);
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
  );
};
