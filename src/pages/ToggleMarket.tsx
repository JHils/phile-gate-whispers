
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTrackingSystem } from "@/hooks/useTrackingSystem";
import LoadingScreen from "@/components/LoadingScreen";
import { Button } from "@/components/ui/button";

const ToggleMarket: React.FC = () => {
  const navigate = useNavigate();
  const { trackEvent } = useTrackingSystem();
  const [showLoading, setShowLoading] = useState(true);
  
  useEffect(() => {
    document.title = "Toggle Market";
    trackEvent("visited_toggle_market");
    
    // Hide loading screen after delay
    setTimeout(() => {
      setShowLoading(false);
    }, 1500);
    
    // Initialize market console command
    (window as any).market = {
      reopen: function() {
        console.log("%cMarket systems rebooted. Hidden inventory unlocked.", "color: var(--color-accent);");
        // Reveal secret item or navigate to vault
        navigate("/vault");
        return "ACCESS GRANTED: vault credentials accepted";
      }
    };
    
    return () => {
      // Clean up market object
      delete (window as any).market;
    };
  }, [trackEvent, navigate]);
  
  return (
    <>
      {showLoading && <LoadingScreen message="Accessing black market..." />}
    
      <div 
        className="min-h-screen bg-black text-gray-300 py-12 px-4"
        style={{ 
          backgroundImage: "url('/lovable-uploads/f33548f9-832f-426f-ac18-a6dbbcc8c1b3.png')", 
          backgroundSize: "400px",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundBlendMode: "overlay",
          backgroundColor: "#050505"
        }}
      >
        <div className="max-w-xl mx-auto">
          <header className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-[var(--color-action)]">
              TOGGLE MARKET
            </h1>
            <p className="text-sm text-gray-500">
              <span className="animate-pulse">●</span> System offline <span className="animate-pulse">●</span>
            </p>
          </header>
          
          <div className="bg-gray-900/50 border border-gray-800 p-6 rounded-md mb-8">
            <p className="text-sm text-gray-400 mb-6">
              Access restricted. Market deactivated following breach event #3721. Authorization required for inventory access.
            </p>
            
            <div className="border-t border-gray-800 mb-6 pt-6">
              <h2 className="text-xl mb-4 text-[var(--color-console)]">Available Inventory</h2>
              
              <ul className="space-y-4">
                <li className="flex justify-between items-center py-2 border-b border-gray-800/50 line-through text-gray-600 relative overflow-hidden">
                  <span>Buy time fragment</span>
                  <span className="text-dust-red">7,000</span>
                  <div className="absolute inset-0 bg-red-900/10 animate-glitch-flicker"></div>
                </li>
                
                <li className="flex justify-between items-center py-2 border-b border-gray-800/50 line-through text-gray-600 relative overflow-hidden">
                  <span>Unlock memory cell</span>
                  <span className="text-dust-red">12,500</span>
                  <div className="absolute inset-0 bg-red-900/10 animate-glitch-flicker"></div>
                </li>
                
                <li className="flex justify-between items-center py-2 border-b border-gray-800/50">
                  <span>Whisper pass <span className="text-xs text-gray-500">(one use)</span></span>
                  <span className="text-[var(--color-accent)]">3,000</span>
                </li>
                
                <li className="flex justify-between items-center py-2 border-b border-gray-800/50">
                  <span>Reality fabric patch</span>
                  <span className="text-[var(--color-accent)]">9,000</span>
                </li>
                
                <li className="flex justify-between items-center py-2 border-b border-gray-800/50">
                  <span>Temporal anchor <span className="text-xs text-gray-500">(damaged)</span></span>
                  <span className="text-[var(--color-accent)]">5,500</span>
                </li>
                
                <li className="flex justify-between items-center py-2 border-b border-gray-800/50 opacity-40">
                  <span>??? ??????? ???</span>
                  <span>???</span>
                </li>
              </ul>
            </div>
            
            <div className="text-center">
              <p className="text-xs text-gray-500 mb-4">Type market.reopen(); in the console to restore market functionality.</p>
              <Button 
                className="bg-gray-800 hover:bg-gray-700 text-gray-400"
                variant="ghost"
                disabled
              >
                MARKET CLOSED
              </Button>
            </div>
          </div>
          
          {/* Warning/error message */}
          <div className="text-center text-red-500/70 text-xs animate-subtle-flicker mb-8">
            WARNING: Unauthorized access detected. Session being traced.
          </div>
          
          <div className="text-center">
            <Button
              onClick={() => navigate("/gate")}
              variant="ghost"
              className="text-gray-500 hover:text-white"
            >
              Exit Market
            </Button>
          </div>
        </div>
        
        {/* Hidden footer easter egg that types into console */}
        <div 
          className="fixed bottom-0 left-0 w-full h-6 opacity-5 hover:opacity-10 cursor-default"
          onClick={() => {
            console.log("%cHe's watching.", "color: var(--color-action);");
          }}
        />
      </div>
    </>
  );
};

export default ToggleMarket;
