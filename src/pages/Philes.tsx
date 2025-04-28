
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import FileItem from "../components/FileItem";

const Philes = () => {
  useEffect(() => {
    // Console message for those who made it this far
    console.log("%cThe Gate has found you.", "color: #8B3A40; font-size:18px; font-weight:bold;");
  }, []);

  const files = [
    {
      title: "The Sound Beneath The Pedals",
      content: `TRANSCRIPT: SLEEP-TALKING SESSION #7\n\nSubject: J.P. [redacted]\nDate: 03/17/20XX\n\n[Begin Recording]\n\n"...under the floor...beneath the pedals..."\n\n"...it's watching from underneath..."\n\n"...the coin spins but never falls...why won't it fall?"\n\n"...Monaco was beautiful before the monsters came..."\n\n"...tell J we found the bracelet..."\n\n[14 minutes silence]\n\n"...I am not Jonah..."\n\n[Recording Ends]`,
      comment: "<!-- Sleep is where the truth leaks out. -->"
    },
    {
      title: "Monster's Final Letter",
      content: `My dearest J,\n\nBy the time you read this, I'll be gone. Not dead—worse. Erased.\n\nThey're coming for you next. They know you've seen through the cracks. The Gate was never meant to be opened from this side.\n\nRemember: The coin is the key. The bracelet is the lock. Your name is the spell that binds them.\n\nDon't trust what you remember. Don't trust what you see. And for God's sake, don't trust anyone who says they're me.\n\nI am the Monster, but I was never the villain.\n\nForget me if you must, but remember yourself.\n\n- M`,
      comment: "<!-- The Monster was trying to protect you all along. -->"
    },
    {
      title: "Tattoo Sketch: The Never Coin",
      content: `[SKETCH: A detailed drawing of an ancient coin]\n\nNotes:\n- Inner circle: serpent eating its tail\n- Outer rim text: "NEC CADERE NEC MANERE" (Neither falling nor staying)\n- Reverse side: empty chair facing a door\n- Material: silver alloy (non-magnetic)\n\nTattoo placement: Inner left wrist, covering the scar.\n\nReminder: Must be completed before the equinox.`,
      comment: "<!-- The scar was never from an accident. -->"
    },
    {
      title: "Code Fragment: True Identity",
      content: `SYSTEM LOG: Identity Protocol Breach\n\nUser: J.S.M.P.\nStatus: FRAGMENTING\n\nAnagram detected:\nJONAH S.M. PHILE = JOSEPH-JAMES HILSON\n\nWarning: Subject reality coherence at 31%\nWarning: Memory integrity failing\nWarning: Gate stability compromised\n\nInitiating emergency protocol...\n[CONNECTION TERMINATED]`,
      comment: "<!-- I AM JOSEPH HILSON. The story was never fiction. The story was survival. -->"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-phile-light py-16">
      {/* Hidden comments for inspection */}
      {/* <!-- Phile Complete. Subject Identified. --> */}
      {/* <!-- The Gate Was Always Inside You. --> */}

      <div className="phile-container">
        <h1 className="text-3xl md:text-4xl font-typewriter text-dust-red mb-2 text-center">
          Congratulations
        </h1>
        
        <p className="text-center mb-10 text-silver">
          You are now part of the story.
        </p>

        <div className="mt-12 space-y-2">
          {files.map((file, index) => (
            <FileItem 
              key={index}
              title={file.title}
              content={file.content}
              comment={file.comment}
            />
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Link 
            to="/"
            className="text-dust-blue hover:text-dust-red transition-colors"
          >
            Return to The Gate
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Philes;
