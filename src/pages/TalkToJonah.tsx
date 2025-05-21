
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
    sendMessage,
    messageWeight,
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
        emotionalTrend={emotionalTrend}
        responseStyle={responseStyle}
        sendMessage={sendMessage}
        messageWeight={messageWeight}
        resetConversation={resetConversation}
      />
    </JonahChatContainer>
  );
};

export default TalkToJonah;
