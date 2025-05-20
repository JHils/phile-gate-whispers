import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useTrackingSystem } from '@/hooks/useTrackingSystem';
import { useConsoleMessages } from '@/hooks/useConsoleMessages';
import TextGlitch from '@/components/TextGlitch';
import LoadingScreen from '@/components/LoadingScreen';
import JonahLogo from '@/components/JonahLogo';

const Onboarding = () => {
  const { trackEvent, userState } = useTrackingSystem();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(1);
  const [consoleValue, setConsoleValue] = useState('');
  const [consoleOutput, setConsoleOutput] = useState<{ text: string, isResponse?: boolean }[]>([]);
  const [showHiddenWord, setShowHiddenWord] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [showLoading, setShowLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const consoleInputRef = useRef<HTMLInputElement>(null);
  const consoleOutputRef = useRef<HTMLDivElement>(null);
  
  const { showConsoleMessages } = useConsoleMessages({ 
    storageKey: 'onboarding_console_messages',
    userState
  });
  
  useEffect(() => {
    trackEvent('visited_onboarding');
    showConsoleMessages();
    
    // Hide loading screen after delay
    setTimeout(() => {
      setShowLoading(false);
    }, 1500);
    
    // Set up console command handler
    (window as any).seeTheLie = function() {
      setShowHiddenWord(true);
      return "Truth revealed. Shadow path unlocked.";
    };
  }, [trackEvent, showConsoleMessages]);
  
  useEffect(() => {
    // Auto-scroll console output to bottom
    if (consoleOutputRef.current) {
      consoleOutputRef.current.scrollTop = consoleOutputRef.current.scrollHeight;
    }
  }, [consoleOutput]);
  
  const handleConsoleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!consoleValue.trim()) return;
    
    // Add user input to console output
    setConsoleOutput(prev => [...prev, { text: `> ${consoleValue}` }]);
    
    // Handle different commands
    const command = consoleValue.trim().toLowerCase();
    let response = "Command not recognized.";
    
    if (command === 'initiate()') {
      response = "Shadowfile Initiated. Memory slot corrupted. Proceed.";
      setActiveSection(2);
    } else if (command === 'seetheli()' || command === 'seethelie()') {
      response = "Truth revealed. Shadow path unlocked.";
      setShowHiddenWord(true);
    } else if (command === 'listen()') {
      response = "Audio channel detected: ECHO 3. Response delayed.";
      setAudioEnabled(true);
    } else if (command.includes('tracevariant')) {
      response = "QR registered. Variant leads to unstable page: /fleet/ghost";
    } else if (command === 'breaktheloop()') {
      response = "Loop broken. Redirecting to failure state...";
      setTimeout(() => navigate('/onboarding/failure'), 1500);
    } else if (command === 'help()' || command === 'help') {
      response = "Available commands: initiate(), listen(), seeTheLie(), traceVariant(), breakTheLoop()";
    } else if (command === 'clear()' || command === 'clear') {
      setConsoleOutput([]);
      setConsoleValue('');
      return;
    }
    
    // Add response to console output with delay
    setTimeout(() => {
      setConsoleOutput(prev => [...prev, { text: `→ ${response}`, isResponse: true }]);
    }, 300);
    
    // Clear the input
    setConsoleValue('');
    
    // Make sure we track the special command
    if (command === 'seethelie()') {
      trackEvent('console_seeTheLie_called');
    }
  };
  
  const handleCompleteTraining = () => {
    trackEvent('onboarding_completed');
    navigate('/gate');
  };
  
  return (
    <>
      {showLoading && <LoadingScreen message="Initializing onboarding protocol..." />}
    
      <div className="min-h-screen bg-black text-white font-mono flex flex-col">
        <div className="container mx-auto px-4 py-12 flex-grow flex flex-col">
          {/* Breadcrumb navigation */}
          <div className="mb-8 flex justify-between">
            <div className="text-sm text-dust-blue/70">
              <span>Orientation</span>
              <span className="mx-2">›</span>
              <span className="text-white">Gatewatch Training</span>
            </div>
            <div className="text-sm text-dust-blue/70">
              Step {currentStep} of 5
            </div>
          </div>
          
          <header className="mb-10 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">GATEWATCH ORIENTATION</h1>
            <p className="text-dust-blue opacity-70">Access Level: UNAUTHORIZED</p>
          </header>
          
          {/* Ghost glyph in corner - using SVG with opacity */}
          <div className="absolute top-16 right-16 ghost-glyph">
            <JonahLogo variant="glyph" size="lg" />
          </div>
          
          <div className="max-w-3xl mx-auto w-full flex-grow flex flex-col">
            {/* Section 1 */}
            <div className={`mb-16 transition-all duration-500 ${activeSection > 1 ? 'opacity-50' : ''}`}>
              <h2 className="text-xl md:text-2xl mb-6 border-b border-gray-800 pb-2 font-typewriter uppercase tracking-wider">Section 1 – Welcome to the Archive</h2>
              
              <div className="space-y-6 text-lg">
                <p className="animate-fade-in">You are not authorised. But you're here anyway. That's enough.</p>
                
                <p className="animate-fade-in delay-300">This orientation program was designed for Gate Agents only. If you are reading this, protocol has failed. So… congratulations. You are now a Gatewatch Trainee.</p>
                
                <p className="animate-fade-in delay-600">Tap the console below to begin your shadowfile.</p>
                
                <div className="bg-gray-900 border border-gray-800 rounded-md p-4">
                  <form onSubmit={handleConsoleSubmit} className="flex flex-col">
                    <div 
                      ref={consoleOutputRef}
                      className="h-32 overflow-y-auto mb-2 text-sm" 
                      style={{ fontFamily: 'monospace' }}
                      onClick={() => consoleInputRef.current?.focus()}
                    >
                      {consoleOutput.map((line, i) => (
                        <div 
                          key={i} 
                          className={`mb-1 ${line.isResponse ? 'text-dust-blue' : 'text-white'}`}
                        >
                          {line.text}
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex border-t border-gray-800 pt-2">
                      <span className="text-dust-blue mr-2">&gt;</span>
                      <input
                        ref={consoleInputRef}
                        type="text"
                        value={consoleValue}
                        onChange={e => setConsoleValue(e.target.value)}
                        className="bg-transparent flex-grow focus:outline-none"
                        placeholder="Enter command"
                        autoFocus
                      />
                    </div>
                  </form>
                  
                  <div className="text-xs text-gray-500 mt-2">Try: initiate()</div>
                </div>
              </div>
            </div>
            
            {/* Section 2 */}
            {activeSection >= 2 && (
              <div className={`mb-16 transition-all duration-500 ${activeSection > 2 ? 'opacity-50' : ''}`}>
                <h2 className="text-xl md:text-2xl mb-6 border-b border-gray-800 pb-2 font-typewriter">Section 2 – How to Spot a Clue</h2>
                
                <div className="space-y-6 text-lg">
                  <p>Not all secrets wear labels. Some look like typos. Others wear timestamps like camouflage. When in doubt, click what shouldn't be clickable.</p>
                  
                  <p>
                    Some text contains <span 
                      className={`${showHiddenWord ? 'text-dust-red cursor-pointer underline' : ''}`}
                      onClick={() => {
                        if (showHiddenWord) {
                          trackEvent('shadow_path_link_clicked');
                          navigate('/shadow/initiation?layer=1');
                        }
                      }}
                    >
                      hidden paths
                    </span> that lead to deeper truths.
                  </p>
                  
                  <div className="bg-gray-900 border border-gray-800 rounded-md p-4">
                    <div className="font-mono text-sm">
                      <div>&gt; console command: seeTheLie()</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Section 3 */}
            {activeSection >= 2 && (
              <div className={`mb-16 transition-all duration-500 ${activeSection > 3 ? 'opacity-50' : ''}`}>
                <h2 className="text-xl md:text-2xl mb-6 border-b border-gray-800 pb-2 font-typewriter">Section 3 – Understanding Console Behaviour</h2>
                
                <div className="space-y-6 text-lg">
                  <p>The Console speaks in code. It wants to help you. Or mislead you. That's part of the game.</p>
                  
                  <p>Try: listen()</p>
                  
                  <div className="bg-gray-900 border border-gray-800 rounded-md p-4">
                    <div className="font-mono text-sm text-dust-blue">
                      → Audio channel detected: ECHO 3. 
                      <span 
                        className="relative group cursor-help"
                        title="Try again after your second visit."
                      >
                        Response delayed.
                        <span className="hidden group-hover:block absolute bg-gray-800 border border-gray-700 text-white text-xs p-2 rounded w-48 top-full left-0 mt-1 z-10">
                          Try again after your second visit.
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Section 4 */}
            {activeSection >= 2 && (
              <div className={`mb-16 transition-all duration-500 ${activeSection > 4 ? 'opacity-50' : ''}`}>
                <h2 className="text-xl md:text-2xl mb-6 border-b border-gray-800 pb-2 font-typewriter">Section 4 – Pavement URLs & QR Variants</h2>
                
                <div className="space-y-6 text-lg">
                  <p>Pages like /re-entry?code=XXXX hide in plain sight.</p>
                  
                  <p>QR codes embedded in books, graffiti, or corrupted logs lead here. Some change. Some lie. All mean something.</p>
                  
                  <p>Sample: /re-■■■■■■■■?code=■■■■</p>
                  
                  <div className="bg-gray-900 border border-gray-800 rounded-md p-4">
                    <div className="font-mono text-sm">
                      <div>&gt; console command: traceVariant("VAR007")</div>
                      <div className="text-dust-blue">→ QR registered. Variant leads to unstable page: /fleet/ghost</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Section 5 */}
            {activeSection >= 2 && (
              <div className="mb-16 pb-16 border-b border-gray-800">
                <h2 className="text-xl md:text-2xl mb-6 border-b border-gray-800 pb-2 font-typewriter">Section 5 – Final Lesson: Nothing Is Final</h2>
                
                <div className="space-y-6 text-lg">
                  <p>If this page ends… It's lying.</p>
                  <p>If the system says COMPLETE… You've missed something.</p>
                  
                  <div className="text-center mt-10">
                    <Button
                      onClick={handleCompleteTraining}
                      className="bg-dust-blue hover:bg-dust-blue/80 text-black px-8 py-6 text-lg"
                    >
                      Complete Training
                    </Button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Hidden text */}
            <div className="text-white text-opacity-0 hover:text-opacity-10 text-xs mt-10 transition-all select-none">
              → Use command: breakTheLoop()
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Onboarding;
