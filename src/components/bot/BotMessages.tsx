
import React from 'react';
import { BotMessage } from '@/hooks/useBotState/types';

interface BotMessagesProps {
  messages: BotMessage[];
  isTyping: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

export const BotMessages: React.FC<BotMessagesProps> = ({ 
  messages, 
  isTyping, 
  messagesEndRef 
}) => {
  return (
    <div className="bg-gray-900 h-64 overflow-y-auto p-3 flex flex-col gap-2 custom-scrollbar">
      {/* Display welcome message if no messages yet */}
      {messages.length === 0 && (
        <div className="text-gray-500 text-center italic text-sm p-6">
          No conversation yet. Type a message to begin.
        </div>
      )}
      
      {/* Display actual messages */}
      {messages.map((message) => (
        <div 
          key={message.id}
          className={`rounded-lg px-3 py-2 max-w-[85%] ${
            message.type === 'bot'
              ? 'bg-gray-800 text-gray-200 self-start'
              : 'bg-blue-900 text-white self-end'
          } ${message.special ? 'border border-red-500' : ''}`}
        >
          {message.content}
        </div>
      ))}
      
      {/* Display typing indicator */}
      {isTyping && (
        <div className="bg-gray-800 text-gray-200 self-start rounded-lg px-3 py-2 flex items-center space-x-1">
          <span className="animate-bounce duration-200">●</span>
          <span className="animate-bounce duration-200 delay-75">●</span>
          <span className="animate-bounce duration-200 delay-150">●</span>
        </div>
      )}
      
      <div ref={messagesEndRef} />
    </div>
  );
};
