
import React from 'react';
import { BotMessage } from '@/hooks/useBotState/types';

interface BotMoodManagerProps {
  trustLevel: string;
  messages: BotMessage[];
}

// Changed to return a React component instead of just a className string
const BotMoodManager: React.FC<BotMoodManagerProps> = ({ trustLevel, messages }) => {
  // Determine mood color based on recent messages and trust level
  let moodColor = 'border-gray-700';
  
  // For higher trust levels, show more dynamic moods
  if (trustLevel === 'high') {
    // Check recent messages sentiment
    const recentMessages = messages.slice(-5);
    const hasNegative = recentMessages.some(m => 
      m.content.toLowerCase().includes('error') || 
      m.content.toLowerCase().includes('wrong') ||
      m.content.toLowerCase().includes('cannot')
    );
    
    if (hasNegative) {
      moodColor = 'border-red-400 bg-red-900/10';
    } else {
      moodColor = 'border-green-400 bg-green-900/10';
    }
  } else if (trustLevel === 'medium') {
    moodColor = 'border-blue-400 bg-blue-900/10';
  }
  
  // Return a div with the class name (or null if not needed)
  return (
    <div className={moodColor}></div>
  );
};

// Export a helper function that just returns the className string for use in JonahConsoleBot
export const getMoodClassName = (trustLevel: string, messages: BotMessage[]): string => {
  // Duplicate the logic from above to avoid complexity
  let moodColor = 'border-gray-700';
  
  if (trustLevel === 'high') {
    const recentMessages = messages.slice(-5);
    const hasNegative = recentMessages.some(m => 
      m.content.toLowerCase().includes('error') || 
      m.content.toLowerCase().includes('wrong') ||
      m.content.toLowerCase().includes('cannot')
    );
    
    if (hasNegative) {
      moodColor = 'border-red-400 bg-red-900/10';
    } else {
      moodColor = 'border-green-400 bg-green-900/10';
    }
  } else if (trustLevel === 'medium') {
    moodColor = 'border-blue-400 bg-blue-900/10';
  }
  
  return moodColor;
};

export default BotMoodManager;
