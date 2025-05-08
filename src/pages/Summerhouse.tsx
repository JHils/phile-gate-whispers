
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTrackingSystem } from '@/hooks/useTrackingSystem';
import { useConsoleMessages } from '@/hooks/useConsoleMessages';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import TextGlitch from '@/components/TextGlitch';

const Summerhouse = () => {
  const { trackEvent, userState } = useTrackingSystem();
  const { showConsoleMessages } = useConsoleMessages({ 
    storageKey: 'summerhouse_console_messages',
    userState
  });
  
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [currentRule, setCurrentRule] = useState(0);
  const [glitchActive, setGlitchActive] = useState(false);
  
  // Hostel rules that will rotate and occasionally show horror messages
  const hostelRules = [
    "No noise after 10PM",
    "No cooking meat after sunset",
    "No unsanctioned laughter",
    "Break a rule, lose a passport",
    "All windows must remain closed",
    "Report suspicious activity",
    "No eye contact with staff",
    "Always flush twice"
  ];
  
  const horrorMessages = [
    "The DidgeriPOO watches.",
    "Don't think about leaving.",
    "He sees Four Cheeks in the dark.",
    "Room 7 doesn't exist. Stop asking.",
    "The ceiling isn't real.",
    "Someone's counting your breaths."
  ];

  // Follow cursor for passport scanner effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
      
      // Random chance to trigger a scan
      if (Math.random() < 0.05 && !isScanning) {
        setIsScanning(true);
        setScanProgress(0);
        
        const scanInterval = setInterval(() => {
          setScanProgress(prev => {
            if (prev >= 100) {
              clearInterval(scanInterval);
              setIsScanning(false);
              return 0;
            }
            return prev + 5;
          });
        }, 50);
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isScanning]);
  
  // Rotate rules with occasional horror message
  useEffect(() => {
    const ruleInterval = setInterval(() => {
      // 20% chance to show a horror message instead of a rule
      if (Math.random() < 0.2) {
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 300);
        
        const randomHorror = Math.floor(Math.random() * horrorMessages.length);
        setCurrentRule(-1 - randomHorror); // Negative index indicates horror message
      } else {
        const nextRule = (currentRule + 1) % hostelRules.length;
        setCurrentRule(nextRule);
      }
    }, 4000); // Change every 4 seconds
    
    return () => clearInterval(ruleInterval);
  }, [currentRule]);
  
  // Add random screen glitches
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() < 0.3) { // 30% chance every interval
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 150 + Math.random() * 300);
      }
    }, 10000 + Math.random() * 10000); // Random interval between 10-20 seconds
    
    return () => clearInterval(glitchInterval);
  }, []);
  
  // Track page visit
  useEffect(() => {
    trackEvent('visited_summerhouse');
    showConsoleMessages();
  }, [trackEvent, showConsoleMessages]);
  
  // Get current rule or horror message text
  const getCurrentRuleText = () => {
    if (currentRule < 0) {
      // Show horror message
      const horrorIndex = Math.abs(currentRule) - 1;
      return horrorMessages[horrorIndex] || horrorMessages[0];
    } else {
      // Show regular rule
      return hostelRules[currentRule];
    }
  };

  // Custom cursor style
  const cursorStyle = {
    cursor: 'none'
  };

  return (
    <div 
      className="min-h-screen bg-[#2E2E2E] text-white font-sans relative overflow-hidden"
      style={cursorStyle}
    >
      {/* Custom cursor */}
      <div 
        className={`fixed w-8 h-8 pointer-events-none z-50 ${isScanning ? 'text-red-500' : 'text-white'}`}
        style={{ 
          left: `${cursorPosition.x}px`, 
          top: `${cursorPosition.y}px`,
          transform: 'translate(-50%, -50%)'
        }}
      >
        📄
        {isScanning && (
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-20">
            <div className="h-1 bg-red-500 rounded">
              <div 
                className="h-1 bg-white rounded transition-all duration-100"
                style={{ width: `${scanProgress}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
      
      {/* VHS/Glitch overlay */}
      <div 
        className={`fixed inset-0 bg-noise pointer-events-none z-30 static-overlay opacity-10 ${
          glitchActive ? 'after:bg-red-500/20' : ''
        }`}
      ></div>
      
      {/* Mold texture overlay */}
      <div className="fixed inset-0 bg-opacity-20 pointer-events-none z-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii4wNSIgbnVtT2N0YXZlcz0iMiIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ibWF0cml4IiB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAuMSAwIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI2EpIi8+PC9zdmc+')]"></div>
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Header */}
        <header className="text-center mb-16 pt-8 relative">
          <h1 className="text-4xl md:text-6xl uppercase font-bold tracking-wider animate-text-shake">
            WELCOME TO SUMMERHOUSE
          </h1>
          <div className="mt-4">
            <TextGlitch 
              originalText="Your stay has been recorded." 
              glitchText="Your escape has been prevented."
              className="text-xl tracking-wide opacity-80"
            />
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Rulebook Section */}
          <section className="bg-black/30 p-6 border border-gray-700 relative">
            <h2 className="uppercase tracking-wider text-2xl mb-6 font-bold text-dust-orange">HOSTEL RULEBOOK</h2>
            <div className="h-40 flex items-center justify-center">
              <p className={`text-xl uppercase transition-all duration-300 ${
                currentRule < 0 ? 'text-red-400' : 'text-white'
              } ${glitchActive ? 'animate-text-glitch' : ''}`}>
                {getCurrentRuleText()}
              </p>
            </div>
            <div className="absolute bottom-2 right-2 text-xs opacity-50">
              Last updated: NEVER
            </div>
          </section>

          {/* Passport Scan Panel */}
          <section className="bg-black/30 p-6 border border-red-900/30">
            <h2 className="uppercase tracking-wider text-2xl mb-6 font-bold text-dust-red">PASSPORT SCAN</h2>
            <div className="space-y-4 font-mono text-sm">
              <div className="flex justify-between">
                <span>Name:</span>
                <span className="text-dust-orange">Jonah S. Phile</span>
              </div>
              <div className="flex justify-between">
                <span>Status:</span>
                <span className="text-red-500 animate-pulse">RED-FLAGGED</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Passport photo:</span>
                <div className="w-16 h-16 bg-gray-700 flex items-center justify-center">
                  <span className="text-red-500 animate-text-glitch">[GLITCHED]</span>
                </div>
              </div>
              <div className="flex justify-between">
                <span>Facial recognition:</span>
                <span className="text-red-500 uppercase">FAILED</span>
              </div>
              <div className="flex justify-between">
                <span>Alert sent to:</span>
                <span>Queensland Surveillance Registry</span>
              </div>
              <div className="flex justify-end mt-4">
                <button className="px-4 py-1 bg-gray-700 text-gray-400 opacity-50 cursor-not-allowed hover:opacity-60 transition-opacity">
                  [Undo]
                </button>
              </div>
            </div>
          </section>
        </div>
        
        {/* Refund Status Bar */}
        <section className="bg-black/30 p-6 border border-gray-700 mb-8">
          <h2 className="uppercase tracking-wider text-2xl mb-6 font-bold text-dust-blue">REFUND STATUS</h2>
          <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
            <div className="h-full bg-dust-blue animate-pulse" style={{ width: '97%' }}></div>
          </div>
          <p className="mt-4 text-center font-mono">
            Booking.com refund in progress... <span className="animate-pulse">Loading...</span>
          </p>
        </section>
        
        {/* Back to Gate link */}
        <div className="text-center mt-12">
          <Link to="/gate" className="text-dust-orange hover:text-dust-red transition-colors text-sm">
            &lt; Return to Gate
          </Link>
        </div>
      </div>
      
      {/* Hidden elements */}
      <div className="hidden">
        <p>The walls aren't soundproof.</p>
        <p>Room 7 was sealed for a reason.</p>
        <p>The manager is always listening.</p>
      </div>
    </div>
  );
};

export default Summerhouse;
