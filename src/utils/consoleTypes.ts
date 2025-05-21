/**
 * Console Types Definition
 * Global interfaces and types for Jonah's Console
 */

// Import the centralized global types
import './types/globalConsoleTypes';
import { SentienceData, StoryFlag, BookCode } from './jonahAdvancedBehavior/types';

// Export SentienceData for proper importing in jonahSentience.ts
export type { SentienceData } from './jonahAdvancedBehavior/types';

// ARG Command Type
export type ARGCommand = {
  name: string;
  description: string;
  handler: () => void;
  hidden?: boolean;
  unlocked?: boolean;
};

// Console Message Type
export type ConsoleMessage = {
  type: 'info' | 'warning' | 'error' | 'special';
  content: string;
  timestamp?: number;
  special?: boolean;
};

// Trust Level Type
export type TrustLevel = 'none' | 'low' | 'medium' | 'high';

// WhisperMaster Type
export interface WhisperMaster {
  whispers: string[];
  discovered: string[];
  active: boolean;
}

// Interface for whisper with metadata
export interface WhisperWithMetadata {
  whisper: string;
  timestamp: number;
  path: string;
}

// Extended BehaviorPhase Type
export interface BehaviorPhase {
  currentPhase: string;
  transitionPoints: {
    curious: number;
    confessional: number;
    unstable: number;
  };
  phaseResponses: {
    cold: string[];
    curious: string[];
    confessional: string[];
    unstable: string[];
  };
}

// News awareness types
export interface NewsAwareness {
  lastChecked: number;
  currentResponses: Array<{
    topic: string;
    headline: string;
    response: string;
    timestamp: number;
  }>;
  weatherCondition: string;
  weatherResponse: string | null;
  moodShift: 'normal' | 'anxious' | 'somber' | 'agitated';
}
