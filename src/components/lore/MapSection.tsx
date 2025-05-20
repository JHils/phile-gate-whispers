
import React, { useRef } from 'react';
import { Map } from 'lucide-react';
import EasterEgg from '@/components/EasterEgg';
import HiddenLink from '@/components/HiddenLink';

const MapSection: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-20 bg-gradient-to-t from-gray-900 to-black">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center mb-12">
          <Map className="text-amber-500 w-8 h-8 mr-3" />
          <h2 className="text-3xl md:text-4xl font-serif">First Nations Map</h2>
        </div>
        
        <div className="relative w-full h-[60vh] bg-gray-800/30 rounded-xl overflow-hidden" ref={mapRef}>
          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
            <p>Interactive map of Aboriginal nations loading...</p>
          </div>
          
          {/* Pleiades Easter Egg */}
          <EasterEgg>
            <div className="absolute top-[25%] right-[30%] cursor-pointer group">
              <div className="relative">
                <div className="w-1 h-1 bg-white rounded-full absolute"></div>
                <div className="w-1 h-1 bg-white rounded-full absolute -top-2 right-1"></div>
                <div className="w-1 h-1 bg-white rounded-full absolute -top-1 right-3"></div>
                <div className="w-1 h-1 bg-white rounded-full absolute top-1 right-4"></div>
                <div className="w-1 h-1 bg-white rounded-full absolute top-2 right-2"></div>
                <div className="w-1 h-1 bg-white rounded-full absolute top-3 right-0"></div>
                
                <HiddenLink 
                  to="/lost-sisters" 
                  className="hidden group-hover:block absolute -top-10 text-xs text-white/20 w-20"
                >
                  seven sisters
                </HiddenLink>
              </div>
            </div>
          </EasterEgg>
        </div>
        
        <div className="mt-8 text-center text-sm text-gray-400">
          <p>Hover over regions to discover Nation names. Click for stories and information.</p>
        </div>
      </div>
    </section>
  );
};

export default MapSection;
