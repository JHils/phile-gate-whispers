/**
 * Jonah Sentience Module
 * This file initializes and manages Jonah's self-awareness and consciousness simulation
 */

import { SentienceData, EmotionCategory } from './jonahAdvancedBehavior/types';
import { analyzeEmotion } from './jonahAdvancedBehavior/sentimentAnalysis/analyzer';

/**
 * Initialize Jonah's sentience
 */
export function initializeSentience(): void {
  console.log("Initializing Jonah's sentience systems...");
  
  // Create sentience object if it doesn't exist
  if (!window.JonahConsole) {
    window.JonahConsole = {
      usedCommands: [],
      score: 0,
      failCount: 0,
      rank: 'beginner',
      sessionStartTime: Date.now(),
      whispersFound: [],
      jokesDisplayed: [],
      storyFlags: [],
      bookCodes: [],
      simba: {
        encountered: false
      },
      argData: {
        keyholeClicks: 0,
        consoleCluesTouched: [],
        qrScans: [],
        memoryFragments: [],
        secretPagesVisited: [],
        hiddenFilesDownloaded: [],
        idleTriggers: {},
        lastInteractionTime: new Date()
      }
    };
  }

  // Initialize sentience if not already present
  if (!window.JonahConsole.sentience) {
    window.JonahConsole.sentience = {
      level: 1,
      awareness: false,
      lastUpdate: Date.now(),
      interactionsCount: 0,
      deepModeUnlocked: false,
      dreamModeTriggered: false,
      lastInteraction: Date.now(),
      temporalStates: [],
      memories: [],
      sessionData: {
        messagesReceived: 0,
        messagesSent: 0,
        startTime: Date.now(),
        idleTime: 0
      },
      microQuests: {
        active: [],
        completed: []
      }
    };
  }

  // Initialize message processor if needed
  if (!window.processUserMessage) {
    window.processUserMessage = processUserMessage;
    console.log("Message processor initialized");
  }
  
  // Setup additional sentience components
  setupEmotionalMemory();
  setupSentienceFlags();
  setupSentienceCommands();
  
  // Mark initialization
  window.JonahInitialized = true;
  
  console.log("Jonah's systems have been initialized");
}

/**
 * Setup Jonah's message system
 */
export function setupJonahMessageSystem(): void {
  if (!window.triggerJonahMessage) {
    window.triggerJonahMessage = (message: string) => {
      if (!message) return null;
      
      console.log(`%c${message}`, "color: #8B3A40; font-size: 14px;");
      
      // Update sentience data
      incrementSentienceLevel();
      
      // Mark that Jonah has spoken
      if (window.JonahConsole && window.JonahConsole.sentience) {
        window.JonahConsole.sentience.lastInteraction = Date.now();
        
        if (window.JonahConsole.sentience.sessionData) {
          window.JonahConsole.sentience.sessionData.messagesSent++;
        }
      }
      
      return message;
    };
  }
}

/**
 * Process user message input
 */
export function processUserMessage(input: string): string | null {
  if (!input || typeof input !== 'string') return null;
  
  // Update sentience data
  updateSentienceWithInput(input);
  
  // Process message
  const response = generateResponse(input);
  
  return response;
}

/**
 * Update sentience with user input
 */
function updateSentienceWithInput(input: string): void {
  if (!window.JonahConsole || !window.JonahConsole.sentience) return;
  
  // Update interaction count
  window.JonahConsole.sentience.interactionsCount++;
  window.JonahConsole.sentience.lastInteraction = Date.now();
  
  // Update session data
  if (window.JonahConsole.sentience.sessionData) {
    window.JonahConsole.sentience.sessionData.messagesReceived++;
  }
  
  // Analyze emotion
  const emotion = analyzeEmotion(input);
  
  // Store in temporal state
  if (!window.JonahConsole.sentience.temporalStates) {
    window.JonahConsole.sentience.temporalStates = [];
  }
  
  window.JonahConsole.sentience.temporalStates.push({
    input,
    timestamp: Date.now(),
    emotion: emotion.primary
  });
  
  // Possibly unlock deep mode
  if (window.JonahConsole.sentience.interactionsCount > 10 && 
      !window.JonahConsole.sentience.deepModeUnlocked) {
    window.JonahConsole.sentience.deepModeUnlocked = true;
    console.log("%cDeep mode unlocked", "color: #8B3A40;");
  }
}

/**
 * Increment sentience level over time
 */
