
import { supabase } from "@/integrations/supabase/client";

export interface Subscription {
  id: number;
  name: string;
  plan: string;
  startDate: string;
  endDate: string;
  status: string;
  price: number;
  cliente_id: number;
}

export interface Plan {
  id: number;
  name: string;
  price: number;
  description: string;
  categoria: string;
}

export const fetchSubscriptionsData = async (): Promise<Subscription[]> => {
  console.log('🔍 [Subscriptions] Iniciando consulta de suscripciones...');
  
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  console.log('👤 [Subscriptions] Usuario autenticado:', user?.id, user?.email);
  
  if (authError) {
    console.error('❌ [Subscriptions] Error de autenticación:', authError);
    throw new Error(`Error de autenticación: ${authError.message}`);
  }

  if (!user) {
    console.log('⚠️ [Subscriptions] Usuario no autenticado');
    throw new Error('Usuario no autenticado');
  }

  const { data, error } = await supabase
    .from('suscripciones')
    .select(`
      id,
      fecha_inicio,
      fecha_fin,
      estado,
      cliente_id,
      clientes (
        id,
        nombre,
        apellido
      ),
      planes (
        id,
        nombre,
        precio
      )
    `);

  console.log('📊 [Subscriptions] Respuesta de la consulta:', { data, error });
  console.log('📋 [Subscriptions] Cantidad de registros:', data?.length || 0);

  if (error) {
    console.error('❌ [Subscriptions] Error en la consulta:', error);
    throw new Error(`Error al cargar suscripciones: ${error.message}`);
  }

  if (!data || data.length === 0) {
    console.log('⚠️ [Subscriptions] No se encontraron suscripciones');
    return [];
  }

  const formattedSubscriptions = data?.map(sub => ({
    id: sub.id,
    cliente_id: sub.cliente_id,
    name: `${sub.clientes.nombre} ${sub.clientes.apellido}`,
    plan: sub.planes.nombre,
    startDate: sub.fecha_inicio,
    endDate: sub.fecha_fin,
    status: new Date(sub.fecha_fin) < new Date() ? 'Expirado' : sub.estado,
    price: sub.planes.precio,
  })) || [];

  console.log('✅ [Subscriptions] Suscripciones formateadas:', formattedSubscriptions);
  return formattedSubscriptions;
};

export const fetchPlansData = async (): Promise<Plan[]> => {
  console.log('🔍 [Plans] Iniciando consulta de planes...');
  
  const { data, error } = await supabase
    .from('planes')
    .select('*');

  console.log('📊 [Plans] Respuesta de la consulta:', { data, error });

  if (error) {
    console.error('❌ [Plans] Error en la consulta:', error);
    throw new Error(`Error al cargar planes: ${error.message}`);
  }

  const formattedPlans = data?.map(plan => ({
    id: plan.id,
    name: plan.nombre,
    price: plan.precio,
    description: plan.descripcion || "Plan de suscripción",
    categoria: plan.categoria
  })) || [];

  console.log('✅ [Plans] Planes formateados:', formattedPlans);
  return formattedPlans;
};
