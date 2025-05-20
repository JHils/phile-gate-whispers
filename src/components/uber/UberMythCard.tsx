
import React from 'react';
import { Quote, CheckCircle, HelpCircle, Smile } from 'lucide-react';

export interface UberMythProps {
  id: number;
  title: string;
  quote: string;
  narrative: string;
  credibility: string;
  location?: string;
}

interface UberMythCardProps {
  myth: UberMythProps;
}

export const UberMythCard = ({ myth }: UberMythCardProps) => {
  // Get appropriate icon and color for credibility tag
  const getCredibilityInfo = (tag: string) => {
    switch (tag) {
      case 'Truth?':
        return { icon: <CheckCircle className="h-4 w-4" />, color: 'bg-green-700' };
      case 'Dubious':
        return { icon: <HelpCircle className="h-4 w-4" />, color: 'bg-yellow-700' };
      case 'JOKE':
        return { icon: <Smile className="h-4 w-4" />, color: 'bg-blue-700' };
      case 'Jonah Certified':
        return { icon: <CheckCircle className="h-4 w-4" />, color: 'bg-dust-red' };
      case 'Redacted':
        return { icon: null, color: 'bg-gray-700' };
      default:
        return { icon: <HelpCircle className="h-4 w-4" />, color: 'bg-gray-700' };
    }
  };

  const { icon, color } = getCredibilityInfo(myth.credibility);

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden hover:shadow-lg hover:shadow-dust-red/20 transition-all duration-300 flex flex-col h-full border border-gray-800">
      <div className="p-5 flex-grow">
        <h3 className="text-xl font-serif mb-3">{myth.title}</h3>
        
        <div className="font-mono mb-4 text-gray-300 relative p-4 bg-black bg-opacity-40 rounded">
          <Quote className="text-dust-red h-5 w-5 absolute -top-2 -left-2" />
          <p className="italic">{myth.quote}</p>
        </div>
        
        <p className="text-gray-400 text-sm mb-4">{myth.narrative}</p>
        
        {myth.location && (
          <p className="text-gray-500 text-xs">Location: {myth.location}</p>
        )}
      </div>
      
      <div className={`${color} px-3 py-2 flex items-center justify-between`}>
        <span className="flex items-center space-x-1">
          {icon}
          <span className="text-xs ml-1">{myth.credibility}</span>
        </span>
        
        <button className="text-xs text-white/60 hover:text-white">
          Share
        </button>
      </div>
    </div>
  );
};
