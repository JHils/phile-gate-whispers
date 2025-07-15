
import React, { useState, useEffect } from 'react';
import { usePhaseInfinity } from '@/hooks/usePhaseInfinity';
import { DiaryEntry } from '@/services/phaseInfinityService';

const JonahDiary: React.FC = () => {
  const { diaryEntries, is444Time } = usePhaseInfinity();
  const [selectedEntry, setSelectedEntry] = useState<DiaryEntry | null>(null);
  const [hasSeenEntry, setHasSeenEntry] = useState<Set<string>>(new Set());

  // Auto-select the most recent entry that hasn't been seen
  useEffect(() => {
    const unseenEntry = diaryEntries.find(entry => !hasSeenEntry.has(entry.id));
    if (unseenEntry && !selectedEntry) {
      setSelectedEntry(unseenEntry);
    }
  }, [diaryEntries, hasSeenEntry, selectedEntry]);

  const handleEntryView = (entry: DiaryEntry) => {
    setSelectedEntry(entry);
    setHasSeenEntry(prev => new Set([...prev, entry.id]));
    
    // If ephemeral, remove from local view after 30 seconds
    if (entry.is_ephemeral) {
      setTimeout(() => {
        setSelectedEntry(null);
      }, 30000);
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const entryTime = new Date(timestamp);
    const diffMs = now.getTime() - entryTime.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) return `${diffDays}d ago`;
    if (diffHours > 0) return `${diffHours}h ago`;
    if (diffMins > 0) return `${diffMins}m ago`;
    return 'just now';
  };

  const getEmotionalColor = (context?: string) => {
    switch (context) {
      case 'mystical': return 'text-dust-blue';
      case 'melancholic': return 'text-dust-orange';
      case 'transformative': return 'text-dust-green';
      case 'chaotic': return 'text-dust-red';
      default: return 'text-silver';
    }
  };

  return (
    <div className="min-h-screen bg-black text-silver font-typewriter p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl text-dust-red mb-8 animate-subtle-flicker">
          JONAH'S MEMORY FRAGMENTS
          {is444Time && <span className="text-dust-blue ml-4">[4:44 - THE VEIL IS THIN]</span>}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Entry List */}
          <div className="lg:col-span-1">
            <h2 className="text-dust-green mb-4">MEMORY INDEX</h2>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {diaryEntries.map((entry) => (
                <div
                  key={entry.id}
                  className={`p-3 border cursor-pointer transition-colors ${
                    selectedEntry?.id === entry.id
                      ? 'border-dust-red bg-dust-red/10'
                      : 'border-gray-800 hover:border-dust-orange'
                  } ${hasSeenEntry.has(entry.id) ? 'opacity-50' : ''}`}
                  onClick={() => handleEntryView(entry)}
                >
                  <div className="text-sm text-dust-orange">
                    {entry.entry_type.replace('_', ' ').toUpperCase()}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {formatTimeAgo(entry.created_at)}
                    {entry.is_ephemeral && (
                      <span className="text-dust-red ml-2">[EPHEMERAL]</span>
                    )}
                  </div>
                  <div className="text-sm mt-2 truncate">
                    {entry.entry_content.substring(0, 50)}...
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Entry Content */}
          <div className="lg:col-span-2">
            {selectedEntry ? (
              <div className="border border-dust-green p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg text-dust-green">
                    {selectedEntry.entry_type.replace('_', ' ').toUpperCase()}
                  </h3>
                  <div className="text-sm text-gray-500">
                    {formatTimeAgo(selectedEntry.created_at)}
                  </div>
                </div>

                <div className={`text-lg leading-relaxed mb-4 ${getEmotionalColor(selectedEntry.emotional_context)}`}>
                  {selectedEntry.entry_content}
                </div>

                {selectedEntry.emotional_context && (
                  <div className="text-sm text-dust-orange mb-4">
                    Emotional Context: {selectedEntry.emotional_context}
                  </div>
                )}

                <div className="text-xs text-gray-600">
                  Importance Score: {selectedEntry.importance_score}/100
                  {selectedEntry.is_ephemeral && (
                    <span className="text-dust-red ml-4">
                      This memory will fade if not preserved...
                    </span>
                  )}
                </div>

                {selectedEntry.expires_at && (
                  <div className="text-xs text-dust-red mt-2">
                    Expires: {new Date(selectedEntry.expires_at).toLocaleString()}
                  </div>
                )}
              </div>
            ) : (
              <div className="border border-gray-800 p-6 text-center text-gray-500">
                <div className="text-lg mb-2">No memory selected</div>
                <div className="text-sm">
                  Choose a fragment from the memory index to experience Jonah's thoughts.
                </div>
              </div>
            )}
          </div>
        </div>

        {diaryEntries.length === 0 && (
          <div className="text-center text-gray-500 mt-12">
            <div className="text-lg mb-2">No memories recorded yet</div>
            <div className="text-sm">
              Interact with the system to unlock Jonah's diary entries.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JonahDiary;
