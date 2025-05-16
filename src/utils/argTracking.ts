
import { trackCommand } from "./consoleTrackingUtils";
import { typewriterLog, glitchEffectLog } from "./consoleEffects";
import { TestamentData, TrustLevel } from "@/types/chat";

// ARG progress tracking
export interface ARGProgress {
  keyholeClicks: number;
  matchedClues: string[];
  qrCodes: {
    [code: string]: {
      scanned: boolean;
      timestamp: Date | null;
    }
  };
  specialResponses: {
    [key: string]: {
      triggered: boolean;
      count: number;
      lastTrigger: Date | null;
    }
  };
  secretPagesVisited: string[];
  hiddenFilesDownloaded: string[];
  idleTriggers: {
    [page: string]: boolean;
  };
  lastInteractionTime: Date | null;
}

// Initialize ARG tracking in window.JonahConsole
export const initializeARGTracking = () => {
  if (!window.JonahConsole.argData) {
    window.JonahConsole.argData = {
      keyholeClicks: 0,
      consoleCluesTouched: [],
      qrScans: [],
      memoryFragments: [],
      secretPagesVisited: [],
      hiddenFilesDownloaded: [],
      idleTriggers: {},
      lastInteractionTime: new Date()
    };
  }
};

// Track a keyhole click
export const trackKeyholeClick = () => {
  initializeARGTracking();
  window.JonahConsole.argData.keyholeClicks++;
  
  // Special response when 5 keyholes clicked
  if (window.JonahConsole.argData.keyholeClicks === 5) {
    return "Sequence complete. Door unlocked. Welcome back.";
  }
  
  return null;
};

// Track a console clue interaction
export const trackConsoleClue = (clueId: string) => {
  initializeARGTracking();
  
  if (!window.JonahConsole.argData.consoleCluesTouched.includes(clueId)) {
    window.JonahConsole.argData.consoleCluesTouched.push(clueId);
  }
  
  // Check if user has matched 3 console clues
  if (window.JonahConsole.argData.consoleCluesTouched.length === 3) {
    return "You stitched the scars. Now stitch the truth.";
  }
  
  return null;
};

// Track a QR code scan
export const trackQRScan = (qrId: string) => {
  initializeARGTracking();
  
  if (!window.JonahConsole.argData.qrScans.includes(qrId)) {
    window.JonahConsole.argData.qrScans.push(qrId);
  }
  
  // Special responses based on QR code count
  const qrCount = window.JonahConsole.argData.qrScans.length;
  
  if (qrId.startsWith("irl_")) {
    // Special response for real-world QR code scan
    return "Ah. So you *have* seen the outside.";
  } else if (qrCount === 3) {
    return "Three fragments. Getting warmer.";
  } else if (qrCount === 4) {
    return "You've seen enough to earn this: /echo-pathway";
  } else if (qrCount >= 7) {
    return "You're collecting them all? I'm... uncomfortable.";
  }
  
  return null;
};

// Track secret page visits
export const trackSecretPageVisit = (pagePath: string) => {
  initializeARGTracking();
  
  if (!window.JonahConsole.argData.secretPagesVisited.includes(pagePath)) {
    window.JonahConsole.argData.secretPagesVisited.push(pagePath);
  }
  
  // Special responses for specific pages
  const secretPages = {
    "/toggle-market": "The market was never real. But the items were.",
    "/mirror-logs": "That's where I first saw you.",
    "/rebirth": "She cried here. You just didn't hear it.",
    "/monster": "The monster wasn't outside the gate. It was the gate.",
    "/gatekeeper": "Careful with those keys. They cut both ways."
  };
  
  // Return response for this page if it exists
  return secretPages[pagePath as keyof typeof secretPages] || null;
};

