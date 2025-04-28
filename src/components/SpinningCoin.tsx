
import React from 'react';

const SpinningCoin: React.FC = () => {
  return (
    <div className="coin">
      <div className="coin-inner animate-coin-spin">
        <div className="coin-side coin-front">
          <span>J</span>
        </div>
        <div className="coin-side coin-back">
          <span>P</span>
        </div>
      </div>
    </div>
  );
};

export default SpinningCoin;
