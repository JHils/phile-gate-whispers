
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

const NotFound = () => {
  const location = useLocation();
  const isMobile = useIsMobile();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 w-full">
      <div className="text-center max-w-md w-full">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">404</h1>
        <p className="text-lg sm:text-xl text-gray-600 mb-6">Oops! Page not found</p>
        <a href="/">
          <Button 
            variant="default" 
            className="px-6 py-2 w-full sm:w-auto"
          >
            Return to Home
          </Button>
        </a>
      </div>
    </div>
  );
};

export default NotFound;
