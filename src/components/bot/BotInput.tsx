
import React from 'react';
import { BotMode } from "@/hooks/useBotState/types";

interface BotInputProps {
  input: string;
  setInput: (value: string) => void;
  handleSendMessage: (message: string) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  mode: BotMode;
}

export const BotInput: React.FC<BotInputProps> = ({
  input,
  setInput,
  handleSendMessage,
  inputRef,
  mode
}) => {
  // Handle sending a message
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      handleSendMessage(input);
      setInput('');
    }
  };

  return (
    <form onSubmit={onSubmit} className="p-2 border-t border-gray-700 bg-gray-900/70 rounded-b-lg">
      <div className="flex items-center">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          className="flex-grow bg-gray-800 border border-gray-700 text-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          placeholder={mode === 'debug' ? 'Debug mode...' : "Type your message..."}
          ref={inputRef}
        />
        <button
          type="submit"
          className="ml-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg p-2 flex items-center justify-center transition-colors"
          disabled={!input.trim()}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </div>
    </form>
  );
};
