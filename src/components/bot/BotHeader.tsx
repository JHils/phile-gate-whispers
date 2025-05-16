
import React from "react";
import { X, Minus, Terminal, MessageSquare } from "lucide-react";
import { BotMode, TrustLevel } from "@/types/chat";

interface BotHeaderProps {
  mode: BotMode;
  isMinimized: boolean;
  trustLevel: TrustLevel;
  trustScore?: number;
  minimizeChat: (e: React.MouseEvent) => void;
  closeChat: (e: React.MouseEvent) => void;
}

export const BotHeader: React.FC<BotHeaderProps> = ({ 
  mode, 
  isMinimized, 
  minimizeChat, 
  closeChat,
  trustLevel,
  trustScore
}) => {
  // Get appropriate title based on mode and trust
  const getTitle = () => {
    if (mode === "console") return "JONAH:// console";
    if (trustLevel === "high") return "JONAH.exe";
    if (trustLevel === "medium") return "JONAH.sys";
    return "JONAH.log";
  };

  return (
    <div className="flex items-center justify-between bg-gray-800 p-2 rounded-t-lg">
      <div className="flex items-center">
        {mode === "console" ? (
          <Terminal className="w-5 h-5 text-green-400 mr-2" />
        ) : (
          <MessageSquare className="w-5 h-5 text-blue-400 mr-2" />
        )}
        <span className="text-sm font-mono">
          {getTitle()}
          {!isMinimized && trustScore !== undefined && (
            <span className="ml-2 text-xs text-gray-400">
              (trust: {Math.min(100, trustScore)}%)
            </span>
          )}
        </span>
      </div>
      <div className="flex">
        <button
          onClick={minimizeChat}
          className="p-1 hover:bg-gray-700 rounded mr-1"
          aria-label="Minimize"
        >
          <Minus className="w-4 h-4" />
        </button>
        <button
          onClick={closeChat}
          className="p-1 hover:bg-gray-700 rounded"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
