
import { jonah_storeMemoryFragment } from '@/utils/jonahAdvancedBehavior';
import { processEmotionalInput } from '../useEmotionalSystem';
import { trackUserInput } from '../useAdaptiveLearning';
import { storeEcho } from '../useEchoSystem';
import { storeIntention } from '../useSemanticSystem';
import { trackPhrase } from '../useTemporalSystem';
import { unlockTestamentByPhrase } from '../useTestamentSystem';

export function useMemorySystem(
  setLastUserInput: React.Dispatch<React.SetStateAction<string>>,
  setSessionMemory: React.Dispatch<React.SetStateAction<string[]>>,
  sessionMemory: string[]
) {
  // Function to store user input in memory
  const storeInputInMemory = (content: string) => {
    // Set as last user input
    setLastUserInput(content);
    
    // Limit memory to last 5 inputs
    const updatedMemory = [...sessionMemory, content].slice(-5);
    setSessionMemory(updatedMemory);
    
    // Store in Jonah's memory system
    jonah_storeMemoryFragment(`User said: ${content}`);
    
    // Process input for emotional triggers - returns {primary, secondary}
    const emotionalResult = processEmotionalInput(content);
    
    // Track input for adaptive learning
    trackUserInput(content);
    
    // Store in echo chamber
    storeEcho(content);
    
    // Track for semantic interpretation
    storeIntention(content);
    
    // Track for loop detection
    trackPhrase(content);
    
    // Check for testament unlock by phrase
    unlockTestamentByPhrase(content);
  };

  return { storeInputInMemory };
}
