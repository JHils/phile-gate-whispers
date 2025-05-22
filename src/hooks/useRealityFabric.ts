
/**
 * Hook for interacting with Jonah's reality fabric
 */

import { useState, useEffect, useCallback } from 'react';
import { RealityFabric } from '@/utils/jonahAdvancedBehavior/types';
import { 
  addJournalEntry, 
  getJournalEntries, 
  getCurrentMood,
  updateJonahMood
} from '@/utils/jonahRealityFabric';
import { logMirrorEvent, checkMirrorAnomalies } from '@/utils/jonahMirrorSite';

export function useRealityFabric() {
  const [realityState, setRealityState] = useState<RealityFabric>({
    anomalies: [],
    anomalyCount: 0,
    lastDetection: Date.now(),
    unstableAreas: [],
    perception: 50,
    journalEntries: 0,
    memoryFragments: []
  });
  
  // Load reality fabric state on mount
  useEffect(() => {
    const journalEntries = getJournalEntries();
    
    setRealityState(prev => ({
      ...prev,
      journalEntries: journalEntries.length
    }));
    
    // Check for mirror anomalies
    const mirrorCheck = checkMirrorAnomalies();
    if (mirrorCheck.hasAnomalies) {
      setRealityState(prev => ({
        ...prev,
        anomalyCount: prev.anomalyCount + mirrorCheck.anomalyCount
      }));
    }
  }, []);
  
  // Add a memory fragment to reality fabric
  const addMemoryFragment = useCallback((content: string) => {
    setRealityState(prev => ({
      ...prev,
      memoryFragments: [
        ...prev.memoryFragments,
        {
          content,
          timestamp: Date.now()
        }
      ].slice(-10) // Keep only last 10 fragments
    }));
  }, []);
  
  // Add reality anomaly
  const addAnomaly = useCallback((description: string, source: string = 'unknown') => {
    setRealityState(prev => {
      const anomaly = {
        description,
        source,
        timestamp: Date.now()
      };
      
      return {
        ...prev,
        anomalies: [...prev.anomalies, anomaly].slice(-20), // Keep only last 20 anomalies
        anomalyCount: prev.anomalyCount + 1,
        lastDetection: Date.now()
      };
    });
    
    // Log to journal
    addJournalEntry({
      content: `Reality anomaly detected: ${description}`,
      timestamp: Date.now(),
      entryId: Date.now()
    });
    
    // Log to mirror site
    logMirrorEvent(`Anomaly: ${description}`);
    
    // Update mood to reflect anomaly detection
    updateJonahMood('paranoia', 'medium');
  }, []);
  
  // Create reality distortion
  const createDistortion = useCallback((area: string) => {
    setRealityState(prev => {
      if (prev.unstableAreas.includes(area)) return prev;
      
      return {
        ...prev,
        unstableAreas: [...prev.unstableAreas, area]
      };
    });
    
    // Log distortion
    logMirrorEvent(`Distortion created in ${area}`);
  }, []);
  
  return {
    realityState,
    addMemoryFragment,
    addAnomaly,
    createDistortion
  };
}
