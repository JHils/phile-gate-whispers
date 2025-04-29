
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
  
  // Check if site is already collapsed
  useEffect(() => {
    const locked = localStorage.getItem("gatekeeperLocked");
    if (locked === "true") {
      collapseSite();
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
      window.location.reload();
    });
    
    document.body.appendChild(resetSymbol);
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
