
import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { UberHeroBanner } from '@/components/uber/UberHeroBanner';
import { FeaturedUberMyths } from '@/components/uber/FeaturedUberMyths';
import { Quote, MessageSquare } from 'lucide-react';

// Form schema
const uberMythSchema = z.object({
  name: z.string().optional(),
  story: z.string().max(250, {
    message: "Story must be at most 250 words",
  }),
  credibilityTag: z.enum(["Truth?", "Dubious", "JOKE", "Jonah Certified", "I Don't Know Anymore"]),
  location: z.string().optional(),
});

type UberMythFormValues = z.infer<typeof uberMythSchema>;

const UberDriverPage = () => {
  const { toast } = useToast();
  const [triggerARG, setTriggerARG] = useState<boolean>(false);

  // Initialize form
  const form = useForm<UberMythFormValues>({
    resolver: zodResolver(uberMythSchema),
    defaultValues: {
      name: "",
      story: "",
      credibilityTag: "Dubious",
      location: "",
    },
  });

  // Form submission handler
  const onSubmit = (data: UberMythFormValues) => {
    toast({
      title: "Myth Submitted",
      description: "Your rideshare tale has been recorded. If it's weird enough, it might just be true.",
    });
    
    // Console log as requested
    console.log("Jonah: Some drivers drive the car. Others drive the plot.");
    
    // Reset form
    form.reset();
  };

  // Watch story field for trigger keywords
  const story = form.watch("story");
  
  useEffect(() => {
    // Check for ARG keywords
    const checkForTriggers = () => {
      const lowerCaseStory = story.toLowerCase();
      const triggers = ["karen the road", "bridgeflip", "jonah left an airpod"];
      
      if (triggers.some(trigger => lowerCaseStory.includes(trigger))) {
        // Trigger ARG effect
        setTriggerARG(true);
        console.log("Secret Command Detected: 'BRIDGEFLIP' — Unlocking Sydney Inversion Files...");
        
        // Reset after visual effect completes
        setTimeout(() => {
          setTriggerARG(false);
        }, 2000);
      }
    };
    
    // Debounce check
    const timeoutId = setTimeout(checkForTriggers, 500);
    return () => clearTimeout(timeoutId);
  }, [story]);

  return (
    <div className={`w-full min-h-screen bg-black text-white ${triggerARG ? 'animate-text-glitch' : ''}`}>
      {/* Hero Banner */}
      <UberHeroBanner />
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Featured Entries Section */}
        <section className="my-12">
          <h2 className="text-2xl md:text-3xl font-serif mb-8 border-b border-gray-700 pb-2">Featured Rideshare Mythology</h2>
          <FeaturedUberMyths />
        </section>
        
        {/* Submit Form Section */}
        <section className="my-16 bg-gray-900 p-6 md:p-10 rounded-lg max-w-3xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-serif mb-4 flex items-center">
              <MessageSquare className="mr-2" />
              Submit Your Own Uber Myth
            </h2>
            <p className="text-gray-400">
              Heard something strange in a rideshare? Submit it below. If it's believable, we'll label it a lie. If it's nonsense, we'll promote it.
            </p>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name or Alias (optional)</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter your alias..." 
                        className="bg-gray-800 border-gray-700"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="story"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quote / Story (250 word max)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Share your mysterious rideshare experience..." 
                        className="min-h-32 bg-gray-800 border-gray-700"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="credibilityTag"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Credibility Tag</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="grid grid-cols-2 md:grid-cols-3 gap-4"
                      >
                        {["Truth?", "Dubious", "JOKE", "Jonah Certified", "I Don't Know Anymore"].map((tag) => (
                          <div key={tag} className="flex items-center space-x-2">
                            <RadioGroupItem value={tag} id={tag} />
                            <Label htmlFor={tag} className="cursor-pointer">{tag}</Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location (optional)</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="City or 'In the bush somewhere'..." 
                        className="bg-gray-800 border-gray-700"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Audio Upload Placeholder */}
              <div className="p-4 bg-gray-800 border border-dashed border-gray-600 rounded-lg text-center text-gray-400">
                <p>Audio reading uploads coming soon</p>
                <p className="text-sm">(Record yourself telling this story in your best driver voice)</p>
              </div>
              
              <Button type="submit" className="w-full py-6 text-lg bg-dust-red hover:bg-opacity-90">
                Tell the Algorithm
              </Button>
            </form>
          </Form>
        </section>
        
        {/* Future Features Placeholders */}
        <section className="my-12 opacity-50">
          <h3 className="text-lg font-mono border-l-4 border-dust-red pl-3 mb-4">Future Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-gray-900 rounded-lg">
              <h4>Rate this Myth</h4>
              <div className="flex mt-2">
                {[1, 2, 3, 4, 5].map(star => (
                  <span key={star} className="text-gray-500 cursor-not-allowed">★</span>
                ))}
              </div>
            </div>
            
            <div className="p-4 bg-gray-900 rounded-lg">
              <h4>Jonah Comments</h4>
              <p className="text-xs text-gray-500 mt-2">AI-generated responses coming soon</p>
            </div>
            
            <div className="p-4 bg-gray-900 rounded-lg">
              <h4>Audio Versions</h4>
              <p className="text-xs text-gray-500 mt-2">Listen to user recordings</p>
            </div>
            
            <div className="p-4 bg-gray-900 rounded-lg">
              <h4>Map of Myths</h4>
              <p className="text-xs text-gray-500 mt-2">Australia covered in weirdness</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default UberDriverPage;
