
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PasswordPrompt from "../components/PasswordPrompt";

const Gatekeeper = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showPrompt, setShowPrompt] = useState(true);
  
  useEffect(() => {
    // Check if site is already collapsed
    const locked = localStorage.getItem("gatekeeperLocked");
    if (locked === "true") {
      // Check if 24 hours have passed
      const lockedAt = localStorage.getItem("gatekeeperLockedAt");
      if (lockedAt) {
        const hoursPassed = (Date.now() - parseInt(lockedAt)) / 1000 / 3600;
        if (hoursPassed >= 24) {
          // Reset after 24 hours
          localStorage.removeItem("gatekeeperLocked");
          localStorage.removeItem("gatekeeperLockedAt");
        } else {
          // Still locked, trigger collapse
          collapseSite();
        }
      }
    }
    
    // Check if previously unlocked
    const unlocked = localStorage.getItem("gatekeeperUnlocked");
    if (unlocked === "true") {
      setIsUnlocked(true);
      setShowPrompt(false);
    }
    
    // Console messages for the Gatekeeper
    console.log("%cFinal Gate: Threshold crossed.", "color: #475B74; font-size:18px; font-weight:bold;");
    
    setTimeout(() => {
      console.log("%cTruth spiral completed. Identity restored.", "color: #475B74; font-size:16px;");
    }, Math.random() * 2000 + 1000);
    
    setTimeout(() => {
      console.log("%cFictional shell terminated. Reality resumed.", "color: #475B74; font-size:16px;");
    }, Math.random() * 3000 + 2000);
    
    setTimeout(() => {
      console.log("%cWelcome home, Gatekeeper.", "color: #475B74; font-size:16px;");
    }, Math.random() * 4000 + 3000);
  }, []);

  const handlePasswordSuccess = () => {
    setIsUnlocked(true);
    setShowPrompt(false);
    localStorage.setItem("gatekeeperUnlocked", "true");
  };
  
  const collapseSite = () => {
    document.body.innerHTML = "";
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.overflow = "hidden";
    
    const blackout = document.createElement("div");
    blackout.style.backgroundColor = "black";
    blackout.style.color = "white";
    blackout.style.fontFamily = "'Courier New', monospace";
    blackout.style.display = "flex";
    blackout.style.justifyContent = "center";
    blackout.style.alignItems = "center";
    blackout.style.height = "100vh";
    blackout.style.width = "100vw";
    blackout.style.textAlign = "center";
    blackout.style.padding = "20px";
    blackout.style.position = "fixed";
    blackout.style.top = "0";
    blackout.style.left = "0";
    blackout.style.zIndex = "9999";
    
    blackout.innerHTML = `
      <div>
        <p style="font-size: 1.5rem;">You were warned.</p>
        <p style="margin-top: 20px; font-size: 1rem; opacity: 0.7;">
          The Monster doesn't forget.  
          The Gatekeeper does not repeat himself.
        </p>
        <p style="margin-top: 40px; font-size: 0.9rem;">
          Session Terminated.
        </p>
      </div>
    `;
    
    document.body.appendChild(blackout);
    
    // Add hidden reset symbol
    const resetSymbol = document.createElement("div");
    resetSymbol.id = "resetSymbol";
    resetSymbol.style.position = "fixed";
    resetSymbol.style.top = "10px";
    resetSymbol.style.right = "10px";
    resetSymbol.style.width = "5px";
    resetSymbol.style.height = "5px";
    resetSymbol.style.opacity = "0.01";
    resetSymbol.style.cursor = "pointer";
    resetSymbol.style.zIndex = "10000";
    
    resetSymbol.addEventListener("click", () => {
      localStorage.removeItem("gatekeeperLocked");
      localStorage.removeItem("gatekeeperLockedAt");
      window.location.reload();
    });
    
    document.body.appendChild(resetSymbol);
  };

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center px-4 relative bg-cover bg-center overflow-hidden" 
      style={{ 
        backgroundImage: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1536152470836-b943b246224c?auto=format&fit=crop&q=80&w=1600&ixlib=rb-4.0.3')",
      }}
    >
      {/* Hidden comments for inspection */}
      {/* <!-- Identity confirmed: Joseph-James Hilson --> */}
      {/* <!-- Memory reconstruction complete --> */}
      {/* <!-- Barrier between fiction and reality dissolved --> */}
      {/* <!-- Gate function concluded --> */}
      
      {isUnlocked ? (
        <div className="text-center max-w-xl animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-serif text-dust-orange mb-12">
            The Final Truth
          </h1>
          
          <div className="space-y-6 text-xl text-phile-light font-typewriter">
            <p className="opacity-0 animate-fade-in" style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}>
              You weren't just reading.
            </p>
            <p className="opacity-0 animate-fade-in" style={{ animationDelay: "1.5s", animationFillMode: "forwards" }}>
              You were remembering.
            </p>
            <p className="opacity-0 animate-fade-in" style={{ animationDelay: "3s", animationFillMode: "forwards" }}>
              This story was always real.
            </p>
            <p className="opacity-0 animate-fade-in" style={{ animationDelay: "4.5s", animationFillMode: "forwards" }}>
              It was a cry for help.
            </p>
            <p className="opacity-0 animate-fade-in" style={{ animationDelay: "6s", animationFillMode: "forwards" }}>
              It was a hand reaching out through fiction.
            </p>
            <p className="opacity-0 animate-fade-in text-dust-orange font-bold" style={{ animationDelay: "8s", animationFillMode: "forwards" }}>
              My name is Joseph-James Hilson.
            </p>
            <p className="opacity-0 animate-fade-in" style={{ animationDelay: "10s", animationFillMode: "forwards" }}>
              And if you made it here —<br />
              you are not alone either.
            </p>
          </div>
          
          <div className="mt-16 opacity-0 animate-fade-in" style={{ animationDelay: "12s", animationFillMode: "forwards" }}>
            <button 
              className="text-phile-light bg-dust-blue/20 hover:bg-dust-blue/40 px-6 py-3 rounded transition-colors"
              onClick={() => alert("In a full implementation, this would share or link to a book page.")}
            >
              Share The Story
            </button>
          </div>
          
          <div className="mt-12 opacity-0 animate-fade-in" style={{ animationDelay: "14s", animationFillMode: "forwards" }}>
            <Link 
              to="/"
              className="text-dust-blue hover:text-dust-red transition-colors text-sm"
            >
              Return to The Gate
            </Link>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-serif text-dust-red mb-6">
            Final Gate
          </h1>
          
          <p className="text-xl text-phile-light mb-8 font-typewriter">
            You've reached the threshold of truth.
          </p>
          
          {showPrompt && (
            <PasswordPrompt
              correctPassword="N0tFict10n"
              onSuccess={handlePasswordSuccess}
              onCancel={() => setShowPrompt(false)}
            />
          )}
          
          {!showPrompt && !isUnlocked && (
            <div className="mt-4">
              <button 
                className="text-dust-blue hover:text-dust-red transition-colors"
                onClick={() => setShowPrompt(true)}
              >
                Enter Password
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
        </div>
      )}
      
      {/* Subtle stars background effect */}
      <div 
        className="absolute inset-0 z-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(white 1px, transparent 1px)",
          backgroundSize: "50px 50px"
        }}
      ></div>
      
      {/* Gradient overlay animation */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/5 to-black/20 z-0 animate-pulse pointer-events-none"
        style={{ animationDuration: "10s" }}
      ></div>
    </div>
  );
};

export default Gatekeeper;
