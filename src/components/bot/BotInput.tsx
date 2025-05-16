
import React from "react";
import { Send } from "lucide-react";
import { BotMode } from "@/types/chat";

interface BotInputProps {
  input: string;
  setInput: (input: string) => void;
  handleSendMessage: () => void;
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
  return (
    <div className="border-t border-gray-700 p-3">
      <div className="flex">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder={mode === "console" ? "Enter command..." : "Type a message..."}
          className="flex-1 bg-gray-800 text-white rounded-l-lg p-2 focus:outline-none"
        />
        <button
          onClick={handleSendMessage}
          className="bg-indigo-600 text-white p-2 rounded-r-lg hover:bg-indigo-700"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
