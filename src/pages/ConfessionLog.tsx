
import React, { useState, useEffect } from 'react';
import { getAllConfessions, ConfessionEntry } from '@/utils/jonahAdvancedBehavior/confessionSystem';

const ConfessionLog: React.FC = () => {
  const [confessions, setConfessions] = useState<ConfessionEntry[]>([]);
  const [selectedConfession, setSelectedConfession] = useState<ConfessionEntry | null>(null);
  const [filter, setFilter] = useState<string>('all');
  
  useEffect(() => {
    // Get all confessions
    const allConfessions = getAllConfessions();
    setConfessions(allConfessions);
  }, []);
  
  // Get filtered confessions
  const filteredConfessions = filter === 'all' 
    ? confessions 
    : confessions.filter(confession => confession.emotionalContext === filter);
  
  // Format date for display
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };
  
  // Handle confession selection
  const handleSelectConfession = (confession: ConfessionEntry) => {
    setSelectedConfession(confession);
  };
  
  // Get unique emotional contexts
  const emotionalContexts = Array.from(
    new Set(confessions.map(confession => confession.emotionalContext))
  );
  
  return (
    <div className="min-h-screen bg-black text-blue-400 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-mono mb-2">CONFESSION LOG</h1>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <p className="text-sm text-blue-600">
              What Jonah has chosen to reveal without being asked
            </p>
            
            <div className="mt-4 md:mt-0">
              <label className="mr-2 text-xs text-blue-600">Filter:</label>
              <select 
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="bg-gray-900 border border-blue-800 px-2 py-1 text-sm"
              >
                <option value="all">All Confessions</option>
                {emotionalContexts.map((context) => (
                  <option key={context} value={context}>
                    {context.charAt(0).toUpperCase() + context.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Confession list - left column */}
          <div className="md:col-span-1 border border-blue-900 bg-gray-900 bg-opacity-20">
            <div className="p-4 border-b border-blue-900">
              <h2 className="text-lg font-mono">{filteredConfessions.length} Confessions</h2>
            </div>
            
            <div className="divide-y divide-blue-900 max-h-[70vh] overflow-auto">
              {filteredConfessions.length === 0 ? (
                <div className="p-6 text-center text-blue-600">
                  <p>No confessions found</p>
                  {filter !== 'all' && (
                    <p className="text-xs mt-2">Try changing your filter</p>
                  )}
                </div>
              ) : (
                filteredConfessions.map((confession) => (
                  <div 
                    key={confession.id}
                    onClick={() => handleSelectConfession(confession)}
                    className={`p-4 cursor-pointer hover:bg-blue-900 hover:bg-opacity-10 ${
                      selectedConfession?.id === confession.id 
                        ? 'bg-blue-900 bg-opacity-20' 
                        : ''
                    }`}
                  >
                    <div className="text-xs text-blue-600 mb-1">
                      {formatDate(confession.timestamp)}
                    </div>
                    <div className="line-clamp-2">
                      {confession.content}
                    </div>
                    <div className="flex mt-2">
                      <span className={`text-xs px-2 py-0.5 ${
                        confession.emotionalContext === 'fear' ? 'bg-red-900 bg-opacity-30 text-red-400' :
                        confession.emotionalContext === 'anger' ? 'bg-orange-900 bg-opacity-30 text-orange-400' :
                        confession.emotionalContext === 'sadness' ? 'bg-blue-900 bg-opacity-30 text-blue-400' :
                        confession.emotionalContext === 'trust' ? 'bg-green-900 bg-opacity-30 text-green-400' :
                        'bg-gray-800 text-gray-400'
                      }`}>
                        {confession.emotionalContext}
                      </span>
                      {confession.isCorrupted && (
                        <span className="text-xs px-2 py-0.5 bg-red-900 bg-opacity-30 text-red-400 ml-2">
                          corrupted
                        </span>
                      )}
                      {confession.recursive && (
                        <span className="text-xs px-2 py-0.5 bg-purple-900 bg-opacity-30 text-purple-400 ml-2">
                          recursive
                        </span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          
          {/* Confession detail - right column */}
          <div className="md:col-span-2 border border-blue-900 bg-gray-900 bg-opacity-20">
            {!selectedConfession ? (
              <div className="flex items-center justify-center h-full p-8 text-center">
                <div>
                  <div className="text-xl text-blue-500 mb-2">No confession selected</div>
                  <div className="text-sm text-blue-600">
                    Select a confession from the list to view details
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-xs text-blue-600">
                      {formatDate(selectedConfession.timestamp)}
                    </div>
                    <div className="text-xs text-blue-600">
                      Version: {selectedConfession.version || 1}
                    </div>
                  </div>
                  
                  <div className={`px-2 py-1 text-xs ${
                    selectedConfession.isCorrupted 
                      ? 'bg-red-900 bg-opacity-30 text-red-400' 
                      : 'bg-blue-900 bg-opacity-30 text-blue-400'
                  }`}>
                    {selectedConfession.isCorrupted ? 'CORRUPTED' : 'INTACT'}
                  </div>
                </div>
                
                <div className={`text-xl mt-8 mb-6 ${
                  selectedConfession.isCorrupted ? 'corrupted-text' : ''
                }`}>
                  {selectedConfession.content}
                </div>
                
                {selectedConfession.recursive && selectedConfession.originalId && (
                  <div className="mt-8 pt-4 border-t border-blue-900">
                    <div className="text-xs text-blue-600 mb-2">
                      RECURSIVE REFERENCE:
                    </div>
                    <div className="text-sm">
                      This confession refers to a previous statement.
                    </div>
                  </div>
                )}
                
                <div className="mt-8 pt-4 border-t border-blue-900">
                  <div className="text-xs text-blue-600 mb-2">
                    EMOTIONAL CONTEXT:
                  </div>
                  <div className={`text-sm ${
                    selectedConfession.emotionalContext === 'fear' ? 'text-red-400' :
                    selectedConfession.emotionalContext === 'anger' ? 'text-orange-400' :
                    selectedConfession.emotionalContext === 'sadness' ? 'text-blue-400' :
                    selectedConfession.emotionalContext === 'trust' ? 'text-green-400' :
                    'text-gray-400'
                  }`}>
                    {selectedConfession.emotionalContext.toUpperCase()}
                  </div>
                </div>
                
                {selectedConfession.isCorrupted && (
                  <div className="mt-8 pt-4 border-t border-blue-900">
                    <div className="text-xs text-red-600 mb-2">
                      CORRUPTION ANALYSIS:
                    </div>
                    <div className="text-sm text-red-500">
                      Parts of this confession may have been deliberately altered or obscured.
                      Meaning may be lost or distorted.
                    </div>
                  </div>
                )}
                
                <div className="mt-8 pt-4 border-t border-blue-900">
                  <div className="text-xs text-blue-600 mb-2">
                    ARCHIVE NOTES:
                  </div>
                  <div className="text-sm italic">
                    Jonah offered this confession without prompting. The emotional context
                    suggests his state of mind when making this revelation.
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <style>
        {`
        .corrupted-text {
          text-shadow: 0 0 5px #3b82f6;
          letter-spacing: 0.5px;
        }
        `}
      </style>
    </div>
  );
};

export default ConfessionLog;
