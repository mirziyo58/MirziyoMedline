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
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      bot_config: {
        Row: {
          admin_chat_ids: string
          bot_username: string | null
          id: number
          token: string | null
          updated_at: string
          webhook_secret: string | null
          welcome_uz: string
        }
        Insert: {
          admin_chat_ids?: string
          bot_username?: string | null
          id?: number
          token?: string | null
          updated_at?: string
          webhook_secret?: string | null
          welcome_uz?: string
        }
        Update: {
          admin_chat_ids?: string
          bot_username?: string | null
          id?: number
          token?: string | null
          updated_at?: string
          webhook_secret?: string | null
          welcome_uz?: string
        }
        Relationships: []
      }
      bot_users: {
        Row: {
          blocked: boolean
          chat_id: number
          created_at: string
          first_name: string | null
          lang: string
          last_name: string | null
          last_seen: string
          phone: string | null
          state: Json
          username: string | null
        }
        Insert: {
          blocked?: boolean
          chat_id: number
          created_at?: string
          first_name?: string | null
          lang?: string
          last_name?: string | null
          last_seen?: string
          phone?: string | null
          state?: Json
          username?: string | null
        }
        Update: {
          blocked?: boolean
          chat_id?: number
          created_at?: string
          first_name?: string | null
          lang?: string
          last_name?: string | null
          last_seen?: string
          phone?: string | null
          state?: Json
          username?: string | null
        }
        Relationships: []
      }
      catalog: {
        Row: {
          active: boolean
          created_at: string
          data: Json
          id: string
          kind: string
          slug: string
          sort: number
        }
        Insert: {
          active?: boolean
          created_at?: string
          data: Json
          id?: string
          kind: string
          slug: string
          sort?: number
        }
        Update: {
          active?: boolean
          created_at?: string
          data?: Json
          id?: string
          kind?: string
          slug?: string
          sort?: number
        }
        Relationships: []
      }
      feedback: {
        Row: {
          chat_id: number | null
          created_at: string
          id: string
          kind: string
          name: string | null
          phone: string | null
          source: string
          status: string
          text: string
        }
        Insert: {
          chat_id?: number | null
          created_at?: string
          id?: string
          kind?: string
          name?: string | null
          phone?: string | null
          source?: string
          status?: string
          text: string
        }
        Update: {
          chat_id?: number | null
          created_at?: string
          id?: string
          kind?: string
          name?: string | null
          phone?: string | null
          source?: string
          status?: string
          text?: string
        }
        Relationships: []
      }
      leads: {
        Row: {
          created_at: string
          fields: Json
          id: string
          lang: string
          name: string
          note: string | null
          page: string | null
          phone: string
          source: string
          status: string
          type: string
        }
        Insert: {
          created_at?: string
          fields?: Json
          id?: string
          lang?: string
          name: string
          note?: string | null
          page?: string | null
          phone: string
          source?: string
          status?: string
          type: string
        }
        Update: {
          created_at?: string
          fields?: Json
          id?: string
          lang?: string
          name?: string
          note?: string | null
          page?: string | null
          phone?: string
          source?: string
          status?: string
          type?: string
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          key: string
          updated_at: string
          value: string
        }
        Insert: {
          key: string
          updated_at?: string
          value: string
        }
        Update: {
          key?: string
          updated_at?: string
          value?: string
        }
        Relationships: []
      }
      videos: {
        Row: {
          active: boolean
          created_at: string
          id: string
          kind: string
          sort: number
          title: string
          url: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          id?: string
          kind?: string
          sort?: number
          title?: string
          url: string
        }
        Update: {
          active?: boolean
          created_at?: string
          id?: string
          kind?: string
          sort?: number
          title?: string
          url?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
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
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
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
