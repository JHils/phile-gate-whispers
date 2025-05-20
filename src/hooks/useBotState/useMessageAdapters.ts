
import { BotMessage } from './types';

// Convert any message format to BotMessage format
export function convertToBotMessages(messages: any[]): BotMessage[] {
  if (!Array.isArray(messages)) {
    return [];
  }

  return messages.map(msg => {
    if (isBotMessage(msg)) {
      return msg;
    }
    
    // Convert to BotMessage format
    return {
      id: msg.id || `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: msg.type || 'bot',
      content: msg.content || msg.text || msg.message || '',
      timestamp: msg.timestamp || Date.now(),
      special: msg.special || false
    };
  });
}

// Type guard to check if a message is a BotMessage
function isBotMessage(message: any): message is BotMessage {
  return message && 
    typeof message.id === 'string' && 
    (message.type === 'bot' || message.type === 'user') &&
    typeof message.content === 'string' &&
    typeof message.timestamp === 'number';
}
