
import React from 'react';
import OSPageTemplate from '@/components/fracturedOS/OSPageTemplate';
import WhisperWall from '@/components/community/WhisperWall';
import { useUserProgression } from '@/hooks/useUserProgression';
import { useTrackingSystem } from '@/hooks/useTrackingSystem';

const Campfire: React.FC = () => {
  const { progression } = useUserProgression();
  const { trackEvent } = useTrackingSystem();

  React.useEffect(() => {
    trackEvent('visited_campfire');
    console.log('%cEntering the digital campfire...', 'color: #f97316; font-style: italic;');
  }, [trackEvent]);

  return (
    <OSPageTemplate 
      title="CAMPFIRE.exe" 
      subtitle="Community Gathering Space"
      category="MEMORY"
    >
      <div className="space-y-8">
        {/* Welcome message */}
        <div className="bg-orange-900/20 border border-orange-500/30 rounded-lg p-6 text-orange-300 font-mono">
          <h2 className="text-orange-400 text-xl mb-4">◉ Welcome to the Digital Campfire</h2>
          <p className="mb-4">
            This is a safe space for fellow travelers navigating fractured identities. 
            Share your truth, read others' experiences, and know you're not alone in the healing process.
          </p>
          
          {/* User role display */}
          <div className="mt-4 pt-4 border-t border-orange-500/20">
            <div className="text-orange-500 text-sm">Your Current Role:</div>
            <div className="text-orange-400 font-bold capitalize">{progression.role}</div>
            <div className="text-orange-300 text-sm mt-1">
              Experience: {progression.experience} / {progression.nextRoleThreshold}
            </div>
            <div className="w-full bg-orange-900/30 rounded-full h-2 mt-2">
              <div 
                className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                style={{ 
                  width: `${Math.min(100, (progression.experience / progression.nextRoleThreshold) * 100)}%` 
                }}
              />
            </div>
          </div>
        </div>

        {/* Role abilities */}
        <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 text-blue-300 font-mono">
          <div className="text-blue-400 font-bold mb-2">Your Abilities:</div>
          <ul className="text-sm space-y-1">
            {progression.specialAbilities.map((ability, index) => (
              <li key={index} className="flex items-center">
                <span className="text-blue-500 mr-2">▸</span>
                {ability}
              </li>
            ))}
          </ul>
        </div>

        {/* Whisper Wall */}
        <WhisperWall />

        {/* Community guidelines */}
        <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4 text-green-300 font-mono text-sm">
          <div className="text-green-400 font-bold mb-2">◉ Sacred Guidelines</div>
          <ul className="space-y-1">
            <li>• Respect others' journeys and trauma</li>
            <li>• No medical advice - this is peer support only</li>
            <li>• Anonymity is sacred here</li>
            <li>• What's shared here, stays here</li>
            <li>• Be kind to yourself and others</li>
          </ul>
        </div>

        {/* Console integration notice */}
        <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4 text-purple-300 font-mono text-sm">
          <div className="text-purple-400 font-bold mb-2">◉ Console Integration</div>
          <p>Advanced community features available through console:</p>
          <div className="mt-2 space-y-1 text-purple-400">
            <div>• <code>campfire.whisper("message")</code> - Send anonymous whisper</div>
            <div>• <code>campfire.mood()</code> - Log current emotional state</div>
            <div>• <code>campfire.support()</code> - Find crisis resources</div>
          </div>
        </div>
      </div>
    </OSPageTemplate>
  );
};

export default Campfire;
