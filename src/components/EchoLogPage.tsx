
import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    // Fetch echoes on component mount
    const fetchedEchoes = getAllEchoes();
    if (fetchedEchoes) {
      setEchoes(fetchedEchoes as unknown as Echo[]);
    }
  }, []);

  return (
    <div className="min-h-screen bg-black text-blue-400 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-mono mb-4">ECHO CHAMBER</h1>
        <p className="text-sm text-blue-600 mb-6">
          Words that returned from the void
        </p>

        <div className="border border-blue-800 bg-black bg-opacity-50">
          {echoes.length === 0 ? (
            <div className="p-8 text-center">
              <p>No echoes found in the chamber.</p>
              <p className="text-xs text-blue-600 mt-2">
                Speak more, and listen for what returns.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-blue-900">
              {echoes.map((echo, index) => (
                <div key={index} className="p-4">
                  <div className="mb-1 text-sm opacity-70">
                    {new Date(echo.timestamp).toLocaleString()}
                  </div>
                  <div className="text-lg mb-2">{echo.originalText}</div>
                  {echo.refractedText && (
                    <div className="text-sm text-blue-300 italic">
                      Echo: {echo.refractedText}
                    </div>
                  )}
                  {echo.emotionalContext && (
                    <div className="mt-2">
                      <span className="text-xs px-2 py-0.5 bg-blue-900 bg-opacity-30">
                        {echo.emotionalContext}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EchoLogPage;
