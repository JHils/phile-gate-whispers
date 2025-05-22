/**
 * Jonah Mirror Site
 */

import { SentienceData } from './jonahAdvancedBehavior/types';

// Storage key for mirror logs
const MIRROR_LOGS_KEY = 'jonah_mirror_logs';

// Log a mirror site event
export function logMirrorEvent(event: string): void {
  const logs = getMirrorLogs();
  logs.push({
    timestamp: Date.now(),
    event,
    glitchLevel: Math.random() > 0.8 ? 'high' : 'normal'
  });
  
  // Keep only the last 100 logs
  const trimmedLogs = logs.slice(-100);
  
  try {
    localStorage.setItem(MIRROR_LOGS_KEY, JSON.stringify(trimmedLogs));
  } catch (e) {
    console.error('Error saving mirror logs:', e);
  }
}

// Get mirror logs
export function getMirrorLogs(): any[] {
  try {
    const logsData = localStorage.getItem(MIRROR_LOGS_KEY);
    return logsData ? JSON.parse(logsData) : [];
  } catch (e) {
    console.error('Error reading mirror logs:', e);
    return [];
  }
}

// Clear mirror logs
export function clearMirrorLogs(): void {
  try {
    localStorage.setItem(MIRROR_LOGS_KEY, JSON.stringify([]));
  } catch (e) {
    console.error('Error clearing mirror logs:', e);
  }
}

// Check for mirror anomalies
export function checkMirrorAnomalies(): { 
  hasAnomalies: boolean; 
  anomalyCount: number;
  description?: string;
} {
  const logs = getMirrorLogs();
  const anomalies = logs.filter(log => log.glitchLevel === 'high');
  
  return {
    hasAnomalies: anomalies.length > 0,
    anomalyCount: anomalies.length,
    description: anomalies.length > 5 ? 
      'Significant mirror disruption detected' : 
      undefined
  };
}

// Update sentience with mirror site data
export function updateSentienceWithMirror(
  sentience: SentienceData
): SentienceData {
  // Create a copy to avoid mutation
  const updatedSentience: SentienceData = {
    ...sentience
  };
  
  // Add mirror logs to sentience
  const logs = getMirrorLogs();
  if (!updatedSentience.realityFabric.anomalies) {
    updatedSentience.realityFabric.anomalies = [];
  }
  
  // Add high glitch logs as anomalies
  const highGlitchLogs = logs
    .filter(log => log.glitchLevel === 'high')
    .map(log => ({
      source: 'mirror',
      timestamp: log.timestamp,
      description: log.event
    }));
  
  updatedSentience.realityFabric.anomalies = [
    ...updatedSentience.realityFabric.anomalies,
    ...highGlitchLogs
  ].slice(-50); // Keep only the last 50 anomalies
  
  // Update anomaly count
  updatedSentience.realityFabric.anomalyCount = 
    updatedSentience.realityFabric.anomalies.length;
  
  return updatedSentience;
}
