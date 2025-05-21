
/**
 * Memory Processor
 * Processes memory and generates responses based on memory context
 */

import { EmotionalState } from '../types';
import { MemoryContext } from './memoryContext';

// Generate response with memory
export function generateResponseWithMemory(
  input: string,
  memoryContext: MemoryContext,
  emotionalState: EmotionalState
): string {
  // Simple response that references memory context
  if (memoryContext.interactionCount === 0) {
    return "Hello. I don't think we've spoken before.";
  }
  
  if (memoryContext.interactionCount > 10) {
    return `We've spoken ${memoryContext.interactionCount} times now. I'm beginning to understand you better.`;
  }
  
  if (memoryContext.recentInputs.includes(input)) {
    return "You've said that before. I remember.";
  }
  
  // Default response
  return `I process your words through my memory. My current emotional state is ${emotionalState.primary}.`;
}
