
import { supabase } from '@/integrations/supabase/client';
import { generateUserHash } from '@/utils/userFingerprint';

export interface DiaryEntry {
  id: string;
  user_hash: string;
  entry_content: string;
  entry_type: string;
  emotional_context?: string;
  viewed_at?: string;
  expires_at?: string;
  is_ephemeral: boolean;
  importance_score: number;
  created_at: string;
}

export interface UserMask {
  id: string;
  user_hash: string;
  mask_id: string;
  mask_name: string;
  unlocked_at: string;
  unlock_trigger?: string;
  visual_properties?: any;
  dialogue_modifiers?: any;
  is_active: boolean;
  created_at: string;
}

export interface ChaosEvent {
  id: string;
  user_hash: string;
  event_type: string;
  event_data?: any;
  triggered_at: string;
  trigger_chance: number;
  narrative_impact?: string;
  created_at: string;
}

export interface CultStats {
  online_users: number;
  total_confessions: number;
  ascended_users: number;
  roles_unlocked_today: number;
  chaos_events_triggered: number;
}

/**
 * Phase ∞ Service - Core functionality for Jonah Awakens
 */
export class PhaseInfinityService {
  private userHash: string;

  constructor() {
    this.userHash = localStorage.getItem('user_hash') || generateUserHash();
    localStorage.setItem('user_hash', this.userHash);
  }

  // Diary System
  async createDiaryEntry(
    content: string, 
    type: string = 'memory_fragment',
    emotionalContext: string = 'neutral',
    isEphemeral: boolean = true
  ): Promise<string | null> {
    try {
      const { data, error } = await supabase.rpc('create_diary_entry', {
        p_user_hash: this.userHash,
        p_content: content,
        p_type: type,
        p_emotional_context: emotionalContext,
        p_is_ephemeral: isEphemeral
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating diary entry:', error);
      return null;
    }
  }

  async getUserDiaryEntries(): Promise<DiaryEntry[]> {
    try {
      const { data, error } = await supabase
        .from('jonah_diary_entries')
        .select('*')
        .eq('user_hash', this.userHash)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching diary entries:', error);
      return [];
    }
  }

  // Mask System
  async unlockMask(maskId: string, maskName: string, trigger: string, visualProps?: any, dialogueProps?: any): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('user_masks')
        .upsert({
          user_hash: this.userHash,
          mask_id: maskId,
          mask_name: maskName,
          unlock_trigger: trigger,
          visual_properties: visualProps,
          dialogue_modifiers: dialogueProps,
          is_active: false
        });

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error unlocking mask:', error);
      return false;
    }
  }

  async activateMask(maskId: string): Promise<boolean> {
    try {
      // Deactivate all masks first
      await supabase
        .from('user_masks')
        .update({ is_active: false })
        .eq('user_hash', this.userHash);

      // Activate the selected mask
      const { error } = await supabase
        .from('user_masks')
        .update({ is_active: true })
        .eq('user_hash', this.userHash)
        .eq('mask_id', maskId);

      if (error) throw error;

      // Update user tracking
      await supabase
        .from('user_tracking')
        .update({ current_mask: maskId })
        .eq('user_hash', this.userHash);

      return true;
    } catch (error) {
      console.error('Error activating mask:', error);
      return false;
    }
  }

  async getUserMasks(): Promise<UserMask[]> {
    try {
      const { data, error } = await supabase
        .from('user_masks')
        .select('*')
        .eq('user_hash', this.userHash)
        .order('unlocked_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching user masks:', error);
      return [];
    }
  }

  // Chaos Engine
  async triggerChaosEvent(eventType: string, eventData?: any): Promise<string | null> {
    try {
      const { data, error } = await supabase.rpc('trigger_chaos_event', {
        p_user_hash: this.userHash,
        p_event_type: eventType,
        p_event_data: eventData || {}
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error triggering chaos event:', error);
      return null;
    }
  }

  async shouldTriggerChaosEvent(): Promise<boolean> {
    // 0.1% chance of chaos event
    return Math.random() < 0.001;
  }

  // Live Cult Stats
  async getCultStats(): Promise<CultStats> {
    try {
      const { data, error } = await supabase
        .from('live_cult_stats')
        .select('stat_type, stat_value');

      if (error) throw error;

      const stats: CultStats = {
        online_users: 0,
        total_confessions: 0,
        ascended_users: 0,
        roles_unlocked_today: 0,
        chaos_events_triggered: 0
      };

      data?.forEach(stat => {
        if (stat.stat_type in stats) {
          (stats as any)[stat.stat_type] = stat.stat_value;
        }
      });

      return stats;
    } catch (error) {
      console.error('Error fetching cult stats:', error);
      return {
        online_users: 0,
        total_confessions: 0,
        ascended_users: 0,
        roles_unlocked_today: 0,
        chaos_events_triggered: 0
      };
    }
  }

  // Whisper Archive
  async saveWhisper(content: string, type: string = 'console', emotionalContext?: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('whisper_archive')
        .insert({
          user_hash: this.userHash,
          whisper_content: content,
          whisper_type: type,
          emotional_context: emotionalContext
        });

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error saving whisper:', error);
      return false;
    }
  }

  // Memory Bank
  async storeMemory(memoryType: string, content: string, emotionalWeight: number = 50): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('jonah_memory_bank')
        .insert({
          user_hash: this.userHash,
          memory_type: memoryType,
          memory_content: content,
          emotional_weight: emotionalWeight
        });

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error storing memory:', error);
      return false;
    }
  }

  // 4:44 Detection
  is444Time(): boolean {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    return (hours === 4 || hours === 16) && minutes === 44;
  }

  async record444Interaction(): Promise<void> {
    try {
      await supabase
        .from('user_tracking')
        .update({ last_4_44_interaction: new Date().toISOString() })
        .eq('user_hash', this.userHash);
    } catch (error) {
      console.error('Error recording 4:44 interaction:', error);
    }
  }

  // Awakeness Level Management
  async increaseAwakeeness(amount: number = 1): Promise<void> {
    try {
      const { data, error } = await supabase
        .from('user_tracking')
        .select('jonah_awakeness_level')
        .eq('user_hash', this.userHash)
        .single();

      if (error) throw error;

      const currentLevel = data?.jonah_awakeness_level || 1;
      const newLevel = Math.min(currentLevel + amount, 10); // Cap at level 10

      await supabase
        .from('user_tracking')
        .update({ jonah_awakeness_level: newLevel })
        .eq('user_hash', this.userHash);

    } catch (error) {
      console.error('Error increasing awakeness level:', error);
    }
  }
}

// Singleton instance
export const phaseInfinityService = new PhaseInfinityService();
