import React from 'react';
import { ChatMessage } from '@/hooks/useJonahChat/types';
import { EmotionCategory, EmotionalTrend } from '@/utils/jonahAdvancedBehavior/types';

interface EnhancedJonahChatMessageProps {
  message: ChatMessage;
  jonahMood: EmotionCategory;
  emotionalTrend: EmotionalTrend;
}

const EnhancedJonahChatMessages: React.FC<EnhancedJonahChatMessageProps> = ({ message, jonahMood, emotionalTrend }) => {
  const getTrendIndicator = () => {
    if (emotionalTrend === 'stable') {
      return <span className="text-gray-400 text-xs ml-1">→</span>;
    } else if (emotionalTrend === 'improving' || emotionalTrend === 'intensifying') {
      return <span className="text-green-400 text-xs ml-1">↑</span>;
    } else if (emotionalTrend === 'deteriorating' || emotionalTrend === 'diminishing') {
      return <span className="text-red-400 text-xs ml-1">↓</span>;
    } else { // fluctuating
      return <span className="text-yellow-400 text-xs ml-1">↔</span>;
    }
  };
  
  return (
    <div className={`
      flex items-start my-2
      ${message.isJonah ? 'justify-start' : 'justify-end'}
    `}>
      <div className={`
        rounded-lg p-3 text-sm max-w-2xl
        ${message.isJonah ? 'bg-gray-700 text-white ml-2' : 'bg-purple-200 text-gray-800 mr-2'}
      `}>
        <div className="flex items-center">
          {message.isJonah && (
            <span className="text-xs text-gray-400 mr-2">
              Jonah ({jonahMood})
              {getTrendIndicator()}
            </span>
          )}
          <span className="whitespace-pre-line">{message.content}</span>
        </div>
        <div className="text-xs text-gray-500 mt-1">
          {new Date(message.timestamp).toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};

export default EnhancedJonahChatMessages;
