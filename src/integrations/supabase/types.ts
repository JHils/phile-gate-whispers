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
      campfire_messages: {
        Row: {
          created_at: string
          id: string
          message: string
          role: string
          user_hash: string
          username: string
        }
        Insert: {
          created_at?: string
          id?: string
          message: string
          role?: string
          user_hash: string
          username: string
        }
        Update: {
          created_at?: string
          id?: string
          message?: string
          role?: string
          user_hash?: string
          username?: string
        }
        Relationships: []
      }
      chaos_events: {
        Row: {
          created_at: string | null
          event_data: Json | null
          event_type: string
          id: string
          narrative_impact: string | null
          trigger_chance: number | null
          triggered_at: string | null
          user_hash: string
        }
        Insert: {
          created_at?: string | null
          event_data?: Json | null
          event_type: string
          id?: string
          narrative_impact?: string | null
          trigger_chance?: number | null
          triggered_at?: string | null
          user_hash: string
        }
        Update: {
          created_at?: string | null
          event_data?: Json | null
          event_type?: string
          id?: string
          narrative_impact?: string | null
          trigger_chance?: number | null
          triggered_at?: string | null
          user_hash?: string
        }
        Relationships: []
      }
      jonah_diary_entries: {
        Row: {
          created_at: string | null
          emotional_context: string | null
          entry_content: string
          entry_type: string
          expires_at: string | null
          id: string
          importance_score: number | null
          is_ephemeral: boolean | null
          user_hash: string
          viewed_at: string | null
        }
        Insert: {
          created_at?: string | null
          emotional_context?: string | null
          entry_content: string
          entry_type?: string
          expires_at?: string | null
          id?: string
          importance_score?: number | null
          is_ephemeral?: boolean | null
          user_hash: string
          viewed_at?: string | null
        }
        Update: {
          created_at?: string | null
          emotional_context?: string | null
          entry_content?: string
          entry_type?: string
          expires_at?: string | null
          id?: string
          importance_score?: number | null
          is_ephemeral?: boolean | null
          user_hash?: string
          viewed_at?: string | null
        }
        Relationships: []
      }
      jonah_memory_bank: {
        Row: {
          created_at: string | null
          decay_rate: number | null
          emotional_weight: number | null
          id: string
          importance_score: number | null
          interaction_count: number | null
          last_referenced: string | null
          memory_content: string
          memory_type: string
          user_hash: string
        }
        Insert: {
          created_at?: string | null
          decay_rate?: number | null
          emotional_weight?: number | null
          id?: string
          importance_score?: number | null
          interaction_count?: number | null
          last_referenced?: string | null
          memory_content: string
          memory_type: string
          user_hash: string
        }
        Update: {
          created_at?: string | null
          decay_rate?: number | null
          emotional_weight?: number | null
          id?: string
          importance_score?: number | null
          interaction_count?: number | null
          last_referenced?: string | null
          memory_content?: string
          memory_type?: string
          user_hash?: string
        }
        Relationships: []
      }
      live_cult_stats: {
        Row: {
          id: string
          metadata: Json | null
          stat_type: string
          stat_value: number | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          metadata?: Json | null
          stat_type: string
          stat_value?: number | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          metadata?: Json | null
          stat_type?: string
          stat_value?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      mirror_pages: {
        Row: {
          created_at: string | null
          emotional_tone: string | null
          id: string
          is_active: boolean | null
          mirror_content: Json
          original_path: string
          trigger_conditions: Json | null
          visual_modifications: Json | null
        }
        Insert: {
          created_at?: string | null
          emotional_tone?: string | null
          id?: string
          is_active?: boolean | null
          mirror_content: Json
          original_path: string
          trigger_conditions?: Json | null
          visual_modifications?: Json | null
        }
        Update: {
          created_at?: string | null
          emotional_tone?: string | null
          id?: string
          is_active?: boolean | null
          mirror_content?: Json
          original_path?: string
          trigger_conditions?: Json | null
          visual_modifications?: Json | null
        }
        Relationships: []
      }
      qr_artifacts: {
        Row: {
          artifact_type: string
          created_at: string | null
          found_at: string | null
          found_by_user_hash: string | null
          id: string
          is_active: boolean | null
          location_hint: string | null
          qr_code: string
          unlock_content: Json | null
        }
        Insert: {
          artifact_type: string
          created_at?: string | null
          found_at?: string | null
          found_by_user_hash?: string | null
          id?: string
          is_active?: boolean | null
          location_hint?: string | null
          qr_code: string
          unlock_content?: Json | null
        }
        Update: {
          artifact_type?: string
          created_at?: string | null
          found_at?: string | null
          found_by_user_hash?: string | null
          id?: string
          is_active?: boolean | null
          location_hint?: string | null
          qr_code?: string
          unlock_content?: Json | null
        }
        Relationships: []
      }
      user_masks: {
        Row: {
          created_at: string | null
          dialogue_modifiers: Json | null
          id: string
          is_active: boolean | null
          mask_id: string
          mask_name: string
          unlock_trigger: string | null
          unlocked_at: string | null
          user_hash: string
          visual_properties: Json | null
        }
        Insert: {
          created_at?: string | null
          dialogue_modifiers?: Json | null
          id?: string
          is_active?: boolean | null
          mask_id: string
          mask_name: string
          unlock_trigger?: string | null
          unlocked_at?: string | null
          user_hash: string
          visual_properties?: Json | null
        }
        Update: {
          created_at?: string | null
          dialogue_modifiers?: Json | null
          id?: string
          is_active?: boolean | null
          mask_id?: string
          mask_name?: string
          unlock_trigger?: string | null
          unlocked_at?: string | null
          user_hash?: string
          visual_properties?: Json | null
        }
        Relationships: []
      }
      user_tracking: {
        Row: {
          chaos_events_triggered: number | null
          console_commands_found: number
          current_mask: string | null
          diary_entries_viewed: number | null
          first_visit: string
          id: string
          jonah_awakeness_level: number | null
          last_4_44_interaction: string | null
          last_visit: string
          legacy_written: boolean
          mirror_mode_unlocked: boolean | null
          pages_visited: number
          score: number
          title: string
          user_hash: string
          whisper_count: number | null
        }
        Insert: {
          chaos_events_triggered?: number | null
          console_commands_found?: number
          current_mask?: string | null
          diary_entries_viewed?: number | null
          first_visit?: string
          id?: string
          jonah_awakeness_level?: number | null
          last_4_44_interaction?: string | null
          last_visit?: string
          legacy_written?: boolean
          mirror_mode_unlocked?: boolean | null
          pages_visited?: number
          score?: number
          title?: string
          user_hash: string
          whisper_count?: number | null
        }
        Update: {
          chaos_events_triggered?: number | null
          console_commands_found?: number
          current_mask?: string | null
          diary_entries_viewed?: number | null
          first_visit?: string
          id?: string
          jonah_awakeness_level?: number | null
          last_4_44_interaction?: string | null
          last_visit?: string
          legacy_written?: boolean
          mirror_mode_unlocked?: boolean | null
          pages_visited?: number
          score?: number
          title?: string
          user_hash?: string
          whisper_count?: number | null
        }
        Relationships: []
      }
      whisper_archive: {
        Row: {
          emotional_context: string | null
          id: string
          llm_processed: boolean | null
          memory_importance: number | null
          response_content: string | null
          timestamp: string | null
          user_hash: string
          whisper_content: string
          whisper_type: string | null
        }
        Insert: {
          emotional_context?: string | null
          id?: string
          llm_processed?: boolean | null
          memory_importance?: number | null
          response_content?: string | null
          timestamp?: string | null
          user_hash: string
          whisper_content: string
          whisper_type?: string | null
        }
        Update: {
          emotional_context?: string | null
          id?: string
          llm_processed?: boolean | null
          memory_importance?: number | null
          response_content?: string | null
          timestamp?: string | null
          user_hash?: string
          whisper_content?: string
          whisper_type?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_diary_entry: {
        Args: {
          p_user_hash: string
          p_content: string
          p_type?: string
          p_emotional_context?: string
          p_is_ephemeral?: boolean
        }
        Returns: string
      }
      trigger_chaos_event: {
        Args: { p_user_hash: string; p_event_type: string; p_event_data?: Json }
        Returns: string
      }
      update_cult_stat: {
        Args: { stat_name: string; new_value: number }
        Returns: undefined
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
