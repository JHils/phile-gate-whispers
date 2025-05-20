
import React from 'react';
import SpinningCoin from "../SpinningCoin";
import JonahMoodIndicator from "../JonahMoodIndicator";
import JonahLogo from "../JonahLogo";

interface PageHeaderProps {
  trustLevel: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ trustLevel }) => {
  return (
    <>
      <div className="flex justify-between px-4 py-2">
        <JonahLogo variant="eye" size="lg" className="ml-4" />
        <JonahMoodIndicator trustLevel={trustLevel} />
      </div>
      
      <h1 className="text-4xl md:text-6xl font-serif mb-6 text-phile-light">Jonah's Philes</h1>
      
      <SpinningCoin />
    </>
  );
};

export default PageHeader;
