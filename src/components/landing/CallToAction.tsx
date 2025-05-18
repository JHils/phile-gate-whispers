
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface CallToActionProps {
  textReveal: boolean;
  processConsoleCommand: (command: string) => void;
}

const CallToAction: React.FC<CallToActionProps> = ({ textReveal, processConsoleCommand }) => {
  return (
    <div className={`mt-12 space-y-4 transition-all duration-1000 ${textReveal ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <Link to="/gate">
        <Button 
          variant="outline"
          className="bg-transparent hover:bg-[#212121]/20 text-[#212121] hover:text-[#000] border border-[#212121]/50 px-8 py-3 text-lg transition-all"
        >
          Enter the Philes
        </Button>
      </Link>
      
      <div className="flex space-x-4 justify-center mt-4">
        <Link to="/echo">
          <Button 
            variant="link"
            className="text-[#212121]/70 hover:text-[#8B3A40] transition-all text-sm"
          >
            What is This?
          </Button>
        </Link>
        
        <Button 
          variant="link"
          className="text-[#212121]/70 hover:text-[#8B3A40] transition-all text-sm"
          onClick={() => processConsoleCommand("/remember-me")}
        >
          Remember Me
        </Button>
      </div>
    </div>
  );
};

export default CallToAction;
