
import React from 'react';
import { EmotionCategory, EmotionalTrend } from '@/utils/jonahAdvancedBehavior/types';
import { ChatMessage } from '@/hooks/jonahChat/types';

interface EnhancedJonahChatMessagesProps {
  messages: ChatMessage[];
  isTyping: boolean;
  jonahMood: EmotionCategory;
  emotionalTrend: EmotionalTrend;
  messageWeight: string;
  responseStyle: string;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

const EnhancedJonahChatMessages: React.FC<EnhancedJonahChatMessagesProps> = ({ 
  messages, 
  isTyping, 
  jonahMood, 
  emotionalTrend,
  messageWeight,
  responseStyle,
  messagesEndRef 
}) => {
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
    <div className="flex flex-col overflow-y-auto p-4 space-y-2 bg-gray-900 h-80">
      {messages.map((message) => (
        <div key={message.id} className={`
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
      ))}
      
      {isTyping && (
        <div className="flex items-start my-2 justify-start">
          <div className="bg-gray-700 text-white rounded-lg p-3 text-sm max-w-2xl ml-2">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
            </div>
          </div>
        </div>
      )}
      
      <div ref={messagesEndRef} />
    </div>
  );
};

export default EnhancedJonahChatMessages;
