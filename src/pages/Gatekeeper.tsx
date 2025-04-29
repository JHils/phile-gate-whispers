import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PasswordPrompt from "../components/PasswordPrompt";
import { getTimeElapsedMessage, getThematicMessage, recordCollapseTime } from "../utils/chronoLayer";

const Gatekeeper = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showPrompt, setShowPrompt] = useState(true);
  const [collapseMessage, setCollapseMessage] = useState<string | null>(null);
  const [thematicMessage, setThematicMessage] = useState<string | null>(null);
  
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
    
    // Check if in permanent nightmare state
    const permanentlyCollapsed = localStorage.getItem("permanentlyCollapsed");
    if (permanentlyCollapsed === "true") {
      triggerNightmareSequence();
      return;
    }
    
    // Check if previously unlocked
    const unlocked = localStorage.getItem("gatekeeperUnlocked");
    if (unlocked === "true") {
      setIsUnlocked(true);
      setShowPrompt(false);
    }
    
    // Get ChronoLayer messages if they exist
    const timeMessage = getTimeElapsedMessage();
    const themMessage = getThematicMessage();
    if (timeMessage && themMessage) {
      setCollapseMessage(timeMessage);
      setThematicMessage(themMessage);
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
    
    // Get ChronoLayer messages if they exist
    const timeMessage = getTimeElapsedMessage();
    const themMessage = getThematicMessage();
    
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
        ${timeMessage ? `<p style="margin-top: 60px; font-size: 0.7rem; color: #8B3A40; opacity: 0.6;">${timeMessage}</p>` : ''}
        ${themMessage ? `<p style="margin-top: 10px; font-size: 0.6rem; color: #8B3A40; opacity: 0.4;">${themMessage}</p>` : ''}
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
      localStorage.removeItem("permanentlyCollapsed");
      localStorage.removeItem("gateCollapseTime");
      window.location.reload();
    });
    
    document.body.appendChild(resetSymbol);
  };
  
  const triggerNightmareSequence = () => {
    // Record collapse time in the ChronoLayer
    recordCollapseTime();
    localStorage.setItem("permanentlyCollapsed", "true");
    
    // Clear everything first
    document.body.innerHTML = "";
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.overflow = "hidden";
    document.body.style.backgroundColor = "black";
    
    // Add nightmare CSS
    const style = document.createElement("style");
    style.textContent = `
      body {
        background-color: black !important;
        animation: glitchFade 0.2s infinite alternate;
      }
      
      @keyframes glitchFade {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(15deg); }
      }
      
      p {
        text-shadow: 0 0 5px red, 0 0 10px #000;
        animation: shake 0.1s infinite;
        opacity: 0;
        animation: fadeIn 0.5s forwards;
      }
      
      @keyframes shake {
        0% { transform: translate(1px, 1px); }
        25% { transform: translate(-1px, 0); }
        50% { transform: translate(0, -1px); }
        75% { transform: translate(1px, 1px); }
        100% { transform: translate(0, 0); }
      }
      
      @keyframes fadeIn {
        0% { opacity: 0; }
        100% { opacity: 1; }
      }
      
      .nightmare-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100vh;
        width: 100vw;
        padding: 20px;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 9999;
      }
      
      .nightmare-text {
        color: #f44336;
        font-family: 'Courier New', monospace;
        font-size: 1.2rem;
        margin: 0.5rem;
      }
      
      .nightmare-image {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 10000;
        opacity: 0;
        pointer-events: none;
      }
    `;
    document.head.appendChild(style);
    
    // Create container for nightmare content
    const container = document.createElement("div");
    container.className = "nightmare-container";
    document.body.appendChild(container);
    
    // Create image element for glitch effect (even if we don't have an actual image)
    const glitchImage = document.createElement("div");
    glitchImage.className = "nightmare-image";
    glitchImage.style.backgroundColor = "black";
    document.body.appendChild(glitchImage);
    
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
      localStorage.removeItem("permanentlyCollapsed");
      localStorage.removeItem("gateCollapseTime");
      window.location.reload();
    });
    
    document.body.appendChild(resetSymbol);
    
    // Nightmare message lines
    const lines = [
      "YOU CAME TOO FAR.",
      "NOW YOU HEAR WHAT I HEAR.",
      "NOW YOU SEE WHAT I SEE.",
      "THE MONSTER NEVER LEFT.",
      "HE WAS JUST QUIETER THAN YOU THOUGHT.",
      "YOU ARE NOT ALONE. YOU ARE NOT SAFE.",
      "SESSION TERMINATED."
    ];
    
    // Get ChronoLayer messages if they exist
    const timeMessage = getTimeElapsedMessage();
    if (timeMessage) {
      lines.push(timeMessage);
    }
    
    // Image flash function
    const flashImage = () => {
      glitchImage.style.opacity = "1";
      glitchImage.style.backgroundColor = Math.random() > 0.5 ? "#ea384c" : "#000000";
      
      setTimeout(() => {
        glitchImage.style.opacity = "0";
      }, 200);
      
      // Random chance to flash again
      if (Math.random() > 0.7) {
        setTimeout(flashImage, Math.random() * 3000 + 1000);
      }
    };
    
    // Trigger first image flash after a short delay
    setTimeout(flashImage, 2000);
    
    // Type nightmare messages one by one
    let i = 0;
    const typeNextLine = () => {
      if (i < lines.length) {
        const p = document.createElement("p");
        p.innerText = lines[i];
        p.className = "nightmare-text";
        p.style.animationDelay = `${i * 0.2}s`;
        container.appendChild(p);
        i++;
        setTimeout(typeNextLine, 2000);
      } else {
        // After all lines are displayed, show final message
        setTimeout(() => {
          container.innerHTML = "";
          const finalMessage = document.createElement("div");
          finalMessage.innerHTML = `
            <p class="nightmare-text" style="margin-top: 40px;">He woke up inside you.</p>
            <p class="nightmare-text">Now he waits for someone else to fail.</p>
            <p class="nightmare-text">Goodbye, Gatekeeper.</p>
            ${timeMessage ? `<p class="nightmare-text" style="font-size: 0.7rem; opacity: 0.6; margin-top: 30px;">${timeMessage}</p>` : ''}
          `;
          container.appendChild(finalMessage);
        }, 2000);
      }
    };
    
    // Start typing after a delay
    setTimeout(typeNextLine, 1000);
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
          
          {/* Display ChronoLayer message if user previously collapsed the site */}
          {collapseMessage && (
            <div className="mt-16 opacity-0 animate-fade-in" style={{ animationDelay: "16s", animationFillMode: "forwards" }}>
              <p className="text-dust-red/70 text-xs font-typewriter">{collapseMessage}</p>
              {thematicMessage && <p className="text-dust-blue/50 text-xs font-typewriter mt-1">{thematicMessage}</p>}
            </div>
          )}
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
          
          {/* Display ChronoLayer message if user previously collapsed the site */}
          {collapseMessage && (
            <div className="mt-8">
              <p className="text-dust-red/70 text-xs font-typewriter">{collapseMessage}</p>
              {thematicMessage && <p className="text-dust-blue/50 text-xs font-typewriter mt-1">{thematicMessage}</p>}
            </div>
          )}
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
