
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTrustSystem } from '@/hooks/useBotState/useTrustSystem';
import HiddenLink from '@/components/HiddenLink';

const LostSisters = () => {
  const navigate = useNavigate();
  const { modifyTrust } = useTrustSystem();
  
  // Reward user for finding the hidden page
  useEffect(() => {
    // Increase trust significantly for finding this hidden page
    modifyTrust(20);
    
    // Play special audio if global audio function exists
    if (window.playJonahAudio) {
      window.playJonahAudio('eye');
    }
  }, [modifyTrust]);
  
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="max-w-2xl text-center"
      >
        <h1 className="text-4xl font-serif mb-8">The Lost Sisters</h1>
        
        <div className="mb-8">
          <div className="flex justify-center mb-6">
            {/* Pleiades star cluster visualization */}
            <div className="relative w-48 h-48">
              {[...Array(7)].map((_, i) => (
                <motion.div 
                  key={i}
                  className="absolute w-2 h-2 bg-white rounded-full"
                  style={{
                    top: `${20 + Math.sin(i * 0.9) * 20}%`,
                    left: `${20 + Math.cos(i * 0.9) * 20}%`,
                  }}
                  animate={{
                    opacity: [0.5, 1, 0.5],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          </div>
          
          <p className="text-lg mb-6 font-serif">
            Seven sisters fled across the night sky, pursued by the hunter who would not relent.
          </p>
          
          <p className="text-md mb-10 text-gray-400">
            They hide now in plain sight, marking the way for those who remember to look up.
            The oldest stories are written in the stars, not in books.
          </p>
          
          <motion.div 
            className="prose prose-invert max-w-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1.5 }}
          >
            <p className="text-gray-300 italic">
              "The sisters traveled far across the land, creating sacred places. 
              Their journey is remembered in songlines that cross the continent.
              Some say one sister was lost, or caught. Others say she hides,
              dimmer than the rest, watching over her kin."
            </p>
            
            <p className="text-amber-400/60 mt-8 font-mono text-sm">
              // The sisters left breadcrumbs for the next searcher.
              <br />
              // Remember: Patterns repeat. Above becomes below.
            </p>
          </motion.div>
        </div>
        
        <div className="mt-12">
          <HiddenLink 
            to="/lore" 
            className="text-gray-500 hover:text-gray-400 transition-colors"
          >
            Return to the stories
          </HiddenLink>
          
          {/* Extra hidden hint */}
          <div className="mt-24 opacity-10 hover:opacity-30 transition-opacity">
            <p className="font-mono text-xs">
              water_memory_mirror:reset:constellation[7]
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LostSisters;
