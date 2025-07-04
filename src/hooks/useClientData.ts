
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
      console.log('🔍 Iniciando consulta de clientes...');
      
      // Verificar si el usuario está autenticado
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      console.log('👤 Usuario autenticado:', user?.id, user?.email);
      
      if (authError) {
        console.error('❌ Error de autenticación:', authError);
        toast({
          title: "Error de autenticación",
          description: "No se pudo verificar la autenticación del usuario",
          variant: "destructive",
        });
        return;
      }

      if (!user) {
        console.log('⚠️ Usuario no autenticado');
        toast({
          title: "No autenticado",
          description: "Debe iniciar sesión para ver los datos",
          variant: "destructive",
        });
        return;
      }

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
    console.log('🚀 Iniciando useClientData...');
    fetchClientsData();
  }, []);

  const updateClients = (updatedClients: Client[]) => {
    console.log('🔄 Actualizando clientes:', updatedClients);
    setClients(updatedClients);
  };

  const addEntryRecord = (entry: EntryRecord) => {
    console.log('➕ Agregando registro de entrada:', entry);
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
