
import React from "react";
import { Link } from "react-router-dom";
import TextGlitch from "../components/TextGlitch";

const About = () => {
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
