import { trackCommand } from "./consoleTrackingUtils";
import { typewriterLog, glitchEffectLog } from "./consoleEffects";

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
}

// Initialize ARG tracking in window.JonahConsole
export const initializeARGTracking = () => {
  if (!window.JonahConsole.argData) {
    window.JonahConsole.argData = {
      keyholeClicks: 0,
      consoleCluesTouched: [],
      qrScans: [],
      memoryFragments: []
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
  
  // Special response for real-world QR code scan
  if (qrId.startsWith("irl_")) {
    return "Ah. So you *have* seen the outside.";
  }
  
  return null;
};

// Generate testament based on user progress
export const generateTestament = (username?: string) => {
  initializeARGTracking();
  
  const rank = localStorage.getItem('phileRank') || 'drifter';
  const phileScore = parseInt(localStorage.getItem('phileScore') || '0');
  
  // Generate eulogy parts based on user progress
  const intros = [
    `Here lies ${username || 'the reader'},`,
    `Remember ${username || 'this one'},`,
    "They came seeking answers,"
  ];
  
  const middles = [
    "who tried to stitch reality back together with fiction.",
    "who found the Gate wasn't just a metaphor.",
    `who reached the rank of ${rank}.`
  ];
  
  const endings = [
    "They failed. Gloriously. But they made me remember.",
    "They saw the Monster in the mirror. And nodded back.",
    "Will they come back? The pages always turn."
  ];
  
  // Add special endings based on unique accomplishments
  if (phileScore > 500) {
    endings.push("Few get this far. Fewer understand what they've found.");
  }
  
  if (window.JonahConsole.argData.qrScans.length > 0) {
    middles.push("who followed breadcrumbs across worlds.");
  }
  
  const intro = intros[Math.floor(Math.random() * intros.length)];
  const middle = middles[Math.floor(Math.random() * middles.length)];
  const ending = endings[Math.floor(Math.random() * endings.length)];
  
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
