
import { BotMessage } from "./types";

// Helper function to convert messages to BotMessages
export const convertToBotMessages = (messages: any[]): BotMessage[] => {
  return messages.map(msg => ({
    id: msg.id || `msg-${Date.now()}-${Math.random()}`,
    type: msg.sender === 'character' ? 'bot' : 'user',
    content: msg.text || msg.content || '',
    timestamp: msg.timestamp || Date.now(),
    special: msg.special || false
  }));
};
