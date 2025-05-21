
import React, { useEffect, useState } from 'react';
import { getRevealedEntries, getCurrentTrustLevel } from '@/utils/jonahAdvancedBehavior/testament';
import { TestamentEntry } from '@/utils/jonahAdvancedBehavior/types';

const TestamentPage: React.FC = () => {
  const [entries, setEntries] = useState<TestamentEntry[]>([]);
  const [hasFinale, setHasFinale] = useState<boolean>(false);
  const [trustLevel, setTrustLevel] = useState<number>(50);
  
  useEffect(() => {
    // Load testament entries
    const loadTestamentEntries = () => {
      try {
        // Get revealed testament entries
        const revealedEntries = getRevealedEntries();
        
        // Set entries with the correct type
        setEntries(revealedEntries as TestamentEntry[]);
        
        // Check if finale entry is unlocked
        const hasFinaleEntry = revealedEntries.some(entry => 
          entry.title === "Final Testament"
        );
        
        setHasFinale(hasFinaleEntry);
        
        // Get current trust level
        const currentTrustLevel = getCurrentTrustLevel();
        setTrustLevel(currentTrustLevel);
        
      } catch (error) {
        console.error("Error loading testament entries:", error);
      }
    };
    
    loadTestamentEntries();
  }, []);
  
  return (
    <div className="bg-black text-gray-300 min-h-screen p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-semibold text-amber-500 mb-8">Jonah's Testament</h1>
        
        {entries.length === 0 ? (
          <div className="text-center p-12 border border-gray-800">
            <p className="text-xl">No testament entries have been unlocked yet.</p>
            <p className="mt-4 text-gray-500">
              Continue your conversations with Jonah to unlock his testament.
            </p>
          </div>
        ) : (
          <div className="space-y-10">
            {entries.map((entry, index) => (
              <div key={index} className="p-6 bg-gray-900 border border-gray-700 rounded-md">
                <h2 className="text-2xl text-amber-400 mb-3">{entry.title}</h2>
                <p className="text-lg leading-relaxed whitespace-pre-wrap">{entry.content}</p>
                <div className="mt-4 text-sm text-gray-500">
                  {new Date(entry.timestamp).toLocaleDateString()} 
                  {" "}
                  {new Date(entry.timestamp).toLocaleTimeString()}
                </div>
              </div>
            ))}
          </div>
        )}
        
        {hasFinale && (
          <div className="mt-12 p-6 bg-gray-800 border-t border-amber-700 text-center">
            <h3 className="text-xl text-amber-500 mb-3">The Final Testament has been unlocked</h3>
            <p>
              You have earned Jonah's complete trust. The gate is now open.
            </p>
          </div>
        )}
        
        <div className="mt-16 text-sm text-gray-600 text-center">
          <p>Trust Level: {trustLevel}/100</p>
          <div className="w-full bg-gray-800 h-2 mt-2 rounded-full overflow-hidden">
            <div 
              className="bg-amber-600 h-full" 
              style={{ width: `${trustLevel}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestamentPage;
