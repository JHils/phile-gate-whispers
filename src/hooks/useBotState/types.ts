
export type BotMessage = {
  id: string;
  type: 'bot' | 'user';
  content: string;
  timestamp: number;
  special?: boolean;
};

export type BotMode = 'normal' | 'debug' | 'echo' | 'whisper';
export type TrustLevel = 'none' | 'low' | 'medium' | 'high';

export interface BotState {
  isOpen: boolean;
  isMinimized: boolean;
  messages: BotMessage[];
  input: string;
  mode: BotMode;
  isTyping: boolean;
  hasInteracted: boolean;
  iconVariant: 'default' | 'glitch' | 'error';
  glitchEffect: boolean;
  trustLevel: TrustLevel;
  trustScore: number;
}
