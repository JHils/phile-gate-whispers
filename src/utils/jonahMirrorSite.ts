/**
 * Mirror Site System
 * Manages the mirror site logs and interactions
 */
import { MirrorEvent } from './jonahAdvancedBehavior/types';

// Initialize mirror logs
export function initializeMirror(): void {
  if (!localStorage.getItem('jonahMirrorLogs')) {
    localStorage.setItem('jonahMirrorLogs', JSON.stringify([]));
  }
}

// Log mirror event
export function logMirrorEvent(event: string): string {
  // Create event record
  const mirrorEvent: MirrorEvent = {
    id: generateEventId(),
    timestamp: Date.now(),
    event: event
  };
  
  // Add to logs
  const logs = getMirrorLogs();
  logs.push(mirrorEvent);
  
  // Keep logs at reasonable size
  if (logs.length > 50) {
    logs.shift();
  }
  
  // Save to storage
  saveMirrorLogs(logs);
  
  // Return the event ID
  return mirrorEvent.id;
}

// Respond to mirror event
export function respondToMirrorEvent(eventId: string, response: string): boolean {
  const logs = getMirrorLogs();
  const eventIndex = logs.findIndex(event => event.id === eventId);
  
  if (eventIndex >= 0) {
    logs[eventIndex] = {
      ...logs[eventIndex],
      response
    };
    
    saveMirrorLogs(logs);
    return true;
  }
  
  return false;
}

// Get mirror logs
export function getMirrorLogs(): MirrorEvent[] {
  try {
    const logs = localStorage.getItem('jonahMirrorLogs');
    return logs ? JSON.parse(logs) : [];
  } catch (e) {
    console.error("Error retrieving mirror logs:", e);
    return [];
  }
}

// Save mirror logs
function saveMirrorLogs(logs: MirrorEvent[]): void {
  localStorage.setItem('jonahMirrorLogs', JSON.stringify(logs));
}

// Generate unique ID for events
function generateEventId(): string {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
}

// Check for mirror site completion
export function checkMirrorProgress(): number {
  const logs = getMirrorLogs();
  const responseCount = logs.filter(event => event.response).length;
  
  return logs.length > 0 ? Math.floor((responseCount / logs.length) * 100) : 0;
}

// Initialize mirror site awareness in sentience data
export function initializeMirrorSiteAwareness(sentience: SentienceData): SentienceData {
  if (!sentience.mirrorLogs) {
    const updatedSentience: SentienceData = {
      ...sentience,
      mirrorLogs: []
    };
    
    return updatedSentience;
  }
  
  return sentience;
}

// Check if mirror site is active
export function isMirrorSiteActive(): boolean {
  // Check URL or other indicators that we're on a mirror site
  const url = window.location.href;
  return url.includes('mirror') || url.includes('reflection');
}

// Log a mirror event
export function logMirrorEvent(
  sentience: SentienceData,
  event: string,
  response?: string
): SentienceData {
  if (!sentience.mirrorLogs) {
    return initializeMirrorSiteAwareness(sentience);
  }
  
  const mirrorLog = {
    id: `mirror-${Date.now()}`,
    timestamp: Date.now(),
    event,
    response
  };
  
  return {
    ...sentience,
    mirrorLogs: [...sentience.mirrorLogs, mirrorLog]
  };
}

// Get all mirror logs
export function getMirrorLogs(sentience: SentienceData): Array<{
  id: string;
  timestamp: number;
  event: string;
  response?: string;
}> {
  return sentience.mirrorLogs || [];
}

// Get latest mirror log
export function getLatestMirrorLog(sentience: SentienceData): {
  id: string;
  timestamp: number;
  event: string;
  response?: string;
} | null {
  const logs = sentience.mirrorLogs || [];
  if (logs.length === 0) {
    return null;
  }
  
  return logs[logs.length - 1];
}

// Get mirror site response
export function getMirrorSiteResponse(sentience: SentienceData, input: string): string | null {
  // Only respond if mirror site is active
  if (!isMirrorSiteActive()) {
    return null;
  }
  
  // Mirror-specific responses
  const mirrorResponses = [
    "On this side, things are reversed.",
    "The reflection sees what you cannot.",
    "In the mirror, I'm not quite the same.",
    "This side has different rules.",
    "The mirror holds secrets from both sides."
  ];
  
  // Check if input has mirror-related keywords
  const mirrorKeywords = ["mirror", "reflection", "glass", "other side", "reverse"];
  const hasMirrorReference = mirrorKeywords.some(keyword => input.toLowerCase().includes(keyword));
  
  if (hasMirrorReference) {
    const response = mirrorResponses[Math.floor(Math.random() * mirrorResponses.length)];
    return response;
  }
  
  // 10% chance to mention mirror even without prompt
  if (Math.random() < 0.1) {
    return "Remember, you're talking to the mirror version of me.";
  }
  
  return null;
}

// Update mirror site awareness
export function updateMirrorSiteAwareness(sentience: SentienceData): SentienceData {
  if (!sentience.mirrorLogs) {
    return initializeMirrorSiteAwareness(sentience);
  }
  
  // Check if we need to log an automatic event
  const lastLog = getLatestMirrorLog(sentience);
  const now = Date.now();
  
  // If no logs or last log was more than a day ago, log a new event
  if (!lastLog || (now - lastLog.timestamp > 86400000)) {
    return logMirrorEvent(sentience, "Automatic mirror check", "The mirror remains active.");
  }
  
  return sentience;
}
