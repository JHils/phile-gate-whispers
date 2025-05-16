
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTrackingSystem } from "@/hooks/useTrackingSystem";

export default function Echo() {
  const { trackEvent } = useTrackingSystem();

  useEffect(() => {
    document.title = "Echo Chamber";
    trackEvent("page_view_echo");
    
    // Console breadcrumb
    console.log("Echo chamber accessed. Timestamp: " + new Date().toISOString());
    console.log("Use 'echo()' in the console to resonate.");
  }, [trackEvent]);

  return (
    <div className="min-h-screen bg-black text-white p-4 flex flex-col">
      <div className="max-w-3xl mx-auto w-full py-16">
        <h1 className="text-4xl md:text-6xl font-bold mb-8 text-dust-blue">Echo Chamber</h1>
        
        <div className="space-y-6 font-typewriter">
          <p className="text-xl text-dust-orange">
            Your request has been received.
          </p>
          
          <div className="my-12 p-6 border border-gray-800 bg-gray-900/50 rounded-lg">
            <p className="mb-4 text-silver">Scanning for resonance patterns...</p>
            
            <div className="my-4 font-mono text-sm text-gray-500 bg-gray-800/50 p-4 rounded overflow-auto">
              <p>{'>'} Searching gate records...</p>
              <p>{'>'} Validating access patterns...</p>
              <p>{'>'} Echo delay: calculating...</p>
              <p>{'>'} Connection established to node [REDACTED]</p>
              <p>{'>'} ...</p>
              <p>{'>'} Request logged. Awaiting gatekeeper approval.</p>
            </div>
            
            <p className="text-dust-blue italic">
              The waters are deep. The shadows, deeper still.
            </p>
          </div>
          
          <div className="mt-8">
            <p className="text-gray-400 mb-4">
              You've reached the edge of the known map.
            </p>
            
            <Link to="/gate">
              <Button variant="outline" className="border-dust-blue text-dust-blue hover:bg-dust-blue/10">
                Return to The Gate
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Hidden trigger for console clues */}
      <div 
        className="fixed bottom-4 right-4 h-4 w-4 opacity-0 cursor-default"
        onClick={() => {
          console.log("%cResonance detected. Try 'echo()' command.", "color:#0088cc;");
        }}
      />
    </div>
  );
}
