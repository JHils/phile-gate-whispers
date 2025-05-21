import { useState, useCallback } from 'react';
import { analyzeEmotion } from '@/utils/jonahAdvancedBehavior/sentimentAnalysis';
import { useMessageHandling } from './jonahChat/useMessageHandling';
import { useEmotionalAnalysis } from './jonahChat/useEmotionalAnalysis';
import { useMessageFormatting } from './jonahChat/useMessageFormatting';
import { useConversationContext } from './jonahChat/useConversationContext';
import { findRelevantMemories } from '@/utils/jonahAdvancedBehavior/enhancedMemorySystem';
import { EmotionCategory } from '@/utils/jonahAdvancedBehavior/types';

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
      
      // Generate response based on input and context
      import('@/utils/jonahAdvancedBehavior/enhancedEmotionalCore').then(({ generateFullEmotionalResponse }) => {
        let response = '';
        
        // Memory-based response if relevant memories found
        if (relevantMemories.length > 0 && Math.random() < 0.4) {
          import('@/utils/jonahAdvancedBehavior/enhancedMemorySystem').then(({ generateMemoryBasedResponse }) => {
            response = generateMemoryBasedResponse(relevantMemories[0], 'medium');
            processJonahResponse(response, emotionalState.primary);
          });
        } 
        // Error recovery if needed
        else if (input.length < 5) {
          import('@/utils/jonahAdvancedBehavior/errorRecoverySystem').then(({ createErrorRecoveryResponse }) => {
            response = createErrorRecoveryResponse(input, 'medium', emotionalState.primary);
            processJonahResponse(response, emotionalState.primary);
          });
        }
        // Standard emotional response
        else {
          response = generateFullEmotionalResponse(emotionalState, 'medium', true, []);
          processJonahResponse(response, emotionalState.primary);
        }
      });
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
    resetConversation
  };
}
