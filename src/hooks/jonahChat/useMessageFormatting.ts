
import { useState, useCallback } from 'react';
import { EmotionCategory, ResponseStyle } from '@/utils/jonahAdvancedBehavior/types';

export function useMessageFormatting() {
  const [messageWeight, setMessageWeight] = useState<'light' | 'medium' | 'heavy'>('medium');
  const [responseStyle, setResponseStyle] = useState<ResponseStyle>('direct');
  
  // Update message formatting based on content and mood
  const updateMessageFormatting = useCallback((content: string, mood: EmotionCategory) => {
    // Update weight based on content length
    if (content.length > 150) {
      setMessageWeight('heavy');
    } else if (content.length < 50) {
      setMessageWeight('light');
    } else {
      setMessageWeight('medium');
    }
    
    // Update style based on mood - ensure we're using valid ResponseStyle values
    if (mood === 'analytical') {
      setResponseStyle('analytical');
    } else if (mood === 'paranoia') {
      setResponseStyle('cryptic');
    } else if (mood === 'hope') {
      setResponseStyle('HOPEFUL');
    } else if (mood === 'melancholic' || mood === 'existential') {
      setResponseStyle('poetic');
    } else if (mood === 'watching') {
      setResponseStyle('MIRROR');
    } else if (mood === 'curiosity' || mood === 'curious') {
      setResponseStyle('elaborate');
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
