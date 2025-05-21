import { useState, useEffect, useCallback } from 'react';
import { UserState, UserRank, LeaderboardEntry } from '@/types/tracking';
import { syncUserStateWithSupabase, getUserRank, getLeaderboard } from '@/services/userTrackingService';
import { loadUserState, saveUserState, resetUserState } from '@/services/userStorageService';
import { calculateScore, determineRank } from '@/utils/userRankUtils';
import { throttle } from 'lodash';

// Track last sync time to avoid excessive updates
const SYNC_COOLDOWN = 300000; // 5 minutes cooldown between syncs (increased from 1 minute)
let lastSyncTime = 0;
// Track last save time for localStorage updates
const SAVE_COOLDOWN = 60000; // 1 minute cooldown between localStorage saves
let lastSaveTime = 0;

export const useTrackingSystem = () => {
  const [userState, setUserState] = useState<UserState>(() => {
    try {
      // Load user state and ensure console.rank is initialized
      const loadedState = loadUserState();
      
      // Set default values for potentially missing properties
      const defaultState: UserState = {
        visitCount: 0,
        firstVisit: Date.now(),
        lastVisit: Date.now(),
        events: {},
        console: {
          helpCalled: false,
          whoisCalled: false,
          gateCalled: false,
          philesCalled: false,
          monsterCalled: false,
          legacyCalled: false,
          revealCalled: false,
          reincarnateCalled: false,
          rank: 'drifter'
        },
        permanentlyCollapsed: false,
        survivorMode: false,
        gatekeeperStatus: false,
        legacyWritten: false,
        bookCodes: {
          unlockedCodes: [],
          totalCodesUnlocked: 0
        },
        layeredClues: {
          discoveredClues: [],
          mirrorChecks: 0,
          anomaliesFound: 0
        },
        simba: {
          traced: false,
          encounters: 0
        }
      };
      
      // Merge loaded state with default state, ensuring proper structure
      const mergedState = {...defaultState, ...loadedState};
      
      // Ensure all nested objects have proper structure
      if (!mergedState.console) {
        mergedState.console = defaultState.console;
      } else if (!mergedState.console.rank) {
        mergedState.console.rank = localStorage.getItem('phileRank') || 'drifter';
      }
      
      // Ensure bookCodes has proper structure
      if (!mergedState.bookCodes || Array.isArray(mergedState.bookCodes)) {
        mergedState.bookCodes = defaultState.bookCodes;
      }
      
      // Ensure layeredClues has proper structure
      if (!mergedState.layeredClues || Array.isArray(mergedState.layeredClues)) {
        mergedState.layeredClues = defaultState.layeredClues;
      }
      
      // Ensure simba has proper structure
      if (typeof mergedState.simba === 'boolean' || !mergedState.simba) {
        mergedState.simba = defaultState.simba;
      }
      
      return mergedState;
    } catch (error) {
      console.error("Error loading user state:", error);
      // Return a minimal valid state if loading fails
      return {
        visitCount: 0,
        firstVisit: Date.now(),
        lastVisit: Date.now(),
        events: {},
        console: {
          helpCalled: false,
          whoisCalled: false,
          gateCalled: false,
          philesCalled: false,
          monsterCalled: false,
          legacyCalled: false,
          revealCalled: false,
          reincarnateCalled: false,
          rank: 'drifter'
        },
        permanentlyCollapsed: false,
        survivorMode: false,
        gatekeeperStatus: false,
        legacyWritten: false,
        bookCodes: {
          unlockedCodes: [],
          totalCodesUnlocked: 0
        },
        layeredClues: {
          discoveredClues: [],
          mirrorChecks: 0,
          anomaliesFound: 0
        },
        simba: {
          traced: false,
          encounters: 0
        }
      };
    }
  });

  // Create a heavily throttled version of saveUserState
  const throttledSaveState = useCallback(throttle((state: UserState) => {
    try {
      const now = Date.now();
      if (now - lastSaveTime > SAVE_COOLDOWN) {
        saveUserState(state);
        lastSaveTime = now;
      }
    } catch (error) {
      console.error("Error in throttled save state:", error);
    }
  }, 30000, { leading: true, trailing: false }), []); // 30 second minimum between saves

  // Save state to localStorage on change but with throttling
  useEffect(() => {
    try {
      // Use a much more conservative approach to saving state
      const randomDelay = Math.floor(Math.random() * 5000) + 1000; // Random delay 1-6 seconds
      const saveTimeout = setTimeout(() => {
        throttledSaveState(userState);
      }, randomDelay);
      
      return () => {
        clearTimeout(saveTimeout);
      };
    } catch (error) {
      console.error("Error scheduling state save:", error);
    }
  }, [userState, throttledSaveState]);

  // Function to update user state with heavy throttling
  const updateUserState = useCallback((updates: Partial<UserState>) => {
    try {
      // Add randomness to further reduce update frequency
      if (Math.random() < 0.5) { // Only 50% of updates go through
        setUserState(prevState => {
          try {
            const newState = { ...prevState, ...updates };
            
            // Only attempt sync very occasionally
            if (Date.now() - lastSyncTime > SYNC_COOLDOWN) {
              setTimeout(() => {
                try {
                  syncUserStateWithSupabase(newState);
                  lastSyncTime = Date.now();
                } catch (error) {
                  console.error("Error in delayed Supabase sync:", error);
                }
              }, 10000); // 10 second delay before sync
            }
            
            return newState;
          } catch (error) {
            console.error("Error updating user state:", error);
            return prevState;
          }
        });
      }
    } catch (error) {
      console.error("Error in updateUserState:", error);
    }
  }, []);

  // Super throttled track event function
  const trackEvent = useCallback(throttle((eventName: string) => {
    try {
      // Add extreme randomness to further reduce tracking frequency
      if (Math.random() < 0.3) { // Only 30% of events get tracked
        setUserState(prevState => {
          try {
            const events = { ...prevState.events };
            // Make sure we're dealing with a number when incrementing
            const currentValue = events[eventName];
            events[eventName] = typeof currentValue === 'number' ? (currentValue as number) + 1 : 1;
            
            // Handle special events
            let consoleUpdates = {};
            if (eventName === 'console_help_called') {
              consoleUpdates = { helpCalled: true };
              localStorage.setItem('helpCalled', 'true');
            } else if (eventName === 'console_whois_called') {
              consoleUpdates = { whoisCalled: true };
              localStorage.setItem('whoisCalled', 'true');
            } else if (eventName === 'console_gate_called') {
              consoleUpdates = { gateCalled: true };
              localStorage.setItem('gateCalled', 'true');
            } else if (eventName === 'console_philes_called') {
              consoleUpdates = { philesCalled: true };
              localStorage.setItem('philesCalled', 'true');
            } else if (eventName === 'console_monster_called') {
              consoleUpdates = { monsterCalled: true };
              localStorage.setItem('monsterCalled', 'true');
            } else if (eventName === 'console_legacy_called') {
              consoleUpdates = { legacyCalled: true };
              localStorage.setItem('legacyCalled', 'true');
            } else if (eventName === 'console_reveal_called') {
              consoleUpdates = { revealCalled: true };
            } else if (eventName === 'console_reincarnate_called') {
              consoleUpdates = { reincarnateCalled: true };
            }
            
            // Update special flags directly in localStorage to avoid state updates
            if (eventName === 'legacy_written') {
              localStorage.setItem('legacyWritten', 'true');
            } else if (eventName === 'gate_collapsed') {
              localStorage.setItem('permanentlyCollapsed', 'true');
            } else if (eventName === 'entered_survivor_mode') {
              localStorage.setItem('survivorMode', 'true');
            } else if (eventName === 'became_gatekeeper') {
              localStorage.setItem('gatekeeperStatus', 'true');
            }
            
            const newState = {
              ...prevState,
              events,
              console: {
                ...prevState.console,
                ...consoleUpdates
              },
              // Only update these if the corresponding event was triggered
              ...(eventName === 'legacy_written' ? { legacyWritten: true } : {}),
              ...(eventName === 'gate_collapsed' ? { permanentlyCollapsed: true } : {}),
              ...(eventName === 'entered_survivor_mode' ? { survivorMode: true } : {}),
              ...(eventName === 'became_gatekeeper' ? { gatekeeperStatus: true } : {})
            };
            
            // Update score and rank in localStorage for console compatibility
            // But do it directly to avoid state updates
            try {
              const score = calculateScore(newState);
              localStorage.setItem('phileScore', score.toString());
              
              const rank = determineRank(score);
              localStorage.setItem('phileRank', rank.toLowerCase());
              
              // Update rank in console directly rather than through state
              if (newState.console) {
                newState.console.rank = rank.toLowerCase();
              }
            } catch (error) {
              console.error("Error calculating score/rank:", error);
            }
            
            // Very rarely sync with Supabase
            if (Math.random() < 0.1 && Date.now() - lastSyncTime > SYNC_COOLDOWN) {
              setTimeout(() => {
                try {
                  syncUserStateWithSupabase(newState);
                  lastSyncTime = Date.now();
                } catch (error) {
                  console.error("Error in delayed Supabase sync:", error);
                }
              }, 15000); // 15 second delay before sync
            }
            
            return newState;
          } catch (error) {
            console.error("Error updating events in state:", error);
            return prevState;
          }
        });
      }
    } catch (error) {
      console.error("Error in trackEvent:", error);
    }
  }, 30000, { leading: true, trailing: false }), []); // 30 seconds between event tracking

  // Check if user has met gatekeeper requirements
  const checkGatekeeperEligibility = useCallback(() => {
    try {
      return userState.console.helpCalled && 
             userState.console.whoisCalled && 
             userState.console.gateCalled && 
             userState.console.philesCalled && 
             userState.console.monsterCalled && 
             userState.console.legacyCalled;
    } catch (error) {
      console.error("Error checking gatekeeper eligibility:", error);
      return false;
    }
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
