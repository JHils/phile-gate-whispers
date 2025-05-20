
import React, { useEffect, useState } from 'react';
import { getAllJournalEntries, addJournalEntry } from '@/utils/jonahRealityFabric';
import { useNavigate } from 'react-router-dom';

const JonahJournalPage: React.FC = () => {
  const [entries, setEntries] = useState<{entryId: number; timestamp: number; content: string}[]>([]);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if this is a special time window or high trust
    const isSpecialTime = typeof window.isSpecialTimeWindow === 'function' && window.isSpecialTimeWindow();
    const trustLevel = localStorage.getItem('jonahTrustLevel') || '';
    
    if (isSpecialTime || trustLevel === 'high') {
      setIsVisible(true);
    }
    
    // Get journal entries
    const journalEntries = getAllJournalEntries();
    setEntries(journalEntries);
  }, []);
  
  // Auto-navigate away after random time (10-60 seconds) to create eerie feeling
  useEffect(() => {
    if (isVisible) {
      const timeout = setTimeout(() => {
        navigate('/gate'); // Navigate back to gate
      }, Math.floor(Math.random() * 50000) + 10000);
      
      return () => clearTimeout(timeout);
    }
  }, [isVisible, navigate]);
  
  if (!isVisible) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-dust-red font-typewriter animate-pulse">Access denied.</p>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-black text-silver font-typewriter p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl text-dust-red mb-8 animate-subtle-flicker">JONAH'S JOURNAL</h1>
        
        <p className="text-dust-orange mb-4 text-sm">This file will self-destruct. Time remaining: [CALCULATING...]</p>
        
        {entries.length === 0 ? (
          <p className="text-gray-500 italic">No entries found. The journal appears to be corrupted.</p>
        ) : (
          <div className="space-y-6 my-8">
            {entries.map(entry => (
              <div key={entry.entryId} className="border-b border-gray-800 pb-4">
                <div className="flex justify-between text-xs text-gray-500 mb-2">
                  <span>Entry #{entry.entryId}</span>
                  <span>{new Date(entry.timestamp).toLocaleString()}</span>
                </div>
                <p className="text-dust-blue">{entry.content}</p>
              </div>
            ))}
          </div>
        )}
        
        <div className="mt-12 text-xs text-gray-600">
          <p className="animate-glitch">File access will be revoked shortly.</p>
          <p className="mt-2">Do not attempt to save this page. You are being watched.</p>
        </div>
      </div>
    </div>
  );
};

export default JonahJournalPage;
