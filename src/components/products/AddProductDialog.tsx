
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Plus } from "lucide-react";
import { useState } from "react";

const AddProductDialog = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-haven-red hover:bg-haven-red/90">
          <Plus className="mr-2 h-4 w-4" /> Añadir Producto
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-haven-gray text-white border-white/10">
        <DialogHeader>
          <DialogTitle>Añadir Nuevo Producto</DialogTitle>
          <DialogDescription className="text-white/60">
            Completa el formulario para añadir un nuevo producto al inventario
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nombre
            </Label>
            <Input
              id="name"
              placeholder="Nombre del producto"
              className="col-span-3 bg-haven-dark border-white/10"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">
              Categoría
            </Label>
            <Select>
              <SelectTrigger className="col-span-3 bg-haven-dark border-white/10">
                <SelectValue placeholder="Seleccionar categoría" />
              </SelectTrigger>
              <SelectContent className="bg-haven-gray border-white/10">
                <SelectItem value="supplement">Suplemento</SelectItem>
                <SelectItem value="accessory">Accesorio</SelectItem>
                <SelectItem value="clothing">Ropa</SelectItem>
                <SelectItem value="other">Otro</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              Precio (Bs)
            </Label>
            <Input
              id="price"
              type="number"
              placeholder="0.00"
              className="col-span-3 bg-haven-dark border-white/10"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="stock" className="text-right">
              Cantidad en Stock
            </Label>
            <Input
              id="stock"
              type="number"
              placeholder="0"
              className="col-span-3 bg-haven-dark border-white/10"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Descripción
            </Label>
            <Input
              id="description"
              placeholder="Descripción del producto"
              className="col-span-3 bg-haven-dark border-white/10"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} className="border-white/10 hover:bg-haven-dark">
            Cancelar
          </Button>
          <Button className="bg-haven-red hover:bg-haven-red/90">
            Añadir Producto
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductDialog;
