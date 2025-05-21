
/**
 * Memory Processor - Handles response generation with memory context
 */

import { EmotionalState } from '../types';
import { MemoryContext } from './memoryContext';
import { 
  generatePrimeResponse, 
  generateResidueResponse, 
  generateStaticResponse, 
  generateWitnessResponse 
} from './personalityResponses';

/**
 * Process memory context to generate mood-influenced response
 */
export function generateResponseWithMemory(
  userInput: string,
  memoryContext: MemoryContext,
  emotionalState: EmotionalState
): string {
  // Determine response style based on personality
  const personality = memoryContext.personality || 'PRIME';
  
  // Apply different response styles based on personality
  switch (personality) {
    case 'PRIME':
      return generatePrimeResponse(userInput, emotionalState, memoryContext);
    case 'RESIDUE':
      return generateResidueResponse(userInput, emotionalState, memoryContext);
    case 'STATIC':
      return generateStaticResponse(userInput, emotionalState, memoryContext);
    case 'WITNESS':
      return generateWitnessResponse(userInput, emotionalState, memoryContext);
    default:
      return generatePrimeResponse(userInput, emotionalState, memoryContext);
  }
}
