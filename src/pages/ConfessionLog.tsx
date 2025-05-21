
import React, { useState, useEffect } from 'react';
import { getAllConfessions } from '@/utils/jonahAdvancedBehavior';
import { ConfessionDetail } from '@/components/confession/ConfessionDetail';
import { ConfessionListItem } from '@/components/confession/ConfessionListItem';
import { ConfessionEntry } from '@/utils/jonahAdvancedBehavior/types';

const ConfessionLog: React.FC = () => {
  const [confessions, setConfessions] = useState<ConfessionEntry[]>([]);
  const [selectedConfession, setSelectedConfession] = useState<ConfessionEntry | null>(null);
  const [filter, setFilter] = useState<string>('all');
  
  useEffect(() => {
    // Get all confessions
    const allConfessions = getAllConfessions();
    
    // Convert to the correct type if needed
    const typedConfessions = allConfessions.map((confession: any): ConfessionEntry => ({
      ...confession,
      // Ensure all fields match the expected ConfessionEntry type
      version: confession.version?.toString() || "1",
      revealed: confession.revealed || false,
      category: confession.category || "general"
    }));
    
    setConfessions(typedConfessions);
  }, []);
  
  // Get filtered confessions
  const filteredConfessions = filter === 'all' 
    ? confessions 
    : confessions.filter(confession => confession.emotionalContext === filter);
  
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
                  <ConfessionListItem
                    key={confession.id}
                    confession={confession}
                    isSelected={selectedConfession?.id === confession.id}
                    onSelect={handleSelectConfession}
                  />
                ))
              )}
            </div>
          </div>
          
          {/* Confession detail - right column */}
          <div className="md:col-span-2 border border-blue-900 bg-gray-900 bg-opacity-20">
            <ConfessionDetail confession={selectedConfession} />
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
