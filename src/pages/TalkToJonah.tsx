
import React from 'react';
import { useJonahChat } from '@/hooks/useJonahChat';
import JonahChatContainer from '@/components/jonahChat/JonahChatContainer';
import JonahChatInterface from '@/components/jonahChat/JonahChatInterface';

const TalkToJonah: React.FC = () => {
  const jonahChatProps = useJonahChat();
  
  return (
    <JonahChatContainer>
      <JonahChatInterface 
        {...jonahChatProps}
      />
    </JonahChatContainer>
  );
};

export default TalkToJonah;
