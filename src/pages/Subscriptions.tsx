import { useState, useEffect } from "react";
import {
  User, Plus, Search, Filter, MoreHorizontal, Calendar,
  Trash2, Edit, Clock, UsersRound
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/toaster";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import Invoice from "@/components/Invoice";
import SubscriptionRenewal from "@/components/SubscriptionRenewal";
import PlanSelector from "@/components/PlanSelector";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Subscription {
  id: number;
  name: string;
  plan: string;
  startDate: string;
  endDate: string;
  status: string;
  price: number;
  cliente_id: number;
}

interface Plan {
  id: number;
  name: string;
  price: number;
  description: string;
  categoria: string;
}

const getStatusBadgeClass = (status: string) => {
  switch (status) {
    case "Activo":
      return "bg-green-500/20 text-green-400";
    case "Expirado":
      return "bg-red-500/20 text-red-400";
    case "Pendiente":
      return "bg-yellow-500/20 text-yellow-400";
    default:
      return "bg-gray-500/20 text-gray-400";
  }
};

const getPlanBadgeClass = (plan: string) => {
  switch (plan) {
    case "Básico":
      return "bg-blue-500/20 text-blue-400";
    case "Regular":
      return "bg-purple-500/20 text-purple-400";
    case "Premium":
      return "bg-pink-500/20 text-pink-400";
    case "Temporal":
      return "bg-yellow-500/20 text-yellow-400";
    default:
      return "bg-gray-500/20 text-gray-400";
  }
};

const Subscriptions = () => {
  const [openNewSubscription, setOpenNewSubscription] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [startDate, setStartDate] = useState("");
  const [showInvoice, setShowInvoice] = useState(false);
  const [subscriptionPrice, setSubscriptionPrice] = useState(0);
  const [planName, setPlanName] = useState("");
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchSubscriptionsData = async () => {
    try {
      console.log('🔍 [Subscriptions] Iniciando consulta de suscripciones...');
      
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      console.log('👤 [Subscriptions] Usuario autenticado:', user?.id, user?.email);
      
      if (authError) {
        console.error('❌ [Subscriptions] Error de autenticación:', authError);
        toast({
          title: "Error de autenticación",
          description: "No se pudo verificar la autenticación del usuario",
          variant: "destructive",
        });
        return;
      }

      if (!user) {
        console.log('⚠️ [Subscriptions] Usuario no autenticado');
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
        toast({
          title: "Error",
          description: `Error al cargar suscripciones: ${error.message}`,
          variant: "destructive",
        });
        return;
      }

      if (!data || data.length === 0) {
        console.log('⚠️ [Subscriptions] No se encontraron suscripciones');
        toast({
          title: "Sin datos",
          description: "No se encontraron suscripciones en la base de datos",
          variant: "default",
        });
        setSubscriptions([]);
        return;
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
      setSubscriptions(formattedSubscriptions);
      
      toast({
        title: "Datos cargados",
        description: `Se cargaron ${formattedSubscriptions.length} suscripciones exitosamente`,
        variant: "default",
      });

    } catch (error) {
      console.error('💥 [Subscriptions] Error general:', error);
      toast({
        title: "Error",
        description: "Error al cargar las suscripciones",
        variant: "destructive",
      });
    }
  };

  const fetchPlansData = async () => {
    try {
      console.log('🔍 [Plans] Iniciando consulta de planes...');
      
      const { data, error } = await supabase
        .from('planes')
        .select('*');

      console.log('📊 [Plans] Respuesta de la consulta:', { data, error });

      if (error) {
        console.error('❌ [Plans] Error en la consulta:', error);
        return;
      }

      const formattedPlans = data?.map(plan => ({
        id: plan.id,
        name: plan.nombre,
        price: plan.precio,
        description: plan.descripcion || "Plan de suscripción",
        categoria: plan.categoria
      })) || [];

      console.log('✅ [Plans] Planes formateados:', formattedPlans);
      setPlans(formattedPlans);
    } catch (error) {
      console.error('💥 [Plans] Error general:', error);
    }
  };

  useEffect(() => {
    console.log('🚀 [Subscriptions] Iniciando carga de datos...');
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchSubscriptionsData(), fetchPlansData()]);
      setLoading(false);
    };

    fetchData();
  }, []);

  const activeSubscriptions = subscriptions.filter(sub => sub.status === "Activo").length;
  const expiredSubscriptions = subscriptions.filter(sub => sub.status === "Expirado").length;

  const handleAddMember = async () => {
    console.log('🔄 [AddMember] Iniciando proceso de creación...');
    console.log('📝 [AddMember] Datos del formulario:', {
      customerName,
      customerEmail,
      customerPhone,
      selectedPlan,
      planName,
      startDate,
      subscriptionPrice
    });

    // Validación mejorada
    if (!customerName.trim()) {
      toast({
        title: "Error de validación",
        description: "El nombre del cliente es obligatorio",
        variant: "destructive",
      });
      return;
    }

    if (!planName) {
      toast({
        title: "Error de validación",
        description: "Debe seleccionar un plan",
        variant: "destructive",
      });
      return;
    }

    if (!startDate) {
      toast({
        title: "Error de validación",
        description: "La fecha de inicio es obligatoria",
        variant: "destructive",
      });
      return;
    }

    try {
      // Preparar datos del cliente
      const nameParts = customerName.trim().split(' ');
      const nombre = nameParts[0];
      const apellido = nameParts.slice(1).join(' ') || 'Sin apellido';
      
      // Generar código único de 6 dígitos
      const codigo = Math.floor(100000 + Math.random() * 900000).toString();

      console.log('👤 [AddMember] Creando cliente:', { nombre, apellido, codigo });

      // Preparar datos del cliente - email puede ser null si está vacío
      const clientData: any = {
        nombre,
        apellido,
        codigo,
        activo: true
      };

      // Solo agregar email si no está vacío
      if (customerEmail && customerEmail.trim()) {
        clientData.correo = customerEmail.trim();
      }

      // Solo agregar teléfono si no está vacío
      if (customerPhone && customerPhone.trim()) {
        clientData.telefono = customerPhone.trim();
      }

      // Crear el cliente
      const { data: clientResult, error: clientError } = await supabase
        .from('clientes')
        .insert(clientData)
        .select()
        .single();

      if (clientError) {
        console.error('❌ [AddMember] Error al crear cliente:', clientError);
        
        // Manejar error de email duplicado
        if (clientError.code === '23505' && clientError.message.includes('clientes_correo_key')) {
          toast({
            title: "Error",
            description: "Ya existe un cliente con este correo electrónico",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Error al crear cliente",
            description: clientError.message || "No se pudo crear el cliente",
            variant: "destructive",
          });
        }
        return;
      }

      console.log('✅ [AddMember] Cliente creado:', clientResult);

      // Buscar el plan seleccionado
      const selectedPlanData = plans.find(p => p.name === planName);
      if (!selectedPlanData) {
        toast({
          title: "Error",
          description: "Plan seleccionado no válido",
          variant: "destructive",
        });
        return;
      }

      console.log('📋 [AddMember] Plan seleccionado:', selectedPlanData);

      // Calcular fecha de fin (asumiendo planes mensuales)
      const endDate = new Date(startDate);
      endDate.setMonth(endDate.getMonth() + 1);

      console.log('📅 [AddMember] Fechas:', {
        startDate,
        endDate: endDate.toISOString().split('T')[0]
      });

      // Crear la suscripción
      const { error: subscriptionError } = await supabase
        .from('suscripciones')
        .insert({
          cliente_id: clientResult.id,
          plan_id: selectedPlanData.id,
          fecha_inicio: startDate,
          fecha_fin: endDate.toISOString().split('T')[0],
          estado: 'Activo'
        });

      if (subscriptionError) {
        console.error('❌ [AddMember] Error al crear suscripción:', subscriptionError);
        toast({
          title: "Error al crear suscripción",
          description: subscriptionError.message || "No se pudo crear la suscripción",
          variant: "destructive",
        });
        return;
      }

      console.log('✅ [AddMember] Suscripción creada exitosamente');

      toast({
        title: "¡Éxito!",
        description: `Cliente ${customerName} creado exitosamente con código ${codigo}`,
        variant: "default",
      });

      // Actualizar datos
      await fetchSubscriptionsData();
      
      // Mostrar factura
      setShowInvoice(true);

    } catch (error) {
      console.error('💥 [AddMember] Error general:', error);
      toast({
        title: "Error inesperado",
        description: "Error al crear el cliente. Por favor, inténtelo de nuevo.",
        variant: "destructive",
      });
    }
  };

  const handlePlanChange = (name: string, price: number) => {
    console.log('📋 [PlanChange] Plan seleccionado:', { name, price });
    setPlanName(name);
    setSubscriptionPrice(price);
    setSelectedPlan("custom");
  };

  const handleCloseInvoice = () => {
    setShowInvoice(false);
    setOpenNewSubscription(false);
    // Reset form
    setCustomerName("");
    setCustomerEmail("");
    setCustomerPhone("");
    setStartDate("");
    setSelectedPlan("");
    setPlanName("");
    setSubscriptionPrice(0);
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
      {/* Debug info */}
      <div className="bg-yellow-500/10 p-4 rounded-lg border border-yellow-500/20">
        <p className="text-yellow-400 text-sm">
          DEBUG: Suscripciones cargadas: {subscriptions.length} | Planes cargados: {plans.length}
        </p>
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white">Suscripciones</h2>
          <p className="text-white/60">Gestionar suscripciones y planes de miembros</p>
        </div>
        <Dialog open={openNewSubscription} onOpenChange={setOpenNewSubscription}>
          <DialogTrigger asChild>
            <Button className="bg-haven-red hover:bg-haven-red/90">
              <Plus className="mr-2 h-4 w-4" /> Añadir Nuevo Miembro
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-haven-gray text-white border-white/10">
            <DialogHeader>
              <DialogTitle>Añadir Nuevo Miembro</DialogTitle>
              <DialogDescription className="text-white/60">
                Complete el formulario para registrar un nuevo miembro
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="name" className="text-right">
                  Nombre *
                </label>
                <Input
                  id="name"
                  placeholder="Nombre completo"
                  className="col-span-3 bg-haven-dark border-white/10"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="email" className="text-right">
                  Correo
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Dirección de correo (opcional)"
                  className="col-span-3 bg-haven-dark border-white/10"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="phone" className="text-right">
                  Teléfono
                </label>
                <Input
                  id="phone"
                  placeholder="Número de teléfono (opcional)"
                  className="col-span-3 bg-haven-dark border-white/10"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="plan" className="text-right">
                  Plan *
                </label>
                <div className="col-span-3">
                  <PlanSelector onPlanChange={handlePlanChange} />
                  {planName && (
                    <p className="text-sm text-white/60 mt-1">
                      Plan seleccionado: {planName} - {subscriptionPrice} Bs
                    </p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="startDate" className="text-right">
                  Fecha Inicio *
                </label>
                <Input
                  id="startDate"
                  type="date"
                  className="col-span-3 bg-haven-dark border-white/10"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpenNewSubscription(false)} className="border-white/10 hover:bg-haven-dark">
                Cancelar
              </Button>
              <Button 
                className="bg-haven-red hover:bg-haven-red/90"
                onClick={handleAddMember}
                disabled={!planName || !customerName.trim() || !startDate}
              >
                Añadir Miembro
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="haven-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-white/60">Miembros Activos</p>
                <p className="text-2xl font-bold">{activeSubscriptions}</p>
                <p className="text-xs text-green-500">Actualmente suscritos</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-haven-red/20 flex items-center justify-center">
                <UsersRound className="text-haven-red" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="haven-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-white/60">Suscripciones Expiradas</p>
                <p className="text-2xl font-bold">{expiredSubscriptions}</p>
                <p className="text-xs text-yellow-500">Necesitan renovación</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center">
                <Clock className="text-yellow-500" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="haven-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-white/60">Próximas Renovaciones</p>
                <p className="text-2xl font-bold">
                  {subscriptions.filter(sub => {
                    const endDate = new Date(sub.endDate);
                    const nextWeek = new Date();
                    nextWeek.setDate(nextWeek.getDate() + 7);
                    return endDate <= nextWeek && endDate > new Date();
                  }).length}
                </p>
                <p className="text-xs text-blue-500">Para esta semana</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                <Calendar className="text-blue-500" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="members" className="w-full">
        <TabsList className="bg-haven-dark grid grid-cols-2 w-full max-w-md">
          <TabsTrigger value="members" className="data-[state=active]:bg-haven-red">Miembros</TabsTrigger>
          <TabsTrigger value="plans" className="data-[state=active]:bg-haven-red">Planes de Suscripción</TabsTrigger>
        </TabsList>
        <TabsContent value="members" className="mt-4">
          <Card className="haven-card">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4 justify-between mb-6">
                <div className="relative max-w-md w-full">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-white/40" />
                  <Input
                    placeholder="Buscar miembros..."
                    className="bg-haven-dark border-white/10 pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="border-white/10 hover:bg-haven-dark">
                    <Filter className="mr-2 h-4 w-4" />
                    Filtrar
                  </Button>
                  <Select>
                    <SelectTrigger className="w-[180px] bg-haven-dark border-white/10">
                      <SelectValue placeholder="Todos los planes" />
                    </SelectTrigger>
                    <SelectContent className="bg-haven-gray border-white/10">
                      <SelectItem value="all">Todos los planes</SelectItem>
                      <SelectItem value="basic">Básico</SelectItem>
                      <SelectItem value="regular">Regular</SelectItem>
                      <SelectItem value="premium">Premium</SelectItem>
                      <SelectItem value="temporary">Temporal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/10 hover:bg-transparent">
                      <TableHead>Miembro</TableHead>
                      <TableHead>Plan</TableHead>
                      <TableHead>Fecha Inicio</TableHead>
                      <TableHead>Fecha Fin</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Precio</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {subscriptions.map((subscription) => (
                      <TableRow key={subscription.id} className="border-white/10 hover:bg-haven-dark/70">
                        <TableCell className="font-medium">{subscription.name}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${getPlanBadgeClass(subscription.plan)}`}>
                            {subscription.plan}
                          </span>
                        </TableCell>
                        <TableCell>{subscription.startDate}</TableCell>
                        <TableCell>{subscription.endDate}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadgeClass(subscription.status)}`}>
                            {subscription.status}
                          </span>
                        </TableCell>
                        <TableCell>{subscription.price} Bs</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-haven-gray border-white/10">
                              <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                                <Edit className="h-4 w-4" /> Editar Miembro
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <SubscriptionRenewal 
                                  memberName={subscription.name} 
                                  planType={subscription.plan} 
                                  price={subscription.price} 
                                />
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex items-center gap-2 text-red-500 cursor-pointer">
                                <Trash2 className="h-4 w-4" /> Eliminar
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="plans" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <Card key={plan.id} className="haven-card">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold">{plan.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs ${getPlanBadgeClass(plan.name)}`}>
                        {plan.categoria}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <p className="text-2xl font-bold">{plan.price} Bs</p>
                      <p className="text-sm text-white/60">{plan.description}</p>
                    </div>
                    <Button className="w-full bg-haven-red hover:bg-haven-red/90">
                      Ver Detalles
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {showInvoice && (
        <Invoice 
          subscriptionType={planName}
          customerName={customerName}
          total={subscriptionPrice}
          isSubscription={true}
          onClose={handleCloseInvoice}
        />
      )}
      
      <Toaster />
    </div>
  );
};

export default Subscriptions;
