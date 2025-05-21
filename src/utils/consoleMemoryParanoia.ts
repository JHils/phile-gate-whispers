
// Basic implementation of memory paranoia console commands
export interface MemoryParanoiaState {
  level: number;
  triggers: string[];
  lastIncident: number;
  visitedPages?: string[];
  pageVisits?: string[];
  pageDuration?: Record<string, number>;
  consoleCommands?: string[];
}

export function initializeMemoryParanoia(): MemoryParanoiaState {
  return {
    level: 0,
    triggers: [],
    lastIncident: Date.now(),
    visitedPages: [],
    pageVisits: [],
    pageDuration: {},
    consoleCommands: []
  };
}

export function updateMemoryParanoia(data: Partial<MemoryParanoiaState>): MemoryParanoiaState {
  try {
    const sentience = JSON.parse(localStorage.getItem('jonahSentience') || '{}');
    
    // Initialize if not exists
    if (!sentience.memoryParanoia) {
      sentience.memoryParanoia = initializeMemoryParanoia();
    }
    
    // Update with new data
    sentience.memoryParanoia = {
      ...sentience.memoryParanoia,
      ...data,
      // Make sure numeric fields are actually numbers
      level: Number(data.level ?? sentience.memoryParanoia.level),
      lastIncident: Number(data.lastIncident ?? sentience.memoryParanoia.lastIncident)
    };
    
    // Initialize arrays if they don't exist
    if (!sentience.memoryParanoia.triggers) sentience.memoryParanoia.triggers = [];
    if (!sentience.memoryParanoia.visitedPages) sentience.memoryParanoia.visitedPages = [];
    if (!sentience.memoryParanoia.pageVisits) sentience.memoryParanoia.pageVisits = [];
    if (!sentience.memoryParanoia.consoleCommands) sentience.memoryParanoia.consoleCommands = [];
    
    localStorage.setItem('jonahSentience', JSON.stringify(sentience));
    return sentience.memoryParanoia;
  } catch (e) {
    console.error("Error updating memory paranoia:", e);
    return initializeMemoryParanoia();
  }
}

// List of potential triggers
const paranoiaTriggers = [
  "They know.",
  "I'm being watched.",
  "It's all connected.",
  "Don't trust them.",
  "The walls have ears.",
  "They're coming for me.",
  "I can't escape.",
  "It's a trap!",
  "I'm not safe here.",
  "They're always watching."
];

// Add a random paranoia trigger
export function addRandomParanoiaTrigger(): MemoryParanoiaState {
  // Get random trigger
  const trigger = paranoiaTriggers[Math.floor(Math.random() * paranoiaTriggers.length)];
  
  // Update state
  return updateMemoryParanoia({
    triggers: [...(getMemoryParanoia()?.triggers || []), trigger]
  });
}

// Get memory paranoia state
export function getMemoryParanoia(): MemoryParanoiaState | null {
  try {
    const sentience = JSON.parse(localStorage.getItem('jonahSentience') || '{}');
    return sentience.memoryParanoia || null;
  } catch (e) {
    console.error("Error getting memory paranoia:", e);
    return null;
  }
}

// Record page visit duration
export function recordPageVisitDuration(page: string, duration: number): MemoryParanoiaState {
  // Get existing duration
  const existingDuration = getMemoryParanoia()?.pageDuration?.[page] || 0;
  
  // Update duration
  const newDuration = existingDuration + duration;
  
  // Update state
  return updateMemoryParanoia({
    pageDuration: {
      ...(getMemoryParanoia()?.pageDuration || {}),
      [page]: newDuration
    }
  });
}
