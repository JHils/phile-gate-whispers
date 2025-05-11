
import React from 'react';
import { Character } from '@/types/chat';
import { useCharacterChat } from '@/hooks/useCharacterChat';
import MessageList from './chat/MessageList';
import ChatInput from './chat/ChatInput';

interface CharacterChatProps {
  character: Character;
}

const CharacterChat: React.FC<CharacterChatProps> = ({ character }) => {
  const {
    messages,
    input,
    setInput,
    isTyping,
    handleSendMessage,
    handleKeyDown
  } = useCharacterChat(character);

  return (
    <div className="flex flex-col h-[500px]">
      <MessageList messages={messages} isTyping={isTyping} />
      <ChatInput
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        onSend={handleSendMessage}
        isTyping={isTyping}
        characterName={character.name}
      />
    </div>
  );
};

export default CharacterChat;
