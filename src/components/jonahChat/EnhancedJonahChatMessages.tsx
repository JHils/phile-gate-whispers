
import React, { useEffect, RefObject } from 'react';
import { ChatMessage } from '@/hooks/jonahChat/types';
import { EmotionCategory, EmotionalTrend, ResponseStyle } from '@/utils/jonahAdvancedBehavior/types';
import { formatJonahResponse } from '@/utils/jonahAdvancedBehavior/textFormatting';

interface EnhancedJonahChatMessagesProps {
  messages: ChatMessage[];
  isTyping: boolean;
  messageWeight: 'light' | 'medium' | 'heavy';
  responseStyle: ResponseStyle;
  jonahMood: EmotionCategory;
  emotionalTrend: EmotionalTrend;
  messagesEndRef: RefObject<HTMLDivElement>;
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
  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, messagesEndRef]);

  const getChatBubbleClasses = (isJonah: boolean) => {
    const baseClasses = 'px-4 py-2 rounded-lg max-w-[80%] mb-3 break-words';
    
    if (isJonah) {
      // Apply different styles based on emotional state and message weight
      let moodColor = 'bg-gray-800 text-gray-200';
      
      switch (jonahMood) {
        case 'paranoia':
        case 'suspicious':
        case 'fear':
        case 'anxiety':
          moodColor = 'bg-red-900/40 text-red-100';
          break;
        case 'joy':
        case 'hope':
          moodColor = 'bg-purple-900/40 text-purple-100';
          break;
        case 'sadness':
        case 'melancholic':
          moodColor = 'bg-blue-900/40 text-blue-100';
          break;
        case 'analytical':
        case 'neutral':
          moodColor = 'bg-emerald-900/40 text-emerald-100';
          break;
        case 'curiosity':
        case 'curious':
          moodColor = 'bg-indigo-900/40 text-indigo-100';
          break;
        case 'existential':
          moodColor = 'bg-violet-900/40 text-violet-100';
          break;
        case 'watching':
          moodColor = 'bg-slate-900/40 text-slate-100';
          break;
        default:
          moodColor = 'bg-gray-800 text-gray-200';
      }
      
      return `${baseClasses} mr-auto ${moodColor}`;
    } else {
      return `${baseClasses} ml-auto bg-gray-700 text-white`;
    }
  };
  
  // Format Jonah's messages based on emotion and style
  const formatMessageContent = (message: ChatMessage): string => {
    if (message.isJonah) {
      return formatJonahResponse(message.content, jonahMood, responseStyle);
    }
    return message.content;
  };
  
  // Apply weight class based on message weight
  const getWeightClass = () => {
    switch (messageWeight) {
      case 'light': return 'text-sm';
      case 'heavy': return 'text-lg font-medium';
      default: return 'text-base';
    }
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2">
      {messages.map((message) => (
        <div key={message.id} className={getChatBubbleClasses(message.isJonah)}>
          <div className={getWeightClass()}>
            {formatMessageContent(message)}
          </div>
        </div>
      ))}
      
      {isTyping && (
        <div className={getChatBubbleClasses(true)}>
          <div className="flex space-x-1 items-center">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-150"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-300"></div>
          </div>
        </div>
      )}
      <div ref={messagesEndRef}></div>
    </div>
  );
};

export default EnhancedJonahChatMessages;
