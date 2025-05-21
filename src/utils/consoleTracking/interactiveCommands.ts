/**
 * Console Tracking - Interactive Commands
 * Tracks user interactions with specific console commands
 */

import { WhisperWithMetadata } from '@/utils/consoleTypes';

// Track testament command usage
export const trackTestamentInteraction = (entry: TestamentEntry): void => {
  const formattedDate = new Date(entry.timestamp).toLocaleDateString();
  console.log(`%c${entry.entryId}: ${entry.content}`, "color:#E3A507;");
};

// Track whisper command usage
export const trackWhisperInteraction = (whisper: WhisperWithMetadata): void => {
  const formattedDate = new Date(whisper.timestamp).toLocaleDateString();
  console.log(`%cWhisper found on ${whisper.path} at ${formattedDate}: ${whisper.whisper}`, "color:#A020F0;");
};

// Track dream journal entry
export const trackDreamJournalEntry = (dream: string, timestamp: number): void => {
  const formattedDate = new Date(timestamp).toLocaleDateString();
  console.log(`%cDream logged on ${formattedDate}: ${dream}`, "color:#00FFFF;");
};

// Track story flag discovery
export const trackStoryFlagDiscovery = (flagId: string, timestamp: number): void => {
  const formattedDate = new Date(timestamp).toLocaleDateString();
  console.log(`%cStory flag discovered on ${formattedDate}: ${flagId}`, "color:#FF4500;");
};

// Track book code unlock
export const trackBookCodeUnlock = (code: string, timestamp: number): void => {
  const formattedDate = new Date(timestamp).toLocaleDateString();
  console.log(`%cBook code unlocked on ${formattedDate}: ${code}`, "color:#228B22;");
};

// Track simba interaction
export const trackSimbaInteraction = (message: string, timestamp: number): void => {
  const formattedDate = new Date(timestamp).toLocaleDateString();
  console.log(`%cSimba interaction on ${formattedDate}: ${message}`, "color:#DAA520;");
};

// Track quest completion
export const trackQuestCompletion = (questId: string, timestamp: number): void => {
  const formattedDate = new Date(timestamp).toLocaleDateString();
  console.log(`%cQuest completed on ${formattedDate}: ${questId}`, "color:#1E90FF;");
};

// Track news flash display
export const trackNewsFlashDisplay = (topic: string, timestamp: number): void => {
  const formattedDate = new Date(timestamp).toLocaleDateString();
  console.log(`%cNews flash displayed on ${formattedDate}: ${topic}`, "color:#8B008B;");
};

// Track weather report display
export const trackWeatherReportDisplay = (condition: string, timestamp: number): void => {
  const formattedDate = new Date(timestamp).toLocaleDateString();
  console.log(`%cWeather report displayed on ${formattedDate}: ${condition}`, "color:#4682B4;");
};

// Track ecological awareness event
export const trackEcologicalAwarenessEvent = (event: string, timestamp: number): void => {
  const formattedDate = new Date(timestamp).toLocaleDateString();
  console.log(`%cEcological awareness event on ${formattedDate}: ${event}`, "color:#32CD32;");
};

interface TestamentEntry {
  timestamp: number;
  entryId: string;
  content: string;
  title?: string;
}
