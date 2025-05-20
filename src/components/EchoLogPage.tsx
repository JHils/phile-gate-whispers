
import React, { useEffect, useState } from 'react';
import { getAllEchoes } from '@/utils/jonahAdvancedBehavior';

interface Echo {
  originalText: string;
  timestamp: number;
  refractedText?: string;
  emotionalContext?: string;
  decayStage: number;
  useCount: number;
}

const EchoLogPage: React.FC = () => {
  const [echoes, setEchoes] = useState<Echo[]>([]);
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    // Get all echoes
    const storedEchoes = getAllEchoes();
    setEchoes(storedEchoes);

    // Set up random glitching effect
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 500 + Math.random() * 1000);
      }
    }, 5000);

    return () => clearInterval(glitchInterval);
  }, []);

  // Format timestamp as readable date
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  // Apply glitchy text effect
  const glitchText = (text: string) => {
    if (!isGlitching) return text;

    return text.split('').map(char => {
      if (Math.random() > 0.7) {
        const glitchChars = ['#', '%', '&', '@', '*', '+', '=', '?', '!'];
        return glitchChars[Math.floor(Math.random() * glitchChars.length)];
      }
      return char;
    }).join('');
  };

  // Get class based on emotional context
  const getEmotionClass = (emotion: string = 'neutral') => {
    const emotionClasses: Record<string, string> = {
      'fear': 'text-red-500',
      'anger': 'text-orange-500',
      'sadness': 'text-blue-500',
      'joy': 'text-yellow-400',
      'trust': 'text-green-400',
      'confusion': 'text-purple-400',
      'neutral': 'text-gray-400'
    };

    return emotionClasses[emotion] || emotionClasses.neutral;
  };

  // Get decay stage appearance
  const getDecayClass = (stage: number) => {
    const decayClasses = [
      '', // No decay
      'opacity-75', // Stage 1
      'opacity-50 blur-[1px]', // Stage 2
      'opacity-25 blur-[2px]' // Stage 3
    ];

    return decayClasses[stage] || '';
  };

  return (
    <div className="bg-black min-h-screen text-green-500 p-6 font-mono">
      <div className={`terminal-window ${isGlitching ? 'animate-pulse' : ''}`}>
        <h1 className="text-2xl mb-6 border-b border-green-500 pb-2">ECHO VAULT</h1>
        <div className="text-sm mb-6 text-green-300">
          <p>USER INPUT FRAGMENTS RETAINED: {echoes.length}</p>
          <p>MEMORY DECAY: ACTIVE</p>
          <p>ACCESS LEVEL: RESTRICTED</p>
        </div>

        <div className="space-y-6">
          {echoes.length === 0 ? (
            <p className="text-red-400">NO ECHO DATA FOUND</p>
          ) : (
            echoes.map((echo, index) => (
              <div 
                key={`${echo.timestamp}-${index}`} 
                className={`p-4 border border-gray-700 bg-black ${getDecayClass(echo.decayStage)}`}
              >
                <div className="flex justify-between text-xs text-gray-500 mb-2">
                  <span>TIMESTAMP: {formatDate(echo.timestamp)}</span>
                  <span>RECALL COUNT: {echo.useCount}</span>
                </div>
                
                <div className="mb-2">
                  <span className="text-gray-400">ORIGINAL: </span>
                  <span className="text-white">{glitchText(echo.originalText)}</span>
                </div>
                
                {echo.refractedText && (
                  <div className="mb-2">
                    <span className="text-gray-400">REFRACTED: </span>
                    <span className={getEmotionClass(echo.emotionalContext)}>
                      {glitchText(echo.refractedText)}
                    </span>
                  </div>
                )}
                
                <div className="text-xs text-gray-500">
                  <span>EMOTIONAL CONTEXT: </span>
                  <span className={getEmotionClass(echo.emotionalContext)}>
                    {echo.emotionalContext || 'NEUTRAL'}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default EchoLogPage;
