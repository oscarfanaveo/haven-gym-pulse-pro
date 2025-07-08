
import React, { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PlanSelectorProps {
  onPlanChange: (plan: string, price: number) => void;
  plans: Array<{
    id: number;
    name: string;
    price: number;
    categoria: string;
  }>;
}

const PlanSelector: React.FC<PlanSelectorProps> = ({ onPlanChange, plans }) => {
  const [selectedPlan, setSelectedPlan] = useState<string>("");

  // Agrupar planes por categoría
  const monthlyPlans = plans.filter(plan => plan.categoria === 'monthly');
  const sessionPlans = plans.filter(plan => plan.categoria === 'session');
  const specialPlans = plans.filter(plan => plan.categoria === 'special');

  const handlePlanSelect = (planId: string) => {
    const selectedPlan = plans.find(plan => plan.id.toString() === planId);
    
    if (selectedPlan) {
      setSelectedPlan(planId);
      onPlanChange(selectedPlan.name, selectedPlan.price);
    }
  };

  return (
    <div className="space-y-3">
      {monthlyPlans.length > 0 && (
        <div>
          <label className="text-sm text-white/80 mb-1 block">Planes Mensuales</label>
          <Select value={selectedPlan} onValueChange={handlePlanSelect}>
            <SelectTrigger className="bg-haven-dark border-white/10">
              <SelectValue placeholder="Seleccionar plan mensual" />
            </SelectTrigger>
            <SelectContent className="bg-haven-gray border-white/10">
              {monthlyPlans.map((plan) => (
                <SelectItem key={plan.id} value={plan.id.toString()}>
                  {plan.name} - {plan.price} Bs
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
      
      {sessionPlans.length > 0 && (
        <div>
          <label className="text-sm text-white/80 mb-1 block">Sesiones</label>
          <Select value={selectedPlan} onValueChange={handlePlanSelect}>
            <SelectTrigger className="bg-haven-dark border-white/10">
              <SelectValue placeholder="Seleccionar sesión" />
            </SelectTrigger>
            <SelectContent className="bg-haven-gray border-white/10">
              {sessionPlans.map((plan) => (
                <SelectItem key={plan.id} value={plan.id.toString()}>
                  {plan.name} - {plan.price} Bs
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
      
      {specialPlans.length > 0 && (
        <div>
          <label className="text-sm text-white/80 mb-1 block">Planes Especiales</label>
          <Select value={selectedPlan} onValueChange={handlePlanSelect}>
            <SelectTrigger className="bg-haven-dark border-white/10">
              <SelectValue placeholder="Seleccionar plan especial" />
            </SelectTrigger>
            <SelectContent className="bg-haven-gray border-white/10">
              {specialPlans.map((plan) => (
                <SelectItem key={plan.id} value={plan.id.toString()}>
                  {plan.name} - {plan.price} Bs
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
      
      {plans.length === 0 && (
        <div className="text-center text-white/60 py-4">
          No hay planes disponibles
        </div>
      )}
    </div>
  );
};

export default PlanSelector;
