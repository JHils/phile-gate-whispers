
import React, { useEffect, useState } from "react";
import { getTimeElapsedMessage, getThematicMessage } from "../utils/chronoLayer";
import { useTrackingSystem } from "../hooks/useTrackingSystem";
import { useConsoleMessages } from "../hooks/useConsoleMessages";
import { initializeConsoleCommands } from "../utils/consoleCommands";
import { checkForDreamInvasionOnLoad } from "../utils/jonahRealityFabric";
import { useIsMobile } from "../hooks/use-mobile";
import { toast } from "@/components/ui/use-toast";
import LoadingScreen from "@/components/LoadingScreen";
import HiddenNav from "../components/HiddenNav";

// Import components
import PageHeader from "@/components/index/PageHeader";
import MessageText from "@/components/index/MessageText";
import NavLinks from "@/components/index/NavLinks";
import FooterText from "@/components/index/FooterText";
import JonahCrossSiteWhisper from "@/components/JonahCrossSiteWhisper";
import Footer from "@/components/Footer";
import OfflineGuideDownload from "@/components/OfflineGuideDownload";
import TrustVisualIndicators from "@/components/index/TrustVisualIndicators";
import KeyholeEasterEgg from "@/components/index/KeyholeEasterEgg";
import HiddenComments from "@/components/index/HiddenComments";
import JonahBackgroundOverlay from "@/components/index/JonahBackgroundOverlay";
import JonahHiddenData from "@/components/index/JonahHiddenData";
import VisibilityChangeDetector from "@/components/index/VisibilityChangeDetector";

// Import hooks
import useWeatherService from "@/components/weather/useWeatherService";
import useConsoleForgetEmotions from "@/hooks/useConsoleForgetEmotions";
import { initializeFuzzyStoryMatching } from "@/utils/fuzzyStoryMatching";

