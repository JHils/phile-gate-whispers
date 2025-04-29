
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TextGlitch from "../components/TextGlitch";

const About = () => {
  const [extraLine, setExtraLine] = useState("");

  useEffect(() => {
    // Console messages for the about page
    console.log("%cSubject fragmented. Two sides, one shell.", "color: #475B74; font-size:14px;");
    
    setTimeout(() => {
      console.log("%cJonah isn't lost. He's rearranged.", "color: #475B74; font-size:14px;");
    }, Math.random() * 2000 + 1000);
    
    setTimeout(() => {
      console.log("%cThe anagram holds the key. Joseph watches behind the mask.", "color: #475B74; font-size:14px;");
    }, Math.random() * 3000 + 2000);
    
    setTimeout(() => {
      console.log("%cYou ever wonder why no one else hears the whispers?", "color: #475B74; font-size:14px;");
      console.warn("%cTimeline corruption escalating beyond .phile threshold.", "font-size:14px;");
    }, Math.random() * 4000 + 3000);

    // Check localStorage for console interactions
    if (localStorage.getItem("legacyCalled")) {
      setExtraLine("The Gatekeeper awaits your final step.");
    } else if (localStorage.getItem("monsterCalled")) {
      setExtraLine("You've seen his face. It was your own.");
    } else if (localStorage.getItem("gateCalled")) {
      setExtraLine("You're already inside.");
    } else if (localStorage.getItem("whoisCalled")) {
      setExtraLine("Jonah isn't real. You are.");
    } else if (localStorage.getItem("helpCalled")) {
      setExtraLine("Someone heard your call.");
    }
  }, []);

  return (
    <div className="min-h-screen bg-phile-light py-16 relative">
      {/* Hidden comments for inspection */}
      {/* <!-- Subject Identity: Jonah S.M. Phile --> */}
      {/* <!-- Memory Corruption Detected. --> */}
      {/* <!-- Event: Monaco Proposal Confirmed. --> */}
      {/* <!-- Surface Code Fragment: /inspect --> */}
      {/* <!-- Anagram unresolved. --> */}
      {/* <!-- Bracelet fracture observed. --> */}
      {/* <!-- Observe her closely. --> */}

      <div className="phile-container">
        <h1 className="text-4xl md:text-5xl font-serif text-dust-red mb-10 text-center">
          The Philes About
        </h1>

        <div className="prose prose-lg max-w-none">
          <p className="mb-6 text-lg">
            Jonah was a <TextGlitch originalText="traveller" glitchText="prisoner" />, 
            a <TextGlitch originalText="dreamer" glitchText="victim" />, and a man who fought against the 
            crumbling walls of his own <TextGlitch originalText="mind" glitchText="reality" />.
          </p>

          <p className="mb-6">
            His journey began with the silver bracelet, a <TextGlitch originalText="gift" glitchText="curse" /> from 
            someone he thought he knew. The <TextGlitch originalText="coin" glitchText="key" /> came later—found 
            between the pages of a book he didn't remember buying.
          </p>

          <p className="mb-6">
            The trip to Australia wasn't his idea. He'd tell you that if he could. But by then, 
            the <TextGlitch originalText="walls" glitchText="lies" /> were already closing in.
          </p>

          <p className="mb-6">
            Some say he's still searching for a way back. Others say he never left at all.
          </p>
          
          {extraLine && (
            <p className="mb-6 text-dust-red animate-pulse font-typewriter">
              {extraLine}
            </p>
          )}

          <p className="mb-10 italic text-dust-blue">
            "Not everything you see is real. Try inspecting closer."
          </p>

          <div className="flex justify-center mt-12">
            <Link 
              to="/"
              className="text-dust-orange hover:text-dust-red transition-colors"
            >
              Return to The Gate
            </Link>
          </div>
          
          {/* Hidden message that appears if user has accessed console functions */}
          {localStorage.getItem("helpCalled") && (
            <div className="mt-8 text-center">
              <p id="bonusLine" className="tiny-hidden-text">
                You were never really outside the story.
              </p>
            </div>
          )}
          
          {/* Hidden footer message that only appears after monster() is called */}
          {localStorage.getItem("monsterCalled") && (
            <div className="mt-16 text-center">
              <p className="text-[0.6rem] text-dust-blue/50 italic">
                [Session recorded by the Monster]
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* Subtle glitch effect overlay */}
      <div 
        className="absolute inset-0 pointer-events-none bg-gradient-to-t from-transparent to-dust-blue/5 z-0"
      ></div>
    </div>
  );
};

export default About;
