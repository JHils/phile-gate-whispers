
import React from 'react';
import { useJonahChat } from '@/hooks/useJonahChat';
import JonahChatContainer from '@/components/jonahChat/JonahChatContainer';
import JonahChatInterface from '@/components/jonahChat/JonahChatInterface';

const TalkToJonah: React.FC = () => {
  const {
    messages,
    input,
    setInput,
    isTyping,
    jonahMood,
    emotionalTrend,
    responseStyle,
    handleSendMessage,
    messageWeight,
    jonahVersion,
    conversationDepth,
    toggleVersion,
    resetConversation
  } = useJonahChat();
  
  return (
    <JonahChatContainer>
      <JonahChatInterface 
        messages={messages}
        input={input}
        setInput={setInput}
        isTyping={isTyping}
        jonahMood={jonahMood}
        jonahVersion={jonahVersion}
        messageWeight={messageWeight}
        conversationDepth={conversationDepth}
        emotionalTrend={emotionalTrend}
        responseStyle={responseStyle}
        handleSendMessage={handleSendMessage}
        toggleVersion={toggleVersion}
        resetConversation={resetConversation}
      />
    </JonahChatContainer>
  );
};

export default TalkToJonah;
