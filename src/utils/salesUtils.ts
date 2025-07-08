import { supabase } from "@/integrations/supabase/client";

export interface Sale {
  id: number;
  date: string;
  customer: string;
  items: string[];
  amount: number;
  status: string;
  cliente_id?: number;
  nombre_cliente_temporal?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
}

export const fetchSalesData = async (): Promise<Sale[]> => {
  console.log('🔍 [Sales] Iniciando consulta de ventas...');
  
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  console.log('👤 [Sales] Usuario autenticado:', user?.id, user?.email);
  
  if (authError) {
    console.error('❌ [Sales] Error de autenticación:', authError);
    throw new Error(`Error de autenticación: ${authError.message}`);
  }

  if (!user) {
    console.log('⚠️ [Sales] Usuario no autenticado');
    throw new Error('Usuario no autenticado');
  }

  // Obtener ventas con datos del cliente y productos
  const { data: ventas, error: ventasError } = await supabase
    .from('ventas')
    .select(`
      id,
      fecha,
      total,
      estado,
      cliente_id,
      nombre_cliente_temporal,
      clientes (
        id,
        nombre,
        apellido
      ),
      ventas_productos (
        cantidad,
        precio_unitario,
        productos (
          id,
          nombre
        )
      )
    `)
    .order('fecha', { ascending: false });

  console.log('📊 [Sales] Respuesta de la consulta:', { ventas, ventasError });

  if (ventasError) {
    console.error('❌ [Sales] Error en la consulta:', ventasError);
    throw new Error(`Error al cargar ventas: ${ventasError.message}`);
  }

  if (!ventas || ventas.length === 0) {
    console.log('⚠️ [Sales] No se encontraron ventas');
    return [];
  }

  const formattedSales = ventas?.map(venta => {
    const customerName = venta.cliente_id && venta.clientes 
      ? `${venta.clientes.nombre} ${venta.clientes.apellido}`
      : venta.nombre_cliente_temporal || 'Cliente temporal';

    const items = venta.ventas_productos?.map(vp => vp.productos.nombre) || [];

    return {
      id: venta.id,
      date: new Date(venta.fecha).toLocaleDateString('es-ES'),
      customer: customerName,
      items: items,
      amount: venta.total,
      status: venta.estado,
      cliente_id: venta.cliente_id,
      nombre_cliente_temporal: venta.nombre_cliente_temporal
    };
  }) || [];

  console.log('✅ [Sales] Ventas formateadas:', formattedSales);
  return formattedSales;
};

export const fetchProductsData = async (): Promise<Product[]> => {
  console.log('🔍 [Products] Iniciando consulta de productos...');
  
  const { data, error } = await supabase
    .from('productos')
    .select('*')
    .order('nombre');

  console.log('📊 [Products] Respuesta de la consulta:', { data, error });

  if (error) {
    console.error('❌ [Products] Error en la consulta:', error);
    throw new Error(`Error al cargar productos: ${error.message}`);
  }

  const formattedProducts = data?.map(product => ({
    id: product.id.toString(),
    name: product.nombre,
    price: product.precio,
    category: product.categoria || "Sin categoría"
  })) || [];

  console.log('✅ [Products] Productos formateados:', formattedProducts);
  return formattedProducts;
};

export const createSale = async (saleData: {
  customerName: string;
  items: Array<{ id: string; name: string; price: number; quantity: number }>;
  total: number;
}): Promise<void> => {
  console.log('🔍 [Sales] Creando nueva venta...', saleData);
  
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  
  if (authError || !user) {
    throw new Error('Usuario no autenticado');
  }

  // Crear la venta
  const { data: ventaData, error: ventaError } = await supabase
    .from('ventas')
    .insert({
      nombre_cliente_temporal: saleData.customerName,
      total: saleData.total,
      estado: 'Completada',
      vendedor_usuario_id: user.id
    })
    .select()
    .single();

  if (ventaError) {
    console.error('❌ [Sales] Error creando venta:', ventaError);
    throw new Error(`Error al crear la venta: ${ventaError.message}`);
  }

  // Crear los detalles de la venta (productos)
  const ventaProductos = saleData.items.map(item => ({
    venta_id: ventaData.id,
    producto_id: parseInt(item.id),
    cantidad: item.quantity,
    precio_unitario: item.price
  }));

  const { error: detallesError } = await supabase
    .from('ventas_productos')
    .insert(ventaProductos);

  if (detallesError) {
    console.error('❌ [Sales] Error creando detalles de venta:', detallesError);
    throw new Error(`Error al crear los detalles de la venta: ${detallesError.message}`);
  }

  console.log('✅ [Sales] Venta creada exitosamente');
};