
import { EmotionCategory, EmotionalTrend, ResponseStyle } from '@/utils/jonahAdvancedBehavior/types';

export interface ChatMessage {
  id: string;
  content: string;
  isJonah: boolean;
  timestamp: number;
}

export interface JonahContext {
  inputs: string[];
  emotions: EmotionCategory[];
  timestamp: number;
}
