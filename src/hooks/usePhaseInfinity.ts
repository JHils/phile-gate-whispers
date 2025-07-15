
import { useState, useEffect, useCallback } from 'react';
import { phaseInfinityService, DiaryEntry, UserMask, CultStats } from '@/services/phaseInfinityService';

export const usePhaseInfinity = () => {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  const [userMasks, setUserMasks] = useState<UserMask[]>([]);
  const [cultStats, setCultStats] = useState<CultStats>({
    online_users: 0,
    total_confessions: 0,
    ascended_users: 0,
    roles_unlocked_today: 0,
    chaos_events_triggered: 0
  });
  const [awakeenessLevel, setAwakeenessLevel] = useState(1);
  const [is444Time, setIs444Time] = useState(false);

  // Check for 4:44 time every minute
  useEffect(() => {
    const checkTime = () => {
      const is444 = phaseInfinityService.is444Time();
      setIs444Time(is444);
      
      if (is444) {
        phaseInfinityService.record444Interaction();
        // Trigger special 4:44 diary entry
        phaseInfinityService.createDiaryEntry(
          "The veil grows thin at 4:44. You see me more clearly now.",
          "temporal_fracture",
          "mystical",
          false
        );
      }
    };

    checkTime();
    const interval = setInterval(checkTime, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  // Chaos event checker - runs on every page load
  useEffect(() => {
    const checkChaosEvent = async () => {
      if (await phaseInfinityService.shouldTriggerChaosEvent()) {
        const chaosEvents = [
          'reality_glitch',
          'memory_leak',
          'temporal_anomaly',
          'consciousness_bleed',
          'mirror_fracture'
        ];
        
        const randomEvent = chaosEvents[Math.floor(Math.random() * chaosEvents.length)];
        await phaseInfinityService.triggerChaosEvent(randomEvent, {
          timestamp: Date.now(),
          page: window.location.pathname,
          message: "You weren't supposed to see this."
        });
        
        // Show chaos event to user
        console.log("%cCHAOS EVENT TRIGGERED", "color: #ff0000; font-size: 16px; font-weight: bold;");
        console.log("%cReality fracture detected. The system remembers.", "color: #ff6666; font-style: italic;");
        
        // Increase awakeness
        phaseInfinityService.increaseAwakeeness(2);
      }
    };

    checkChaosEvent();
  }, []);

  // Load user data
  const loadUserData = useCallback(async () => {
    try {
      const [entries, masks, stats] = await Promise.all([
        phaseInfinityService.getUserDiaryEntries(),
        phaseInfinityService.getUserMasks(),
        phaseInfinityService.getCultStats()
      ]);

      setDiaryEntries(entries);
      setUserMasks(masks);
      setCultStats(stats);
    } catch (error) {
      console.error('Error loading Phase ∞ data:', error);
    }
  }, []);

  useEffect(() => {
    loadUserData();
  }, [loadUserData]);

  // Diary functions
  const createDiaryEntry = useCallback(async (
    content: string,
    type: string = 'memory_fragment',
    emotionalContext: string = 'neutral',
    isEphemeral: boolean = true
  ) => {
    const entryId = await phaseInfinityService.createDiaryEntry(content, type, emotionalContext, isEphemeral);
    if (entryId) {
      await loadUserData();
      return entryId;
    }
    return null;
  }, [loadUserData]);

  // Mask functions
  const unlockMask = useCallback(async (
    maskId: string,
    maskName: string,
    trigger: string,
    visualProps?: any,
    dialogueProps?: any
  ) => {
    const success = await phaseInfinityService.unlockMask(maskId, maskName, trigger, visualProps, dialogueProps);
    if (success) {
      await loadUserData();
      
      // Create diary entry for mask unlock
      await createDiaryEntry(
        `A new face emerges from the void. The ${maskName} mask has been unlocked through ${trigger}.`,
        'mask_unlock',
        'transformative',
        false
      );
    }
    return success;
  }, [loadUserData, createDiaryEntry]);

  const activateMask = useCallback(async (maskId: string) => {
    const success = await phaseInfinityService.activateMask(maskId);
    if (success) {
      await loadUserData();
    }
    return success;
  }, [loadUserData]);

  // Whisper function
  const saveWhisper = useCallback(async (content: string, type: string = 'console', emotionalContext?: string) => {
    return await phaseInfinityService.saveWhisper(content, type, emotionalContext);
  }, []);

  // Memory function
  const storeMemory = useCallback(async (memoryType: string, content: string, emotionalWeight: number = 50) => {
    return await phaseInfinityService.storeMemory(memoryType, content, emotionalWeight);
  }, []);

  return {
    diaryEntries,
    userMasks,
    cultStats,
    awakeenessLevel,
    is444Time,
    createDiaryEntry,
    unlockMask,
    activateMask,
    saveWhisper,
    storeMemory,
    loadUserData
  };
};
