
import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import Invoice from "@/components/Invoice";
import { useToast } from "@/hooks/use-toast";
import SubscriptionStats from "@/components/subscriptions/SubscriptionStats";
import AddMemberForm from "@/components/subscriptions/AddMemberForm";
import MembersTable from "@/components/subscriptions/MembersTable";
import PlansGrid from "@/components/subscriptions/PlansGrid";
import { fetchSubscriptionsData, fetchPlansData, type Subscription, type Plan } from "@/utils/subscriptionUtils";

const Subscriptions = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [showInvoice, setShowInvoice] = useState(false);
  const [invoiceData, setInvoiceData] = useState({
    planName: "",
    customerName: "",
    price: 0
  });
  const { toast } = useToast();

  const loadData = async () => {
    try {
      setLoading(true);
      const [subscriptionsData, plansData] = await Promise.all([
        fetchSubscriptionsData(),
        fetchPlansData()
      ]);
      
      setSubscriptions(subscriptionsData);
      setPlans(plansData);
      
      toast({
        title: "Datos cargados",
        description: `Se cargaron ${subscriptionsData.length} suscripciones exitosamente`,
        variant: "default",
      });
    } catch (error) {
      console.error('💥 [Subscriptions] Error general:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Error al cargar las suscripciones",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('🚀 [Subscriptions] Iniciando carga de datos...');
    loadData();
  }, []);

  const handleShowInvoice = (planName: string, customerName: string, price: number) => {
    setInvoiceData({ planName, customerName, price });
    setShowInvoice(true);
  };

  const handleCloseInvoice = () => {
    setShowInvoice(false);
    setInvoiceData({ planName: "", customerName: "", price: 0 });
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
        <AddMemberForm 
          plans={plans} 
          onMemberAdded={loadData}
          onShowInvoice={handleShowInvoice}
        />
      </div>

      <SubscriptionStats subscriptions={subscriptions} />

      <Tabs defaultValue="members" className="w-full">
        <TabsList className="bg-haven-dark grid grid-cols-2 w-full max-w-md">
          <TabsTrigger value="members" className="data-[state=active]:bg-haven-red">Miembros</TabsTrigger>
          <TabsTrigger value="plans" className="data-[state=active]:bg-haven-red">Planes de Suscripción</TabsTrigger>
        </TabsList>
        
        <TabsContent value="members" className="mt-4">
          <MembersTable subscriptions={subscriptions} />
        </TabsContent>
        
        <TabsContent value="plans" className="mt-4">
          <PlansGrid plans={plans} />
        </TabsContent>
      </Tabs>

      {showInvoice && (
        <Invoice 
          subscriptionType={invoiceData.planName}
          customerName={invoiceData.customerName}
          total={invoiceData.price}
          isSubscription={true}
          onClose={handleCloseInvoice}
        />
      )}
      
      <Toaster />
    </div>
  );
};

export default Subscriptions;
