
import { useState, useCallback } from 'react';
import { ResponseStyle } from '@/utils/jonahAdvancedBehavior/types';

export function useMessageFormatting() {
  const [messageWeight, setMessageWeight] = useState<'light' | 'medium' | 'heavy'>('medium');
  const [responseStyle, setResponseStyle] = useState<ResponseStyle>('direct');
  
  const updateMessageFormatting = useCallback((content: string, mood: string) => {
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
      setResponseStyle('direct');
    }
  }, []);
  
  return {
    messageWeight,
    responseStyle,
    updateMessageFormatting
  };
}
