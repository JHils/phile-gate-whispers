
import { useState, useEffect, useCallback } from 'react';
import { UserState, UserRank, LeaderboardEntry } from '@/types/tracking';
import { syncUserStateWithSupabase, getUserRank, getLeaderboard } from '@/services/userTrackingService';
import { loadUserState, saveUserState, resetUserState } from '@/services/userStorageService';
import { calculateScore, determineRank } from '@/utils/userRankUtils';

// Track last sync time to avoid excessive updates
const SYNC_COOLDOWN = 60000; // 1 minute cooldown between syncs
let lastSyncTime = 0;

export const useTrackingSystem = () => {
  const [userState, setUserState] = useState<UserState>(() => {
    // Load user state and ensure console.rank is initialized
    const loadedState = loadUserState();
    if (!loadedState.console.rank) {
      loadedState.console.rank = localStorage.getItem('phileRank') || 'drifter';
    }
    return loadedState;
  });

  // Save state to localStorage whenever it changes
  useEffect(() => {
    saveUserState(userState);
  }, [userState]);

  // Function to update user state
  const updateUserState = useCallback((updates: Partial<UserState>) => {
    setUserState(prevState => {
      const newState = { ...prevState, ...updates };
      saveUserState(newState);
      
      // Don't sync on every update, only if enough time has passed
      if (Date.now() - lastSyncTime > SYNC_COOLDOWN) {
        syncUserStateWithSupabase(newState);
        lastSyncTime = Date.now();
      }
      
      return newState;
    });
  }, []);

  // Track an event with debouncing
  const trackEvent = useCallback((eventName: string) => {
    setUserState(prevState => {
      const events = { ...prevState.events };
      events[eventName] = (events[eventName] || 0) + 1;
      
      // Handle special events
      if (eventName === 'console_help_called') {
        prevState.console.helpCalled = true;
        localStorage.setItem('helpCalled', 'true');
      } else if (eventName === 'console_whois_called') {
        prevState.console.whoisCalled = true;
        localStorage.setItem('whoisCalled', 'true');
      } else if (eventName === 'console_gate_called') {
        prevState.console.gateCalled = true;
        localStorage.setItem('gateCalled', 'true');
      } else if (eventName === 'console_philes_called') {
        prevState.console.philesCalled = true;
        localStorage.setItem('philesCalled', 'true');
      } else if (eventName === 'console_monster_called') {
        prevState.console.monsterCalled = true;
        localStorage.setItem('monsterCalled', 'true');
      } else if (eventName === 'console_legacy_called') {
        prevState.console.legacyCalled = true;
        localStorage.setItem('legacyCalled', 'true');
      } else if (eventName === 'console_reveal_called') {
        prevState.console.revealCalled = true;
      } else if (eventName === 'console_reincarnate_called') {
        prevState.console.reincarnateCalled = true;
      } else if (eventName === 'legacy_written') {
        prevState.legacyWritten = true;
      } else if (eventName === 'gate_collapsed') {
        prevState.permanentlyCollapsed = true;
        localStorage.setItem('permanentlyCollapsed', 'true');
      } else if (eventName === 'entered_survivor_mode') {
        prevState.survivorMode = true;
        localStorage.setItem('survivorMode', 'true');
      } else if (eventName === 'became_gatekeeper') {
        prevState.gatekeeperStatus = true;
      }
      
      const newState = {
        ...prevState,
        events,
      };
      
      saveUserState(newState);
      
      // Update score and rank in localStorage for console compatibility
      const score = calculateScore(newState);
      localStorage.setItem('phileScore', score.toString());
      
      const rank = determineRank(score);
      localStorage.setItem('phileRank', rank.toLowerCase());
      
      // Update rank in userState.console
      newState.console.rank = rank.toLowerCase();
      
      // Only sync with Supabase occasionally
      if (Date.now() - lastSyncTime > SYNC_COOLDOWN) {
        syncUserStateWithSupabase(newState);
        lastSyncTime = Date.now();
      }
      
      return newState;
    });
  }, []);

  // Check if user has met gatekeeper requirements
  const checkGatekeeperEligibility = useCallback(() => {
    return userState.console.helpCalled && 
           userState.console.whoisCalled && 
           userState.console.gateCalled && 
           userState.console.philesCalled && 
           userState.console.monsterCalled && 
           userState.console.legacyCalled;
  }, [userState.console]);

  return {
    userState,
    updateUserState,
    trackEvent,
    checkGatekeeperEligibility,
    resetUserState,
    getUserRank,
    getLeaderboard
  };
};

export type { UserState } from '@/types/tracking';
