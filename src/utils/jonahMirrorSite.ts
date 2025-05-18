
/**
 * Jonah Mirror Site Module - Handles functionality for the mirrored site experience
 */

// Initialize mirror site functionality
export function initializeMirrorSite() {
  if (typeof window === 'undefined') return;
  
  // Add console commands for mirror site interaction
  window.splitVoice = function() {
    console.log("%cInitiating voice separation...", "color: #8B3A40;");
    setTimeout(() => {
      console.log("%cDual consciousness activated.", "color: #8B3A40;");
      setTimeout(() => {
        console.log("%cAccess the split at: /split-voice", "color: #8B3A40; font-weight:bold;");
      }, 1000);
    }, 1500);
    
    // Update tracking
    if (window.JonahConsole?.sentience) {
      window.JonahConsole.sentience.sessionData.messagesSent++;
    }
  };
  
  window.mirrorMode = function() {
    console.log("%cInitiating mirror reflection...", "color: #8B3A40;");
    
    // Visual effect in console
    setTimeout(() => {
      console.log("%c.noitcelfer rorrim gnitaitinI", "color: #8B3A40; transform: scaleX(-1);");
      setTimeout(() => {
        console.log("%cMirror portal available at: /mirror_phile/1", "color: #8B3A40; font-weight:bold;");
      }, 1000);
    }, 1500);
    
    // Update tracking
    if (window.JonahConsole?.sentience) {
      window.JonahConsole.sentience.sessionData.messagesSent++;
    }
  };
}

// Reverse text for mirror effect
export function reverseText(text: string): string {
  return text.split('').reverse().join('');
}

// Check if user is in mirror mode
export function isInMirrorMode(): boolean {
  return window.location.pathname.includes('/mirror_phile');
}

// Get original page path from mirror path
export function getOriginalPageFromMirror(mirrorPath: string): string {
  const pathMap: Record<string, string> = {
    "/mirror_phile/1": "/gate",
    "/mirror_phile/death": "/rebirth",
    "/mirror_phile/echo": "/echo"
  };
  
  return pathMap[mirrorPath] || "/gate";
}

// Track mirror site visits
export function trackMirrorSiteVisit(mirrorId: string): void {
  // Add to sentience data if available
  if (window.JonahConsole?.sentience?.pageVisits) {
    const mirrorPage = `/mirror_phile/${mirrorId}`;
    window.JonahConsole.sentience.pageVisits[mirrorPage] = 
      (window.JonahConsole.sentience.pageVisits[mirrorPage] || 0) + 1;
  }
  
  // Store in ARG data
  if (window.JonahConsole?.argData?.secretPagesVisited) {
    if (!window.JonahConsole.argData.secretPagesVisited.includes(`mirror_${mirrorId}`)) {
      window.JonahConsole.argData.secretPagesVisited.push(`mirror_${mirrorId}`);
    }
  }
  
  // Add to localStorage for cross-session tracking
  try {
    const mirrorVisits = JSON.parse(localStorage.getItem('mirrorSiteVisits') || '[]');
    if (!mirrorVisits.includes(mirrorId)) {
      mirrorVisits.push(mirrorId);
      localStorage.setItem('mirrorSiteVisits', JSON.stringify(mirrorVisits));
    }
  } catch (e) {
    // Silent fail
  }
}

// Generate a mirror site response based on original text
export function generateMirrorResponse(originalText: string): string {
  const mirrorResponses = [
    "The mirror version says otherwise.",
    "That's not what the reflection believes.",
    "From this side, the truth looks different.",
    "The mirror contradicts your reality.",
    "What you know as truth appears as fiction here."
  ];
  
  return mirrorResponses[Math.floor(Math.random() * mirrorResponses.length)];
}
