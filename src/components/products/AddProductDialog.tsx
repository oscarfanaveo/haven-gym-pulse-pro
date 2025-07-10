
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
import { addProduct } from "@/utils/productUtils";
import { useToast } from "@/hooks/use-toast";

interface AddProductDialogProps {
  onProductAdded?: () => void;
}

const AddProductDialog = ({ onProductAdded }: AddProductDialogProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    categoria: "",
    precio: "",
    stock: "",
    descripcion: ""
  });
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!formData.nombre || !formData.categoria || !formData.precio || !formData.stock) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos obligatorios",
        variant: "destructive"
      });
      return;
    }

    try {
      setLoading(true);
      await addProduct({
        nombre: formData.nombre,
        categoria: formData.categoria,
        precio: parseFloat(formData.precio),
        stock: parseInt(formData.stock),
        descripcion: formData.descripcion || undefined
      });

      toast({
        title: "Éxito",
        description: "Producto añadido correctamente"
      });

      setFormData({
        nombre: "",
        categoria: "",
        precio: "",
        stock: "",
        descripcion: ""
      });
      setOpen(false);
      onProductAdded?.();
    } catch (error) {
      console.error("Error adding product:", error);
      toast({
        title: "Error",
        description: "No se pudo añadir el producto",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

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
              value={formData.nombre}
              onChange={(e) => setFormData(prev => ({ ...prev, nombre: e.target.value }))}
              placeholder="Nombre del producto"
              className="col-span-3 bg-haven-dark border-white/10"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">
              Categoría
            </Label>
            <Select value={formData.categoria} onValueChange={(value) => setFormData(prev => ({ ...prev, categoria: value }))}>
              <SelectTrigger className="col-span-3 bg-haven-dark border-white/10">
                <SelectValue placeholder="Seleccionar categoría" />
              </SelectTrigger>
              <SelectContent className="bg-haven-gray border-white/10">
                <SelectItem value="Suplemento">Suplemento</SelectItem>
                <SelectItem value="Accesorio">Accesorio</SelectItem>
                <SelectItem value="Ropa">Ropa</SelectItem>
                <SelectItem value="Otro">Otro</SelectItem>
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
              value={formData.precio}
              onChange={(e) => setFormData(prev => ({ ...prev, precio: e.target.value }))}
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
              value={formData.stock}
              onChange={(e) => setFormData(prev => ({ ...prev, stock: e.target.value }))}
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
              value={formData.descripcion}
              onChange={(e) => setFormData(prev => ({ ...prev, descripcion: e.target.value }))}
              placeholder="Descripción del producto"
              className="col-span-3 bg-haven-dark border-white/10"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} className="border-white/10 hover:bg-haven-dark">
            Cancelar
          </Button>
          <Button 
            className="bg-haven-red hover:bg-haven-red/90"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Añadiendo..." : "Añadir Producto"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductDialog;
