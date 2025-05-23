import { useState, useEffect } from 'react';
import { RealityFabric } from '@/utils/jonahAdvancedBehavior/types';

export function useRealityFabric() {
  // Initialize with default state
  const [fabricState, setFabricState] = useState<RealityFabric>({
    stability: 100,
    corruptionLevel: 0,
    lastGlitch: 0,
    glitchCount: 0,
    anomalies: [],
    anomalyCount: 0,
    memoryFragments: [],
    unstableAreas: [],
    lastDetection: Date.now() - 86400000 // 24 hours ago
  });

  // Load from localStorage if available
  useEffect(() => {
    try {
      const savedState = localStorage.getItem('jonah_reality_fabric');
      if (savedState) {
        setFabricState(JSON.parse(savedState));
      }
    } catch (error) {
      console.error("Failed to load reality fabric state:", error);
    }
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    try {
      localStorage.setItem('jonah_reality_fabric', JSON.stringify(fabricState));
    } catch (error) {
      console.error("Failed to save reality fabric state:", error);
    }
  }, [fabricState]);

  // Add a memory fragment
  const addMemoryFragment = (fragment: string) => {
    setFabricState(prev => {
      // Create a copy of the previous state
      const newFabricState: RealityFabric = {
        ...prev,
        memoryFragments: [...prev.memoryFragments, fragment],
        stability: Math.max(0, prev.stability - 2),
        corruptionLevel: Math.min(100, prev.corruptionLevel + 1),
        lastGlitch: Date.now(),
        glitchCount: prev.glitchCount + 1
      };
      return newFabricState;
    });
    return true;
  };

  // Detect an anomaly
  const detectAnomaly = (description: string, source: string) => {
    setFabricState(prev => {
      // Create a copy of the previous state
      const newFabricState: RealityFabric = {
        ...prev,
        anomalies: [...prev.anomalies, description],
        anomalyCount: prev.anomalyCount + 1,
        lastDetection: Date.now(),
        stability: Math.max(0, prev.stability - 5),
        corruptionLevel: Math.min(100, prev.corruptionLevel + 3),
        lastGlitch: Date.now(),
        glitchCount: prev.glitchCount + 1
      };
      return newFabricState;
    });
    return true;
  };

  // Induce a small glitch
  const induceMinorGlitch = () => {
    setFabricState(prev => {
      const newFabricState: RealityFabric = {
        ...prev,
        stability: Math.max(0, prev.stability - 1),
        corruptionLevel: Math.min(100, prev.corruptionLevel + 1),
        lastGlitch: Date.now(),
        glitchCount: prev.glitchCount + 1
      };
      return newFabricState;
    });
    return true;
  };

  // Stabilize the fabric
  const stabilizeFabric = () => {
    setFabricState(prev => {
      const newFabricState: RealityFabric = {
        ...prev,
        stability: Math.min(100, prev.stability + 3),
        corruptionLevel: Math.max(0, prev.corruptionLevel - 2)
      };
      return newFabricState;
    });
    return true;
  };

  // Get unstable areas
  const getUnstableAreas = () => {
    // Mock implementation
    return ["Memory sector 9", "Temporal junction 44", "Dream processing unit"];
  };

  return {
    fabricState,
    addMemoryFragment,
    detectAnomaly,
    induceMinorGlitch,
    stabilizeFabric,
    getUnstableAreas
  };
}
