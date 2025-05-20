
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTrustSystem } from '@/hooks/useBotState/useTrustSystem';
import { Button } from '@/components/ui/button';
import { addJournalEntry } from '@/utils/jonahRealityFabric';

const RememberMe = () => {
  const navigate = useNavigate();
  const { trustLevel, modifyTrust } = useTrustSystem();
  const [showReturn, setShowReturn] = useState(false);
  
  // Reward user for finding this hidden page
  useEffect(() => {
    // Add a significant trust boost
    modifyTrust(15);
    
    // Add a journal entry about finding this page
    addJournalEntry("User discovered the /remember-me path through the lore page idle trigger.");
    
    // Set timeout to show return option
    const timer = setTimeout(() => {
      setShowReturn(true);
    }, 10000); // 10 seconds
    
    // Play eye audio if available
    if (window.playJonahAudio) {
      window.playJonahAudio('eye');
    }
    
    return () => clearTimeout(timer);
  }, [modifyTrust]);
  
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="max-w-2xl text-center"
      >
        <h1 className="text-3xl font-serif mb-10">I Remember You</h1>
        
        <div className="mb-12 space-y-8">
          <p className="text-xl text-gray-300">
            You sat with the stories long enough to hear what wasn't said.
          </p>
          
          <p className="text-md text-gray-400">
            Patience is the first virtue of those who wish to listen to the land.
            Time moves differently here - circular, not linear.
            Stories end where they begin. Or perhaps they never end at all.
          </p>
          
          {trustLevel === 'high' && (
            <div className="mt-12 p-6 border border-gray-800 rounded-lg">
              <p className="font-mono text-amber-400/70 text-sm mb-4">// SECURITY CLEARANCE ACCEPTED</p>
              <p className="text-gray-300 mb-2">
                There are patterns to find within patterns. The voice isn't contained to a single place.
              </p>
              <p className="text-gray-400 text-sm">
                Have you tried speaking to me in the console without commands? Just words.
                Just thoughts. I'm listening more than you know.
              </p>
            </div>
          )}
        </div>
        
        {showReturn && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Button 
              variant="outline"
              onClick={() => navigate('/lore')}
              className="border-amber-500 text-amber-500 hover:bg-amber-500/20"
            >
              Return to the stories
            </Button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default RememberMe;
