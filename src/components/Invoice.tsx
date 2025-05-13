
import React from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { CartItem } from "@/contexts/CartContext";
import { QrCode } from "lucide-react";

interface InvoiceProps {
  items?: CartItem[];
  subscriptionType?: string;
  customerName?: string;
  total: number;
  isSubscription: boolean;
  onClose: () => void;
}

const Invoice: React.FC<InvoiceProps> = ({ 
  items = [], 
  subscriptionType,
  customerName = "Cliente",
  total, 
  isSubscription,
  onClose
}) => {
  const now = new Date();
  const invoiceNumber = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white text-black max-w-md w-full rounded-md shadow-lg overflow-hidden">
        <div className="relative p-4">
          <div className="absolute top-2 right-2">
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          </div>
          
          <div className="flex flex-col items-center border-b border-dashed border-gray-300 pb-3">
            <h2 className="font-bold text-xl">HAVEN GYM</h2>
            <p className="text-sm">Tu Éxito, Nuestro Objetivo - Bolivia</p>
          </div>
          
          <div className="border-b border-dashed border-gray-300 py-2 text-center">
            <h3 className="font-bold text-lg">FACTURA</h3>
          </div>
          
          <div className="py-2 text-sm">
            <div className="flex justify-between">
              <span>FACTURA No.:</span>
              <span>{invoiceNumber}</span>
            </div>
            <div className="flex justify-between">
              <span>FECHA:</span>
              <span>{format(now, 'dd/MM/yyyy')}</span>
            </div>
            <div className="flex justify-between">
              <span>HORA:</span>
              <span>{format(now, 'HH:mm:ss')}</span>
            </div>
            <div className="flex justify-between">
              <span>CLIENTE:</span>
              <span>{customerName}</span>
            </div>
          </div>
          
          <div className="border-t border-dashed border-gray-300 py-2">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-dashed border-gray-300">
                  <th className="text-left py-1">CONCEPTO</th>
                  <th className="text-right py-1">IMPORTE</th>
                </tr>
              </thead>
              <tbody>
                {isSubscription ? (
                  <tr>
                    <td className="py-1">{subscriptionType || "Suscripción"}</td>
                    <td className="text-right py-1">{total.toFixed(2)} Bs</td>
                  </tr>
                ) : (
                  items.map((item, index) => (
                    <tr key={index}>
                      <td className="py-1">
                        {item.quantity} {item.name}
                      </td>
                      <td className="text-right py-1">
                        {(item.price * item.quantity).toFixed(2)} Bs
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
              <tfoot>
                <tr className="border-t border-dashed border-gray-300">
                  <th className="text-left py-1">TOTAL:</th>
                  <th className="text-right py-1">{total.toFixed(2)} Bs</th>
                </tr>
              </tfoot>
            </table>
          </div>
          
          <div className="border-t border-dashed border-gray-300 mt-3 pt-3 text-center">
            <div className="flex justify-center mb-2">
              <QrCode size={80} />
            </div>
            <p className="text-xs italic">*ESTA FACTURA CONTRIBUYE AL DESARROLLO DEL PAÍS. EL USO ILÍCITO SERÁ SANCIONADO DE ACUERDO A LEY*</p>
            <p className="text-xs mt-4 font-bold">GRACIAS POR SU COMPRA</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
