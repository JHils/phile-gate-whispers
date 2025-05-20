
import React from 'react';
import { Info, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DreamtimeStoryPDF from './DreamtimeStoryPDF';

const CallToAction: React.FC = () => {
  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4 text-center">
        <div className="flex items-center justify-center mb-8">
          <Info className="text-amber-500 w-8 h-8 mr-3" />
          <h2 className="text-3xl md:text-4xl font-serif">Learn. Support. Respect.</h2>
        </div>
        
        <p className="text-xl mb-12 max-w-3xl mx-auto">
          This is not history. This is living law.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 mobile-flex-wrap">
          <Button 
            variant="outline" 
            size="lg"
            className="border-amber-500 text-amber-500 hover:bg-amber-500/20"
            asChild
          >
            <a href="https://www.firstnations.org.au/" target="_blank" rel="noopener noreferrer">
              Support Aboriginal Arts
            </a>
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            className="border-amber-500 text-amber-500 hover:bg-amber-500/20"
            asChild
          >
            <a href="https://aiatsis.gov.au" target="_blank" rel="noopener noreferrer">
              Learn More
            </a>
          </Button>
          
          <DreamtimeStoryPDF>
            <Button 
              variant="outline" 
              size="lg"
              className="border-amber-500 text-amber-500 hover:bg-amber-500/20"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Starter Pack PDF
            </Button>
          </DreamtimeStoryPDF>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
