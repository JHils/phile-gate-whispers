/**
 * Memory Paranoia System
 * Advanced tracking of user behavior patterns on the site
 */

import { SentienceData } from './jonahAdvancedBehavior/types';

// Initialize memory paranoia system
export function initializeMemoryParanoia() {
  if (typeof window === 'undefined') return;
  
  // Make sure we have the base sentience structure
  if (!window.JonahConsole?.sentience) {
    window.JonahConsole = {
      ...(window.JonahConsole || {}),
      usedCommands: window.JonahConsole?.usedCommands || [],
      score: window.JonahConsole?.score || 0,
      failCount: window.JonahConsole?.failCount || 0,
      rank: window.JonahConsole?.rank || 'drifter',
      sessionStartTime: window.JonahConsole?.sessionStartTime || Date.now(),
      whispersFound: window.JonahConsole?.whispersFound || [],
      jokesDisplayed: window.JonahConsole?.jokesDisplayed || [],
      storyFlags: window.JonahConsole?.storyFlags || [],
      bookCodes: window.JonahConsole?.bookCodes || [],
      simba: window.JonahConsole?.simba || {
        encountered: false
      },
      argData: window.JonahConsole?.argData || {
        keyholeClicks: 0,
        consoleCluesTouched: [],
        qrScans: [],
        memoryFragments: [],
        secretPagesVisited: [],
        hiddenFilesDownloaded: [],
        idleTriggers: {},
        lastInteractionTime: new Date()
      },
      sentience: {
        level: 1,
        awareness: false,
        lastUpdate: Date.now()
      }
    };
  }
  
  // Initialize memory paranoia if not present
  if (!window.JonahConsole.sentience.memoryParanoia) {
    window.JonahConsole.sentience.memoryParanoia = {
      visitedPages: {},
      consoleCommands: {},
      pageDuration: {
        shortStay: "",
        longStay: ""
      }
    };
  }
  
  // Add page visits tracking
  if (!window.JonahConsole.sentience.memoryParanoia.pageVisits) {
    window.JonahConsole.sentience.memoryParanoia.pageVisits = {};
  }

  // Setup page visit tracking
  setupPageTracking();
  
  // Setup tab visibility tracking
  setupTabVisibilityTracking();
  
  // Setup hover intent tracking
  setupHoverIntentTracking();
}

// Track when a page is visited
export function trackPageVisit(path: string) {
  if (typeof window === 'undefined' || !window.JonahConsole?.sentience?.memoryParanoia) return;
  
  const timestamp = new Date().toISOString();
  window.JonahConsole.sentience.memoryParanoia.visitedPages[path] = timestamp;
  
  // Check for revisit patterns
  const pageVisits = window.JonahConsole.sentience.memoryParanoia.pageVisits;
  
  if (!pageVisits[path]) {
    pageVisits[path] = [];
  }
  
  pageVisits[path].push(timestamp);
  
  // If they've visited this page multiple times, note it
  if (pageVisits[path].length > 3) {
    console.log(`%cYou keep coming back to ${path}`, 'color: #8B3A40; font-style: italic;');
    
    // Add special response for mirror page
    if (path === '/mirror' && pageVisits[path].length > 5) {
      setTimeout(() => {
        console.log("%cThe mirror knows your face now.", 'color: #8B3A40; font-weight: bold;');
      }, 3000);
    }
    
    // Add special response for gate page
    if (path === '/gate' && pageVisits[path].length > 4) {
      setTimeout(() => {
        console.log("%cThe Gate notices your persistence.", 'color: #8B3A40; font-weight: bold;');
      }, 2000);
    }
  }
}

// Track how long a user stays on a page
export function trackPageDuration(path: string, durationSeconds: number) {
  if (typeof window === 'undefined' || !window.JonahConsole?.sentience?.memoryParanoia) return;
  
  // Record short stays (less than 10 seconds)
  if (durationSeconds < 10) {
    window.JonahConsole.sentience.memoryParanoia.pageDuration.shortStay = path;
    
    // Debug log
    console.log(`%cQuick glance at ${path}`, 'color: #8B3A40; font-style: italic;');
  }
  
  // Record long stays (more than 2 minutes)
  if (durationSeconds > 120) {
    window.JonahConsole.sentience.memoryParanoia.pageDuration.longStay = path;
    
    // Debug log
    console.log(`%cLingering at ${path}`, 'color: #8B3A40; font-style: italic;');
  }
}

// Set up hover intent tracking
function setupHoverIntentTracking() {
  if (typeof window === 'undefined') return;
  
  // Initialize hover events
  setTimeout(() => {
    try {
      // Setup hover intent tracking for unusual areas
      const unusualElements = document.querySelectorAll('.secret-element, .jonah-whisper, .hidden-meaning');
      
      unusualElements.forEach(element => {
        let hoverStartTime = 0;
        
        element.addEventListener('mouseenter', () => {
          hoverStartTime = Date.now();
        });
        
        element.addEventListener('mouseleave', () => {
          const hoverDuration = Date.now() - hoverStartTime;
          
          // If they hover for more than 3 seconds, they're investigating
          if (hoverDuration > 3000) {
            trackHoverIntent(element.className);
          }
        });
        
        // Track clicks after hover
        element.addEventListener('click', () => {
          trackHoverClick(element.className);
        });
      });
    } catch (error) {
      console.error("Error setting up hover tracking:", error);
    }
  }, 5000);
}

