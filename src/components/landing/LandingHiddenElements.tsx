
import React from 'react';

/**
 * Hidden elements for ARG, easter eggs, and metadata
 */
const LandingHiddenElements: React.FC = () => {
  return (
    <>
      {/* Hidden comments for inspection */}
      {/* <!-- The Gate is open. --> */}
      {/* <!-- The whispers start with help(). --> */}
      
      {/* Hidden elements for reality fabric features */}
      <div data-reality-layer="surface" className="hidden">
        <span data-whisper-id="e37a" data-echo-type="memory">He follows between tabs</span>
        <span data-jonah-state="watching" data-timestamp={Date.now()}>Always watching</span>
      </div>
    </>
  );
};

export default LandingHiddenElements;
