
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useTrackingSystem } from '@/hooks/useTrackingSystem';

const OnboardingFailure: React.FC = () => {
  const navigate = useNavigate();
  const { trackEvent } = useTrackingSystem();
  
  useEffect(() => {
    trackEvent('view_onboarding_failure');
    
    // Simulate a glitch effect on the page
    const timer = setTimeout(() => {
      document.body.classList.add('glitch-effect');
      
      setTimeout(() => {
        document.body.classList.remove('glitch-effect');
      }, 1000);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [trackEvent]);
  
  const handleReturnToGate = () => {
    trackEvent('onboarding_failure_return');
    navigate('/gate');
  };
  
  const handleTryAgain = () => {
    trackEvent('onboarding_failure_retry');
    navigate('/onboarding');
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 text-center">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-red-500 animate-pulse">System Breach Detected</h1>
        
        <div className="mb-12 space-y-6">
          <p className="text-xl">Training loop corruption detected.</p>
          <p className="text-lg">Gatewatch authorization revoked.</p>
          <p className="text-lg">ShadowFile: <span className="line-through">INITIATED</span> <span className="text-red-500">CORRUPTED</span></p>
          
          <div className="py-6 my-6 border-y border-gray-800 font-mono text-sm whitespace-pre-wrap">
            {'ERROR: 00x87A\n'}
            {'Trainee identity verification failed\n'}
            {'Protocol violations detected: 3\n'}
            {'Authorization level: INSUFFICIENT\n'}
            {'Diagnostic: You are not ready.\n'}
          </div>
          
          <p className="text-lg">The Gate remains closed to those who cannot see.</p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Button
            variant="destructive"
            onClick={handleReturnToGate}
            className="md:w-auto"
          >
            Return to The Gate
          </Button>
          
          <Button
            variant="outline"
            onClick={handleTryAgain}
            className="border-gray-700 md:w-auto"
          >
            Retry Orientation
          </Button>
        </div>
        
        <div className="mt-16 opacity-30 font-mono text-xs">
          <p>Simulation terminated || Event logged || Observer notified</p>
        </div>
      </div>
    </div>
  );
};

export default OnboardingFailure;
