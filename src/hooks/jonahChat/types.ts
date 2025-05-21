
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

export interface JonahChatInterfaceProps {
  messages: ChatMessage[];
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  isTyping: boolean;
  jonahMood: EmotionCategory;
  emotionalTrend: EmotionalTrend;
  responseStyle: ResponseStyle;
  sendMessage: (content: string) => void;
  messageWeight: 'light' | 'medium' | 'heavy';
  resetConversation: () => void;
}
