
import React from "react";
import { X, Minus, Terminal, MessageSquare, Shield, Lock, LockOpen } from "lucide-react";
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

  // Get appropriate icon based on mode and trust
  const renderStatusIcon = () => {
    if (mode === "console") {
      return <Terminal className="w-5 h-5 text-green-400 mr-2" />;
    }

    if (trustLevel === "high") {
      return <LockOpen className="w-5 h-5 text-blue-400 mr-2" />;
    } else if (trustLevel === "medium") {
      return <Shield className="w-5 h-5 text-yellow-400 mr-2" />;
    } else {
      return <Lock className="w-5 h-5 text-red-400 mr-2" />;
    }
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
        {renderStatusIcon()}
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
