import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Exercise {
  id: number;
  name: string;
  category: string | null;
  machine: string | null;
  description: string | null;
  image: string | null;
}

export const useTrainingData = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchExercises = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('entrenamientos')
        .select('*')
        .order('nombre');

      if (error) throw error;

      const mappedExercises: Exercise[] = (data || []).map(item => ({
        id: item.id,
        name: item.nombre,
        category: item.categoria,
        machine: item.maquina,
        description: item.descripcion,
        image: item.imagen_url
      }));

      setExercises(mappedExercises);
    } catch (error) {
      console.error('Error fetching exercises:', error);
      toast({
        title: "Error",
        description: "No se pudieron cargar los ejercicios.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addExercise = async (exercise: Omit<Exercise, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('entrenamientos')
        .insert({
          nombre: exercise.name,
          categoria: exercise.category,
          maquina: exercise.machine,
          descripcion: exercise.description,
          imagen_url: exercise.image
        })
        .select()
        .single();

      if (error) throw error;

      const newExercise: Exercise = {
        id: data.id,
        name: data.nombre,
        category: data.categoria,
        machine: data.maquina,
        description: data.descripcion,
        image: data.imagen_url
      };

      setExercises(prev => [...prev, newExercise]);
      
      toast({
        title: "Ejercicio añadido",
        description: "El nuevo ejercicio ha sido añadido exitosamente.",
      });

      return newExercise;
    } catch (error) {
      console.error('Error adding exercise:', error);
      toast({
        title: "Error",
        description: "No se pudo añadir el ejercicio.",
        variant: "destructive",
      });
      return null;
    }
  };

  const updateExercise = async (id: number, exercise: Partial<Exercise>) => {
    try {
      const { data, error } = await supabase
        .from('entrenamientos')
        .update({
          nombre: exercise.name,
          categoria: exercise.category,
          maquina: exercise.machine,
          descripcion: exercise.description,
          imagen_url: exercise.image
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      const updatedExercise: Exercise = {
        id: data.id,
        name: data.nombre,
        category: data.categoria,
        machine: data.maquina,
        description: data.descripcion,
        image: data.imagen_url
      };

      setExercises(prev => prev.map(ex => ex.id === id ? updatedExercise : ex));
      
      toast({
        title: "Ejercicio actualizado",
        description: "Los cambios han sido guardados exitosamente.",
      });

      return updatedExercise;
    } catch (error) {
      console.error('Error updating exercise:', error);
      toast({
        title: "Error",
        description: "No se pudo actualizar el ejercicio.",
        variant: "destructive",
      });
      return null;
    }
  };

  const deleteExercise = async (id: number) => {
    try {
      const { error } = await supabase
        .from('entrenamientos')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setExercises(prev => prev.filter(ex => ex.id !== id));
      
      toast({
        title: "Ejercicio eliminado",
        description: "El ejercicio ha sido eliminado exitosamente.",
      });

      return true;
    } catch (error) {
      console.error('Error deleting exercise:', error);
      toast({
        title: "Error",
        description: "No se pudo eliminar el ejercicio.",
        variant: "destructive",
      });
      return false;
    }
  };

  useEffect(() => {
    fetchExercises();
  }, []);

  return {
    exercises,
    loading,
    addExercise,
    updateExercise,
    deleteExercise,
    refetch: fetchExercises
  };
};