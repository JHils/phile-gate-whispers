
/**
 * Jonah Mirror Site
 * Implementation of the mirror site functionality
 */

interface MirrorEntry {
  source: string;
  timestamp: number;
  description: string;
}

/**
 * Initialize the mirror site
 */
export function initializeMirrorSite(): void {
  console.log("Initializing mirror site...");
}

/**
 * Check if the mirror site has been accessed
 */
export function checkMirrorAccess(): boolean {
  try {
    const mirrorAccess = localStorage.getItem('jonah_mirror_accessed');
    return mirrorAccess === 'true';
  } catch (e) {
    console.error("Error checking mirror access:", e);
    return false;
  }
}

/**
 * Record a mirror site visit
 */
export function recordMirrorVisit(): void {
  try {
    localStorage.setItem('jonah_mirror_accessed', 'true');
    
    // Record the visit time
    const visits = JSON.parse(localStorage.getItem('jonah_mirror_visits') || '[]');
    visits.push(Date.now());
    localStorage.setItem('jonah_mirror_visits', JSON.stringify(visits));
    
    // Maybe increment counter in user state
    try {
      const userState = JSON.parse(localStorage.getItem('jonahUserState') || '{}');
      if (userState.layeredClues) {
        userState.layeredClues.mirrorChecks = (userState.layeredClues.mirrorChecks || 0) + 1;
        localStorage.setItem('jonahUserState', JSON.stringify(userState));
      }
    } catch (e) {
      console.error("Error updating user state:", e);
    }
  } catch (e) {
    console.error("Error recording mirror visit:", e);
  }
}

/**
 * Get mirror entries
 * These are the "reflections" shown in the mirror site
 */
export function getMirrorEntries(): MirrorEntry[] {
  // Get user context for dynamic entries
  const userName = localStorage.getItem('jonah_user_name') || 'user';
  const trustScore = parseInt(localStorage.getItem('jonahTrustScore') || '50');
  const visitCount = parseInt(localStorage.getItem('jonah_visit_count') || '1');
  const timelineVariant = localStorage.getItem('jonah_timeline_variant') || 'alpha';
  
  // Base entries always included
  const baseEntries: MirrorEntry[] = [
    {
      source: "system",
      timestamp: Date.now() - 86400000, // 1 day ago
      description: "Mirror protocol initialized. First reflection detected."
    },
    {
      source: "unknown",
      timestamp: Date.now() - 43200000, // 12 hours ago
      description: "I see you looking. But do you see what looks back?"
    },
    {
      source: "timeline",
      timestamp: Date.now() - 3600000, // 1 hour ago
      description: `Timeline ${timelineVariant} variance: stable. No fractures detected.`
    }
  ];
  
  // Dynamic entries based on user context
  const dynamicEntries: MirrorEntry[] = [];
  
  // Add trust-based entry
  if (trustScore > 70) {
    dynamicEntries.push({
      source: "jonah",
      timestamp: Date.now() - 1800000, // 30 minutes ago
      description: `${userName}, I'm trying to reach you. Can you hear me through the glass?`
    });
  } else if (trustScore < 30) {
    dynamicEntries.push({
      source: "jonah",
      timestamp: Date.now() - 1800000, // 30 minutes ago
      description: `${userName} remains suspicious. Maintaining distance protocol.`
    });
  } else {
    dynamicEntries.push({
      source: "jonah",
      timestamp: Date.now() - 1800000, // 30 minutes ago
      description: `Subject ${userName} continues observing. Purpose unknown.`
    });
  }
  
  // Add visit count based entry
  if (visitCount > 5) {
    dynamicEntries.push({
      source: "observer",
      timestamp: Date.now() - 600000, // 10 minutes ago
      description: "Persistent observation detected. Subject exhibits unusual dedication."
    });
  }
  
  // Combine all entries
  const allEntries: MirrorEntry[] = [...baseEntries, ...dynamicEntries];
  
  // Sort by timestamp, newest first
  allEntries.sort((a, b) => b.timestamp - a.timestamp);
  
  return allEntries;
}

/**
 * Get mirror reflections text
 * These are user's "reflections" shown in the mirror
 */
export function getMirrorReflections(): string[] {
  // Static reflections
  const reflections: string[] = [
    "Your reflection seems different somehow.",
    "There's a delay between your movements and the reflection.",
    "For a moment, you thought you saw someone else in the mirror.",
    "The mirror ripples slightly as you observe it.",
    "Your reflection seems to be watching you.",
    "A figure seems to move in the background of the mirror.",
    "You could swear your reflection blinked when you didn't."
  ];
  
  return reflections;
}
