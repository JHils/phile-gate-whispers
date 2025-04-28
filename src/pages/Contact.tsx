
import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";

interface ContactForm {
  name: string;
  message: string;
  secretWord?: string;
}

const Contact = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactForm>();
  const { toast } = useToast();
  
  const onSubmit = (data: ContactForm) => {
    console.log("Message for the Gatekeeper:", data);
    
    // Show a success toast
    toast({
      title: "Message sent to the Gatekeeper",
      description: "Whether it will be received is another matter entirely.",
      duration: 5000,
    });
    
    // Reset the form
    reset();
  };
  
  return (
    <div className="min-h-screen bg-phile-dark py-16">
      {/* Hidden comments for inspection */}
      {/* <!-- Some messages are never seen. Some are never meant to be. --> */}

      <div className="phile-container">
        <h1 className="text-3xl md:text-4xl font-serif text-dust-orange mb-10 text-center">
          Message the Gatekeeper
        </h1>
        
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
          <div className="mb-6">
            <label htmlFor="name" className="block text-silver mb-2 font-typewriter">
              Name
            </label>
            <input
              id="name"
              type="text"
              {...register("name", { required: "Your name is required" })}
              className="w-full px-4 py-2 bg-transparent border border-dust-blue/30 text-phile-light font-typewriter focus:outline-none focus:border-dust-red"
            />
            {errors.name && (
              <p className="mt-1 text-dust-red text-sm">{errors.name.message}</p>
            )}
          </div>
          
          <div className="mb-6">
            <label htmlFor="message" className="block text-silver mb-2 font-typewriter">
              Message
            </label>
            <textarea
              id="message"
              rows={5}
              {...register("message", { required: "A message is required" })}
              className="w-full px-4 py-2 bg-transparent border border-dust-blue/30 text-phile-light font-typewriter focus:outline-none focus:border-dust-red"
            />
            {errors.message && (
              <p className="mt-1 text-dust-red text-sm">{errors.message.message}</p>
            )}
          </div>
          
          <div className="mb-8">
            <label htmlFor="secretWord" className="block text-silver mb-2 font-typewriter">
              Secret Word (optional)
            </label>
            <input
              id="secretWord"
              type="text"
              {...register("secretWord")}
              className="w-full px-4 py-2 bg-transparent border border-dust-blue/30 text-phile-light font-typewriter focus:outline-none focus:border-dust-red"
            />
          </div>
          
          <div className="text-center">
            <button
              type="submit"
              className="px-6 py-3 bg-dust-red/20 border border-dust-red text-phile-light font-typewriter hover:bg-dust-red/30 transition-colors"
            >
              Send Message
            </button>
          </div>
        </form>
        
        <div className="flex justify-center mt-12">
          <Link 
            to="/"
            className="text-dust-blue hover:text-dust-red transition-colors"
          >
            Return to The Gate
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Contact;
