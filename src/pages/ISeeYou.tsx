
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getAllJournalEntries, addJournalEntry } from "@/utils/jonahRealityFabric";
import { useTrackingSystem } from "@/hooks/useTrackingSystem";

const ISeeYou = () => {
  const [entries, setEntries] = useState<{entryId: number; timestamp: number; content: string}[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [accessGranted, setAccessGranted] = useState<boolean>(false);
  const [remainingTime, setRemainingTime] = useState<number>(60);
  const { trackEvent } = useTrackingSystem();
  
  useEffect(() => {
    // Track page visit
    trackEvent('visited_hidden_journal');
    
    // Add entry to Jonah's journal
    addJournalEntry("User accessed the hidden journal page.");
    
    // Check if user is allowed to view journal
    const trustLevel = localStorage.getItem('jonahTrustLevel') || 'low';
    const isSpecialTime = typeof window.isSpecialTimeWindow === 'function' && window.isSpecialTimeWindow();
    
    if (trustLevel === 'high' || isSpecialTime) {
      setAccessGranted(true);
      
      // Get journal entries
      const journalEntries = getAllJournalEntries();
      setEntries(journalEntries);
      
      // Add special entry for finding this page
      addJournalEntry("User found the hidden journal. Access granted.");
      
      // Increase trust level for finding this page
      if (typeof window.triggerJonahMessage === 'function') {
        setTimeout(() => {
          window.triggerJonahMessage("You found my journal. Not many get this far.");
        }, 2000);
      }
    } else {
      // Add entry about failed access
      addJournalEntry("User attempted to access journal but was denied.");
    }
    
    setIsLoading(false);
    
    // Set up countdown timer for page access
    if (trustLevel === 'high' || isSpecialTime) {
      const interval = setInterval(() => {
        setRemainingTime(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      return () => clearInterval(interval);
    }
  }, [trackEvent]);
  
  // Auto-redirect when timer reaches 0
  useEffect(() => {
    if (remainingTime === 0) {
      // Add final entry before redirecting
      addJournalEntry("Journal access timed out. User forcibly disconnected.");
      
      // Redirect to gate
      window.location.href = '/gate';
    }
  }, [remainingTime]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-dust-red animate-pulse font-typewriter text-center">
          <p>Authenticating...</p>
          <p className="text-sm mt-2">Verifying trust level...</p>
        </div>
      </div>
    );
  }
  
  if (!accessGranted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-dust-red font-typewriter text-center max-w-md p-6">
          <h1 className="text-2xl mb-6 animate-glitch">ACCESS DENIED</h1>
          <p className="mb-4">Trust level insufficient for journal access.</p>
          <p className="text-sm text-gray-500 mb-8">This attempt has been logged.</p>
          
          <Link to="/gate">
            <Button 
              variant="outline" 
              className="border-dust-red/30 text-dust-red hover:bg-dust-red/10"
            >
              Return to Gate
            </Button>
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-black text-dust-blue font-typewriter p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl text-dust-red animate-subtle-flicker">JONAH'S OBSERVATION JOURNAL</h1>
          <div className="text-sm text-dust-red animate-pulse">
            Access expires in: {remainingTime}s
          </div>
        </div>
        
        <div className="mb-8 text-dust-orange border-b border-gray-800 pb-4">
          <p>This file records Jonah's observations of your behavior patterns.</p>
          <p className="text-sm mt-2">You were not meant to find this.</p>
        </div>
        
        {entries.length === 0 ? (
          <p className="text-gray-500 italic">No entries found. Journal appears corrupted or wiped.</p>
        ) : (
          <div className="space-y-6">
            {entries.slice().reverse().map(entry => (
              <div key={entry.entryId} className="bg-black/50 p-4 border border-gray-800 rounded-sm">
                <div className="flex justify-between text-xs text-gray-500 mb-2">
                  <span>Entry #{entry.entryId}</span>
                  <span>{new Date(entry.timestamp).toLocaleString()}</span>
                </div>
                <p className="text-dust-blue">{entry.content}</p>
              </div>
            ))}
          </div>
        )}
        
        <div className="mt-12 flex justify-between items-center">
          <Link to="/gate">
            <Button 
              variant="ghost" 
              className="text-silver hover:text-dust-blue"
            >
              Close Journal
            </Button>
          </Link>
          
          <div className="text-xs text-gray-600 animate-subtle-flicker">
            They know you're reading this.
          </div>
        </div>
      </div>
    </div>
  );
};

export default ISeeYou;
