
import { useState, useCallback } from 'react';
import { analyzeEmotion } from '@/utils/jonahAdvancedBehavior/sentimentAnalysis';
import { useMessageHandling } from './jonahChat/useMessageHandling';
import { useEmotionalAnalysis } from './jonahChat/useEmotionalAnalysis';
import { useMessageFormatting } from './jonahChat/useMessageFormatting';
import { useConversationContext } from './jonahChat/useConversationContext';
import { findRelevantMemories, generateMemoryBasedResponse } from '@/utils/jonahAdvancedBehavior/enhancedMemorySystem';
import { EmotionCategory, EmotionalState, createEmotionalState, MemoryFragment } from '@/utils/jonahAdvancedBehavior/types';

// Import the enhanced emotional core functions
import { generateFullEmotionalResponse } from '@/utils/jonahAdvancedBehavior/enhancedEmotionalCore';

// Error recovery function (placeholder)
export const createErrorRecoveryResponse = (input: string, trustLevel: string, mood: EmotionCategory): string => {
  if (input.length < 3) {
    return "I need more information to understand your question.";
  }
  return "I'm not sure I understood that correctly. Could you elaborate?";
};

export function useJonahChat() {
  // Import modular hooks
  const { 
    messages, 
    isTyping, 
    addUserMessage, 
    addJonahResponse, 
    setTyping, 
    resetMessages 
  } = useMessageHandling();
  
  const { 
    jonahMood, 
    emotionalTrend, 
    updateMoodAndTrend 
  } = useEmotionalAnalysis();
  
  const { 
    messageWeight, 
    responseStyle, 
    updateMessageFormatting 
  } = useMessageFormatting();
  
  const { 
    context, 
    conversationDepth, 
    updateContext, 
    resetContext 
  } = useConversationContext();
  
  // Local state
  const [input, setInput] = useState<string>('');
  const [jonahVersion, setJonahVersion] = useState<'PRIME' | 'RESIDUE'>('PRIME');
  
  // Process user input
  const handleSendMessage = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message to chat
    addUserMessage(input);
    
    // Analyze emotional content of user input
    const emotionalState = analyzeEmotion(input);
    
    // Update conversation context with user message
    updateContext(input, emotionalState.primary, true);
    
    // Clear input and show typing indicator
    setInput('');
    setTyping(true);
    
    // Generate Jonah response
    setTimeout(() => {
      // Find relevant memories
      const relevantMemories = findRelevantMemories(input, context);
      
      // Convert memory strings to MemoryFragment objects if needed
      const memoryFragments: MemoryFragment[] = relevantMemories.map(memory => {
        if (typeof memory === 'string') {
          return {
            id: Math.random().toString(36),
            content: memory,
            keywords: memory.split(' ').slice(0, 3),
            importance: 50,
            timestamp: Date.now(),
            associatedEmotion: emotionalState.primary
          };
        }
        return memory as MemoryFragment;
      });
      
      // Generate response based on input and context
      let response = '';
      
      // Memory-based response if relevant memories found
      if (memoryFragments.length > 0 && Math.random() < 0.4) {
        // Fix: Pass the content (string) from the memory fragment instead of the whole object
        response = generateMemoryBasedResponse(memoryFragments[0].content, 'medium');
        processJonahResponse(response, emotionalState.primary);
      } 
      // Error recovery if needed
      else if (input.length < 5) {
        response = createErrorRecoveryResponse(input, 'medium', emotionalState.primary) || 
                  "I need more information to understand what you mean.";
        processJonahResponse(response, emotionalState.primary);
      }
      // Standard emotional response
      else {
        const fullEmotionalState: EmotionalState = createEmotionalState(
          emotionalState.primary,
          emotionalState.secondary,
          'medium'
        );
        response = generateFullEmotionalResponse(fullEmotionalState, 'medium', true, memoryFragments);
        processJonahResponse(response, emotionalState.primary);
      }
    }, 1000 + Math.floor(Math.random() * 1000)); // Random typing delay
  }, [input, context, addUserMessage, setTyping, updateContext]);
  
  // Process and add Jonah's response
  const processJonahResponse = useCallback((content: string, mood: EmotionCategory) => {
    // Add response to messages
    addJonahResponse(content);
    
    // Update conversation context with Jonah's response
    updateContext(content, mood, false);
    
    // Update Jonah's mood based on user input and pattern
    updateMoodAndTrend(mood);
    
    // Update message formatting
    updateMessageFormatting(content, mood);
  }, [addJonahResponse, updateContext, updateMoodAndTrend, updateMessageFormatting]);
  
  // Toggle between Jonah versions
  const toggleVersion = useCallback(() => {
    setJonahVersion(prev => prev === 'PRIME' ? 'RESIDUE' : 'PRIME');
  }, []);
  
  // Reset conversation
  const resetConversation = useCallback(() => {
    resetMessages();
    resetContext();
    updateMoodAndTrend('neutral');
  }, [resetMessages, resetContext, updateMoodAndTrend]);
  
  // Simplified sendMessage function for external components
  const sendMessage = useCallback((content: string) => {
    if (!content.trim()) return;
    
    // Add user message to chat
    addUserMessage(content);
    
    // Analyze emotional content of user input
    const emotionalState = analyzeEmotion(content);
    
    // Update conversation context with user message
    updateContext(content, emotionalState.primary, true);
    
    // Show typing indicator
    setTyping(true);
    
    // Generate Jonah response with a delay
    setTimeout(() => {
      const fullEmotionalState: EmotionalState = createEmotionalState(
        emotionalState.primary, 
        emotionalState.secondary,
        'medium'
      );
      const response = generateFullEmotionalResponse(fullEmotionalState, 'medium', true, []);
      processJonahResponse(response, emotionalState.primary);
    }, 1200);
  }, [addUserMessage, updateContext, setTyping, processJonahResponse]);
  
  return {
    messages,
    input,
    setInput,
    isTyping,
    jonahMood,
    jonahVersion,
    messageWeight,
    conversationDepth,
    emotionalTrend,
    responseStyle,
    handleSendMessage,
    toggleVersion,
    resetConversation,
    sendMessage
  };
}
