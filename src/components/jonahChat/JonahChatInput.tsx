
import React from 'react';

interface JonahChatInputProps {
  input: string;
  setInput: (value: string) => void;
  handleSendMessage: (e: React.FormEvent) => void;
}

const JonahChatInput: React.FC<JonahChatInputProps> = ({
  input, 
  setInput, 
  handleSendMessage
}) => {
  return (
    <form onSubmit={handleSendMessage} className="mt-auto p-4 border-t border-gray-700">
      <div className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Speak to Jonah..."
          className="flex-1 bg-black border border-green-500 text-green-400 p-2 rounded-l focus:outline-none focus:ring-1 focus:ring-green-500"
        />
        <button 
          type="submit" 
          className="bg-green-800 text-green-200 px-4 py-2 rounded-r hover:bg-green-700"
        >
          Send
        </button>
      </div>
    </form>
  );
};

export default JonahChatInput;
