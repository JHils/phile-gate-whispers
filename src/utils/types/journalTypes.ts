
/**
 * Journal Entry Type Definitions
 */

export interface JournalEntry {
  entryId: number;
  timestamp: number;
  content: string;
}

export type JournalEntryContent = string;

/**
 * Convert a simple string content to a full journal entry
 */
export function createJournalEntry(content: JournalEntryContent): JournalEntry {
  return {
    entryId: Date.now(),
    timestamp: Date.now(),
    content
  };
}
