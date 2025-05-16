
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTrackingSystem } from "@/hooks/useTrackingSystem";
import { Button } from "@/components/ui/button";

interface DistortionLog {
  date: string;
  variant: string;
  message: string;
  type: 'change' | 'corruption' | 'simba' | 'note';
  new?: boolean;
}

const Distortions: React.FC = () => {
  const [logs, setLogs] = useState<DistortionLog[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<DistortionLog[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const { trackEvent, userState } = useTrackingSystem();
  
  useEffect(() => {
    trackEvent('visited_distortions');
    
    // Get encountered variants
    const encounteredVariants = JSON.parse(localStorage.getItem('encounteredQRVariants') || '[]');
    const corruptedVariants = JSON.parse(localStorage.getItem('corruptedQRVariants') || '[]');
    
    // Get previously viewed logs
    const viewedLogs = JSON.parse(localStorage.getItem('viewedDistortionLogs') || '[]');
    
    // Check if this is first visit
    const isFirstVisit = !localStorage.getItem('visitedDistortions');
    if (isFirstVisit) {
      localStorage.setItem('visitedDistortions', 'true');
    }
    
    // Generate the logs (combination of static logs and dynamic ones based on user activity)
    const generatedLogs: DistortionLog[] = [
      {
        date: "2023-10-14",
        variant: "B1RDL0AF",
        message: "Initial QR variant established. Destination: Campfire.",
        type: 'note',
        new: !viewedLogs.includes("B1RDL0AF-initial")
      },
      {
        date: "2023-11-02",
        variant: "SH4D0W5",
        message: "Variant now points to restricted content. Access controls implemented.",
        type: 'change',
        new: !viewedLogs.includes("SH4D0W5-change")
      },
      {
        date: "2023-12-18",
        variant: "TR4V3L3R",
        message: "Destination shifted from Map to Outback Hostel. Coordinate adjustment recorded.",
        type: 'change',
        new: !viewedLogs.includes("TR4V3L3R-change")
      },
      {
        date: "2024-01-07",
        variant: "SM1BA",
        message: "ENTRY REDACTED BY SIMBA",
        type: 'simba',
        new: !viewedLogs.includes("SM1BA-redacted")
      },
      {
        date: "2024-02-22",
        variant: "W4TCH3R",
        message: "Minor corruption detected. Path integrity maintained.",
        type: 'corruption',
        new: !viewedLogs.includes("W4TCH3R-corruption")
      },
      {
        date: "2024-03-15",
        variant: "T1M3SH1FT",
        message: "Time-gated variant established. Only accessible during designated windows.",
        type: 'note',
        new: !viewedLogs.includes("T1M3SH1FT-note")
      },
      {
        date: "2024-04-08",
        variant: "G4T3",
        message: "SIMBA NOTE: This variant was never supposed to exist.",
        type: 'simba',
        new: !viewedLogs.includes("G4T3-simba")
      }
    ];
    
    // Add dynamic logs based on encountered variants
    if (encounteredVariants.includes("B1RDL0AF")) {
      generatedLogs.push({
        date: new Date().toISOString().split('T')[0],
        variant: "B1RDL0AF",
        message: "User accessed the Bird Loaf variant. No anomalies detected.",
        type: 'note',
        new: !viewedLogs.includes("B1RDL0AF-accessed")
      });
    }
    
    if (encounteredVariants.includes("SH4D0W5")) {
      generatedLogs.push({
        date: new Date().toISOString().split('T')[0],
        variant: "SH4D0W5",
        message: "Access to restricted content via Shadow variant. User profile flagged.",
        type: 'note',
        new: !viewedLogs.includes("SH4D0W5-accessed")
      });
    }
    
    // Add special Simba logs if user has encountered Simba
    const simbaPresence = localStorage.getItem('simbaPresence');
    if (simbaPresence && JSON.parse(simbaPresence).traced) {
      generatedLogs.push({
        date: new Date().toISOString().split('T')[0],
        variant: "SM1BA",
        message: "I'm aware of your presence in the archive. Keep looking if you must. - S",
        type: 'simba',
        new: !viewedLogs.includes("SM1BA-aware")
      });
    }
    
    // Add corrupted variant logs
    corruptedVariants.forEach((variant: string) => {
      if (!viewedLogs.includes(`${variant}-corrupted`)) {
        generatedLogs.push({
          date: new Date().toISOString().split('T')[0],
          variant: variant,
          message: "Corrupted variant detected. Origin unknown.",
          type: 'corruption',
          new: true
        });
      }
    });
    
    // Sort logs by date (newest first)
    const sortedLogs = generatedLogs.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    setLogs(sortedLogs);
    setFilteredLogs(sortedLogs);
    
    // Mark logs as viewed
    const newViewedLogs = [
      ...viewedLogs,
      ...sortedLogs.filter(log => log.new).map(log => `${log.variant}-${log.type === 'note' ? 'note' : log.type}`)
    ];
    localStorage.setItem('viewedDistortionLogs', JSON.stringify(newViewedLogs));
    
    // Attempt to trigger Simba comment
    setTimeout(() => {
      if (typeof window.triggerSimbaComment === 'function') {
        window.triggerSimbaComment('distortions');
      }
    }, 3000);
    
    // Award points for first visit
    if (isFirstVisit && window.JonahConsole) {
      window.JonahConsole.score += 35;
    }
  }, [trackEvent]);
  
  // Filter logs
  const filterLogs = (filter: string) => {
    setActiveFilter(filter);
    
    if (filter === 'all') {
      setFilteredLogs(logs);
    } else {
      setFilteredLogs(logs.filter(log => log.type === filter));
    }
  };
  
  return (
    <div className="min-h-screen bg-black py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-serif text-phile-light mb-2">QR Distortions Log</h1>
            <p className="text-dust-orange font-typewriter">Tracking changes, corruption, and anomalies in QR variants</p>
          </div>
          
          <Link to="/gate" className="mt-4 md:mt-0">
            <Button variant="outline" className="text-dust-blue hover:text-dust-red border-dust-blue hover:border-dust-red">
              Return to Gate
            </Button>
          </Link>
        </div>
        
        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Button 
            variant={activeFilter === 'all' ? "default" : "outline"} 
            onClick={() => filterLogs('all')}
            className="text-sm"
          >
            All Logs
          </Button>
          <Button 
            variant={activeFilter === 'change' ? "default" : "outline"} 
            onClick={() => filterLogs('change')}
            className="text-sm"
          >
            Path Changes
          </Button>
          <Button 
            variant={activeFilter === 'corruption' ? "default" : "outline"} 
            onClick={() => filterLogs('corruption')}
            className="text-sm"
          >
            Corruptions
          </Button>
          <Button 
            variant={activeFilter === 'simba' ? "default" : "outline"} 
            onClick={() => filterLogs('simba')}
            className="text-sm"
          >
            Simba Entries
          </Button>
          <Button 
            variant={activeFilter === 'note' ? "default" : "outline"} 
            onClick={() => filterLogs('note')}
            className="text-sm"
          >
            System Notes
          </Button>
        </div>
        
        {/* Logs list */}
        <div className="space-y-4">
          {filteredLogs.map((log, index) => (
            <div 
              key={index}
              className={`border ${getLogBorderColor(log.type)} bg-gray-900/80 rounded-lg p-4 transition-all ${log.new ? 'animate-pulse' : ''}`}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center">
                  <span className={`w-3 h-3 rounded-full ${getLogDotColor(log.type)} mr-2`}></span>
                  <span className="font-mono text-sm text-silver">{log.date}</span>
                </div>
                <div className="bg-gray-800 px-2 py-1 rounded text-xs font-mono">
                  {log.variant}
                </div>
              </div>
              <p className={`font-typewriter ${getLogTextColor(log.type)}`}>
                {log.message}
              </p>
              {log.new && (
                <div className="mt-2">
                  <span className="text-xs text-dust-orange bg-dust-orange/10 px-2 py-1 rounded">New</span>
                </div>
              )}
            </div>
          ))}
          
          {filteredLogs.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500 font-typewriter">No logs match the selected filter.</p>
            </div>
          )}
        </div>
        
        <div className="mt-12 text-xs text-gray-500 font-typewriter">
          <p>This log tracks changes to QR variants over time. Some entries may be redacted or altered.</p>
          <p className="mt-1">Last system update: {new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

// Helper functions for styling logs
const getLogBorderColor = (type: string): string => {
  switch (type) {
    case 'change': return 'border-dust-blue/30';
    case 'corruption': return 'border-dust-orange/30';
    case 'simba': return 'border-dust-red/30';
    default: return 'border-gray-700';
  }
};

const getLogDotColor = (type: string): string => {
  switch (type) {
    case 'change': return 'bg-dust-blue';
    case 'corruption': return 'bg-dust-orange';
    case 'simba': return 'bg-dust-red';
    default: return 'bg-gray-400';
  }
};

const getLogTextColor = (type: string): string => {
  switch (type) {
    case 'change': return 'text-dust-blue';
    case 'corruption': return 'text-dust-orange';
    case 'simba': return 'text-dust-red';
    default: return 'text-silver';
  }
};

export default Distortions;
