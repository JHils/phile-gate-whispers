
import { useState, useCallback } from 'react';
import { EmotionCategory } from '@/utils/jonahAdvancedBehavior/types';
import { createConversationContext, storeInMemory } from '@/utils/jonahAdvancedBehavior/enhancedMemorySystem';

export function useConversationContext() {
  // Initialize conversation context
  const initialContext = createConversationContext('medium');
  const [context, setContext] = useState(initialContext);
  const [conversationDepth, setConversationDepth] = useState<number>(0);
  
  const updateContext = useCallback((input: string, mood: EmotionCategory, isUser: boolean) => {
    setContext(prev => storeInMemory(input, mood, isUser, prev));
    
    if (isUser) {
      setConversationDepth(prev => prev + 1);
    }
    
    return context;
  }, [context]);
  
  const resetContext = useCallback(() => {
    setContext(createConversationContext('medium'));
    setConversationDepth(0);
  }, []);
  
  return {
    context,
    conversationDepth,
    updateContext,
    resetContext
  };
}
