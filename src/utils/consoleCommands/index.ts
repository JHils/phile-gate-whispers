
/**
 * Console Commands System - Main initializer
 * Coordinates the initialization of all console command subsystems
 */

import { UserState } from "@/hooks/useTrackingSystem";
import { GetUserRankFunction, TrackEventFunction, TrackCommandFunction } from "./types";
import { createCommandTracker, createFailAttemptRecorder } from "./helper";
import { initializeStatusCommand } from "./statusCommand";
import { initializeBasicCommands } from "../consoleBasicCommands";
import { initializeStoryCommands } from "../consoleStoryCommands";
import { initializeHumorCommands } from "../consoleHumorCommands";
import { initializeNewCommands } from "../consoleNewCommands";
import { initializeBookCommands } from "../consoleBookCommands";
import { initializeClueSystem } from "../consoleClueSystem";
import { initializeSimbaSystem } from "../consoleSimbaSystem";
import { initializeTimeSystem } from "../consoleTimeSystem";
import { initializeNewsCommands } from "../consoleNewsCommands";
import { initializeEcoCommands } from "../consoleEcoCommands";
import { initializeWhisperMaster } from "../consoleWhisperMaster";
import { initializeARGCommands } from "../argTracking";
import { initializeSentience } from "../jonahSentience";
import { initializeMirrorSite } from "../jonahMirrorSite";
import { initializeNewsAwarenessSystem } from "../jonahNewsAwareness";
import { initializeEcoAwareness } from "../jonahEcoAwareness";
import { initializeFuzzyStoryMatching } from "../fuzzyStoryMatching";
import { initializeConsoleTracking, initializeInteractiveCommands } from "../consoleTrackingUtils";
import { initializeAudioSystem } from "../jonahAudio";
import { initializeMemoryParanoia } from "../consoleMemoryParanoia";
import { initializeAdvancedBehavior } from "../jonahAdvancedBehavior";

// Initialize console functions on the window object
export const initializeConsoleCommands = (
  trackEvent: TrackEventFunction,
  getUserRank: GetUserRankFunction,
  userState: UserState
) => {
  // Create command tracker function
  const trackCommandExecution = createCommandTracker(trackEvent);
  
  // Create fail attempt recorder
  const recordFailAttempt = createFailAttemptRecorder();
  
  // Initialize the JonahConsole state
  initializeConsoleTracking();
  
  // Initialize advanced behavior system
  initializeAdvancedBehavior();
  
  // Initialize sentience system
  initializeSentience();
  
  // Initialize WhisperMaster for side quests
  initializeWhisperMaster();
  
  // Initialize mirror site functionality
  initializeMirrorSite();
  
  // Initialize news awareness system
  initializeNewsAwarenessSystem();
  
  // Initialize ecological awareness system
  initializeEcoAwareness();

  // Initialize fuzzy story matching system
  initializeFuzzyStoryMatching();
  
  // Initialize audio system
  initializeAudioSystem();
  
  // Initialize interactive commands
  initializeInteractiveCommands();
  
  // Initialize memory paranoia system
  initializeMemoryParanoia();
  
  // Initialize status command
  initializeStatusCommand(trackCommandExecution, getUserRank, userState);

  // Initialize all command groups
  initializeBasicCommands(trackCommandExecution, userState);
  initializeStoryCommands(trackCommandExecution, recordFailAttempt);
  initializeHumorCommands(trackCommandExecution);
  initializeNewCommands(trackCommandExecution);
  initializeBookCommands(trackCommandExecution);
  initializeClueSystem(trackCommandExecution);
  initializeSimbaSystem(trackCommandExecution);
  initializeTimeSystem(trackCommandExecution);
  initializeNewsCommands(trackCommandExecution);
  initializeEcoCommands(trackCommandExecution);
  
  // Pass the trackCommandExecution to ARG commands
  initializeARGCommands(trackCommandExecution);
};
