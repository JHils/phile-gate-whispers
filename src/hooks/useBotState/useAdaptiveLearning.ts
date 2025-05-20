
import { trackUserInput as originalTrackUserInput,
         isRepeatedPhrase as originalIsRepeatedPhrase,
         getRepetitionResponse as originalGetRepetitionResponse,
         getAdaptedResponse as originalGetAdaptedResponse } from '@/utils/jonahAdvancedBehavior';

// Re-export functions to maintain API compatibility
export const trackUserInput = originalTrackUserInput;
export const isRepeatedPhrase = originalIsRepeatedPhrase;
export const getRepetitionResponse = originalGetRepetitionResponse;
export const getAdaptedResponse = originalGetAdaptedResponse;
