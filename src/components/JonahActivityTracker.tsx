
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
  
  // More aggressively throttled version of trackEvent to prevent excessive calls
  const throttledTrackEvent = throttle((eventName: string) => {
    trackEvent(eventName);
  }, 10000); // Increased to 10 seconds to dramatically reduce history API calls
  
  // Track page visits - with protection against excessive calls
  useEffect(() => {
    const currentPath = location.pathname;
    
    // Skip if path hasn't changed to prevent duplicate processing
    if (currentPath === previousPathRef.current) return;
    
    // Prevent tracking too frequently - increased minimum interval
    const now = Date.now();
    if (now - lastTrackTimeRef.current < 10000) { // Increased to 10 seconds
      // Just update the reference without triggering any events
      previousPathRef.current = currentPath;
      return;
    }
    
    lastTrackTimeRef.current = now;
    previousPathRef.current = currentPath;
    
    // Heavily debounced processing to avoid too many state changes
    const processPageVisit = debounce(() => {
      // Use localStorage directly for visit tracking instead of making API calls
      // that might trigger history updates
      try {
        // Update visit count for this page
        const visitKey = `visits_${currentPath}`;
        const visitCount = parseInt(localStorage.getItem(visitKey) || '0', 10) + 1;
        localStorage.setItem(visitKey, visitCount.toString());
        
        // Update pages visited array
        const pagesVisited = JSON.parse(localStorage.getItem('pagesVisited') || '[]');
        if (!pagesVisited.includes(currentPath)) {
          pagesVisited.push(currentPath);
          localStorage.setItem('pagesVisited', JSON.stringify(pagesVisited));
          
          // Track first visit to this page - but highly throttled
          if (Math.random() < 0.3) { // Only 30% chance to actually track to reduce API calls
            throttledTrackEvent(`first_visit_${currentPath.replace(/\//g, '_')}`);
            
            // Add journal entry for first visit - but only sometimes
            if (Math.random() < 0.5) {
              addJournalEntry(`First visit to ${currentPath}. User has visited ${pagesVisited.length} unique pages.`);
            }
          }
        }
        
        // Track repeat visits extremely rarely
        if (visitCount > 5 && visitCount % 10 === 0 && Math.random() < 0.2) { // Only track every 10th visit with 20% chance
          throttledTrackEvent(`repeat_visit_${currentPath.replace(/\//g, '_')}`);
        }
        
        // Check for special page combinations very rarely
        if (pagesVisited.length >= 3 && Math.random() < 0.1) { // Only 10% chance to check combinations
          const hasVisitedSequence = (sequence: string[]) => {
            return sequence.every(path => pagesVisited.includes(path));
          };
          
          // Check for narrative-significant combinations
          const specialCombinations = [
            { paths: ['/mirror_phile', '/split-voice', '/testament'], event: 'mirror_voice_testament', message: 'User has connected mirror, voice, and testament. Heightened awareness detected.' },
            { paths: ['/lost-sisters', '/rebirth', '/monster'], event: 'narrative_triad', message: 'User has completed the primary narrative triad. Timeline stabilization possible.' },
            { paths: ['/gate', '/monster', '/legacy'], event: 'gate_monster_legacy', message: 'Gate-Monster-Legacy pathway accessed. User approaching deep archive access.' }
          ];
          
          // Only check one random combination to reduce processing
          const randomCombo = specialCombinations[Math.floor(Math.random() * specialCombinations.length)];
          const comboKey = randomCombo.event;
          
          // Only process if we haven't checked this combination before
          if (!specialCombinationsCheckedRef.current.has(comboKey) && 
              hasVisitedSequence(randomCombo.paths) && 
              !localStorage.getItem(`tracked_${randomCombo.event}`)) {
            
            // Mark this combination as checked
            specialCombinationsCheckedRef.current.add(comboKey);
            
            // Track this special combination
            throttledTrackEvent(randomCombo.event);
            localStorage.setItem(`tracked_${randomCombo.event}`, 'true');
            
            // Add journal entry
            addJournalEntry(randomCombo.message);
          }
        }
      } catch (error) {
        // Silently fail to avoid breaking the app
        console.error("Error in activity tracking:", error);
      }
    }, 3000); // Heavy debounce of 3 seconds
    
    processPageVisit();
    
    return () => {
      processPageVisit.cancel(); // Clean up the debounce
      throttledTrackEvent.cancel(); // Clean up the throttle
    };
  }, [location.pathname]);
  
  // Track time spent on page - with heavy debouncing
  useEffect(() => {
    const currentPath = location.pathname;
    const enterTime = Date.now();
    
    return () => {
      // Skip if path hasn't changed (prevents duplicate tracking on remounts)
      if (currentPath !== location.pathname) {
        try {
          const exitTime = Date.now();
          const timeSpent = exitTime - enterTime;
          
          // Only track if significant time was spent (more than 30 seconds)
          if (timeSpent > 30000 && Math.random() < 0.3) { // Added randomness to reduce tracking frequency
            // Convert to seconds
            const secondsSpent = Math.floor(timeSpent / 1000);
            
            // Update total time for this page
            const timeKey = `time_${currentPath}`;
            const previousTime = parseInt(localStorage.getItem(timeKey) || '0', 10);
            localStorage.setItem(timeKey, (previousTime + secondsSpent).toString());
            
            // Only track very long visits very rarely
            if (secondsSpent > 300 && Math.random() < 0.1) { // 5+ minutes with only 10% chance
              throttledTrackEvent(`long_visit_${currentPath.replace(/\//g, '_')}`);
            }
          }
        } catch (error) {
          // Silently fail to avoid breaking the app
          console.error("Error tracking time spent:", error);
        }
      }
    };
  }, [location.pathname]);
  
  // Track inactive/active state - with improved performance and reduced history calls
  useEffect(() => {
    let inactiveTimer: number;
    let lastActivity = Date.now();
    let isInactive = false;
    let hasLoggedInactivity = false;
    
    // Heavily debounced reset timer
    const resetTimer = debounce(() => {
      // Only process if we're handling a new activity after significant inactivity
      if (isInactive || Date.now() - lastActivity > 120000) { // 2 minutes threshold
        lastActivity = Date.now();
        isInactive = false;
        hasLoggedInactivity = false;
        clearTimeout(inactiveTimer);
        
        // Set a very long timeout for inactivity tracking
        inactiveTimer = window.setTimeout(() => {
          const inactiveTime = Math.floor((Date.now() - lastActivity) / 1000);
          
          // User inactive for 5+ minutes
          if (inactiveTime > 300 && !hasLoggedInactivity && Math.random() < 0.5) { // 5 minutes with 50% chance
            isInactive = true;
            hasLoggedInactivity = true;
            addJournalEntry(`User inactive for ${inactiveTime}s. Possible abandonment or observation.`);
          }
        }, 300000); // 5 minutes
      }
    }, 5000); // Debounce by 5 seconds
    
    // Set up activity listeners - heavily throttle events that fire rapidly
    const throttledResetTimer = throttle(resetTimer, 15000); // 15 seconds throttle
    
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
  }, []);
  
  return null; // This component doesn't render anything
};

export default JonahActivityTracker;