const Index = () => {
  const [collapseMessage, setCollapseMessage] = useState<string | null>(null);
  const [trustLevel, setTrustLevel] = useState<string>("low");
  const [whisperText, setWhisperText] = useState<string>("Find the Gate before the Gate finds you.");
  const [showLoading, setShowLoading] = useState(true);
  const { userState, trackEvent, getUserRank } = useTrackingSystem();
  const { showConsoleMessages } = useConsoleMessages({ 
    storageKey: 'index_console_messages_shown',
    userState 
  });
  const isMobile = useIsMobile();
  
  // Initialize weather service
  const { weatherDescription } = useWeatherService(trustLevel);
  
  // Initialize forget emotions handler
  const { triggerForgetRegret } = useConsoleForgetEmotions();

  // Add classes to individual characters for staggered animation
  const addSpans = (text: string) => {
    return text.split('').map((char, i) => 
      <span key={i} style={{ animationDelay: `${i * 0.1}s` }}>{char}</span>
    );
  };

  // Function to update UI based on progress
  const updateUIBasedOnProgress = () => {
    if (userState.console.legacyCalled || localStorage.getItem("legacyCalled") === "true") {
      setWhisperText("The Gatekeeper sees all.");
      document.getElementById("whisperText")?.classList.add("text-dust-red");
    } else if (userState.console.monsterCalled || localStorage.getItem("monsterCalled") === "true") {
      setWhisperText("He walks with your steps now.");
    } else if (userState.console.philesCalled || localStorage.getItem("philesCalled") === "true") {
      setWhisperText("The files are watching you back.");
    } else if (userState.console.gateCalled || localStorage.getItem("gateCalled") === "true") {
      setWhisperText("You crossed without permission.");
    } else if (userState.console.whoisCalled || localStorage.getItem("whoisCalled") === "true") {
      setWhisperText("Names hide deeper truths.");
    } else if (userState.console.helpCalled || localStorage.getItem("helpCalled") === "true") {
      setWhisperText("Someone heard your call.");
    } else if (userState.console.revealCalled) {
      setWhisperText("Every revelation has a price.");
    } else if (userState.console.reincarnateCalled) {
      setWhisperText("Death is just transformation.");
    }
      
    // If Nightmare Sequence was triggered, add a special message
    if (userState.permanentlyCollapsed || localStorage.getItem("permanentlyCollapsed") === "true") {
      const thematicMessage = getThematicMessage();
      if (thematicMessage) {
        setWhisperText(thematicMessage);
        document.getElementById("whisperText")?.classList.add("text-dust-red");
        document.getElementById("whisperText")?.classList.add("animate-pulse");
      }
    }
      
    // Check for hidden console uses
    if (window.JonahConsole && window.JonahConsole.usedCommands) {
      if (window.JonahConsole.usedCommands.includes('whisper')) {
        document.getElementById("whisperText")?.classList.add("animate-subtle-flicker");
      }
        
      if (window.JonahConsole.usedCommands.includes('glitch')) {
        setTimeout(() => {
          document.getElementById("whisperText")?.classList.add("animate-glitch");
          setTimeout(() => document.getElementById("whisperText")?.classList.remove("animate-glitch"), 500);
        }, 2000);
      }
    }
    
    // If weather data is available, occasionally update whisper text
    if (weatherDescription && Math.random() > 0.85) {
      setWhisperText(weatherDescription);
    }
  };

  useEffect(() => {
    // Track page visit
    trackEvent('visited_gate');
    
    // Check for ChronoLayer messages
    const timeMessage = getTimeElapsedMessage();
    if (timeMessage) {
      setCollapseMessage(timeMessage);
    }
    
    // Show console messages if they haven't been shown recently
    showConsoleMessages();
    
    // Initialize console commands if they don't exist
    if (!window.help) {
      initializeConsoleCommands(trackEvent, getUserRank, userState);
    }
    
    // Initialize fuzzy story matching system
    initializeFuzzyStoryMatching();
    
    // Get current trust level from localStorage
    const storedTrustLevel = localStorage.getItem('jonahTrustLevel') || 'low';
    setTrustLevel(storedTrustLevel);
    
    // Check for dream invasion message
    const dreamMessage = checkForDreamInvasionOnLoad();
    if (dreamMessage && typeof window.triggerJonahMessage === 'function') {
      // Show the dream message after a delay
      setTimeout(() => {
        window.triggerJonahMessage(dreamMessage);
      }, 3000);
    }
    
    // Call on load to reflect any existing progress
    setTimeout(updateUIBasedOnProgress, 1000);
    
    // Set up periodic UI updates to reflect console activity
    const intervalId = setInterval(updateUIBasedOnProgress, 5000);
    
    // Hide loading screen after delay
    setTimeout(() => {
      setShowLoading(false);
    }, 1500);
    
    // Occasionally trigger the forget command regret
    if (Math.random() > 0.7) {
      setTimeout(() => {
        triggerForgetRegret();
      }, 60000 + Math.random() * 120000); // 1-3 minutes delay
    }
    
    return () => clearInterval(intervalId);
  }, [trackEvent, getUserRank, userState, showConsoleMessages, triggerForgetRegret]);
  
  // Check for dream messages on tab visibility change
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        // Check for dream invasion when user returns to tab
        const dreamMessage = checkForDreamInvasionOnLoad();
        if (dreamMessage && typeof window.triggerJonahMessage === 'function') {
          window.triggerJonahMessage(dreamMessage);
        }
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Check if user is permanently collapsed
  const userIsPermanentlyCollapsed = userState.permanentlyCollapsed || 
                                    localStorage.getItem("permanentlyCollapsed") === "true";

  return (
    <>
      {showLoading && <LoadingScreen message="Accessing memory gate..." />}
      
      <div 
        className={`min-h-screen w-full max-w-100vw bg-black font-typewriter flex flex-col 
        ${trustLevel === 'high' ? 'trust-shadow-high' : 
          trustLevel === 'medium' ? 'trust-shadow-medium' : ''}`}
        style={{ 
          backgroundImage: "linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?auto=format&fit=crop&q=80&w=1600&ixlib=rb-4.0.3')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        {/* Hidden comments for inspection */}
        <HiddenComments />
        
        {/* Ghost glyph and background overlay */}
        <JonahBackgroundOverlay />
        
        {/* Hidden keyhole element for micro-quest */}
        <KeyholeEasterEgg />
        
        {/* Cross-site whisper - appears rarely */}
        <JonahCrossSiteWhisper 
          trustLevel={trustLevel} 
          className="absolute top-2 left-1/2 transform -translate-x-1/2" 
        />
        
        {/* Main content container with visual trust indicators */}
        <div className="phile-container text-center z-10 flex flex-col items-center justify-center py-4">
          {/* Header with mood indicator and spinning coin */}
          <TrustVisualIndicators trustLevel={trustLevel} className="absolute inset-0 pointer-events-none" />
          
          <PageHeader trustLevel={trustLevel} />
          
          {/* Main message text area */}
          <MessageText 
            addSpans={addSpans}
            whisperText={whisperText}
            collapseMessage={collapseMessage}
            userIsPermanentlyCollapsed={userIsPermanentlyCollapsed}
          />
          
          {/* Navigation links */}
          <NavLinks 
            trustLevel={trustLevel} 
            isSpecialTime={typeof window.isSpecialTimeWindow === 'function' && window.isSpecialTimeWindow()}
          />
          
          {/* Offline Guide Download */}
          <div className="mt-8">
            <OfflineGuideDownload variant="minimal" />
          </div>
        </div>
        
        {/* Hidden navigation */}
        <HiddenNav />
        
        {/* Footer text */}
        <FooterText visitCount={userState.visitCount} />
        
        {/* New Jonah Footer with Glyph */}
        <Footer variant="light" />
        
        {/* Hidden data attributes for cross-site presence */}
        <JonahHiddenData userState={userState} />
        
        {/* Visibility change detector for tab switching responses */}
        <VisibilityChangeDetector trustLevel={trustLevel} />
      </div>
    </>
  );
};

export default Index;
