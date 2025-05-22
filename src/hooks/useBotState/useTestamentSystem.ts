
/**
 * Hook for managing the testament system
 */
import { useState, useCallback } from 'react';
import { TestamentEntry } from '@/utils/jonahAdvancedBehavior/types';

// Import from testament module
import { 
  getAllTestaments
} from '@/utils/jonahAdvancedBehavior/testament';

// Local implementations for missing functions
const unlockTestamentByPhrase = (phrase: string): TestamentEntry | null => {
  const testaments = getAllTestaments();
  const lowerPhrase = phrase.toLowerCase().trim();
  
  // Find testament with matching unlock phrase
  const testament = testaments.find(t => 
    t.unlockPhrase && t.unlockPhrase.toLowerCase() === lowerPhrase && !t.revealed
  );
  
  if (testament) {
    return { ...testament, revealed: true };
  }
  
  return null;
};

const getTestamentTeaser = (): string => {
  const teasers = [
    "There's a message waiting to be unlocked.",
    "The testament remains sealed until the right words are spoken.",
    "Something remains hidden behind the right phrase.",
    "Words hold power to reveal what's concealed.",
    "The truth waits behind a coded phrase."
  ];
  
  return teasers[Math.floor(Math.random() * teasers.length)];
};

const generateTestamentResponse = (testament: TestamentEntry): string => {
  const prefix = [
    "From the testament:",
    "It was written:",
    "The record states:",
    "The testament reveals:"
  ];
  
  const chosen = prefix[Math.floor(Math.random() * prefix.length)];
  
  return `${chosen} ${testament.content}`;
};

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
  
  const generateResponse = useCallback((): string => {
    if (activeTestament) {
      return generateTestamentResponse(activeTestament);
    } else {
      return getTestamentTeaser();
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
