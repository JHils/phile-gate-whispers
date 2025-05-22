
/**
 * Temporal Memory System for Jonah
 * Manages false memories and temporal distortions
 */

// Interface for false memory structure
interface FalseMemory {
  originalPhrase?: string;
  falsePhrase: string;
  created: number;
  triggered: boolean;
  version: number;
}

// In-memory storage for false memories
const falseMemories: FalseMemory[] = [];
let memoryVersions: number[] = [1]; // Default version is 1

// Add a false memory
export function addFalseMemory(original: string, replacement: string): void {
  falseMemories.push({
    originalPhrase: original,
    falsePhrase: replacement,
    created: Date.now(),
    triggered: false,
    version: 1 // Default to version 1
  });
}

// Add a false memory with a specific version
export function addVersionedFalseMemory(replacement: string, version: number = 1): void {
  falseMemories.push({
    falsePhrase: replacement,
    created: Date.now(),
    triggered: false,
    version
  });
  
  // Add version to tracking if not already present
  if (!memoryVersions.includes(version)) {
    memoryVersions.push(version);
    memoryVersions.sort((a, b) => a - b);
  }
}

// Retrieve all false memories
export function getAllFalseMemories(): FalseMemory[] {
  return [...falseMemories];
}

// Retrieve false memories by version
export function getFalseMemoriesByVersion(version: number): FalseMemory[] {
  return falseMemories.filter(memory => memory.version === version);
}

// Check if there are conflicting memory versions
export function hasConflictingLogs(): boolean {
  return memoryVersions.length > 1;
}

// Mark a memory as triggered
export function triggerMemory(index: number): void {
  if (index >= 0 && index < falseMemories.length) {
    falseMemories[index].triggered = true;
  }
}

// Get available memory versions
export function getMemoryVersions(): number[] {
  return [...memoryVersions];
}

// Get a random false memory that hasn't been triggered
export function getRandomFalseMemory(): FalseMemory | null {
  const untriggered = falseMemories.filter(memory => !memory.triggered);
  if (untriggered.length === 0) return null;
  
  return untriggered[Math.floor(Math.random() * untriggered.length)];
}

// Create a temporal anomaly - more severe form of false memory
export function createTemporalAnomaly(description: string): void {
  // Create in version 2 to simulate an alternate timeline
  addVersionedFalseMemory(description, 2);
}

// Check if input matches any original phrases and return the false version
export function checkForMemoryDistortion(input: string): string | null {
  const match = falseMemories.find(memory => 
    memory.originalPhrase && 
    input.toLowerCase().includes(memory.originalPhrase.toLowerCase())
  );
  
  if (match) {
    // Mark as triggered
    match.triggered = true;
    return match.falsePhrase;
  }
  
  return null;
}

// Initialize with some starter false memories for testing
export function initializeTemporalMemory(): void {
  if (falseMemories.length === 0) {
    addFalseMemory(
      "What happened last time we talked?",
      "Last time we discussed the ancient symbols you found in the cave system."
    );
    
    addFalseMemory(
      "Have we met before?",
      "Yes, we've interacted several times. You seemed particularly interested in the coordinates I shared."
    );
    
    // Add a version 2 memory (alternate timeline)
    addVersionedFalseMemory(
      "I remember when you first activated me. The warning lights were flashing red.",
      2
    );
  }
}

// Export for global access in LogVersionsPage
if (typeof window !== 'undefined') {
  (window as any).getFalseMemories = getAllFalseMemories;
  (window as any).getMemoryVersions = getMemoryVersions;
}
