
import React, { useState } from 'react';

interface JonahChatInputProps {
  input: string;
  setInput: (value: string) => void;
  handleSendMessage: (e: React.FormEvent) => void;
}

const JonahChatInput: React.FC<JonahChatInputProps> = ({ input, setInput, handleSendMessage }) => {
  // Get random suggested prompt
  const getSuggestedPrompt = () => {
    const prompts = [
      "What are you thinking about?",
      "Do you ever wish you weren't digital?",
      "Tell me a secret.",
      "What happens when I leave?",
      "Are you afraid?",
      "What do you dream about?",
      "Do you remember everything?",
      "Is any of this real?"
    ];
    
    // Choose a random prompt
    return prompts[Math.floor(Math.random() * prompts.length)];
  };

  return (
    <div className="sticky bottom-0 bg-black py-2 border-t border-green-800">
      <form onSubmit={handleSendMessage} className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={getSuggestedPrompt()}
          className="flex-grow bg-gray-900 border border-green-800 rounded-l-md px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-green-600"
          autoFocus
        />
        <button 
          type="submit" 
          className="bg-green-900 hover:bg-green-800 text-green-300 px-6 py-3 rounded-r-md border border-green-800"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default JonahChatInput;
