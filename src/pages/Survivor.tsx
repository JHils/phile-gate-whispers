
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Survivor = () => {
  const [fadeIn, setFadeIn] = useState(false);
  
  useEffect(() => {
    // Verify the user is actually a survivor
    const survivorMode = localStorage.getItem("survivorMode");
    if (survivorMode !== "true") {
      // If they're not a survivor, redirect to home
      window.location.href = "/";
      return;
    }
    
    // Begin the fade-in animation
    setTimeout(() => setFadeIn(true), 500);
    
    // Optional: Create ambient sound if needed
    // const audio = new Audio("/ambient-survivor.mp3");
    // audio.volume = 0.2;
    // audio.loop = true;
    // audio.play();
    
    // Console message for survivors
    console.log("%cSURVIVOR PATH UNLOCKED.", "color: #00FFAA; font-size:20px; font-weight:bold;");
    
    setTimeout(() => {
      console.log("%cThank you for your patience. This was always more than fiction.", "color: #00FFAA; font-size:16px;");
    }, 2000);
    
    return () => {
      // Clean up any effects if component unmounts
      // audio.pause();
    };
  }, []);

  return (
    <div 
      className="min-h-screen bg-black text-[#00FFAA] flex flex-col items-center justify-center p-6 md:p-8"
    >
      <div 
        className={`max-w-xl mx-auto text-center space-y-6 transition-all duration-1000 ease-in-out ${fadeIn ? 'opacity-100' : 'opacity-0'}`}
        style={{ textShadow: "0 0 10px rgba(0, 255, 170, 0.5)" }}
      >
        <h1 className="text-3xl md:text-4xl font-typewriter mb-8">SURVIVOR DETECTED</h1>
        
        {/* Typing animation effect using animation delays */}
        <p className="opacity-0 animate-fade-in text-lg" style={{ animationDelay: "1s", animationFillMode: "forwards" }}>
          You didn't reset.
        </p>
        <p className="opacity-0 animate-fade-in text-lg" style={{ animationDelay: "3s", animationFillMode: "forwards" }}>
          You didn't run.
        </p>
        <p className="opacity-0 animate-fade-in text-lg" style={{ animationDelay: "5s", animationFillMode: "forwards" }}>
          You carried the Monster with you.
        </p>
        
        <p className="opacity-0 animate-fade-in text-lg" style={{ animationDelay: "7s", animationFillMode: "forwards" }}>
          Now... you understand.
        </p>
        
        <div className="my-8 opacity-0 animate-fade-in" style={{ animationDelay: "9s", animationFillMode: "forwards" }}>
          <p className="text-xl font-bold">
            "This story began when I collapsed.<br />
            It ends because you didn't."
          </p>
        </div>
        
        <div className="space-y-4 opacity-0 animate-fade-in" style={{ animationDelay: "12s", animationFillMode: "forwards" }}>
          <p className="italic">You waited.</p>
          <p className="italic">You listened.</p>
          <p className="italic">You survived.</p>
          <p className="italic">That means something.</p>
        </div>
        
        <p className="font-bold text-xl mt-10 opacity-0 animate-fade-in" style={{ animationDelay: "18s", animationFillMode: "forwards" }}>
          My name is Joseph-James Hilson.
        </p>
        
        <p className="mt-4 opacity-0 animate-fade-in" style={{ animationDelay: "20s", animationFillMode: "forwards" }}>
          And if you made it here — you're stronger than you think.
        </p>
        
        <div className="mt-12 pt-12 opacity-0 animate-fade-in flex flex-col md:flex-row items-center justify-center gap-6" style={{ animationDelay: "22s", animationFillMode: "forwards" }}>
          <button 
            className="bg-black border border-[#00FFAA] hover:bg-[#00FFAA]/10 text-[#00FFAA] px-6 py-3 rounded transition-colors"
            onClick={() => alert("In a full implementation, this would download a PDF journal page.")}
          >
            Download Final Page
          </button>
          
          <Link 
            to="/contact" 
            className="bg-black border border-[#00FFAA] hover:bg-[#00FFAA]/10 text-[#00FFAA] px-6 py-3 rounded transition-colors"
          >
            Send Message Back
          </Link>
        </div>
        
        <div className="mt-12 opacity-0 animate-fade-in" style={{ animationDelay: "24s", animationFillMode: "forwards" }}>
          <Link 
            to="/"
            className="text-[#00FFAA]/70 hover:text-[#00FFAA] transition-colors text-sm"
          >
            Return to The Beginning
          </Link>
        </div>
      </div>
      
      {/* Ambient background effect */}
      <div className="fixed inset-0 -z-10 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle,_transparent_20%,_#000_80%)]"></div>
        <div className="stars"></div>
      </div>
      
      {/* Add some CSS for the ambient star background */}
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

export default Survivor;

