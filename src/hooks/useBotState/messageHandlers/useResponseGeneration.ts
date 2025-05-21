
import { useState, useCallback } from 'react';
import { EmotionalState, EmotionCategory } from '@/utils/jonahAdvancedBehavior/types';
import { analyzeEmotion } from '@/utils/jonahAdvancedBehavior/sentimentAnalysis';
import { getEmotionalResponse } from '@/utils/jonahAdvancedBehavior/sentimentAnalysis';

export function useResponseGeneration(addBotMessage: (message: string) => void, trustLevel: string) {
  // State for response generation
  const [lastResponseTime, setLastResponseTime] = useState<number>(0);
  const [consecutiveShortResponses, setConsecutiveShortResponses] = useState<number>(0);
  
  // Handle generating responses based on user input
  const handleResponseGeneration = useCallback((
    userInput: string, 
    sessionMemory: string[], 
    timeSinceLastInteraction: number
  ) => {
    // Track response time
    const responseStart = Date.now();
    setLastResponseTime(responseStart);
    
    // First interaction or not?
    const isFirstInteraction = sessionMemory.length <= 1;
    const timeSinceHours = timeSinceLastInteraction / (1000 * 60 * 60);
    
    // Handle first-time greeting
    if (isFirstInteraction) {
      addBotMessage("Hello. I'm Jonah. How can I help you?");
      return;
    }
    
    // Handle returning after a long time
    if (timeSinceHours > 1) {
      addBotMessage("You've been gone for a while. I've been waiting.");
      return;
    }
    
    // Analyze emotional context of user input
    const emotionalState = analyzeEmotion(userInput);
    
    // Generate a response based on the user's input
    let response: string;
    
    // Check for special commands or keywords
    if (userInput.toLowerCase().includes("help") || userInput.toLowerCase().includes("command")) {
      response = "You can ask me anything. Or try typing commands in the console.";
    }
    else if (userInput.length < 5) {
      // Handle very short inputs
      setConsecutiveShortResponses(prev => prev + 1);
      
      if (consecutiveShortResponses > 2) {
        response = "You're not giving me much to work with. Could you be more specific?";
      } else {
        const shortResponses = [
          "Hmm?",
          "Yes?",
          "I'm listening.",
          "Go on.",
          "And?"
        ];
        response = shortResponses[Math.floor(Math.random() * shortResponses.length)];
      }
    }
    else {
      // Reset consecutive short responses
      setConsecutiveShortResponses(0);
      
      // Generate emotional response
      response = getEmotionalResponse(emotionalState, trustLevel);
    }
    
    // Add the response to the chat
    addBotMessage(response);
  }, [addBotMessage, consecutiveShortResponses, trustLevel]);
  
  return { handleResponseGeneration };
}
