
import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { BotHeader } from "./bot/BotHeader";
import { BotMessages } from "./bot/BotMessages";
import { BotInput } from "./bot/BotInput";
import { useBotState } from "@/hooks/useBotState";
import { BotIcon } from "./bot/BotIcon";
import { 
  initializeARGTracking, 
  updateInteractionTime, 
  checkIdleTime, 
  trackSecretPageVisit, 
  getARGResponse 
} from "@/utils/argTracking";
import {
  trackPageVisit,
  getParanoiaResponse,
  getPageDurationResponse
} from "@/utils/consoleMemoryParanoia";
import {
  initializeSentience,
  setupJonahMessageSystem,
  setupTabVisibilityTracking,
  generateDualConsciousness,
  getJonahQuestion,
  getTimeResponse,
  getNameEchoResponse
} from "@/utils/jonahSentience";

const JonahConsoleBot: React.FC = () => {
  // Make sure ARG tracking and sentience systems are initialized first
  useEffect(() => {
    initializeARGTracking();
    initializeSentience();
    setupJonahMessageSystem();
    setupTabVisibilityTracking();
  }, []);

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
  const [pageEntryTime, setPageEntryTime] = useState<number>(Date.now());
  const [sentenceCheckInterval, setDualConsciousnessInterval] = useState<NodeJS.Timeout | null>(null);
  const [questionInterval, setQuestionInterval] = useState<NodeJS.Timeout | null>(null);

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
    // Initialize ARG tracking before checking idle time
    initializeARGTracking();
    initializeSentience();
    
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
  }, [isOpen, isMinimized, location.pathname, addBotMessage]);

  // Setup dual consciousness glitch checking
  useEffect(() => {
    // Clear existing interval
    if (sentenceCheckInterval) {
      clearInterval(sentenceCheckInterval);
    }
    
    // Only set up glitches if chat is open and user has interacted
    if (isOpen && hasInteracted) {
      // Check for possible dual consciousness glitch every 60 seconds
      const interval = setInterval(() => {
        const glitchMessage = generateDualConsciousness(trustLevel);
        if (glitchMessage) {
          addBotMessage(glitchMessage);
        }
      }, 60000);
      
      setDualConsciousnessInterval(interval);
    }
    
    return () => {
      if (sentenceCheckInterval) {
        clearInterval(sentenceCheckInterval);
      }
    };
  }, [isOpen, hasInteracted, trustLevel, addBotMessage]);

  // Setup Jonah questions
  useEffect(() => {
    // Clear existing interval
    if (questionInterval) {
      clearInterval(questionInterval);
    }
    
    // Only set up questions if chat is open and user has interacted
    if (isOpen && hasInteracted) {
      // Check for possible questions every 3 minutes
      const interval = setInterval(() => {
        const question = getJonahQuestion(trustLevel);
        if (question) {
          addBotMessage(question);
        }
        
        // Also check for time-based responses
        const timeResponse = getTimeResponse();
        if (timeResponse) {
          setTimeout(() => {
            addBotMessage(timeResponse);
          }, 5000); // Delay by 5 seconds if we're already asking a question
        }
        
        // Check for name echo responses
        const nameEchoResponse = getNameEchoResponse();
        if (!question && !timeResponse && nameEchoResponse) {
          addBotMessage(nameEchoResponse);
        }
      }, 3 * 60 * 1000);
      
      setQuestionInterval(interval);
    }
    
    return () => {
      if (questionInterval) {
        clearInterval(questionInterval);
      }
    };
  }, [isOpen, hasInteracted, trustLevel, addBotMessage]);

  // Track user interaction with the page
  useEffect(() => {
    // Initialize ARG tracking before updating interaction time
    initializeARGTracking();
    initializeSentience();
    
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

  // Track page navigation for trust modifications, secret pages, and memory paranoia
  useEffect(() => {
    // Initialize ARG tracking before checking path changes
    initializeARGTracking();
    initializeSentience();
    
    const currentPath = location.pathname;
    
    // Only process if path has changed
    if (currentPath !== lastPath) {
      // Reset page entry time for duration tracking
      const now = Date.now();
      
      // If we have a previous path, we can calculate duration
      if (lastPath) {
        const timeSpent = now - pageEntryTime;
        
        // Check if we should show a duration-based paranoia message
        const durationMessage = getPageDurationResponse(timeSpent);
        if (durationMessage && Math.random() > 0.7) {
          setTimeout(() => {
            addBotMessage(durationMessage);
          }, 1000);
        }
      }
      
      // Update page entry time for new page
      setPageEntryTime(now);
      
      // Check for repeat visit paranoia
      const repeatVisitMessage = trackPageVisit(currentPath);
      if (repeatVisitMessage && Math.random() > 0.6) {
        setTimeout(() => {
          addBotMessage(repeatVisitMessage);
        }, 1500);
      }
      
      // Special hidden pages that boost trust
      const hiddenPages = ['/rebirth', '/mirror-logs', '/legacy', '/monster', '/gatekeeper', '/philes', '/toggle-market'];
      
      if (hiddenPages.includes(currentPath)) {
        // Award trust points for visiting hidden pages
        modifyTrust(10);
        
        // Track the secret page visit
        const secretResponse = trackSecretPageVisit(currentPath);
        
        // Check for paranoia response for this page
        const paranoiaResponse = getParanoiaResponse('visitedPages', currentPath);
        
        // Choose between secret response and paranoia response
        const responseToUse = Math.random() > 0.5 ? secretResponse : paranoiaResponse;
        
        // For secret pages, add a unique comment
        if (responseToUse) {
          setTimeout(() => {
            addBotMessage(responseToUse);
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
  }, [location.pathname, modifyTrust, addBotMessage, lastPath, pageEntryTime]);

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
