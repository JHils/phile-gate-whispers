
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "@/components/ui/use-toast";
import { 
  getUserSeeds, 
  getSeedStageDescription, 
  nurtureSeed,
  evolveSeeds,
  Seed
} from '@/utils/jonahAdvancedBehavior/seedSystem';

const SeedLog: React.FC = () => {
  const [seeds, setSeeds] = useState<Seed[]>([]);
  const [selectedSeed, setSelectedSeed] = useState<Seed | null>(null);
  const [filter, setFilter] = useState<number | 'all'>('all');
  
  const navigate = useNavigate();
  
  useEffect(() => {
    // Load user seeds
    const userSeeds = getUserSeeds();
    setSeeds(userSeeds);
    
    // Evolve seeds
    evolveSeeds();
    
    // If we have seeds, select the first one
    if (userSeeds.length > 0) {
      setSelectedSeed(userSeeds[0]);
    }
  }, []);
  
  // Get filtered seeds
  const filteredSeeds = filter === 'all' 
    ? seeds 
    : seeds.filter(seed => seed.stage === filter);
  
  // Format date for display
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };
  
  // Get class for seed stage
  const getSeedStageClass = (stage: number): string => {
    switch (stage) {
      case 1: // Buried
        return "bg-gray-900 text-gray-400";
      case 2: // Sprouting
        return "bg-green-900 bg-opacity-30 text-green-400";
      case 3: // Growing
        return "bg-green-800 bg-opacity-40 text-green-300";
      case 4: // Blooming
        return "bg-green-700 bg-opacity-50 text-green-200";
      case 5: // Decaying
        return "bg-red-900 bg-opacity-30 text-red-400";
      case 6: // Dead
        return "bg-gray-800 text-gray-500";
      default:
        return "bg-gray-900 text-gray-400";
    }
  };
  
  // Handle seed selection
  const handleSelectSeed = (seed: Seed) => {
    setSelectedSeed(seed);
    
    // Nurture the seed when viewed
    nurtureSeed(seed.id);
  };
  
  // Handle bloom access
  const handleBloom = () => {
    if (!selectedSeed) return;
    
    if (selectedSeed.stage === 4) { // Blooming
      // Navigate to bloom page if available
      if (selectedSeed.bloomMessage && selectedSeed.bloomMessage.includes('/')) {
        // Extract path from bloom message
        const path = selectedSeed.bloomMessage.match(/\/\w+(-\w+)?/);
        if (path) {
          navigate(path[0]);
        }
      } else {
        toast({
          title: "Bloom not ready",
          description: "This seed has bloomed, but has not revealed its path yet.",
          variant: "default",
        });
      }
    } else {
      toast({
        title: "Not yet bloomed",
        description: "This seed has not yet reached the blooming stage.",
        variant: "destructive",
      });
    }
  };
  
  return (
    <div className="min-h-screen bg-black text-green-400 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-mono mb-2">SEED LOG</h1>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <p className="text-sm text-green-600">
              Words you've planted that grow over time
            </p>
            
            <div className="mt-4 md:mt-0">
              <label className="mr-2 text-xs text-green-600">Filter by stage:</label>
              <select 
                value={filter.toString()}
                onChange={(e) => setFilter(e.target.value === 'all' ? 'all' : parseInt(e.target.value))}
                className="bg-gray-900 border border-green-800 px-2 py-1 text-sm"
              >
                <option value="all">All Seeds</option>
                <option value="1">Buried</option>
                <option value="2">Sprouting</option>
                <option value="3">Growing</option>
                <option value="4">Blooming</option>
                <option value="5">Decaying</option>
                <option value="6">Dead</option>
              </select>
            </div>
          </div>
        </header>
        
        {seeds.length === 0 ? (
          <div className="border border-green-900 p-8 text-center">
            <div className="text-xl mb-4">No seeds planted yet</div>
            <p className="text-sm text-green-600">
              Jonah will ask to keep your words as seeds when you say something meaningful.
              Seeds grow as you interact with them over time.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Seed list - left column */}
            <div className="md:col-span-1 border border-green-900 bg-gray-900 bg-opacity-20">
              <div className="p-4 border-b border-green-900">
                <h2 className="text-lg font-mono">{filteredSeeds.length} Seeds</h2>
              </div>
              
              <div className="divide-y divide-green-900 max-h-[70vh] overflow-auto">
                {filteredSeeds.length === 0 ? (
                  <div className="p-6 text-center text-green-600">
                    <p>No seeds found matching this filter</p>
                    <p className="text-xs mt-2">Try changing your filter</p>
                  </div>
                ) : (
                  filteredSeeds.map((seed) => (
                    <div 
                      key={seed.id}
                      onClick={() => handleSelectSeed(seed)}
                      className={`p-4 cursor-pointer hover:bg-green-900 hover:bg-opacity-10 ${
                        selectedSeed?.id === seed.id 
                          ? 'bg-green-900 bg-opacity-20' 
                          : ''
                      }`}
                    >
                      <div className="text-xs text-green-600 mb-1">
                        Planted: {formatDate(seed.plantedAt)}
                      </div>
                      <div className="line-clamp-2 text-lg">
                        "{seed.phrase}"
                      </div>
                      <div className="flex mt-2">
                        <span className={`text-xs px-2 py-0.5 ${getSeedStageClass(seed.stage)}`}>
                          {getSeedStageDescription(seed.stage)}
                        </span>
                        <span className={`text-xs px-2 py-0.5 ml-2 ${
                          seed.mood === 'paranoid' ? 'bg-red-900 bg-opacity-30 text-red-400' :
                          seed.mood === 'hopeful' ? 'bg-blue-900 bg-opacity-30 text-blue-400' :
                          seed.mood === 'mirror' ? 'bg-purple-900 bg-opacity-30 text-purple-400' :
                          seed.mood === 'error' ? 'bg-orange-900 bg-opacity-30 text-orange-400' :
                          'bg-gray-800 text-gray-400'
                        }`}>
                          {seed.mood}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
            
            {/* Seed detail - right column */}
            <div className="md:col-span-2 border border-green-900 bg-gray-900 bg-opacity-20">
              {!selectedSeed ? (
                <div className="flex items-center justify-center h-full p-8 text-center">
                  <div>
                    <div className="text-xl text-green-500 mb-2">No seed selected</div>
                    <div className="text-sm text-green-600">
                      Select a seed from the list to view details
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-xs text-green-600">
                        Planted: {formatDate(selectedSeed.plantedAt)}
                      </div>
                      <div className="text-xs text-green-600">
                        Last nurtured: {formatDate(selectedSeed.lastNurtured)}
                      </div>
                    </div>
                    
                    <div className={`px-2 py-1 text-xs ${getSeedStageClass(selectedSeed.stage)}`}>
                      {getSeedStageDescription(selectedSeed.stage)}
                    </div>
                  </div>
                  
                  <div className="text-2xl mt-8 mb-6 border-b border-green-900 pb-6">
                    "{selectedSeed.phrase}"
                  </div>
                  
                  <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border border-green-900 p-4">
                      <div className="text-xs text-green-600 mb-2">
                        ORIGINAL CONTEXT:
                      </div>
                      <div className="italic">
                        {selectedSeed.originalContext}
                      </div>
                    </div>
                    
                    <div className="border border-green-900 p-4">
                      <div className="text-xs text-green-600 mb-2">
                        EMOTIONAL CONTEXT:
                      </div>
                      <div className={`${
                        selectedSeed.mood === 'paranoid' ? 'text-red-400' :
                        selectedSeed.mood === 'hopeful' ? 'text-blue-400' :
                        selectedSeed.mood === 'mirror' ? 'text-purple-400' :
                        selectedSeed.mood === 'error' ? 'text-orange-400' :
                        'text-gray-400'
                      }`}>
                        {selectedSeed.mood.toUpperCase()}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <div className="text-xs text-green-600 mb-2">
                      GROWTH TIMELINE:
                    </div>
                    <div className="relative pt-8">
                      <div className="flex justify-between mb-2">
                        <div className="text-xs">Planted</div>
                        <div className="text-xs">Blooming</div>
                      </div>
                      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${
                            selectedSeed.stage >= 5 ? 'bg-red-600' :
                            selectedSeed.stage >= 4 ? 'bg-green-500' :
                            selectedSeed.stage >= 3 ? 'bg-green-600' :
                            selectedSeed.stage >= 2 ? 'bg-green-700' : 'bg-gray-600'
                          }`}
                          style={{ 
                            width: `${Math.min((selectedSeed.stage / 4) * 100, 100)}%` 
                          }}
                        ></div>
                      </div>
                      <div className="absolute top-0 left-0 w-full flex justify-between">
                        {[1, 2, 3, 4].map((stage) => (
                          <div 
                            key={stage}
                            className={`w-4 h-4 rounded-full ${
                              selectedSeed.stage >= stage
                                ? stage === 4 ? 'bg-green-500' : 'bg-green-700'
                                : 'bg-gray-700'
                            }`}
                            style={{ 
                              left: `calc(${((stage - 1) / 3) * 100}% - ${stage === 1 ? '0px' : stage === 4 ? '8px' : '4px'})` 
                            }}
                          ></div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {selectedSeed.stage === 4 && selectedSeed.bloomMessage && (
                    <div className="mt-8 border border-green-500 p-4 bg-green-900 bg-opacity-20">
                      <div className="text-xs text-green-400 mb-2">
                        BLOOM MESSAGE:
                      </div>
                      <div className="text-green-300">
                        {selectedSeed.bloomMessage}
                      </div>
                      <button
                        onClick={handleBloom}
                        className="mt-4 px-4 py-2 bg-green-900 bg-opacity-50 border border-green-700 hover:bg-green-800"
                      >
                        Access Bloom
                      </button>
                    </div>
                  )}
                  
                  <div className="mt-8 text-center text-sm text-green-600">
                    Seeds are nurtured each time you view or interact with them.
                    {selectedSeed.visits > 1 && (
                      <div className="mt-1">
                        This seed has been visited {selectedSeed.visits} times.
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SeedLog;
