
import React, { useRef, useEffect } from 'react';
import { EmotionCategory, EmotionalTrend, ResponseStyle } from '@/utils/jonahAdvancedBehavior/types';

interface Message {
  id: string;
  content: string;
  isJonah: boolean;
  timestamp: number;
}

interface EnhancedJonahChatMessagesProps {
  messages: Message[];
  isTyping: boolean;
  messageWeight: 'light' | 'medium' | 'heavy';
  responseStyle: ResponseStyle;
  jonahMood: EmotionCategory;
  emotionalTrend: EmotionalTrend;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

const EnhancedJonahChatMessages: React.FC<EnhancedJonahChatMessagesProps> = ({
  messages,
  isTyping,
  messageWeight,
  responseStyle,
  jonahMood,
  emotionalTrend,
  messagesEndRef
}) => {
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, messagesEndRef]);

  // Get mood class for styling
  const getMoodClass = (mood: EmotionCategory): string => {
    switch(mood) {
      case 'fear': return 'text-purple-400 border-purple-800';
      case 'sadness': return 'text-blue-400 border-blue-700';
      case 'anger': return 'text-red-400 border-red-800';
      case 'joy': return 'text-amber-400 border-amber-700';
      case 'hope': return 'text-green-400 border-green-700';
      case 'anxiety': return 'text-orange-400 border-orange-800';
      case 'paranoia': return 'text-pink-400 border-pink-800';
      case 'trust': return 'text-cyan-400 border-cyan-700';
      case 'curiosity': return 'text-indigo-400 border-indigo-700';
      case 'confusion': return 'text-teal-400 border-teal-700';
      default: return 'text-green-400 border-green-800';
    }
  };

  // Get style class based on response style
  const getStyleClass = (style: ResponseStyle): string => {
    switch(style) {
      case 'poetic': return 'italic font-light';
      case 'technical': return 'font-mono text-sm';
      case 'elaborate': return 'leading-relaxed';
      default: return '';
    }
  };

  // Get weight class
  const getWeightClass = (weight: 'light' | 'medium' | 'heavy'): string => {
    switch(weight) {
      case 'light': return 'font-light';
      case 'heavy': return 'font-medium';
      default: return '';
    }
  };

  // Format timestamp
  const formatTime = (timestamp: number): string => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Apply text effects based on emotion and trend
  const applyTextEffects = (content: string, mood: EmotionCategory, trend: EmotionalTrend): React.ReactNode => {
    // Simple processing for now - in a full implementation, this would be more advanced
    if (mood === 'paranoia' || mood === 'fear') {
      return content.split('\n').map((line, i) => (
        <React.Fragment key={i}>
          <span className={trend === 'deteriorating' || trend === 'intensifying' ? 'animate-pulse' : ''}>{line}</span>
          {i < content.split('\n').length - 1 && <br />}
        </React.Fragment>
      ));
    }
    
    if (mood === 'confusion') {
      return content.split('\n').map((line, i) => (
        <React.Fragment key={i}>
          <span className="opacity-90">{line}</span>
          {i < content.split('\n').length - 1 && <br />}
        </React.Fragment>
      ));
    }
    
    return content;
  };

  return (
    <div className="flex-grow overflow-auto mb-4 space-y-4 p-4">
      {messages.length === 0 && (
        <div className="text-center text-gray-500 mt-10">
          <p>This is a direct channel to Jonah.</p>
          <p className="text-sm mt-2">What would you like to ask?</p>
        </div>
      )}
      
      {messages.map((message) => (
        <div 
          key={message.id} 
          className={`flex ${message.isJonah ? 'justify-start' : 'justify-end'}`}
        >
          <div 
            className={`max-w-[80%] px-4 py-3 rounded-lg ${
              message.isJonah 
                ? `bg-gray-900 bg-opacity-80 border ${getMoodClass(jonahMood)} ${getStyleClass(responseStyle)} ${getWeightClass(messageWeight)}`
                : 'bg-gray-800 text-white'
            }`}
          >
            {message.isJonah 
              ? applyTextEffects(message.content, jonahMood, emotionalTrend)
              : message.content
            }
            <div className="text-xs mt-1 opacity-50">
              {formatTime(message.timestamp)}
            </div>
          </div>
        </div>
      ))}
      
      {isTyping && (
        <div className="flex justify-start">
          <div className={`max-w-[80%] px-4 py-3 rounded-lg bg-gray-900 bg-opacity-80 border ${getMoodClass(jonahMood)}`}>
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
          background-color: currentColor;
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

export default EnhancedJonahChatMessages;
