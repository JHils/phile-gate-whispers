
import React from 'react';
import { EmotionCategory, ResponseStyle } from '@/utils/jonahAdvancedBehavior/types';

interface Message {
  id: string;
  type: string;
  content: string;
  timestamp: number;
  emotion?: EmotionCategory;
}

interface JonahChatMessagesProps {
  messages: Message[];
  isTyping: boolean;
  messageWeight: 'light' | 'medium' | 'heavy';
  responseStyle: ResponseStyle;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

const JonahChatMessages: React.FC<JonahChatMessagesProps> = ({
  messages,
  isTyping,
  messageWeight,
  responseStyle,
  messagesEndRef
}) => {
  // Get mood class for styling
  const getMoodClass = (mood: EmotionCategory): string => {
    switch(mood) {
      case 'fear': return 'text-red-400';
      case 'sadness': return 'text-blue-400';
      case 'anger': return 'text-yellow-400';
      case 'joy': return 'text-purple-400';
      case 'hope': return 'text-green-400';
      case 'anxiety': return 'text-orange-400';
      case 'paranoia': return 'text-pink-400';
      case 'trust': return 'text-cyan-400';
      case 'curiosity': return 'text-indigo-400';
      case 'confusion': return 'text-teal-400';
      default: return 'text-green-400';
    }
  };

  return (
    <div className="flex-grow overflow-auto mb-4 space-y-4">
      {messages.map((message) => (
        <div 
          key={message.id} 
          className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div 
            className={`max-w-md px-4 py-3 rounded-lg ${
              message.type === 'user' 
                ? 'bg-gray-800 text-white' 
                : 'bg-green-900 bg-opacity-30 border border-green-800 ' + 
                  (message.emotion ? getMoodClass(message.emotion) : 'text-green-400')
            } ${
              messageWeight === 'light' ? 'font-light' :
              messageWeight === 'heavy' ? 'font-medium' : ''
            } ${
              responseStyle === 'poetic' ? 'italic' :
              responseStyle === 'technical' ? 'font-mono text-sm' : ''
            }`}
          >
            {message.content}
            <div className="text-xs mt-1 opacity-50">
              {new Date(message.timestamp).toLocaleTimeString()}
            </div>
          </div>
        </div>
      ))}
      
      {isTyping && (
        <div className="flex justify-start">
          <div className="max-w-md px-4 py-3 rounded-lg bg-green-900 bg-opacity-30 border border-green-800 text-green-400">
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      )}
      
      <div ref={messagesEndRef} />

      <style>
        {`
        .typing-indicator {
          display: flex;
          align-items: center;
        }
        
        .typing-indicator span {
          height: 8px;
          width: 8px;
          border-radius: 50%;
          background-color: #4ade80;
          margin: 0 2px;
          display: inline-block;
          animation: bounce 1.5s infinite ease-in-out;
        }
        
        .typing-indicator span:nth-child(1) {
          animation-delay: 0s;
        }
        
        .typing-indicator span:nth-child(2) {
          animation-delay: 0.2s;
        }
        
        .typing-indicator span:nth-child(3) {
          animation-delay: 0.4s;
        }
        
        @keyframes bounce {
          0%, 60%, 100% {
            transform: translateY(0);
          }
          30% {
            transform: translateY(-5px);
          }
        }
        `}
      </style>
    </div>
  );
};

export default JonahChatMessages;
