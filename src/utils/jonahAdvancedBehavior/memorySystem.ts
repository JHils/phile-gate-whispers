/**
 * Memory System
 * Handles storage and retrieval of memory fragments
 */

// Initialize the memory system
export function initializeMemorySystem(): void {
  console.log("Memory system initialized");
}

// Store a memory fragment
export function storeMemoryFragment(fragment: string): boolean {
  try {
    // Get existing fragments
    const fragments = JSON.parse(localStorage.getItem('jonah_memory_fragments') || '[]');
    
    // Add new fragment with timestamp
    fragments.push({
      content: fragment,
      timestamp: Date.now()
    });
    
    // Keep only the most recent 50 fragments
    const trimmedFragments = fragments.slice(-50);
    
    // Store back to localStorage
    localStorage.setItem('jonah_memory_fragments', JSON.stringify(trimmedFragments));
    
    // Update JonahConsole if available
    if (window.JonahConsole?.argData) {
      window.JonahConsole.argData.memoryFragments = 
        trimmedFragments.map(frag => frag.content);
    }
    
    return true;
  } catch (e) {
    console.error("Error storing memory fragment:", e);
    return false;
  }
}

// Get memory fragments, optionally filtered by search term
export function getMemoryFragments(searchTerm?: string): string[] {
  try {
    const fragments = JSON.parse(localStorage.getItem('jonah_memory_fragments') || '[]');
    
    if (searchTerm) {
      return fragments
        .filter((frag: {content: string}) => 
          frag.content.toLowerCase().includes(searchTerm.toLowerCase()))
        .map((frag: {content: string}) => frag.content);
    }
    
    return fragments.map((frag: {content: string}) => frag.content);
  } catch (e) {
    console.error("Error retrieving memory fragments:", e);
    return [];
  }
}

// Clear memory fragments
export function clearMemoryFragments(): boolean {
  try {
    localStorage.removeItem('jonah_memory_fragments');
    
    // Update JonahConsole if available
    if (window.JonahConsole?.argData) {
      window.JonahConsole.argData.memoryFragments = [];
    }
    
    return true;
  } catch (e) {
    console.error("Error clearing memory fragments:", e);
    return false;
  }
}

// Get related fragments based on input
export function getRelatedFragments(input: string): string[] {
  const words = input.toLowerCase().split(/\s+/);
  const fragments = getMemoryFragments();
  
  // Simple ranking by word match count
  const rankedFragments = fragments.map(fragment => {
    const matchCount = words.filter(word => 
      fragment.toLowerCase().includes(word)).length;
    return { fragment, matchCount };
  });
  
  // Sort by match count and return top 3
  return rankedFragments
    .sort((a, b) => b.matchCount - a.matchCount)
    .slice(0, 3)
    .filter(item => item.matchCount > 0)
    .map(item => item.fragment);
}
