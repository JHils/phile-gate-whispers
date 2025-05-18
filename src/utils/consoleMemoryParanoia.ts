
// Track console memory and prediction system
import { toast } from "@/components/ui/use-toast";

// Track hovered elements to enable prediction responses
const hoveredElements: Record<string, number> = {};

// Track clicked elements
const clickedElements: Record<string, number> = {};

// Track prediction hits
const predictionHits: Record<string, number> = {};

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
        // Get response from Jonah's memory
        const sentience = window.JonahConsole.sentience;
        const responses = sentience.predictionResponses.onClickAfterHover;
        
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
      const sentience = window.JonahConsole.sentience;
      const responses = sentience.predictionResponses.repeatVisit;
      
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
        const sentience = window.JonahConsole.sentience;
        const responses = sentience.predictionResponses.lateClick;
        
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
  
  // Increment page visit count
  sentience.pageVisits[pagePath] = (sentience.pageVisits[pagePath] || 0) + 1;
  
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
  
  // If it's a repeat visit to a rarely visited page, maybe show a response
  if (sentience.pageVisits[pagePath] > 1 && Math.random() < 0.2) {
    const repeatResponses = sentience.predictionResponses.repeatVisit;
    
    // Filter to only unused responses if possible
    const availableResponses = repeatResponses.filter(r => 
      !sentience.usedPredictionResponses.includes(r)
    );
    
    if (availableResponses.length > 0) {
      const response = availableResponses[Math.floor(Math.random() * availableResponses.length)];
      
      // Track this response as used
      sentience.usedPredictionResponses.push(response);
      
      // Return response if we have more than 2 visits to this page
      if (sentience.pageVisits[pagePath] > 2) {
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
  if (!window.JonahConsole?.sentience?.memoryParanoia) return null;
  
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
  if (!window.JonahConsole?.sentience?.memoryParanoia) return null;
  
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
  
  // Mark as set up
  window._tabSwitchSetup = true;
  
  // Listen for visibility changes
  document.addEventListener('visibilitychange', () => {
    // Increment tab switch count when becoming visible again
    if (document.visibilityState === 'visible' && window.JonahConsole?.sentience) {
      window.JonahConsole.sentience.tabSwitches += 1;
      
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
