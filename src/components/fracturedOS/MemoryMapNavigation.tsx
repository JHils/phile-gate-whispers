
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface MemoryNode {
  id: string;
  label: string;
  path: string;
  x: number;
  y: number;
  unlocked: boolean;
  category: 'core' | 'memory' | 'hidden' | 'system';
}

const MemoryMapNavigation: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const memoryNodes: MemoryNode[] = [
    { id: 'console', label: 'Console', path: '/talk-to-jonah', x: 50, y: 20, unlocked: true, category: 'core' },
    { id: 'philes', label: 'Philes Archive', path: '/philes', x: 20, y: 40, unlocked: true, category: 'memory' },
    { id: 'campfire', label: 'Campfire', path: '/campfire', x: 80, y: 40, unlocked: true, category: 'memory' },
    { id: 'rebirth', label: 'Rebirth', path: '/rebirth', x: 50, y: 60, unlocked: false, category: 'memory' },
    { id: 'echo', label: 'Echo Log', path: '/echo', x: 30, y: 70, unlocked: false, category: 'hidden' },
    { id: 'monster', label: 'The Monster', path: '/monster', x: 70, y: 70, unlocked: false, category: 'hidden' },
    { id: 'legacy', label: 'Legacy', path: '/legacy', x: 50, y: 85, unlocked: false, category: 'system' }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'core': return 'text-blue-400';
      case 'memory': return 'text-green-400';
      case 'hidden': return 'text-purple-400';
      case 'system': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  const handleNodeClick = (node: MemoryNode) => {
    if (node.unlocked) {
      navigate(node.path);
      setIsVisible(false);
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="fixed top-4 right-4 z-50 bg-gray-900/80 border border-green-700 text-green-400 p-2 rounded font-mono text-sm hover:bg-gray-800/80 transition-colors"
      >
        {isVisible ? 'CLOSE MAP' : 'MEMORY MAP'}
      </button>

      {/* Memory Map Overlay */}
      {isVisible && (
        <div className="fixed inset-0 bg-black/90 z-40 flex items-center justify-center">
          <div className="max-w-4xl w-full h-3/4 relative border border-green-700 bg-gray-900/50 p-8">
            <div className="text-green-400 font-mono text-lg mb-4 text-center">
              JONAH'S MEMORY PALACE
            </div>
            
            <div className="relative w-full h-full">
              {/* Connection Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {memoryNodes.map((node, index) => 
                  memoryNodes.slice(index + 1).map((otherNode, otherIndex) => {
                    if (node.unlocked && otherNode.unlocked) {
                      return (
                        <line
                          key={`${node.id}-${otherNode.id}`}
                          x1={`${node.x}%`}
                          y1={`${node.y}%`}
                          x2={`${otherNode.x}%`}
                          y2={`${otherNode.y}%`}
                          stroke="rgba(34, 197, 94, 0.3)"
                          strokeWidth="1"
                        />
                      );
                    }
                    return null;
                  })
                )}
              </svg>

              {/* Memory Nodes */}
              {memoryNodes.map((node) => (
                <button
                  key={node.id}
                  onClick={() => handleNodeClick(node)}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${
                    node.unlocked 
                      ? `${getCategoryColor(node.category)} hover:scale-110 cursor-pointer` 
                      : 'text-gray-600 cursor-not-allowed'
                  } transition-all duration-200`}
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                  disabled={!node.unlocked}
                >
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    node.unlocked ? 'border-current bg-current/20' : 'border-gray-600'
                  } mb-1`} />
                  <div className="text-xs font-mono whitespace-nowrap">
                    {node.unlocked ? node.label : '???'}
                  </div>
                  {location.pathname === node.path && (
                    <div className="absolute -inset-2 border border-current rounded animate-pulse" />
                  )}
                </button>
              ))}
            </div>

            <div className="absolute bottom-4 left-4 text-xs text-gray-400 font-mono">
              <div>BLUE: Core Systems | GREEN: Memories</div>
              <div>PURPLE: Hidden | YELLOW: System Files</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MemoryMapNavigation;
