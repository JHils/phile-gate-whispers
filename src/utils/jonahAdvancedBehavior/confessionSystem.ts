
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
