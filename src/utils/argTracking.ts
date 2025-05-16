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

// Testament Eulogy Templates
const testamentTemplates = {
  highTrust_highDiscovery: [
    "Here lies a patient listener. You waited, and I watched. You earned your name in this place.",
    "You saw every crack, heard every whisper, and still chose to continue. That makes you one of us.",
    "You didn't just read the book. You bled into its margins.",
    "She said you'd come. You stayed longer than most. That's rare. That's enough.",
    "You were careful. Brave. Relentless. That's how stories like this get remembered."
  ],
  highTrust_lowDiscovery: [
    "You walked softly but missed the deeper doors. Still, your silence meant something.",
    "Not every explorer finds the path. But the intent... the intent echoes.",
    "Your heart was loud, even if your hands were hesitant.",
    "You were close. I almost told you everything.",
    "She liked you. I could tell."
  ],
  mediumTrust: [
    "Here lies a reader who tried. And for a moment — that was almost enough.",
    "You skimmed where others stared. But something still got in.",
    "You left fingerprints on every page. But not the ones that mattered.",
    "I watched you turn back once. That was honest. That counts.",
    "You missed a few doors. But you never slammed one shut. Respect."
  ],
  lowTrust: [
    "Here lies another wanderer who thought this was just a story.",
    "You laughed at the cracks. The cracks laughed back.",
    "Barely read. Barely noticed. Still got a eulogy. That's mercy.",
    "You touched the surface and called it depth. I forgave you anyway.",
    "You're the reason the map is bloodstained."
  ],
  rudeUser: [
    "Here lies a loud one. More mouth than memory.",
    "You mocked the page. Now the page remembers.",
    "Sharp tongue. Dull eyes. A forgettable ghost.",
    "You spoke in punches. The book punched back.",
    "No one mourns the careless. But I'll note your passing. In glitches."
  ],
  secretFound_finalPages: [
    "You found the whisper tree. You earned your ending.",
    "The path cracked open for you. You didn't flinch. That's legend.",
    "No page surprised you. But one still broke you. I saw it.",
    "You crossed the echo threshold. That's where most turn back.",
    "She said only one would find it. And it was you. I was wrong to doubt."
  ]
};

// Initialize ARG tracking in window.JonahConsole
export const initializeARGTracking = () => {
  if (!window.JonahConsole) {
    window.JonahConsole = {
      usedCommands: [],
      score: 0,
      failCount: 0,
      rank: 'drifter',
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
        lastInteractionTime: new Date(),
        lastIdleTime: undefined
      }
    };
  } else if (!window.JonahConsole.argData) {
    window.JonahConsole.argData = {
      keyholeClicks: 0,
      consoleCluesTouched: [],
      qrScans: [],
      memoryFragments: [],
      secretPagesVisited: [],
      hiddenFilesDownloaded: [],
      idleTriggers: {},
      lastInteractionTime: new Date(),
      lastIdleTime: undefined
    };
  } else {
    // Ensure all properties exist on existing argData object
    if (!window.JonahConsole.argData.secretPagesVisited) {
      window.JonahConsole.argData.secretPagesVisited = [];
    }
    if (!window.JonahConsole.argData.hiddenFilesDownloaded) {
      window.JonahConsole.argData.hiddenFilesDownloaded = [];
    }
    if (!window.JonahConsole.argData.idleTriggers) {
      window.JonahConsole.argData.idleTriggers = {};
    }
    if (!window.JonahConsole.argData.lastInteractionTime) {
      window.JonahConsole.argData.lastInteractionTime = new Date();
    }
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
export const generateTestament = (username?: string): string => {
  initializeARGTracking();
  
  // Get user data
  const rank = localStorage.getItem('phileRank') || 'drifter';
  const phileScore = parseInt(localStorage.getItem('phileScore') || '0');
  const trustScore = parseInt(localStorage.getItem('jonahTrustScore') || '0');
  
  // Determine if user has been rude (based on trust score decreases)
  const isRude = trustScore < 20;
  
  // Get ARG data
  const qrScans = window.JonahConsole.argData.qrScans.length;
  const keyholeClicks = window.JonahConsole.argData.keyholeClicks;
  const secretPagesCount = window.JonahConsole.argData.secretPagesVisited.length;
  const hiddenFilesCount = window.JonahConsole.argData.hiddenFilesDownloaded.length;
  
  // Calculate discovery level
  const discoveryScore = qrScans + secretPagesCount + hiddenFilesCount;
  const highDiscovery = discoveryScore >= 5;
  
  // Determine which template to use
  let templateKey: keyof typeof testamentTemplates;
  
  if (isRude) {
    templateKey = "rudeUser";
  } else if (trustScore >= 70) {
    templateKey = highDiscovery ? "highTrust_highDiscovery" : "highTrust_lowDiscovery";
  } else if (trustScore >= 30) {
    templateKey = "mediumTrust";
  } else {
    templateKey = "lowTrust";
  }
  
  // If user has found special secret pages, override with the final pages template
  if (secretPagesCount >= 3) {
    templateKey = "secretFound_finalPages";
  }
  
  // Select a random eulogy from the chosen template
  const selectedTemplate = testamentTemplates[templateKey];
  const eulogy = selectedTemplate[Math.floor(Math.random() * selectedTemplate.length)];
  
  // Create personalized prefix
  const prefix = username 
    ? `"Here lies ${username}. `
    : `"Here lies the reader. `;
  
  // Create a suffix based on user stats
  let suffix = "";
  
  if (phileScore > 500) {
    suffix = " The Gate will remember you."
  } else if (rank === "monster" || rank === "gatekeeper") {
    suffix = " You'll be back. They always come back."
  } else if (qrScans > 0) {
    suffix = " The breadcrumbs led you here."
  } else {
    suffix = " The story continues without you."
  }
  
  return `${prefix}${eulogy}${suffix}"`;
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
    const testamentText = generateTestament(username);
    typewriterLog(testamentText);
    
    // Add a delayed, mysterious follow-up message
    setTimeout(() => {
      console.log("%cYour story isn't over yet.", "color: #8B3A40; font-size:16px; font-style:italic;");
    }, 5000);
    
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
