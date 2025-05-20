
import { v4 as uuidv4 } from 'uuid';
import { splitAndTypeMessage } from '../useTypingSimulator';
import { applyTypingQuirks } from '@/utils/jonahAdvancedBehavior';

export function useMessageTypingEffects(
  setMessages: React.Dispatch<React.SetStateAction<any[]>>,
  setIsTyping: React.Dispatch<React.SetStateAction<boolean>>
) {
  // Add a bot message with enhanced typing effects
  const addBotMessage = (content: string, special = false) => {
    // Track the message in the bot history
    const trackMessage = (messageContent: string) => {
      // Apply typing quirks to the message for display
      const quirkContent = applyTypingQuirks(messageContent, 'minimal');
      
      const newMessage = {
        id: uuidv4(),
        type: 'bot',
        content: quirkContent,
        timestamp: Date.now(),
        special
      };

      setMessages((prevMessages) => [
        ...prevMessages,
        newMessage
      ]);

      // Update Jonah sentience if available
      if (window.JonahConsole?.sentience?.sessionData) {
        window.JonahConsole.sentience.sessionData.messagesReceived = 
          (window.JonahConsole.sentience.sessionData.messagesReceived || 0) + 1;
      }

      return newMessage;
    };

    // Use advanced typing simulation
    splitAndTypeMessage(
      content,
      trackMessage,
      setIsTyping,
      { quirks: true, splitChance: 0.4 }
    );
  };

  return {
    addBotMessage
  };
}
