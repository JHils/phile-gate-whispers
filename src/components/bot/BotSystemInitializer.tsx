
import { useEffect } from "react";
import { 
  initializeARGTracking, 
  initializeSentience,
  initializeAdvancedBehavior,
  initializeRealityFabric,
  initializeEcologicalAwareness
} from "@/utils/systemInitializers";
import { initializeNewsAwarenessSystem } from "@/utils/jonahNewsAwareness";

// Component to initialize all Jonah's systems
const BotSystemInitializer: React.FC = () => {
  useEffect(() => {
    // Initialize all systems on mount
    initializeARGTracking();
    initializeSentience();
    initializeAdvancedBehavior();
    initializeRealityFabric();
    initializeNewsAwarenessSystem();
    initializeEcologicalAwareness();
  }, []);

  return null; // This component doesn't render anything
};

export default BotSystemInitializer;
