
import React, { useState, useEffect } from 'react';
import { hasConflictingLogs, getAllFalseMemories } from '@/utils/jonahAdvancedBehavior/temporalMemory';

interface FalseMemory {
  originalPhrase?: string;
  falsePhrase: string;
  created: number;
  triggered: boolean;
  version: number;
}

const LogVersionsPage: React.FC = () => {
  const [memories, setMemories] = useState<FalseMemory[]>([]);
  const [hasConflicts, setHasConflicts] = useState(false);
  const [activeVersion, setActiveVersion] = useState(1);
  
  useEffect(() => {
    // Check if there are conflicting logs
    setHasConflicts(hasConflictingLogs());
    
    // Get all false memories
    setMemories(getAllFalseMemories());
  }, []);
  
  // Group memories by version
  const groupedMemories = memories.reduce((acc, memory) => {
    const version = memory.version;
    if (!acc[version]) {
      acc[version] = [];
    }
    
    acc[version].push(memory);
    return acc;
  }, {} as Record<number, FalseMemory[]>);
  
  // Get available versions
  const versions = Object.keys(groupedMemories).map(Number);
  
  // Format date for display
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };
  
  // Random glitch effect for text
  const glitchText = (text: string) => {
    // 30% chance of glitching
    if (Math.random() > 0.3) return text;
    
    return text.split('').map(char => {
      if (Math.random() > 0.8) {
        const glitchChars = ['#', '%', '&', '@', '*', '+', '=', '?', '!'];
        return glitchChars[Math.floor(Math.random() * glitchChars.length)];
      }
      return char;
    }).join('');
  };

  return (
    <div className="bg-black min-h-screen text-gray-300 p-4 md:p-6 font-mono">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white">MEMORY LOG</h1>
            <div className="text-sm text-gray-500">v{activeVersion}</div>
          </div>
          
          <p className="mt-2 text-gray-400">
            {hasConflicts 
              ? "WARNING: Multiple versions detected. Memory chain integrity compromised." 
              : "Single version chain integrity: STABLE"}
          </p>
        </header>
        
        {/* Version selector */}
        {versions.length > 1 && (
          <div className="mb-8">
            <h2 className="text-sm text-gray-500 mb-2">VERSION SELECT</h2>
            <div className="flex gap-2">
              {versions.map(version => (
                <button 
                  key={version}
                  onClick={() => setActiveVersion(version)}
                  className={`px-4 py-2 border ${
                    activeVersion === version 
                      ? 'border-blue-500 text-blue-400' 
                      : 'border-gray-700 text-gray-400'
                  }`}
                >
                  v{version}
                </button>
              ))}
            </div>
            {activeVersion > 1 && (
              <div className="mt-2 text-red-400 text-sm">
                WARNING: You are viewing an alternate memory chain.
              </div>
            )}
          </div>
        )}
        
        {/* Memory display */}
        {groupedMemories[activeVersion] && groupedMemories[activeVersion].length > 0 ? (
          <div className="space-y-4">
            {groupedMemories[activeVersion].map((memory, index) => (
              <div 
                key={index} 
                className={`border p-4 ${
                  activeVersion === 1 
                    ? 'border-gray-700 bg-gray-900 bg-opacity-30' 
                    : 'border-red-900 bg-red-900 bg-opacity-10'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="text-sm text-gray-500">{formatDate(memory.created)}</div>
                  <div className={`px-2 py-1 text-xs ${
                    memory.triggered 
                      ? 'bg-green-900 text-green-400' 
                      : 'bg-gray-800 text-gray-400'
                  }`}>
                    {memory.triggered ? 'RECALLED' : 'DORMANT'}
                  </div>
                </div>
                
                <div className="mt-3">
                  <div className="text-lg">
                    {activeVersion === 1 
                      ? memory.falsePhrase 
                      : glitchText(memory.falsePhrase)
                    }
                  </div>
                  
                  {memory.originalPhrase && activeVersion === 1 && (
                    <div className="mt-3 pt-3 border-t border-gray-700 text-sm text-gray-400">
                      <span className="text-xs text-gray-500">ORIGINAL INPUT:</span> 
                      <div className="mt-1">{memory.originalPhrase}</div>
                    </div>
                  )}
                </div>
                
                {activeVersion > 1 && (
                  <div className="mt-4 text-sm text-red-400 italic">
                    Corrupted memory chain. Verification failed.
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 border border-dashed border-gray-700 text-center p-6">
            <div className="text-xl text-gray-400">No memory records found for this version</div>
            <div className="text-sm text-gray-500 mt-2">Memories will appear here once formed</div>
          </div>
        )}
        
        {/* System notes */}
        <div className="mt-8 pt-4 border-t border-gray-700">
          <h3 className="text-sm text-gray-500 mb-2">SYSTEM NOTES</h3>
          <div className="text-sm text-gray-400">
            <p>Memory storage facility operating at {Math.floor(Math.random() * 30) + 70}% capacity.</p>
            <p>Last integrity check: {new Date().toLocaleString()}</p>
            {hasConflicts && (
              <p className="text-red-400 mt-2">
                WARNING: Version conflicts detected. Reality fabric instability increasing.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogVersionsPage;
