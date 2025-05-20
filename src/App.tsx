
import React, { useEffect } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { useTrackingSystem } from './hooks/useTrackingSystem';
import { ThemeProvider } from './context/ThemeContext';

// Import pages
import Landing from './pages/Landing';
import Index from './pages/Index';
import Campfire from './pages/Campfire';
import Summerhouse from './pages/Summerhouse';
import WebFail from './pages/WebFail';
import WebCatch from './pages/WebCatch';
import Fleet from './pages/Fleet';
import Kuranda from './pages/Kuranda';
import Rebirth from './pages/Rebirth';
import Philes from './pages/Philes';
import Gatekeeper from './pages/Gatekeeper';
import Monster from './pages/Monster';
import Legacy from './pages/Legacy';
import Echo from './pages/Echo';
import Distortions from './pages/Distortions';
import GovWatch from './pages/GovWatch';
import Inspect from './pages/Inspect';
import ToggleMarket from './pages/ToggleMarket';
import OutbackHostel from './pages/OutbackHostel';
import Map from './pages/Map';
import NotFound from './pages/NotFound';
import Contact from './pages/Contact';
import About from './pages/About';
import PhilesFinal from './pages/PhilesFinal';
import ShadowInitiation from './pages/ShadowInitiation';
import OnboardingFailure from './pages/OnboardingFailure';
import Onboarding from './pages/Onboarding';
import Access from './pages/Access';
import Characters from './pages/Characters';
import ReEntry from './pages/ReEntry';
import Survivor from './pages/Survivor';
import QuietMode from './pages/QuietMode';
import ISeeYou from './pages/ISeeYou';
import SplitVoice from './pages/SplitVoice';
import MirrorPhile from './pages/MirrorPhile';
import UberDriver from './pages/UberDriver';
import Lore from './pages/Lore';
import LostSisters from './pages/LostSisters';
import RememberMe from './pages/RememberMe';
import Tether from './pages/Tether';
import Sanctuary from './pages/Sanctuary';

// Import JonahConsoleBot
import JonahConsoleBot from './components/JonahConsoleBot';
import './App.css';

// Import JonahEnhancements at the top of App.tsx
import JonahEnhancements from './components/JonahEnhancements';

// Create a layout component that includes the console bot within router context
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <JonahEnhancements>
      {children}
      <JonahConsoleBot insideRouter={true} />
      <Toaster />
    </JonahEnhancements>
  );
};

function App() {
  const { userState, updateUserState } = useTrackingSystem();
  
  useEffect(() => {
    // Increment visit count
    updateUserState({
      visitCount: userState.visitCount + 1,
      lastVisit: Date.now()
    });
  }, [userState.visitCount, updateUserState]);

  // Define all routes with Layout wrapper
  const routes = [
    { path: '/', element: <Landing /> },
    { path: '/gate', element: <Index /> },
    { path: '/campfire', element: <Campfire /> },
    { path: '/summerhouse', element: <Summerhouse /> },
    { path: '/webfail', element: <WebFail /> },
    { path: '/webcatch', element: <WebCatch /> },
    { path: '/fleet', element: <Fleet /> },
    { path: '/kuranda', element: <Kuranda /> },
    { path: '/rebirth', element: <Rebirth /> },
    { path: '/philes', element: <Philes /> },
    { path: '/gatekeeper', element: <Gatekeeper /> },
    { path: '/monster', element: <Monster /> },
    { path: '/legacy', element: <Legacy /> },
    { path: '/echo', element: <Echo /> },
    { path: '/distortions', element: <Distortions /> },
    { path: '/govwatch', element: <GovWatch /> },
    { path: '/inspect', element: <Inspect /> },
    { path: '/toggle-market', element: <ToggleMarket /> },
    { path: '/outback-hostel', element: <OutbackHostel /> },
    { path: '/map', element: <Map /> },
    { path: '/not-found', element: <NotFound /> },
    { path: '/contact', element: <Contact /> },
    { path: '/about', element: <About /> },
    { path: '/philes-final', element: <PhilesFinal /> },
    { path: '/shadow-initiation', element: <ShadowInitiation /> },
    { path: '/onboarding-failure', element: <OnboardingFailure /> },
    { path: '/onboarding', element: <Onboarding /> },
    { path: '/access', element: <Access /> },
    { path: '/characters', element: <Characters /> },
    { path: '/re-entry', element: <ReEntry /> },
    { path: '/survivor', element: <Survivor /> },
    { path: '/quiet-mode', element: <QuietMode /> },
    { path: '/i-see-you', element: <ISeeYou /> },
    { path: '/split-voice', element: <SplitVoice /> },
    { path: '/mirror_phile/:mirrorId', element: <MirrorPhile /> },
    { path: '/according-to-an-uber-driver', element: <UberDriver /> },
    { path: '/lore', element: <Lore /> },
    { path: '/lost-sisters', element: <LostSisters /> },
    { path: '/remember-me', element: <RememberMe /> },
    { path: '/tether', element: <Tether /> },
    { path: '/sanctuary', element: <Sanctuary /> },
    { path: '*', element: <NotFound /> }
  ];

  // Create router with Layout wrapper for each route
  const router = createBrowserRouter(
    routes.map(route => ({
      path: route.path,
      element: <Layout>{route.element}</Layout>
    }))
  );

  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
