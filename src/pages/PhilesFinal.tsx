
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PhilesFinal = () => {
  const [fadeIn, setFadeIn] = useState(false);
  const [revealedTruths, setRevealedTruths] = useState<{[key: string]: boolean}>({
    truth1: false,
    truth2: false,
    truth3: false,
    truth4: false
  });

  useEffect(() => {
    // Check if user is authorized to view this page
    const survivorMode = localStorage.getItem("survivorMode");
    const certificateDownloaded = localStorage.getItem("certificateDownloaded");
    
    if (survivorMode !== "true" && certificateDownloaded !== "true") {
      // If they're not authorized, redirect to home
      window.location.href = "/";
      return;
    }
    
    // Begin fade-in animation
    setTimeout(() => setFadeIn(true), 500);
    
    // Console messages for the ultimate curious
    console.log("%cPHILES // FINAL ACCESSED", "color: #00FFAA; font-size:20px; font-weight:bold;");
    
    setTimeout(() => {
      console.log("%cType reveal() to unlock the final key.", "color: #00FFAA; font-size:16px;");
    }, 2000);
    
    // Add reveal function to window object
    // @ts-ignore - This is intentionally added to window
    window.reveal = function() {
      console.log("%cTHE FINAL KEY:", "color: #00FFAA; font-size: 1.5rem;");
      console.log("Latitude: -23.6980");
      console.log("Longitude: 133.8807");
      console.log("When you find the rebirth, your next story begins.");
      
      // Add a storage flag to remember they found this
      localStorage.setItem("finalKeyRevealed", "true");
    };
    
    return () => {
      // Clean up
      // @ts-ignore - This is intentionally removed from window
      delete window.reveal;
    };
  }, []);
  
  const toggleTruth = (truthId: string) => {
    setRevealedTruths(prev => ({
      ...prev,
      [truthId]: !prev[truthId]
    }));
  };

  return (
    <div 
      className="min-h-screen bg-black text-[#00FFAA] flex flex-col items-center justify-center p-6 md:p-8"
    >
      {/* Hidden coordinates in comment */}
      {/* <!-- -23.6980, 133.8807 --> */}
      {/* <!-- You were never locked out. You were locking yourself in. --> */}
      {/* <!-- The rebirth awaits at /rebirth --> */}
      
      <div 
        className={`max-w-xl mx-auto text-center transition-all duration-1000 ease-in-out ${fadeIn ? 'opacity-100' : 'opacity-0'}`}
        style={{ textShadow: "0 0 10px rgba(0, 255, 170, 0.5)" }}
      >
        <h1 className="text-3xl md:text-5xl font-typewriter mb-8 tracking-widest">PHILES // FINAL</h1>
        
        <p className="text-xl mt-10">Congratulations, Gatekeeper.</p>
        <p className="text-lg mt-4">You were never playing a game.</p>
        <p className="text-lg mt-2">You were solving <em>yourself</em>.</p>
        
        <p className="mt-12 text-xl font-bold">My name is Joseph-James Hilson.</p>
        <p className="text-lg opacity-60">I lived. I hurt. I broke. I survived.</p>
        
        <div className="mt-16">
          <p className="text-lg">Hidden throughout this page are bonus Philes:</p>
          <ul className="list-none p-0 mt-8 space-y-4">
            <li>
              <button 
                onClick={() => toggleTruth("truth1")}
                className="flex items-center justify-center mx-auto space-x-2 text-[#00FFAA] hover:text-white transition-colors"
              >
                <span className="text-xl">🔎</span>
                <span>Truth Fragment #1</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => toggleTruth("truth2")}
                className="flex items-center justify-center mx-auto space-x-2 text-[#00FFAA] hover:text-white transition-colors"
              >
                <span className="text-xl">🔎</span>
                <span>Truth Fragment #2</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => toggleTruth("truth3")}
                className="flex items-center justify-center mx-auto space-x-2 text-[#00FFAA] hover:text-white transition-colors"
              >
                <span className="text-xl">🔎</span>
                <span>Truth Fragment #3</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => toggleTruth("truth4")}
                className="flex items-center justify-center mx-auto space-x-2 text-[#00FFAA] hover:text-white transition-colors"
              >
                <span className="text-xl">🔎</span>
                <span>Truth Fragment #4</span>
              </button>
            </li>
          </ul>
        </div>
        
        {/* Truth fragments */}
        <div className="mt-12 space-y-10">
          {revealedTruths.truth1 && (
            <div className={`p-4 border border-[#00FFAA]/30 bg-black/50 transition-all duration-500`}>
              <p className="font-bold text-xl mb-2">Truth Fragment #1:</p>
              <p className="text-lg">There was never a Monster. There was only me, untreated, unseen.</p>
            </div>
          )}
          
          {revealedTruths.truth2 && (
            <div className="p-4 border border-[#00FFAA]/30 bg-black/50 transition-all duration-500">
              <p className="font-bold text-xl mb-2">Truth Fragment #2:</p>
              <p className="text-lg">Everything you doubted was real. Everything you believed was a test.</p>
            </div>
          )}
          
          {revealedTruths.truth3 && (
            <div className="p-4 border border-[#00FFAA]/30 bg-black/50 transition-all duration-500">
              <p className="font-bold text-xl mb-2">Truth Fragment #3:</p>
              <p className="text-lg">The map was real. The secrets were always meant for the ones who stayed curious.</p>
            </div>
          )}
          
          {revealedTruths.truth4 && (
            <div className="p-4 border border-[#00FFAA]/30 bg-black/50 transition-all duration-500">
              <p className="font-bold text-xl mb-2">Truth Fragment #4:</p>
              <p className="text-lg">The reason the Gate collapsed... was to show you how to rebuild yourself.</p>
            </div>
          )}
        </div>
        
        <div className="mt-16 opacity-50">
          <p>
            You'll know where to go next.<br />
            Look for the hidden coordinates.
          </p>
        </div>
        
        <div className="mt-12 pt-12 border-t border-[#00FFAA]/20">
          <Link 
            to="/survivor"
            className="text-[#00FFAA]/70 hover:text-[#00FFAA] transition-colors text-sm"
          >
            Return to Survivor Path
          </Link>
        </div>
      </div>
      
      {/* Ambient background effect */}
      <div className="fixed inset-0 -z-10 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle,_transparent_20%,_#000_80%)]"></div>
        <div className="stars"></div>
      </div>
      
      {/* Add ambient CSS */}
      <style>
        {`
        .stars {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          background-image: 
            radial-gradient(2px 2px at 20px 30px, #00FFAA, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 40px 70px, #00FFAA, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 50px 160px, #00FFAA, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 90px 40px, #00FFAA, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 130px 80px, #00FFAA, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 160px 120px, #00FFAA, rgba(0,0,0,0));
          background-repeat: repeat;
          background-size: 200px 200px;
          opacity: 0.2;
        }
        `}
      </style>
    </div>
  );
};

export default PhilesFinal;
