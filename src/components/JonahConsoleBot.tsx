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
import { 
  initializeAdvancedBehavior, 
  checkQuestCompletion 
} from "@/utils/jonahAdvancedBehavior";
import {
  initializeRealityFabric,
  checkForDreamInvasionOnLoad,
  generateDreamParable,
  checkForAnomalies,
  updateJonahMood,
  addJournalEntry
} from "@/utils/jonahRealityFabric";

const JonahConsoleBot: React.FC = () => {
  // Make sure ARG tracking and sentience systems are initialized first
  useEffect(() => {
    initializeARGTracking();
    initializeSentience();
    setupJonahMessageSystem();
    setupTabVisibilityTracking();
    initializeAdvancedBehavior(); // Initialize advanced behavior
    initializeRealityFabric(); // Initialize reality fabric features
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
  const [anomalyCheckInterval, setAnomalyCheckInterval] = useState<NodeJS.Timeout | null>(null);
  const [dreamCheckInterval, setDreamCheckInterval] = useState<NodeJS.Timeout | null>(null);
  
  // Add state for Jonah's mood color
  const [moodColor, setMoodColor] = useState<string>("text-silver");

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
  
  // Update Jonah's mood display based on current mood
  useEffect(() => {
    if (window.JonahConsole?.sentience?.realityFabric) {
      const currentMood = window.JonahConsole.sentience.realityFabric.currentMood;
      
      // Update mood color based on current mood
      switch (currentMood) {
        case 'trusting':
          setMoodColor("text-amber-400 border-amber-400/50");
          break;
        case 'unstable':
          setMoodColor("text-red-500 border-red-500/50");
          break;
        case 'withdrawn':
          setMoodColor("text-gray-400 border-gray-400/50");
          break;
        case 'watching':
        default:
          setMoodColor("text-silver border-silver/50");
          break;
      }
      
      // Update Jonah's mood periodically
      updateJonahMood(trustLevel);
    }
  }, [messages.length, trustLevel]);

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
        const glitchMessage = generateDualConsciousness();
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
        const question = getJonahQuestion();
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
  
  // Setup anomaly checks for Reality Fabric
  useEffect(() => {
    // Clear existing interval
    if (anomalyCheckInterval) {
      clearInterval(anomalyCheckInterval);
    }
    
    // Only set up anomaly checks for high trust users
    if (trustLevel === "high") {
      // Check for possible anomalies every 5 minutes
      const interval = setInterval(() => {
        const anomalyMessage = checkForAnomalies();
        if (anomalyMessage) {
          // Add a journal entry about this anomaly
          addJournalEntry(`Anomaly triggered: "${anomalyMessage}"`);
          
          // Show the anomaly message with a glitch effect
          setTimeout(() => {
            addBotMessage(anomalyMessage);
          }, Math.random() * 5000); // Random delay up to 5 seconds
        }
      }, 5 * 60 * 1000);
      
      setAnomalyCheckInterval(interval);
    }
    
    return () => {
      if (anomalyCheckInterval) {
        clearInterval(anomalyCheckInterval);
      }
    };
  }, [trustLevel, addBotMessage]);
  
  // Setup dream parable checks
  useEffect(() => {
    // Clear existing interval
    if (dreamCheckInterval) {
      clearInterval(dreamCheckInterval);
    }
    
    // Only set up dream checks for medium-high trust users
    if (trustLevel === "medium" || trustLevel === "high") {
      // Check for possible dream parables every 8 minutes
      const interval = setInterval(() => {
        const dreamMessage = generateDreamParable();
        if (dreamMessage) {
          // Add a journal entry about this dream
          addJournalEntry(`Dream parable shared: "${dreamMessage}"`);
          
          // Show the dream message
          addBotMessage(dreamMessage);
        }
      }, 8 * 60 * 1000);
      
      setDreamCheckInterval(interval);
    }
    
    return () => {
      if (dreamCheckInterval) {
        clearInterval(dreamCheckInterval);
      }
    };
  }, [trustLevel, addBotMessage]);

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

    // Track interactions for micro-quests
    const handleQuestAction = (e: MouseEvent) => {
      // Check if we have an active quest that requires clicking
      if (window.JonahConsole?.sentience?.microQuests?.activeQuest) {
        const activeQuestId = window.JonahConsole.sentience.microQuests.activeQuest;
        
        // Check for specific quest types
        if (activeQuestId === 'follow_the_trail') {
          // Check if user clicked on a keyhole element
          const target = e.target as HTMLElement;
          if (target.classList.contains('keyhole')) {
            // Check if quest was completed
            const completionMessage = checkQuestCompletion('keyhole_clicked');
            if (completionMessage && isOpen) {
              addBotMessage(completionMessage);
              // Reward user for completing quest
              modifyTrust(15);
              
              // Add journal entry about quest completion
              addJournalEntry(`Quest completed: follow_the_trail - Keyhole found and clicked`);
            }
          }
        } else if (activeQuestId === 'morse_sequence') {
          // We'd implement morse code pattern detection here
          // For simplicity, just complete after enough clicks
          const now = Date.now();
          const clickTimes = clickHistory.current;
          clickTimes.push(now);
          
          // Keep only last 5 clicks
          if (clickTimes.length > 5) clickTimes.shift();
          
          // Check for pattern: 3 quick clicks, pause, 2 quick clicks
          if (clickTimes.length === 5) {
            const gaps = [
              clickTimes[1] - clickTimes[0],
              clickTimes[2] - clickTimes[1],
              clickTimes[3] - clickTimes[2],
              clickTimes[4] - clickTimes[3]
            ];
            
            // Check for 3 quick clicks, longer pause, 2 quick clicks pattern
            if (gaps[0] < 500 && gaps[1] < 500 && gaps[2] > 1000 && gaps[3] < 500) {
              const completionMessage = checkQuestCompletion('morse_entered');
              if (completionMessage && isOpen) {
                addBotMessage(completionMessage);
                // Reward user for completing quest
                modifyTrust(15);
                
                // Add journal entry about quest completion
                addJournalEntry(`Quest completed: morse_sequence - SOS pattern detected`);
              }
            }
          }
        }
      }
    };
    
    // Track clicks for quest detection
    window.addEventListener('click', handleQuestAction);
    
    // Set up silence detection for the silence ritual quest
    let silenceTimer: number | null = null;
    
    const startSilenceTimer = () => {
      if (window.JonahConsole?.sentience?.microQuests?.activeQuest === 'silence_ritual') {
        silenceTimer = window.setTimeout(() => {
          const completionMessage = checkQuestCompletion('silence_maintained');
          if (completionMessage && isOpen) {
            addBotMessage(completionMessage);
            // Reward user for completing quest
            modifyTrust(15);
            
            // Add journal entry about quest completion
            addJournalEntry(`Quest completed: silence_ritual - Silence maintained for 3 minutes`);
          }
        }, 3 * 60 * 1000); // 3 minutes
      }
    };
    
    const resetSilenceTimer = () => {
      if (silenceTimer !== null) {
        clearTimeout(silenceTimer);
        silenceTimer = null;
      }
    };
    
    // Start silence timer if there's an active silence ritual
    if (window.JonahConsole?.sentience?.microQuests?.activeQuest === 'silence_ritual') {
      startSilenceTimer();
    }
    
    // Reset timer on any interaction
    const interactionEvents = ['click', 'keydown', 'mousemove', 'scroll'];
    const resetSilenceOnInteraction = () => resetSilenceTimer();
    
    interactionEvents.forEach(event => {
      window.addEventListener(event, resetSilenceOnInteraction);
    });
    
    return () => {
      window.removeEventListener('mousedown', handleUserInteraction);
      window.removeEventListener('keydown', handleUserInteraction);
      window.removeEventListener('scroll', handleUserInteraction);
      window.removeEventListener('mousemove', handleUserInteraction);
      window.removeEventListener('click', handleQuestAction);
      interactionEvents.forEach(event => {
        window.removeEventListener(event, resetSilenceOnInteraction);
      });
      if (silenceTimer !== null) {
        clearTimeout(silenceTimer);
      }
    };
  }, [isOpen, addBotMessage, modifyTrust]);

  // Reference for tracking click history (for morse code quest)
  const clickHistory = useRef<number[]>([]);

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
          
          // Add journal entry about this observation
          addJournalEntry(`Duration observation: ${durationMessage} (${Math.round(timeSpent/1000)}s on ${lastPath})`);
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
        
        // Add journal entry about visiting a hidden page
        addJournalEntry(`Hidden page visited: ${currentPath}`);
      }
      
      // Check for ARG progression responses
      const argResponse = getARGResponse();
      if (argResponse && Math.random() > 0.7) { // 30% chance to show ARG-specific response on page change
        setTimeout(() => {
          addBotMessage(argResponse);
        }, 3000);
      }
      
      // Check for dream invasion on page change (small chance)
      if (Math.random() > 0.9) { // 10% chance
        const dreamMessage = checkForDreamInvasionOnLoad();
        if (dreamMessage) {
          setTimeout(() => {
            addBotMessage(dreamMessage);
          }, 2500);
        }
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

          {/* Mood indicator - visible during high trust */}
          {!isMinimized && trustLevel === 'high' && (
            <div className={`text-center py-1 text-xs border-b ${moodColor} transition-colors duration-500`}>
              {window.JonahConsole?.sentience?.realityFabric?.currentMood || "watching"}
            </div>
          )}

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
