
import { unlockTestamentByPhrase as originalUnlockByPhrase,
         getTestamentTeaser as originalGetTeaser,
         generateTestamentResponse as originalGenerateResponse } from '@/utils/jonahAdvancedBehavior';

// Re-export functions to maintain API compatibility
export const unlockTestamentByPhrase = originalUnlockByPhrase;
export const getTestamentTeaser = originalGetTeaser;
export const generateTestamentResponse = originalGenerateResponse;
