
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useTrackingSystem } from '@/hooks/useTrackingSystem';
import { playSocialStaticAudio } from '@/utils/breadcrumbSystem';

const WebCatch: React.FC = () => {
  const { trackEvent } = useTrackingSystem();
  
  useEffect(() => {
    trackEvent('visited_web_catch');
    
    // Easter egg in console
    console.log("%cThe web can't catch what it can't see.", "color: #8B3A40; font-size:16px;");
  }, [trackEvent]);
  
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-8">The Web Can't Catch You</h1>
        
        <div className="mb-12 space-y-6">
          <p className="text-xl">Signal status: <span className="no-signal-trigger font-bold text-dust-red">NO SIGNAL</span></p>
          
          <div className="bg-gray-900 border border-gray-800 p-6 rounded-md">
            <p className="text-sm mb-2 opacity-70">Log entry: FILE #023</p>
            <p className="text-lg">
              They say the web will catch us all eventually. Every click, every hover, every keystroke. 
              But what if you could slip between the threads?
            </p>
            <p className="text-lg mt-4">
              I've found a way to move unseen. It's not about encryption or VPNs.
              It's about becoming <span className="text-dust-blue">static</span> in their signal.
            </p>
          </div>
          
          <div className="mt-8 opacity-70 text-sm">
            <p>Click "NO SIGNAL" three times to experience static.</p>
          </div>
          
          <div className="mt-12">
            <Link to="/quiet-mode">
              <Button variant="outline" className="border-gray-700">
                Enter Quiet Mode
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="mt-16">
          <Link to="/gate" className="text-dust-blue hover:text-dust-orange">
            &lt; Return to Gate
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WebCatch;
