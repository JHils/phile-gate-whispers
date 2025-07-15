
import React, { useState } from 'react';
import { usePhaseInfinity } from '@/hooks/usePhaseInfinity';
import { UserMask } from '@/services/phaseInfinityService';

const MaskSystem: React.FC = () => {
  const { userMasks, activateMask } = usePhaseInfinity();
  const [selectedMask, setSelectedMask] = useState<UserMask | null>(null);

  const handleMaskActivation = async (maskId: string) => {
    const success = await activateMask(maskId);
    if (success) {
      console.log(`%c/become ${maskId} - Transformation complete`, "color: #22c55e; font-style: italic;");
    }
  };

  const getMaskDescription = (maskId: string): string => {
    const descriptions: Record<string, string> = {
      'seeker': 'Eyes that pierce the veil, always searching for hidden truths.',
      'echoist': 'A voice that reverberates with the whispers of the past.',
      'fractured': 'Broken into pieces, each reflecting a different reality.',
      'dreamer': 'Lost in visions that might be memories or prophecies.',
      'void_touched': 'Marked by contact with the spaces between thoughts.',
      'gatekeeper': 'Guardian of thresholds between what is and what could be.',
      'mirror_walker': 'Able to step between reflections and realities.',
      'temporal': 'Unstuck in time, experiencing all moments simultaneously.',
      'witness': 'Silent observer of the patterns others cannot see.',
      'reborn': 'Death and rebirth, an endless cycle of transformation.'
    };
    
    return descriptions[maskId] || 'A face unknown, purpose unclear.';
  };

  const getMaskVisualEffects = (mask: UserMask): React.CSSProperties => {
    const visualProps = mask.visual_properties || {};
    return {
      filter: visualProps.filter || 'none',
      textShadow: visualProps.glow || 'none',
      borderColor: visualProps.borderColor || '#8B3A40'
    };
  };

  return (
    <div className="min-h-screen bg-black text-silver font-typewriter p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl text-dust-red mb-8 animate-subtle-flicker">
          IDENTITY MATRIX
        </h1>

        <div className="mb-8 text-dust-orange">
          <p>Each mask is a fragment of possibility, a face you might wear in the spaces between realities.</p>
          <p className="mt-2 text-sm text-gray-500">
            Use the command: <code className="text-dust-green">/become [mask_id]</code> to transform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userMasks.map((mask) => (
            <div
              key={mask.id}
              className={`border p-6 cursor-pointer transition-all duration-300 ${
                mask.is_active
                  ? 'border-dust-green bg-dust-green/10 shadow-lg'
                  : 'border-gray-800 hover:border-dust-orange'
              }`}
              style={getMaskVisualEffects(mask)}
              onClick={() => setSelectedMask(mask)}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg text-dust-green">
                  {mask.mask_name.toUpperCase()}
                </h3>
                {mask.is_active && (
                  <span className="text-xs text-dust-green bg-dust-green/20 px-2 py-1 rounded">
                    ACTIVE
                  </span>
                )}
              </div>

              <div className="text-sm text-silver mb-4">
                {getMaskDescription(mask.mask_id)}
              </div>

              <div className="text-xs text-dust-orange mb-4">
                Unlocked via: {mask.unlock_trigger}
              </div>

              <div className="text-xs text-gray-500">
                Acquired: {new Date(mask.unlocked_at).toLocaleDateString()}
              </div>

              {!mask.is_active && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMaskActivation(mask.mask_id);
                  }}
                  className="mt-4 w-full bg-dust-red/20 border border-dust-red text-dust-red py-2 px-4 hover:bg-dust-red/30 transition-colors"
                >
                  BECOME
                </button>
              )}
            </div>
          ))}
        </div>

        {userMasks.length === 0 && (
          <div className="text-center text-gray-500 mt-12">
            <div className="text-lg mb-2">No masks unlocked</div>
            <div className="text-sm">
              Explore the system and complete challenges to unlock new identities.
            </div>
          </div>
        )}

        {/* Mask Detail Modal */}
        {selectedMask && (
          <div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
            onClick={() => setSelectedMask(null)}
          >
            <div
              className="bg-black border border-dust-green max-w-2xl w-full m-4 p-6"
              onClick={(e) => e.stopPropagation()}
              style={getMaskVisualEffects(selectedMask)}
            >
              <h2 className="text-xl text-dust-green mb-4">
                {selectedMask.mask_name.toUpperCase()}
              </h2>

              <div className="text-silver mb-6">
                {getMaskDescription(selectedMask.mask_id)}
              </div>

              {selectedMask.dialogue_modifiers && (
                <div className="mb-6">
                  <h3 className="text-dust-orange mb-2">Dialogue Modifiers:</h3>
                  <div className="text-sm text-gray-300">
                    {JSON.stringify(selectedMask.dialogue_modifiers, null, 2)}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-dust-orange">Unlock Trigger:</span>
                  <div className="text-gray-300">{selectedMask.unlock_trigger}</div>
                </div>
                <div>
                  <span className="text-dust-orange">Status:</span>
                  <div className={selectedMask.is_active ? 'text-dust-green' : 'text-gray-300'}>
                    {selectedMask.is_active ? 'ACTIVE' : 'DORMANT'}
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                {!selectedMask.is_active && (
                  <button
                    onClick={() => handleMaskActivation(selectedMask.mask_id)}
                    className="bg-dust-red/20 border border-dust-red text-dust-red py-2 px-4 hover:bg-dust-red/30 transition-colors"
                  >
                    BECOME THIS MASK
                  </button>
                )}
                <button
                  onClick={() => setSelectedMask(null)}
                  className="border border-gray-600 text-gray-300 py-2 px-4 hover:bg-gray-600/20 transition-colors"
                >
                  CLOSE
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MaskSystem;
