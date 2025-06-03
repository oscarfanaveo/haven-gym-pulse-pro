import { useState } from "react";
import { Dumbbell, Plus, Search, Filter, Edit, Trash2, MoreHorizontal, Upload } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

// Datos de ejemplo para ejercicios de entrenamiento
const initialExercisesData = [
  {
    id: "1",
    name: "Press de Banca",
    category: "Pecho",
    machine: "Máquina de Press de Banca",
    description: "Acuéstese en el banco con los pies en el suelo. Agarre la barra con las manos un poco más anchas que los hombros. Baje la barra al nivel del pecho, luego empuje hacia arriba.",
    image: "https://images.unsplash.com/photo-1517022812141-23620dba5c23?w=400&h=300&fit=crop"
  },
  {
    id: "2",
    name: "Prensa de Piernas",
    category: "Piernas",
    machine: "Máquina de Prensa de Piernas",
    description: "Siéntese en la máquina con la espalda contra el respaldo. Coloque los pies separados a la altura de las caderas en la plataforma. Empuje la plataforma extendiendo las piernas.",
    image: "https://images.unsplash.com/photo-1452960962994-acf4fd70b632?w=400&h=300&fit=crop"
  },
  {
    id: "3",
    name: "Jalón al Pecho",
    category: "Espalda",
    machine: "Máquina de Cables",
    description: "Siéntese en la máquina con los muslos asegurados. Agarre la barra con un agarre ancho. Tire de la barra hacia abajo hasta el nivel del pecho mientras mantiene la espalda recta.",
    image: "https://images.unsplash.com/photo-1485833077593-4278bba3f11f?w=400&h=300&fit=crop"
  },
  {
    id: "4",
    name: "Curl de Bíceps",
    category: "Brazos",
    machine: "Mancuerna",
    description: "De pie con una mancuerna en cada mano, brazos a los lados. Mantenga los codos cerca del torso y levante las pesas hasta el nivel de los hombros.",
    image: "https://images.unsplash.com/photo-1438565434616-3ef039228b15?w=400&h=300&fit=crop"
  },
  {
    id: "5",
    name: "Carrera en Cinta",
    category: "Cardio",
    machine: "Cinta de Correr",
    description: "Configure la velocidad y la inclinación deseadas. Mantenga una postura adecuada con los hombros hacia atrás y el núcleo activado mientras corre.",
    image: "https://images.unsplash.com/photo-1501286353178-1ec881214838?w=400&h=300&fit=crop"
  },
  {
    id: "6",
    name: "Press de Hombros",
    category: "Hombros",
    machine: "Máquina de Press de Hombros",
    description: "Siéntese con la espalda contra el respaldo. Agarre las asas a la altura de los hombros. Empuje hacia arriba hasta que los brazos estén extendidos, luego baje de nuevo.",
    image: "https://images.unsplash.com/photo-1469041797191-50ace28483c3?w=400&h=300&fit=crop"
  },
];

const categoryColors: Record<string, string> = {
  "Pecho": "bg-blue-500/20 text-blue-400",
  "Espalda": "bg-purple-500/20 text-purple-400",
  "Piernas": "bg-green-500/20 text-green-400",
  "Brazos": "bg-orange-500/20 text-orange-400",
  "Hombros": "bg-yellow-500/20 text-yellow-400",
  "Cardio": "bg-red-500/20 text-red-400",
  "Core": "bg-teal-500/20 text-teal-400",
};

interface Exercise {
  id: string;
  name: string;
  category: string;
  machine: string;
  description: string;
  image: string;
}

