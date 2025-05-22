import React, { useEffect } from 'react';
import { ChatMessage } from '@/hooks/jonahChat/types';
import { EmotionCategory, EmotionalTrend, ResponseStyle } from '@/utils/jonahAdvancedBehavior/types';

interface EnhancedJonahChatMessageProps {
  messages: ChatMessage[];
  isTyping: boolean;
  messageWeight: 'light' | 'medium' | 'heavy' | string;
  responseStyle: ResponseStyle;
  jonahMood: EmotionCategory;
  emotionalTrend: EmotionalTrend;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

const EnhancedJonahChatMessages: React.FC<EnhancedJonahChatMessageProps> = ({
  messages,
  isTyping,
  messageWeight,
  responseStyle,
  jonahMood,
  emotionalTrend,
  messagesEndRef
}) => {
  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, messagesEndRef]);
  
  return (
    <div className="flex-1 overflow-auto p-4 bg-gray-900">
      {messages.map(message => (
        <div 
          key={message.id} 
          className={`mb-4 ${message.isJonah ? 'text-blue-300' : 'text-white'}`}
        >
          <p className={`${message.isJonah ? 'bg-gray-800' : 'bg-gray-700'} p-3 rounded-md`}>
            {message.content}
          </p>
        </div>
      ))}
      
      {isTyping && (
        <div className="mb-4 text-blue-300">
          <p className="bg-gray-800 p-3 rounded-md">
            <span className="typing-indicator">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </span>
          </p>
        </div>
      )}
      
      <div ref={messagesEndRef} />
    </div>
  );
};

export default EnhancedJonahChatMessages;
