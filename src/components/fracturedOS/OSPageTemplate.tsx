
import React from 'react';

interface OSPageTemplateProps {
  title: string;
  subtitle?: string;
  breadcrumb?: string;
  category?: 'MEMORY' | 'SYSTEM' | 'CONSOLE' | 'HIDDEN';
  children: React.ReactNode;
  glitchEffect?: boolean;
}

const OSPageTemplate: React.FC<OSPageTemplateProps> = ({ 
  title, 
  subtitle,
  breadcrumb,
  category = 'MEMORY', 
  children, 
  glitchEffect = false 
}) => {
  const getCategoryColor = () => {
    switch (category) {
      case 'CONSOLE': return 'text-blue-400 border-blue-700';
      case 'SYSTEM': return 'text-yellow-400 border-yellow-700';
      case 'HIDDEN': return 'text-purple-400 border-purple-700';
      default: return 'text-green-400 border-green-700';
    }
  };

  return (
    <div className={`min-h-screen bg-black text-gray-300 font-mono ${glitchEffect ? 'animate-pulse' : ''}`}>
      {/* OS Header */}
      <div className={`border-b ${getCategoryColor()} bg-gray-900/50 p-4`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className={`text-sm ${getCategoryColor()}`}>
              JONAH OS v3.7.2
            </div>
            <div className="text-gray-500">|</div>
            <div className={`text-sm ${getCategoryColor()}`}>
              {category}_FOLDER
            </div>
          </div>
          <div className="flex items-center space-x-2 text-xs text-gray-500">
            <div>MEM: {Math.floor(Math.random() * 40 + 60)}%</div>
            <div>CPU: {Math.floor(Math.random() * 20 + 10)}%</div>
            <div>STABILITY: {Math.floor(Math.random() * 30 + 70)}%</div>
          </div>
        </div>
      </div>

      {/* Page Title */}
      <div className="p-6 border-b border-gray-800">
        <h1 className={`text-2xl font-bold ${getCategoryColor()}`}>
          {title}
        </h1>
        {subtitle && (
          <div className={`text-lg ${getCategoryColor()} mt-1 opacity-80`}>
            {subtitle}
          </div>
        )}
        <div className="text-sm text-gray-500 mt-1">
          {breadcrumb ? `${breadcrumb} | ` : ''}Location: /{title.toLowerCase().replace(/\s+/g, '-')} | Access Level: AUTHORIZED
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {children}
      </div>

      {/* OS Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900/80 border-t border-gray-700 p-2 text-xs text-gray-500">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div>Type help() in console for navigation commands</div>
          <div>{new Date().toLocaleTimeString()} | Reality Status: FLUCTUATING</div>
        </div>
      </div>
    </div>
  );
};

export default OSPageTemplate;
