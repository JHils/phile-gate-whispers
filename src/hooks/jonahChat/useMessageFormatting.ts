
import { useState, useCallback } from 'react';
import { EmotionCategory, ResponseStyle } from '@/utils/jonahAdvancedBehavior/types';
import { getStyleForEmotion } from '@/utils/jonahAdvancedBehavior/styleMatrix';

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
    
    // Update style based on mood using the styleMatrix instead of hardcoded values
    const newStyle = getStyleForEmotion(mood);
    setResponseStyle(newStyle);
  }, []);
  
  return {
    messageWeight,
    responseStyle,
    updateMessageFormatting
  };
}
