
import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { BotHeader } from "./bot/BotHeader";
import { BotMessages } from "./bot/BotMessages";
import { BotInput } from "./bot/BotInput";
import { useBotState } from "@/hooks/useBotState";
import { BotIcon } from "./bot/BotIcon";
import { 
  updateInteractionTime, 
  checkIdleTime, 
  trackSecretPageVisit, 
  getARGResponse 
} from "@/utils/argTracking";

const JonahConsoleBot: React.FC = () => {
  // Use our extracted hook for bot state management
  const {
    isOpen,
    setIsOpen,
    isMinimized,
    setIsMinimized,
    messages,
    setMessages,
    input,
    setInput,
    mode,
    setMode,
    trustLevel,
    trustScore,
    modifyTrust,
    isTyping,
    setIsTyping,
    hasInteracted,
    setHasInteracted,
    iconVariant,
    glitchEffect,
    addBotMessage,
    handleSendMessage,
    toggleChat,
    minimizeChat,
    closeChat
  } = useBotState();

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const location = useLocation();
  const [lastPath, setLastPath] = useState<string>("");
  const [idleCheckInterval, setIdleCheckInterval] = useState<NodeJS.Timeout | null>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when chat is opened
  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);

  // Set up idle detection
  useEffect(() => {
    // Clear existing interval when component unmounts or dependencies change
    if (idleCheckInterval) {
      clearInterval(idleCheckInterval);
    }
    
    // Create new idle check interval - check every 30 seconds
    const interval = setInterval(() => {
      const currentPath = location.pathname;
      const idleMessage = checkIdleTime(currentPath);
      
      if (idleMessage && (!isOpen || isMinimized)) {
        // Auto-open chat with idle message if not already open
        setIsOpen(true);
        setIsMinimized(false);
        addBotMessage(idleMessage);
      }
    }, 30000);
    
    setIdleCheckInterval(interval);
    
    return () => {
      if (idleCheckInterval) {
        clearInterval(idleCheckInterval);
      }
    };
  }, [isOpen, isMinimized, location.pathname]);

  // Track user interaction with the page
  useEffect(() => {
    const handleUserInteraction = () => {
      updateInteractionTime();
    };
    
    // Add event listeners for user interactions
    window.addEventListener('mousedown', handleUserInteraction);
    window.addEventListener('keydown', handleUserInteraction);
    window.addEventListener('scroll', handleUserInteraction);
    window.addEventListener('mousemove', handleUserInteraction);
    
    return () => {
      window.removeEventListener('mousedown', handleUserInteraction);
      window.removeEventListener('keydown', handleUserInteraction);
      window.removeEventListener('scroll', handleUserInteraction);
      window.removeEventListener('mousemove', handleUserInteraction);
    };
  }, []);

  // Track page navigation for trust modifications and secret pages
  useEffect(() => {
    const currentPath = location.pathname;
    
    // Only process if path has changed
    if (currentPath !== lastPath) {
      // Special hidden pages that boost trust
      const hiddenPages = ['/rebirth', '/mirror-logs', '/legacy', '/monster', '/gatekeeper', '/philes', '/toggle-market'];
      
      if (hiddenPages.includes(currentPath)) {
        // Award trust points for visiting hidden pages
        modifyTrust(10);
        
        // Track the secret page visit
        const secretResponse = trackSecretPageVisit(currentPath);
        
        // For secret pages, add a unique comment
        if (secretResponse && Math.random() > 0.5) {
          setTimeout(() => {
            addBotMessage(secretResponse);
          }, 2000);
        }
      }
      
      // Check for ARG progression responses
      const argResponse = getARGResponse();
      if (argResponse && Math.random() > 0.7) { // 30% chance to show ARG-specific response on page change
        setTimeout(() => {
          addBotMessage(argResponse);
        }, 3000);
      }
      
      // Update the last path
      setLastPath(currentPath);
    }
  }, [location.pathname, modifyTrust, addBotMessage, lastPath]);

  // Add hover detection for specific elements
  useEffect(() => {
    // Function to handle element hover
    const handleElementHover = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      
      // Check for special classes that might indicate secret elements
      const isSecretElement = 
        target.classList.contains('easter-egg') || 
        target.classList.contains('hidden-link') || 
        target.classList.contains('keyhole') ||
        target.getAttribute('data-secret') === 'true';
      
      // If it's a secret element and we have high trust, maybe give a hint
      if (isSecretElement && trustLevel === 'high' && Math.random() > 0.7) {
        const hintMessages = [
          "This isn't where the real story ends.",
          "Click again. Just once. Trust me.",
          "You're close. Look harder.",
          "There's something here worth finding."
        ];
        
        const randomHint = hintMessages[Math.floor(Math.random() * hintMessages.length)];
        
        if (!isOpen) {
          setIsOpen(true);
          setIsMinimized(false);
        }
        
        addBotMessage(randomHint);
      }
    };
    
    // Only add the hover detection if we have high trust
    if (trustLevel === 'high') {
      document.addEventListener('mouseover', handleElementHover);
      
      return () => {
        document.removeEventListener('mouseover', handleElementHover);
      };
    }
  }, [trustLevel, isOpen, addBotMessage]);

  return (
    <>
      {/* Chat icon with trust level indicator */}
      <BotIcon 
        isOpen={isOpen}
        iconVariant={iconVariant}
        glitchEffect={glitchEffect}
        toggleChat={toggleChat}
      />

      {/* Chat window */}
      {isOpen && (
        <div 
          className={`fixed z-50 ${isMinimized ? 'bottom-6 right-6 w-64 h-12' : 'bottom-6 right-6 w-80 md:w-96 h-96'} 
            bg-gray-900 text-white rounded-lg shadow-xl transition-all duration-300
            ${glitchEffect ? 'animate-glitch' : ''}`}
        >
          <BotHeader 
            mode={mode}
            isMinimized={isMinimized}
            minimizeChat={minimizeChat}
            closeChat={closeChat}
            trustLevel={trustLevel}
            trustScore={trustScore}
          />

          {/* Messages area - only shown when not minimized */}
          {!isMinimized && (
            <BotMessages 
              messages={messages}
              isTyping={isTyping}
              messagesEndRef={messagesEndRef}
            />
          )}

          {/* Input area - only shown when not minimized */}
          {!isMinimized && (
            <BotInput
              input={input}
              setInput={setInput}
              handleSendMessage={handleSendMessage}
              inputRef={inputRef}
              mode={mode}
            />
          )}
        </div>
      )}

      {/* CSS for glitch effects */}
      <style>
        {`
        .animate-glitch {
          animation: glitch 0.5s cubic-bezier(.25, .46, .45, .94) both;
        }
        
        @keyframes glitch {
          0% {
            transform: translate(0);
          }
          20% {
            transform: translate(-2px, 2px);
          }
          40% {
            transform: translate(-2px, -2px);
          }
          60% {
            transform: translate(2px, 2px);
          }
          80% {
            transform: translate(2px, -2px);
          }
          100% {
            transform: translate(0);
          }
        }
        
        .glitch-icon {
          position: relative;
        }
        
        .glitch-icon::before,
        .glitch-icon::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
        
        .glitch-icon::before {
          background: rgba(255, 0, 0, 0.2);
          animation: glitch-animation 1s infinite linear alternate-reverse;
        }
        
        .glitch-icon::after {
          background: rgba(0, 0, 255, 0.2);
          animation: glitch-animation 0.7s infinite linear alternate;
        }
        
        @keyframes glitch-animation {
          0% {
            transform: translate(0);
          }
          20% {
            transform: translate(-1px, 1px);
          }
          40% {
            transform: translate(-1px, -1px);
          }
          60% {
            transform: translate(1px, 1px);
          }
          80% {
            transform: translate(1px, -1px);
          }
          100% {
            transform: translate(0);
          }
        }
        `}
      </style>
    </>
  );
};

export default JonahConsoleBot;
