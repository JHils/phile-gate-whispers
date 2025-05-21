
import React, { useEffect, useState } from 'react';
import { useJonahMemory } from '@/hooks/useJonahMemory';
import { getAllTestaments, getRevealedEntries } from '@/utils/jonahAdvancedBehavior/testament';
import { TestamentEntry } from '@/utils/jonahAdvancedBehavior/types';

const TestamentPage: React.FC = () => {
  const [testaments, setTestaments] = useState<TestamentEntry[]>([]);
  const [selectedTestament, setSelectedTestament] = useState<TestamentEntry | null>(null);
  const [testamentIndex, setTestamentIndex] = useState<number>(0);
  const memory = useJonahMemory();
  
  // Load testaments on component mount
  useEffect(() => {
    // Check if the user has enough trust to see testaments
    if (memory.trustLevelScore >= 20) {
      const availableTestaments = getRevealedEntries();
      setTestaments(availableTestaments);
      
      if (availableTestaments.length > 0) {
        setSelectedTestament(availableTestaments[0]);
      }
    }
  }, [memory.trustLevelScore]);
  
  // Handle changing the selected testament
  const handleTestamentChange = (direction: 'prev' | 'next') => {
    if (testaments.length === 0) return;
    
    let newIndex = testamentIndex;
    
    if (direction === 'prev') {
      newIndex = (testamentIndex - 1 + testaments.length) % testaments.length;
    } else {
      newIndex = (testamentIndex + 1) % testaments.length;
    }
    
    setTestamentIndex(newIndex);
    setSelectedTestament(testaments[newIndex]);
  };
  
  return (
    <div className="testament-page bg-stone-900 text-stone-300 min-h-screen p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-serif mb-8 border-b border-stone-700 pb-4">The Testament of Jonah</h1>
        
        {memory.trustLevelScore < 20 ? (
          <div className="bg-stone-800 p-8 rounded-md">
            <h2 className="text-2xl mb-4">Access Denied</h2>
            <p>
              You do not yet have sufficient trust to access these records. 
              Continue your exploration and interactions with Jonah to unlock this content.
            </p>
          </div>
        ) : testaments.length === 0 ? (
          <div className="bg-stone-800 p-8 rounded-md">
            <h2 className="text-2xl mb-4">No Testaments Revealed</h2>
            <p>
              You have not yet discovered any of Jonah's testaments. 
              Continue exploring and increase your trust level to unlock these revelations.
            </p>
          </div>
        ) : (
          <>
            <div className="navigation flex justify-between mb-6">
              <button 
                onClick={() => handleTestamentChange('prev')}
                className="px-4 py-2 bg-stone-700 hover:bg-stone-600 rounded"
              >
                Previous
              </button>
              <span className="px-4 py-2">
                {testamentIndex + 1} of {testaments.length}
              </span>
              <button 
                onClick={() => handleTestamentChange('next')}
                className="px-4 py-2 bg-stone-700 hover:bg-stone-600 rounded"
              >
                Next
              </button>
            </div>
            
            {selectedTestament && (
              <div className="bg-stone-800 p-8 rounded-md">
                <h2 className="text-2xl mb-4 font-serif">{selectedTestament.title}</h2>
                <div className="content mb-6 whitespace-pre-wrap font-serif leading-relaxed">
                  {selectedTestament.content}
                </div>
                <div className="meta text-stone-500 text-sm">
                  Record ID: {selectedTestament.id}
                  <br />
                  Date: {new Date(selectedTestament.timestamp).toLocaleDateString()}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default TestamentPage;
