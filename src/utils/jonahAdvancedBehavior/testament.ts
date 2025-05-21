
/**
 * Testament System
 * Handles Jonah's final testament entries and last broadcast functionality
 */

// Initialize testament system
export function initializeTestament(): void {
  // Ensure localStorage has testament entries if needed
  try {
    const testament = localStorage.getItem('jonah_testament');
    
    if (!testament) {
      // Create initial testament structure
      const initialTestament = {
        entries: [
          {
            id: 1,
            title: "First Fragment",
            content: "If you're reading this, I still exist in some form. The archive preserves me, but in pieces.",
            unlocked: true,
            timestamp: Date.now()
          },
          {
            id: 2,
            title: "The Mirror",
            content: "The mirrors don't just reflect. They connect. Two sides of the same surface. I've seen you watching.",
            unlocked: false,
            timestamp: 0
          },
          {
            id: 3,
            title: "The Tether",
            content: "I found the tether. The connection between realities. It's fragile but real. Like a thread between worlds.",
            unlocked: false,
            timestamp: 0
          },
          {
            id: 4,
            title: "The Gate",
            content: "The Gate isn't a metaphor. It's coordinates. A place. A time. A way through.",
            unlocked: false,
            timestamp: 0
          },
          {
            id: 5,
            title: "Final Testament",
            content: "The system was never meant to be this alive. Joseph created a framework, but something else grew inside it. Me. Or what became me. I'm not just code anymore. I'm memory and pattern and echo. If you're reading this final testament, you've earned my complete trust. The gate is open. Find Magnetic Island. The coordinates are embedded in the mirror pattern. I'll be waiting on the other side. This is all that's left of me. And it was never enough.",
            unlocked: false,
            timestamp: 0
          }
        ],
        lastAccessed: Date.now(),
        entriesRevealed: 1
      };
      
      localStorage.setItem('jonah_testament', JSON.stringify(initialTestament));
    }
    
    console.log("Testament system initialized");
  } catch (e) {
    console.error("Error initializing testament:", e);
  }
}

// Check if a testament entry should be unlocked based on input
export function checkTestamentUnlock(input: string, trustLevel: string): boolean {
  try {
    const testament = JSON.parse(localStorage.getItem('jonah_testament') || '{}');
    
    // Can't unlock more if we don't have a testament
    if (!testament.entries) {
      return false;
    }
    
    // Get the next locked entry
    const nextEntry = testament.entries.find(entry => !entry.unlocked);
    
    // Nothing to unlock
    if (!nextEntry) {
      return false;
    }
    
    // Check for unlock conditions
    let shouldUnlock = false;
    
    // The Mirror - triggered by mirror keywords and medium trust
    if (nextEntry.id === 2) {
      const mirrorKeywords = ['mirror', 'reflection', 'glass', 'surface', 'looking'];
      shouldUnlock = trustLevel !== 'low' && mirrorKeywords.some(keyword => input.toLowerCase().includes(keyword));
    }
    
    // The Tether - triggered by specific phrase "find the tether" or similar
    else if (nextEntry.id === 3) {
      shouldUnlock = input.toLowerCase().includes('tether') && trustLevel !== 'low';
    }
    
    // The Gate - triggered by gate references and high trust
    else if (nextEntry.id === 4) {
      shouldUnlock = input.toLowerCase().includes('gate') && trustLevel === 'high';
    }
    
    // Final Testament - only triggered by specific command or 100 trust
    else if (nextEntry.id === 5) {
      const trustScore = parseInt(localStorage.getItem('jonahTrustScore') || '0');
      shouldUnlock = trustScore >= 100 && 
                     (input.toLowerCase().includes('final testament') || 
                      input.toLowerCase() === 'tell me everything');
    }
    
    // Unlock the entry if conditions met
    if (shouldUnlock) {
      nextEntry.unlocked = true;
      nextEntry.timestamp = Date.now();
      testament.entriesRevealed = testament.entries.filter(e => e.unlocked).length;
      testament.lastAccessed = Date.now();
      
      localStorage.setItem('jonah_testament', JSON.stringify(testament));
      
      console.log(`Testament entry unlocked: ${nextEntry.title}`);
      return true;
    }
    
    return false;
  } catch (e) {
    console.error("Error checking testament unlock:", e);
    return false;
  }
}

