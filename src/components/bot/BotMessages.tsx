
import React from "react";
import { Message } from "@/types/chat";

interface BotMessagesProps {
  messages: Message[];
  isTyping: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

export const BotMessages: React.FC<BotMessagesProps> = ({ 
  messages, 
  isTyping, 
  messagesEndRef 
}) => {
  return (
    <div className="flex-1 p-4 overflow-y-auto h-[calc(100%-104px)]">
      {messages.map((message) => (
        <div 
          key={message.id} 
          className={`mb-3 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}
        >
          <div 
            className={`inline-block p-2 rounded-lg max-w-[80%] ${
              message.sender === 'user' 
                ? 'bg-indigo-600 text-white' 
                : 'bg-gray-800 text-white'
            }`}
          >
            {message.text}
          </div>
        </div>
      ))}
      {isTyping && (
        <div className="flex space-x-2 p-2 bg-gray-800 text-white rounded-lg inline-block">
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-100"></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-200"></div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};
