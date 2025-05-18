
import React from 'react';
import { Link } from 'react-router-dom';

interface Glyph {
  symbol: string;
  meaning: string;
  link: string;
}

const glyphs: Glyph[] = [
  { symbol: "⌖", meaning: "The Gate", link: "/gate" },
  { symbol: "⧗", meaning: "Time Collapse", link: "/rebirth" },
  { symbol: "⌿", meaning: "Fractured Path", link: "/split-voice" },
  { symbol: "⍜", meaning: "Watching Eye", link: "/i-see-you" },
  { symbol: "⎋", meaning: "Escape Protocol", link: "/echo" },
  { symbol: "⏣", meaning: "Loop Beginning", link: "/gatekeeper" },
  { symbol: "⌑", meaning: "Memory Point", link: "/philes" },
  { symbol: "⌇", meaning: "Division Line", link: "/monster" },
  { symbol: "⍛", meaning: "Truth Pattern", link: "/legacy" },
  { symbol: "⍦", meaning: "Recurrence Field", link: "/map" },
];

const GlyphLinks: React.FC = () => {
  return (
    <>
      {/* Left Side Glyphs */}
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex flex-col space-y-6 text-2xl">
        {glyphs.slice(0, 5).map((glyph, index) => (
          <Link 
            to={glyph.link} 
            key={`left-${index}`} 
            className="glyph-symbol text-[#212121] hover:text-[#8B3A40] transition-colors relative group cursor-default"
            title={glyph.meaning}
            onClick={() => console.log(`> symbol.trace("${glyph.meaning}")`)}
          >
            <span>{glyph.symbol}</span>
            <span className="absolute left-8 opacity-0 group-hover:opacity-70 transition-opacity text-sm">
              {glyph.meaning}
            </span>
          </Link>
        ))}
      </div>

      {/* Right Side Glyphs */}
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-col space-y-6 text-2xl">
        {glyphs.slice(5).map((glyph, index) => (
          <Link 
            to={glyph.link} 
            key={`right-${index}`} 
            className="glyph-symbol text-[#212121] hover:text-[#8B3A40] transition-colors relative group cursor-default"
            title={glyph.meaning}
            onClick={() => console.log(`> symbol.trace("${glyph.meaning}")`)}
          >
            <span>{glyph.symbol}</span>
            <span className="absolute right-8 opacity-0 group-hover:opacity-70 transition-opacity text-sm">
              {glyph.meaning}
            </span>
          </Link>
        ))}
      </div>
    </>
  );
};

export default GlyphLinks;
