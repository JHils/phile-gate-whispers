
import { useState, useCallback } from 'react';
import { EmotionCategory, ResponseStyle } from '@/utils/jonahAdvancedBehavior/types';

export function useMessageFormatting() {
  // Message formatting
  const [messageWeight, setMessageWeight] = useState<'light' | 'medium' | 'heavy'>('medium');
  const [responseStyle, setResponseStyle] = useState<ResponseStyle>('direct');
  
  // Update message formatting based on content and emotion
  const updateMessageFormatting = useCallback((content: string, mood: EmotionCategory) => {
    // Set message weight based on emotional intensity
    if (mood === 'joy' || mood === 'anger') {
      setMessageWeight('heavy');
    } else if (mood === 'sadness' || mood === 'fear') {
      setMessageWeight('light');
    } else {
      setMessageWeight('medium');
    }
    
    // Set response style based on content and mood
    if (content.length > 100 && (mood === 'joy' || mood === 'hope')) {
      setResponseStyle('poetic');
    } else if (content.includes('?') && (mood === 'confusion' || mood === 'curiosity')) {
      setResponseStyle('technical');
    } else if (content.length > 150 && mood === 'trust') {
      setResponseStyle('elaborate' as ResponseStyle);
    } else {
      setResponseStyle('direct');
    }
  }, []);
  
  return {
    messageWeight,
    responseStyle,
    updateMessageFormatting
  };
}
