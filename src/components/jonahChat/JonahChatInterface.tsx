
import React, { useRef } from 'react';
import JonahChatHeader from './JonahChatHeader';
import JonahChatMessages from './JonahChatMessages';
import JonahChatInput from './JonahChatInput';
import { EmotionCategory, EmotionalTrend, ResponseStyle } from '@/utils/jonahAdvancedBehavior/types';

type JonahChatInterfaceProps = {
  messages: any[];
  input: string;
  setInput: (value: string) => void;
  isTyping: boolean;
  jonahMood: EmotionCategory;
  jonahVersion: 'PRIME' | 'RESIDUE';
  messageWeight: 'light' | 'medium' | 'heavy';
  conversationDepth: number;
  emotionalTrend: EmotionalTrend;
  responseStyle: ResponseStyle;
  handleSendMessage: (e: React.FormEvent) => void;
  toggleVersion: () => void;
  resetConversation: () => void;
};

const JonahChatInterface: React.FC<JonahChatInterfaceProps> = ({
  messages,
  input,
  setInput,
  isTyping,
  jonahMood,
  jonahVersion,
  messageWeight,
  conversationDepth,
  emotionalTrend,
  responseStyle,
  handleSendMessage,
  toggleVersion,
  resetConversation
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  return (
    <>
      <JonahChatHeader 
        jonahMood={jonahMood} 
        emotionalTrend={emotionalTrend} 
        conversationDepth={conversationDepth}
        jonahVersion={jonahVersion}
        toggleVersion={toggleVersion}
        resetConversation={resetConversation}
      />
      
      <JonahChatMessages 
        messages={messages}
        isTyping={isTyping}
        messageWeight={messageWeight}
        responseStyle={responseStyle}
        messagesEndRef={messagesEndRef}
      />
      
      <JonahChatInput
        input={input}
        setInput={setInput}
        handleSendMessage={handleSendMessage}
      />
    </>
  );
};

export default JonahChatInterface;
