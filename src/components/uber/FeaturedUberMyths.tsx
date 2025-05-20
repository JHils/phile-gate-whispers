
import React, { useState, useEffect } from 'react';
import { UberMythCard } from './UberMythCard';

// Sample data for myths
const SAMPLE_MYTHS = [
  {
    id: 1,
    title: "The One Remaining Koala",
    quote: "There's only one real koala left in Australia. The rest are surveillance drones programmed to drop on tourists.",
    narrative: "My driver spent 18 years working for the Department of Wildlife Management. Said he was fired after discovering the koala replacement program. Showed me a scar where a 'koala' attacked him when he tried to expose the truth. The scar looked more like an appendectomy, but who am I to judge?",
    credibility: "Dubious",
    location: "Brisbane"
  },
  {
    id: 2,
    title: "Sydney Opera House Secret",
    quote: "The Sydney Opera House is actually upside down. They built it wrong but no one wanted to admit it.",
    narrative: "My driver was convinced the Opera House was built upside down. He claimed the original blueprints show it was meant to represent boat sails, not shells. Apparently, there's a second, correct version buried underneath Sydney Harbor that they'll reveal when the time is right.",
    credibility: "JOKE",
    location: "Sydney"
  },
  {
    id: 3,
    title: "The Kangaroo Conspiracy",
    quote: "Kangaroos aren't native to Australia. They were imported from Mars in 1951.",
    narrative: "According to this particularly passionate driver, kangaroos are the result of a secret government experiment with alien DNA. Their pouches are actually sophisticated oxygen generators that will be activated 'when the time comes' to transform the atmosphere. He offered to show me 'proof' but we had reached my destination.",
    credibility: "Jonah Certified",
    location: "Perth"
  },
  {
    id: 4,
    title: "The Great Australian Road Secret",
    quote: "All roads in Australia secretly form a giant constellation map to lead aliens to their crashed ships.",
    narrative: "My driver wouldn't stop talking about how Australian highway engineers follow ancient Aboriginal star maps when designing roadways. He claimed that if you look at satellite imagery of the highway system, it forms instructions for recovering pieces of a massive alien vessel that crashed 40,000 years ago. Showed me some pretty convincing overlay images on his phone.",
    credibility: "Truth?",
    location: "Adelaide"
  },
  {
    id: 5,
    title: "The Drop Bear Truth",
    quote: "Drop bears are real, but they're not what you think. They're failed government super-soldiers from the 80s.",
    narrative: "This older driver claimed to have been part of a military experiment in the 1980s called 'Project Ursa Drop.' They tried to create enhanced soldiers that could drop from planes without parachutes. The experiments failed, and the subjects escaped into the bush. The Drop Bear myth was created to explain any sightings or attacks.",
    credibility: "Redacted",
    location: "Melbourne"
  }
];

export const FeaturedUberMyths = () => {
  const [activeMyths, setActiveMyths] = useState(SAMPLE_MYTHS.slice(0, 3));
  const [currentIndex, setCurrentIndex] = useState(0);

  // Rotate myths every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const newIndex = (currentIndex + 1) % (SAMPLE_MYTHS.length - 2);
      setCurrentIndex(newIndex);
      setActiveMyths(SAMPLE_MYTHS.slice(newIndex, newIndex + 3));
    }, 10000);
    
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeMyths.map((myth) => (
          <UberMythCard key={myth.id} myth={myth} />
        ))}
      </div>
      
      {/* Pagination indicator */}
      <div className="flex justify-center mt-8 space-x-2">
        {Array.from({ length: SAMPLE_MYTHS.length - 2 }).map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              currentIndex === index ? 'bg-dust-red' : 'bg-gray-700'
            }`}
            onClick={() => {
              setCurrentIndex(index);
              setActiveMyths(SAMPLE_MYTHS.slice(index, index + 3));
            }}
            aria-label={`View set ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