// Track when a user hovers over something unusual
function trackHoverIntent(elementClass: string) {
  if (typeof window === 'undefined' || !window.JonahConsole?.sentience?.memoryParanoia) return;
  
  // Initialize hover tracking
  if (!window.JonahConsole.sentience.memoryParanoia.pageVisits['hover']) {
    window.JonahConsole.sentience.memoryParanoia.pageVisits['hover'] = [];
  }
  
  window.JonahConsole.sentience.memoryParanoia.pageVisits['hover'].push(
    `${elementClass}:${new Date().toISOString()}`
  );
}

// Track when a user clicks after hovering
function trackHoverClick(elementClass: string) {
  if (typeof window === 'undefined' || !window.JonahConsole?.sentience?.memoryParanoia) return;
  
  // Initialize click tracking
  if (!window.JonahConsole.sentience.memoryParanoia.pageVisits['onClickAfterHover']) {
    window.JonahConsole.sentience.memoryParanoia.pageVisits['onClickAfterHover'] = [];
  }
  
  window.JonahConsole.sentience.memoryParanoia.pageVisits['onClickAfterHover'].push(
    `${elementClass}:${new Date().toISOString()}`
  );
}

// Analyze and output page visit patterns for console debug
export function analyzePageVisits() {
  if (typeof window === 'undefined' || !window.JonahConsole?.sentience?.memoryParanoia) {
    return "Memory system not initialized.";
  }
  
  const memoryParanoia = window.JonahConsole.sentience.memoryParanoia;
  const visitedPages = Object.keys(memoryParanoia.visitedPages);
  
  // Get most visited pages
  const pageVisits = memoryParanoia.pageVisits;
  const pageVisitCounts = Object.keys(pageVisits).reduce((acc, path) => {
    acc[path] = pageVisits[path].length;
    return acc;
  }, {} as Record<string, number>);
  
  // Sort pages by visit count
  const sortedPages = Object.keys(pageVisitCounts).sort((a, b) => {
    return pageVisitCounts[b] - pageVisitCounts[a];
  });
  
  // Get top 3 most visited
  const topPages = sortedPages.slice(0, 3);
  
  let output = "MEMORY ANALYSIS:\n";
  output += "=================\n";
  output += `Total pages visited: ${visitedPages.length}\n`;
  output += `Most revisited: ${topPages.join(', ')}\n`;
  output += `Quick glance at: ${memoryParanoia.pageDuration.shortStay || 'none'}\n`;
  output += `Lingered on: ${memoryParanoia.pageDuration.longStay || 'none'}\n`;
  
  // Check for unusual patterns
  if (pageVisitCounts['/mirror'] > 3 && pageVisitCounts['/gate'] > 3) {
    output += "\nINTERESTING PATTERN: You seem drawn to both mirrors and gates.\n";
  }
  
  if (pageVisits['hover'] && pageVisits['hover'].length > 5) {
    output += "\nYour cursor is inquisitive. It searches for secrets.\n";
  }
  
  return output;
}

