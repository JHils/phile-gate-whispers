
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useTrackingSystem } from '@/hooks/useTrackingSystem';

const QuietMode: React.FC = () => {
  const { trackEvent } = useTrackingSystem();
  const [signalStrength, setSignalStrength] = useState(0);
  
  useEffect(() => {
    trackEvent('visited_quiet_mode');
    
    // Gradually decrease "signal strength" to simulate going quiet
    const interval = setInterval(() => {
      setSignalStrength(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 300);
    
    // Easter egg in console
    console.log("%cSignal fading... going dark...", "color: #475B74; font-size:14px;");
    
    return () => clearInterval(interval);
  }, [trackEvent]);
  
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Quiet Mode Active</h1>
        
        <div className="mb-12 space-y-6">
          <div className="relative h-2 bg-gray-800 rounded-full overflow-hidden w-64 mx-auto">
            <div 
              className="absolute top-0 left-0 h-full bg-dust-blue transition-all duration-300"
              style={{ width: `${signalStrength}%`, opacity: 1 - signalStrength/100 }}
            ></div>
          </div>
          
          <p className="text-lg opacity-70">
            {signalStrength < 100 ? 'Reducing signal footprint...' : 'Signal minimized. Web presence obscured.'}
          </p>
          
          <div className="bg-gray-900 border border-gray-800 p-6 rounded-md mt-8">
            <p className="text-lg">
              You've entered quiet mode. Your presence is now minimal.
            </p>
            <p className="text-lg mt-4">
              The web will catch us all eventually, but for now, you're invisible to most tracking mechanisms.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            <div className="p-4 bg-gray-900/50 rounded-md">
              <h3 className="font-bold mb-2">Signal Status</h3>
              <p className="opacity-70">Minimized (Level 3)</p>
            </div>
            
            <div className="p-4 bg-gray-900/50 rounded-md">
              <h3 className="font-bold mb-2">Visibility Index</h3>
              <p className="opacity-70">0.23 (Very Low)</p>
            </div>
          </div>
        </div>
        
        <div className="mt-8">
          <Link to="/gate">
            <Button variant="outline" className="border-gray-700">
              Return to Gate (Maintain Quiet)
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default QuietMode;