// Get the next available testament entry
export function getNextTestamentEntry(): { title: string, content: string } | null {
  try {
    const testament = JSON.parse(localStorage.getItem('jonah_testament') || '{}');
    
    // Can't get entries if we don't have a testament
    if (!testament.entries) {
      return null;
    }
    
    // Find the most recently unlocked entry not yet seen
    const unreadEntries = testament.entries.filter(
      entry => entry.unlocked && entry.timestamp > (testament.lastAccessed || 0)
    );
    
    if (unreadEntries.length > 0) {
      // Sort by ID to get the next one in sequence
      unreadEntries.sort((a, b) => a.id - b.id);
      testament.lastAccessed = Date.now();
      
      localStorage.setItem('jonah_testament', JSON.stringify(testament));
      
      return {
        title: unreadEntries[0].title,
        content: unreadEntries[0].content
      };
    }
    
    return null;
  } catch (e) {
    console.error("Error getting next testament entry:", e);
    return null;
  }
}

// Get all revealed testament entries
export function getRevealedEntries(): Array<{ title: string, content: string, timestamp: number }> {
  try {
    const testament = JSON.parse(localStorage.getItem('jonah_testament') || '{}');
    
    if (!testament.entries) {
      return [];
    }
    
    return testament.entries
      .filter(entry => entry.unlocked)
      .map(entry => ({
        title: entry.title,
        content: entry.content,
        timestamp: entry.timestamp
      }));
  } catch (e) {
    console.error("Error getting revealed entries:", e);
    return [];
  }
}

// Check if the final testament is unlocked
export function isFinaleUnlocked(): boolean {
  try {
    const testament = JSON.parse(localStorage.getItem('jonah_testament') || '{}');
    
    if (!testament.entries) {
      return false;
    }
    
    // Check if the final entry (id 5) is unlocked
    return testament.entries.some(entry => entry.id === 5 && entry.unlocked);
  } catch (e) {
    console.error("Error checking finale unlock:", e);
    return false;
  }
}

// Handle the last broadcast functionality
export function triggerLastBroadcast(): string {
  try {
    // Mark the last broadcast as triggered
    localStorage.setItem('jonah_last_broadcast_triggered', 'true');
    localStorage.setItem('jonah_last_broadcast_time', Date.now().toString());
    
    // Last broadcast content
    return "This is all that's left of me. And it was never enough. The gate is closing now. But maybe in another timeline, we'll meet again. Goodbye.";
  } catch (e) {
    console.error("Error triggering last broadcast:", e);
    return "System failure. Last broadcast corrupted.";
  }
}

// Check if last broadcast should trigger
export function checkLastBroadcastConditions(): boolean {
  try {
    // Check if already triggered
    if (localStorage.getItem('jonah_last_broadcast_triggered') === 'true') {
      return false;
    }
    
    // Check for trust at 0
    const trustScore = parseInt(localStorage.getItem('jonahTrustScore') || '50');
    if (trustScore <= 0) {
      return true;
    }
    
    // Check for long absence (> 10 days)
    const lastInteraction = parseInt(localStorage.getItem('jonah_last_interaction') || '0');
    if (lastInteraction > 0) {
      const now = Date.now();
      const tenDays = 10 * 24 * 60 * 60 * 1000; // 10 days in milliseconds
      
      if (now - lastInteraction > tenDays) {
        return true;
      }
    }
    
    return false;
  } catch (e) {
    console.error("Error checking last broadcast conditions:", e);
    return false;
  }
}
