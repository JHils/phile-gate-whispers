
import React, { useRef } from 'react';
import JonahChatHeader from './JonahChatHeader';
import EnhancedJonahChatMessages from './EnhancedJonahChatMessages';
import EnhancedJonahChatInput from './EnhancedJonahChatInput';
import JonahVisual from './JonahVisual';
import { EmotionCategory, EmotionalTrend, ResponseStyle } from '@/utils/jonahAdvancedBehavior/types';
import { ChatMessage } from '@/hooks/jonahChat/types';

type JonahChatInterfaceProps = {
  messages: ChatMessage[];
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
      <div className="flex items-center justify-between mb-4">
        <JonahChatHeader 
          jonahMood={jonahMood} 
          emotionalTrend={emotionalTrend} 
          responseStyle={responseStyle}
          conversationDepth={conversationDepth}
          jonahVersion={jonahVersion}
          toggleVersion={toggleVersion}
          resetConversation={resetConversation}
          messageWeight={messageWeight}
        />
        
        {/* Add Jonah's visual representation */}
        <JonahVisual 
          jonahMood={jonahMood} 
          jonahVersion={jonahVersion} 
          messageWeight={messageWeight}
        />
      </div>
      
      <EnhancedJonahChatMessages 
        messages={messages}
        isTyping={isTyping}
        messageWeight={messageWeight}
        responseStyle={responseStyle}
        jonahMood={jonahMood}
        emotionalTrend={emotionalTrend}
        messagesEndRef={messagesEndRef}
      />
      
      <EnhancedJonahChatInput
        input={input}
        setInput={setInput}
        handleSendMessage={handleSendMessage}
        isTyping={isTyping}
      />
    </>
  );
};

export default JonahChatInterface;
