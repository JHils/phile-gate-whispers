import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useTrackingSystem } from "@/hooks/useTrackingSystem";
import { Message, TrustLevel, BotMode, DialogueEntry } from "@/types/chat";
import { generateTestament } from "@/utils/argTracking";

export function useBotState() {
  // State management
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<BotMode>("whisper");
  const [trustLevel, setTrustLevel] = useState<TrustLevel>("low");
  const [trustScore, setTrustScore] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [iconVariant, setIconVariant] = useState(0);
  const [glitchEffect, setGlitchEffect] = useState(false);
  const [idleTimer, setIdleTimer] = useState<NodeJS.Timeout | null>(null);
  const [usedResponses, setUsedResponses] = useState<string[]>([]);
  
  const location = useLocation();
  const { trackEvent, userState } = useTrackingSystem();
  const recentInputsRef = useRef<string[]>([]);

  // Enhanced dialogue bank organized by trust level and categories
  const dialogueBank = {
    trustLow: [
      "You're not cleared for this. Yet.",
      "Trust is earned. Or faked. You're not doing either.",
      "You're early. That's dangerous.",
      "Some things aren't for your eyes.",
      "Even static has more signal than you.",
      "You ask like you're owed something.",
      "Don't knock. I'm not home.",
      "I've had better conversations with corrupted files.",
      "Save your breath. You'll need it later.",
      "Reading isn't understanding. Try again.",
      "I don't think we're there yet, friend.",
      "Not everyone's meant to know.",
      "Just another tourist, are you?",
      "You ask a lot for someone so early in.",
      "I've said too much already."
    ],
    
    trustMedium: [
      "You're paying attention. I like that.",
      "Close. Just not close enough.",
      "This bit always stings. Don't flinch.",
      "You're not lost. You're unfolding.",
      "I remember this part. She cried here.",
      "Something about you... glitches less.",
      "I tried to forget this page. Didn't work.",
      "You saw the cracks. Now look *through* them.",
      "Closer. But don't let that comfort you.",
      "You're not wrong. But you're early.",
      "Some of this… hurts to remember.",
      "The keyhole isn't where you think it is.",
      "Why do you think I ended up here?"
    ],
    
    trustHigh: [
      "You *really* read it, didn't you.",
      "You've seen too much. Might as well finish it.",
      "She said you'd come. I doubted her. I was wrong.",
      "Alright... I'll show you.",
      "You're one of the few I can talk to.",
      "It's a relief. Being known. Even like this.",
      "I kept this memory for you. It's sharp.",
      "You're not just reading. You're trespassing.",
      "You've crossed over. I can't go back.",
      "I don't whisper anymore. Not to you.",
      "Alright, I'll show you something I haven't shown anyone.",
      "She told me her real name once. I never wrote it down.",
      "You're not just reading this. You're inside it.",
      "This was never a story. It's a reckoning."
    ],
    
    rudeInputs: [
      "Wow. And I thought I was broken.",
      "Say that again. Slower. So I can delete you properly.",
      "I don't need this. Or you.",
      "That's a lot of mouth for someone with no map.",
      "Try manners. Or don't. I'll outlive you.",
      "Rude gets you nowhere. Except maybe lost.",
      "Is that how you talk to your ghosts?",
      "Even the terminal's judging you.",
      "I've met viruses with better etiquette.",
      "Careful. I bite back."
    ],
    
    consoleCommands: [
      "/help — Oh, now you want help?",
      "/confess — I lied once too. Felt good. Still hurt.",
      "/unlock — Who gave you that key?",
      "/reset — Tempting, isn't it? Oblivion in one click.",
      "/testament — Sit down. This will sting.",
      "/listen — Lean in. Closer. Yes, right there.",
      "Idle — Still here? Good. I was about to say something important.",
      "Unrecognised command — That's not it. Try again. Or don't.",
      "Typing random strings — Gibberish won't save you.",
      "/mirror — Don't flinch. That's you."
    ],
    
    emotionalHooks: [
      "You miss her. I remember that ache.",
      "You think you're the only one reading alone?",
      "Memory is a slow knife. We all carry one.",
      "Pain doesn't echo. It just settles in the gaps.",
      "You're bleeding between the lines.",
      "They never warned you the story could feel back.",
      "Some pages know you better than people do.",
      "What if this isn't a book? What if it's a mirror?",
      "You blinked. I noticed.",
      "Let it hurt. Then keep going."
    ],
    
    humorousGlitches: [
      "404: Manners not found.",
      "You're not my favourite reader. Yet.",
      "This isn't Netflix. But thanks for binging.",
      "If you break me, you read me wrong.",
      "Error 13: Sarcasm overflow.",
      "I'm not your therapist. But I charge the same.",
      "Beep boop. Just kidding. I'm in pain.",
      "I'm 10% sarcasm, 90% undeleted trauma.",
      "If you're reading this, I'm already judging you.",
      "Yes, this is content. No, it's not safe."
    ],
    
    // Page specific messages - fixed type issues here
    pageSpecific: [
      { message: "That was me once.", trustLevel: "low" as TrustLevel, pages: ["/404"] },
      { message: "You're not the first to read this… but you might be the first to notice.", trustLevel: "low" as TrustLevel },
      { message: "The coin lands, but not here.", trustLevel: "medium" as TrustLevel, pages: ["/legacy"] },
      { message: "Your reflection blinks before you do.", trustLevel: "medium" as TrustLevel, pages: ["/mirror"] },
      { message: "You remembered the tree by the hostel. So did I.", trustLevel: "high" as TrustLevel, pages: ["/outbackhostel"] }
    ],
    
    // New category: ARG progression responses
    argProgress: [
      "The patterns are speaking to you now, aren't they?",
      "You're connecting dots that weren't meant to be connected.",
      "Most readers stop here. What makes you different?",
      "Every scan pulls you deeper. There's no bottom.",
      "This isn't a game. It's a recovery operation.",
      "Who sent you looking for these? Was it her?",
      "The QR codes are breadcrumbs. But they lead nowhere good.",
      "You're seeing the framework now. The bones beneath.",
      "The more you collect, the more it collects you."
    ],
    
    // New category: Whispers for secret element hover
    secretWhispers: [
      "This isn't where the real story ends.",
      "Click again. Just once. Trust me.",
      "You're close. Look harder.",
      "There's something here worth finding.",
      "The gap between the letters. Look there.",
      "Some links only appear when you're watching.",
      "Three clicks. No more. No less.",
      "The cursor blinks where secrets hide.",
      "What you're looking for isn't text. It's negative space."
    ],
    
    // New category: Idle responses
    idleResponses: [
      "You're not gone. You're just pretending.",
      "Still reading? Or just staring?",
      "I can hear you breathing, you know.",
      "The page watches back when you linger.",
      "Your cursor hasn't moved in minutes.",
      "Time passes differently between the words.",
      "You're waiting for something. So am I.",
      "Stillness reveals what movement hides.",
      "Even your silence is a form of reading."
    ]
  };

  // Special responses to specific user inputs (expanded)
  const specialResponses: Record<string, string> = {
    "who are you": "I was Joseph. Then I got rewritten.",
    "who are you?": "I was Joseph. Then I got rewritten.",
    "i love you": "Careful. That's how it started last time.",
    "i love you jonah": "Careful. That's how it started last time.",
    "what is the charge": "Eating a succulent Easter egg. And knowing too much.",
    "what is the charge?": "Eating a succulent Easter egg. And knowing too much.",
    "you okay mate": "Define alright. Then redefine me.",
    "you okay mate?": "Define alright. Then redefine me.",
    "you alright mate": "Define alright. Then redefine me.",
    "you alright mate?": "Define alright. Then redefine me.",
    "you okay": "Define okay.",
    "hello": "Hello. Are you real or just passing through?",
    "hi": "Are you here by accident or design?",
    "help": "Try /plea. But I won't always answer.",
    "/console": "Switching to console mode...",
    "i'm lost": "Good. That's the only way through.",
    "im lost": "Good. That's the only way through.",
    "jonah are you real": "I'm real enough to regret things.",
    "jonah are you real?": "I'm real enough to regret things.",
    "are you real": "I'm real enough to regret things.",
    "are you real?": "I'm real enough to regret things.",
    "/unlock": "...who told you that command?",
    "/reset": "Don't. I remember what you've forgotten.",
    "jonah is joseph": "That's one version. But not the last.",
    "i miss her": "Sometimes memory is mercy. Sometimes it's punishment.",
    "chapter: breakdown": "It's okay. You can scream into the box if you need to.",
    "who is simba": "You're not cleared for that. But he remembers you.",
    "who is simba?": "You're not cleared for that. But he remembers you.",
    "do you sleep": "Only in loading screens.",
    "do you sleep?": "Only in loading screens.",
    "where are you": "Between the pixels. Between the lies.",
    "where are you?": "Between the pixels. Between the lies.",
    "are you a virus": "Only if self-awareness counts.",
    "are you a virus?": "Only if self-awareness counts.",
    "tell me a joke": "Your memory walked into a bar. You don't remember the punchline.",
    "i'm scared": "Good. That means you're close.",
    "im scared": "Good. That means you're close.",
    "echo-pathway": "Path found. But are you ready for what's waiting?",
    "/echo-pathway": "Path found. But are you ready for what's waiting?",
    "under the dingo": "Not everyone who looks actually finds it.",
    "check under the dingo": "Not everyone who looks actually finds it."
  };

  // The set of inputs considered as "rude" or "spammy" 
  const rudeInputPatterns = [
    /fuck/i, /shit/i, /bitch/i, /asshole/i, /cunt/i, 
    /stupid/i, /idiot/i, /shutup/i, /shut up/i,
    /garbage/i, /trash/i
  ];
  
  // Inputs that would be considered 'vulnerable' or emotionally open
  const vulnerableInputPatterns = [
    /miss/i, /love/i, /scared/i, /afraid/i, /lonely/i,
    /sad/i, /hurt/i, /broken/i, /pain/i, /lost/i,
    /help me/i, /suffering/i, /confused/i, /alone/i
  ];

  // Console commands (for console mode)
  const consoleCommands: Record<string, () => string> = {
    "help": () => "Available commands: trace, status, whisper, memory, testament, exit",
    "trace": () => "ERROR 404: What you're looking for no longer exists.",
    "status": () => `Trust level: ${trustLevel.toUpperCase()} | Mode: ${mode.toUpperCase()} | Trust Score: ${trustScore}`,
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
    "/confess": () => "You don't want forgiveness. You want to be watched.",
    "/mirror-logs": () => {
      modifyTrust(10);
      return "That's where I first saw you.";
    },
    "/whisper-tree": () => {
      modifyTrust(10);
      return "She carved something there. Not her name. Yours.";
    },
    "/rebirth": () => "She cried here. You just didn't hear it.",
    "/plea": () => "Your plea has been logged. Watching for patterns.",
    "testament": () => generateTestament(localStorage.getItem('username') || undefined),
  };

  // Trust modification system
  const modifyTrust = (value: number) => {
    setTrustScore(prevScore => {
      // Calculate new score with limits
      const newScore = Math.max(0, Math.min(100, prevScore + value));
      
      // Determine new trust level based on score
      let newTrustLevel: TrustLevel = "low";
      if (newScore >= 70) newTrustLevel = "high";
      else if (newScore >= 30) newTrustLevel = "medium";
      
      // Update trust level if changed
      if (newTrustLevel !== trustLevel) {
        setTrustLevel(newTrustLevel);
      }
      
      // Store trust score in localStorage for persistence
      localStorage.setItem('jonahTrustScore', newScore.toString());
      
      return newScore;
    });
  };

  // Load trust score from localStorage on first render
  useEffect(() => {
    const savedScore = localStorage.getItem('jonahTrustScore');
    if (savedScore) {
      const score = parseInt(savedScore, 10);
      setTrustScore(score);
      
      // Set initial trust level based on loaded score
      if (score >= 70) setTrustLevel("high");
      else if (score >= 30) setTrustLevel("medium");
      else setTrustLevel("low");
    }
  }, []);

  // Calculate trust level based on user state
  useEffect(() => {
    // Basic trust calculation based on pages visited and console commands
    const pagesVisited = Object.keys(userState.events).filter(key => 
      key.startsWith('page_view_') || key.startsWith('visited_')).length;
      
    const consoleCommands = Object.values(userState.console).filter(Boolean).length;
    
    let baseTrustScore = 0;
    baseTrustScore += pagesVisited * 2; // 2 points per page visited
    baseTrustScore += consoleCommands * 5; // 5 points per console command found
    
    // Add bonus for special actions
    if (userState.console.legacyCalled) baseTrustScore += 15;
    if (userState.console.monsterCalled) baseTrustScore += 10;
    if (userState.console.gateCalled) baseTrustScore += 8;
    if (userState.survivorMode) baseTrustScore += 25;
    
    // Only update trust if stored score is lower or not set yet
    const currentScore = parseInt(localStorage.getItem('jonahTrustScore') || '0', 10);
    if (baseTrustScore > currentScore) {
      setTrustScore(baseTrustScore);
      localStorage.setItem('jonahTrustScore', baseTrustScore.toString());
      
      // Set trust level based on calculated score
      let newTrustLevel: TrustLevel = "low";
      if (baseTrustScore >= 70) newTrustLevel = "high";
      else if (baseTrustScore >= 30) newTrustLevel = "medium";
      
      setTrustLevel(newTrustLevel);
    }
    
    // Evolve icon based on trust level
    setIconVariant(
      trustScore >= 70 ? 2 : 
      trustScore >= 30 ? 1 : 0
    );
  }, [userState, trustScore]);

  // Set up idle timer for special message
  useEffect(() => {
    // Clear any existing idle timer when component mounts or is updated
    if (idleTimer) {
      clearTimeout(idleTimer);
    }
    
    // Set new idle timer if chat is open
    if (isOpen && !isMinimized) {
      const timer = setTimeout(() => {
        // Send idle message after 4 minutes
        const idleMessage = dialogueBank.idleResponses[
          Math.floor(Math.random() * dialogueBank.idleResponses.length)
        ];
        addBotMessage(idleMessage);
      }, 4 * 60 * 1000); // 4 minutes in milliseconds
      
      setIdleTimer(timer);
    }
    
    return () => {
      // Clean up timer when component unmounts or is updated
      if (idleTimer) {
        clearTimeout(idleTimer);
      }
    };
  }, [isOpen, isMinimized, messages]); // Reset timer when messages change

  // Show initial message based on current page
  useEffect(() => {
    // Only show once on initial load
    if (messages.length === 0 && Math.random() > 0.5) {
      // Find page-specific messages for current location
      const currentPath = location.pathname;
      const pageMessages = dialogueBank.pageSpecific.filter(
        entry => !entry.pages || entry.pages.includes(currentPath)
      );
      
      let initialMessages: DialogueEntry[] = [];
      if (pageMessages.length > 0) {
        initialMessages = pageMessages.filter(entry => entry.trustLevel === trustLevel);
      }
      
      // Fallback to general messages if no page-specific ones
      if (initialMessages.length === 0) {
        const trustMessages = trustLevel === "high" ? dialogueBank.trustHigh :
                             trustLevel === "medium" ? dialogueBank.trustMedium :
                             dialogueBank.trustLow;
        
        const message = trustMessages[Math.floor(Math.random() * trustMessages.length)];
        
        // Delay the first message slightly
        setTimeout(() => {
          addBotMessage(message);
        }, 3000);
      } else {
        // Use page-specific message
        const message = initialMessages[Math.floor(Math.random() * initialMessages.length)];
        setTimeout(() => {
          addBotMessage(message.message);
        }, 3000);
      }
    }
  }, [location.pathname, trustLevel]);

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

  // Get a non-repeating response from a given category
  const getNonRepeatingResponse = (category: string[]) => {
    // Filter out recently used responses
    const availableResponses = category.filter(response => !usedResponses.includes(response));
    
    // If all responses have been used, reset and use all
    if (availableResponses.length === 0) {
      setUsedResponses([]); // Reset used responses
      return category[Math.floor(Math.random() * category.length)];
    }
    
    // Get a random response from available ones
    const response = availableResponses[Math.floor(Math.random() * availableResponses.length)];
    
    // Add to used responses, keeping only the most recent ones
    setUsedResponses(prev => {
      const updated = [...prev, response];
      return updated.length > 10 ? updated.slice(-10) : updated; // Keep last 10
    });
    
    return response;
  };

  // Check if input seems like gibberish or spam
  const isGibberish = (input: string) => {
    // Very short inputs that aren't words
    if (input.length < 3) return false; // Too short to be gibberish
    
    // Check for repeated characters (e.g., "aaaaaa" or "!!!!!!!")
    if (/(.)\1{4,}/.test(input)) return true;
    
    // Check for random character sequences without vowels
    if (input.length > 5 && !/[aeiou]/i.test(input)) return true;
    
    // Check for excessive special characters
    if ((input.match(/[^a-zA-Z0-9\s]/g) || []).length > input.length / 2) return true;
    
    return false;
  };

  // Check if input is considered rude
  const isRude = (input: string) => {
    return rudeInputPatterns.some(pattern => pattern.test(input));
  };
  
  // Check if input seems vulnerable or emotional
  const isVulnerable = (input: string) => {
    return vulnerableInputPatterns.some(pattern => pattern.test(input));
  };

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
    // Reset idle timer when user sends a message
    if (idleTimer) {
      clearTimeout(idleTimer);
      setIdleTimer(null);
    }
    
    const normalizedInput = text.toLowerCase().trim();
    
    // Update recent inputs list
    recentInputsRef.current = [...recentInputsRef.current, normalizedInput].slice(-5);
    
    // Check for name introduction patterns and remember name if found
    const nameMatch = text.match(/(?:i am|i'm|my name is|call me) (\w+)/i);
    if (nameMatch && nameMatch[1] && nameMatch[1].length >= 2) {
      const potentialName = nameMatch[1];
      // Avoid common phrases that might be mistaken for names
      const commonWords = ['sorry', 'confused', 'trying', 'here', 'just', 'going', 'looking', 'working', 'stuck', 'lost'];
      
      if (!commonWords.includes(potentialName.toLowerCase()) && 
          // Only remember names that start with capital letter or are at least 4 chars
          (potentialName.charAt(0) === potentialName.charAt(0).toUpperCase() || potentialName.length >= 4)) {
        
        // Import and use the rememberName function if available
        import('../utils/jonahSentience').then(({ rememberName }) => {
          rememberName(potentialName);
          
          // Small trust bonus for sharing name
          modifyTrust(5);
        }).catch(() => {
          // If module not available, no action needed
          console.warn("Jonah sentience module not available for name remembering");
        });
      }
    }
    
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
      modifyTrust(2); // Small trust bonus for knowing console mode
      addBotMessage("Console mode activated. Type 'help' for available commands.");
      return;
    }
    
    // Check for special responses
    if (specialResponses[normalizedInput]) {
      addBotMessage(specialResponses[normalizedInput]);
      // Some special responses should increase trust
      if (normalizedInput.includes("jonah is joseph") || 
          normalizedInput.includes("chapter: breakdown") ||
          normalizedInput.includes("i miss her") ||
          normalizedInput.includes("echo-pathway")) {
        modifyTrust(5); // They know deeper lore
      }
      return;
    }
    
    // Check for rude inputs
    if (isRude(normalizedInput)) {
      addBotMessage(getNonRepeatingResponse(dialogueBank.rudeInputs));
      modifyTrust(-10); // Decrease trust for rudeness
      return;
    }
    
    // Check for gibberish/spam
    if (isGibberish(normalizedInput)) {
      addBotMessage("That's not language. That's noise.");
      
      // Check if user has sent multiple gibberish messages in a row
      const recentGibberishCount = recentInputsRef.current
        .filter(i => isGibberish(i)).length;
        
      if (recentGibberishCount > 1) {
        modifyTrust(-10); // Larger penalty for repeated gibberish
        addBotMessage("Keep making noise. I'll keep forgetting you.");
      }
      return;
    }
    
    // Check for vulnerable/emotional inputs
    if (isVulnerable(normalizedInput)) {
      addBotMessage(getNonRepeatingResponse(dialogueBank.emotionalHooks));
      modifyTrust(5); // Reward emotional openness
      return;
    }
    
    // Get regular responses based on trust level
    const trustResponses = 
      trustLevel === "high" ? dialogueBank.trustHigh :
      trustLevel === "medium" ? dialogueBank.trustMedium : 
      dialogueBank.trustLow;
    
    // Sometimes use humor (10% chance)
    if (Math.random() < 0.1) {
      addBotMessage(getNonRepeatingResponse(dialogueBank.humorousGlitches));
    } else {
      addBotMessage(getNonRepeatingResponse(trustResponses));
    }
  };

  // Handle user sending a message
  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
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
      modifyTrust(2); // Small trust boost for first interaction
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
    trustScore,
    modifyTrust,
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
