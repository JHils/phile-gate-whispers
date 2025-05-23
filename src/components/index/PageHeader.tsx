
import React from 'react';
import SpinningCoin from "../SpinningCoin";
import JonahMoodIndicator from "../JonahMoodIndicator";
import JonahLogo from "../JonahLogo";
import JonahTrustIndicator from "../JonahTrustIndicator";
import { TrustLevel } from '@/utils/jonahAdvancedBehavior/types';

interface PageHeaderProps {
  trustLevel: TrustLevel;
}

const PageHeader: React.FC<PageHeaderProps> = ({ trustLevel }) => {
  return (
    <>
      <div className="flex justify-between px-4 py-2">
        <JonahLogo 
          variant="glyph" 
          size="lg" 
          className="ml-4" 
          animated={trustLevel === 'high'} 
          trustLevel={trustLevel}
        />
        <JonahMoodIndicator trustLevel={trustLevel} />
      </div>
      
      <h1 className="text-4xl md:text-6xl font-serif mb-6 text-phile-light">Jonah's Philes</h1>
      
      <div className="absolute top-0 right-0 md:top-2 md:right-2">
        <JonahTrustIndicator trustLevel={trustLevel} />
      </div>
      
      <SpinningCoin />
    </>
  );
};

export default PageHeader;
