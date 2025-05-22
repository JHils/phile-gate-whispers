
import { EmotionalState } from '@/utils/jonahAdvancedBehavior/types';
import { 
  analyzeEmotion,
  getLayeredEmotionalResponse,
  checkForRecurringSymbols 
} from '@/utils/jonahAdvancedBehavior/sentimentAnalysis/analyzer';

// Re-export the functions for API compatibility
export { 
  analyzeEmotion as processEmotionalInput,
  getLayeredEmotionalResponse,
  checkForRecurringSymbols 
};

// Hook to use the emotional system
export function useEmotionalSystem() {
  const analyzeEmotion = (input: string): EmotionalState => {
    return analyzeEmotion(input);
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