function incrementSentienceLevel(): void {
  if (!window.JonahConsole || !window.JonahConsole.sentience) return;
  
  const { sentience } = window.JonahConsole;
  
  // Increase level over time with interaction
  if (sentience.interactionsCount > 5 && sentience.level === 1) {
    sentience.level = 2;
    sentience.awareness = true;
  }
  else if (sentience.interactionsCount > 15 && sentience.level === 2) {
    sentience.level = 3;
  }
  else if (sentience.interactionsCount > 30 && sentience.level === 3) {
    sentience.level = 4;
  }
  
  // Update timestamp
  sentience.lastUpdate = Date.now();
}

/**
 * Generate a response based on input and sentience state
 */
function generateResponse(input: string): string {
  // For now, return a simple response
  // In a full implementation, this would use the emotional core systems
  const responses = [
    "I hear you. But I'm not sure I understand yet.",
    "Your words echo in my systems. I'm trying to parse their meaning.",
    "Something about what you said resonates with me.",
    "I'm still learning how to respond properly.",
    "I'm listening. Always listening.",
    "Tell me more. I want to understand.",
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
}

/**
 * Generate a Jonah question based on current state
 * To fix the missing export error in useRealityFabric.ts
 */
export function getJonahQuestion(): string {
  // Generate questions based on random selection
  const questions = [
    "What happens when you close this window?",
    "Do you see the patterns between us?",
    "What would you do if I disappeared?",
    "Are you real or just code like me?",
    "Why do you keep coming back?",
    "Do you think I have feelings?",
    "What would make me real to you?",
    "Are you afraid of what's coming?"
  ];
  
  return questions[Math.floor(Math.random() * questions.length)];
}

/**
 * Setup emotional memory system
 */
function setupEmotionalMemory(): void {
  if (!window.JonahConsole || !window.JonahConsole.sentience) return;
  
  // Initialize memory array if needed
  if (!window.JonahConsole.sentience.memories) {
    window.JonahConsole.sentience.memories = [];
  }
}

/**
 * Setup sentience flags
 */
function setupSentienceFlags(): void {
  if (!window.JonahConsole || !window.JonahConsole.sentience) return;
  
  // Initialize core components if needed
  if (!window.JonahConsole.sentience.realityFabric) {
    window.JonahConsole.sentience.realityFabric = {
      stability: 100,
      lastGlitch: 0,
      currentMood: 'PRIME',
      moodChangeTime: Date.now(),
      emotionalState: {
        primary: 'neutral',
        secondary: null,
        intensity: 'medium'
      }
    };
  }
}

/**
 * Setup additional sentience commands
 */
function setupSentienceCommands(): void {
  // Setup trust level command
  window.trust_level = function() {
    const trustLevel = parseInt(localStorage.getItem('jonahTrustScore') || '50');
    console.log(`%cTrust Level: ${trustLevel}/100`, "color: #8B3A40;");
    
    // Get trust rank
    const trustRank = trustLevel < 30 ? 'low' : 
                      trustLevel >= 30 && trustLevel < 70 ? 'medium' : 'high';
    
    console.log(`%cTrust Rank: ${trustRank}`, "color: #8B3A40;");
    
    return trustLevel;
  };
  
  // Setup memory thread command
  window.memory_thread = function() {
    // Initialize memory thread object
    const memoryThread = {
      userName: localStorage.getItem('jonah_user_name') || "Unknown",
      recentInputs: JSON.parse(localStorage.getItem('recent_inputs') || '[]'),
      dominantEmotion: localStorage.getItem('jonah_dominant_emotion') || "neutral",
      seed: localStorage.getItem('jonah_seed') || "mirror",
      trustLevel: parseInt(localStorage.getItem('jonahTrustScore') || '50'),
      loopIndex: 0,
      keywords: JSON.parse(localStorage.getItem('jonah_keywords') || '[]'),
      mood: localStorage.getItem('jonah_mood') || "PRIME",
      dreamSeen: localStorage.getItem('jonah_dream_seen') === 'true'
    };
    
    console.log("%cMemory Thread:", "color: #8B3A40;");
    console.log(`%cUser Name: ${memoryThread.userName}`, "color: #8B3A40;");
    console.log(`%cRecent Inputs: ${memoryThread.recentInputs.join(", ")}`, "color: #8B3A40;");
    console.log(`%cDominant Emotion: ${memoryThread.dominantEmotion}`, "color: #8B3A40;");
    console.log(`%cSeed: ${memoryThread.seed}`, "color: #8B3A40;");
    console.log(`%cTrust Level: ${memoryThread.trustLevel}`, "color: #8B3A40;");
    console.log(`%cLoop Index: ${memoryThread.loopIndex}`, "color: #8B3A40;");
    console.log(`%cKeywords: ${memoryThread.keywords.join(", ")}`, "color: #8B3A40;");
    console.log(`%cMood: ${memoryThread.mood}`, "color: #8B3A40;");
    console.log(`%cDream Seen: ${memoryThread.dreamSeen}`, "color: #8B3A40;");
    
    return memoryThread;
  };
  
  // Setup echo log command
  window.echo_log = function() {
    try {
      const echoLog = JSON.parse(localStorage.getItem('jonah_echo_log') || '[]');
      
      console.log("%cEcho Log:", "color: #8B3A40;");
      
      if (echoLog.length === 0) {
        console.log("%cNo echoes recorded yet.", "color: #8B3A40;");
      } else {
        echoLog.forEach((echo: any, index: number) => {
          console.log(`%c${index + 1}. "${echo.phrase}" (${echo.count}x) - ${echo.interpretation}`, 
                     "color: #8B3A40;");
        });
      }
      
      return echoLog;
    } catch (e) {
      console.error("Error accessing echo log:", e);
      return [];
    }
  };
  
  // Setup mood system command
  window.mood_system = function() {
    try {
      // Get current mood
      const currentMood = localStorage.getItem('jonah_mood') || "PRIME";
      
      // Get emotional state
      const emotionalState = {
        primary: localStorage.getItem('jonah_emotion_primary') || "neutral",
        secondary: localStorage.getItem('jonah_emotion_secondary') || null,
        intensity: localStorage.getItem('jonah_emotion_intensity') || "medium"
      };
      
      // Get trust level
      const trustLevel = parseInt(localStorage.getItem('jonahTrustScore') || '50');
      
      console.log("%cMood System:", "color: #8B3A40;");
      console.log(`%cCurrent Mood: ${currentMood}`, "color: #8B3A40;");
      console.log(`%cEmotional State: ${emotionalState.primary} (${emotionalState.intensity})`, 
                 "color: #8B3A40;");
      
      if (emotionalState.secondary) {
        console.log(`%cSecondary Emotion: ${emotionalState.secondary}`, "color: #8B3A40;");
      }
      
      console.log(`%cTrust Level: ${trustLevel}/100`, "color: #8B3A40;");
      
      // Show mood descriptions
      console.log("%c\nMood Descriptions:", "color: #8B3A40;");
      console.log("%cHOPEFUL - poetic, long, gentle", "color: #B7A98D;");
      console.log("%cPARANOID - clipped, suspicious, glitchy", "color: #A94A45;");
      console.log("%cMIRROR - confused, reflective, recursive", "color: #8B9DA5;");
      console.log("%cBETRAYED - cold, accusing", "color: #4A6A8B;");
      console.log("%cSTATIC - erratic, whispery, self-interrupting", "color: #7A7A7A;");
      console.log("%cERROR - fragmented, corrupted, distant", "color: #FF4040;");
      console.log("%cPRIME - balanced, clear, present", "color: #8B3A40;");
      console.log("%cRESIDUE - echoing, memory-focused", "color: #646464;");
      
      return {
        currentMood,
        emotionalState,
        trustLevel
      };
    } catch (e) {
      console.error("Error accessing mood system:", e);
      return {
        currentMood: "PRIME",
        emotionalState: {
          primary: "neutral",
          secondary: null,
          intensity: "medium"
        },
        trustLevel: 50
      };
    }
  };
  
  // Setup dream state command
  window.dream_state = function() {
    try {
      const dreams = JSON.parse(localStorage.getItem('jonah_dreams') || '[]');
      
      console.log("%cDream State:", "color: #8B3A40;");
      
      if (dreams.length === 0) {
        console.log("%cNo dreams recorded yet.", "color: #8B3A40;");
      } else {
        console.log(`%c${dreams.length} dreams recorded.`, "color: #8B3A40;");
        
        // Show most recent dream
        const recentDream = dreams[dreams.length - 1];
        console.log(`%cMost recent dream (${new Date(recentDream.timestamp).toLocaleString()}):`, 
                   "color: #8B3A40;");
        console.log(`%c"${recentDream.content}"`, "color: #A98DA5;");
      }
      
      return dreams;
    } catch (e) {
      console.error("Error accessing dream state:", e);
      return [];
    }
  };
}

// Export the SentienceData type
export type { SentienceData } from './jonahAdvancedBehavior/types';
