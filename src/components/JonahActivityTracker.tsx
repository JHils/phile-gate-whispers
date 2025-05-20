
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
  
  // Throttled version of trackEvent to prevent excessive calls
  const throttledTrackEvent = throttle((eventName: string) => {
    trackEvent(eventName);
  }, 3000); // Only allow tracking once every 3 seconds
  
  // Track page visits - with protection against excessive calls
  useEffect(() => {
    const currentPath = location.pathname;
    
    // Skip if path hasn't changed to prevent duplicate processing
    if (currentPath === previousPathRef.current) return;
    
    // Prevent tracking too frequently
    const now = Date.now();
    if (now - lastTrackTimeRef.current < 3000) {
      // Just update the reference without triggering any events
      previousPathRef.current = currentPath;
      return;
    }
    
    lastTrackTimeRef.current = now;
    previousPathRef.current = currentPath;
    
    // Debounced processing to avoid too many state changes
    const processPageVisit = debounce(() => {
      // Update visit count for this page
      const visitKey = `visits_${currentPath}`;
      const visitCount = parseInt(localStorage.getItem(visitKey) || '0', 10) + 1;
      localStorage.setItem(visitKey, visitCount.toString());
      
      // Update pages visited array
      const pagesVisited = JSON.parse(localStorage.getItem('pagesVisited') || '[]');
      if (!pagesVisited.includes(currentPath)) {
        pagesVisited.push(currentPath);
        localStorage.setItem('pagesVisited', JSON.stringify(pagesVisited));
        
        // Track first visit to this page
        throttledTrackEvent(`first_visit_${currentPath.replace(/\//g, '_')}`);
        
        // Add journal entry for first visit
        addJournalEntry(`First visit to ${currentPath}. User has visited ${pagesVisited.length} unique pages.`);
      }
      
      // Track repeat visits (with throttling)
      if (visitCount > 1 && visitCount % 3 === 0) { // Only track every 3rd visit
        throttledTrackEvent(`repeat_visit_${currentPath.replace(/\//g, '_')}`);
        
        // Add journal entry for significant repeat visits
        if (visitCount === 3 || visitCount === 5 || visitCount === 10) {
          addJournalEntry(`User has returned to ${currentPath} ${visitCount} times. Fixation detected.`);
        }
      }
      
      // Track special page combinations - only once per combination
      if (pagesVisited.length >= 3) { // Only check if at least 3 pages have been visited
        const hasVisitedSequence = (sequence: string[]) => {
          return sequence.every(path => pagesVisited.includes(path));
        };
        
        // Check for narrative-significant combinations
        const specialCombinations = [
          { paths: ['/mirror_phile', '/split-voice', '/testament'], event: 'mirror_voice_testament', message: 'User has connected mirror, voice, and testament. Heightened awareness detected.' },
          { paths: ['/lost-sisters', '/rebirth', '/monster'], event: 'narrative_triad', message: 'User has completed the primary narrative triad. Timeline stabilization possible.' },
          { paths: ['/gate', '/monster', '/legacy'], event: 'gate_monster_legacy', message: 'Gate-Monster-Legacy pathway accessed. User approaching deep archive access.' }
        ];
        
        specialCombinations.forEach(combo => {
          const comboKey = combo.event;
          
          // Only process if we haven't checked this combination before
          if (!specialCombinationsCheckedRef.current.has(comboKey) && 
              hasVisitedSequence(combo.paths) && 
              !localStorage.getItem(`tracked_${combo.event}`)) {
            
            // Mark this combination as checked
            specialCombinationsCheckedRef.current.add(comboKey);
            
            // Track this special combination
            throttledTrackEvent(combo.event);
            localStorage.setItem(`tracked_${combo.event}`, 'true');
            
            // Add journal entry
            addJournalEntry(combo.message);
          }
        });
      }
    }, 500);
    
    processPageVisit();
    
    return () => {
      processPageVisit.cancel(); // Clean up the debounce
    };
  }, [location.pathname, throttledTrackEvent]);
  
  // Track time spent on page - with debouncing
  useEffect(() => {
    const currentPath = location.pathname;
    const enterTime = Date.now();
    
    return () => {
      // Skip if path hasn't changed (prevents duplicate tracking on remounts)
      if (currentPath !== location.pathname) {
        const exitTime = Date.now();
        const timeSpent = exitTime - enterTime;
        
        // Only track if meaningful time was spent (more than 10 seconds)
        if (timeSpent > 10000) {
          // Convert to seconds
          const secondsSpent = Math.floor(timeSpent / 1000);
          
          // Update total time for this page
          const timeKey = `time_${currentPath}`;
          const previousTime = parseInt(localStorage.getItem(timeKey) || '0', 10);
          localStorage.setItem(timeKey, (previousTime + secondsSpent).toString());
          
          // Track long visits (over 2 minutes) - but not too frequently
          if (secondsSpent > 120 && Math.random() < 0.3) { // Only 30% chance to actually track
            throttledTrackEvent(`long_visit_${currentPath.replace(/\//g, '_')}`);
            addJournalEntry(`Extended visit to ${currentPath} (${secondsSpent}s). User appears to be studying content.`);
          }
        }
      }
    };
  }, [location.pathname, throttledTrackEvent]);
  
  // Track inactive/active state - with improved performance
  useEffect(() => {
    let inactiveTimer: number;
    let lastActivity = Date.now();
    let isInactive = false;
    let hasLoggedInactivity = false;
    
    const resetTimer = debounce(() => {
      // Only process if we're handling a new activity after inactivity
      if (isInactive || Date.now() - lastActivity > 60000) {
        lastActivity = Date.now();
        isInactive = false;
        hasLoggedInactivity = false;
        clearTimeout(inactiveTimer);
        
        inactiveTimer = window.setTimeout(() => {
          const inactiveTime = Math.floor((Date.now() - lastActivity) / 1000);
          
          // User inactive for 3+ minutes
          if (inactiveTime > 180 && !hasLoggedInactivity) {
            isInactive = true;
            hasLoggedInactivity = true;
            addJournalEntry(`User inactive for ${inactiveTime}s. Possible abandonment or observation.`);
          }
        }, 180000); // 3 minutes
      }
    }, 1000); // Debounce by 1 second
    
    // Set up activity listeners - throttle events that fire rapidly
    const throttledResetTimer = throttle(resetTimer, 5000);
    
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
