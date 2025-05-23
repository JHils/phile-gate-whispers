import React from 'react';
import { TrustLevel } from '@/utils/jonahAdvancedBehavior/types';
import JonahTrustIndicator from '../JonahTrustIndicator';

interface PageHeaderProps {
  trustLevel: TrustLevel;
}

const PageHeader: React.FC<PageHeaderProps> = ({ trustLevel }) => {
  return (
    <header className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-800">
      <div className="flex items-center space-x-4">
        <h1 className="text-2xl font-bold">JONAH</h1>
        <JonahTrustIndicator trustLevel={trustLevel} />
      </div>
      
      <div className="flex items-center space-x-3">
        {/* Header controls/actions would go here */}
      </div>
    </header>
  );
};

export default PageHeader;
