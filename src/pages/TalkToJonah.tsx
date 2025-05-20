
import React from 'react';
import { useJonahChat } from '@/hooks/useJonahChat';
import JonahChatContainer from '@/components/jonahChat/JonahChatContainer';
import JonahChatInterface from '@/components/jonahChat/JonahChatInterface';

const TalkToJonah: React.FC = () => {
  const jonahChatProps = useJonahChat();
  
  // Create a wrapper function to adapt the handler to the expected FormEvent type
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    jonahChatProps.handleSendMessage(jonahChatProps.input);
  };
  
  return (
    <JonahChatContainer>
      <JonahChatInterface 
        {...jonahChatProps}
        handleSendMessage={handleFormSubmit}
      />
    </JonahChatContainer>
  );
};

export default TalkToJonah;
