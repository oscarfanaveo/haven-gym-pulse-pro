
import React, { useState } from 'react';
import { ShoppingCart as CartIcon, Trash, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { useCart, CartItem } from '@/contexts/CartContext';
import { cn } from '@/lib/utils';
import Invoice from '@/components/Invoice';

const ShoppingCart: React.FC = () => {
  const { items, removeItem, updateQuantity, clearCart, getTotal } = useCart();
  const [open, setOpen] = useState(false);
  const [showInvoice, setShowInvoice] = useState(false);

  const handleCheckout = () => {
    // Show invoice instead of clearing cart immediately
    setShowInvoice(true);
  };
  
  const handleCloseInvoice = () => {
    setShowInvoice(false);
    // Clear cart and close dialog after viewing invoice
    clearCart();
    setOpen(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button 
            variant="outline" 
            size="icon" 
            className="relative border-white/10 hover:bg-haven-dark"
          >
            <CartIcon size={20} />
            {items.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-haven-red text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {items.length}
              </span>
            )}
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-haven-gray text-white border-white/10 sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ShoppingBag className="text-haven-red" size={20} /> 
              Carrito de Compra
            </DialogTitle>
          </DialogHeader>
          
          <div className="max-h-[60vh] overflow-y-auto py-2">
            {items.length > 0 ? (
              <>
                {items.map((item) => (
                  <CartItemRow 
                    key={item.id} 
                    item={item} 
                    onRemove={removeItem}
                    onUpdateQuantity={updateQuantity}
                  />
                ))}
                <div className="mt-4">
                  <Separator className="bg-white/10 my-2" />
                  <div className="flex justify-between items-center font-bold py-2">
                    <span>Total:</span>
                    <span>{getTotal()} Bs</span>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-8 text-white/60">
                <ShoppingBag className="mx-auto mb-2 text-white/40" size={32} />
                <p>El carrito está vacío</p>
              </div>
            )}
          </div>
          
          <DialogFooter className="flex sm:justify-between gap-3">
            {items.length > 0 && (
              <Button 
                variant="outline" 
                className="border-white/10 hover:bg-haven-dark text-white/70"
                onClick={clearCart}
              >
                <Trash size={16} className="mr-2" />
                Vaciar
              </Button>
            )}
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="border-white/10 hover:bg-haven-dark"
                onClick={() => setOpen(false)}
              >
                Cerrar
              </Button>
              {items.length > 0 && (
                <Button 
                  className="bg-haven-red hover:bg-haven-red/90"
                  onClick={handleCheckout}
                >
                  Procesar Venta
                </Button>
              )}
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {showInvoice && (
        <Invoice 
          items={items}
          total={getTotal()}
          isSubscription={false}
          onClose={handleCloseInvoice}
        />
      )}
    </>
  );
};

interface CartItemRowProps {
  item: CartItem;
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
}

const CartItemRow: React.FC<CartItemRowProps> = ({ 
  item, 
  onRemove, 
  onUpdateQuantity 
}) => {
  return (
    <div className={cn(
      "flex items-center justify-between py-3 px-1",
      "border-b border-white/10 last:border-0"
    )}>
      <div className="flex flex-col">
        <span className="font-medium">{item.name}</span>
        <span className="text-sm text-white/60">{item.price} Bs</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center border border-white/20 rounded-md">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-none text-white/70 hover:text-white hover:bg-white/10"
            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
          >
            <Minus size={14} />
          </Button>
          <span className="w-8 text-center">{item.quantity}</span>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-none text-white/70 hover:text-white hover:bg-white/10"
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          >
            <Plus size={14} />
          </Button>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-white/50 hover:text-white hover:bg-white/10"
          onClick={() => onRemove(item.id)}
        >
          <Trash size={16} />
        </Button>
      </div>
    </div>
  );
};

export default ShoppingCart;
