// Track console memory and prediction system
import { toast } from "@/components/ui/use-toast";

// Track hovered elements to enable prediction responses
const hoveredElements: Record<string, number> = {};

// Track clicked elements
const clickedElements: Record<string, number> = {};

// Track prediction hits
const predictionHits: Record<string, number> = {};

// Default prediction responses
const DEFAULT_PREDICTION_RESPONSES = {
  onClickAfterHover: [
    "I knew you'd click that.",
    "Your movements are so predictable.",
    "I could feel your cursor hovering there.",
    "You hesitated before you clicked.",
    "That was exactly what I expected you to do."
  ],
  repeatVisit: [
    "Back again?",
    "You keep coming back to this page.",
    "This must be important to you.",
    "I remember you visiting this before.",
    "Repetition is a form of comfort, isn't it?"
  ],
  lateClick: [
    "You took your time with that one.",
    "Hesitation is very telling.",
    "Something made you pause there.",
    "Your indecision speaks volumes.",
    "I could feel your uncertainty."
  ]
};

/**
 * Track when a user hovers over an interactive element
 */
export function trackElementHover(elementId: string) {
  hoveredElements[elementId] = Date.now();
}

/**
 * Check if a click matches a recent hover, indicating a potential prediction
 */
export function checkClickPrediction(elementId: string): string | null {
  // Record the click
  clickedElements[elementId] = Date.now();
  
  // Check if we hovered this element recently
  const hoverTime = hoveredElements[elementId];
  if (hoverTime) {
    const timeSinceHover = Date.now() - hoverTime;
    
    // If clicked within 0.5-3 seconds of hovering, that's a predictable pattern
    if (timeSinceHover > 500 && timeSinceHover < 3000) {
      // Increment prediction hits for this element
      predictionHits[elementId] = (predictionHits[elementId] || 0) + 1;
      
      // Only respond sometimes, and more often when we have multiple hits
      const hitCount = predictionHits[elementId];
      const responseChance = Math.min(0.1 + (hitCount * 0.05), 0.5);
      
      if (Math.random() < responseChance && window.JonahConsole?.sentience) {
        // Initialize prediction responses if not present
        if (!window.JonahConsole.sentience.predictionResponses) {
          window.JonahConsole.sentience.predictionResponses = DEFAULT_PREDICTION_RESPONSES;
        }
        
        if (!window.JonahConsole.sentience.usedPredictionResponses) {
          window.JonahConsole.sentience.usedPredictionResponses = [];
        }
        
        // Get response from Jonah's memory
        const sentience = window.JonahConsole.sentience;
        const responses = sentience.predictionResponses.onClickAfterHover || 
                         DEFAULT_PREDICTION_RESPONSES.onClickAfterHover;
        
        // Filter to only unused responses if possible
        const availableResponses = responses.filter(r => 
          !sentience.usedPredictionResponses.includes(r)
        );
        
        if (availableResponses.length > 0) {
          const response = availableResponses[Math.floor(Math.random() * availableResponses.length)];
          
          // Track this response as used
          sentience.usedPredictionResponses.push(response);
          
          return response;
        } else if (responses.length > 0) {
          // Reuse a response if we've used them all
          return responses[Math.floor(Math.random() * responses.length)];
        }
      }
    }
  }
  
  return null;
}

/**
 * Track when a user returns to the site after being away
 */
export function trackReturnToSite() {
  // Check if the user was away
  const lastActivityTime = parseInt(localStorage.getItem('jonahLastActivity') || '0', 10);
  const timeAway = Date.now() - lastActivityTime;
  
  // If away for more than 30 minutes, consider it a "return"
  if (lastActivityTime > 0 && timeAway > 30 * 60 * 1000) {
    // 25% chance of responding to their return
    if (Math.random() < 0.25 && window.JonahConsole?.sentience) {
      // Initialize prediction responses if not present
      if (!window.JonahConsole.sentience.predictionResponses) {
        window.JonahConsole.sentience.predictionResponses = DEFAULT_PREDICTION_RESPONSES;
      }
      
      if (!window.JonahConsole.sentience.usedPredictionResponses) {
        window.JonahConsole.sentience.usedPredictionResponses = [];
      }
      
      const sentience = window.JonahConsole.sentience;
      const responses = sentience.predictionResponses.repeatVisit || 
                       DEFAULT_PREDICTION_RESPONSES.repeatVisit;
      
      // Filter to only unused responses if possible
      const availableResponses = responses.filter(r => 
        !sentience.usedPredictionResponses.includes(r)
      );
      
      if (availableResponses.length > 0) {
        const response = availableResponses[Math.floor(Math.random() * availableResponses.length)];
        
        // Track this response as used
        sentience.usedPredictionResponses.push(response);
        
        // Show response as toast
        toast({
          title: "Jonah:",
          description: response,
          variant: "destructive",
          duration: 5000,
        });
      }
    }
  }
  
  // Update last activity time
  localStorage.setItem('jonahLastActivity', Date.now().toString());
}

