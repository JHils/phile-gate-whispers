
import React, { useEffect, useState } from 'react';
import { useTrackingSystem } from '@/hooks/useTrackingSystem';

interface TimelineDisplayProps {
  visible?: boolean;
}

const TimelineDisplay: React.FC<TimelineDisplayProps> = ({ visible = false }) => {
  const { userState } = useTrackingSystem();
  const [timelineId, setTimelineId] = useState<string>('Alpha');
  const [fractureCount, setFractureCount] = useState<number>(0);
  const [isGlitching, setIsGlitching] = useState<boolean>(false);
  
  // Initialize timeline data from user state or local storage
  useEffect(() => {
    // Check user state first
    if (userState?.timeline?.id) {
      setTimelineId(userState.timeline.id);
      setFractureCount(userState.timeline.fractureEvents || 0);
    } else {
      // Fall back to localStorage
      const storedTimeline = localStorage.getItem('timelineId');
      const storedFractures = localStorage.getItem('fractures');
      
      if (storedTimeline) {
        setTimelineId(storedTimeline);
      } else {
        // Generate a random timeline ID if none exists
        const timelines = ['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta', 'Eta', 'Theta', 'Iota', 'Kappa', 'Lambda', 'Mu'];
        const newTimeline = timelines[Math.floor(Math.random() * timelines.length)];
        setTimelineId(newTimeline);
        localStorage.setItem('timelineId', newTimeline);
      }
      
      if (storedFractures) {
        setFractureCount(parseInt(storedFractures, 10));
      }
    }
  }, [userState]);
  
  // Occasionally trigger a timeline glitch/fracture
  useEffect(() => {
    // Random glitch effect
    const triggerGlitch = () => {
      // Only glitch occasionally
      if (Math.random() > 0.9) {
        setIsGlitching(true);
        
        // Reset glitch after a short delay
        setTimeout(() => {
          setIsGlitching(false);
        }, 2000);
      }
    };
    
    // Set up glitch interval
    const glitchInterval = setInterval(triggerGlitch, 30000);
    
    return () => clearInterval(glitchInterval);
  }, []);
  
  if (!visible) return null;
  
  return (
    <div 
      className={`fixed bottom-2 left-2 font-mono text-xs text-gray-500 transition-all duration-300 z-50
        ${isGlitching ? 'text-red-500 blur-sm animate-glitch' : 'hover:text-white'}`}
    >
      T[{timelineId}]{fractureCount > 0 ? `•${fractureCount}` : ''}
    </div>
  );
};

export default TimelineDisplay;
