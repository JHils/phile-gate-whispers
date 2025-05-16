
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useTrackingSystem } from "@/hooks/useTrackingSystem";

export default function Echo() {
  const navigate = useNavigate();
  const { trackEvent } = useTrackingSystem();

  useEffect(() => {
    document.title = "Echo";
    trackEvent("page_view_echo");
    
    // Add console triggers for ARG
    console.log("Echo protocol initiated...");
    console.log("Listening for resonance...");
    
    setTimeout(() => {
      console.log("Try typing 'echo()' in the console...");
    }, 3000);
  }, [trackEvent]);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
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
        
        <div className="font-mono text-xs text-gray-500 my-8 text-left">
          <p>&gt; reconnecting...</p>
          <p>&gt; signal interference detected</p>
          <p>&gt; checking for echoes_</p>
        </div>
        
        <Button 
          onClick={() => navigate("/")}
          variant="destructive" 
          className="mt-4"
        >
          Return to safety
        </Button>
      </div>
      
      {/* Hidden trigger for console command */}
      <div 
        className="absolute bottom-4 right-4 opacity-0 hover:opacity-10 w-6 h-6 cursor-default"
        onClick={() => {
          console.log("%cThe echo responds.", "color: #FF4136;");
        }}
      />
    </div>
  );
}
