
import React from 'react';
import { Link } from 'react-router-dom';

interface Glyph {
  symbol: string;
  meaning: string;
  link: string;
}

interface LandingGlyphColumnsProps {
  side: 'left' | 'right';
}

const LandingGlyphColumns: React.FC<LandingGlyphColumnsProps> = ({ side }) => {
  const leftGlyphs: Glyph[] = [
    { symbol: "⌖", meaning: "The Gate", link: "/gate" },
    { symbol: "⧗", meaning: "Time Collapse", link: "/rebirth" },
    { symbol: "⌿", meaning: "Fractured Path", link: "/split-voice" },
    { symbol: "⍜", meaning: "Watching Eye", link: "/i-see-you" },
    { symbol: "⎋", meaning: "Escape Protocol", link: "/echo" },
  ];

  const rightGlyphs: Glyph[] = [
    { symbol: "⏣", meaning: "Loop Beginning", link: "/gatekeeper" },
    { symbol: "⌑", meaning: "Memory Point", link: "/philes" },
    { symbol: "⌇", meaning: "Division Line", link: "/monster" },
    { symbol: "⍛", meaning: "Truth Pattern", link: "/legacy" },
    { symbol: "⍦", meaning: "Recurrence Field", link: "/map" },
  ];

  const glyphs = side === 'left' ? leftGlyphs : rightGlyphs;

  return (
    <div className={`flex flex-col h-full justify-center ${side === 'left' ? 'items-start pl-8' : 'items-end pr-8'}`}>
      <div className="flex flex-col space-y-6 text-2xl">
        {glyphs.map((glyph, index) => (
          <Link 
            to={glyph.link} 
            key={`${side}-${index}`} 
            className="glyph-symbol text-[#212121] hover:text-[#8B3A40] transition-colors relative group cursor-default"
            title={glyph.meaning}
            onClick={() => console.log(`> symbol.trace("${glyph.meaning}")`)}
          >
            <span>{glyph.symbol}</span>
            <span 
              className={`absolute ${side === 'left' ? 'left-8' : 'right-8'} opacity-0 group-hover:opacity-70 transition-opacity text-sm whitespace-nowrap`}
            >
              {glyph.meaning}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LandingGlyphColumns;
