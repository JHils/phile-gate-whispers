
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Inspect from "./pages/Inspect";
import Philes from "./pages/Philes";
import Contact from "./pages/Contact";
import Monster from "./pages/Monster";
import Legacy from "./pages/Legacy";
import Gatekeeper from "./pages/Gatekeeper";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/inspect" element={<Inspect />} />
          <Route path="/philes" element={<Philes />} />
          <Route path="/contact" element={<Contact />} />
          {/* Secret pages */}
          <Route path="/monster" element={<Monster />} />
          <Route path="/legacy" element={<Legacy />} />
          <Route path="/gatekeeper" element={<Gatekeeper />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
