import { useState } from "react";
import { Plus, Edit, Trash2, Save, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/toaster";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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

type Plan = {
  id: string;
  name: string;
  price: number;
  category: 'monthly' | 'session' | 'special';
};

// Datos iniciales de planes
const initialPlans: Plan[] = [
  // Planes mensuales
  { id: "monthly-129", name: "129Bs Mensual, día por medio", price: 129, category: "monthly" },
  { id: "monthly-149", name: "149Bs Mensual, mañaneros", price: 149, category: "monthly" },
  { id: "monthly-169", name: "169Bs Mensual, único", price: 169, category: "monthly" },
  { id: "monthly-189", name: "189Bs Mensual, ilimitado", price: 189, category: "monthly" },
  { id: "monthly-329", name: "329Bs, Gym Bro", price: 329, category: "monthly" },
  // Planes de sesión
  { id: "session-20", name: "20Bs Sesión Individual", price: 20, category: "session" },
  { id: "session-45", name: "45Bs Sesión de Crioterapia", price: 45, category: "session" },
  // Planes especiales
  { id: "special-689", name: "689Bs Mensual, Personalizado", price: 689, category: "special" },
  { id: "special-2300", name: "2300Bs Mensual, Integral Completo", price: 2300, category: "special" },
  { id: "special-449", name: "449Bs Trimestre", price: 449, category: "special" },
  { id: "special-839", name: "839Bs Semestre", price: 839, category: "special" },
  { id: "special-1559", name: "1559Bs Anual", price: 1559, category: "special" },
];

const SubscriptionPlans = () => {
  const [plans, setPlans] = useState<Plan[]>(initialPlans);
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);
  const [isAddingPlan, setIsAddingPlan] = useState(false);
  const [newPlan, setNewPlan] = useState<Omit<Plan, 'id'>>({
    name: '',
    price: 0,
    category: 'monthly'
  });
  const [planToDelete, setPlanToDelete] = useState<Plan | null>(null);

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'monthly': return 'Planes Mensuales';
      case 'session': return 'Sesiones';
      case 'special': return 'Planes Especiales';
      default: return category;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'monthly': return 'bg-blue-500/20 text-blue-400';
      case 'session': return 'bg-green-500/20 text-green-400';
      case 'special': return 'bg-purple-500/20 text-purple-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const handleSaveEdit = () => {
    if (editingPlan) {
      setPlans(plans.map(plan => 
        plan.id === editingPlan.id ? editingPlan : plan
      ));
      setEditingPlan(null);
    }
  };

  const handleAddPlan = () => {
    if (newPlan.name && newPlan.price > 0) {
      const id = `${newPlan.category}-${Date.now()}`;
      setPlans([...plans, { ...newPlan, id }]);
      setNewPlan({ name: '', price: 0, category: 'monthly' });
      setIsAddingPlan(false);
    }
  };

  const handleDeletePlan = (planId: string) => {
    setPlans(plans.filter(plan => plan.id !== planId));
    setPlanToDelete(null);
  };

  const confirmDeletePlan = (plan: Plan) => {
    setPlanToDelete(plan);
  };

  const monthlyPlans = plans.filter(plan => plan.category === 'monthly');
  const sessionPlans = plans.filter(plan => plan.category === 'session');
  const specialPlans = plans.filter(plan => plan.category === 'special');

  const renderDeleteButton = (plan: Plan) => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button 
          size="sm" 
          variant="outline" 
          className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-haven-gray text-white border-white/10">
        <AlertDialogHeader>
          <AlertDialogTitle>Confirmar Eliminación</AlertDialogTitle>
          <AlertDialogDescription className="text-white/60">
            ¿Está seguro de que desea eliminar el plan "{plan.name}"?
            <div className="mt-2 p-2 bg-haven-dark/50 rounded">
              <p className="font-medium">{plan.name}</p>
              <p className="text-white/80">Precio: {plan.price} Bs</p>
              <p className="text-red-400 text-sm mt-1">Esta acción no se puede deshacer.</p>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="border-white/10 hover:bg-haven-dark text-white">
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction 
            className="bg-red-600 hover:bg-red-700 text-white"
            onClick={() => handleDeletePlan(plan.id)}
          >
            Eliminar Plan
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  const renderPlanCard = (plan: Plan) => (
    <Card key={plan.id} className="haven-card">
      <CardContent className="p-4">
        {editingPlan?.id === plan.id ? (
          <div className="space-y-3">
            <Input
              value={editingPlan.name}
              onChange={(e) => setEditingPlan({...editingPlan, name: e.target.value})}
              className="bg-haven-dark border-white/10"
            />
            <Input
              type="number"
              value={editingPlan.price}
              onChange={(e) => setEditingPlan({...editingPlan, price: Number(e.target.value)})}
              className="bg-haven-dark border-white/10"
            />
            <div className="flex gap-2">
              <Button size="sm" onClick={handleSaveEdit} className="bg-green-600 hover:bg-green-700">
                <Save className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="outline" onClick={() => setEditingPlan(null)} className="border-white/10">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className={`px-2 py-1 rounded-full text-xs ${getCategoryColor(plan.category)}`}>
                {getCategoryName(plan.category)}
              </span>
            </div>
            <h4 className="font-medium text-white">{plan.name}</h4>
            <p className="text-xl font-bold text-haven-red">{plan.price} Bs</p>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => setEditingPlan(plan)} className="border-white/10">
                <Edit className="h-4 w-4" />
              </Button>
              {renderDeleteButton(plan)}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white">Gestión de Planes de Suscripción</h2>
          <p className="text-white/60">Administrar los planes disponibles para nuevos miembros</p>
        </div>
        <Button 
          className="bg-haven-red hover:bg-haven-red/90"
          onClick={() => setIsAddingPlan(true)}
        >
          <Plus className="mr-2 h-4 w-4" /> Añadir Nuevo Plan
        </Button>
      </div>

      <Tabs defaultValue="monthly" className="w-full">
        <TabsList className="bg-haven-dark grid grid-cols-3 w-full max-w-md">
          <TabsTrigger value="monthly" className="data-[state=active]:bg-haven-red">Mensuales</TabsTrigger>
          <TabsTrigger value="session" className="data-[state=active]:bg-haven-red">Sesiones</TabsTrigger>
          <TabsTrigger value="special" className="data-[state=active]:bg-haven-red">Especiales</TabsTrigger>
        </TabsList>

        <TabsContent value="monthly" className="mt-4">
          <Card className="haven-card">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-white mb-4">Planes Mensuales</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {monthlyPlans.map(renderPlanCard)}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="session" className="mt-4">
          <Card className="haven-card">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-white mb-4">Planes de Sesión</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sessionPlans.map(renderPlanCard)}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="special" className="mt-4">
          <Card className="haven-card">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-white mb-4">Planes Especiales</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {specialPlans.map(renderPlanCard)}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={isAddingPlan} onOpenChange={setIsAddingPlan}>
        <DialogContent className="bg-haven-gray text-white border-white/10">
          <DialogHeader>
            <DialogTitle>Añadir Nuevo Plan</DialogTitle>
            <DialogDescription className="text-white/60">
              Complete la información para crear un nuevo plan de suscripción
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="category" className="text-right">
                Categoría
              </label>
              <Select value={newPlan.category} onValueChange={(value) => setNewPlan({...newPlan, category: value as 'monthly' | 'session' | 'special'})}>
                <SelectTrigger className="col-span-3 bg-haven-dark border-white/10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-haven-gray border-white/10">
                  <SelectItem value="monthly">Planes Mensuales</SelectItem>
                  <SelectItem value="session">Sesiones</SelectItem>
                  <SelectItem value="special">Planes Especiales</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="name" className="text-right">
                Nombre
              </label>
              <Input
                id="name"
                value={newPlan.name}
                onChange={(e) => setNewPlan({...newPlan, name: e.target.value})}
                className="col-span-3 bg-haven-dark border-white/10"
                placeholder="Nombre del plan"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="price" className="text-right">
                Precio (Bs)
              </label>
              <Input
                id="price"
                type="number"
                value={newPlan.price}
                onChange={(e) => setNewPlan({...newPlan, price: Number(e.target.value)})}
                className="col-span-3 bg-haven-dark border-white/10"
                placeholder="0"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddingPlan(false)} className="border-white/10 hover:bg-haven-dark">
              Cancelar
            </Button>
            <Button 
              className="bg-haven-red hover:bg-haven-red/90"
              onClick={handleAddPlan}
              disabled={!newPlan.name || newPlan.price <= 0}
            >
              Añadir Plan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Toaster />
    </div>
  );
};

export default SubscriptionPlans;
