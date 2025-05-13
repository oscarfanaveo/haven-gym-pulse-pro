
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import Invoice from "@/components/Invoice";
import { CalendarCheck } from "lucide-react";

interface SubscriptionRenewalProps {
  memberName: string;
  planType: string;
  price: number;
}

const SubscriptionRenewal: React.FC<SubscriptionRenewalProps> = ({ 
  memberName, 
  planType,
  price
}) => {
  const [showInvoice, setShowInvoice] = useState(false);

  const getPlanName = (plan: string): string => {
    switch (plan) {
      case "Básico": return "Renovación Suscripción Básica";
      case "Regular": return "Renovación Suscripción Regular";
      case "Premium": return "Renovación Suscripción Premium";
      case "Temporal": return "Renovación Suscripción Temporal";
      default: return `Renovación ${plan}`;
    }
  };

  return (
    <>
      <Button 
        onClick={() => setShowInvoice(true)} 
        variant="outline"
        size="sm"
        className="flex items-center gap-1 border-white/10 hover:bg-haven-dark"
      >
        <CalendarCheck size={14} />
        <span>Renovar</span>
      </Button>

      {showInvoice && (
        <Invoice 
          subscriptionType={getPlanName(planType)}
          customerName={memberName}
          total={price}
          isSubscription={true}
          onClose={() => setShowInvoice(false)}
        />
      )}
    </>
  );
};

export default SubscriptionRenewal;
