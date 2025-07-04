
import { useState, useEffect } from "react";
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

export const useClientData = () => {
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

  const updateClients = (updatedClients: Client[]) => {
    setClients(updatedClients);
  };

  const addEntryRecord = (entry: EntryRecord) => {
    setEntryHistory(prev => [...prev, entry]);
  };

  return {
    clients,
    entryHistory,
    loading,
    updateClients,
    addEntryRecord,
    refetchData: fetchClientsData
  };
};
