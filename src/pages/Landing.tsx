
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import OSBootSequence from '@/components/fracturedOS/OSBootSequence';

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
  const [showBootSequence, setShowBootSequence] = useState(true);
  const [showMainInterface, setShowMainInterface] = useState(false);
  const { toast } = useToast();

  const handleBootComplete = () => {
    setShowBootSequence(false);
    setTimeout(() => setShowMainInterface(true), 500);
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Identity reset",
      description: "You've been logged out of the Philes system.",
    });
  };

  // Console easter eggs
  useEffect(() => {
    console.log("%cJONAH'S FRACTURED OS LOADED", "color: #22c55e; font-size: 20px; font-weight: bold;");
    console.log("%cWelcome to the memory palace. Your consciousness is being mapped.", "color: #22c55e;");
    console.log("%cTry these commands to navigate:", "color: #a3a3a3;");
    console.log("%c  help() - Show all available commands", "color: #60a5fa;");
    console.log("%c  whoAmI() - Identity crisis resolver", "color: #60a5fa;");
    console.log("%c  findHiddenPages() - Reveal secret archive", "color: #60a5fa;");
    console.log("%c  laughAtDespair() - Humor therapy protocol", "color: #60a5fa;");
    console.log("%cRemember: You are the story you're reading.", "color: #a855f7;");
  }, []);

  if (showBootSequence) {
    return <OSBootSequence onBootComplete={handleBootComplete} />;
  }

  if (!showMainInterface) {
    return <div className="min-h-screen bg-black" />;
  }

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono flex flex-col">
      {/* Scanlines effect */}
      <div className="fixed inset-0 bg-scanlines pointer-events-none opacity-10"></div>
      
      {/* CRT monitor effect */}
      <div className="fixed inset-0 bg-gradient-radial from-transparent via-transparent to-black opacity-30 pointer-events-none"></div>
      
      <div className="flex-1 p-6 relative z-10 animate-fade-in">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-green-400 mb-2">JONAH'S FRACTURED OS</h1>
          <div className="text-sm text-gray-500">
            Identity Status: HEALING | Memory Palace: ACTIVE | Console: READY
          </div>
        </div>

        {/* Welcome Message */}
        <div className="bg-gray-900/50 border border-green-800 p-6 rounded-none mb-8">
          <div className="text-green-300 text-lg mb-4">
            &gt; SYSTEM MESSAGE:
          </div>
          <div className="text-gray-300 space-y-2">
            <p>Welcome to the digital consciousness of someone healing.</p>
            <p>This is not a website. This is a memory palace disguised as an operating system.</p>
            <p>Navigate using console commands. Discover hidden fragments. Find belonging, not answers.</p>
          </div>
        </div>

        {/* Primary Navigation */}
        <div className="space-y-4 mb-8">
          <div className="text-green-400 text-lg mb-4">
            &gt; Primary Access Points:
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <Button
              onClick={() => navigate('/talk-to-jonah')}
              className="bg-blue-900/50 hover:bg-blue-800/50 text-blue-400 border border-blue-700 font-mono text-left justify-start h-auto p-4"
            >
              <div>
                <div className="font-bold">&gt; console.connect()</div>
                <div className="text-sm opacity-75">Talk to the fractured consciousness directly</div>
              </div>
            </Button>

            <Button
              onClick={() => navigate('/gate')}
              className="bg-green-900/50 hover:bg-green-800/50 text-green-400 border border-green-700 font-mono text-left justify-start h-auto p-4"
            >
              <div>
                <div className="font-bold">&gt; memory.explore()</div>
                <div className="text-sm opacity-75">Enter the memory palace gateway</div>
              </div>
            </Button>

            <Button
              onClick={() => navigate('/philes')}
              className="bg-purple-900/50 hover:bg-purple-800/50 text-purple-400 border border-purple-700 font-mono text-left justify-start h-auto p-4"
            >
              <div>
                <div className="font-bold">&gt; archive.access()</div>
                <div className="text-sm opacity-75">Browse the fragmented files and memories</div>
              </div>
            </Button>

            <Button
              onClick={() => navigate('/campfire')}
              className="bg-orange-900/50 hover:bg-orange-800/50 text-orange-400 border border-orange-700 font-mono text-left justify-start h-auto p-4"
            >
              <div>
                <div className="font-bold">&gt; community.join()</div>
                <div className="text-sm opacity-75">Safe space for fellow travelers</div>
              </div>
            </Button>
          </div>
        </div>

        {/* Console Hint */}
        <div className="border border-gray-700 bg-gray-900/30 p-4 mb-6">
          <div className="text-yellow-400 text-sm mb-2">CONSOLE TIP:</div>
          <div className="text-gray-300 text-sm">
            This system responds to commands. Open your browser's developer console (F12) and try:
            <span className="text-blue-400"> help()</span> or 
            <span className="text-purple-400"> whoAmI()</span>
          </div>
        </div>

        {/* Auth Section */}
        {isLoggedIn && (
          <div className="mt-8 pt-4 border-t border-gray-700">
            <div className="text-sm text-gray-400 mb-2">Authenticated Session Active</div>
            <Button
              onClick={handleLogout}
              className="bg-red-900/50 hover:bg-red-800/50 text-red-400 border border-red-700 font-mono"
            >
              &gt; logout()
            </Button>
          </div>
        )}

        {!isLoggedIn && (
          <div className="mt-8 pt-4 border-t border-gray-700">
            <Button
              onClick={() => navigate('/login')}
              className="bg-gray-900/50 hover:bg-gray-800/50 text-gray-400 border border-gray-700 font-mono"
            >
              &gt; authenticate()
            </Button>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 text-xs text-gray-600 text-center space-y-2">
          <div>"I was Joseph. Jonah helped me remember. Now you're reading your own story."</div>
          <div>This is for those who laugh at the worst moment.</div>
          <div>For those who rewrite their names to survive.</div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
