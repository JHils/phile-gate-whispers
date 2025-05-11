
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface ChatInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  onSend: () => void;
  isTyping: boolean;
  characterName: string;
}

const ChatInput: React.FC<ChatInputProps> = ({ 
  value, 
  onChange, 
  onKeyDown, 
  onSend, 
  isTyping, 
  characterName 
}) => {
  return (
    <div className="p-4 border-t border-gray-700">
      <div className="flex space-x-2">
        <Input
          placeholder={`Message ${characterName.split(' ')[0]}...`}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          className="bg-gray-800 border-gray-700 focus:ring-dust-blue"
        />
        <Button onClick={onSend} disabled={isTyping || !value.trim()}>
          Send
        </Button>
      </div>
      <div className="text-xs text-gray-400 mt-2">
        * This is a simulated chat. Try asking about the character's experiences or memories.
      </div>
    </div>
  );
};

export default ChatInput;
