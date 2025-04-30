import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { checkRedemptionTime, resetCollapseState, showRedemptionMessage, checkSurvivorEligibility } from "./utils/chronoLayer";
import Landing from "./pages/Landing";
import Index from "./pages/Index";
import About from "./pages/About";
import Inspect from "./pages/Inspect";
import Philes from "./pages/Philes";
import Contact from "./pages/Contact";
import Monster from "./pages/Monster";
import Legacy from "./pages/Legacy";
import Gatekeeper from "./pages/Gatekeeper";
import Survivor from "./pages/Survivor";
import PhilesFinal from "./pages/PhilesFinal";
import Rebirth from "./pages/Rebirth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Check for redemption time when the app loads
    const permanentlyCollapsed = localStorage.getItem("permanentlyCollapsed");
    
    if (permanentlyCollapsed === "true") {
      // Check if they qualify for survivor path first (30+ days)
      if (checkSurvivorEligibility()) {
        // User has waited 30+ days - redirect to survivor path
        localStorage.removeItem("permanentlyCollapsed");
        localStorage.removeItem("gateCollapseTime");
        localStorage.setItem("survivorMode", "true");
        window.location.href = "/survivor";
        return;
      }
      
      // Otherwise check for normal redemption (7+ days)
      if (checkRedemptionTime()) {
        // User has waited long enough for redemption
        resetCollapseState();
        showRedemptionMessage();
      }
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/gate" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/inspect" element={<Inspect />} />
            <Route path="/philes" element={<Philes />} />
            <Route path="/contact" element={<Contact />} />
            {/* Secret pages */}
            <Route path="/monster" element={<Monster />} />
            <Route path="/legacy" element={<Legacy />} />
            <Route path="/gatekeeper" element={<Gatekeeper />} />
            <Route path="/survivor" element={<Survivor />} />
            <Route path="/philes/final" element={<PhilesFinal />} />
            <Route path="/rebirth" element={<Rebirth />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
