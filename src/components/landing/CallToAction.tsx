
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface CallToActionProps {
  textReveal: boolean;
  processConsoleCommand: (command: string) => void;
}

const CallToAction: React.FC<CallToActionProps> = ({ textReveal, processConsoleCommand }) => {
  return (
    <div className={`mt-8 sm:mt-12 space-y-3 sm:space-y-4 transition-all duration-1000 w-full ${textReveal ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <Link to="/gate" className="block w-full">
        <Button 
          variant="outline"
          className="main-btn bg-black/60 hover:bg-black/70 text-[#f5f5dc] hover:text-white border border-[#212121]/50 px-4 sm:px-8 py-2 sm:py-3 text-base sm:text-lg transition-all w-full sm:w-auto mx-auto"
        >
          Enter the Philes
        </Button>
      </Link>
      
      <div className="flex flex-col sm:flex-row sm:space-x-4 justify-center mt-4 sm:mt-6 space-y-2 sm:space-y-0">
        <Link to="/echo">
          <Button 
            variant="link"
            className="link-btn text-[#212121]/70 hover:text-[#8B3A40] transition-all text-xs sm:text-sm"
          >
            What is This?
          </Button>
        </Link>
        
        <Button 
          variant="link"
          className="ghost-btn text-[#212121]/50 hover:text-[#8B3A40] transition-all text-xs sm:text-sm italic"
          onClick={() => processConsoleCommand("/remember-me")}
        >
          Remember Me
        </Button>
      </div>
    </div>
  );
};

export default CallToAction;
