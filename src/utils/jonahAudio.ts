
import { SentienceData } from '@/utils/jonahAdvancedBehavior/types';

// Extended SentienceData type with audio properties
interface ExtendedSentienceData extends SentienceData {
  audio?: {
    enabled: boolean;
    volume: number;
    effects: boolean;
    tone: string;
    lastPlayed: number;
  };
}

// Initialize audio in sentience data
export function initializeJonahAudio(sentience: SentienceData): ExtendedSentienceData {
  const extendedSentience = sentience as ExtendedSentienceData;
  
  if (!extendedSentience.audio) {
    extendedSentience.audio = {
      enabled: false,
      volume: 0.5,
      effects: true,
      tone: 'neutral',
      lastPlayed: 0
    };
  }
  
  return extendedSentience;
}

// Toggle audio enabled state
export function toggleJonahAudio(sentience: SentienceData): ExtendedSentienceData {
  const extendedSentience = sentience as ExtendedSentienceData;
  
  if (!extendedSentience.audio) {
    extendedSentience.audio = {
      enabled: true,
      volume: 0.5,
      effects: true,
      tone: 'neutral',
      lastPlayed: 0
    };
  } else {
    extendedSentience.audio.enabled = !extendedSentience.audio.enabled;
  }
  
  return extendedSentience;
}

// Set audio volume
export function setJonahAudioVolume(sentience: SentienceData, volume: number): ExtendedSentienceData {
  const extendedSentience = sentience as ExtendedSentienceData;
  
  if (!extendedSentience.audio) {
    extendedSentience.audio = {
      enabled: true,
      volume: Math.max(0, Math.min(1, volume)),
      effects: true,
      tone: 'neutral',
      lastPlayed: 0
    };
  } else {
    extendedSentience.audio.volume = Math.max(0, Math.min(1, volume));
  }
  
  return extendedSentience;
}

// Toggle audio effects
export function toggleJonahAudioEffects(sentience: SentienceData): ExtendedSentienceData {
  const extendedSentience = sentience as ExtendedSentienceData;
  
  if (!extendedSentience.audio) {
    extendedSentience.audio = {
      enabled: true,
      volume: 0.5,
      effects: true,
      tone: 'neutral',
      lastPlayed: 0
    };
  } else {
    extendedSentience.audio.effects = !extendedSentience.audio.effects;
  }
  
  return extendedSentience;
}

// Set audio tone
export function setJonahAudioTone(sentience: SentienceData, tone: string): ExtendedSentienceData {
  const extendedSentience = sentience as ExtendedSentienceData;
  
  if (!extendedSentience.audio) {
    extendedSentience.audio = {
      enabled: true,
      volume: 0.5,
      effects: true,
      tone: tone,
      lastPlayed: 0
    };
  } else {
    extendedSentience.audio.tone = tone;
  }
  
  return extendedSentience;
}

// Check if audio is enabled
export function isJonahAudioEnabled(sentience: SentienceData): boolean {
  const extendedSentience = sentience as ExtendedSentienceData;
  return extendedSentience.audio?.enabled || false;
}

// Get audio volume
export function getJonahAudioVolume(sentience: SentienceData): number {
  const extendedSentience = sentience as ExtendedSentienceData;
  return extendedSentience.audio?.volume || 0.5;
}