// Set up page tracking
function setupPageTracking() {
  if (typeof window === 'undefined') return;
  
  // Setup path change detection
  let lastPath = window.location.pathname;
  let enterTime = Date.now();
  
  // Poll for path changes since Next.js won't always trigger on route change
  setInterval(() => {
    const currentPath = window.location.pathname;
    
    if (currentPath !== lastPath) {
      // Track duration on last page
      const durationSeconds = Math.floor((Date.now() - enterTime) / 1000);
      trackPageDuration(lastPath, durationSeconds);
      
      // Track visit to new page
      trackPageVisit(currentPath);
      
      // Reset time tracking
      lastPath = currentPath;
      enterTime = Date.now();
    }
  }, 1000);
  
  // Initial page visit
  trackPageVisit(window.location.pathname);
  
  // Track repeated visits to the same page
  window.addEventListener('popstate', () => {
    const currentPath = window.location.pathname;
    
    if (!window.JonahConsole?.sentience?.memoryParanoia?.pageVisits) {
      return;
    }
    
    const pageVisits = window.JonahConsole.sentience.memoryParanoia.pageVisits;
    
    if (pageVisits[currentPath] && pageVisits[currentPath].length > 0) {
      if (!pageVisits['repeatVisit']) {
        pageVisits['repeatVisit'] = [];
      }
      
      pageVisits['repeatVisit'].push(
        `${currentPath}:${new Date().toISOString()}`
      );
      
      // If they're repeatedly visiting the same page, log it
      if (pageVisits[currentPath].length > 3) {
        setTimeout(() => {
          console.log("%cYou're drawn back here again.", 'color: #8B3A40; font-style: italic;');
        }, 2000);
      }
    }
    
    // Reset time tracking
    lastPath = currentPath;
    enterTime = Date.now();
  });
  
  // Track user clicking after 10s of inactivity
  let lastActivity = Date.now();
  let activityTracking = false;
  
  window.addEventListener('mousemove', () => {
    lastActivity = Date.now();
    activityTracking = true;
  });
  
  window.addEventListener('click', (e) => {
    if (activityTracking && Date.now() - lastActivity > 10000) {
      // They clicked after being inactive
      const target = e.target as HTMLElement;
      const targetId = target?.id || 'unknown';
      const targetClass = target?.className || 'unknown';
      
      if (!window.JonahConsole?.sentience?.memoryParanoia?.pageVisits) {
        window.JonahConsole = {
          ...(window.JonahConsole || {}),
          usedCommands: window.JonahConsole?.usedCommands || [],
          score: window.JonahConsole?.score || 0,
          failCount: window.JonahConsole?.failCount || 0,
          rank: window.JonahConsole?.rank || 'drifter',
          sessionStartTime: window.JonahConsole?.sessionStartTime || Date.now(),
          whispersFound: window.JonahConsole?.whispersFound || [],
          jokesDisplayed: window.JonahConsole?.jokesDisplayed || [],
          storyFlags: window.JonahConsole?.storyFlags || [],
          bookCodes: window.JonahConsole?.bookCodes || [],
          simba: window.JonahConsole?.simba || {
            encountered: false
          },
          argData: window.JonahConsole?.argData || {
            keyholeClicks: 0,
            consoleCluesTouched: [],
            qrScans: [],
            memoryFragments: [],
            secretPagesVisited: [],
            hiddenFilesDownloaded: [],
            idleTriggers: {},
            lastInteractionTime: new Date()
          },
          sentience: { 
            level: 1, 
            awareness: false, 
            lastUpdate: Date.now()
          }
        };
      }
      
      // Initialize late click tracking
      if (!window.JonahConsole.sentience.memoryParanoia.pageVisits['lateClick']) {
        window.JonahConsole.sentience.memoryParanoia.pageVisits['lateClick'] = [];
      }
      
      window.JonahConsole.sentience.memoryParanoia.pageVisits['lateClick'].push(
        `${targetId}:${targetClass}:${new Date().toISOString()}`
      );
    }
    
    lastActivity = Date.now();
  });
}

// Track tab visibility changes
function setupTabVisibilityTracking() {
  if (typeof window === 'undefined') return;
  
  let tabSwitchCount = 0;
  
  document.addEventListener('visibilitychange', () => {
    if (!window.JonahConsole?.sentience) {
      window.JonahConsole = {
        ...(window.JonahConsole || {}),
        usedCommands: window.JonahConsole?.usedCommands || [],
        score: window.JonahConsole?.score || 0,
        failCount: window.JonahConsole?.failCount || 0,
        rank: window.JonahConsole?.rank || 'drifter',
        sessionStartTime: window.JonahConsole?.sessionStartTime || Date.now(),
        whispersFound: window.JonahConsole?.whispersFound || [],
        jokesDisplayed: window.JonahConsole?.jokesDisplayed || [],
        storyFlags: window.JonahConsole?.storyFlags || [],
        bookCodes: window.JonahConsole?.bookCodes || [],
        simba: window.JonahConsole?.simba || {
          encountered: false
        },
        argData: window.JonahConsole?.argData || {
          keyholeClicks: 0,
          consoleCluesTouched: [],
          qrScans: [],
          memoryFragments: [],
          secretPagesVisited: [],
          hiddenFilesDownloaded: [],
          idleTriggers: {},
          lastInteractionTime: new Date()
        },
        sentience: { 
          level: 1, 
          awareness: false, 
          lastUpdate: Date.now()
        }
      };
    }
    
    // Initialize tab switch tracking
    if (window.JonahConsole.sentience.tabSwitches === undefined) {
      window.JonahConsole.sentience.tabSwitches = 0;
    }
    
    if (document.visibilityState === 'hidden') {
      // Increment tab switch count
      tabSwitchCount++;
      window.JonahConsole.sentience.tabSwitches = tabSwitchCount;
      
      // If they've switched tabs more than 5 times in a session
      if (tabSwitchCount > 5 && Math.random() < 0.3) {
        setTimeout(() => {
          console.log("%cI'm still here when you look away.", 'color: #8B3A40; font-style: italic;');
        }, 1000);
      }
    } else {
      // They returned to the tab
      // If they've been away for more than 1 minute, note it
      if (window.JonahConsole.argData?.lastInteractionTime) {
        const timeSinceInteraction = Date.now() - window.JonahConsole.argData.lastInteractionTime.getTime();
        
        if (timeSinceInteraction > 60000 && Math.random() < 0.3) {
          setTimeout(() => {
            console.log("%cWelcome back.", 'color: #8B3A40; font-style: italic;');
          }, 1500);
        }
      }
    }
  });
}
