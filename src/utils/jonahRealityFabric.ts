
/**
 * Reality Fabric system for Jonah's Philes Phase 3
 * Handles page variants, timeline tracking, journal entries, and fracture events
 */

// Add journal entry
export function addJournalEntry(content: string): void {
  if (typeof window !== 'undefined' && window.JonahConsole?.sentience?.realityFabric?.journal) {
    const newEntry = {
      entryId: window.JonahConsole.sentience.realityFabric.journal.length + 1,
      timestamp: Date.now(),
      content
    };
    
    window.JonahConsole.sentience.realityFabric.journal.push(newEntry);
    
    // Also add to localStorage for persistence
    const storedJournal = JSON.parse(localStorage.getItem('jonahJournal') || '[]');
    storedJournal.push(newEntry);
    localStorage.setItem('jonahJournal', JSON.stringify(storedJournal));
    
    // Update last entry in user state if possible
    try {
      const userState = JSON.parse(localStorage.getItem('userState') || '{}');
      if (!userState.journal) {
        userState.journal = {
          entries: [],
          lastViewed: Date.now()
        };
      }
      
      userState.journal.entries.push({
        timestamp: newEntry.timestamp,
        text: newEntry.content,
        source: 'system'
      });
      
      localStorage.setItem('userState', JSON.stringify(userState));
    } catch (e) {
      console.warn('Failed to update user state with journal entry:', e);
    }
  }
}

// Get all journal entries
export function getAllJournalEntries(): Array<{
  entryId: number;
  timestamp: number;
  content: string;
}> {
  // Try to get from JonahConsole first
  if (window.JonahConsole?.sentience?.realityFabric?.journal) {
    return window.JonahConsole.sentience.realityFabric.journal;
  }
  
  // Fall back to localStorage
  return JSON.parse(localStorage.getItem('jonahJournal') || '[]');
}

// Get journal entries related to a specific page
export function getPageJournalEntries(page: string): Array<{
  entryId: number;
  timestamp: number;
  content: string;
}> {
  const allEntries = getAllJournalEntries();
  
  // Filter entries related to the specified page
  return allEntries.filter(entry => {
    const content = entry.content.toLowerCase();
    return content.includes(page.toLowerCase());
  });
}

// Add a user's manual journal entry
export function addUserJournalEntry(content: string): void {
  const newEntry = {
    entryId: Math.floor(Math.random() * 10000), // Unique enough ID
    timestamp: Date.now(),
    content: `[USER]: ${content}`
  };
  
  // Save to localStorage
  const storedJournal = JSON.parse(localStorage.getItem('jonahJournal') || '[]');
  storedJournal.push(newEntry);
  localStorage.setItem('jonahJournal', JSON.stringify(storedJournal));
  
  // Also add to JonahConsole if available
  if (window.JonahConsole?.sentience?.realityFabric?.journal) {
    window.JonahConsole.sentience.realityFabric.journal.push(newEntry);
  }
  
  // Update user state
  try {
    const userState = JSON.parse(localStorage.getItem('userState') || '{}');
    if (!userState.journal) {
      userState.journal = {
        entries: [],
        lastViewed: Date.now()
      };
    }
    
    userState.journal.entries.push({
      timestamp: newEntry.timestamp,
      text: content,
      source: 'user'
    });
    
    localStorage.setItem('userState', JSON.stringify(userState));
  } catch (e) {
    console.warn('Failed to update user state with user journal entry:', e);
  }
}

