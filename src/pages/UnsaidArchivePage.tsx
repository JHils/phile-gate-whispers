
import React, { useState, useEffect } from 'react';
import { Interpretation } from '@/utils/jonahAdvancedBehavior/types';

const UnsaidArchivePage: React.FC = () => {
  const [interpretations, setInterpretations] = useState<Interpretation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    async function fetchInterpretations() {
      try {
        setLoading(true);
        
        // Mock data - in a real app this would be an API call
        const mockData: Interpretation[] = [
          {
            id: 'interp_001',
            phrase: 'The mirror shows only what you want to see',
            meaning: 'Reality is subjective, defined by our own perceptions',
            discovered: true,
            timestamp: Date.now()
          },
          {
            id: 'interp_002',
            phrase: 'Echoes linger long after their source is gone',
            meaning: 'Our actions have lasting consequences beyond our understanding',
            discovered: true,
            timestamp: Date.now() - 86400000 // 1 day ago
          }
        ];
        
        // Set the interpretations using the typed array
        setInterpretations(mockData);
      } catch (err) {
        console.error('Failed to fetch interpretations:', err);
        setError('Failed to load interpretations');
      } finally {
        setLoading(false);
      }
    }
    
    fetchInterpretations();
  }, []);
  
  return (
    <div className="bg-gray-900 min-h-screen text-gray-200 p-8">
      <h1 className="text-3xl font-serif mb-8">The Unsaid Archive</h1>
      
      {loading && <p className="text-gray-400">Loading interpretations...</p>}
      {error && <p className="text-red-400">{error}</p>}
      
      <div className="space-y-6 mt-6">
        {interpretations.map(interpretation => (
          <div key={interpretation.id} className="bg-gray-800 p-6 rounded-md">
            <h3 className="text-xl text-amber-400 mb-2">"{interpretation.phrase}"</h3>
            <p className="text-gray-300 italic">{interpretation.meaning}</p>
            <div className="text-xs text-gray-500 mt-4">
              Discovered: {new Date(interpretation.timestamp).toLocaleDateString()}
            </div>
          </div>
        ))}
        
        {interpretations.length === 0 && !loading && !error && (
          <p className="text-gray-400">No interpretations have been discovered yet.</p>
        )}
      </div>
    </div>
  );
};

export default UnsaidArchivePage;
