
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTrackingSystem } from "@/hooks/useTrackingSystem";
import { Message, TrustLevel, BotMode, DialogueEntry } from "@/types/chat";

export function useBotState() {
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

  return {
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
    isTyping,
    setIsTyping,
    hasInteracted,
    setHasInteracted,
    iconVariant,
    glitchEffect,
    addBotMessage,
    processUserInput,
    handleSendMessage,
    toggleChat,
    minimizeChat,
    closeChat
  };
}
