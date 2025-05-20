
import { getResponseTemplate as originalGetTemplate, 
         generateEmotionalResponse as originalGenerateResponse } from '@/utils/jonahAdvancedBehavior';

// Re-export functions to maintain API compatibility
export const getResponseTemplate = originalGetTemplate;
export const generateEmotionalResponse = originalGenerateResponse;