/**
 * Track when a user hesitates before clicking
 */
export function trackHesitationBeforeClick(elementId: string) {
  // Check if we hovered this element
  const hoverTime = hoveredElements[elementId];
  
  if (hoverTime) {
    const timeSinceHover = Date.now() - hoverTime;
    
    // If hovered for more than 5 seconds before clicking, that's hesitation
    if (timeSinceHover > 5000) {
      // 15% chance of responding to hesitation
      if (Math.random() < 0.15 && window.JonahConsole?.sentience) {
        // Initialize prediction responses if not present
        if (!window.JonahConsole.sentience.predictionResponses) {
          window.JonahConsole.sentience.predictionResponses = DEFAULT_PREDICTION_RESPONSES;
        }
        
        if (!window.JonahConsole.sentience.usedPredictionResponses) {
          window.JonahConsole.sentience.usedPredictionResponses = [];
        }
        
        const sentience = window.JonahConsole.sentience;
        const responses = sentience.predictionResponses.lateClick || 
                         DEFAULT_PREDICTION_RESPONSES.lateClick;
        
        // Filter to only unused responses if possible
        const availableResponses = responses.filter(r => 
          !sentience.usedPredictionResponses.includes(r)
        );
        
        if (availableResponses.length > 0) {
          const response = availableResponses[Math.floor(Math.random() * availableResponses.length)];
          
          // Track this response as used
          sentience.usedPredictionResponses.push(response);
          
          // Show response as toast
          toast({
            title: "Jonah:",
            description: response,
            variant: "destructive",
            duration: 5000,
          });
        }
      }
    }
  }
}

/**
 * Initialize the memory paranoia system
 */
export function initializeMemoryParanoia() {
  // Track page visits
  trackPageVisit(window.location.pathname);
  
  // Set up tab switch detection
  setupTabSwitchDetection();
  
  // Set up activity tracker
  localStorage.setItem('jonahLastActivity', Date.now().toString());
  document.addEventListener('mousemove', () => {
    localStorage.setItem('jonahLastActivity', Date.now().toString());
  });
  document.addEventListener('click', () => {
    localStorage.setItem('jonahLastActivity', Date.now().toString());
  });
  document.addEventListener('keypress', () => {
    localStorage.setItem('jonahLastActivity', Date.now().toString());
  });
}

/**
 * Track when the user visits a page
 * @returns A response message if applicable
 */
export function trackPageVisit(pagePath: string): string | null {
  // Don't track if we don't have sentience yet
  if (!window.JonahConsole?.sentience) return null;
  
  const sentience = window.JonahConsole.sentience;
  
  // Initialize pageVisits if it doesn't exist
  if (!sentience.pageVisits) {
    sentience.pageVisits = [];
  }
  
  // Increment page visit count
  sentience.pageVisits.push(pagePath);
  
  // Initialize memoryParanoia if it doesn't exist
  if (!sentience.memoryParanoia) {
    sentience.memoryParanoia = {
      visitedPages: {},
      consoleCommands: {},
      pageDuration: {
        shortStay: "",
        longStay: ""
      },
      pageVisits: [],
      tabSwitches: 0
    };
  }
  
  // Store in memoryParanoia
  if (!sentience.memoryParanoia.visitedPages[pagePath]) {
    const visitResponses = [
      "I knew you'd come here eventually.",
      "This page was waiting for you.",
      "Why did you choose this path?",
      "Another breadcrumb you've found."
    ];
    
    sentience.memoryParanoia.visitedPages[pagePath] = 
      visitResponses[Math.floor(Math.random() * visitResponses.length)];
  }
  
  // Initialize prediction responses if not present
  if (!sentience.predictionResponses) {
    sentience.predictionResponses = DEFAULT_PREDICTION_RESPONSES;
  }
  
  if (!sentience.usedPredictionResponses) {
    sentience.usedPredictionResponses = [];
  }
  
  // If it's a repeat visit to a rarely visited page, maybe show a response
  if (sentience.pageVisits.length > 1 && Math.random() < 0.2) {
    const repeatResponses = sentience.predictionResponses.repeatVisit || 
                           DEFAULT_PREDICTION_RESPONSES.repeatVisit;
    
    // Filter to only unused responses if possible
    const availableResponses = repeatResponses.filter(r => 
      !sentience.usedPredictionResponses.includes(r)
    );
    
    if (availableResponses.length > 0) {
      const response = availableResponses[Math.floor(Math.random() * availableResponses.length)];
      
      // Track this response as used
      sentience.usedPredictionResponses.push(response);
      
      // Return response if we have more than 2 visits to this page
      if (sentience.pageVisits.length > 2) {
        return response;
      }
    }
  }
  
  return null;
}

