
import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useTrackingSystem } from '@/hooks/useTrackingSystem';

const ShadowInitiation: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { trackEvent } = useTrackingSystem();
  
  const layer = searchParams.get('layer') || '';
  
  useEffect(() => {
    trackEvent('view_shadow_initiation');
    
    // Special console message for discoverers
    console.log("%cYou found the shadow path. The real training begins.", "color: #8B3A40; font-size:16px; font-weight:bold;");
    console.log("%cTry command: seeTheLie()", "color: #475B74; font-size:14px;");
    
    // Register this discovery
    localStorage.setItem('shadowPathDiscovered', 'true');
  }, [trackEvent]);
  
  const handleReturnToTraining = () => {
    trackEvent('shadow_return_to_training');
    navigate('/onboarding');
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 flex flex-col items-center justify-center">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-8">Shadow Initiation: Layer {layer}</h1>
        
        <div className="mb-12 space-y-6 text-left">
          <p>You've discovered the shadow path. Very few trainees make it this far.</p>
          
          <div className="bg-gray-900 border border-gray-800 p-6 rounded-md">
            <h3 className="text-xl font-semibold mb-4">Hidden Resources:</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Off-record console commands are unlocked</li>
              <li>Tracker implementation noticed</li>
              <li>Shadow branch access: <span className="text-green-400">GRANTED</span></li>
            </ul>
          </div>
          
          <p>
            The orientation program is a distraction. Real training happens in the shadows.
            Continue to explore the site and use the console for deeper access.
          </p>
          
          <div className="font-mono text-xs opacity-50 mt-8">
            <p>SESSION ID: {Math.random().toString(36).substring(2, 15)}</p>
            <p>CLEARANCE: SHADOW-0{layer}</p>
            <p>STATUS: OBSERVATION</p>
          </div>
        </div>
        
        <Button
          variant="outline"
          onClick={handleReturnToTraining}
          className="border-gray-700 hover:bg-gray-800"
        >
          Return to "Training"
        </Button>
      </div>
    </div>
  );
};

export default ShadowInitiation;
