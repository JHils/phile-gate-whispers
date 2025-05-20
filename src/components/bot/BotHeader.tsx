
import React from "react";
import { X, Minus } from "lucide-react";
import { BotMode, TrustLevel } from "@/types/chat";
import JonahLogo from "../JonahLogo";

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

  // Get appropriate trust level indicator color
  const getTrustLevelColor = () => {
    if (trustLevel === "high") return "text-blue-400";
    if (trustLevel === "medium") return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <div className="flex items-center justify-between bg-gray-800 p-2 rounded-t-lg">
      <div className="flex items-center">
        {/* Use the Eye logo for regular mode, size based on if minimized */}
        <JonahLogo 
          variant="eye" 
          size={isMinimized ? "sm" : "md"} 
          className="mr-2"
        />
        
        <span className="text-sm font-mono">
          {getTitle()}
          {!isMinimized && trustScore !== undefined && (
            <span className={`ml-2 text-xs ${getTrustLevelColor()}`}>
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
