
/**
 * ARG Tracking Module
 * Tracks ARG-related commands and events
 */

import { addUsedCommand } from "./consoleTrackingUtils";

type TrackCommandFunction = (commandName: string) => void;

// Initialize ARG commands
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
  }
}

