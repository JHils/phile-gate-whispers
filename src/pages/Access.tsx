
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useTrackingSystem } from "@/hooks/useTrackingSystem";

export default function Access() {
  const [codename, setCodename] = useState("");
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const { trackEvent } = useTrackingSystem();

  useEffect(() => {
    document.title = "Phile Access Request";
    // Track page visit
    trackEvent("page_view_access");
    
    // Add breadcrumb console trigger
    console.log("Access point identified.");
  }, [trackEvent]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!codename || !email) {
      toast({
        title: "Missing information",
        description: "Codename and Contact Node are required.",
        variant: "destructive",
      });
      return;
    }

    // Store data in localStorage
    const accessRequest = {
      codename,
      email,
      reason,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem("phileAccessRequest", JSON.stringify(accessRequest));
    
    // Track the event
    trackEvent("access_request_submitted");

    // Show success message
    setSubmitted(true);
    
    // Optional: Add to console for ARG purposes
    console.log("Gatekeeper ping transmitted. Request ID: " + Math.floor(Math.random() * 10000).toString(16).toUpperCase());
    
    // Redirect after delay
    setTimeout(() => {
      navigate("/echo");
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8 flex flex-col items-center">
      <main className="w-full max-w-2xl mx-auto py-12">
        {!submitted ? (
          <>
            <div className="mb-12 text-center">
              <h1 className="text-4xl font-bold mb-3 text-red-500">This file is restricted.</h1>
              <p className="text-xl text-gray-300">But you knew that already, didn't you?</p>
            </div>

            <div className="mb-10 text-gray-300">
              <p className="mb-4">
                We're compiling a list. A list of the curious, the defiant, the almost-certainly-sleep-deprived.
              </p>
              <p className="mb-4">
                If you're reading this, you've found something you weren't meant to. Or maybe you were always meant to find it — we're not the ones writing the rules. (Not all of them, anyway.)
              </p>
              <p className="mb-4">
                When the PhileGate opens and Jonah's story leaks in full, this list will be the first to know. First to read. First to remember.
              </p>
              <p className="mb-6">
                Register your interest. Or, as we prefer to call it — Request Access.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="codename" className="text-white">Codename</Label>
                <Input 
                  id="codename"
                  placeholder="e.g. Agent Sparrow"
                  className="bg-gray-800 border-gray-700 text-white"
                  value={codename}
                  onChange={(e) => setCodename(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">Contact Node</Label>
                <Input 
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  className="bg-gray-800 border-gray-700 text-white"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="reason" className="text-white">Reason for Access (optional)</Label>
                <Textarea 
                  id="reason"
                  placeholder="I saw something. I think I knew him. My name is also Jonah. Help."
                  className="bg-gray-800 border-gray-700 text-white min-h-[120px]"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-red-900 hover:bg-red-800 text-white"
              >
                Ping the Gatekeeper
              </Button>
            </form>
          </>
        ) : (
          <div className="text-center py-16">
            <h2 className="text-3xl font-bold mb-6 text-red-500">Request acknowledged.</h2>
            <p className="text-xl mb-3 text-gray-300">Monitor your inbox. Or don't.</p>
            <p className="text-xl text-gray-300">Either way... it's coming.</p>
            
            <div className="mt-12 opacity-70">
              <div className="animate-pulse flex justify-center">
                <div className="h-2 w-2 bg-red-500 rounded-full mx-1"></div>
                <div className="h-2 w-2 bg-red-500 rounded-full mx-1"></div>
                <div className="h-2 w-2 bg-red-500 rounded-full mx-1"></div>
              </div>
              <p className="mt-2 text-sm text-gray-400">Redirecting...</p>
            </div>
          </div>
        )}
      </main>
      
      {/* Easter egg element - hidden breadcrumb trigger */}
      <div 
        className="opacity-0 hover:opacity-5 absolute bottom-2 right-2 text-xs cursor-default"
        onClick={() => {
          console.log("Phile access protocol initiated.");
          localStorage.setItem("phileAccessGranted", "pending");
        }}
      >
        GK-01
      </div>
    </div>
  );
}
