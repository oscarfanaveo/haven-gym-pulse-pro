
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PlanSelectorProps {
  onPlanChange: (plan: string, price: number) => void;
}

type PlanOption = {
  id: string;
  name: string;
  price: number;
};

const monthlyPlans: PlanOption[] = [
  { id: "monthly-129", name: "129Bs Mensual, día por medio", price: 129 },
  { id: "monthly-149", name: "149Bs Mensual, mañaneros", price: 149 },
  { id: "monthly-169", name: "169Bs Mensual, único", price: 169 },
  { id: "monthly-189", name: "189Bs Mensual, ilimitado", price: 189 },
  { id: "monthly-329", name: "329Bs, Gym Bro", price: 329 },
];

const sessionPlans: PlanOption[] = [
  { id: "session-20", name: "20Bs Sesión Individual", price: 20 },
  { id: "session-45", name: "45Bs Sesión de Crioterapia", price: 45 },
];

const specialPlans: PlanOption[] = [
  { id: "special-689", name: "689Bs Mensual, Personalizado", price: 689 },
  { id: "special-2300", name: "2300Bs Mensual, Integral Completo", price: 2300 },
  { id: "special-449", name: "449Bs Trimestre", price: 449 },
  { id: "special-839", name: "839Bs Semestre", price: 839 },
  { id: "special-1559", name: "1559Bs Anual", price: 1559 },
];

const PlanSelector: React.FC<PlanSelectorProps> = ({ onPlanChange }) => {
  const handlePlanSelect = (type: string, value: string) => {
    const planMap: Record<string, PlanOption[]> = {
      monthly: monthlyPlans,
      session: sessionPlans,
      special: specialPlans
    };
    
    const selectedPlan = planMap[type].find(plan => plan.id === value);
    
    if (selectedPlan) {
      onPlanChange(selectedPlan.name, selectedPlan.price);
    }
  };

  return (
    <div className="grid grid-cols-3 gap-2">
      <Select onValueChange={(value) => handlePlanSelect('monthly', value)}>
        <SelectTrigger className="bg-haven-dark border-white/10">
          <SelectValue placeholder="Plan Mensual" />
        </SelectTrigger>
        <SelectContent className="bg-haven-gray border-white/10">
          {monthlyPlans.map((plan) => (
            <SelectItem key={plan.id} value={plan.id}>{plan.name}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      <Select onValueChange={(value) => handlePlanSelect('session', value)}>
        <SelectTrigger className="bg-haven-dark border-white/10">
          <SelectValue placeholder="Sesión" />
        </SelectTrigger>
        <SelectContent className="bg-haven-gray border-white/10">
          {sessionPlans.map((plan) => (
            <SelectItem key={plan.id} value={plan.id}>{plan.name}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      <Select onValueChange={(value) => handlePlanSelect('special', value)}>
        <SelectTrigger className="bg-haven-dark border-white/10">
          <SelectValue placeholder="Planes Especiales" />
        </SelectTrigger>
        <SelectContent className="bg-haven-gray border-white/10">
          {specialPlans.map((plan) => (
            <SelectItem key={plan.id} value={plan.id}>{plan.name}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default PlanSelector;
