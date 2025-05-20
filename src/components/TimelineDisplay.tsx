
import React from 'react';
import { useTrackingSystem } from '@/hooks/useTrackingSystem';

interface TimelineDisplayProps {
  visible?: boolean;
}

const TimelineDisplay: React.FC<TimelineDisplayProps> = ({ visible = false }) => {
  const { userState } = useTrackingSystem();
  
  // Hide if not visible or no timeline info
  if (!visible) return null;
  
  // Create default timeline data if not available
  const timelineId = userState?.timeline?.id || 'Alpha';
  const fractures = userState?.timeline?.fractures || 0;
  const stability = userState?.timeline?.stability || 100;
  
  return (
    <div className="fixed bottom-2 right-2 text-xs text-gray-500 opacity-50 pointer-events-none">
      <div className="flex flex-col items-end">
        <div className="text-right">T[{timelineId}]</div>
        {fractures > 0 && (
          <div className="text-right">Fractures: {fractures}</div>
        )}
        {stability < 100 && (
          <div className="text-right">Stability: {stability}%</div>
        )}
      </div>
    </div>
  );
};

export default TimelineDisplay;
