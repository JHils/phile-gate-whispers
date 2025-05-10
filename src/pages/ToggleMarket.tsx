
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTrackingSystem } from "../hooks/useTrackingSystem";

const ToggleMarket = () => {
  const { trackEvent } = useTrackingSystem();

  useEffect(() => {
    // Track page visit
    trackEvent('visited_toggle_market');
    
    // Add console warnings
    console.warn("No… not this log. Not again.");
    
    setTimeout(() => {
      console.log("It was supposed to stay buried.");
    }, 2000);
    
    setTimeout(() => {
      console.log("Close the page. Quickly. Before the trytoggles activate.");
    }, 4000);
  }, [trackEvent]);

  return (
    <div className="min-h-screen bg-amber-950 font-typewriter overflow-hidden flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-4xl bg-amber-900/60 border-2 border-amber-800 rounded-lg shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] opacity-40"></div>
        
        <h1 className="text-3xl md:text-4xl text-amber-100 font-serif p-6 text-center relative z-10">
          Toggle Market
        </h1>
        
        <div className="p-6 flex flex-col md:flex-row gap-6 relative z-10">
          <div className="md:w-1/3 flex flex-col items-center">
            <div className="bg-amber-800/70 p-4 rounded-lg border border-amber-700 mb-4 w-full">
              <h2 className="text-xl text-amber-200 mb-2">Wooden Toggles</h2>
              <div className="flex flex-wrap gap-2 justify-center">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="w-12 h-6 bg-amber-600/80 rounded-full relative flex items-center">
                    <div className="w-4 h-4 bg-amber-300 rounded-full absolute" style={{ left: i % 2 === 0 ? '4px' : '28px' }}></div>
                  </div>
                ))}
              </div>
              <p className="text-amber-200/70 mt-2 text-sm">Sacred toggles - don't tighten!</p>
            </div>
            
            <div className="bg-amber-800/70 p-4 rounded-lg border border-amber-700 w-full">
              <h2 className="text-xl text-amber-200 mb-2">Wooden Posts</h2>
              <div className="flex flex-col gap-2 items-center">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="w-6 h-28 bg-gradient-to-b from-amber-700 to-amber-800 rounded"></div>
                ))}
              </div>
              <p className="text-amber-200/70 mt-2 text-sm">Which one is to blame?</p>
            </div>
          </div>
          
          <div className="md:w-2/3 bg-amber-50/10 p-6 rounded-lg border border-amber-700 max-h-[60vh] overflow-y-auto scroll-parchment">
            <h2 className="text-2xl text-amber-100 font-serif mb-4 text-center">The Magnetic Tent Incident</h2>
            <div className="space-y-4 text-amber-100/80">
              <p className="border-l-2 border-amber-600 pl-4 py-2 italic">
                "You're sleeping on my toggles… you're tightening my trousers."
              </p>
              
              <p className="border-l-2 border-amber-600 pl-4 py-2 italic">
                "If you're pissing on the side of the tent… you'll attract… straaaaayngeeeers…"
              </p>
              
              <p className="border-l-2 border-amber-600 pl-4 py-2 italic">
                "I've got blood in me mouth, gov'nor! Would you like to purchase some of my waaaares?"
              </p>
              
              <p className="text-center font-bold text-amber-500/80 py-2">*THUD*</p>
              
              <p className="border-l-2 border-amber-600 pl-4 py-2 italic">
                "Owwwwl." <span className="text-amber-300/70">(There was no owl.)</span>
              </p>
              
              <p className="border-l-2 border-amber-600 pl-4 py-2 italic">
                "Which one of your wooden posts is to blame?"
              </p>
              
              <p className="text-center text-amber-300/70 mt-6">
                …log closed. The glamping pod never forgets.
              </p>
            </div>
          </div>
        </div>
        
        <div className="p-6 flex justify-center relative z-10">
          <Link to="/gate">
            <Button variant="outline" className="bg-amber-900/50 border-amber-700 text-amber-200 hover:bg-amber-800 hover:text-amber-100">
              Leave the Market
            </Button>
          </Link>
        </div>
      </div>
      
      <p className="text-amber-400/60 text-sm mt-6">
        Some memories are better left buried in the toggles.
      </p>
    </div>
  );
};

export default ToggleMarket;

// Add custom scrollbar for parchment effect
const style = document.createElement('style');
style.textContent = `
  .scroll-parchment::-webkit-scrollbar {
    width: 10px;
  }
  
  .scroll-parchment::-webkit-scrollbar-track {
    background: rgba(146, 64, 14, 0.2);
  }
  
  .scroll-parchment::-webkit-scrollbar-thumb {
    background: rgba(146, 64, 14, 0.6);
    border-radius: 10px;
  }
  
  .scroll-parchment::-webkit-scrollbar-thumb:hover {
    background: rgba(146, 64, 14, 0.8);
  }
`;
document.head.appendChild(style);
