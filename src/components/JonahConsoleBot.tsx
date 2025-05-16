
import React, { useState, useEffect, useRef } from "react";
import { MessageCircle, Minimize2, X, Send, KeyRound, Terminal } from "lucide-react";
import { useTrackingSystem } from "@/hooks/useTrackingSystem";
import { useLocation } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { Message } from "@/types/chat";

// Define trust levels for messages
type TrustLevel = "low" | "medium" | "high";
type BotMode = "whisper" | "responsive" | "console";

interface DialogueEntry {
  message: string;
  trustLevel: TrustLevel;
  tags?: string[]; // Optional tags for filtering
  pages?: string[]; // Pages where this message might appear
}

const JonahConsoleBot: React.FC = () => {
  // State management
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<BotMode>("whisper");
  const [trustLevel, setTrustLevel] = useState<TrustLevel>("low");
  const [isTyping, setIsTyping] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [iconVariant, setIconVariant] = useState(0);
  const [glitchEffect, setGlitchEffect] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const location = useLocation();
  const { trackEvent, userState } = useTrackingSystem();

  // Dialogue bank organized by trust level
  const dialogueBank: DialogueEntry[] = [
    // Low Trust (0-30)
    { message: "I don't think we're there yet, friend.", trustLevel: "low" },
    { message: "Not everyone's meant to know.", trustLevel: "low" },
    { message: "Just another tourist, are you?", trustLevel: "low" },
    { message: "You ask a lot for someone so early in.", trustLevel: "low" },
    { message: "I've said too much already.", trustLevel: "low" },
    
    // Medium Trust (31-70)
    { message: "You're paying attention. I like that.", trustLevel: "medium" },
    { message: "Some of this… hurts to remember.", trustLevel: "medium" },
    { message: "The keyhole isn't where you think it is.", trustLevel: "medium" },
    { message: "You've seen the cracks. Now look through them.", trustLevel: "medium" },
    { message: "Why do you think I ended up here?", trustLevel: "medium" },
    
    // High Trust (71-100)
    { message: "You remembered the tree by the hostel. So did I.", trustLevel: "high", pages: ["/outbackhostel"] },
    { message: "Alright, I'll show you something I haven't shown anyone.", trustLevel: "high" },
    { message: "She told me her real name once. I never wrote it down.", trustLevel: "high" },
    { message: "You're not just reading this. You're inside it.", trustLevel: "high" },
    { message: "This was never a story. It's a reckoning.", trustLevel: "high" },
    
    // Page specific messages
    { message: "That was me once.", trustLevel: "low", pages: ["/404"] },
    { message: "You're not the first to read this… but you might be the first to notice.", trustLevel: "low" },
    { message: "The coin lands, but not here.", trustLevel: "medium", pages: ["/legacy"] },
    { message: "Your reflection blinks before you do.", trustLevel: "medium", pages: ["/mirror"] },
  ];

  // Special responses to specific user inputs
  const specialResponses: Record<string, string> = {
    "who are you": "I was Joseph. Then I got rewritten.",
    "who are you?": "I was Joseph. Then I got rewritten.",
    "i love you": "Careful. That's how it started last time.",
    "i love you jonah": "Careful. That's how it started last time.",
    "what is the charge": "Eating a succulent Easter egg.",
    "what is the charge?": "Eating a succulent Easter egg.",
    "you okay mate": "Define okay.",
    "you okay mate?": "Define okay.",
    "you okay": "Define okay.",
    "hello": "Hello. Are you real or just passing through?",
    "hi": "Are you here by accident or design?",
    "help": "I'm not sure I can help you. But you might be able to help me.",
    "/console": "Switching to console mode...",
  };

  // Console commands (for console mode)
  const consoleCommands: Record<string, () => string> = {
    "help": () => "Available commands: trace, status, whisper, memory, exit",
    "trace": () => "ERROR 404: What you're looking for no longer exists.",
    "status": () => `Trust level: ${trustLevel.toUpperCase()} | Mode: ${mode.toUpperCase()}`,
    "whisper": () => {
      const whispers = [
        "The coin never stops spinning.",
        "She was watching from the treeline.",
        "The Gate opens both ways."
      ];
      return whispers[Math.floor(Math.random() * whispers.length)];
    },
    "memory": () => "Memory fragments corrupted. Partial recall available with higher trust.",
    "exit": () => {
      setMode("responsive");
      return "Exiting console mode.";
    },
    "/confess": () => "You don't want forgiveness. You want to be watched."
  };

  // Calculate trust level based on user state
  useEffect(() => {
    // Simple trust calculation based on pages visited and console commands
    const pagesVisited = Object.keys(userState.events).filter(key => 
      key.startsWith('page_view_')).length;
      
    const consoleCommands = Object.values(userState.console).filter(Boolean).length;
    
    let trustScore = 0;
    trustScore += pagesVisited * 5;
    trustScore += consoleCommands * 10;
    
    // Add bonus for special actions
    if (userState.console.legacyCalled) trustScore += 15;
    if (userState.survivorMode) trustScore += 25;
    
    // Set trust level based on score
    let newTrustLevel: TrustLevel = "low";
    if (trustScore >= 70) newTrustLevel = "high";
    else if (trustScore >= 30) newTrustLevel = "medium";
    
    setTrustLevel(newTrustLevel);
    
    // Evolve icon based on trust level
    setIconVariant(
      trustScore >= 70 ? 2 : 
      trustScore >= 30 ? 1 : 0
    );
  }, [userState]);

  // Track page changes to show contextual messages
  useEffect(() => {
    if (isOpen && location.pathname) {
      // Find a contextual message for this page
      const pageMessages = dialogueBank.filter(entry => 
        entry.pages?.includes(location.pathname) && entry.trustLevel === trustLevel
      );
      
      if (pageMessages.length > 0 && Math.random() > 0.7) {
        // 30% chance to show a contextual message when navigating
        const randomMessage = pageMessages[Math.floor(Math.random() * pageMessages.length)];
        addBotMessage(randomMessage.message);
      }
    }
    
    // Track page view in context of the bot
    trackEvent(`jonah_bot_page_${location.pathname.replace(/\//g, '_')}`);
  }, [location.pathname]);

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

  // Show initial message based on current page
  useEffect(() => {
    // Only show once on initial load
    if (messages.length === 0 && Math.random() > 0.5) {
      const initialMessages = dialogueBank.filter(entry => entry.trustLevel === "low");
      const message = initialMessages[Math.floor(Math.random() * initialMessages.length)];
      
      // Delay the first message slightly
      setTimeout(() => {
        addBotMessage(message.message);
      }, 3000);
    }
  }, []);

  // Trigger visual glitch effect randomly
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      // 2% chance of a visual glitch when chat is open
      if (isOpen && Math.random() < 0.02) {
        setGlitchEffect(true);
        setTimeout(() => setGlitchEffect(false), 500);
      }
    }, 10000);
    
    return () => clearInterval(glitchInterval);
  }, [isOpen]);

  // Add a message from the bot
  const addBotMessage = (text: string) => {
    setIsTyping(true);
    
    // Simulate typing delay based on message length
    setTimeout(() => {
      setMessages(prev => [
        ...prev, 
        {
          id: `bot-${Date.now()}`,
          sender: 'character',
          text,
          timestamp: new Date()
        }
      ]);
      setIsTyping(false);
    }, Math.min(1000, text.length * 30));
  };

  // Handle user sending a message
  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: input,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    trackEvent(`jonah_bot_message_sent`);
    
    // Mark that user has interacted
    if (!hasInteracted) {
      setHasInteracted(true);
      setMode("responsive");
      trackEvent("jonah_bot_first_interaction");
    }
    
    // Process input
    processUserInput(input);
    setInput("");
  };

  // Process user input and generate appropriate response
  const processUserInput = (text: string) => {
    const normalizedInput = text.toLowerCase().trim();
    
    // Check if we're in console mode
    if (mode === "console") {
      // Handle console commands
      const command = normalizedInput.split(' ')[0];
      
      if (consoleCommands[command]) {
        addBotMessage(consoleCommands[command]());
      } else if (command.startsWith('/')) {
        addBotMessage("Unknown command. Type 'help' for available commands.");
      } else {
        addBotMessage("Command not recognized. Type 'help' for a list of commands.");
      }
      return;
    }
    
    // Check for mode switching command
    if (normalizedInput === "/console") {
      setMode("console");
      addBotMessage("Console mode activated. Type 'help' for available commands.");
      return;
    }
    
    // Check for special responses
    if (specialResponses[normalizedInput]) {
      addBotMessage(specialResponses[normalizedInput]);
      return;
    }
    
    // Get regular responses based on trust level
    const availableResponses = dialogueBank.filter(entry => entry.trustLevel === trustLevel);
    
    if (availableResponses.length > 0) {
      const response = availableResponses[Math.floor(Math.random() * availableResponses.length)];
      addBotMessage(response.message);
    } else {
      // Fallback response
      addBotMessage("...");
    }
  };

  // Toggle the chat open/closed
  const toggleChat = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
    
    if (!isOpen) {
      trackEvent("jonah_bot_opened");
    }
  };

  // Minimize the chat
  const minimizeChat = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMinimized(true);
    trackEvent("jonah_bot_minimized");
  };

  // Close the chat
  const closeChat = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(false);
    trackEvent("jonah_bot_closed");
  };

  return (
    <>
      {/* Chat icon */}
      <div 
        className={`fixed bottom-6 right-6 z-50 ${glitchEffect ? 'animate-pulse' : ''}`}
        onClick={toggleChat}
      >
        {!isOpen ? (
          <button 
            className={`w-12 h-12 rounded-full bg-gray-800 text-white flex items-center justify-center shadow-lg
              ${glitchEffect ? 'glitch-icon' : ''}
              hover:bg-gray-700 transition-all duration-300`}
          >
            {iconVariant === 2 ? (
              <KeyRound className="w-5 h-5" />
            ) : iconVariant === 1 ? (
              <MessageCircle className="w-5 h-5" />
            ) : (
              <MessageCircle className="w-5 h-5" />
            )}
          </button>
        ) : null}
      </div>

      {/* Chat window */}
      {isOpen && (
        <div 
          className={`fixed z-50 ${isMinimized ? 'bottom-6 right-6 w-64 h-12' : 'bottom-6 right-6 w-80 md:w-96 h-96'} 
            bg-gray-900 text-white rounded-lg shadow-xl transition-all duration-300
            ${glitchEffect ? 'animate-glitch' : ''}`}
        >
          {/* Header */}
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

          {/* Messages area - only shown when not minimized */}
          {!isMinimized && (
            <div className="flex-1 p-4 overflow-y-auto h-[calc(100%-104px)]">
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`mb-3 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}
                >
                  <div 
                    className={`inline-block p-2 rounded-lg max-w-[80%] ${
                      message.sender === 'user' 
                        ? 'bg-indigo-600 text-white' 
                        : 'bg-gray-800 text-white'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex space-x-2 p-2 bg-gray-800 text-white rounded-lg inline-block">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-100"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-200"></div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}

          {/* Input area - only shown when not minimized */}
          {!isMinimized && (
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
