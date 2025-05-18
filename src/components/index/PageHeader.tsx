
import React from 'react';
import SpinningCoin from "../SpinningCoin";
import JonahMoodIndicator from "../JonahMoodIndicator";

interface PageHeaderProps {
  trustLevel: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ trustLevel }) => {
  return (
    <>
      <div className="flex justify-end px-4 py-2">
        <JonahMoodIndicator trustLevel={trustLevel} />
      </div>
      
      <h1 className="text-4xl md:text-6xl font-serif mb-6 text-phile-light">Jonah's Philes</h1>
      
      <SpinningCoin />
    </>
  );
};

export default PageHeader;