const Training = () => {
  const { toast } = useToast();
  const [exercisesData, setExercisesData] = useState<Exercise[]>(initialExercisesData);
  const [openNewExercise, setOpenNewExercise] = useState(false);
  const [openEditExercise, setOpenEditExercise] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [editingExercise, setEditingExercise] = useState<Exercise | null>(null);
  const [newExercise, setNewExercise] = useState({
    name: "",
    category: "",
    machine: "",
    description: "",
    image: ""
  });

  const filteredExercises = activeCategory === "all" 
    ? exercisesData 
    : exercisesData.filter(exercise => exercise.category.toLowerCase() === activeCategory);

  const handleEditExercise = (exercise: Exercise) => {
    setEditingExercise(exercise);
    setOpenEditExercise(true);
  };

  const handleDeleteExercise = (exerciseId: string) => {
    setExercisesData(prev => prev.filter(ex => ex.id !== exerciseId));
    toast({
      title: "Ejercicio eliminado",
      description: "El ejercicio ha sido eliminado exitosamente.",
    });
  };

  const handleSaveEdit = () => {
    if (!editingExercise) return;
    
    setExercisesData(prev => prev.map(ex => 
      ex.id === editingExercise.id ? editingExercise : ex
    ));
    setOpenEditExercise(false);
    setEditingExercise(null);
    toast({
      title: "Ejercicio actualizado",
      description: "Los cambios han sido guardados exitosamente.",
    });
  };

  const handleAddExercise = () => {
    if (!newExercise.name || !newExercise.category) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos requeridos.",
        variant: "destructive",
      });
      return;
    }

    const exercise: Exercise = {
      id: Date.now().toString(),
      ...newExercise
    };

    setExercisesData(prev => [...prev, exercise]);
    setNewExercise({
      name: "",
      category: "",
      machine: "",
      description: "",
      image: ""
    });
    setOpenNewExercise(false);
    toast({
      title: "Ejercicio añadido",
      description: "El nuevo ejercicio ha sido añadido exitosamente.",
    });
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, isEdit: boolean = false) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        if (isEdit && editingExercise) {
          setEditingExercise({
            ...editingExercise,
            image: imageUrl
          });
        } else {
          setNewExercise(prev => ({
            ...prev,
            image: imageUrl
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white">Programas de Entrenamiento</h2>
          <p className="text-white/60">Explorar y gestionar ejercicios de entrenamiento</p>
        </div>
        <Dialog open={openNewExercise} onOpenChange={setOpenNewExercise}>
          <DialogTrigger asChild>
            <Button className="bg-haven-red hover:bg-haven-red/90">
              <Plus className="mr-2 h-4 w-4" /> Añadir Nuevo Ejercicio
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-haven-gray text-white border-white/10">
            <DialogHeader>
              <DialogTitle>Añadir Nuevo Ejercicio</DialogTitle>
              <DialogDescription className="text-white/60">
                Ingrese detalles del ejercicio e instrucciones de entrenamiento
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Nombre *
                </Label>
                <Input
                  id="name"
                  placeholder="Nombre del ejercicio"
                  className="col-span-3 bg-haven-dark border-white/10"
                  value={newExercise.name}
                  onChange={(e) => setNewExercise(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Categoría *
                </Label>
                <Select value={newExercise.category} onValueChange={(value) => setNewExercise(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger className="col-span-3 bg-haven-dark border-white/10">
                    <SelectValue placeholder="Seleccionar categoría" />
                  </SelectTrigger>
                  <SelectContent className="bg-haven-gray border-white/10">
                    <SelectItem value="Pecho">Pecho</SelectItem>
                    <SelectItem value="Espalda">Espalda</SelectItem>
                    <SelectItem value="Piernas">Piernas</SelectItem>
                    <SelectItem value="Brazos">Brazos</SelectItem>
                    <SelectItem value="Hombros">Hombros</SelectItem>
                    <SelectItem value="Cardio">Cardio</SelectItem>
                    <SelectItem value="Core">Core</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="machine" className="text-right">
                  Máquina/Equipo
                </Label>
                <Input
                  id="machine"
                  placeholder="Equipo requerido"
                  className="col-span-3 bg-haven-dark border-white/10"
                  value={newExercise.machine}
                  onChange={(e) => setNewExercise(prev => ({ ...prev, machine: e.target.value }))}
                />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="description" className="text-right pt-2">
                  Descripción
                </Label>
                <Textarea
                  id="description"
                  placeholder="Instrucciones del ejercicio"
                  className="col-span-3 bg-haven-dark border-white/10"
                  rows={4}
                  value={newExercise.description}
                  onChange={(e) => setNewExercise(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="image" className="text-right">
                  Imagen
                </Label>
                <div className="col-span-3 space-y-2">
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    className="bg-haven-dark border-white/10"
                    onChange={(e) => handleImageUpload(e)}
                  />
                  {newExercise.image && (
                    <img 
                      src={newExercise.image} 
                      alt="Vista previa" 
                      className="w-20 h-20 object-cover rounded"
                    />
                  )}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpenNewExercise(false)} className="border-white/10 hover:bg-haven-dark">
                Cancelar
              </Button>
              <Button onClick={handleAddExercise} className="bg-haven-red hover:bg-haven-red/90">
                Añadir Ejercicio
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Dialog para editar ejercicio */}
      <Dialog open={openEditExercise} onOpenChange={setOpenEditExercise}>
        <DialogContent className="bg-haven-gray text-white border-white/10">
          <DialogHeader>
            <DialogTitle>Editar Ejercicio</DialogTitle>
            <DialogDescription className="text-white/60">
              Modifica los detalles del ejercicio
            </DialogDescription>
          </DialogHeader>
          {editingExercise && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">
                  Nombre *
                </Label>
                <Input
                  id="edit-name"
                  className="col-span-3 bg-haven-dark border-white/10"
                  value={editingExercise.name}
                  onChange={(e) => setEditingExercise({ ...editingExercise, name: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-category" className="text-right">
                  Categoría *
                </Label>
                <Select value={editingExercise.category} onValueChange={(value) => setEditingExercise({ ...editingExercise, category: value })}>
                  <SelectTrigger className="col-span-3 bg-haven-dark border-white/10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-haven-gray border-white/10">
                    <SelectItem value="Pecho">Pecho</SelectItem>
                    <SelectItem value="Espalda">Espalda</SelectItem>
                    <SelectItem value="Piernas">Piernas</SelectItem>
                    <SelectItem value="Brazos">Brazos</SelectItem>
                    <SelectItem value="Hombros">Hombros</SelectItem>
                    <SelectItem value="Cardio">Cardio</SelectItem>
                    <SelectItem value="Core">Core</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-machine" className="text-right">
                  Máquina/Equipo
                </Label>
                <Input
                  id="edit-machine"
                  className="col-span-3 bg-haven-dark border-white/10"
                  value={editingExercise.machine}
                  onChange={(e) => setEditingExercise({ ...editingExercise, machine: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="edit-description" className="text-right pt-2">
                  Descripción
                </Label>
                <Textarea
                  id="edit-description"
                  className="col-span-3 bg-haven-dark border-white/10"
                  rows={4}
                  value={editingExercise.description}
                  onChange={(e) => setEditingExercise({ ...editingExercise, description: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-image" className="text-right">
                  Imagen
                </Label>
                <div className="col-span-3 space-y-2">
                  <Input
                    id="edit-image"
                    type="file"
                    accept="image/*"
                    className="bg-haven-dark border-white/10"
                    onChange={(e) => handleImageUpload(e, true)}
                  />
                  {editingExercise.image && (
                    <img 
                      src={editingExercise.image} 
                      alt="Vista previa" 
                      className="w-20 h-20 object-cover rounded"
                    />
                  )}
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenEditExercise(false)} className="border-white/10 hover:bg-haven-dark">
              Cancelar
            </Button>
            <Button onClick={handleSaveEdit} className="bg-haven-red hover:bg-haven-red/90">
              Guardar Cambios
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Tabs defaultValue="grid" className="w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <TabsList className="bg-haven-dark grid grid-cols-2 w-full max-w-[200px]">
            <TabsTrigger value="grid" className="data-[state=active]:bg-haven-red">Cuadrícula</TabsTrigger>
            <TabsTrigger value="list" className="data-[state=active]:bg-haven-red">Lista</TabsTrigger>
          </TabsList>
          
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-3 h-4 w-4 text-white/40" />
              <Input
                placeholder="Buscar ejercicios..."
                className="bg-haven-dark border-white/10 pl-10"
              />
            </div>
            <Select value={activeCategory} onValueChange={setActiveCategory}>
              <SelectTrigger className="w-full md:w-[180px] bg-haven-dark border-white/10">
                <SelectValue placeholder="Todas las categorías" />
              </SelectTrigger>
              <SelectContent className="bg-haven-gray border-white/10">
                <SelectItem value="all">Todas las categorías</SelectItem>
                <SelectItem value="pecho">Pecho</SelectItem>
                <SelectItem value="espalda">Espalda</SelectItem>
                <SelectItem value="piernas">Piernas</SelectItem>
                <SelectItem value="brazos">Brazos</SelectItem>
                <SelectItem value="hombros">Hombros</SelectItem>
                <SelectItem value="cardio">Cardio</SelectItem>
                <SelectItem value="core">Core</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <TabsContent value="grid" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExercises.map((exercise) => (
              <Card key={exercise.id} className="haven-card overflow-hidden">
                <div className="aspect-video bg-haven-dark relative">
                  <img 
                    src={exercise.image} 
                    alt={exercise.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0 bg-black/50 hover:bg-black/70">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-haven-gray border-white/10">
                        <DropdownMenuItem 
                          className="flex items-center gap-2 cursor-pointer"
                          onClick={() => handleEditExercise(exercise)}
                        >
                          <Edit className="h-4 w-4" /> Editar Ejercicio
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="flex items-center gap-2 text-red-500 cursor-pointer"
                          onClick={() => handleDeleteExercise(exercise.id)}
                        >
                          <Trash2 className="h-4 w-4" /> Eliminar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-lg">{exercise.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs ${categoryColors[exercise.category]}`}>
                      {exercise.category}
                    </span>
                  </div>
                  <p className="text-sm text-white/60 mb-3">{exercise.machine}</p>
                  <p className="text-sm">{exercise.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="list" className="mt-0">
          <Card className="haven-card">
            <CardContent className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-3 px-4">Ejercicio</th>
                      <th className="text-left py-3 px-4">Categoría</th>
                      <th className="text-left py-3 px-4">Máquina</th>
                      <th className="text-left py-3 px-4">Descripción</th>
                      <th className="text-right py-3 px-4">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredExercises.map((exercise) => (
                      <tr key={exercise.id} className="border-b border-white/10 hover:bg-haven-dark/50">
                        <td className="py-4 px-4 font-medium">{exercise.name}</td>
                        <td className="py-4 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs ${categoryColors[exercise.category]}`}>
                            {exercise.category}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-white/80">{exercise.machine}</td>
                        <td className="py-4 px-4">
                          <p className="text-white/60 truncate max-w-md">{exercise.description}</p>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-haven-gray border-white/10">
                              <DropdownMenuItem 
                                className="flex items-center gap-2 cursor-pointer"
                                onClick={() => handleEditExercise(exercise)}
                              >
                                <Edit className="h-4 w-4" /> Editar Ejercicio
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                className="flex items-center gap-2 text-red-500 cursor-pointer"
                                onClick={() => handleDeleteExercise(exercise.id)}
                              >
                                <Trash2 className="h-4 w-4" /> Eliminar
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* ... keep existing code (workout category cards section) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="haven-card bg-gradient-to-br from-blue-500/20 to-blue-600/10 hover:from-blue-500/30 hover:to-blue-600/20 transition-colors cursor-pointer group">
          <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full">
            <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-3 group-hover:bg-blue-500/30 transition-colors">
              <Dumbbell className="text-blue-400" size={24} />
            </div>
            <h3 className="font-bold">Entrenamiento de Pecho</h3>
            <p className="text-sm text-white/60 mt-1">8 ejercicios</p>
          </CardContent>
        </Card>
        
        <Card className="haven-card bg-gradient-to-br from-purple-500/20 to-purple-600/10 hover:from-purple-500/30 hover:to-purple-600/20 transition-colors cursor-pointer group">
          <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full">
            <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-3 group-hover:bg-purple-500/30 transition-colors">
              <Dumbbell className="text-purple-400" size={24} />
            </div>
            <h3 className="font-bold">Entrenamiento de Espalda</h3>
            <p className="text-sm text-white/60 mt-1">6 ejercicios</p>
          </CardContent>
        </Card>
        
        <Card className="haven-card bg-gradient-to-br from-green-500/20 to-green-600/10 hover:from-green-500/30 hover:to-green-600/20 transition-colors cursor-pointer group">
          <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full">
            <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mb-3 group-hover:bg-green-500/30 transition-colors">
              <Dumbbell className="text-green-400" size={24} />
            </div>
            <h3 className="font-bold">Entrenamiento de Piernas</h3>
            <p className="text-sm text-white/60 mt-1">7 ejercicios</p>
          </CardContent>
        </Card>
        
        <Card className="haven-card bg-gradient-to-br from-red-500/20 to-red-600/10 hover:from-red-500/30 hover:to-red-600/20 transition-colors cursor-pointer group">
          <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full">
            <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center mb-3 group-hover:bg-red-500/30 transition-colors">
              <Dumbbell className="text-red-400" size={24} />
            </div>
            <h3 className="font-bold">Entrenamiento Cardio</h3>
            <p className="text-sm text-white/60 mt-1">5 ejercicios</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Training;
