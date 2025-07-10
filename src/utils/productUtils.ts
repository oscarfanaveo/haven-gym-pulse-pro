import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";

export type Product = Tables<"productos"> & {
  status: string;
};

export const getProductStatus = (stock: number): string => {
  if (stock === 0) return "Sin Stock";
  if (stock <= 5) return "Poco Stock";
  return "En Stock";
};

export const fetchProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from("productos")
    .select("*")
    .order("nombre");

  if (error) {
    console.error("Error fetching products:", error);
    throw error;
  }

  return (data || []).map(product => ({
    ...product,
    status: getProductStatus(product.stock)
  }));
};

export const addProduct = async (productData: {
  nombre: string;
  categoria: string;
  precio: number;
  stock: number;
  descripcion?: string;
}) => {
  const { data, error } = await supabase
    .from("productos")
    .insert([productData])
    .select()
    .single();

  if (error) {
    console.error("Error adding product:", error);
    throw error;
  }

  return {
    ...data,
    status: getProductStatus(data.stock)
  };
};

export const updateProduct = async (id: number, updates: Partial<{
  nombre: string;
  categoria: string;
  precio: number;
  stock: number;
  descripcion: string;
}>) => {
  const { data, error } = await supabase
    .from("productos")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating product:", error);
    throw error;
  }

  return {
    ...data,
    status: getProductStatus(data.stock)
  };
};

export const deleteProduct = async (id: number) => {
  const { error } = await supabase
    .from("productos")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};