
import React, { useEffect, useState } from "react";
import { jsPDF } from "jspdf";

const Rebirth = () => {
  const [fadeIn, setFadeIn] = useState(false);
  
  useEffect(() => {
    // Begin fade-in animation
    setTimeout(() => setFadeIn(true), 500);

    // Easter egg console function
    // @ts-ignore - This is intentionally added to window
    window.reincarnate = function() {
      console.log("%cREINCARNATION PROTOCOL", "color: gold; font-size: 1.5rem;");
      console.log("Your Monster became your shadow.");
      console.log("Your shadow became your shape.");
      console.log("Now go shape someone else's world.");
    };
    
    // Console messages for those who found this hidden page
    console.log("%cREBIRTH PROTOCOL ACTIVATED", "color: gold; font-size:20px; font-weight:bold;");
    
    setTimeout(() => {
      console.log("%cI left this page for you, because you would find it.", "color: gold; font-size:16px;");
    }, 2000);
    
    return () => {
      // Clean up
      // @ts-ignore - This is intentionally removed from window
      delete window.reincarnate;
    };
  }, []);
  
  const downloadNextPrompt = () => {
    const doc = new jsPDF();

    // Set up PDF styling
    doc.setFont("Courier", "normal");
    doc.setFontSize(18);
    doc.text("YOUR NEXT CHAPTER", 20, 30);

    doc.setFontSize(12);
    doc.text("Write a letter to your past self.", 20, 50);
    doc.text("Tell them what you saw. What you felt. Who you became.", 20, 60);
    doc.text("Then write a promise to your future self —", 20, 70);
    doc.text("A pact to carry the Monster with grace.", 20, 80);
    
    doc.text("You don't need to send it. Just write it.", 20, 110);
    doc.text("You've already been heard.", 20, 120);

    // Add a subtle watermark
    doc.setFontSize(8);
    doc.setTextColor(200, 200, 200);
    doc.text("I left this page for you, because you would find it.", 20, 280);

    doc.save("Next_Chapter_Prompt.pdf");
  };

  return (
    <div 
      className="min-h-screen bg-black text-[#FFD700] flex flex-col items-center justify-center p-6 md:p-8"
    >
      <div 
        className={`max-w-xl mx-auto text-center transition-all duration-1000 ease-in-out ${fadeIn ? 'opacity-100' : 'opacity-0'}`}
        style={{ textShadow: "0 0 10px rgba(255, 215, 0, 0.3)" }}
      >
        <h1 className="text-3xl md:text-4xl font-typewriter mb-8">REBIRTH</h1>
        
        <p className="text-lg mt-8">
          This isn't the end.<br />
          It was never meant to be the end.
        </p>

        <p className="mt-8">
          You walked with the Monster.<br />
          You survived the collapse.<br />
          You rebuilt your story.
        </p>

        <p className="mt-12 opacity-70">
          But now, it's your turn to write one.
        </p>

        <p className="mt-8 text-sm opacity-50">
          If you ever felt alone — you're not.<br />
          If you ever felt lost — you were just waiting.
        </p>

        <p className="mt-12 italic">
          The next book begins with your name.
        </p>
        
        <button 
          onClick={downloadNextPrompt}
          className="mt-16 px-5 py-3 bg-[#FFD700] text-black font-medium rounded hover:bg-[#E5C100] transition-colors"
        >
          Receive Your Next Chapter
        </button>
        
        {/* Hidden metadata */}
        <div hidden>
          <meta name="description" content="Not the end. The spark." />
          <meta property="og:title" content="Rebirth" />
          <meta property="og:description" content="Not the end. The spark." />
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
            radial-gradient(2px 2px at 20px 30px, #FFD700, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 40px 70px, #FFD700, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 50px 160px, #FFD700, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 90px 40px, #FFD700, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 130px 80px, #FFD700, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 160px 120px, #FFD700, rgba(0,0,0,0));
          background-repeat: repeat;
          background-size: 200px 200px;
          opacity: 0.1;
        }
        `}
      </style>
    </div>
  );
};

export default Rebirth;
