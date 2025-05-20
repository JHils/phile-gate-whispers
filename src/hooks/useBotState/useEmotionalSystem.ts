
import { EmotionalState } from '@/utils/jonahAdvancedBehavior/types';
import { processEmotionalInput as originalProcessInput, 
         getLayeredEmotionalResponse as originalLayeredResponse, 
         checkForRecurringSymbols as originalCheckSymbols } from '@/utils/jonahAdvancedBehavior';

// Re-export functions to maintain API compatibility
export const processEmotionalInput = originalProcessInput;
export const getLayeredEmotionalResponse = originalLayeredResponse;
export const checkForRecurringSymbols = originalCheckSymbols;
