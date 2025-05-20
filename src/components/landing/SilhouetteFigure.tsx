
import React from 'react';
import { useIsMobile } from "@/hooks/use-mobile";

const SilhouetteFigure: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="relative flex-grow flex items-center justify-center my-4 w-full max-w-full mx-auto" 
         style={{ maxHeight: isMobile ? "50vh" : "60vh" }}>
      <div 
        className="absolute inset-0 bg-center bg-no-repeat bg-contain"
        style={{ 
          backgroundImage: `url('/lovable-uploads/75a53784-f00a-48d5-8f44-79f4d651eea0.png')`,
          filter: 'brightness(0.15) contrast(1.3)', // Create silhouette effect
          animation: 'subtle-breathing 4s ease-in-out infinite'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#B09066]/60"></div>
    </div>
  );
};

export default SilhouetteFigure;
