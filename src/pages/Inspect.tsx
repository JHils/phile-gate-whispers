import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HiddenLink from "../components/HiddenLink";
import { getTimeElapsedMessage, getThematicMessage, checkRedemptionTime, resetCollapseState, checkSurvivorEligibility } from "../utils/chronoLayer";

const Inspect = () => {
  const [collapseMessage, setCollapseMessage] = useState<string | null>(null);
  const [thematicMessage, setThematicMessage] = useState<string | null>(null);
  const [redemptionAvailable, setRedemptionAvailable] = useState(false);
  const [survivorPathAvailable, setSurvivorPathAvailable] = useState(false);

  useEffect(() => {
    // Check for ChronoLayer messages
    const timeMessage = getTimeElapsedMessage();
    const themMessage = getThematicMessage();
    if (timeMessage && themMessage) {
      setCollapseMessage(timeMessage);
      setThematicMessage(themMessage);
    }
    
    // Check if redemption is available
    const permanentlyCollapsed = localStorage.getItem("permanentlyCollapsed");
    if (permanentlyCollapsed === "true") {
      // Check for survivor path eligibility first (30+ days)
      const isSurvivorEligible = checkSurvivorEligibility();
      setSurvivorPathAvailable(isSurvivorEligible);
      
      // If not survivor eligible, check for normal redemption
      if (!isSurvivorEligible) {
        const isRedemptionTime = checkRedemptionTime();
        setRedemptionAvailable(isRedemptionTime);
      }
    }
    
    // Console message for the inspector
    console.log("%cYou're getting closer. Keep looking.", "color: #475B74; font-size:16px;");
    
    setTimeout(() => {
      console.log("%cNode Breach Detected: Subject escalating.", "color: #475B74; font-size:14px;");
    }, Math.random() * 2000 + 1000);
    
    setTimeout(() => {
      console.log("%cBroken images hide broken memories.", "color: #475B74; font-size:14px;");
    }, Math.random() * 3000 + 2000);
    
    setTimeout(() => {
      console.log("%cMonster monitoring... awaiting command.", "color: #475B74; font-size:14px;");
      console.error("%cSignal disruption. Surface identity leaking.", "font-size:14px;");
    }, Math.random() * 4000 + 3000);
  }, []);

  const handleRedemption = () => {
    resetCollapseState();
    window.location.href = "/gatekeeper";
  };
  
  const handleSurvivorPath = () => {
    localStorage.removeItem("permanentlyCollapsed");
    localStorage.removeItem("gateCollapseTime");
    localStorage.setItem("survivorMode", "true");
    window.location.href = "/survivor";
  };

  return (
    <div className="min-h-screen bg-phile-dark flex flex-col items-center justify-center px-4">
      {/* Hidden comments for inspection */}
      {/* <!-- Hidden path: /philes --> */}
      {/* <!-- Time is not your ally. --> */}
      {/* <!-- Surveillance node activated. --> */}
      {/* <!-- Monster Mode dormant. --> */}

      <div className="text-center">
        <div className="mb-8 p-8 border border-dashed border-dust-blue/30 inline-block">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="120" 
            height="120" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="text-dust-red/70"
          >
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
            <path d="M3.29 7 12 12l8.71-5"></path>
            <line x1="12" y1="22" x2="12" y2="12"></line>
          </svg>
          <p className="text-sm text-silver mt-2">Image failed to load.</p>
        </div>

        <h1 className="text-3xl md:text-4xl font-typewriter text-dust-orange mb-6">
          Inspect the Coin
        </h1>

        <p className="text-lg text-phile-light animate-subtle-flicker">
          Something's missing. But not for those who look deeper.
        </p>

        {/* Display ChronoLayer message if user previously collapsed the site */}
        {collapseMessage && localStorage.getItem("permanentlyCollapsed") === "true" && (
          <div className="mt-6 mb-8">
            <p className="text-dust-red/70 text-sm font-typewriter animate-pulse">{collapseMessage}</p>
            {thematicMessage && <p className="text-dust-blue/50 text-xs font-typewriter mt-1">{thematicMessage}</p>}
          </div>
        )}

        {/* Show survivor path button if available (30+ days) */}
        {survivorPathAvailable && (
          <div className="mt-8 mb-10">
            <button 
              onClick={handleSurvivorPath}
              className="bg-black text-[#00FFAA] px-6 py-3 border border-[#00FFAA] hover:bg-[#00FFAA]/10 transition-colors font-typewriter animate-pulse"
            >
              Survivor Path
            </button>
          </div>
        )}
        
        {/* Show redemption button if available (7-30 days) */}
        {redemptionAvailable && !survivorPathAvailable && (
          <div className="mt-8 mb-10">
            <button 
              onClick={handleRedemption}
              className="bg-black text-green-400 px-6 py-3 border border-green-400 hover:bg-green-400 hover:text-black transition-colors font-typewriter animate-pulse"
            >
              Redemption Awaits
            </button>
          </div>
        )}

        <div className="mt-12">
          <Link 
            to="/"
            className="text-dust-blue hover:text-dust-red transition-colors text-sm"
          >
            Return to The Gate
          </Link>
        </div>
        
        {/* Hidden link to legacy page */}
        <div className="mt-16 opacity-5 text-phile-dark">
          <HiddenLink 
            to="/mirror-logs" 
            className="text-white/20 hover:text-white/40"
          >
            mirror logs
          </HiddenLink>
        </div>
      </div>
    </div>
  );
};

export default Inspect;
