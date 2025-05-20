
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useTrackingSystem } from '@/hooks/useTrackingSystem';
import { addJournalEntry } from '@/utils/jonahRealityFabric';
import { throttle, debounce } from 'lodash';

const JonahActivityTracker = () => {
  const location = useLocation();
  const { trackEvent } = useTrackingSystem();
  const previousPathRef = useRef<string>('');
  const lastTrackTimeRef = useRef<number>(0);
  const specialCombinationsCheckedRef = useRef<Set<string>>(new Set());
  
  // Ultra-throttled version of trackEvent to prevent excessive history API calls
  const throttledTrackEvent = throttle((eventName: string) => {
    // Wrap in try-catch to prevent any errors from bubbling up
    try {
      // Only track if it's been at least 2 minutes since last track
      const now = Date.now();
      if (now - lastTrackTimeRef.current < 120000) return;
      
      // Use direct localStorage instead of trackEvent when possible
      // to avoid history API calls
      try {
        const eventKey = `event_${eventName}`;
        const eventCount = parseInt(localStorage.getItem(eventKey) || '0', 10) + 1;
        localStorage.setItem(eventKey, eventCount.toString());
        
        // Only call the actual trackEvent very rarely
        if (Math.random() < 0.1 && eventCount % 5 === 0) {
          trackEvent(eventName);
          lastTrackTimeRef.current = now;
        }
      } catch (error) {
        console.error("Error tracking event:", error);
      }
    } catch (error) {
      // Silent catch to prevent app breaks
      console.error("Error in throttledTrackEvent:", error);
    }
  }, 60000, { leading: true, trailing: false }); // One minute minimum between calls
  
  // Track page visits - with extreme protection against excessive calls
  useEffect(() => {
    try {
      const currentPath = location.pathname;
      
      // Skip if path hasn't changed to prevent duplicate processing
      if (currentPath === previousPathRef.current) return;
      
      // Prevent tracking too frequently - increased minimum interval to 30 seconds
      const now = Date.now();
      if (now - lastTrackTimeRef.current < 30000) {
        previousPathRef.current = currentPath;
        return;
      }
      
      // Add random chance to further reduce frequency
      if (Math.random() < 0.3) { // Only 30% chance to proceed
        lastTrackTimeRef.current = now;
        previousPathRef.current = currentPath;
        
        // Super-heavily debounced processing
        const processPageVisit = debounce(() => {
          try {
            // Update visit count for this page using localStorage directly
            const visitKey = `visits_${currentPath}`;
            const visitCount = parseInt(localStorage.getItem(visitKey) || '0', 10) + 1;
            localStorage.setItem(visitKey, visitCount.toString());
            
            // Update pages visited array but with reduced frequency
            if (Math.random() < 0.5) { // 50% chance to update array
              try {
                const pagesVisited = JSON.parse(localStorage.getItem('pagesVisited') || '[]');
                if (!pagesVisited.includes(currentPath)) {
                  pagesVisited.push(currentPath);
                  localStorage.setItem('pagesVisited', JSON.stringify(pagesVisited));
                  
                  // Track first visit very rarely
                  if (Math.random() < 0.1) { // Only 10% chance to track
                    throttledTrackEvent(`first_visit_${currentPath.replace(/\//g, '_')}`);
                    
                    // Add journal entry extremely rarely
                    if (Math.random() < 0.1) { // 10% chance within the 10% chance
                      setTimeout(() => {
                        try {
                          addJournalEntry(`First visit to ${currentPath}. User has visited ${pagesVisited.length} unique pages.`);
                        } catch (error) {
                          console.error("Error adding journal entry:", error);
                        }
                      }, 15000); // 15 second delay
                    }
                  }
                }
                
                // Don't check for combinations every time - extremely rare
                if (pagesVisited.length >= 3 && Math.random() < 0.05) { // Only 5% chance
                  // Check just one random special combination instead of all
                  if (Math.random() < 0.5) { // 50% chance to even check
                    const specialCombinations = [
                      { paths: ['/mirror_phile', '/split-voice', '/testament'], event: 'mirror_voice_testament', message: 'User has connected mirror, voice, and testament. Heightened awareness detected.' },
                      { paths: ['/lost-sisters', '/rebirth', '/monster'], event: 'narrative_triad', message: 'User has completed the primary narrative triad. Timeline stabilization possible.' },
                      { paths: ['/gate', '/monster', '/legacy'], event: 'gate_monster_legacy', message: 'Gate-Monster-Legacy pathway accessed. User approaching deep archive access.' }
                    ];
                    
                    // Pick just one random combination to check
                    const randomIndex = Math.floor(Math.random() * specialCombinations.length);
                    const randomCombo = specialCombinations[randomIndex];
                    const comboKey = randomCombo.event;
                    
                    // Only check if we haven't checked this one before
                    if (!specialCombinationsCheckedRef.current.has(comboKey) && 
                        !localStorage.getItem(`tracked_${randomCombo.event}`)) {
                      
                      // Check if user has visited all paths in the combination
                      let allVisited = true;
                      for (const path of randomCombo.paths) {
                        if (!pagesVisited.includes(path)) {
                          allVisited = false;
                          break;
                        }
                      }
                      
                      if (allVisited) {
                        // Mark as checked
                        specialCombinationsCheckedRef.current.add(comboKey);
                        localStorage.setItem(`tracked_${randomCombo.event}`, 'true');
                        
                        // Log combination but with extreme throttling
                        setTimeout(() => {
                          try {
                            addJournalEntry(randomCombo.message);
                          } catch (error) {
                            console.error("Error adding journal entry:", error);
                          }
                        }, 20000); // 20 second delay
                      }
                    }
                  }
                }
              } catch (error) {
                console.error("Error updating pages visited:", error);
              }
            }
          } catch (error) {
            console.error("Error in page visit processing:", error);
          }
        }, 10000); // 10 second debounce
        
        processPageVisit();
        
        return () => {
          processPageVisit.cancel();
        };
      }
    } catch (error) {
      console.error("Error in page visit tracking:", error);
    }
    
    return () => {
      throttledTrackEvent.cancel();
    };
  }, [location.pathname, throttledTrackEvent]);
  
  // Track time spent on page - with extreme debouncing and randomization
  useEffect(() => {
    try {
      // Only track time 30% of the time
      if (Math.random() < 0.3) {
        const currentPath = location.pathname;
        const enterTime = Date.now();
        
        return () => {
          try {
            if (currentPath !== location.pathname) {
              const exitTime = Date.now();
              const timeSpent = exitTime - enterTime;
              
              // Only track if significant time was spent (more than 1 minute)
              if (timeSpent > 60000 && Math.random() < 0.2) { // 20% chance
                const secondsSpent = Math.floor(timeSpent / 1000);
                
                // Just store in localStorage without triggering events
                const timeKey = `time_${currentPath}`;
                const previousTime = parseInt(localStorage.getItem(timeKey) || '0', 10);
                localStorage.setItem(timeKey, (previousTime + secondsSpent).toString());
                
                // Almost never track long visits
                if (secondsSpent > 300 && Math.random() < 0.05) { // 5% chance for 5+ min visits
                  throttledTrackEvent(`long_visit_${currentPath.replace(/\//g, '_')}`);
                }
              }
            }
          } catch (error) {
            console.error("Error tracking time spent:", error);
          }
        };
      }
      return undefined;
    } catch (error) {
      console.error("Error setting up time tracking:", error);
      return undefined;
    }
  }, [location.pathname, throttledTrackEvent]);
  
  // Track inactive/active state - with improved performance 
  useEffect(() => {
    // Only set up this tracking 50% of the time
    if (Math.random() < 0.5) {
      let inactiveTimer: number;
      let lastActivity = Date.now();
      let isInactive = false;
      let hasLoggedInactivity = false;
      
      // Super-heavily debounced reset timer
      const resetTimer = debounce(() => {
        try {
          // Only process if we're handling a new activity after significant inactivity
          if (isInactive || Date.now() - lastActivity > 180000) { // 3 minutes threshold
            lastActivity = Date.now();
            isInactive = false;
            hasLoggedInactivity = false;
            clearTimeout(inactiveTimer);
            
            // Set a very long timeout for inactivity tracking
            inactiveTimer = window.setTimeout(() => {
              try {
                const inactiveTime = Math.floor((Date.now() - lastActivity) / 1000);
                
                // User inactive for 10+ minutes
                if (inactiveTime > 600 && !hasLoggedInactivity && Math.random() < 0.3) { // 10 min with 30% chance
                  isInactive = true;
                  hasLoggedInactivity = true;
                  addJournalEntry(`User inactive for ${inactiveTime}s. Possible abandonment or observation.`);
                }
              } catch (error) {
                console.error("Error in inactivity timer:", error);
              }
            }, 600000); // 10 minutes
          }
        } catch (error) {
          console.error("Error in resetTimer:", error);
        }
      }, 15000); // 15 second debounce
      
      // Set up activity listeners - extremely throttle events that fire rapidly
      const throttledResetTimer = throttle(resetTimer, 60000); // 1 minute throttle for mousemove/scroll
      
      window.addEventListener('mousemove', throttledResetTimer);
      window.addEventListener('keydown', resetTimer);
      window.addEventListener('click', resetTimer);
      window.addEventListener('scroll', throttledResetTimer);
      
      // Initial timer setup
      resetTimer();
      
      return () => {
        clearTimeout(inactiveTimer);
        resetTimer.cancel();
        throttledResetTimer.cancel();
        window.removeEventListener('mousemove', throttledResetTimer);
        window.removeEventListener('keydown', resetTimer);
        window.removeEventListener('click', resetTimer);
        window.removeEventListener('scroll', throttledResetTimer);
      };
    }
    return undefined;
  }, []);
  
  return null; // This component doesn't render anything
};

export default JonahActivityTracker;
