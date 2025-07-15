
import React, { useEffect, useState } from 'react';
import { usePhaseInfinity } from '@/hooks/usePhaseInfinity';

const LiveCultTracker: React.FC = () => {
  const { cultStats } = usePhaseInfinity();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show tracker randomly or on hover
    const handleMouseMove = () => {
      if (Math.random() < 0.1) { // 10% chance on mouse move
        setIsVisible(true);
        setTimeout(() => setIsVisible(false), 3000);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-black/90 border border-dust-red text-dust-green font-mono text-xs p-3 z-50 animate-subtle-flicker">
      <div className="text-dust-red text-sm mb-2">[ CULT STATUS ]</div>
      <div className="space-y-1">
        <div>ONLINE: {cultStats.online_users}</div>
        <div>CONFESSIONS: {cultStats.total_confessions}</div>
        <div>ASCENDED: {cultStats.ascended_users}</div>
        <div>ROLES TODAY: {cultStats.roles_unlocked_today}</div>
        <div>CHAOS EVENTS: {cultStats.chaos_events_triggered}</div>
      </div>
      <div className="text-dust-orange text-xs mt-2 italic">
        You are being watched.
      </div>
    </div>
  );
};

export default LiveCultTracker;