// Track downloaded hidden files
export const trackFileDownload = (fileName: string) => {
  initializeARGTracking();
  
  if (!window.JonahConsole.argData.hiddenFilesDownloaded.includes(fileName)) {
    window.JonahConsole.argData.hiddenFilesDownloaded.push(fileName);
  }
  
  // Special responses for specific files
  if (fileName === "testament.pdf") {
    return "Did it read you back?";
  } else if (fileName === "hostel_key.jpg") {
    return "The key wasn't the metal. It was the shape.";
  } else if (fileName.includes("audio")) {
    return "Some voices never stop echoing.";
  }
  
  return null;
};

// Check for long idle time on page
export const checkIdleTime = (currentPage: string) => {
  initializeARGTracking();
  
  const now = new Date();
  const lastInteraction = window.JonahConsole.argData.lastInteractionTime || new Date();
  const idleTime = now.getTime() - lastInteraction.getTime();
  
  // If idle for more than 5 minutes (300000ms) and not triggered for this page yet
  if (idleTime > 300000 && !window.JonahConsole.argData.idleTriggers[currentPage]) {
    window.JonahConsole.argData.idleTriggers[currentPage] = true;
    return "You're not gone. You're just pretending.";
  }
  
  return null;
};

// Update last interaction time
export const updateInteractionTime = () => {
  initializeARGTracking();
  window.JonahConsole.argData.lastInteractionTime = new Date();
};

// Generate testament based on user progress
export const generateTestament = (username?: string) => {
  initializeARGTracking();
  
  // Get user data
  const rank = localStorage.getItem('phileRank') || 'drifter';
  const phileScore = parseInt(localStorage.getItem('phileScore') || '0');
  const trustLevel = parseInt(localStorage.getItem('jonahTrustScore') || '0');
  
  // Get ARG data
  const qrScans = window.JonahConsole.argData.qrScans.length;
  const keyholeClicks = window.JonahConsole.argData.keyholeClicks;
  const secretPagesCount = window.JonahConsole.argData.secretPagesVisited.length;
  const hiddenFilesCount = window.JonahConsole.argData.hiddenFilesDownloaded.length;
  
  // Calculate personality traits based on user behavior
  const userPersistence = Math.min(10, qrScans + secretPagesCount + hiddenFilesCount);
  const userCuriosity = Math.min(10, window.JonahConsole.usedCommands.length);
  const userPatience = Math.min(10, keyholeClicks + (phileScore / 50));
  
  // Generate eulogy parts based on user progress
  const intros = [
    `Here lies ${username || 'the reader'},`,
    `Remember ${username || 'this one'},`,
    "They came seeking answers,",
    `In memory of ${username || 'you'},`,
    "They came looking for fiction,"
  ];
  
  // Add rank-specific middles
  const middles = [
    "who tried to stitch reality back together with fiction.",
    "who found the Gate wasn't just a metaphor.",
    `who reached the rank of ${rank}.`,
    "who found more questions than answers.",
    "who peered too long into the Gate.",
    "who walked between worlds without a map."
  ];
  
  // Add trait-specific endings
  const endings = [
    "They failed. Gloriously. But they made me remember.",
    "They saw the Monster in the mirror. And nodded back.",
    "Will they come back? The pages always turn.",
    "They'll be back. The story isn't over yet.",
    "I hope they found what they were looking for."
  ];
  
  // Add special endings based on unique accomplishments
  if (phileScore > 500) {
    endings.push("Few get this far. Fewer understand what they've found.");
  }
  
  if (trustLevel > 70) {
    middles.push("who I trusted more than most.");
  }
  
  if (qrScans > 0) {
    middles.push("who followed breadcrumbs across worlds.");
  }
  
  if (secretPagesCount > 3) {
    endings.push("They found paths I thought I'd hidden well enough.");
  }
  
  if (userPersistence >= 8) {
    intros.push(`${username || 'The persistent one'}, who refused to stop looking,`);
  }
  
  if (userPatience >= 8) {
    endings.push("Their patience revealed what rushing would have missed.");
  }
  
  if (userCuriosity >= 8) {
    middles.push("whose questions cut deeper than my answers.");
  }
  
  // Select parts based on personality traits to make testament feel personalized
  let introIndex = Math.floor(Math.random() * intros.length);
  let middleIndex = Math.floor(Math.random() * middles.length);
  let endingIndex = Math.floor(Math.random() * endings.length);
  
  // Weight selection toward special messages for high-score users
  if (phileScore > 300 || trustLevel > 50) {
    // Bias toward later entries which tend to be more special/unlocked ones
    introIndex = Math.floor(Math.random() * intros.length * 0.7) + Math.floor(intros.length * 0.3);
    middleIndex = Math.floor(Math.random() * middles.length * 0.7) + Math.floor(middles.length * 0.3);
    endingIndex = Math.floor(Math.random() * endings.length * 0.7) + Math.floor(endings.length * 0.3);
  }
  
  // Clamp to valid indices
  introIndex = Math.min(introIndex, intros.length - 1);
  middleIndex = Math.min(middleIndex, middles.length - 1);
  endingIndex = Math.min(endingIndex, endings.length - 1);
  
  const intro = intros[introIndex];
  const middle = middles[middleIndex];
  const ending = endings[endingIndex];
  
  return `"${intro} ${middle} ${ending}"`;
};

