
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTrackingSystem } from "@/hooks/useTrackingSystem";
import { glitchEffectLog, speak } from "@/utils/consoleEffects";

const ReEntry: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [variantId, setVariantId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [destination, setDestination] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { trackEvent, userState } = useTrackingSystem();
  
  useEffect(() => {
    trackEvent('visited_re_entry');
    
    // Parse URL parameters
    const params = new URLSearchParams(location.search);
    const code = params.get('code');
    
    setIsLoading(true);
    
    // Process the QR code variant
    if (code) {
      setVariantId(code);
      processQRVariant(code);
    } else {
      setMessage("No QR code variant provided. Invalid entry point.");
      setIsLoading(false);
    }
    
    // Attempt to trigger Simba comment
    setTimeout(() => {
      if (typeof window.triggerSimbaComment === 'function') {
        window.triggerSimbaComment('re-entry');
      }
    }, 3000);
    
    // Log this entry in console
    if (typeof glitchEffectLog === 'function') {
      glitchEffectLog(`QR entry point accessed. Variant processing...`);
    }
  }, [location, trackEvent]);

  // Process different QR variants
  const processQRVariant = (code: string) => {
    // Record the variant encounter
    const encounteredVariants = JSON.parse(localStorage.getItem('encounteredQRVariants') || '[]');
    if (!encounteredVariants.includes(code)) {
      encounteredVariants.push(code);
      localStorage.setItem('encounteredQRVariants', JSON.stringify(encounteredVariants));
      
      // Increase score if this is a new variant
      if (window.JonahConsole) {
        window.JonahConsole.score += 25;
      }
    }
    
    // Map variant codes to destinations and messages
    const variantMap: Record<string, { destination: string, message: string }> = {
      // Standard variants
      'B1RDL0AF': { 
        destination: '/campfire', 
        message: 'QR Variant: Bird Loaf. Redirecting to Campfire...' 
      },
      'SH4D0W5': { 
        destination: '/monster', 
        message: 'QR Variant: Shadows. Redirecting to The Monster...' 
      },
      'TR4V3L3R': { 
        destination: '/outbackhostel', 
        message: 'QR Variant: Traveler. Redirecting to Outback Hostel...' 
      },
      'G4T3': { 
        destination: '/gate', 
        message: 'QR Variant: Gate. Redirecting to The Gate...' 
      },
      'W4TCH3R': { 
        destination: '/govwatch', 
        message: 'QR Variant: Watcher. Redirecting to GovWatch...' 
      },
      'D15T0RT': { 
        destination: '/distortions', 
        message: 'QR Variant: Distort. Redirecting to Distortions Log...' 
      },
      'SM1BA': { 
        destination: '/distortions', 
        message: 'QR Variant: Simba. Accessing Simba\'s archives...' 
      },
      
      // Secret variants that only work during special times
      'T1M3SH1FT': { 
        destination: '/rebirth', 
        message: 'QR Variant: TimeShift. This is only accessible during specific hours...' 
      }
    };
    
    // Check if this is a time-sensitive variant
    const isTimeVariant = code === 'T1M3SH1FT';
    const isSpecialTime = typeof window.isSpecialTimeWindow === 'function' ? 
      window.isSpecialTimeWindow() : false;
    
    // Handle the variant
    const variant = variantMap[code];
    
    if (variant) {
      // For time-sensitive variants, check if it's the right time
      if (isTimeVariant && !isSpecialTime) {
        setMessage("This QR variant only works during special time windows (3:36 AM, 6:11 AM/PM, 12:00 AM).");
        setDestination(null);
        
        // Log the attempt
        if (typeof glitchEffectLog === 'function') {
          glitchEffectLog('Time window mismatch. QR variant locked.');
          speak('Time window mismatch');
        }
      } else {
        setMessage(variant.message);
        setDestination(variant.destination);
        
        // Auto-redirect after delay
        setTimeout(() => {
          navigate(variant.destination);
        }, 5000);
      }
    } else {
      setMessage(`Unknown QR variant: ${code}. Possible corruption or experimental code.`);
      setDestination(null);
      
      // Log the unknown variant
      if (typeof glitchEffectLog === 'function') {
        glitchEffectLog('Unknown QR variant detected. Possible breach.');
        speak('Unknown QR variant detected');
      }
      
      // Special case - if it looks like a valid format but isn't recognized,
      // record it as a "corrupted" variant
      if (/^[A-Z0-9]{5,8}$/.test(code)) {
        const corruptedVariants = JSON.parse(localStorage.getItem('corruptedQRVariants') || '[]');
        if (!corruptedVariants.includes(code)) {
          corruptedVariants.push(code);
          localStorage.setItem('corruptedQRVariants', JSON.stringify(corruptedVariants));
        }
      }
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 bg-cover bg-center" 
         style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?auto=format&fit=crop&q=80&w=1600&ixlib=rb-4.0.3')" }}>
      <div className="max-w-lg w-full bg-gray-900/80 p-8 rounded-lg border border-dust-blue/30 shadow-lg">
        <h1 className="text-3xl font-serif mb-6 text-phile-light text-center">QR Re-Entry Point</h1>
        
        {isLoading ? (
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="w-12 h-12 border-t-2 border-dust-blue animate-spin rounded-full"></div>
            <p className="text-dust-orange font-typewriter">Processing QR variant...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {variantId && (
              <div className="bg-gray-800/60 p-3 rounded">
                <p className="text-silver font-mono text-sm">Variant ID: {variantId}</p>
              </div>
            )}
            
            <p className="text-center text-dust-orange font-typewriter animate-pulse">{message}</p>
            
            {destination ? (
              <div className="text-center space-y-4">
                <p className="text-silver text-sm">Redirecting in 5 seconds...</p>
                <Button 
                  onClick={() => navigate(destination)} 
                  className="bg-black/50 hover:bg-black/70 text-silver hover:text-phile-light border border-dust-blue/30"
                >
                  Go Now
                </Button>
              </div>
            ) : (
              <div className="text-center space-y-4">
                <p className="text-silver text-sm">Unable to process this QR variant.</p>
                <Button 
                  onClick={() => navigate('/gate')} 
                  className="bg-black/50 hover:bg-black/70 text-silver hover:text-phile-light border border-dust-blue/30"
                >
                  Return to Gate
                </Button>
              </div>
            )}
          </div>
        )}
        
        <div className="mt-8 text-xs text-gray-500 font-typewriter text-center">
          <p>QR Variants are tied to physical book pages.</p>
          <p>Some variants may change over time or become corrupted.</p>
          {typeof window.isSpecialTimeWindow === 'function' && window.isSpecialTimeWindow() && (
            <p className="text-dust-red animate-pulse mt-2">
              Special time window active: All variants accessible.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReEntry;
