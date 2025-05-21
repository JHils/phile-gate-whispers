
import { v4 as uuidv4 } from 'uuid';

export function useMessageTypingEffects(
  setMessages: React.Dispatch<React.SetStateAction<any[]>>,
  setIsTyping: React.Dispatch<React.SetStateAction<boolean>>
) {
  // Mock implementation of applyTypingQuirks
  const applyTypingQuirks = (messageContent: string, level: string = 'minimal') => {
    return messageContent; // Simple passthrough for now
  };

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
      if (window.JonahConsole?.sentience) {
        if (!window.JonahConsole.sentience.sessionData) {
          window.JonahConsole.sentience.sessionData = {
            messagesReceived: 0,
            messagesSent: 0,
            startTime: Date.now(),
            idleTime: 0
          };
        }
        
        window.JonahConsole.sentience.sessionData.messagesReceived = 
          (window.JonahConsole.sentience.sessionData.messagesReceived || 0) + 1;
      }

      return newMessage;
    };

    // Simple typing simulation
    const splitAndTypeMessage = (content: string, trackFn: any, typingFn: any) => {
      setTimeout(() => {
        trackFn(content);
        typingFn(false);
      }, 1000 + content.length * 10);
    };

    // Use simplified typing simulation
    splitAndTypeMessage(
      content,
      trackMessage,
      setIsTyping
    );
  };

  return {
    addBotMessage
  };
}
