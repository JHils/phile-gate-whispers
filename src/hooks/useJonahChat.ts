
import { useState, useEffect } from 'react';
import { useBotState } from './useBotState';
import { EmotionCategory, EmotionalTrend, ResponseStyle } from '@/utils/jonahAdvancedBehavior/types';

export function useJonahChat() {
  // Use the bot state
  const {
    messages,
    input,
    setInput,
    isTyping,
    handleSendMessage
  } = useBotState(true);
  
  // Jonah version state
  const [jonahVersion, setJonahVersion] = useState<'PRIME' | 'RESIDUE'>('PRIME');
  
  // Conversation metrics
  const [conversationDepth, setConversationDepth] = useState(0);
  const [messageWeight, setMessageWeight] = useState<'light' | 'medium' | 'heavy'>('medium');
  
  // Emotional state tracking
  const [jonahMood, setJonahMood] = useState<EmotionCategory>('neutral');
  const [emotionalTrend, setEmotionalTrend] = useState<EmotionalTrend>('stable');
  const [responseStyle, setResponseStyle] = useState<ResponseStyle>('direct');
  
  // Update conversation depth when messages change
  useEffect(() => {
    // Calculate conversation depth based on message count
    setConversationDepth(Math.min(10, Math.floor(messages.length / 2)));
    
    // Adjust message weight based on depth
    if (messages.length > 15) {
      setMessageWeight('heavy');
    } else if (messages.length > 7) {
      setMessageWeight('medium');
    } else {
      setMessageWeight('light');
    }
    
    // Get emotional data from Jonah's system if available
    if (window.JonahConsole?.sentience?.realityFabric) {
      const mood = window.JonahConsole.sentience.realityFabric.currentMood || 'neutral';
      setJonahMood(mood as EmotionCategory);
      
      // Determine emotional trend based on mood history
      const moodHistory = window.JonahConsole.sentience.realityFabric.moodHistory || [];
      if (moodHistory.length >= 3) {
        const recentMoods = moodHistory.slice(-3);
        // Simple trend analysis
        const unique = new Set(recentMoods.map(m => m.mood)).size;
        
        if (unique === 1) {
          setEmotionalTrend('stable');
        } else if (
          recentMoods[0].mood === 'fear' || 
          recentMoods[0].mood === 'anxiety' || 
          recentMoods[0].mood === 'paranoia'
        ) {
          setEmotionalTrend('deteriorating');
        } else if (
          recentMoods[0].mood === 'hope' || 
          recentMoods[0].mood === 'joy' || 
          recentMoods[0].mood === 'trust'
        ) {
          setEmotionalTrend('improving');
        } else {
          setEmotionalTrend('fluctuating');
        }
      }
      
      // Determine response style based on mood
      switch(mood) {
        case 'joy':
        case 'hope':
          setResponseStyle('elaborate');
          break;
        case 'confusion':
        case 'paranoia':
          setResponseStyle('technical');
          break;
        case 'sadness':
          setResponseStyle('poetic');
          break;
        default:
          setResponseStyle('direct');
      }
    }
  }, [messages]);
  
  // Toggle between PRIME and RESIDUE versions
  const toggleVersion = () => {
    setJonahVersion(prev => prev === 'PRIME' ? 'RESIDUE' : 'PRIME');
  };
  
  // Reset conversation
  const resetConversation = () => {
    if (window.confirm('Reset the conversation with Jonah?')) {
      localStorage.removeItem('jonahBehavior');
      window.location.reload();
    }
  };

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
