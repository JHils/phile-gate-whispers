
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
    
    // Update style based on mood
    switch (mood) {
      case 'analytical':
        setResponseStyle('analytical');
        break;
      case 'cryptic':
      case 'paranoia':
        setResponseStyle('cryptic');
        break;
      case 'hope':
        setResponseStyle('HOPEFUL');
        break;
      case 'melancholic':
      case 'existential':
        setResponseStyle('poetic');
        break;
      case 'watching':
        setResponseStyle('MIRROR');
        break;
      case 'curiosity':
      case 'curious':
        setResponseStyle('elaborate');
        break;
      default:
        setResponseStyle('direct');
        break;
    }
  }, []);
  
  return {
    messageWeight,
    responseStyle,
    updateMessageFormatting
  };
}
