import React from 'react';
import { EmotionCategory, EmotionalTrend, ResponseStyle } from '@/utils/jonahAdvancedBehavior/types';

interface JonahChatHeaderProps {
  jonahMood: EmotionCategory;
  emotionalTrend: EmotionalTrend;
  responseStyle: ResponseStyle;
  messageWeight: number;
  conversationDepth: number;
}

const JonahChatHeader: React.FC<JonahChatHeaderProps> = ({
  jonahMood,
  emotionalTrend,
  responseStyle,
  messageWeight,
  conversationDepth
}) => {
  const getTrendArrow = (): JSX.Element => {
    // Fix the emotionalTrend comparisons
    if (emotionalTrend === 'improving') {
      return <span className="text-green-400 text-xs">↗</span>;
    } else if (emotionalTrend === 'deteriorating') {
      return <span className="text-red-400 text-xs">↘</span>;
    } else if (emotionalTrend === 'intensifying') {
      return <span className="text-purple-400 text-xs">↗</span>;
    } else if (emotionalTrend === 'diminishing') {
      return <span className="text-blue-400 text-xs">↘</span>;
    } else if (emotionalTrend === 'stable') {
      return <span className="text-gray-400 text-xs">→</span>;
    } else { // fluctuating
      return <span className="text-yellow-400 text-xs">↔</span>;
    }
  };
  
  return (
    <div className="bg-gray-800 p-4 rounded-t-md">
      <h2 className="text-lg font-semibold text-white">Jonah's Status</h2>
      <div className="flex items-center space-x-2">
        <span className="text-gray-400">Mood:</span>
        <span className="text-blue-200">{jonahMood}</span>
        {getTrendArrow()}
      </div>
      <div className="flex items-center space-x-2">
        <span className="text-gray-400">Style:</span>
        <span className="text-blue-200">{responseStyle}</span>
      </div>
      <div className="flex items-center space-x-2">
        <span className="text-gray-400">Weight:</span>
        <span className="text-blue-200">{messageWeight}</span>
      </div>
      <div className="flex items-center space-x-2">
        <span className="text-gray-400">Depth:</span>
        <span className="text-blue-200">{conversationDepth}</span>
      </div>
    </div>
  );
};

export default JonahChatHeader;
