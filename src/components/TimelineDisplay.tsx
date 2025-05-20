
import React from 'react';
import { useTrackingSystem } from '@/hooks/useTrackingSystem';

interface TimelineDisplayProps {
  visible?: boolean;
}

const TimelineDisplay: React.FC<TimelineDisplayProps> = ({ visible = false }) => {
  const { userState } = useTrackingSystem();
  
  // Generate random timeline ID if one doesn't exist
  const getTimelineId = () => {
    const timelines = ['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta', 'Eta', 'Theta', 'Iota', 'Kappa', 'Lambda', 'Mu'];
    return userState?.timeline?.id || timelines[Math.floor(Math.random() * timelines.length)];
  };
  
  // Get timeline variant
  const getVariant = () => {
    return userState?.timeline?.variant || 'prime';
  };
  
  // Get fracture count
  const getFractureCount = () => {
    return userState?.timeline?.fractureEvents || 0;
  };
  
  if (!visible) return null;
  
  return (
    <div className="fixed top-0 right-0 p-1 text-[10px] text-gray-400/30 font-mono select-none pointer-events-none z-50">
      T[{getTimelineId()}]:{getVariant()}:{getFractureCount()}
    </div>
  );
};

export default TimelineDisplay;
