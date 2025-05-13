
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import Invoice from "@/components/Invoice";
import { CalendarCheck } from "lucide-react";
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

  const handleRenewalConfirmed = () => {
    setShowInvoice(true);
  };

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <div className="flex items-center gap-2 cursor-pointer w-full px-2 py-1.5 text-sm">
            <CalendarCheck size={14} />
            <span>Renovar</span>
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-haven-gray text-white border-white/10">
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Renovación</AlertDialogTitle>
            <AlertDialogDescription className="text-white/60">
              ¿Está seguro de que desea renovar la suscripción para {memberName}?
              <div className="mt-2 p-2 bg-haven-dark/50 rounded">
                <p className="font-medium">{getPlanName(planType)}</p>
                <p className="text-white/80">Precio: {price} Bs</p>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-white/10 hover:bg-haven-dark text-white">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction 
              className="bg-haven-red hover:bg-haven-red/90"
              onClick={handleRenewalConfirmed}
            >
              Confirmar Renovación
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

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
