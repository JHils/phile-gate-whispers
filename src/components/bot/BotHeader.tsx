
import React from "react";
import { MessageCircle, Minimize2, X, Terminal } from "lucide-react";
import { BotMode } from "@/types/chat";

interface BotHeaderProps {
  mode: BotMode;
  isMinimized: boolean;
  minimizeChat: (e: React.MouseEvent) => void;
  closeChat: (e: React.MouseEvent) => void;
}

export const BotHeader: React.FC<BotHeaderProps> = ({ 
  mode, 
  isMinimized, 
  minimizeChat, 
  closeChat 
}) => {
  return (
    <div className="flex items-center justify-between p-3 border-b border-gray-700">
      <div className="flex items-center">
        {mode === "console" ? (
          <Terminal className="w-5 h-5 mr-2" />
        ) : (
          <MessageCircle className="w-5 h-5 mr-2" />
        )}
        <span className="font-medium">
          {mode === "console" ? "Jonah Console" : "Jonah"}
        </span>
      </div>
      <div className="flex items-center space-x-2">
        {!isMinimized && (
          <button onClick={minimizeChat} className="text-gray-400 hover:text-white">
            <Minimize2 className="w-4 h-4" />
          </button>
        )}
        <button onClick={closeChat} className="text-gray-400 hover:text-white">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
