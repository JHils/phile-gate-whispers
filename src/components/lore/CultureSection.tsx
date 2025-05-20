
import React from 'react';
import { Star } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const CultureSection: React.FC = () => {
  const cultureCategories = [
    {
      title: "Kinship & Skin Names",
      content: "The Aboriginal kinship system establishes how people relate to each other and their roles, responsibilities, and obligations in relation to one another, ceremonial business, and land. Skin names are a component of this system that identifies a person's bloodline and dictates marriage laws and ceremonial relationships."
    },
    {
      title: "Connection to Country",
      content: "Connection to Country is an integral part of Aboriginal culture. It encompasses the relationship between people and their traditional lands and waters. It includes caring for the land, plants, and animals that inhabit it. This connection is spiritual, physical, social, and cultural."
    },
    {
      title: "Ceremony & Songlines",
      content: "Ceremonies are performed to mark significant events, to pass on knowledge, and to strengthen connections between people and their Dreaming. Songlines are ancient paths across the land that describe the route followed by creator-beings during the Dreaming. They connect sacred sites and are used for navigation."
    },
    {
      title: "The Dreaming (Tjukurpa)",
      content: "The Dreaming, also known as the Dreamtime or Tjukurpa in some languages, refers to the time when ancestral spirits created the land and all living things. It's not merely a historical time but exists always, forming the spiritual foundation of Aboriginal life and society."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4">
        <div className="flex items-center mb-12">
          <Star className="text-amber-500 w-8 h-8 mr-3" />
          <h2 className="text-3xl md:text-4xl font-serif">Law is Story. Story is Land.</h2>
        </div>
        
        <Accordion type="single" collapsible className="w-full max-w-4xl mx-auto">
          {cultureCategories.map((category, index) => (
            <AccordionItem 
              key={index} 
              value={`category-${index}`} 
              className="mb-4 border border-gray-700/50 rounded-lg overflow-hidden"
            >
              <AccordionTrigger className="px-6 py-4 hover:bg-gray-800/30 transition-colors text-lg font-serif">
                {category.title}
              </AccordionTrigger>
              <AccordionContent className="px-6 py-4 bg-gray-800/20">
                <div className="dot-pattern-bg p-4">
                  <p className="text-gray-300">{category.content}</p>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default CultureSection;
