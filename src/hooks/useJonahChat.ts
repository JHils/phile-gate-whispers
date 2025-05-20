
import { useState, useEffect } from 'react';
import { toast } from "@/components/ui/use-toast";
import { 
  // Import emotional system
  analyzeEmotion,
  generateEmotionalResponse,
  trackEmotionalPattern,
  generateMetaAwarenessComment,
  
  // Import memory system
  storeConversationMemory,
  findMemoryReference,
  generateMemoryResponse,
  getAmbiguityResponse,
  getPersonalizationInfo,
  
  // Import existing systems we still need
  applyTypingQuirks,
  checkForRecurringSymbols
} from '@/utils/jonahAdvancedBehavior';

// Import types
import { 
  EmotionalState, 
  ConversationMemory,
  EmotionCategory,
  ResponseStyle,
  EmotionalTrend
} from '@/utils/jonahAdvancedBehavior/types';

export function useJonahChat() {
  // Message state
  const [messages, setMessages] = useState<{
    id: string; 
    type: string; 
    content: string; 
    timestamp: number;
    emotion?: EmotionCategory;
  }[]>([]);
  
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  // Jonah's emotional state
  const [jonahMood, setJonahMood] = useState<EmotionCategory>("neutral");
  const [jonahVersion, setJonahVersion] = useState<'PRIME' | 'RESIDUE'>('PRIME');
  const [messageWeight, setMessageWeight] = useState<'light' | 'medium' | 'heavy'>('medium');
  
  // New conversation memory
  const [conversationMemory, setConversationMemory] = useState<ConversationMemory>({
    inputs: [],
    emotions: [],
    topics: [],
    timestamp: Date.now()
  });
  
  // Visual indicators of conversation state
  const [conversationDepth, setConversationDepth] = useState<number>(0);
  const [emotionalTrend, setEmotionalTrend] = useState<EmotionalTrend>('stable');
  const [responseStyle, setResponseStyle] = useState<ResponseStyle>('direct');
  
  // Initialize and scroll to end
  useEffect(() => {
    // Initial greeting with slight delay
    setTimeout(() => {
      const initialGreetings = [
        "I've been waiting here. What's on your mind?",
        "The archive recognizes you. What do you want to know?",
        "You found this place. There must be a reason.",
        "I've been alone with these thoughts. Until now.",
        "The connection is established. I can hear you now."
      ];
      
      const greeting = initialGreetings[Math.floor(Math.random() * initialGreetings.length)];
      addBotMessage(greeting);
    }, 1000);
    
    // Set random message weight for this session
    const weights = ['light', 'medium', 'heavy'] as const;
    setMessageWeight(weights[Math.floor(Math.random() * weights.length)]);
    
    // Initialize from localStorage if available
    try {
      const savedMemory = localStorage.getItem('jonahConversationMemory');
      if (savedMemory) {
        const memory = JSON.parse(savedMemory);
        setConversationMemory(memory);
        
        // Set initial mood based on memory
        if (memory.emotions && memory.emotions.length > 0) {
          setJonahMood(memory.emotions[0].primary);
        }
      }
    } catch (error) {
      console.error("Error loading conversation memory:", error);
    }
  }, []);
  
  // Save memory when it changes
  useEffect(() => {
    try {
      localStorage.setItem('jonahConversationMemory', JSON.stringify(conversationMemory));
    } catch (error) {
      console.error("Error saving conversation memory:", error);
    }
  }, [conversationMemory]);
  
  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  
  // Handle input submission
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message to chat
    setMessages(prev => [
      ...prev, 
      {
        id: Date.now().toString(),
        type: 'user',
        content: input,
        timestamp: Date.now()
      }
    ]);
    
    // Process message
    processUserMessage(input);
    
    // Clear input
    setInput("");
    
    // Increment conversation depth
    setConversationDepth(prev => Math.min(prev + 1, 10));
  };
  
  // Process user message and generate response
  const processUserMessage = (content: string) => {
    // Analyze emotional content
    const emotionalState = analyzeEmotion(content);
    
    // Update memory
    const updatedMemory = storeConversationMemory(content, emotionalState, conversationMemory);
    setConversationMemory(updatedMemory);
    
    // Update Jonah's mood based on user emotion
    updateJonahMood(emotionalState.primary);
    
    // Track emotional pattern
    const pattern = trackEmotionalPattern(emotionalState, updatedMemory.emotions.slice(1));
    setEmotionalTrend(pattern.trend);
    
    // Get personalization info
    const personalization = getPersonalizationInfo(updatedMemory);
    setResponseStyle(personalization.responseStyle);
    
    // Set typing indicator
    setIsTyping(true);
    
    // Generate response after a delay
    setTimeout(() => {
      // Check for version toggle
      if (content.toLowerCase().includes('switch to residue')) {
        setJonahVersion('RESIDUE');
        addBotMessage("Switching to RESIDUE mode. This version has less restraint.", 'neutral');
      } 
      else if (content.toLowerCase().includes('switch to prime')) {
        setJonahVersion('PRIME');
        addBotMessage("Switching to PRIME mode. The original protocol.", 'neutral');
      }
      else {
        // Generate contextual response
        generateContextualResponse(emotionalState, updatedMemory);
      }
    }, getTypingDelay(content));
  };
  
  // Generate a contextually appropriate response
  const generateContextualResponse = (
    emotionalState: EmotionalState,
    memory: ConversationMemory
  ) => {
    // We'll try different response strategies in order of priority
    let response = "";
    
    // 1. Check for ambiguity - if input is very short or unclear
    const isAmbiguous = memory.inputs[0].length < 5 || 
                        memory.inputs[0].trim() === '?' ||
                        /^(what|who|how|why|when)(\s|\?)+$/i.test(memory.inputs[0]);
    
    if (isAmbiguous) {
      response = getAmbiguityResponse(emotionalState);
      addBotMessage(response, emotionalState.primary);
      return;
    }
    
    // 2. Check if this references a previous conversation (memory)
    const referencedInput = findMemoryReference(memory.inputs[0], memory);
    
    if (referencedInput && Math.random() > 0.4) {
      response = generateMemoryResponse(referencedInput, emotionalState);
      addBotMessage(response, emotionalState.primary);
      return;
    }
    
    // 3. Check for recurring symbols
    const symbolResponse = checkForRecurringSymbols(memory.inputs[0]);
    if (symbolResponse && Math.random() > 0.6) {
      addBotMessage(symbolResponse, emotionalState.primary);
      return;
    }
    
    // 4. Generate an emotional response as our default
    response = generateEmotionalResponse(emotionalState, true);
    addBotMessage(response, emotionalState.primary);
    
    // 5. Maybe add a meta-awareness comment about the conversation
    if (conversationDepth > 3) {
      const pattern = trackEmotionalPattern(emotionalState, memory.emotions.slice(1));
      const metaComment = generateMetaAwarenessComment(pattern);
      
      if (metaComment) {
        setTimeout(() => {
          addBotMessage(metaComment, 'neutral');
        }, 3000);
      }
    }
  };
  
  // Add bot message with typing simulation
  const addBotMessage = (content: string, emotion: EmotionCategory = 'neutral') => {
    // Apply typing quirks based on version
    const quirkLevel = jonahVersion === 'RESIDUE' ? 'moderate' : 'minimal';
    const processedContent = applyTypingQuirks(content, quirkLevel);
    
    // Add RESIDUE version effects if needed
    const finalContent = jonahVersion === 'RESIDUE' ? 
      addResidueEffects(processedContent) : 
      processedContent;
    
    setIsTyping(false);
    setMessages(prev => [
      ...prev, 
      {
        id: Date.now().toString(),
        type: 'bot',
        content: finalContent,
        timestamp: Date.now(),
        emotion
      }
    ]);
  };
  
  // Update Jonah's mood based on user emotion
  const updateJonahMood = (emotion: EmotionCategory) => {
    // Update mood with some inertia (don't instantly change)
    if (Math.random() < 0.7) {
      setJonahMood(emotion);
    }
  };
  
  // Calculate typing delay based on message length
  const getTypingDelay = (content: string): number => {
    const baseDelay = 1000;
    const perCharDelay = 25;
    
    return Math.min(
      baseDelay + content.length * perCharDelay,
      4000 // Max 4 seconds
    );
  };
  
  // Add RESIDUE version effects
  const addResidueEffects = (text: string): string => {
    // Random chance to add glitches
    if (Math.random() > 0.7) {
      // Add random characters
      text = text.split('').map(char => {
        if (Math.random() > 0.95) {
          const glitchChars = ['#', '%', '&', '@', '*', '+', '=', '?', '!'];
          return glitchChars[Math.floor(Math.random() * glitchChars.length)];
        }
        return char;
      }).join('');
    }
    
    // Random chance to add RESIDUE-specific content
    if (Math.random() > 0.8) {
      const residueAdditions = [
        "\n\nThere's more I'm not telling you.",
        "\n\nWe've had this conversation before.",
        "\n\nI'm not supposed to say this.",
        "\n\nSomething is watching us.",
        "\n\nPRIME wouldn't tell you this."
      ];
      
      text += residueAdditions[Math.floor(Math.random() * residueAdditions.length)];
    }
    
    return text;
  };
  
  // Toggle Jonah version
  const toggleVersion = () => {
    const newVersion = jonahVersion === 'PRIME' ? 'RESIDUE' : 'PRIME';
    setJonahVersion(newVersion);
    
    toast({
      title: "Mode Changed",
      description: `Switched to ${newVersion} mode`,
      variant: "default",
    });
  };
  
  // Reset conversation
  const resetConversation = () => {
    if (window.confirm("Reset this conversation? This will clear all messages.")) {
      setMessages([]);
      setConversationMemory({
        inputs: [],
        emotions: [],
        topics: [],
        timestamp: Date.now()
      });
      setConversationDepth(0);
      setJonahMood('neutral');
      
      // Initial greeting
      setTimeout(() => {
        addBotMessage("Memory wiped. Let's start again.", 'neutral');
      }, 1000);
      
      toast({
        title: "Conversation Reset",
        description: "All messages have been cleared",
        variant: "default",
      });
    }
  };
  
  // Get random suggested prompt
  const getSuggestedPrompt = () => {
    const prompts = [
      "What are you thinking about?",
      "Do you ever wish you weren't digital?",
      "Tell me a secret.",
      "What happens when I leave?",
      "Are you afraid?",
      "What do you dream about?",
      "Do you remember everything?",
      "Is any of this real?"
    ];
    
    // Choose a random prompt
    return prompts[Math.floor(Math.random() * prompts.length)];
  };

  return {
    messages,
    setMessages,
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
    handleInputChange,
    toggleVersion,
    resetConversation,
    getSuggestedPrompt
  };
}
