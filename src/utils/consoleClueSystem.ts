
/**
 * Console Clue System
 * Handles clues and hints for the ARG
 */

import { ClueData } from './jonahAdvancedBehavior/types';

// Initialize clues in the console object
export function initializeClues() {
  if (typeof window !== 'undefined' && window.JonahConsole) {
    // Initialize clues array if it doesn't exist
    if (!window.JonahConsole.argData) {
      window.JonahConsole.argData = {};
    }
    
    if (!window.JonahConsole.argData.consoleCluesTouched) {
      window.JonahConsole.argData.consoleCluesTouched = [];
      
      // Add initial clues
      window.JonahConsole.argData.consoleCluesTouched.push({
        id: 'clue_001',
        name: 'First Command',
        discovered: false,
        timestamp: Date.now(),
        description: 'You used your first console command. Keep exploring.',
        text: 'You used your first console command. Keep exploring.',
        found: false,
        category: 'console'
      });
      
      window.JonahConsole.argData.consoleCluesTouched.push({
        id: 'clue_002',
        name: 'Book Knowledge',
        discovered: false,
        timestamp: Date.now(),
        description: 'There are codes hidden in books throughout this site.',
        text: 'There are codes hidden in books throughout this site.',
        found: false,
        category: 'books'
      });
      
      window.JonahConsole.argData.consoleCluesTouched.push({
        id: 'clue_003',
        name: 'Testament Fragments',
        discovered: false,
        timestamp: Date.now(),
        description: 'Jonah\'s testament is scattered across the site.',
        text: 'Jonah\'s testament is scattered across the site.',
        found: false,
        category: 'testaments'
      });
      
      window.JonahConsole.argData.consoleCluesTouched.push({
        id: 'clue_004',
        name: 'Mirror System',
        discovered: false,
        timestamp: Date.now(),
        description: 'The mirror reflects what you want to see, not what is there.',
        text: 'The mirror reflects what you want to see, not what is there.',
        found: false,
        category: 'mirror'
      });
      
      window.JonahConsole.argData.consoleCluesTouched.push({
        id: 'clue_005',
        name: 'Hidden Commands',
        discovered: false,
        timestamp: Date.now(),
        description: 'Some console commands are hidden until certain conditions are met.',
        text: 'Some console commands are hidden until certain conditions are met.',
        found: false,
        category: 'console'
      });
      
      window.JonahConsole.argData.consoleCluesTouched.push({
        id: 'clue_006',
        name: 'Echo System',
        discovered: false,
        timestamp: Date.now(),
        description: 'The echo command has more functionality than it first appears.',
        text: 'The echo command has more functionality than it first appears.',
        found: false,
        category: 'echo'
      });
      
      window.JonahConsole.argData.consoleCluesTouched.push({
        id: 'clue_007',
        name: 'Time Sensitivity',
        discovered: false,
        timestamp: Date.now(),
        description: 'Some features only activate at certain times of day.',
        text: 'Some features only activate at certain times of day.',
        found: false,
        category: 'time'
      });
    }
    
    // Register the clue commands
    window.showClue = function(clueId) {
      return revealClueById(clueId);
    };
    
    window.listClues = function() {
      listDiscoveredClues();
      return "Listing all discovered clues.";
    };
  }
}

// Mark a clue as discovered
export function discoverClue(clueId: string): boolean {
  if (typeof window === 'undefined' || !window.JonahConsole?.argData?.consoleCluesTouched) {
    return false;
  }
  
  const clues = window.JonahConsole.argData.consoleCluesTouched as ClueData[];
  const clue = clues.find(c => c.id === clueId);
  
  if (clue && !clue.discovered) {
    clue.discovered = true;
    clue.timestamp = Date.now();
    return true;
  }
  
  return false;
}

// Check if a clue has been discovered
export function isClueDiscovered(clueId: string): boolean {
  if (typeof window === 'undefined' || !window.JonahConsole?.argData?.consoleCluesTouched) {
    return false;
  }
  
  const clues = window.JonahConsole.argData.consoleCluesTouched as ClueData[];
  const clue = clues.find(c => c.id === clueId);
  
  return clue ? clue.discovered : false;
}

// Get clue details
export function getClueDetails(clueId: string): string {
  if (typeof window === 'undefined' || !window.JonahConsole?.argData?.consoleCluesTouched) {
    return "Clue system not initialized.";
  }
  
  const clues = window.JonahConsole.argData.consoleCluesTouched as ClueData[];
  const clue = clues.find(c => c.id === clueId);
  
  if (!clue) {
    return "Clue not found.";
  }
  
  return clue.description || "No details available.";
}

// List all discovered clues
export function listDiscoveredClues(): void {
  if (typeof window === 'undefined' || !window.JonahConsole?.argData?.consoleCluesTouched) {
    console.log("No clues available.");
    return;
  }
  
  console.log("%cDISCOVERED CLUES:", "color: #3c9a8f; font-size: 16px; font-weight: bold;");
  
  const clues = window.JonahConsole.argData.consoleCluesTouched as ClueData[];
  const discoveredClues = clues.filter(clue => clue.discovered);
  
  if (discoveredClues.length === 0) {
    console.log("%cNo clues discovered yet. Keep exploring.", "color: gray; font-style: italic;");
    return;
  }
  
  discoveredClues.forEach(clue => {
    console.log(`%c${clue.name}: ${clue.description}`, "color: #3c9a8f; font-size: 14px;");
  });
}

// Reveal a specific clue by ID
export function revealClueById(clueId: string): string {
  if (typeof window === 'undefined' || !window.JonahConsole?.argData?.consoleCluesTouched) {
    return "Clue system not initialized.";
  }
  
  const clues = window.JonahConsole.argData.consoleCluesTouched as ClueData[];
  const clue = clues.find(c => c.id === clueId);
  
  if (!clue) {
    return "Clue not found.";
  }
  
  // Mark as discovered
  clue.discovered = true;
  clue.timestamp = Date.now();
  
  // Return the clue details
  console.log(`%cCLUE DISCOVERED: ${clue.name}`, "color: #3c9a8f; font-size: 16px; font-weight: bold;");
  console.log(`%c${clue.description}`, "color: #3c9a8f; font-size: 14px;");
  
  return `Clue "${clue.name}" has been added to your discoveries.`;
}

// Add a new clue
export function addClue(name: string, description: string): string {
  if (typeof window === 'undefined' || !window.JonahConsole?.argData?.consoleCluesTouched) {
    return "Clue system not initialized.";
  }
  
  const clueId = `clue_custom_${Date.now()}`;
  
  const newClue: ClueData = {
    id: clueId,
    name: name,
    description: description,
    discovered: true,
    timestamp: Date.now(),
    text: description,
    found: true,
    category: 'custom'
  };
  
  window.JonahConsole.argData.consoleCluesTouched.push(newClue);
  
  return `New clue "${name}" added to your discoveries.`;
}

// Initialize on load
initializeClues();

// Register additional commands
if (typeof window !== 'undefined') {
  window.addClue = addClue;
  window.getClueDetails = getClueDetails;
}
