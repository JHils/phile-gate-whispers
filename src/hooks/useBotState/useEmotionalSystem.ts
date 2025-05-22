
import { EmotionalState } from '@/utils/jonahAdvancedBehavior/types';
import { 
  analyzeEmotion as processEmotionalInput,
  getLayeredEmotionalResponse,
  checkForRecurringSymbols 
} from '@/utils/jonahAdvancedBehavior/sentimentAnalysis';

// Re-export the functions for API compatibility
export { 
  processEmotionalInput,
  getLayeredEmotionalResponse,
  checkForRecurringSymbols 
};

// Hook to use the emotional system
export function useEmotionalSystem() {
  const analyzeEmotion = (input: string): EmotionalState => {
    return processEmotionalInput(input);
  };
  
  const getResponse = (emotionalState: EmotionalState, trustLevel: string): string => {
    return getLayeredEmotionalResponse(emotionalState, trustLevel);
  };
  
  const checkSymbols = (input: string): string | null => {
    return checkForRecurringSymbols(input);
  };
  
  return {
    analyzeEmotion,
    getResponse,
    checkSymbols
  };
}
