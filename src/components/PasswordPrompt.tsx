
import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface PasswordPromptProps {
  correctPassword: string;
  onSuccess: () => void;
  onCancel: () => void;
}

const PasswordPrompt: React.FC<PasswordPromptProps> = ({ correctPassword, onSuccess, onCancel }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [nightmareActive, setNightmareActive] = useState(false);
  
  // Check if site is already collapsed
  useEffect(() => {
    const locked = localStorage.getItem("gatekeeperLocked");
    if (locked === "true") {
      collapseSite();
    }

    const permanentlyCollapsed = localStorage.getItem("permanentlyCollapsed");
    if (permanentlyCollapsed === "true") {
      triggerNightmareSequence();
    }
  }, []);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.toUpperCase() === correctPassword.toUpperCase()) {
      onSuccess();
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      setError(true);
      
      // Check if too many failed attempts
      if (newAttempts >= 10) {
        collapseSite();
        
        // After a brief delay, trigger nightmare sequence
        setTimeout(() => {
          triggerNightmareSequence();
        }, 3000);
      } else {
        setTimeout(() => setError(false), 2000);
      }
    }
  };
  
  const collapseSite = () => {
    // Record collapse time
    localStorage.setItem("gatekeeperLocked", "true");
    localStorage.setItem("gatekeeperLockedAt", Date.now().toString());
    
    // Clear the body
    document.body.innerHTML = "";
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.overflow = "hidden";
    document.body.style.backgroundColor = "black";
    
    // Create blackout screen
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
      localStorage.removeItem("permanentlyCollapsed");
      window.location.reload();
    });
    
    document.body.appendChild(resetSymbol);
  };
  
  const triggerNightmareSequence = () => {
    setNightmareActive(true);
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
          `;
          container.appendChild(finalMessage);
        }, 2000);
      }
    };
    
    // Start typing after a delay
    setTimeout(typeNextLine, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div 
        className="bg-phile-dark border border-dust-blue/30 p-6 max-w-md w-full rounded animate-fade-in"
        style={{ 
          boxShadow: "0 0 30px rgba(71, 91, 116, 0.2)",
          backgroundImage: "linear-gradient(to bottom, rgba(25,25,35,0.95), rgba(20,20,30,0.95))" 
        }}
      >
        <h2 className="text-dust-red font-serif mb-4">Password Required</h2>
        <p className="text-phile-light mb-6 text-sm font-typewriter">This gate remains closed to those who don't know the way.</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`bg-black/30 border-dust-blue/20 text-phile-light font-typewriter ${error ? 'border-dust-red' : ''}`}
            placeholder="Enter password..."
            autoFocus
          />
          
          <div className="flex justify-between mt-6">
            <Button 
              type="button"
              variant="ghost" 
              onClick={onCancel}
              className="text-silver hover:text-phile-light"
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="bg-dust-blue/20 hover:bg-dust-blue/40 text-phile-light"
            >
              Enter
            </Button>
          </div>
        </form>
        
        {error && (
          <p className="text-dust-red text-sm mt-4 animate-pulse font-typewriter">
            {attempts >= 9 ? "Final warning: One more incorrect attempt will lock you out." : "Incorrect password. Try again."}
          </p>
        )}
        
        <div className="mt-8 text-center">
          <p className="text-xs text-dust-blue/70 italic font-typewriter">
            "The answer was hidden in plain sight"
          </p>
          
          {attempts >= 5 && attempts < 9 && (
            <p className="text-xs text-dust-red/70 mt-2 italic font-typewriter animate-pulse">
              "{10 - attempts} attempts remaining before collapse."
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PasswordPrompt;
