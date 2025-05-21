
import { useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { analyzeEmotion } from '@/utils/jonahAdvancedBehavior/enhancedEmotionalCore';
import { 
  createConversationContext, 
  storeInMemory,
  findRelevantMemories,
  updateDominantEmotion
} from '@/utils/jonahAdvancedBehavior/enhancedMemorySystem';
import { EmotionCategory, EmotionalTrend, ResponseStyle } from '@/utils/jonahAdvancedBehavior/types';

// Interface for chat messages
interface ChatMessage {
  id: string;
  content: string;
  isJonah: boolean;
  timestamp: number;
}

// Initialize conversation context
const initialContext = createConversationContext('medium');

export function useJonahChat() {
  // State for managing chat
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  
  // Enhanced state for Jonah's personality
  const [jonahMood, setJonahMood] = useState<EmotionCategory>('neutral');
  const [jonahVersion, setJonahVersion] = useState<'PRIME' | 'RESIDUE'>('PRIME');
  const [messageWeight, setMessageWeight] = useState<'light' | 'medium' | 'heavy'>('medium');
  const [conversationDepth, setConversationDepth] = useState<number>(0);
  const [emotionalTrend, setEmotionalTrend] = useState<EmotionalTrend>('stable');
  const [responseStyle, setResponseStyle] = useState<ResponseStyle>('direct');
  
  // Track conversation context
  const [context, setContext] = useState(initialContext);
  const [previousMoods, setPreviousMoods] = useState<EmotionCategory[]>([]);
  
  // Process user input
  const handleSendMessage = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message to chat
    const userMessage: ChatMessage = {
      id: uuidv4(),
      content: input,
      isJonah: false,
      timestamp: Date.now()
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Analyze emotional content of user input
    const emotionalState = analyzeEmotion(input);
    
    // Update conversation context with user message
    const updatedContext = storeInMemory(input, emotionalState.primary, true, context);
    setContext(updatedContext);
    
    // Clear input and show typing indicator
    setInput('');
    setIsTyping(true);
    
    // Update conversation depth
    setConversationDepth(prev => prev + 1);
    
    // Generate Jonah response
    setTimeout(() => {
      // Find relevant memories
      const relevantMemories = findRelevantMemories(input, updatedContext);
      
      // Generate response based on input and context
      import('@/utils/jonahAdvancedBehavior/enhancedEmotionalCore').then(({ generateFullEmotionalResponse }) => {
        let response = '';
        
        // Memory-based response if relevant memories found
        if (relevantMemories.length > 0 && Math.random() < 0.4) {
          import('@/utils/jonahAdvancedBehavior/enhancedMemorySystem').then(({ generateMemoryBasedResponse }) => {
            response = generateMemoryBasedResponse(relevantMemories[0], 'medium');
            addJonahResponse(response, emotionalState.primary);
          });
        } 
        // Error recovery if needed
        else if (input.length < 5) {
          import('@/utils/jonahAdvancedBehavior/errorRecoverySystem').then(({ createErrorRecoveryResponse }) => {
            response = createErrorRecoveryResponse(input, 'medium', emotionalState.primary);
            addJonahResponse(response, emotionalState.primary);
          });
        }
        // Standard emotional response
        else {
          response = generateFullEmotionalResponse(emotionalState, 'medium', true, []);
          addJonahResponse(response, emotionalState.primary);
        }
      });
    }, 1000 + Math.floor(Math.random() * 1000)); // Random typing delay
  }, [input, context]);
  
  // Add Jonah's response to chat
  const addJonahResponse = useCallback((content: string, mood: EmotionCategory) => {
    // Create message
    const jonahMessage: ChatMessage = {
      id: uuidv4(),
      content,
      isJonah: true,
      timestamp: Date.now()
    };
    
    // Add to chat
    setMessages(prev => [...prev, jonahMessage]);
    setIsTyping(false);
    
    // Update conversation context with Jonah's response
    setContext(prev => storeInMemory(content, mood, false, prev));
    
    // Update Jonah's mood based on user input and pattern
    setJonahMood(mood);
    
    // Update previous moods for trend analysis
    setPreviousMoods(prev => {
      const updatedMoods = [mood, ...prev].slice(0, 5);
      
      // Calculate trend based on mood changes
      if (updatedMoods.length >= 3) {
        const positiveEmotions = ['joy', 'hope', 'trust'];
        const negativeEmotions = ['fear', 'sadness', 'anger', 'anxiety', 'paranoia'];
        
        // Count positive and negative emotions in recent history
        const positiveCount = updatedMoods.filter(m => positiveEmotions.includes(m)).length;
        const negativeCount = updatedMoods.filter(m => negativeEmotions.includes(m)).length;
        
        if (positiveCount > negativeCount) {
          setEmotionalTrend('improving');
        } else if (negativeCount > positiveCount) {
          setEmotionalTrend('deteriorating');
        } else {
          setEmotionalTrend('stable');
        }
      }
      
      return updatedMoods;
    });
    
    // Determine message weight based on content length
    if (content.length < 50) {
      setMessageWeight('light');
    } else if (content.length > 200) {
      setMessageWeight('heavy');
    } else {
      setMessageWeight('medium');
    }
    
    // Infer response style preference
    if (content.includes('?')) {
      setResponseStyle('direct');
    } else if (content.includes('\n') && content.length > 100) {
      setResponseStyle('elaborate');
    } else if ((mood === 'joy' || mood === 'sadness') && Math.random() < 0.7) {
      setResponseStyle('poetic');
    } else {
      setResponseStyle('natural');
    }
  }, []);
  
  // Toggle between Jonah versions
  const toggleVersion = useCallback(() => {
    setJonahVersion(prev => prev === 'PRIME' ? 'RESIDUE' : 'PRIME');
  }, []);
  
  // Reset conversation
  const resetConversation = useCallback(() => {
    setMessages([]);
    setContext(createConversationContext('medium'));
    setPreviousMoods([]);
    setJonahMood('neutral');
    setConversationDepth(0);
    setEmotionalTrend('stable');
  }, []);
  
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
