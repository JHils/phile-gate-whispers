
import React from 'react';
import { Quote } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const QuoteCarousel: React.FC = () => {
  const quotes = [
    {
      text: "We are all visitors to this time, this place. We are just passing through. Our purpose here is to observe, to learn, to grow, to love... and then we return home.",
      author: "Aboriginal proverb"
    },
    {
      text: "The land owns us. We belong to her. When the land is ill, we become ill; when the land thrives, we thrive.",
      author: "Elder Uncle Max Dulumunmun Harrison"
    },
    {
      text: "If you stay in your Country, your Country will look after you.",
      author: "Galarrwuy Yunupingu"
    },
    {
      text: "To understand our Law, you must learn to see through our eyes. The land is the Law.",
      author: "Traditional saying"
    }
  ];

  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex items-center mb-12 justify-center">
          <Quote className="text-amber-500 w-8 h-8 mr-3" />
          <h2 className="text-3xl md:text-4xl font-serif">Words of Wisdom</h2>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Carousel
            opts={{
              align: "center",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {quotes.map((quote, index) => (
                <CarouselItem key={index} className="md:basis-4/5">
                  <div className="p-6 bg-black/50 rounded-lg border border-gray-800">
                    <blockquote className="font-serif text-xl italic">
                      "{quote.text}"
                    </blockquote>
                    <p className="mt-4 text-right text-amber-400">— {quote.author}</p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-4 mt-8">
              <CarouselPrevious className="static" />
              <CarouselNext className="static" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default QuoteCarousel;
