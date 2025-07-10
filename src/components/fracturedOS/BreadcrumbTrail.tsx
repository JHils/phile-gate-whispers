
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getRandomPathStat } from '@/utils/jonahVoice';

interface TrailStep {
  path: string;
  timestamp: number;
  displayName: string;
}

const BreadcrumbTrail: React.FC = () => {
  const location = useLocation();
  const [trail, setTrail] = useState<TrailStep[]>([]);
  const [pathStat, setPathStat] = useState<string>('');

  // Map paths to display names
  const getDisplayName = (path: string): string => {
    const pathMap: Record<string, string> = {
      '/': 'GATE',
      '/philes': 'PHILES',
      '/talk-to-jonah': 'ECHO CHAMBER',
      '/console': 'NEURAL INTERFACE',
      '/rebirth': 'RECOVERY PROTOCOL',
      '/split-voice': 'IDENTITY FRACTURE',
      '/campfire': 'WHISPER WALL',
      '/about': 'THE MAN WHO WASN\'T ME',
      '/contact': 'WHISPER TO VOID'
    };
    
    return pathMap[path] || path.toUpperCase().replace('/', '').replace('-', ' ');
  };

  // Update trail when location changes
  useEffect(() => {
    const newStep: TrailStep = {
      path: location.pathname,
      timestamp: Date.now(),
      displayName: getDisplayName(location.pathname)
    };

    setTrail(prev => {
      const filtered = prev.filter(step => step.path !== location.pathname);
      const updated = [...filtered, newStep].slice(-5); // Keep last 5 steps
      return updated;
    });

    // Update path stat randomly
    if (Math.random() < 0.3) {
      setPathStat(getRandomPathStat());
    }
  }, [location.pathname]);

  if (trail.length === 0) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 pointer-events-none">
      {/* Trail Display */}
      <div className="bg-black/80 backdrop-blur-sm border border-green-500/30 rounded-lg p-3 font-mono text-xs text-green-400">
        <div className="flex items-center gap-1 mb-2">
          <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-green-300">NEURAL PATH</span>
        </div>
        
        <div className="flex items-center gap-2 text-green-400/80">
          {trail.map((step, index) => (
            <React.Fragment key={`${step.path}-${step.timestamp}`}>
              <span className={index === trail.length - 1 ? 'text-green-400 font-bold' : ''}>
                {step.displayName}
              </span>
              {index < trail.length - 1 && (
                <span className="text-green-600">→</span>
              )}
            </React.Fragment>
          ))}
        </div>
        
        {pathStat && (
          <div className="mt-2 pt-2 border-t border-green-500/20 text-green-400/60 italic">
            {pathStat}
          </div>
        )}
      </div>
    </div>
  );
};

export default BreadcrumbTrail;
