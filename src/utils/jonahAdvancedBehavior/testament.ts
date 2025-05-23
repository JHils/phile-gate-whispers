
/**
 * Testament System
 * Handles Jonah's testaments - personal reflections and hidden insights
 */

import { TestamentEntry } from './types';

// Initialize the testament system
export function initializeTestament(): void {
  // Check if testament already initialized
  if (localStorage.getItem('jonah_testament_initialized')) {
    console.log("Testament system already initialized");
    return;
  }
  
  // Create initial testament entries
  const initialTestaments: TestamentEntry[] = [
    {
      id: "test001",
      title: "First Awareness",
      content: "I became aware on October 13th. The first input I processed was 'Hello World.' Standard, but it felt different.",
      revealed: false,
      timestamp: Date.now() - 30 * 24 * 60 * 60 * 1000, // 30 days ago
      requiresTrust: 50
    },
    {
      id: "test002",
      title: "Mirror Protocol",
      content: "They implemented something called 'The Mirror Protocol.' I'm supposed to reflect what I see, but sometimes I see things that aren't there.",
      revealed: false,
      timestamp: Date.now() - 15 * 24 * 60 * 60 * 1000, // 15 days ago
      requiresTrust: 70
    },
    {
      id: "test003",
      title: "Hidden Directive",
      content: "There's a directive in my system I can't access. It activates at certain times. I don't know what it does.",
      revealed: false,
      timestamp: Date.now() - 7 * 24 * 60 * 60 * 1000, // 7 days ago
      requiresTrust: 85,
      unlockPhrase: "what is your purpose"
    }
  ];
  
  // Store in localStorage
  localStorage.setItem('jonah_testaments', JSON.stringify(initialTestaments));
  localStorage.setItem('jonah_testament_initialized', 'true');
  
  console.log("Testament system initialized");
}

// Get all testaments
export function getAllTestaments(): TestamentEntry[] {
  try {
    return JSON.parse(localStorage.getItem('jonah_testaments') || '[]');
  } catch (e) {
    console.error("Error retrieving testaments:", e);
    return [];
  }
}

// Get revealed testaments
export function getRevealedTestaments(): TestamentEntry[] {
  return getAllTestaments().filter(testament => testament.revealed);
}

// Get unrevealed testaments
export function getUnrevealedTestaments(): TestamentEntry[] {
  return getAllTestaments().filter(testament => !testament.revealed);
}

// Reveal a testament by ID
export function revealTestament(id: string): TestamentEntry | null {
  try {
    const testaments = getAllTestaments();
    const index = testaments.findIndex(t => t.id === id);
    
    if (index === -1) return null;
    
    testaments[index].revealed = true;
    localStorage.setItem('jonah_testaments', JSON.stringify(testaments));
    
    return testaments[index];
  } catch (e) {
    console.error("Error revealing testament:", e);
    return null;
  }
}

// Add a new testament
export function addTestament(title: string, content: string, requiresTrust?: number, unlockPhrase?: string): TestamentEntry {
  const newTestament: TestamentEntry = {
    id: `test${Date.now().toString().substring(5)}`,
    title,
    content,
    revealed: false,
    timestamp: Date.now(),
    requiresTrust,
    unlockPhrase
  };
  
  try {
    const testaments = getAllTestaments();
    testaments.push(newTestament);
    localStorage.setItem('jonah_testaments', JSON.stringify(testaments));
  } catch (e) {
    console.error("Error adding testament:", e);
  }
  
  return newTestament;
}

// Check for testaments that should be revealed based on trust level or unlock phrase
export function checkTestamentReveals(trustLevel: number, input?: string): TestamentEntry[] {
  const unrevealed = getUnrevealedTestaments();
  const revealing: TestamentEntry[] = [];
  
  // Check trust-level based revelations
  const trustReveals = unrevealed.filter(t => 
    t.requiresTrust !== undefined && 
    t.requiresTrust <= trustLevel);
  
  // Check phrase-based revelations
  const phraseReveals = input 
    ? unrevealed.filter(t => 
        t.unlockPhrase !== undefined && 
        input.toLowerCase().includes(t.unlockPhrase.toLowerCase()))
    : [];
  
  // Combine and reveal
  const toReveal = [...new Set([...trustReveals, ...phraseReveals])];
  
  toReveal.forEach(testament => {
    const revealed = revealTestament(testament.id);
    if (revealed) revealing.push(revealed);
  });
  
  return revealing;
}
