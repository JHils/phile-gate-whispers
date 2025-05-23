
import { useState, useCallback, useEffect } from 'react';
import { EmotionalState, EmotionCategory } from '@/utils/jonahAdvancedBehavior/types';
import { analyzeEmotion } from '@/utils/jonahAdvancedBehavior/sentimentAnalysis';
import { 
  checkForTriggerPhrases,
  processEmotionalInput,
  generateGreeting
} from '@/utils/jonahAdvancedBehavior/sentimentAnalysis/analyzer';
import { modifyTrustLevel } from '@/utils/jonahAdvancedBehavior/trustSystem';

export function useResponseGeneration(addBotMessage: (message: string) => void, trustLevel: string) {
  // State for response generation
  const [lastResponseTime, setLastResponseTime] = useState<number>(0);
  const [consecutiveShortResponses, setConsecutiveShortResponses] = useState<number>(0);
  const [sessionMemory, setSessionMemory] = useState<string[]>([]);
  const [lastInteractionDate, setLastInteractionDate] = useState<Date | null>(null);
  const [hasGreeted, setHasGreeted] = useState<boolean>(false);
  
  // Load last interaction time on mount
  useEffect(() => {
    const lastDate = localStorage.getItem('jonahLastInteraction');
    if (lastDate) {
      try {
        setLastInteractionDate(new Date(lastDate));
      } catch (e) {
        console.error("Error parsing last interaction date:", e);
      }
    }
  }, []);
  
  // Handle generating responses based on user input
  const handleResponseGeneration = useCallback((
    userInput: string, 
    sessionHistory: string[], 
    timeSinceLastInteraction: number
  ) => {
    // Track response time
    const responseStart = Date.now();
    setLastResponseTime(responseStart);
    
    // Update memory for loop detection
    setSessionMemory(prev => [...prev, userInput]);
    
    // Save current interaction time
    const now = new Date();
    localStorage.setItem('jonahLastInteraction', now.toISOString());
    setLastInteractionDate(now);
    
    // Check if this is first interaction of session
    const isFirstInteraction = !hasGreeted;
    const timeSinceHours = timeSinceLastInteraction / (1000 * 60 * 60);
    
    // 4. DYNAMIC INTRO LINE + MOOD-BASED GREETING
    // Handle first-time greeting with dynamic intro
    if (isFirstInteraction) {
      // Generate dynamic greeting based on context
      const trustScore = parseInt(localStorage.getItem('jonahTrustScore') || '50');
      const currentMood = localStorage.getItem('jonah_emotion_primary') as EmotionCategory || 'neutral';
      const greeting = generateGreeting(trustScore, lastInteractionDate, currentMood);
      
      addBotMessage(greeting);
      setHasGreeted(true);
      return;
    }
    
    // Handle returning after a long time
    if (timeSinceHours > 1 && !hasGreeted) {
      const returnGreeting = "You've been gone for a while. I've been waiting.";
      addBotMessage(returnGreeting);
      setHasGreeted(true);
      return;
    }
    
    // Analyze emotional context of user input
    const emotionalState = analyzeEmotion(userInput);
    
    // 3. TRUST MODULATION ENGINE - Check for trust triggers
    const triggerResult = checkForTriggerPhrases(userInput);
    
    // Update trust level if triggered
    if (triggerResult.triggered && triggerResult.trustChange !== 0) {
      modifyTrustLevel(triggerResult.trustChange);
      // 5. CONSOLE ECHO & FLICKER LAYER
      if (triggerResult.trustChange > 0 && Math.random() < 0.3) {
        console.log("%cTrust increased. New patterns accessible.", "color: #8B3A40; font-style: italic;");
      }
    }
    
    // Process emotional input to get response
    const response = processEmotionalInput(userInput);
    
    // Handle very short inputs
    if (userInput.length < 5) {
      // Handle very short inputs
      setConsecutiveShortResponses(prev => prev + 1);
      
      if (consecutiveShortResponses > 2) {
        addBotMessage("You're not giving me much to work with. Could you be more specific?");
        return;
      } else {
        const shortResponses = [
          "Hmm?",
          "Yes?",
          "I'm listening.",
          "Go on.",
          "And?"
        ];
        addBotMessage(shortResponses[Math.floor(Math.random() * shortResponses.length)]);
        return;
      }
    }
    
    // Reset consecutive short responses
    setConsecutiveShortResponses(0);
    
    // 1. EMOTIONAL FLOW INJECTION - Generate final response with emotional tone
    addBotMessage(response);
    
  }, [
    addBotMessage, 
    consecutiveShortResponses, 
    trustLevel, 
    sessionMemory, 
    lastInteractionDate, 
    hasGreeted,
    setHasGreeted
  ]);
  
  return { handleResponseGeneration };
}
