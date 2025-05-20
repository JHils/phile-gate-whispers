
import React, { useRef } from 'react';
import { useJonahChat } from '@/hooks/useJonahChat';
import JonahChatHeader from '@/components/jonahChat/JonahChatHeader';
import JonahChatInput from '@/components/jonahChat/JonahChatInput';
import JonahChatMessages from '@/components/jonahChat/JonahChatMessages';
import JonahChatContainer from '@/components/jonahChat/JonahChatContainer';

const TalkToJonah: React.FC = () => {
  const {
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
  } = useJonahChat();

  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  return (
    <JonahChatContainer>
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
    </JonahChatContainer>
  );
};

export default TalkToJonah;
