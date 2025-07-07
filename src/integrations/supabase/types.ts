export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      clientes: {
        Row: {
          activo: boolean
          apellido: string
          codigo: string
          correo: string | null
          fecha_registro: string
          id: number
          nombre: string
          telefono: string | null
        }
        Insert: {
          activo?: boolean
          apellido: string
          codigo: string
          correo?: string | null
          fecha_registro?: string
          id?: number
          nombre: string
          telefono?: string | null
        }
        Update: {
          activo?: boolean
          apellido?: string
          codigo?: string
          correo?: string | null
          fecha_registro?: string
          id?: number
          nombre?: string
          telefono?: string | null
        }
        Relationships: []
      }
      entrenamientos: {
        Row: {
          categoria: string | null
          descripcion: string | null
          id: number
          imagen_url: string | null
          maquina: string | null
          nombre: string
        }
        Insert: {
          categoria?: string | null
          descripcion?: string | null
          id?: number
          imagen_url?: string | null
          maquina?: string | null
          nombre: string
        }
        Update: {
          categoria?: string | null
          descripcion?: string | null
          id?: number
          imagen_url?: string | null
          maquina?: string | null
          nombre?: string
        }
        Relationships: []
      }
      planes: {
        Row: {
          categoria: Database["public"]["Enums"]["plan_category"]
          descripcion: string | null
          entradas: number
          horario: string
          id: number
          nombre: string
          precio: number
        }
        Insert: {
          categoria: Database["public"]["Enums"]["plan_category"]
          descripcion?: string | null
          entradas?: number
          horario?: string
          id?: number
          nombre: string
          precio: number
        }
        Update: {
          categoria?: Database["public"]["Enums"]["plan_category"]
          descripcion?: string | null
          entradas?: number
          horario?: string
          id?: number
          nombre?: string
          precio?: number
        }
        Relationships: []
      }
      productos: {
        Row: {
          categoria: string | null
          descripcion: string | null
          id: number
          nombre: string
          precio: number
          stock: number
        }
        Insert: {
          categoria?: string | null
          descripcion?: string | null
          id?: number
          nombre: string
          precio: number
          stock?: number
        }
        Update: {
          categoria?: string | null
          descripcion?: string | null
          id?: number
          nombre?: string
          precio?: number
          stock?: number
        }
        Relationships: []
      }
      profiles: {
        Row: {
          full_name: string | null
          id: string
          role: Database["public"]["Enums"]["user_role"]
        }
        Insert: {
          full_name?: string | null
          id: string
          role: Database["public"]["Enums"]["user_role"]
        }
        Update: {
          full_name?: string | null
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
        }
        Relationships: []
      }
      registros_entrada: {
        Row: {
          cliente_id: number
          fecha_entrada: string
          id: number
          suscripcion_id: number
        }
        Insert: {
          cliente_id: number
          fecha_entrada?: string
          id?: number
          suscripcion_id: number
        }
        Update: {
          cliente_id?: number
          fecha_entrada?: string
          id?: number
          suscripcion_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "registros_entrada_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "registros_entrada_suscripcion_id_fkey"
            columns: ["suscripcion_id"]
            isOneToOne: false
            referencedRelation: "suscripciones"
            referencedColumns: ["id"]
          },
        ]
      }
      suscripciones: {
        Row: {
          cliente_id: number
          creado_por_usuario_id: string | null
          estado: string
          fecha_fin: string
          fecha_inicio: string
          id: number
          plan_id: number
        }
        Insert: {
          cliente_id: number
          creado_por_usuario_id?: string | null
          estado?: string
          fecha_fin: string
          fecha_inicio: string
          id?: number
          plan_id: number
        }
        Update: {
          cliente_id?: number
          creado_por_usuario_id?: string | null
          estado?: string
          fecha_fin?: string
          fecha_inicio?: string
          id?: number
          plan_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "suscripciones_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "suscripciones_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "planes"
            referencedColumns: ["id"]
          },
        ]
      }
      ventas: {
        Row: {
          cliente_id: number | null
          estado: string
          fecha: string
          id: number
          nombre_cliente_temporal: string | null
          total: number
          vendedor_usuario_id: string | null
        }
        Insert: {
          cliente_id?: number | null
          estado?: string
          fecha?: string
          id?: number
          nombre_cliente_temporal?: string | null
          total: number
          vendedor_usuario_id?: string | null
        }
        Update: {
          cliente_id?: number | null
          estado?: string
          fecha?: string
          id?: number
          nombre_cliente_temporal?: string | null
          total?: number
          vendedor_usuario_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ventas_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
        ]
      }
      ventas_productos: {
        Row: {
          cantidad: number
          precio_unitario: number
          producto_id: number
          venta_id: number
        }
        Insert: {
          cantidad: number
          precio_unitario: number
          producto_id: number
          venta_id: number
        }
        Update: {
          cantidad?: number
          precio_unitario?: number
          producto_id?: number
          venta_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "ventas_productos_producto_id_fkey"
            columns: ["producto_id"]
            isOneToOne: false
            referencedRelation: "productos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ventas_productos_venta_id_fkey"
            columns: ["venta_id"]
            isOneToOne: false
            referencedRelation: "ventas"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      plan_category: "monthly" | "session" | "special"
      user_role: "admin" | "recepcion" | "trainer"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      plan_category: ["monthly", "session", "special"],
      user_role: ["admin", "recepcion", "trainer"],
    },
  },
} as const
