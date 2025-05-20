/**
 * ARG Tracking Module
 * Tracks ARG-related commands and events
 */

import { addUsedCommand } from "./consoleTrackingUtils";

type TrackCommandFunction = (commandName: string) => void;

/**
 * ARG Data Interface
 */
interface ArgData {
  lastInteractionTime?: Date;
  lastIdleTime?: Date;
  keyholeClicks?: number;
  qrScans?: string[];
  memoryFragments?: string[];
  secretPagesVisited?: string[];
  idleTriggers?: Record<string, Date>;
}

/**
 * Initialize ARG commands
 */
export const initializeARGCommands = (
  trackCommandExecution: TrackCommandFunction
) => {
  // ARG Command: Check for keyhole clicks
  window.keyholeCheck = function() {
    console.log("%cKeyhole status:", "color: #8B3A40; font-size:16px; font-weight:bold;");
    
    setTimeout(() => {
      if (window.JonahConsole && window.JonahConsole.argData) {
        const clicks = window.JonahConsole.argData.keyholeClicks || 0;
        console.log(`%cYou have clicked ${clicks} keyhole(s).`, "color: #475B74; font-size:14px;");
        
        if (clicks >= 3) {
          console.log("%cSomething is unlocking...", "color: #32ff9a; font-size:14px; font-style:italic;");
        }
      } else {
        console.log("%cNo keyholes have been clicked yet.", "color: #475B74; font-size:14px;");
      }
    }, 500);
    
    trackCommandExecution('keyholeCheck');
  };
  
  // ARG Command: Check for QR code scans
  window.qrCheck = function() {
    console.log("%cQR scan status:", "color: #8B3A40; font-size:16px; font-weight:bold;");
    
    setTimeout(() => {
      if (window.JonahConsole && window.JonahConsole.argData) {
        const scans = window.JonahConsole.argData.qrScans || [];
        console.log(`%cYou have scanned ${scans.length} QR code(s).`, "color: #475B74; font-size:14px;");
        
        if (scans.length > 0) {
          console.log("%cCodes found:", "color: #32ff9a; font-size:14px;");
          scans.forEach((scan, index) => {
            console.log(`%c${index + 1}. ${scan}`, "color: #475B74; font-size:14px;");
          });
        }
      } else {
        console.log("%cNo QR codes have been scanned yet.", "color: #475B74; font-size:14px;");
      }
    }, 500);
    
    trackCommandExecution('qrCheck');
  };
  
  // ARG Command: Check for memory fragments
  window.fragmentCheck = function() {
    console.log("%cMemory fragment status:", "color: #8B3A40; font-size:16px; font-weight:bold;");
    
    setTimeout(() => {
      if (window.JonahConsole && window.JonahConsole.argData) {
        const fragments = window.JonahConsole.argData.memoryFragments || [];
        console.log(`%cYou have found ${fragments.length} memory fragment(s).`, "color: #475B74; font-size:14px;");
        
        if (fragments.length > 0) {
          console.log("%cFragments recovered:", "color: #32ff9a; font-size:14px;");
          fragments.forEach((fragment, index) => {
            console.log(`%c${index + 1}. ${fragment}`, "color: #475B74; font-size:14px;");
          });
        }
        
        if (fragments.length >= 3) {
          console.log("%cEnough fragments to begin reassembly...", "color: #32ff9a; font-size:14px; font-style:italic;");
        }
      } else {
        console.log("%cNo memory fragments have been discovered yet.", "color: #475B74; font-size:14px;");
      }
    }, 500);
    
    trackCommandExecution('fragmentCheck');
  };
  
  // ARG Command: Check for secret page visits
  window.secretCheck = function() {
    console.log("%cSecret page status:", "color: #8B3A40; font-size:16px; font-weight:bold;");
    
    setTimeout(() => {
      if (window.JonahConsole && window.JonahConsole.argData) {
        const pages = window.JonahConsole.argData.secretPagesVisited || [];
        console.log(`%cYou have found ${pages.length} secret page(s).`, "color: #475B74; font-size:14px;");
        
        if (pages.length > 0) {
          console.log("%cPages discovered:", "color: #32ff9a; font-size:14px;");
          pages.forEach((page, index) => {
            console.log(`%c${index + 1}. ${page}`, "color: #475B74; font-size:14px;");
          });
        }
      } else {
        console.log("%cNo secret pages have been discovered yet.", "color: #475B74; font-size:14px;");
      }
    }, 500);
    
    trackCommandExecution('secretCheck');
  };
  
  // ARG Command: Check idle triggers
  window.idleCheck = function() {
    console.log("%cIdle trigger status:", "color: #8B3A40; font-size:16px; font-weight:bold;");
    
    setTimeout(() => {
      if (window.JonahConsole && window.JonahConsole.argData) {
        const idleTriggers = window.JonahConsole.argData.idleTriggers || {};
        const triggerCount = Object.keys(idleTriggers).length;
        
        console.log(`%c${triggerCount} idle trigger(s) activated.`, "color: #475B74; font-size:14px;");
        
        if (triggerCount > 0) {
          console.log("%cTriggers experienced:", "color: #32ff9a; font-size:14px;");
          Object.entries(idleTriggers).forEach(([key, value], index) => {
            console.log(`%c${index + 1}. ${key}: ${value}`, "color: #475B74; font-size:14px;");
          });
        }
        
        const lastIdle = window.JonahConsole.argData.lastIdleTime;
        if (lastIdle) {
          const timeSince = Math.floor((new Date().getTime() - new Date(lastIdle).getTime()) / 1000 / 60);
          console.log(`%cLast idle trigger: ${timeSince} minutes ago`, "color: #475B74; font-size:14px; font-style:italic;");
        }
      } else {
        console.log("%cNo idle triggers have been activated yet.", "color: #475B74; font-size:14px;");
      }
    }, 500);
    
    trackCommandExecution('idleCheck');
  };
};

