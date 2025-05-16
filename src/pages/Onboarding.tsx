
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useTrackingSystem } from '@/hooks/useTrackingSystem';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import HiddenLink from '@/components/HiddenLink';

const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  const { trackEvent } = useTrackingSystem();
  const { toast } = useToast();
  const [currentSection, setCurrentSection] = useState(1);
  const [consoleInitiated, setConsoleInitiated] = useState(false);
  const [listeningAttempted, setListeningAttempted] = useState(false);
  const [secondVisit, setSecondVisit] = useState(false);
  const [isTraceCompleted, setIsTraceCompleted] = useState(false);

  // Check if this is the second+ visit
  useEffect(() => {
    const visitCount = parseInt(localStorage.getItem('onboardingVisits') || '0');
    if (visitCount > 0) {
      setSecondVisit(true);
    }
    localStorage.setItem('onboardingVisits', (visitCount + 1).toString());

    // Track this page view
    trackEvent('view_onboarding');
  }, [trackEvent]);

  const initiateConsole = () => {
    setConsoleInitiated(true);
    trackEvent('onboarding_console_initiated');
    
    setTimeout(() => {
      toast({
        title: "Shadowfile Initiated",
        description: "Memory slot corrupted. Proceed.",
        variant: "destructive"
      });
    }, 500);
  };

  const handleListenCommand = () => {
    setListeningAttempted(true);
    
    if (secondVisit) {
      toast({
        title: "Audio channel detected: ECHO 3",
        description: "Signal coming through...",
        variant: "default"
      });
      
      setTimeout(() => {
        // Play audio or show additional content for second visit
        console.log("%cECHO 3: They're watching you through the browser.", "color: #8B3A40; font-size:14px;");
      }, 2000);
    } else {
      toast({
        title: "Audio channel detected: ECHO 3",
        description: "Response delayed.",
        variant: "default"
      });
    }
    
    trackEvent('onboarding_listen_command');
  };

  const handleTraceVariant = () => {
    setIsTraceCompleted(true);
    toast({
      title: "QR registered",
      description: "Variant leads to unstable page: /fleet/ghost",
      variant: "default"
    });
    
    trackEvent('onboarding_trace_variant');
    
    // Add this as a discoverable URL
    if (typeof window !== 'undefined') {
      localStorage.setItem('discoveredFleetGhost', 'true');
    }
  };

  const completeTraining = () => {
    trackEvent('onboarding_completed');
    navigate('/gate');
  };

  const breakTheLoop = () => {
    trackEvent('onboarding_break_loop');
    navigate('/onboarding/failure');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 mt-8 text-center">Jonah's Philes – Onboarding</h1>
        
        {/* Section 1 */}
        <Card className="bg-gray-800 bg-opacity-50 backdrop-blur-sm border border-gray-700 p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Section 1 – Welcome to the Archive</h2>
          <p className="mb-4">You are not authorised. But you're here anyway. That's enough.</p>
          <p className="mb-6">This orientation program was designed for Gate Agents only. If you are reading this, protocol has failed. So… congratulations. You are now a Gatewatch Trainee.</p>
          
          <div className="mb-4">
            <p className="mb-4">Tap the console below to begin your shadowfile.</p>
            
            <div className="bg-black p-4 rounded-md font-mono text-sm mb-6">
              {!consoleInitiated ? (
                <div className="cursor-pointer flex" onClick={initiateConsole}>
                  <span className="text-green-400">&gt;</span> 
                  <span className="ml-2 text-green-400">console command: </span>
                  <span className="ml-2 text-white hover:text-green-300">initiate()</span>
                </div>
              ) : (
                <>
                  <div>
                    <span className="text-green-400">&gt;</span> 
                    <span className="ml-2 text-green-400">console command: </span>
                    <span className="ml-2 text-white">initiate()</span>
                  </div>
                  <div className="text-green-300 mt-1">→ Shadowfile Initiated. Memory slot corrupted. Proceed.</div>
                </>
              )}
            </div>
            
            {consoleInitiated && (
              <Button 
                variant="outline" 
                onClick={() => setCurrentSection(2)}
                className="w-full mt-4 border-gray-500 text-gray-300 hover:bg-gray-700"
              >
                Continue to Section 2
              </Button>
            )}
          </div>
        </Card>
        
        {/* Section 2 */}
        {currentSection >= 2 && (
          <Card className="bg-gray-800 bg-opacity-50 backdrop-blur-sm border border-gray-700 p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Section 2 – How to Spot a Clue</h2>
            <p className="mb-4">Not all secrets wear labels. Some look like typos. Others wear timestamps like camouflage. When in doubt, click what shouldn't be clickable.</p>
            
            <div className="mb-6">
              <p>
                Sometimes the truth is hidden in plain sight. <HiddenLink 
                  text="You just need to look closer." 
                  password="layer1" 
                  redirectPath="/shadow/initiation?layer=1" 
                  className="text-gray-400 hover:text-white"
                />
              </p>
            </div>
            
            <div className="bg-black p-4 rounded-md font-mono text-sm mb-6">
              <div>
                <span className="text-green-400">&gt;</span> 
                <span className="ml-2 text-green-400">console command: </span>
                <span className="ml-2 text-white animate-pulse">seeTheLie()</span>
              </div>
            </div>
            
            <Button 
              variant="outline" 
              onClick={() => setCurrentSection(3)}
              className="w-full mt-4 border-gray-500 text-gray-300 hover:bg-gray-700"
            >
              Continue to Section 3
            </Button>
          </Card>
        )}
        
        {/* Section 3 */}
        {currentSection >= 3 && (
          <Card className="bg-gray-800 bg-opacity-50 backdrop-blur-sm border border-gray-700 p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Section 3 – Understanding Console Behaviour</h2>
            <p className="mb-4">The Console speaks in code. It wants to help you. Or mislead you. That's part of the game.</p>
            
            <div className="bg-black p-4 rounded-md font-mono text-sm mb-6">
              <div>
                <span className="text-green-400">&gt;</span> 
                <span className="ml-2 text-green-400">console command: </span>
                <span 
                  className="ml-2 text-white hover:text-green-300 cursor-pointer"
                  onClick={handleListenCommand}
                >
                  listen()
                </span>
              </div>
              
              {listeningAttempted && (
                <div className="text-green-300 mt-1">
                  → Audio channel detected: ECHO 3. 
                  <span 
                    className="ml-1 cursor-help" 
                    title={secondVisit ? "Signal connected. Try running this command in the browser console." : "Try again after your second visit."}
                  >
                    Response {secondVisit ? "connected" : "delayed"}.
                  </span>
                </div>
              )}
            </div>
            
            <Button 
              variant="outline" 
              onClick={() => setCurrentSection(4)}
              className="w-full mt-4 border-gray-500 text-gray-300 hover:bg-gray-700"
            >
              Continue to Section 4
            </Button>
          </Card>
        )}
        
        {/* Section 4 */}
        {currentSection >= 4 && (
          <Card className="bg-gray-800 bg-opacity-50 backdrop-blur-sm border border-gray-700 p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Section 4 – Pavement URLs & QR Variants</h2>
            <p className="mb-4">Pages like /re-entry?code=XXXX hide in plain sight.</p>
            <p className="mb-4">QR codes embedded in books, graffiti, or corrupted logs lead here. Some change. Some lie. All mean something.</p>
            
            <div className="mb-4">
              <p className="mb-4">Sample: /re-<span className="bg-gray-700">■■■■■■■■</span>?code=<span className="bg-gray-700">■■■■</span></p>
            </div>
            
            <div className="bg-black p-4 rounded-md font-mono text-sm mb-6">
              <div>
                <span className="text-green-400">&gt;</span> 
                <span className="ml-2 text-green-400">console command: </span>
                <span 
                  className="ml-2 text-white hover:text-green-300 cursor-pointer"
                  onClick={handleTraceVariant}
                >
                  traceVariant("VAR007")
                </span>
              </div>
              
              {isTraceCompleted && (
                <div className="text-green-300 mt-1">
                  → QR registered. Variant leads to unstable page: /fleet/ghost
                </div>
              )}
            </div>
            
            <Button 
              variant="outline" 
              onClick={() => setCurrentSection(5)}
              className="w-full mt-4 border-gray-500 text-gray-300 hover:bg-gray-700"
            >
              Continue to Section 5
            </Button>
          </Card>
        )}
        
        {/* Section 5 */}
        {currentSection >= 5 && (
          <Card className="bg-gray-800 bg-opacity-50 backdrop-blur-sm border border-gray-700 p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Section 5 – Final Lesson: Nothing Is Final</h2>
            <p className="mb-4">If this page ends… It's lying.</p>
            <p className="mb-6">If the system says COMPLETE… You've missed something.</p>
            
            <Button 
              onClick={completeTraining}
              className="w-full mb-6 bg-green-700 hover:bg-green-600 text-white"
            >
              Complete Training
            </Button>
            
            <div 
              className="text-white opacity-0 hover:opacity-100 transition-opacity duration-500 mt-8 cursor-pointer text-center"
              onClick={breakTheLoop}
            >
              → Use command: breakTheLoop()
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Onboarding;