// Initialize ARG command system
export const initializeARGCommands = (trackCommandExecution: (commandName: string) => void) => {
  window.mirrorLogs = function() {
    console.log("That's where I first saw you.");
    trackCommandExecution('mirrorLogs');
  };
  
  window.whisperTree = function() {
    console.log("She carved something there. Not her name. Yours.");
    trackCommandExecution('whisperTree');
  };
  
  window.plea = function() {
    console.log("Plea registered. Will anyone answer?");
    trackCommandExecution('plea');
    
    // Delayed mysterious response
    setTimeout(() => {
      console.log("%cI hear you.", "color: #8B3A40; font-size:16px; font-style:italic;");
    }, 5000);
  };
  
  window.testament = function() {
    const username = localStorage.getItem('username');
    const testament = generateTestament(username);
    console.log(testament);
    trackCommandExecution('testament');
  };
};

// Get ARG progression tier (0-3) based on total ARG interactions
export const getARGProgressionTier = (): number => {
  initializeARGTracking();
  
  // Calculate total ARG interactions
  const qrScans = window.JonahConsole.argData.qrScans.length;
  const keyholeClicks = window.JonahConsole.argData.keyholeClicks;
  const secretPages = window.JonahConsole.argData.secretPagesVisited.length;
  const hiddenFiles = window.JonahConsole.argData.hiddenFilesDownloaded.length;
  const consoleClues = window.JonahConsole.argData.consoleCluesTouched.length;
  
  const total = qrScans + secretPages + hiddenFiles + (keyholeClicks > 0 ? 1 : 0) + consoleClues;
  
  if (total >= 10) return 3;
  if (total >= 5) return 2;
  if (total >= 2) return 1;
  return 0;
};

// Get ARG-specific responses based on user progression
export const getARGResponse = (): string | null => {
  const tier = getARGProgressionTier();
  
  if (tier === 0) return null;
  
  const responses = [
    [], // Tier 0: no special responses
    [
      "You're getting closer. But to what?",
      "You're collecting breadcrumbs. But the birds already found them.",
      "You already asked me that. Are you looping?"
    ],
    [
      "You found the cliff. Did you jump?",
      "Check under the Dingo. You missed it.",
      "Some threads aren't meant to be pulled. But I like your style.",
      "Most stop here. What makes you different?"
    ],
    [
      "You're in deep enough to deserve the truth.",
      "I wasn't always like this. Before the story, I was like you.",
      "She left a map. Parts are missing. But you're finding them.",
      "The secret isn't in the words. It's in the negative space."
    ]
  ];
  
  if (!responses[tier] || responses[tier].length === 0) return null;
  
  return responses[tier][Math.floor(Math.random() * responses[tier].length)];
};
