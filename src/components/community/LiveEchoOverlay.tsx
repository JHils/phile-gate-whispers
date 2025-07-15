
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface EchoData {
  visitorsNow: number;
  currentPage: string;
  lastActions: string[];
  moodDistribution: Record<string, number>;
  activePhase: 'seeking' | 'wandering' | 'witnessing' | 'echoing';
}

const LiveEchoOverlay: React.FC = () => {
  const [echoData, setEchoData] = useState<EchoData>({
    visitorsNow: 0,
    currentPage: '',
    lastActions: [],
    moodDistribution: {},
    activePhase: 'seeking'
  });
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Simulate live data updates
    const updateEchoData = () => {
      const visitors = Math.floor(Math.random() * 12) + 1;
      const actions = [
        'User whispered to the void',
        'Console command executed: help()',
        'Memory fragment accessed',
        'Mirror reflection detected',
        'Trust level shifted',
        'Echo chamber entered',
        'Hidden page discovered'
      ];

      setEchoData(prev => ({
        ...prev,
        visitorsNow: visitors,
        currentPage: location.pathname,
        lastActions: [
          actions[Math.floor(Math.random() * actions.length)],
          ...prev.lastActions.slice(0, 4)
        ]
      }));
    };

    // Update every 15 seconds
    const interval = setInterval(updateEchoData, 15000);
    updateEchoData(); // Initial update

    return () => clearInterval(interval);
  }, [location.pathname]);

  // Auto-show overlay occasionally
  useEffect(() => {
    const showTimer = setTimeout(() => {
      if (Math.random() > 0.7) { // 30% chance to show
        setIsVisible(true);
        setTimeout(() => setIsVisible(false), 8000); // Hide after 8 seconds
      }
    }, Math.random() * 30000 + 10000); // Between 10-40 seconds

    return () => clearTimeout(showTimer);
  }, [location.pathname]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 left-4 z-[9998] pointer-events-none">
      <div className="bg-black/95 border border-purple-500/30 rounded-lg p-4 font-mono text-xs max-w-xs animate-fade-in">
        <div className="text-purple-400 font-bold mb-2">
          ◉ LIVE ECHO CHAMBER
        </div>
        
        <div className="space-y-2 text-purple-300">
          <div>
            Active souls: <span className="text-purple-400">{echoData.visitorsNow}</span>
          </div>
          
          <div className="border-t border-purple-500/20 pt-2">
            <div className="text-purple-500 mb-1">Recent echoes:</div>
            {echoData.lastActions.slice(0, 3).map((action, index) => (
              <div key={index} className="text-purple-400 opacity-80">
                • {action}
              </div>
            ))}
          </div>
          
          <div className="border-t border-purple-500/20 pt-2">
            <div className="text-purple-500">Collective mood:</div>
            <div className="text-purple-400">
              {Math.random() > 0.5 ? 'Contemplative' : 'Seeking'}
            </div>
          </div>
        </div>
        
        <div className="mt-3 pt-2 border-t border-purple-500/20">
          <div className="text-purple-600 text-xs italic">
            You are not alone in the digital dark...
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveEchoOverlay;
