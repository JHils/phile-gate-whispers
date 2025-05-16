
import React, { useEffect } from "react";
import { useTrackingSystem } from "@/hooks/useTrackingSystem";

export default function Echo() {
  const { trackEvent } = useTrackingSystem();

  useEffect(() => {
    document.title = "Echo | Jonah's Philes";
    trackEvent("page_view_echo");
    
    // Add breadcrumb console message
    console.log("Echo chamber activated.");
    
    // Add special effect after delay
    setTimeout(() => {
      console.log("%cListening for return signals...", "color: #607D8B; font-style: italic;");
    }, 3000);
  }, [trackEvent]);
  
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="max-w-md text-center">
        <h1 className="text-4xl font-bold mb-8 text-red-500">
          <span className="inline-block transform animate-pulse">.</span>
          <span className="inline-block transform animate-pulse delay-100">.</span>
          <span className="inline-block transform animate-pulse delay-200">.</span>
        </h1>
        
        <p className="text-lg mb-8 text-gray-300">
          Signal transmitted. Awaiting response.
        </p>
        
        <div className="border border-gray-800 p-6 rounded-lg bg-black">
          <div className="flex justify-center space-x-2 mb-4">
            {[...Array(5)].map((_, i) => (
              <div 
                key={i}
                className="h-2 w-16 bg-red-900 opacity-40 animate-pulse"
                style={{ animationDelay: `${i * 200}ms` }}
              ></div>
            ))}
          </div>
          
          <p className="text-sm text-gray-500 font-mono">
            Channel open. Monitoring frequency 121.5MHz
          </p>
        </div>
      </div>
      
      {/* Hidden breadcrumb element */}
      <div 
        className="fixed bottom-3 right-3 text-xs text-gray-800 cursor-default opacity-10 hover:opacity-30"
        onClick={() => {
          console.warn("Frequency interference detected.");
          localStorage.setItem("echoTriggered", "true");
        }}
      >
        ⬤
      </div>
    </div>
  );
}
