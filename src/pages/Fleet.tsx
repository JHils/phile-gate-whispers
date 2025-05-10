
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTrackingSystem } from "../hooks/useTrackingSystem";
import { useConsoleMessages } from "../hooks/useConsoleMessages";

const Fleet = () => {
  const { userState, trackEvent } = useTrackingSystem();
  const { showConsoleMessages } = useConsoleMessages({ 
    storageKey: 'fleet_page_shown',
    userState 
  });

  // Generate random boat positions
  const [boats, setBoats] = useState<Array<{id: number; x: number; y: number; blinking: boolean}>>([]);
  const [unknownBoat, setUnknownBoat] = useState<{x: number; y: number; progress: number}>({ x: 85, y: 30, progress: 0 });
  const [jonahBoat, setJonahBoat] = useState<{x: number; y: number}>({ x: 50, y: 70 });
  const [showWhisper, setShowWhisper] = useState(false);

  useEffect(() => {
    // Track page visit
    trackEvent('visited_fleet');
    
    // Show console messages
    showConsoleMessages();
    
    // Console warning for the Fleet page
    console.log("%cTracking signal activated. The Fleet is aware.", "color: #8B3A40; font-size:14px;");
    
    setTimeout(() => {
      console.log("%cTry fleetSeenYou() to acknowledge detection.", "color: #475B74; font-size:14px;");
    }, 3000);
    
    // Generate 20-25 random boat positions
    const boatCount = Math.floor(Math.random() * 6) + 20;
    const newBoats = [];
    
    for (let i = 0; i < boatCount; i++) {
      newBoats.push({
        id: i,
        x: Math.random() * 90 + 5, // 5% to 95% of width
        y: Math.random() * 90 + 5, // 5% to 95% of height
        blinking: Math.random() > 0.7 // 30% chance to blink
      });
    }
    
    setBoats(newBoats);
    
    // Move the unknown boat slowly toward Jonah's position
    const moveInterval = setInterval(() => {
      setUnknownBoat(prev => {
        // Calculate direction vector toward Jonah
        const dx = jonahBoat.x - prev.x;
        const dy = jonahBoat.y - prev.y;
        const distance = Math.sqrt(dx*dx + dy*dy);
        
        // If very close, stop moving
        if (distance < 3) {
          clearInterval(moveInterval);
          setTimeout(() => setShowWhisper(true), 3000);
          return prev;
        }
        
        // Normalize and move slowly toward Jonah
        const speed = 0.2;
        return { 
          x: prev.x + (dx / distance) * speed, 
          y: prev.y + (dy / distance) * speed,
          progress: prev.progress + (speed / distance) * 100
        };
      });
    }, 1000);
    
    return () => {
      clearInterval(moveInterval);
    };
  }, [trackEvent, showConsoleMessages]);
  
  return (
    <div className="min-h-screen bg-slate-900 font-typewriter overflow-hidden flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-6xl h-[80vh] bg-slate-800 border border-slate-600 rounded-lg shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/asfalt-light.png')] opacity-20"></div>
        
        {/* Water texture */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/40 to-blue-800/60"></div>
        
        <h1 className="text-2xl md:text-3xl text-slate-200 p-4 relative z-10 flex items-center justify-between">
          <span>FLEET TRACKING SYSTEM</span>
          <span className="text-sm text-green-400 animate-pulse">LIVE</span>
        </h1>
        
        <div className="absolute top-16 right-4 bg-slate-800/80 border border-slate-600 p-2 rounded z-10">
          <div className="flex items-center gap-3 text-sm">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-slate-300">Active</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-slate-300">You</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-yellow-500 animate-pulse"></div>
              <span className="text-slate-300">Unknown</span>
            </div>
          </div>
        </div>
        
        {/* Render the boats */}
        {boats.map(boat => (
          <div 
            key={boat.id}
            className={`absolute w-2 h-2 rounded-full bg-green-500 ${boat.blinking ? 'animate-pulse' : ''}`}
            style={{ 
              left: `${boat.x}%`, 
              top: `${boat.y}%`,
              boxShadow: '0 0 5px rgba(74, 222, 128, 0.7)'
            }}
          ></div>
        ))}
        
        {/* Jonah's boat (RED) */}
        <div 
          className="absolute w-3 h-3 rounded-full bg-red-500"
          style={{ 
            left: `${jonahBoat.x}%`, 
            top: `${jonahBoat.y}%`,
            boxShadow: '0 0 8px rgba(239, 68, 68, 0.9)'
          }}
        ></div>
        <div 
          className="absolute text-xs text-red-300"
          style={{ 
            left: `${jonahBoat.x + 1}%`, 
            top: `${jonahBoat.y + 1.5}%`
          }}
        >
          YOU
        </div>
        
        {/* Unknown boat (YELLOW) */}
        <div 
          className="absolute w-3 h-3 rounded-full bg-yellow-500 animate-pulse"
          style={{ 
            left: `${unknownBoat.x}%`, 
            top: `${unknownBoat.y}%`,
            boxShadow: '0 0 8px rgba(234, 179, 8, 0.9)',
            transition: 'all 1s ease-in-out'
          }}
        ></div>
        <div 
          className="absolute text-xs text-yellow-300"
          style={{ 
            left: `${unknownBoat.x + 1}%`, 
            top: `${unknownBoat.y + 1.5}%`,
            transition: 'all 1s ease-in-out'
          }}
        >
          ???
        </div>
        
        {/* Progress indicator for unknown boat */}
        <div className="absolute bottom-4 left-4 right-4 bg-slate-700/50 h-2 rounded-full overflow-hidden z-10">
          <div 
            className="h-full bg-yellow-500/70"
            style={{ width: `${unknownBoat.progress}%` }}
          ></div>
        </div>
        
        {/* Whisper overlay */}
        {showWhisper && (
          <div 
            className="absolute inset-0 flex items-center justify-center bg-black/60 z-20 transition-opacity duration-1000"
            onClick={() => setShowWhisper(false)}
          >
            <p className="text-xl md:text-3xl text-yellow-50/90 font-serif max-w-lg text-center p-8">
              You took the photo. You invited them.
            </p>
          </div>
        )}
        
        {/* Back button */}
        <div className="absolute bottom-16 left-4 z-10">
          <Link to="/gate">
            <Button variant="ghost" className="text-slate-300 hover:text-slate-100 hover:bg-slate-700/50">
              Return to Gate
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Fleet;
