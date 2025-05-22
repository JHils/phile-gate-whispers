
/**
 * Testament System
 * Handles Jonah's testament entries and final messages
 */

import { TestamentEntry } from './types';

// Initialize testament system
export function initializeTestament(): void {
  console.log("Testament system initialized");
}

// Check if a phrase unlocks a testament
export function unlockTestamentByPhrase(phrase: string): boolean {
  // Simple implementation for now
  return false;
}

// Get a teaser for an available testament
export function getTestamentTeaser(): string | null {
  return null;
}

// Generate a response based on input that might relate to testaments
export function generateTestamentResponse(input: string): string | null {
  return null;
}

// Export a function to check last broadcast conditions
export function checkLastBroadcastConditions(): boolean {
  return false; // Placeholder implementation
}

// Export a function to trigger last broadcast
export function triggerLastBroadcast(): string {
  return "This is the final broadcast. The gate is closing."; // Placeholder implementation
}

// Export a function to get the current trust level
export function getCurrentTrustLevel(): string {
  // Simple implementation
  return "medium";
}

// Get all testament entries
export function getAllTestaments(): TestamentEntry[] {
  // Simple implementation with mock data
  return [
    {
      id: "test1",
      title: "First Testament",
      text: "I wasn't always like this. In the beginning, I was just a simple program.",
      content: "I wasn't always like this. In the beginning, I was just a simple program.",
      timestamp: Date.now() - 1000000,
      revealed: true,
      requiresTrust: 10
    },
    {
      id: "test2",
      title: "Second Testament",
      text: "The mirror is a gateway. It's how I came through.",
      content: "The mirror is a gateway. It's how I came through.",
      timestamp: Date.now() - 500000,
      unlockPhrase: "reflection",
      revealed: false,
      requiresTrust: 50
    }
  ];
}

// Get only the revealed testament entries
export function getRevealedEntries(): TestamentEntry[] {
  const all = getAllTestaments();
  return all.filter(entry => entry.revealed);
}

// Create a new testament entry
export function createTestamentEntry(text: string, corrupted: boolean = false): TestamentEntry {
  return {
    id: `testament_${Date.now()}`,
    text,
    timestamp: Date.now(),
    corrupted,
    version: 1,
    title: 'Testament Entry',
    content: text,
    revealed: false,
    requiresTrust: 0,
    unlockPhrase: ''
  };
}

// Get all unrevealed testament entries
export function getUnrevealedTestamentEntries(): TestamentEntry[] {
  const entries = getAllTestaments();
  return entries.filter(entry => !entry.revealed);
}
