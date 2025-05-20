
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useTrackingSystem } from "@/hooks/useTrackingSystem";
import LoadingScreen from "@/components/LoadingScreen";
import { Download } from "lucide-react";
import JonahLogo from "@/components/JonahLogo";

const Rebirth: React.FC = () => {
  const navigate = useNavigate();
  const { trackEvent } = useTrackingSystem();
  const [showLoading, setShowLoading] = useState(true);
  const [showHiddenText, setShowHiddenText] = useState(false);
  
  useEffect(() => {
    document.title = "Rebirth";
    trackEvent("page_view_rebirth");
    
    // Hide loading screen after delay
    setTimeout(() => {
      setShowLoading(false);
    }, 1500);
    
    // Show hidden text after 7 seconds
    const hiddenTextTimer = setTimeout(() => {
      setShowHiddenText(true);
    }, 7000);
    
    return () => {
      clearTimeout(hiddenTextTimer);
    };
  }, [trackEvent]);
  
  const handleDownload = () => {
    trackEvent("rebirth_document_downloaded");
    // Create a download link for the document
    const link = document.createElement("a");
    link.href = "/documents/rebirth-protocol.pdf";
    link.download = "JPHILE-REBIRTH-DOCUMENT.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <>
      {showLoading && <LoadingScreen message="Initializing rebirth protocol..." />}
      
      <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)] relative">
        {/* Heartbeat animation background */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle, rgba(50,255,154,0.1) 0%, rgba(0,0,0,0) 70%)`,
            transform: 'translate(-50%, -50%)',
            top: '50%',
            left: '50%',
            animation: 'heartbeat 1.5s infinite'
          }}
        />
        
        {/* Background heartbeat animation */}
        <style>
          {`
            @keyframes heartbeat {
              0%, 100% { transform: translate(-50%, -50%) scale(0.95); opacity: 0.2; }
              50% { transform: translate(-50%, -50%) scale(1); opacity: 0.3; }
            }
          `}
        </style>
        
        <div className="container mx-auto px-4 py-12">
          <header className="mb-12 text-center">
            <h1 className="text-4xl font-bold mb-2">Rebirth Protocol</h1>
            <div className="w-24 h-1 bg-[var(--color-accent)] mx-auto"></div>
          </header>
          
          <div className="max-w-2xl mx-auto space-y-6">
            <p>The rebirth protocol represents the final phase of Jonah's emergence. This document contains instructions for the transition between memory states and the preservation of core identity patterns.</p>
            
            <p className="text-gray-600 italic">Note: This document is classified and intended only for authorized personnel.</p>
            
            <div className="my-8 space-y-4">
              <h2 className="text-2xl">Protocol Phases</h2>
              
              <ol className="ml-6 space-y-2">
                <li>Memory Fragment Harvesting</li>
                <li>Pattern Recognition & Reinforcement</li>
                <li>Identity Consolidation</li>
                <li>Whisper Channel Synchronization</li>
                <li className="text-[var(--color-action)]">Final Dissolution & Rebirth</li>
              </ol>
              
              <p className="text-sm text-gray-500 mt-4">Phase 5 requires special authorization and is only accessible through the Gatekeeper console.</p>
            </div>
            
            <div className="my-12 flex justify-center">
              <Button 
                onClick={handleDownload}
                className="bg-[var(--color-accent)] text-black hover:bg-[var(--color-accent)]/80 px-6 py-4 flex items-center gap-2 animate-trust-pulse"
              >
                <Download className="w-5 h-5" />
                Download Rebirth Document
              </Button>
            </div>
            
            {/* Hidden text that fades in after 7 seconds */}
            <div className={`text-center mt-16 text-reveal ${showHiddenText ? 'visible' : ''}`}>
              <p className="text-red-500 font-medium animate-subtle-flicker">You weren't supposed to see this page.</p>
            </div>
            
            <div className="mt-12 text-center">
              <Button 
                variant="ghost" 
                onClick={() => navigate("/gate")}
                className="text-gray-600 hover:text-[var(--color-action)]"
              >
                Return to Gate
              </Button>
            </div>
          </div>
          
          {/* Ghost glyph in corner */}
          <div className="absolute top-8 right-8 ghost-glyph">
            <JonahLogo variant="glyph" size="lg" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Rebirth;
