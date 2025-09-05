export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      orders: {
        Row: {
          created_at: string | null
          customer_email: string
          customer_name: string | null
          customer_phone: string | null
          ghl_webhook_sent: boolean | null
          id: string
          product_ids: string[] | null
          stripe_session_id: string | null
          total_amount: number | null
        }
        Insert: {
          created_at?: string | null
          customer_email: string
          customer_name?: string | null
          customer_phone?: string | null
          ghl_webhook_sent?: boolean | null
          id?: string
          product_ids?: string[] | null
          stripe_session_id?: string | null
          total_amount?: number | null
        }
        Update: {
          created_at?: string | null
          customer_email?: string
          customer_name?: string | null
          customer_phone?: string | null
          ghl_webhook_sent?: boolean | null
          id?: string
          product_ids?: string[] | null
          stripe_session_id?: string | null
          total_amount?: number | null
        }
        Relationships: []
      }
      orders_access_log: {
        Row: {
          action: string
          attempted_at: string | null
          id: string
          ip_address: unknown | null
          success: boolean | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          attempted_at?: string | null
          id?: string
          ip_address?: unknown | null
          success?: boolean | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          attempted_at?: string | null
          id?: string
          ip_address?: unknown | null
          success?: boolean | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      products: {
        Row: {
          created_at: string | null
          description: Json | null
          id: string
          label: string | null
          name: Json
          price: number | null
          recommendation_criteria: Json | null
          state: string
        }
        Insert: {
          created_at?: string | null
          description?: Json | null
          id?: string
          label?: string | null
          name: Json
          price?: number | null
          recommendation_criteria?: Json | null
          state: string
        }
        Update: {
          created_at?: string | null
          description?: Json | null
          id?: string
          label?: string | null
          name?: Json
          price?: number | null
          recommendation_criteria?: Json | null
          state?: string
        }
        Relationships: []
      }
      questions: {
        Row: {
          created_at: string | null
          id: string
          options: Json | null
          order_number: number | null
          question_text: Json
          question_type: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          options?: Json | null
          order_number?: number | null
          question_text: Json
          question_type: string
        }
        Update: {
          created_at?: string | null
          id?: string
          options?: Json | null
          order_number?: number | null
          question_text?: Json
          question_type?: string
        }
        Relationships: []
      }
      quiz_responses: {
        Row: {
          answer: Json | null
          created_at: string | null
          id: string
          question_id: string | null
          session_id: string | null
        }
        Insert: {
          answer?: Json | null
          created_at?: string | null
          id?: string
          question_id?: string | null
          session_id?: string | null
        }
        Update: {
          answer?: Json | null
          created_at?: string | null
          id?: string
          question_id?: string | null
          session_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "quiz_responses_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
        ]
      }
      rate_limits: {
        Row: {
          created_at: string | null
          endpoint: string
          id: string
          identifier: string
          request_count: number | null
          window_start: string | null
        }
        Insert: {
          created_at?: string | null
          endpoint: string
          id?: string
          identifier: string
          request_count?: number | null
          window_start?: string | null
        }
        Update: {
          created_at?: string | null
          endpoint?: string
          id?: string
          identifier?: string
          request_count?: number | null
          window_start?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      anonymize_test_orders: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      enhanced_anonymize_customer_data: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      is_service_role_request: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      save_quiz_session: {
        Args: { p_answers: Json; p_contact_data?: Json; p_session_id: string }
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
