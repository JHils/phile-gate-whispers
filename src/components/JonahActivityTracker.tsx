
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTrackingSystem } from '@/hooks/useTrackingSystem';
import { addJournalEntry } from '@/utils/jonahRealityFabric';

const JonahActivityTracker = () => {
  const location = useLocation();
  const { trackEvent } = useTrackingSystem();
  
  // Track page visits
  useEffect(() => {
    const currentPath = location.pathname;
    
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
      trackEvent(`first_visit_${currentPath.replace(/\//g, '_')}`);
      
      // Add journal entry for first visit
      addJournalEntry(`First visit to ${currentPath}. User has visited ${pagesVisited.length} unique pages.`);
    }
    
    // Track repeat visits
    if (visitCount > 1) {
      trackEvent(`repeat_visit_${currentPath.replace(/\//g, '_')}`);
      
      // Add journal entry for significant repeat visits
      if (visitCount === 3 || visitCount === 5 || visitCount === 10) {
        addJournalEntry(`User has returned to ${currentPath} ${visitCount} times. Fixation detected.`);
      }
    }
    
    // Track special page combinations
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
      if (hasVisitedSequence(combo.paths) && 
          !localStorage.getItem(`tracked_${combo.event}`)) {
        // Track this special combination
        trackEvent(combo.event);
        localStorage.setItem(`tracked_${combo.event}`, 'true');
        
        // Add journal entry
        addJournalEntry(combo.message);
      }
    });
    
  }, [location.pathname, trackEvent]);
  
  // Track time spent on page
  useEffect(() => {
    const currentPath = location.pathname;
    const enterTime = Date.now();
    
    return () => {
      const exitTime = Date.now();
      const timeSpent = exitTime - enterTime;
      
      // Only track if meaningful time was spent (more than 5 seconds)
      if (timeSpent > 5000) {
        // Convert to seconds
        const secondsSpent = Math.floor(timeSpent / 1000);
        
        // Update total time for this page
        const timeKey = `time_${currentPath}`;
        const previousTime = parseInt(localStorage.getItem(timeKey) || '0', 10);
        localStorage.setItem(timeKey, (previousTime + secondsSpent).toString());
        
        // Track long visits (over 2 minutes)
        if (secondsSpent > 120) {
          trackEvent(`long_visit_${currentPath.replace(/\//g, '_')}`);
          addJournalEntry(`Extended visit to ${currentPath} (${secondsSpent}s). User appears to be studying content.`);
        }
      }
    };
  }, [location.pathname, trackEvent]);
  
  // Track inactive/active state
  useEffect(() => {
    let inactiveTimer: number;
    let lastActivity = Date.now();
    
    const resetTimer = () => {
      lastActivity = Date.now();
      clearTimeout(inactiveTimer);
      
      inactiveTimer = window.setTimeout(() => {
        const inactiveTime = Math.floor((Date.now() - lastActivity) / 1000);
        
        // User inactive for 3+ minutes
        if (inactiveTime > 180) {
          addJournalEntry(`User inactive for ${inactiveTime}s. Possible abandonment or observation.`);
        }
      }, 180000); // 3 minutes
    };
    
    // Set up activity listeners
    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keydown', resetTimer);
    window.addEventListener('click', resetTimer);
    window.addEventListener('scroll', resetTimer);
    
    // Initial timer setup
    resetTimer();
    
    return () => {
      clearTimeout(inactiveTimer);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
      window.removeEventListener('click', resetTimer);
      window.removeEventListener('scroll', resetTimer);
    };
  }, []);
  
  return null; // This component doesn't render anything
};

export default JonahActivityTracker;
