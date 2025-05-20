
import { detectEmotionalIntent as originalDetectIntent,
         getUnsaidEmotionResponse as originalGetUnsaidResponse,
         storeIntention as originalStoreIntention,
         getFalseMemory as originalGetFalseMemory } from '@/utils/jonahAdvancedBehavior';

// Re-export functions to maintain API compatibility
export const detectEmotionalIntent = originalDetectIntent;
export const getUnsaidEmotionResponse = originalGetUnsaidResponse;
export const storeIntention = originalStoreIntention;
export const getFalseMemory = originalGetFalseMemory;
