
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UserCheck } from "lucide-react";
import { StatsCards } from "@/components/client-tracking/StatsCards";
import { ActiveClientsTable } from "@/components/client-tracking/ActiveClientsTable";
import { TodayEntryHistory } from "@/components/client-tracking/TodayEntryHistory";
import { EntryDialog } from "@/components/client-tracking/EntryDialog";
import { useClientData } from "@/hooks/useClientData";

const ClientTracking = () => {
  const [openEntryDialog, setOpenEntryDialog] = useState(false);
  const { clients, entryHistory, loading, updateClients, addEntryRecord } = useClientData();

  const handleEntryRecorded = (entry: any, updatedClients: any[]) => {
    addEntryRecord(entry);
    updateClients(updatedClients);
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

      <StatsCards clients={clients} entryHistory={entryHistory} />

      <ActiveClientsTable clients={clients} />

      <TodayEntryHistory entryHistory={entryHistory} />

      <EntryDialog
        open={openEntryDialog}
        onOpenChange={setOpenEntryDialog}
        clients={clients}
        onEntryRecorded={handleEntryRecorded}
      />
    </div>
  );
};

export default ClientTracking;
