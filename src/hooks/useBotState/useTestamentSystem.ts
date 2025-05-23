
/**
 * Hook for managing the testament system
 */
import { useState, useCallback } from 'react';
import { TestamentEntry } from '@/utils/jonahAdvancedBehavior/types';

// Import from testament module
import { 
  getAllTestaments,
  unlockTestamentByPhrase,
  getTestamentTeaser,
  generateTestamentResponse
} from '@/utils/jonahAdvancedBehavior/testament';

export function useTestamentSystem() {
  const [activeTestament, setActiveTestament] = useState<TestamentEntry | null>(null);
  
  const checkPhraseForTestament = useCallback((phrase: string): boolean => {
    const testament = unlockTestamentByPhrase(phrase);
    
    if (testament) {
      setActiveTestament(testament);
      return true;
    }
    
    return false;
  }, []);
  
  const generateResponse = useCallback((input: string): string => {
    if (activeTestament) {
      return generateTestamentResponse(input);
    } else {
      return getTestamentTeaser("default");
    }
  }, [activeTestament]);
  
  const clearActiveTestament = useCallback(() => {
    setActiveTestament(null);
  }, []);
  
  return {
    activeTestament,
    checkPhraseForTestament,
    generateResponse,
    clearActiveTestament
  };
}
