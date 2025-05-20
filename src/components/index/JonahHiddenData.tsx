
import React from 'react';

interface JonahHiddenDataProps {
  userState: any;
}

/**
 * Hidden data attributes for cross-site presence
 */
const JonahHiddenData: React.FC<JonahHiddenDataProps> = ({ userState }) => {
  return (
    <div
      className="hidden"
      data-jonah-presence="true"
      data-user-phile-rank={userState?.console?.rank || "drifter"}
      data-visit-count={userState.visitCount}
      data-whisper-code="GRFNDRZ"
    />
  );
};

export default JonahHiddenData;
