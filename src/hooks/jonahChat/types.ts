
/**
 * Type definitions for Jonah Chat
 */

export interface ChatMessage {
  id: string;
  content: string;
  isJonah: boolean;
  timestamp: number;
}

export interface JonahChatProps {
  messages: ChatMessage[];
  isTyping: boolean;
}
