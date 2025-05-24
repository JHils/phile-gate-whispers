
import { useState, useCallback, useRef } from 'react';
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
  
  // Patch 1: Typing throttle refs
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastTypingStateRef = useRef<boolean>(false);
  
  // Patch 3: Emotional recalculation cooldown
  const emotionalCooldownRef = useRef<NodeJS.Timeout | null>(null);
  const isEmotionalProcessingRef = useRef<boolean>(false);
  
  // Patch 1: Throttled typing setter
  const setTypingThrottled = useCallback((isTyping: boolean) => {
    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    
    // If we're already in the same state, don't flicker
    if (lastTypingStateRef.current === isTyping) {
      return;
    }
    
    // Set a small delay to prevent rapid flickering
    typingTimeoutRef.current = setTimeout(() => {
      setTyping(isTyping);
      lastTypingStateRef.current = isTyping;
    }, 100);
  }, [setTyping]);
  
  // Process user input
  const handleSendMessage = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Patch 3: Check if emotional processing is in cooldown
    if (isEmotionalProcessingRef.current) {
      return; // Prevent spam processing
    }
    
    isEmotionalProcessingRef.current = true;
    
    // Add user message to chat
    addUserMessage(input);
    
    // Analyze emotional content of user input
    const emotionalState = analyzeEmotion(input);
    
    // Update conversation context with user message
    updateContext(input, emotionalState.primary, true);
    
    // Clear input and show typing indicator with throttling
    setInput('');
    setTypingThrottled(true);
    
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
      // Standard emotional response - FIXED to handle structured response
      else {
        const fullEmotionalState: EmotionalState = createEmotionalState(
          emotionalState.primary,
          emotionalState.secondary,
          'medium'
        );
        
        // Get structured response from generateFullEmotionalResponse
        const { text, trustChange, memoryTriggered } = generateFullEmotionalResponse(
          fullEmotionalState, 
          'medium', 
          true, 
          memoryFragments
        );
        
        // Process the response text
        processJonahResponse(text, emotionalState.primary);
        
        // Handle trust changes if any
        if (trustChange !== 0) {
          // This would integrate with the trust system
          console.log(`Trust changed by: ${trustChange}`);
        }
        
        // Handle memory triggers if any
        if (memoryTriggered) {
          console.log('Memory was triggered in response');
        }
      }
      
      // Patch 3: Release emotional processing lock after response
      setTimeout(() => {
        isEmotionalProcessingRef.current = false;
      }, 500);
      
    }, 1000 + Math.floor(Math.random() * 1000)); // Random typing delay
  }, [input, context, addUserMessage, setTypingThrottled, updateContext]);
  
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
    
    // Turn off typing indicator with throttling
    setTypingThrottled(false);
  }, [addJonahResponse, updateContext, updateMoodAndTrend, updateMessageFormatting, setTypingThrottled]);
  
  // Toggle between Jonah versions
  const toggleVersion = useCallback(() => {
    setJonahVersion(prev => prev === 'PRIME' ? 'RESIDUE' : 'PRIME');
  }, []);
  
  // Reset conversation
  const resetConversation = useCallback(() => {
    resetMessages();
    resetContext();
    updateMoodAndTrend('neutral');
    
    // Clear any pending timeouts
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    if (emotionalCooldownRef.current) {
      clearTimeout(emotionalCooldownRef.current);
    }
    
    isEmotionalProcessingRef.current = false;
    lastTypingStateRef.current = false;
  }, [resetMessages, resetContext, updateMoodAndTrend]);
  
  // Simplified sendMessage function for external components
  const sendMessage = useCallback((content: string) => {
    if (!content.trim()) return;
    
    // Patch 3: Check cooldown for external messages too
    if (isEmotionalProcessingRef.current) {
      return;
    }
    
    isEmotionalProcessingRef.current = true;
    
    // Add user message to chat
    addUserMessage(content);
    
    // Analyze emotional content of user input
    const emotionalState = analyzeEmotion(content);
    
    // Update conversation context with user message
    updateContext(content, emotionalState.primary, true);
    
    // Show typing indicator with throttling
    setTypingThrottled(true);
    
    // Generate Jonah response with a delay
    setTimeout(() => {
      const fullEmotionalState: EmotionalState = createEmotionalState(
        emotionalState.primary, 
        emotionalState.secondary,
        'medium'
      );
      
      // Use structured response here too
      const { text } = generateFullEmotionalResponse(fullEmotionalState, 'medium', true, []);
      processJonahResponse(text, emotionalState.primary);
      
      // Release processing lock
      setTimeout(() => {
        isEmotionalProcessingRef.current = false;
      }, 500);
    }, 1200);
  }, [addUserMessage, updateContext, setTypingThrottled, processJonahResponse]);
  
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
