
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

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
  const { isAuthenticated, loading: authLoading } = useAuth();

  const fetchEntryHistory = async () => {
    if (!isAuthenticated) {
      console.log('🔒 Usuario no autenticado para cargar historial...');
      return;
    }

    try {
      console.log('📋 Cargando historial de entradas...');
      
      // Get today's date in YYYY-MM-DD format
      const today = new Date();
      const todayStr = today.toISOString().split('T')[0];
      
      const { data, error } = await supabase
        .from('registros_entrada')
        .select(`
          id,
          fecha_entrada,
          cliente_id,
          clientes (
            nombre,
            apellido
          )
        `)
        .gte('fecha_entrada', `${todayStr}T00:00:00.000Z`)
        .lte('fecha_entrada', `${todayStr}T23:59:59.999Z`)
        .order('fecha_entrada', { ascending: false });

      if (error) {
        console.error('❌ Error cargando historial:', error);
        return;
      }

      console.log('✅ Registros de entrada encontrados:', data?.length || 0);

      const formattedEntries: EntryRecord[] = data?.map(entry => ({
        id: entry.id.toString(),
        clientId: entry.cliente_id.toString(),
        clientName: `${entry.clientes.nombre} ${entry.clientes.apellido}`,
        entryTime: new Date(entry.fecha_entrada).toLocaleTimeString('es-ES', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: false 
        }),
        date: entry.fecha_entrada
      })) || [];

      console.log('📊 Entradas formateadas:', formattedEntries);
      setEntryHistory(formattedEntries);

    } catch (error) {
      console.error('💥 Error general cargando historial:', error);
    }
  };

  const fetchClientsData = async () => {
    if (!isAuthenticated) {
      console.log('🔒 Usuario no autenticado, esperando...');
      setLoading(false);
      return;
    }

    try {
      console.log('🔍 Iniciando consulta de clientes...');

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

      console.log('📊 Respuesta de la consulta:', { data, error });
      console.log('📋 Cantidad de registros encontrados:', data?.length || 0);

      if (error) {
        console.error('❌ Error en la consulta:', error);
        toast({
          title: "Error",
          description: `Error al cargar datos: ${error.message}`,
          variant: "destructive",
        });
        return;
      }

      if (!data || data.length === 0) {
        console.log('⚠️ No se encontraron datos');
        toast({
          title: "Sin datos",
          description: "No se encontraron suscripciones en la base de datos",
          variant: "default",
        });
        setClients([]);
        return;
      }

      const formattedClients = data?.map(sub => {
        console.log('🔄 Procesando suscripción:', sub);
        return {
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
        };
      }) || [];

      console.log('✅ Clientes formateados:', formattedClients);
      setClients(formattedClients);
      
      toast({
        title: "Datos cargados",
        description: `Se cargaron ${formattedClients.length} clientes exitosamente`,
        variant: "default",
      });

      // Load entry history after clients are loaded
      await fetchEntryHistory();

    } catch (error) {
      console.error('💥 Error general:', error);
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
    console.log('🚀 Iniciando useClientData...', { isAuthenticated, authLoading });
    
    if (!authLoading) {
      if (isAuthenticated) {
        fetchClientsData();
      } else {
        setLoading(false);
        setClients([]);
        setEntryHistory([]);
      }
    }
  }, [isAuthenticated, authLoading]);

  const updateClients = (updatedClients: Client[]) => {
    console.log('🔄 Actualizando clientes:', updatedClients);
    setClients(updatedClients);
  };

  const addEntryRecord = (entry: EntryRecord) => {
    console.log('➕ Agregando registro de entrada:', entry);
    setEntryHistory(prev => [entry, ...prev]);
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
