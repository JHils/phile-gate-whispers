
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { jsPDF } from "jspdf";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useTrackingSystem } from "../hooks/useTrackingSystem";

const Legacy = () => {
  const [email, setEmail] = useState("");
  const [journalEntry, setJournalEntry] = useState("");
  const [showJournal, setShowJournal] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const { userState, trackEvent } = useTrackingSystem();
  
  useEffect(() => {
    // Track page visit
    trackEvent('visited_legacy');
    
    // Begin fade-in animation
    setTimeout(() => setFadeIn(true), 500);
    
    // Retrieve saved journal entry if it exists
    const savedEntry = localStorage.getItem("legacyJournalEntry");
    if (savedEntry) {
      setJournalEntry(savedEntry);
    }
    
    // Console message for the legacy page
    console.log("%cWelcome, Gatekeeper.", "color: #475B74; font-size:18px; font-weight:bold;");
    
    setTimeout(() => {
      console.log("%cCongratulations, Gatekeeper.", "color: #475B74; font-size:16px;");
    }, Math.random() * 2000 + 1000);
    
    setTimeout(() => {
      console.log("%cYou saw through the cracks.", "color: #475B74; font-size:16px;");
    }, Math.random() * 3000 + 2000);
    
    setTimeout(() => {
      console.log("%cLegacy is not given. It is built.", "color: #475B74; font-size:16px;");
    }, Math.random() * 4000 + 3000);
    
    // Add hidden console function
    // @ts-ignore - This is intentionally added to window
    window.hilsonReveal = function() {
      console.log("%cJOSEPH-JAMES HILSON", "color: gold; font-size:20px; font-weight:bold;");
      console.log("Designer. Storyteller. Monster-tamer.");
      console.log("The voice behind the whispers.");
      console.log("https://josephhilson.design"); // Replace with actual URL when ready
      trackEvent('console_hilson_reveal_called');
    };
    
    return () => {
      // Clean up
      // @ts-ignore - This is intentionally removed from window
      delete window.hilsonReveal;
    };
  }, [trackEvent]);
  
  const handleStartLegacy = () => {
    setShowJournal(true);
  };
  
  const handleSaveJournal = () => {
    localStorage.setItem("legacyJournalEntry", journalEntry);
    trackEvent('legacy_written');
    toast.success("Your legacy has been remembered");
  };
  
  const handleExportJournal = () => {
    const doc = new jsPDF();

    // Set up PDF styling
    doc.setFont("Times", "italic");
    doc.setFontSize(20);
    doc.text("YOUR LEGACY CHAPTER", 20, 30);

    doc.setFont("Times", "normal");
    doc.setFontSize(12);
    doc.text(journalEntry || "This chapter is blank. It's yours to write.", 20, 50, { 
      maxWidth: 170,
      lineHeightFactor: 1.5
    });
    
    // Add signature
    doc.setFont("Times", "italic");
    doc.text("- Your story continues", 130, 250);

    // Add watermark
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text("From the Legacy Portal - Joseph-James Hilson", 20, 280);

    doc.save("My_Legacy_Chapter.pdf");
    trackEvent('legacy_exported');
  };
  
  const handleSubscribe = () => {
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email");
      return;
    }
    
    // In a real implementation, this would connect to a newsletter service
    trackEvent('email_submitted');
    toast.success("Your email has been received");
    console.log("%cNew gatekeeper joined: " + email, "color: gold;");
    setEmail("");
  };

  return (
    <div 
      className={`min-h-screen flex flex-col items-center justify-center px-4 relative transition-opacity duration-1000 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}
      style={{ 
        backgroundImage: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1516912481808-3406841bd33c?auto=format&fit=crop&q=80&w=1600&ixlib=rb-4.0.3')",
        backgroundSize: "cover",
        backgroundPosition: "center bottom"
      }}
    >
      {/* Main content */}
      <div className="text-center max-w-xl w-full">
        <h1 className="text-4xl md:text-5xl font-serif text-dust-orange mb-8">
          Legacy Portal
        </h1>
        
        {!showJournal ? (
          <div className="space-y-8">
            <div className="space-y-6">
              <p className="text-xl text-silver font-serif">If you're here… you made it.</p>
              <p className="text-xl text-phile-light font-serif">This story wasn't mine. It was ours.</p>
              
              <div className="my-8">
                <p className="text-lg text-phile-light opacity-90">Jonah walked through the desert.</p>
                <p className="text-lg text-phile-light opacity-90">Joseph walked through his mind.</p>
                <p className="text-lg text-phile-light opacity-90">You? You kept going.</p>
              </div>
              
              <p className="text-xl mt-8 text-silver font-serif">Write your ending. Or your beginning.</p>
              
              <p className="text-lg mt-6 text-dust-orange">— Joseph-James Hilson</p>
            </div>
            
            <div className="mt-12 flex flex-col items-center space-y-6">
              <Button 
                onClick={handleStartLegacy}
                className="bg-black/50 hover:bg-black/70 text-silver hover:text-phile-light border border-dust-blue/30 px-6 py-4 w-full max-w-xs transition-all"
              >
                Start Your Legacy
              </Button>
              
              <div className="w-full max-w-xs">
                <p className="text-sm text-phile-light mb-2">Get updates from Joseph-James</p>
                <div className="flex space-x-2">
                  <Input 
                    placeholder="your@email.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-black/50 border-dust-blue/30"
                  />
                  <Button 
                    onClick={handleSubscribe}
                    className="bg-dust-blue hover:bg-dust-blue/80 text-phile-light"
                  >
                    Join
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <h2 className="text-2xl text-dust-orange font-serif">Your Legacy Chapter</h2>
            <p className="text-phile-light text-sm opacity-60">This is your story. Write your ending. Or your beginning.</p>
            
            <Textarea
              className="min-h-[250px] bg-black/50 text-phile-light border-dust-blue/30"
              placeholder="This chapter is blank. It's yours to write."
              value={journalEntry}
              onChange={(e) => setJournalEntry(e.target.value)}
            />
            
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                onClick={handleSaveJournal}
                className="bg-dust-blue hover:bg-dust-blue/80 text-phile-light"
              >
                Save My Legacy
              </Button>
              
              <Button 
                onClick={handleExportJournal}
                className="bg-black/50 hover:bg-black/70 text-silver hover:text-phile-light border border-dust-blue/30"
              >
                Export as PDF
              </Button>
              
              <Button 
                onClick={() => setShowJournal(false)}
                className="bg-transparent hover:bg-black/30 text-dust-orange border border-dust-orange/30"
              >
                Back to Portal
              </Button>
            </div>
            
            <p className="text-xs text-phile-light opacity-50 mt-8">
              "Hundreds entered Jonah's Philes. Fewer than 1% ever wrote the Legacy Chapter. Those who did… started movements."
            </p>
          </div>
        )}
        
        <div className="mt-16">
          <p className="text-xs text-dust-blue/70 mb-2">Design. Code. Stories.</p>
          <a 
            href="#" 
            className="text-dust-blue hover:text-dust-red transition-colors text-sm font-serif"
            onClick={(e) => {
              e.preventDefault();
              // @ts-ignore - This is intentionally accessing a potential function
              if (typeof window.hilsonReveal === 'function') {
                // @ts-ignore - Call the hidden function
                window.hilsonReveal();
              }
              toast.success("If you know what to type, the console will listen");
            }}
          >
            Built by Joseph Hilson Design
          </a>
        </div>
        
        <div className="mt-8">
          <Link 
            to="/"
            className="text-dust-blue hover:text-dust-red transition-colors text-xs"
          >
            Return to The Gate
          </Link>
        </div>
      </div>
      
      {/* Add hidden metadata */}
      <div hidden>
        <meta name="author" content="Joseph-James Hilson" />
        <meta name="description" content="The Legacy Portal - Where your story continues" />
        {/* hint: josephhilson.com */}
      </div>
      
      {/* Ambient background effect */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle,_transparent_20%,_#000_70%)]"></div>
        <div className="noise-texture opacity-[0.03]"></div>
      </div>
      
      {/* Add ambient CSS */}
      <style>
        {`
        .noise-texture {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }
        `}
      </style>
    </div>
  );
};

export default Legacy;
