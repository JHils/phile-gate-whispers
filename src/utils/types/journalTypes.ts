
/**
 * Journal entry types for Jonah's reality fabric
 */

export interface JournalEntryContent {
  content: string;
  timestamp: number;
  entryId: number;
}

export interface JournalEntry {
  content: string;
  timestamp: number;
  entryId: number;
}

export function createJournalEntry(content: JournalEntryContent): JournalEntry {
  return {
    content: content.content,
    timestamp: content.timestamp,
    entryId: content.entryId
  };
}
