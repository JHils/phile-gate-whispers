import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PasswordPrompt from "../components/PasswordPrompt";

const Gatekeeper = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showPrompt, setShowPrompt] = useState(true);
  
  useEffect(() => {
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
          <h1 className="text-4xl md:text-5xl font-typewriter text-dust-orange mb-12">
            The Final Truth
          </h1>
          
          <div className="space-y-6 text-xl text-phile-light">
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
          <h1 className="text-3xl md:text-4xl font-typewriter text-dust-red mb-6">
            Final Gate
          </h1>
          
          <p className="text-xl text-phile-light mb-8">
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
    </div>
  );
};

export default Gatekeeper;
