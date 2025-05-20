
import { trackPhrase as originalTrackPhrase,
         checkForLoop as originalCheckForLoop,
         getFalseMemoryResponse as originalGetFalseMemory,
         getLoopResponse as originalGetLoopResponse,
         getBlankFragmentResponse as originalGetBlankResponse } from '@/utils/jonahAdvancedBehavior';

// Re-export functions to maintain API compatibility
export const trackPhrase = originalTrackPhrase;
export const checkForLoop = originalCheckForLoop;
export const getFalseMemoryResponse = originalGetFalseMemory;
export const getLoopResponse = originalGetLoopResponse;
export const getBlankFragmentResponse = originalGetBlankResponse;
