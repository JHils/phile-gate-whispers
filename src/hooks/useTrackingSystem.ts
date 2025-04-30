import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

// Define types for our tracking system
interface UserState {
  visitCount: number;
  firstVisit: number;
  lastVisit: number;
  gatekeeperStatus: boolean;
  permanentlyCollapsed: boolean;
  survivorMode: boolean;
  legacyWritten: boolean;
  console: {
    helpCalled: boolean;
    whoisCalled: boolean;
    gateCalled: boolean;
    philesCalled: boolean;
    monsterCalled: boolean;
    legacyCalled: boolean;
    revealCalled: boolean;
    reincarnateCalled: boolean;
  };
  events: {
    [key: string]: number;
  };
}

const DEFAULT_STATE: UserState = {
  visitCount: 0,
  firstVisit: 0,
  lastVisit: 0,
  gatekeeperStatus: false,
  permanentlyCollapsed: false,
  survivorMode: false,
  legacyWritten: false,
  console: {
    helpCalled: false,
    whoisCalled: false,
    gateCalled: false,
    philesCalled: false,
    monsterCalled: false,
    legacyCalled: false,
    revealCalled: false,
    reincarnateCalled: false,
  },
  events: {}
};

export const useTrackingSystem = () => {
  const [userState, setUserState] = useState<UserState>(DEFAULT_STATE);

  // Initialize user state from localStorage
  useEffect(() => {
    const loadUserState = () => {
      try {
        // Load existing state if available
        const savedState = localStorage.getItem('philes_user_state');
        let state: UserState = savedState ? JSON.parse(savedState) : { ...DEFAULT_STATE };
        
        // Set default values for new properties if they don't exist
        state = {
          ...DEFAULT_STATE,
          ...state
        };
        
        // Check for legacy values in localStorage and migrate them
        if (localStorage.getItem('permanentlyCollapsed') === 'true') {
          state.permanentlyCollapsed = true;
        }
        
        if (localStorage.getItem('survivorMode') === 'true') {
          state.survivorMode = true;
        }
        
        if (localStorage.getItem('helpCalled') === 'true') {
          state.console.helpCalled = true;
        }
        
        if (localStorage.getItem('whoisCalled') === 'true') {
          state.console.whoisCalled = true;
        }
        
        if (localStorage.getItem('gateCalled') === 'true') {
          state.console.gateCalled = true;
        }
        
        if (localStorage.getItem('philesCalled') === 'true') {
          state.console.philesCalled = true;
        }
        
        if (localStorage.getItem('monsterCalled') === 'true') {
          state.console.monsterCalled = true;
        }
        
        if (localStorage.getItem('legacyCalled') === 'true') {
          state.console.legacyCalled = true;
        }
        
        if (localStorage.getItem('legacyJournalEntry')) {
          state.legacyWritten = true;
        }
        
        // Update visit count and timestamps
        state.visitCount += 1;
        state.lastVisit = Date.now();
        
        if (!state.firstVisit) {
          state.firstVisit = Date.now();
        }
        
        setUserState(state);
        localStorage.setItem('philes_user_state', JSON.stringify(state));
        
        // Sync with Supabase
        syncUserStateWithSupabase(state);
      } catch (error) {
        console.error('Error loading user state:', error);
        // Reset to default state if there's an error
        setUserState(DEFAULT_STATE);
      }
    };
    
    loadUserState();
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('philes_user_state', JSON.stringify(userState));
  }, [userState]);

  // Function to sync user state with Supabase
  const syncUserStateWithSupabase = async (state: UserState) => {
    try {
      // Generate user hash from browser fingerprint if not exists
      const userHash = localStorage.getItem('user_hash') || generateUserHash();
      localStorage.setItem('user_hash', userHash);

      // Calculate score based on user progress
      let score = 0;
      
      // Base score from visit count (1 point per visit)
      score += state.visitCount;
      
      // Points for console commands discovered
      if (state.console.helpCalled) score += 10;
      if (state.console.whoisCalled) score += 20;
      if (state.console.gateCalled) score += 30;
      if (state.console.philesCalled) score += 40;
      if (state.console.monsterCalled) score += 50;
      if (state.console.legacyCalled) score += 60;
      if (state.console.revealCalled) score += 15;
      if (state.console.reincarnateCalled) score += 25;
      
      // Points for significant actions
      if (state.permanentlyCollapsed) score += 100;
      if (state.survivorMode) score += 200;
      if (state.legacyWritten) score += 150;
      if (state.gatekeeperStatus) score += 75;
      
      // Count pages visited
      const pagesVisitedCount = Object.keys(state.events).filter(key => 
        key.startsWith('visited_')).length;
      
      // Count console commands found
      const consoleCommandsFound = Object.values(state.console).filter(Boolean).length;
      
      // Insert or update user tracking record in Supabase
      const { error } = await supabase
        .from('user_tracking')
        .upsert({
          user_hash: userHash,
          score: score,
          last_visit: new Date().toISOString(),
          first_visit: new Date(state.firstVisit).toISOString(),
          legacy_written: state.legacyWritten,
          console_commands_found: consoleCommandsFound,
          pages_visited: pagesVisitedCount
        }, {
          onConflict: 'user_hash'
        });
      
      if (error) {
        console.error('Error syncing with Supabase:', error);
      }
      
      // Set a custom header for RLS policies - FIX: Use custom fetch options instead of direct header access
      // Instead of using supabase.headers directly, we'll apply user_hash to queries as needed
    } catch (error) {
      console.error('Error in Supabase sync:', error);
    }
  };

  // Generate a consistent user hash based on browser fingerprint
  const generateUserHash = () => {
    const navigator_info = window.navigator.userAgent;
    const screen_info = `${window.screen.height}x${window.screen.width}`;
    const fingerprint = `${navigator_info}-${screen_info}-${new Date().getTimezoneOffset()}`;
    
    // Create a simple hash from the fingerprint
    let hash = 0;
    for (let i = 0; i < fingerprint.length; i++) {
      hash = ((hash << 5) - hash) + fingerprint.charCodeAt(i);
      hash |= 0; // Convert to 32bit integer
    }
    
    // Make it positive and limit to 5 digits
    const positiveHash = Math.abs(hash % 100000);
    return positiveHash.toString().padStart(5, '0');
  };

  // Function to update user state
  const updateUserState = useCallback((updates: Partial<UserState>) => {
    setUserState(prevState => {
      const newState = { ...prevState, ...updates };
      localStorage.setItem('philes_user_state', JSON.stringify(newState));
      syncUserStateWithSupabase(newState);
      return newState;
    });
  }, []);

  // Track an event
  const trackEvent = useCallback((eventName: string) => {
    setUserState(prevState => {
      const events = { ...prevState.events };
      events[eventName] = (events[eventName] || 0) + 1;
      
      // Handle special events
      if (eventName === 'console_help_called') {
        prevState.console.helpCalled = true;
        // For backward compatibility
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
      
      localStorage.setItem('philes_user_state', JSON.stringify(newState));
      syncUserStateWithSupabase(newState);
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
  
  // Reset user state (for testing)
  const resetUserState = useCallback(() => {
    localStorage.removeItem('philes_user_state');
    localStorage.removeItem('permanentlyCollapsed');
    localStorage.removeItem('gateCollapseTime');
    localStorage.removeItem('survivorMode');
    localStorage.removeItem('helpCalled');
    localStorage.removeItem('whoisCalled');
    localStorage.removeItem('gateCalled');
    localStorage.removeItem('philesCalled');
    localStorage.removeItem('monsterCalled');
    localStorage.removeItem('legacyCalled');
    setUserState(DEFAULT_STATE);
  }, []);

  return {
    userState,
    updateUserState,
    trackEvent,
    checkGatekeeperEligibility,
    resetUserState
  };
};
