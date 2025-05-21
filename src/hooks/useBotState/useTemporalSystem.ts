
import { 
  trackPhrase, 
  getFalseMemoryResponse,
  getLoopResponse,
  getBlankFragmentResponse
} from '@/utils/jonahAdvancedBehavior';

// Define local implementation for checkForLoop
const checkForLoop = (input: string) => {
  // Simple implementation for now
  return { isLoop: false, count: 0 };
};

// Re-export functions to maintain API compatibility
export {
  trackPhrase,
  checkForLoop,
  getFalseMemoryResponse,
  getLoopResponse,
  getBlankFragmentResponse
};
