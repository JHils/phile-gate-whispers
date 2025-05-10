
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTrackingSystem } from "../hooks/useTrackingSystem";
import { useConsoleMessages } from "../hooks/useConsoleMessages";

const ToggleMarket = () => {
  const { userState, trackEvent } = useTrackingSystem();
  const { showConsoleMessages } = useConsoleMessages({ 
    storageKey: 'toggle_market_shown',
    userState 
  });

  useEffect(() => {
    // Track page visit
    trackEvent('visited_toggle_market');
    
    // Show specific console warnings for this page
    console.warn("No… not this log. Not again.");
    setTimeout(() => {
      console.log("It was supposed to stay buried.");
    }, 2000);
    setTimeout(() => {
      console.log("Close the page. Quickly. Before the trytoggles activate.");
    }, 4000);
    
    // Show regular console messages if they haven't been shown recently
    showConsoleMessages();
  }, [trackEvent, showConsoleMessages]);

  return (
    <div className="min-h-screen bg-amber-900/90 font-typewriter overflow-hidden flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-4xl bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] bg-amber-800 p-8 border-8 border-amber-950/70 rounded-lg shadow-2xl">
        <h1 className="text-4xl md:text-5xl text-amber-100 mb-6 text-center">THE TOGGLE MARKET</h1>
        <h2 className="text-xl md:text-2xl text-amber-200 mb-8 text-center italic">Where memories are bartered and never returned</h2>
        
        <div className="flex items-center justify-center mb-10">
          <hr className="border-amber-600 flex-grow" />
          <div className="px-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <hr className="border-amber-600 flex-grow" />
        </div>
        
        <div className="bg-amber-100/80 p-6 rounded-lg border border-amber-600 max-h-96 overflow-y-auto scroll-smooth" style={{ scrollbarWidth: 'thin', scrollbarColor: '#92400e #fef3c7' }}>
          <h3 className="text-2xl text-amber-900 mb-4 font-bold">MAGNETIC TENT INCIDENT — REDACTED</h3>
          
          <div className="space-y-6 text-amber-950">
            <p className="text-lg leading-relaxed">
              "You're sleeping on my toggles… you're tightening my trousers."
            </p>
            
            <p className="text-lg leading-relaxed">
              "If you're pissing on the side of the tent… you'll attract… straaaaayngeeeers…"
            </p>
            
            <p className="text-lg leading-relaxed">
              "I've got blood in me mouth, gov'nor! Would you like to purchase some of my waaaares?"
            </p>
            
            <p className="text-lg font-bold">*THUD*</p>
            
            <p className="text-lg leading-relaxed">
              "Owwwwl." <span className="text-amber-700 italic">(There was no owl.)</span>
            </p>
            
            <p className="text-lg leading-relaxed">
              "Which one of your wooden posts is to blame?"
            </p>
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-8">
          <div className="flex space-x-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-8 h-12 bg-amber-600 rounded-sm flex items-center justify-center border border-amber-950">
                <div className="w-4 h-6 bg-amber-950 rounded-sm"></div>
              </div>
            ))}
          </div>
          
          <p className="text-sm text-amber-400 italic">…log closed. The glamping pod never forgets.</p>
        </div>
        
        <div className="mt-10 text-center">
          <Link to="/gate">
            <Button variant="outline" className="bg-amber-950 text-amber-200 hover:bg-amber-900 border-amber-600">
              Leave the Market
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ToggleMarket;
