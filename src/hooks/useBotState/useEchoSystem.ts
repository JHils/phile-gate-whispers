
import { storeEcho as originalStoreEcho,
         getEchoPhrase as originalGetEchoPhrase,
         checkForEchoMatch as originalCheckForMatch } from '@/utils/jonahAdvancedBehavior';

// Re-export functions to maintain API compatibility
export const storeEcho = originalStoreEcho;
export const getEchoPhrase = originalGetEchoPhrase;
export const checkForEchoMatch = originalCheckForMatch;