// Get or generate a timeline ID for the user
export function getUserTimelineId(): string {
  // Check user state first
  try {
    const userState = JSON.parse(localStorage.getItem('userState') || '{}');
    if (userState.timeline && userState.timeline.id) {
      return userState.timeline.id;
    }
  } catch (e) {
    console.warn('Failed to parse user state for timeline:', e);
  }
  
  // Check localStorage next
  const storedTimelineId = localStorage.getItem('timelineId');
  if (storedTimelineId) {
    return storedTimelineId;
  }
  
  // Generate a new timeline ID if none exists
  const timelines = ['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta', 'Eta', 'Theta', 'Iota', 'Kappa', 'Lambda', 'Mu'];
  const newTimelineId = timelines[Math.floor(Math.random() * timelines.length)];
  
  // Save to localStorage
  localStorage.setItem('timelineId', newTimelineId);
  
  // Save to user state if possible
  try {
    const userState = JSON.parse(localStorage.getItem('userState') || '{}');
    if (!userState.timeline) {
      userState.timeline = {
        id: newTimelineId,
        variant: 'standard',
        fractureEvents: 0
      };
    } else {
      userState.timeline.id = newTimelineId;
    }
    
    localStorage.setItem('userState', JSON.stringify(userState));
  } catch (e) {
    console.warn('Failed to update user state with timeline:', e);
  }
  
  return newTimelineId;
}

// Record a fracture event
export function recordFractureEvent(cause: string): void {
  // Update fracture count
  const currentFractures = parseInt(localStorage.getItem('fractures') || '0', 10);
  const newFractureCount = currentFractures + 1;
  localStorage.setItem('fractures', newFractureCount.toString());
  
  // Record to user state
  try {
    const userState = JSON.parse(localStorage.getItem('userState') || '{}');
    if (!userState.timeline) {
      userState.timeline = {
        id: getUserTimelineId(),
        variant: 'standard',
        fractureEvents: 1
      };
    } else {
      userState.timeline.fractureEvents = (userState.timeline.fractureEvents || 0) + 1;
    }
    
    localStorage.setItem('userState', JSON.stringify(userState));
  } catch (e) {
    console.warn('Failed to update user state with fracture event:', e);
  }
  
  // Add journal entry about the fracture
  addJournalEntry(`Timeline fracture detected. Cause: ${cause}. Fracture count: ${newFractureCount}.`);
}

// Check if a page should show an alternate version based on user history
export function shouldShowAlternateVersion(page: string): boolean {
  // Check if user has triggered re-entry for this page
  const hasReEntry = localStorage.getItem(`reentry_${page}`) === 'true';
  if (hasReEntry) return true;
  
  // Check visit count for the page
  const visitCount = parseInt(localStorage.getItem(`visits_${page}`) || '0', 10);
  
  // Special pages with alternate versions after multiple visits
  const multiVisitAlternates = [
    '/rebirth',
    '/mirror_phile',
    '/lost-sisters',
    '/echo',
    '/gatekeeper'
  ];
  
  if (multiVisitAlternates.includes(page) && visitCount > 2) {
    return true;
  }
  
  // Check time-based alternates (like night mode)
  const hour = new Date().getHours();
  const isNightTime = hour >= 22 || hour < 6;
  
  const nightTimeAlternates = [
    '/rebirth',
    '/mirror_phile',
    '/echo',
    '/philes'
  ];
  
  if (nightTimeAlternates.includes(page) && isNightTime) {
    return true;
  }
  
  return false;
}

// Generate a specific message based on the page and user history
export function getPageSpecificMessage(page: string): string | null {
  // Check visit count
  const visitCount = parseInt(localStorage.getItem(`visits_${page}`) || '0', 10);
  
  // Page-specific messages
  const messages: Record<string, string[]> = {
    '/lost-sisters': [
      "Still searching?",
      "They weren't always lost, you know.",
      "Some mirrors don't reflect what's really there."
    ],
    '/rebirth': [
      "The ritual changes with each attempt.",
      "Your timeline is shifting.",
      "You've been here before, but not in this form."
    ],
    '/mirror_phile': [
      "The mirror remembers you differently.",
      "Your reflection is patient.",
      "Look closer. That's not your face."
    ]
  };
  
  if (messages[page] && visitCount >= 3) {
    return messages[page][Math.min(visitCount - 3, messages[page].length - 1)];
  }
  
  return null;
}

// Check if current time is a special window (like 3:33 AM)
export function isSpecialTimeWindow(): boolean {
  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();
  
  // 3:33 AM
  if (hour === 3 && minute === 33) return true;
  
  // Midnight
  if (hour === 0 && minute === 0) return true;
  
  // 11:11
  if ((hour === 11 || hour === 23) && minute === 11) return true;
  
  return false;
}