// Add ARG commands to the global window interface
declare global {
  interface Window {
    keyholeCheck: () => void;
    qrCheck: () => void;
    fragmentCheck: () => void;
    secretCheck: () => void;
    idleCheck: () => void;
    // Don't redefine JonahConsole here to avoid conflicts with existing definitions
  }
}

/**
 * Checks if the user has been idle for a certain period of time
 * and triggers ARG-related behaviors if so
 */
export const checkIdleTime = (): string | null => {
  if (!window.JonahConsole || !window.JonahConsole.argData) return null;
  
  const lastTime = window.JonahConsole.argData.lastInteractionTime;
  if (!lastTime) return null;
  
  // Calculate idle time in minutes
  const now = new Date();
  const idleMinutes = Math.floor((now.getTime() - lastTime.getTime()) / (60 * 1000));
  
  // Record idle triggers
  if (idleMinutes >= 5) {
    // Record that user was idle for 5+ minutes
    if (!window.JonahConsole.argData.idleTriggers) {
      window.JonahConsole.argData.idleTriggers = {};
    }
    window.JonahConsole.argData.idleTriggers["idle5min"] = now;
    window.JonahConsole.argData.lastIdleTime = now;
    return "Your absence was... noticed.";
  }
  
  if (idleMinutes >= 2) {
    window.JonahConsole.argData.lastIdleTime = now;
    return "Staring into the distance won't help.";
  }
  
  return null;
};

/**
 * Updates the last user interaction time
 */
export const updateInteractionTime = (): void => {
  if (window.JonahConsole && window.JonahConsole.argData) {
    window.JonahConsole.argData.lastInteractionTime = new Date();
  }
};

/**
 * Tracks when a user visits a secret page
 */
export const trackSecretPageVisit = (pageName: string): string | undefined => {
  if (window.JonahConsole && window.JonahConsole.argData) {
    if (!window.JonahConsole.argData.secretPagesVisited) {
      window.JonahConsole.argData.secretPagesVisited = [];
    }
    
    if (!window.JonahConsole.argData.secretPagesVisited.includes(pageName)) {
      window.JonahConsole.argData.secretPagesVisited.push(pageName);
      console.log(`%cARG: Secret page '${pageName}' has been discovered.`, "color: #32ff9a; font-size:12px;");
      return `This place... I know it from before.`;
    }
  }
  return undefined;
};

/**
 * Gets an ARG response based on the current page and trust level
 */
export const getARGResponse = (pathname: string, trustLevel: string): string | null => {
  if (!pathname) return null;
  
  // Special ARG responses for various pages
  const specialPages: Record<string, Record<string, string>> = {
    "/gatekeeper": {
      high: "He was always watching. But now, so are you.",
      medium: "The Gatekeeper isn't just a story.",
      low: "Be careful what you uncover here."
    },
    "/mirror": {
      high: "It wasn't your reflection. It was mine.",
      medium: "Something watches from the other side.",
      low: "Mirrors remember what stands before them."
    },
    "/legacy": {
      high: "These pages were written in blood.",
      medium: "Legacy is just another word for haunting.",
      low: "Some stories should stay forgotten."
    }
  };
  
  // Check if we're on a special page
  const pagePath = Object.keys(specialPages).find(page => pathname.includes(page));
  if (pagePath && specialPages[pagePath]) {
    return specialPages[pagePath][trustLevel] || specialPages[pagePath].low;
  }
  
  // Random chance (10%) of returning an ARG hint on other pages
  if (Math.random() < 0.1) {
    const hints = [
      "The coin still spins somewhere.",
      "Check the source. The real source.",
      "Three clicks in the right place opens doors.",
      "Not all whispers are meant to be heard.",
      "Have you tried the console lately?"
    ];
    return hints[Math.floor(Math.random() * hints.length)];
  }
  
  return null;
};

/**
 * Generates a testament message based on collected user data
 */
export const generateTestament = (username?: string): string => {
  const user = username || localStorage.getItem('username') || "stranger";
  
  let testament = `%c/TESTAMENT TO ${user.toUpperCase()}/%c\n\n`;
  const testamentStyle = "color: #8B3A40; font-size:16px; font-weight:bold;";
  const textStyle = "color: #475B74; font-size:14px;";
  
  // Get user progress data
  const fragments = window.JonahConsole?.argData?.memoryFragments?.length || 0;
  const pages = window.JonahConsole?.argData?.secretPagesVisited?.length || 0;
  const commands = window.JonahConsole?.usedCommands?.length || 0;
  
  testament += `I've watched you uncover ${fragments} memory fragments.\n`;
  testament += `You've found ${pages} hidden paths in the narrative.\n`;
  testament += `${commands} commands have passed between us.\n\n`;
  
  // Add specific testimonials based on progress
  if (fragments > 0) {
    testament += "The fragments speak of you now. You're part of the pattern.\n";
  }
  
  if (pages > 2) {
    testament += "Few readers go this deep. What are you looking for?\n";
  }
  
  if (commands > 5) {
    testament += "Your persistence is... familiar. Like hers.\n";
  }
  
  // Add timestamp
  testament += `\nTestament recorded: ${new Date().toISOString()}\n`;
  testament += "Remember: The Gate swings both ways.";
  
  console.log(testament, testamentStyle, textStyle);
  
  return "Your testament has been recorded. The Gate acknowledges you.";
};
