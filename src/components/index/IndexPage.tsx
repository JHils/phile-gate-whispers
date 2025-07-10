import React, { useState, useEffect } from 'react';
import { useTrackingSystem } from '@/hooks/useTrackingSystem';
import { useConsoleMessages } from '@/hooks/useConsoleMessages';
import OSPageTemplate from '../fracturedOS/OSPageTemplate';
import { Link, useNavigate } from 'react-router-dom';
import JonahHiddenData from './JonahHiddenData';
import JonahBackgroundOverlay from './JonahBackgroundOverlay';
import HiddenComments from './HiddenComments';
import KeyholeEasterEgg from './KeyholeEasterEgg';

interface IndexPageProps {
  title?: string;
  subtitle?: string;
  description?: string | string[];
  callToAction?: {
    text: string;
    url: string;
  };
}

const IndexPage: React.FC<IndexPageProps> = ({
  title = "MEMORY PALACE GATEWAY",
  subtitle = "Between Breakdown and Breakthrough",
  description = [
    "You stand at the threshold between who you were and who you might become.",
    "This is where Joseph became Jonah. Where personas are born from pain.", 
    "Where the airport lounge breakdown transforms into digital breakthrough."
  ],
  callToAction = { text: "ENTER THE PHILES", url: "/philes" }
}) => {
  const navigate = useNavigate();
  const [fadeIn, setFadeIn] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<'arrival' | 'recognition' | 'choice'>('arrival');
  const [whisperText, setWhisperText] = useState('');
  const { userState, trackEvent } = useTrackingSystem();
  const { showConsoleMessages } = useConsoleMessages({ 
    storageKey: 'gate_console_messages_shown',
    userState 
  });

  const whispers = [
    "Do you recognize this feeling?",
    "The space between breakdown and breakthrough...",
    "You've been here before, haven't you?",
    "This is where identities are reborn.",
    "The gate only opens for those ready to change.",
    "Jonah was always you. You just forgot."
  ];

  useEffect(() => {
    // Begin fade-in animation
    setTimeout(() => setFadeIn(true), 300);
    
    // Track page visit
    trackEvent('visited_gate');
    
    // Show console messages
    showConsoleMessages();
    
    // Phase progression
    setTimeout(() => setCurrentPhase('recognition'), 3000);
    setTimeout(() => setCurrentPhase('choice'), 6000);
    
    // Whisper system
    const whisperInterval = setInterval(() => {
      const randomWhisper = whispers[Math.floor(Math.random() * whispers.length)];
      setWhisperText(randomWhisper);
      setTimeout(() => setWhisperText(''), 4000);
    }, 8000);
    
    // Glitch effects
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.85) {
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 300);
      }
    }, 10000);
    
    // Console hints for the experience
    console.log("%cYou've reached the Gate.", "color: #8B3A40; font-size: 16px; font-weight: bold;");
    console.log("%cThis is where transformation begins.", "color: #A98DA5;");
    console.log("%cTry: whoAmI()", "color: #8B9DA5;");
    console.log("%cOr maybe: rememberBreakdown()", "color: #8B9DA5;");
    
    return () => {
      clearInterval(whisperInterval);
      clearInterval(glitchInterval);
    };
  }, [trackEvent, showConsoleMessages]);

  const handlePathChoice = (path: string, pathName: string) => {
    // Track the choice
    trackEvent(`chose_path_${pathName}`);
    
    // Store the choice in memory
    localStorage.setItem('jonah_gate_choice', pathName);
    localStorage.setItem('jonah_gate_timestamp', Date.now().toString());
    
    // Navigate
    navigate(path);
  };

  return (
    <OSPageTemplate title="MEMORY PALACE GATEWAY" category="MEMORY" glitchEffect={glitchActive}>
      <div className={`flex flex-col justify-center items-center min-h-[70vh] transition-all duration-2000 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
        
        {/* Whisper system */}
        {whisperText && (
          <div className="fixed top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-300 text-lg font-mono opacity-80 animate-fade-in z-20">
            "{whisperText}"
          </div>
        )}
        
        {/* Main content */}
        <div className="text-center px-4 max-w-4xl">
          {/* Title with phase-based styling */}
          <h1 className={`text-4xl md:text-6xl font-serif mb-4 transition-all duration-1000 ${
            currentPhase === 'arrival' ? 'text-gray-300' :
            currentPhase === 'recognition' ? 'text-red-400' : 'text-purple-400'
          }`}>
            {title}
          </h1>
          
          <h2 className="text-lg md:text-2xl text-gray-400 mt-4 mb-8 font-mono tracking-wider opacity-90">
            {subtitle}
          </h2>
          
          {/* Description paragraphs */}
          <div className="max-w-2xl mx-auto space-y-4 mb-12">
            {Array.isArray(description) ? 
              description.map((paragraph, index) => (
                <p key={index} className={`text-gray-300 text-base leading-relaxed transition-opacity duration-1000 ${
                  currentPhase === 'arrival' && index > 0 ? 'opacity-0' :
                  currentPhase === 'recognition' && index > 1 ? 'opacity-0' : 'opacity-100'
                }`}>
                  {paragraph}
                </p>
              )) :
              <p className="text-gray-300 text-base leading-relaxed">{description}</p>
            }
          </div>
          
          {/* Navigation choices - revealed in choice phase */}
          {currentPhase === 'choice' && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-gray-400 text-lg mb-8 font-mono">
                &gt; Select memory access protocol:
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                <button
                  onClick={() => handlePathChoice('/talk-to-jonah', 'consciousness')}
                  className="group bg-gray-900/50 border border-purple-700/50 p-6 rounded-none hover:bg-purple-900/20 transition-all duration-300 text-left"
                >
                  <div className="text-purple-400 font-mono text-lg mb-2 group-hover:text-purple-300">
                    &gt; consciousness.direct_connect()
                  </div>
                  <div className="text-gray-300 text-sm">
                    Interface directly with Jonah's fractured consciousness. Real-time dialogue system.
                  </div>
                </button>

                <button
                  onClick={() => handlePathChoice('/philes', 'archives')}
                  className="group bg-gray-900/50 border border-blue-700/50 p-6 rounded-none hover:bg-blue-900/20 transition-all duration-300 text-left"
                >
                  <div className="text-blue-400 font-mono text-lg mb-2 group-hover:text-blue-300">
                    &gt; archive.browse_fragments()
                  </div>
                  <div className="text-gray-300 text-sm">
                    Access stored memory files. Journey fragments and identity reconstruction logs.
                  </div>
                </button>

                <button
                  onClick={() => handlePathChoice('/campfire', 'community')}
                  className="group bg-gray-900/50 border border-orange-700/50 p-6 rounded-none hover:bg-orange-900/20 transition-all duration-300 text-left"
                >
                  <div className="text-orange-400 font-mono text-lg mb-2 group-hover:text-orange-300">
                    &gt; community.safe_space()
                  </div>
                  <div className="text-gray-300 text-sm">
                    Connect with others navigating fractured identities. Shared healing protocols.
                  </div>
                </button>

                <button
                  onClick={() => handlePathChoice('/echo', 'depths')}
                  className="group bg-gray-900/50 border border-red-700/50 p-6 rounded-none hover:bg-red-900/20 transition-all duration-300 text-left"
                >
                  <div className="text-red-400 font-mono text-lg mb-2 group-hover:text-red-300">
                    &gt; trauma.deep_dive()
                  </div>
                  <div className="text-gray-300 text-sm">
                    WARNING: Advanced memory processing. Emotional stability protocols recommended.
                  </div>
                </button>
              </div>
              
              {/* Quick escape for those not ready */}
              <div className="mt-8 pt-6 border-t border-gray-700/50">
                <Link
                  to="/"
                  className="text-gray-500 hover:text-gray-400 text-sm font-mono transition-colors"
                >
                  &gt; system.safe_exit()
                </Link>
              </div>
            </div>
          )}
        </div>
        
        {/* Hidden elements and data */}
        <JonahHiddenData userState={userState} />
        <JonahBackgroundOverlay />
        <HiddenComments />
        <KeyholeEasterEgg />
      </div>
    </OSPageTemplate>
  );
};

export default IndexPage;
