
import { BotMessage } from '@/hooks/useBotState/types';
import { Message } from '@/types/chat';

/**
 * Converts Message to BotMessage
 */
export const convertMessageToBotMessage = (message: Message): BotMessage => {
  return {
    id: message.id,
    type: message.sender === 'user' ? 'user' : 'bot',
    content: message.text,
    timestamp: message.timestamp instanceof Date ? message.timestamp.getTime() : Date.now(),
  };
};

/**
 * Converts BotMessage to Message
 */
export const convertBotMessageToMessage = (botMessage: BotMessage): Message => {
  return {
    id: botMessage.id,
    sender: botMessage.type === 'user' ? 'user' : 'character',
    text: botMessage.content,
    timestamp: new Date(botMessage.timestamp),
  };
};

/**
 * Converts Message[] to BotMessage[]
 */
export const convertMessagesToBotMessages = (messages: Message[]): BotMessage[] => {
  return messages.map(convertMessageToBotMessage);
};

/**
 * Converts BotMessage[] to Message[]
 */
export const convertBotMessagesToMessages = (botMessages: BotMessage[]): Message[] => {
  return botMessages.map(convertBotMessageToMessage);
};