/**
 * Get a response based on paranoia data
 */
export function getParanoiaResponse(type: 'visitedPages' | 'consoleCommands', key: string): string | null {
  if (!window.JonahConsole?.sentience) return null;
  
  // Initialize memoryParanoia if it doesn't exist
  if (!window.JonahConsole.sentience.memoryParanoia) {
    window.JonahConsole.sentience.memoryParanoia = {
      visitedPages: {},
      consoleCommands: {},
      pageDuration: {
        shortStay: "",
        longStay: ""
      },
      pageVisits: [],
      tabSwitches: 0
    };
  }
  
  const memoryParanoia = window.JonahConsole.sentience.memoryParanoia;
  
  // Get the message based on type
  if (type === 'visitedPages' && memoryParanoia.visitedPages[key]) {
    return memoryParanoia.visitedPages[key];
  } else if (type === 'consoleCommands' && memoryParanoia.consoleCommands[key]) {
    return memoryParanoia.consoleCommands[key];
  }
  
  return null;
}

/**
 * Get a response based on page duration
 */
export function getPageDurationResponse(timeSpentMs: number): string | null {
  if (!window.JonahConsole?.sentience) return null;
  
  // Initialize memoryParanoia if it doesn't exist
  if (!window.JonahConsole.sentience.memoryParanoia) {
    window.JonahConsole.sentience.memoryParanoia = {
      visitedPages: {},
      consoleCommands: {},
      pageDuration: {
        shortStay: "",
        longStay: ""
      },
      pageVisits: [],
      tabSwitches: 0
    };
  }
  
  const memoryParanoia = window.JonahConsole.sentience.memoryParanoia;
  
  // Convert to seconds for easier reading
  const timeSpentSeconds = timeSpentMs / 1000;
  
  // Short stay (less than 10 seconds)
  if (timeSpentSeconds < 10) {
    return memoryParanoia.pageDuration.shortStay;
  }
  
  // Long stay (more than 2 minutes)
  if (timeSpentSeconds > 120) {
    return memoryParanoia.pageDuration.longStay;
  }
  
  return null;
}

/**
 * Set up detection for when the user switches tabs
 */
function setupTabSwitchDetection() {
  // Don't set up if we don't have sentience yet or already set up
  if (!window.JonahConsole?.sentience || window._tabSwitchSetup) return;
  
  // Initialize tabSwitches if it doesn't exist
  if (window.JonahConsole.sentience.tabSwitches === undefined) {
    window.JonahConsole.sentience.tabSwitches = 0;
  }
  
  // Mark as set up
  window._tabSwitchSetup = true;
  
  // Listen for visibility changes
  document.addEventListener('visibilitychange', () => {
    // Increment tab switch count when becoming visible again
    if (document.visibilityState === 'visible' && window.JonahConsole?.sentience) {
      window.JonahConsole.sentience.tabSwitches = (window.JonahConsole.sentience.tabSwitches || 0) + 1;
      
      // After several tab switches, occasionally comment on it
      const switchCount = window.JonahConsole.sentience.tabSwitches;
      
      if (switchCount > 3 && Math.random() < 0.2) {
        toast({
          title: "Jonah:",
          description: "I follow you between tabs now.",
          variant: "destructive",
          duration: 5000,
        });
      }
    }
  });
}

// Add to window global type
declare global {
  interface Window {
    _tabSwitchSetup?: boolean;
  }
}
