
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import PlanSelector from "@/components/PlanSelector";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Plan {
  id: number;
  name: string;
  price: number;
  description: string;
  categoria: string;
}

interface AddMemberFormProps {
  plans: Plan[];
  onMemberAdded: () => void;
  onShowInvoice: (planName: string, customerName: string, price: number) => void;
}

const AddMemberForm = ({ plans, onMemberAdded, onShowInvoice }: AddMemberFormProps) => {
  const [open, setOpen] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [startDate, setStartDate] = useState("");
  const [planName, setPlanName] = useState("");
  const [subscriptionPrice, setSubscriptionPrice] = useState(0);
  const { toast } = useToast();

  const handlePlanChange = (name: string, price: number) => {
    console.log('📋 [PlanChange] Plan seleccionado:', { name, price });
    setPlanName(name);
    setSubscriptionPrice(price);
  };

  const handleAddMember = async () => {
    console.log('🔄 [AddMember] Iniciando proceso de creación...');
    console.log('📝 [AddMember] Datos del formulario:', {
      customerName,
      customerEmail,
      customerPhone,
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

      // Buscar el plan seleccionado por nombre
      const selectedPlanData = plans.find(p => p.name === planName);
      if (!selectedPlanData) {
        console.error('❌ [AddMember] Plan no encontrado:', planName);
        console.log('📋 [AddMember] Planes disponibles:', plans);
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
      onMemberAdded();
      
      // Mostrar factura
      onShowInvoice(planName, customerName, subscriptionPrice);

      // Reset form
      setCustomerName("");
      setCustomerEmail("");
      setCustomerPhone("");
      setStartDate("");
      setPlanName("");
      setSubscriptionPrice(0);
      setOpen(false);

    } catch (error) {
      console.error('💥 [AddMember] Error general:', error);
      toast({
        title: "Error inesperado",
        description: "Error al crear el cliente. Por favor, inténtelo de nuevo.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
              <PlanSelector plans={plans} onPlanChange={handlePlanChange} />
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
          <Button variant="outline" onClick={() => setOpen(false)} className="border-white/10 hover:bg-haven-dark">
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
  );
};

export default AddMemberForm;
