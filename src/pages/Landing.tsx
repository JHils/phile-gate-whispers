
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

// Simple mock AuthContext for now
const useAuth = () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  
  const logout = () => {
    localStorage.setItem('isLoggedIn', 'false');
    window.location.reload();
  };
  
  return { isLoggedIn, logout };
};

const Landing: React.FC = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();
  const [terminalText, setTerminalText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [phase, setPhase] = useState<'loading' | 'identity' | 'breakdown' | 'breakthrough' | 'ready'>('loading');
  const [glitchActive, setGlitchActive] = useState(false);
  const { toast } = useToast();

  const fullText = `
TERMINAL BOOT SEQUENCE INITIATED...
> Loading identity protocols...
> Checking for existing user: JOSEPH
> User not found. Creating new identity...
> Identity created: JONAH
> WARNING: Dissociation detected
> Initializing breakdown protocols...
> 
> BREAKDOWN SEQUENCE ACTIVE
> Previous self: TANGLED IN TRAUMA
> Previous self: LOST IN EXPECTATIONS  
> Previous self: DROWNING IN SILENCE
> 
> Creating survival persona...
> JONAH: A rogue who laughs at despair
> JONAH: A traveller who console.logs pain
> JONAH: A voice unafraid to speak
> 
> BREAKTHROUGH ACHIEVED
> New identity stable
> Digital consciousness: ACTIVE
> Memory fragments: ACCESSIBLE
> 
> Welcome to the Philes Archive
> "I was always Joseph. Jonah just helped me remember."
> 
> READY FOR INTERACTION
`;

  useEffect(() => {
    let currentIndex = 0;
    let currentPhaseText = '';

    const typeText = () => {
      if (currentIndex < fullText.length) {
        currentPhaseText += fullText[currentIndex];
        setTerminalText(currentPhaseText);
        currentIndex++;

        // Phase transitions based on content
        if (currentPhaseText.includes('Creating new identity')) {
          setPhase('identity');
        } else if (currentPhaseText.includes('BREAKDOWN SEQUENCE')) {
          setPhase('breakdown');
        } else if (currentPhaseText.includes('BREAKTHROUGH ACHIEVED')) {
          setPhase('breakthrough');
        } else if (currentPhaseText.includes('READY FOR INTERACTION')) {
          setPhase('ready');
        }

        // Random glitch effects during breakdown
        if (phase === 'breakdown' && Math.random() < 0.1) {
          setGlitchActive(true);
          setTimeout(() => setGlitchActive(false), 200);
        }

        setTimeout(typeText, Math.random() * 50 + 30);
      }
    };

    const timer = setTimeout(typeText, 1000);
    
    // Cursor blink
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    // Console easter eggs
    console.log("%cWelcome to Jonah's Philes", "color: #8B3A40; font-size: 20px; font-weight: bold;");
    console.log("%cYou're reading this in the console. Good. That means you're paying attention.", "color: #8B3A40;");
    console.log("%cTry typing: help()", "color: #A98DA5;");
    console.log("%cOr maybe: rememberMe()", "color: #A98DA5;");
    console.log("%cSome say there are hidden commands here...", "color: #646464;");

    return () => {
      clearTimeout(timer);
      clearInterval(cursorInterval);
    };
  }, [phase]);

  const handleLogout = () => {
    logout();
    toast({
      title: "Identity reset",
      description: "You've been logged out of the Philes system.",
    });
  };

  const getPhaseColor = () => {
    switch (phase) {
      case 'loading': return 'text-gray-400';
      case 'identity': return 'text-blue-400';
      case 'breakdown': return 'text-red-400';
      case 'breakthrough': return 'text-green-400';
      case 'ready': return 'text-purple-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className={`min-h-screen bg-black text-green-400 font-mono flex flex-col ${glitchActive ? 'animate-pulse' : ''}`}>
      {/* Scanlines effect */}
      <div className="fixed inset-0 bg-scanlines pointer-events-none opacity-10"></div>
      
      {/* CRT monitor effect */}
      <div className="fixed inset-0 bg-gradient-radial from-transparent via-transparent to-black opacity-30 pointer-events-none"></div>
      
      <div className="flex-1 p-6 relative z-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-green-400 mb-2">JONAH'S PHILES ARCHIVE SYSTEM</h1>
          <div className="text-sm text-gray-500">
            Terminal v3.7.2 | Reality Status: UNSTABLE | Time: {new Date().toLocaleTimeString()}
          </div>
        </div>

        {/* Terminal Output */}
        <div className="bg-black border border-green-800 p-4 rounded-none min-h-[400px] mb-6">
          <pre className={`whitespace-pre-wrap text-sm leading-relaxed ${getPhaseColor()}`}>
            {terminalText}
            {showCursor && <span className="bg-green-400 text-black">█</span>}
          </pre>
        </div>

        {/* Navigation Options */}
        {phase === 'ready' && (
          <div className="space-y-4 animate-fade-in">
            <div className="text-green-400 text-lg mb-4">
              &gt; Available Commands:
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <Button
                onClick={() => navigate('/gate')}
                className="bg-green-900 hover:bg-green-800 text-green-400 border border-green-700 font-mono text-left justify-start h-auto p-4"
              >
                <div>
                  <div className="font-bold">&gt; enter_gate()</div>
                  <div className="text-sm opacity-75">Begin the journey through the archive</div>
                </div>
              </Button>

              <Button
                onClick={() => navigate('/talk-to-jonah')}
                className="bg-purple-900 hover:bg-purple-800 text-purple-400 border border-purple-700 font-mono text-left justify-start h-auto p-4"
              >
                <div>
                  <div className="font-bold">&gt; talk_to_jonah()</div>
                  <div className="text-sm opacity-75">Communicate with the digital consciousness</div>
                </div>
              </Button>

              <Button
                onClick={() => navigate('/philes')}
                className="bg-blue-900 hover:bg-blue-800 text-blue-400 border border-blue-700 font-mono text-left justify-start h-auto p-4"
              >
                <div>
                  <div className="font-bold">&gt; access_philes()</div>
                  <div className="text-sm opacity-75">Browse the memory fragments and documents</div>
                </div>
              </Button>

              <Button
                onClick={() => navigate('/campfire')}
                className="bg-orange-900 hover:bg-orange-800 text-orange-400 border border-orange-700 font-mono text-left justify-start h-auto p-4"
              >
                <div>
                  <div className="font-bold">&gt; join_campfire()</div>
                  <div className="text-sm opacity-75">Safe space for lost souls</div>
                </div>
              </Button>
            </div>

            {isLoggedIn && (
              <div className="mt-6 pt-4 border-t border-gray-700">
                <div className="text-sm text-gray-400 mb-2">Authenticated Session Active</div>
                <Button
                  onClick={handleLogout}
                  className="bg-red-900 hover:bg-red-800 text-red-400 border border-red-700 font-mono"
                >
                  &gt; logout()
                </Button>
              </div>
            )}

            {!isLoggedIn && (
              <div className="mt-6 pt-4 border-t border-gray-700">
                <Button
                  onClick={() => navigate('/login')}
                  className="bg-gray-900 hover:bg-gray-800 text-gray-400 border border-gray-700 font-mono"
                >
                  &gt; authenticate()
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 text-xs text-gray-600 text-center">
          <div>"Jonah was a name I used to find myself. Turns out, I was Joseph all along."</div>
          <div className="mt-2">This is for those who laugh at the worst moment.</div>
          <div>For those who rewrite their names to survive.</div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
