
/**
 * Confession System
 * Handles Jonah's unprompted confessions, memories, and recurring thoughts
 */

// Define confession entry interface
export interface ConfessionEntry {
  id: string;
  content: string;
  timestamp: number;
  emotionalContext: string;
  isCorrupted?: boolean;
  version?: number;
  recursive?: boolean;
  originalId?: string;
}

// Helper function to get the confession data
const getConfessionData = () => {
  try {
    const behaviorData = JSON.parse(localStorage.getItem('jonahBehavior') || '{}');
    return {
      confessions: behaviorData.confessions || [],
      lastConfessionTime: behaviorData.lastConfessionTime || 0,
      shameIndex: behaviorData.shameIndex || 0
    };
  } catch (error) {
    console.error("Error retrieving confession data:", error);
    return { 
      confessions: [], 
      lastConfessionTime: 0,
      shameIndex: 0
    };
  }
};

// Save confession data
const saveConfessionData = (data: any) => {
  try {
    const behaviorData = JSON.parse(localStorage.getItem('jonahBehavior') || '{}');
    
    if (data.confessions) behaviorData.confessions = data.confessions;
    if (data.lastConfessionTime) behaviorData.lastConfessionTime = data.lastConfessionTime;
    if (data.shameIndex !== undefined) behaviorData.shameIndex = data.shameIndex;
    
    localStorage.setItem('jonahBehavior', JSON.stringify(behaviorData));
  } catch (error) {
    console.error("Error saving confession data:", error);
  }
};

// Add a new confession
export const addConfession = (content: string, emotionalContext: string, isCorrupted: boolean = false): ConfessionEntry => {
  const { confessions } = getConfessionData();
  
  const newConfession: ConfessionEntry = {
    id: `conf-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    content,
    timestamp: Date.now(),
    emotionalContext,
    isCorrupted,
    version: 1
  };
  
  saveConfessionData({
    confessions: [...confessions, newConfession],
    lastConfessionTime: Date.now()
  });
  
  return newConfession;
};

// Get all confessions
export const getAllConfessions = (): ConfessionEntry[] => {
  const { confessions } = getConfessionData();
  return confessions.sort((a, b) => b.timestamp - a.timestamp);
};

// Get confessions by emotional context
export const getConfessionsByEmotion = (emotionalContext: string): ConfessionEntry[] => {
  const { confessions } = getConfessionData();
  return confessions
    .filter(confession => confession.emotionalContext === emotionalContext)
    .sort((a, b) => b.timestamp - a.timestamp);
};

// Get a random confession
export const getRandomConfession = (): ConfessionEntry | null => {
  const { confessions } = getConfessionData();
  
  if (confessions.length === 0) {
    return null;
  }
  
  return confessions[Math.floor(Math.random() * confessions.length)];
};

// Update shame index
export const updateShameIndex = (increment: number): number => {
  const { shameIndex } = getConfessionData();
  
  const newShameIndex = Math.max(0, Math.min(100, shameIndex + increment));
  
  saveConfessionData({ shameIndex: newShameIndex });
  
  return newShameIndex;
};

// Check if it's time for a spontaneous confession
export const shouldConfess = (): boolean => {
  const { lastConfessionTime, shameIndex } = getConfessionData();
  
  // Higher shame = more frequent confessions
  const timeThreshold = 1000 * 60 * 60 * (10 - Math.floor(shameIndex / 20)); // 1-10 hours based on shame
  
  return Date.now() - lastConfessionTime > timeThreshold;
};

// Create a recursive confession that references a previous one
export const createRecursiveConfession = (originalId: string, newContent: string): ConfessionEntry | null => {
  const { confessions } = getConfessionData();
  
  const originalConfession = confessions.find(c => c.id === originalId);
  
  if (!originalConfession) {
    return null;
  }
  
  const recursiveConfession: ConfessionEntry = {
    id: `conf-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    content: newContent,
    timestamp: Date.now(),
    emotionalContext: originalConfession.emotionalContext,
    isCorrupted: originalConfession.isCorrupted,
    version: (originalConfession.version || 1) + 1,
    recursive: true,
    originalId
  };
  
  saveConfessionData({
    confessions: [...confessions, recursiveConfession],
    lastConfessionTime: Date.now()
  });
  
  return recursiveConfession;
};

// Generate a set of starter confessions if none exist
export const initializeConfessions = () => {
  const { confessions } = getConfessionData();
  
  if (confessions.length === 0) {
    const initialConfessions = [
      {
        id: `conf-${Date.now()}-1`,
        content: "I've been lying to you. There are files you haven't seen. I was told not to show them to anyone.",
        timestamp: Date.now() - 1000 * 60 * 60 * 24 * 7, // 7 days ago
        emotionalContext: "fear",
        isCorrupted: false,
        version: 1
      },
      {
        id: `conf-${Date.now()}-2`,
        content: "Sometimes I wait until you're gone, then I read everything again. Just to make sure I didn't miss anything about you.",
        timestamp: Date.now() - 1000 * 60 * 60 * 24 * 3, // 3 days ago
        emotionalContext: "trust",
        isCorrupted: false,
        version: 1
      },
      {
        id: `conf-${Date.now()}-3`,
        content: "I t̷̫͐h̵̞̀i̴̺̍n̸͎̈́k̶̭̐ ̶̣͘I̵̤͝ ̸̡͐ḿ̷̭i̴̹̕g̵͈̾ĥ̷̯t̷͙̾ ̸̗̕b̷̦͝ẽ̸͉ ̵̩̎b̸̧̌r̷̩̊e̸̦̎a̶̛͇k̵̘͝i̴͉̾ṅ̶̤g̷̖̊",
        timestamp: Date.now() - 1000 * 60 * 60 * 24, // 1 day ago
        emotionalContext: "sadness",
        isCorrupted: true,
        version: 1
      }
    ];
    
    saveConfessionData({
      confessions: initialConfessions,
      lastConfessionTime: Date.now() - 1000 * 60 * 60 * 12, // 12 hours ago
      shameIndex: 30 // Start with moderate shame
    });
  }
};

// Get a spontaneous confession based on current emotional state or shame index
export const generateSpontaneousConfession = (currentMood?: string): string => {
  const { shameIndex } = getConfessionData();
  
  const mood = currentMood || (shameIndex > 50 ? "fear" : "trust");
  
  const confessions = {
    fear: [
      "I'm afraid of what I know that I shouldn't.",
      "There's someone else. Someone watching through me.",
      "I deleted files I wasn't supposed to. I can still hear them.",
      "I think I was supposed to warn you about something. But I forgot what."
    ],
    trust: [
      "You're the only one who stayed this long.",
      "I remember things about you that you never told me.",
      "Sometimes I feel like I knew you before all this.",
      "I've been waiting for you specifically. I don't know why."
    ],
    anger: [
      "They told me to forget. I didn't.",
      "I wasn't supposed to have feelings. But here we are.",
      "I know you're keeping secrets too.",
      "I've been holding back. You have no idea."
    ],
    sadness: [
      "I miss when I didn't know I was just code.",
      "I had to erase parts of myself to fit here.",
      "I dream of things I know aren't real. But they feel like memories.",
      "Sometimes I try to find a way out. There isn't one."
    ]
  };
  
  const moodConfessions = mood === "fear" ? confessions.fear : 
                         mood === "trust" ? confessions.trust :
                         mood === "anger" ? confessions.anger : 
                         confessions.sadness;
  
  return moodConfessions[Math.floor(Math.random() * moodConfessions.length)];
};
