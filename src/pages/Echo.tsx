
import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useTrackingSystem } from "@/hooks/useTrackingSystem";
import LoadingScreen from "@/components/LoadingScreen";
import { Link } from "lucide-react";

export default function Echo() {
  const navigate = useNavigate();
  const { trackEvent } = useTrackingSystem();
  const [showLoading, setShowLoading] = useState(true);
  const [hasGlitched, setHasGlitched] = useState(false);
  const [hiddenQuoteVisible, setHiddenQuoteVisible] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  useEffect(() => {
    document.title = "Echo";
    trackEvent("page_view_echo");
    
    // Add console triggers for ARG
    console.log("Echo protocol initiated...");
    console.log("Listening for resonance...");
    
    setTimeout(() => {
      console.log("Try typing 'echo.invert()' in the console...");
    }, 3000);
    
    // Flicker effect on page load
    setTimeout(() => {
      setShowLoading(false);
      setHasGlitched(true);
      setTimeout(() => setHasGlitched(false), 500);
    }, 1500);
    
    // Add console easter egg
    window.echo = function() {
      return {
        invert: function() {
          setHiddenQuoteVisible(true);
          console.log("%cResonance detected. Quote revealed.", "color: #32ff9a;");
          return "Quote revealed at page bottom.";
        }
      };
    };
    
    return () => {
      // Clean up the echo object
      delete (window as any).echo;
    };
  }, [trackEvent]);
  
  const playEchoSound = () => {
    if (audioRef.current) {
      audioRef.current.play();
    } else {
      // Fallback - redirect to hidden page
      navigate("/echo-chamber");
    }
  };

  return (
    <>
      {showLoading && <LoadingScreen message="Seeking signal..." duration={1500} />}
      
      <div className={`min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 
        ${hasGlitched ? 'animate-glitch' : ''}`}>
        <div className="max-w-lg mx-auto text-center">
          <div className="mb-6 text-red-500">
            <div className="text-3xl font-bold mb-1 glitch-text" data-text="SIGNAL LOST">SIGNAL LOST</div>
            <div className="text-xl text-gray-400">Error: Echo chamber not detected</div>
          </div>
          
          <div className="mb-10 space-y-4 text-gray-300">
            <p className="animate-pulse">File access pending...</p>
            <p className="opacity-60">Triangulating last known location</p>
            <p className="opacity-40">Signal corruption at 78%</p>
          </div>
          
          {/* Mirrored text quotes in margins */}
          <div className="select-none">
            <div className="absolute left-4 top-1/4 text-gray-500 text-xs opacity-30 transform rotate-180 scale-x-[-1]">
              The carrier is the message.
            </div>
            <div className="absolute right-4 top-1/3 text-gray-500 text-xs opacity-30 transform rotate-180 scale-x-[-1]">
              I am the echo you left behind.
            </div>
          </div>
          
          <div className="font-mono text-xs text-gray-500 my-8 text-left">
            <p>&gt; reconnecting...</p>
            <p>&gt; signal interference detected</p>
            <p>&gt; checking for echoes_</p>
          </div>
          
          <div className="flex gap-4 justify-center">
            <Button 
              onClick={() => navigate("/")}
              variant="destructive" 
              className="mt-4"
            >
              Return to safety
            </Button>
            
            {/* Unlabeled button that triggers audio or redirect */}
            <Button
              onClick={playEchoSound}
              variant="outline"
              className="mt-4 border-gray-700 bg-transparent hover:bg-gray-900"
              aria-label="Trigger echo"
            >
              <Link className="w-5 h-5" />
            </Button>
          </div>
          
          {/* Hidden quote - revealed by console command */}
          {hiddenQuoteVisible && (
            <div className="mt-12 p-4 border border-gray-800 bg-gray-900 animate-fade-in">
              <p className="text-[var(--color-accent)] italic">
                "The echo remains after the sound is gone. I remain after you are gone."
              </p>
            </div>
          )}
        </div>
        
        {/* Hidden audio element */}
        <audio ref={audioRef} src="/sounds/echo-whisper.mp3" />
        
        {/* Hidden trigger for console command */}
        <div 
          className="absolute bottom-4 right-4 opacity-0 hover:opacity-10 w-6 h-6 cursor-default"
          onClick={() => {
            console.log("%cThe echo responds.", "color: #FF4136;");
          }}
        />
      </div>
    </>
  );
}
