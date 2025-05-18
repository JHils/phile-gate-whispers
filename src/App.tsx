
import React, { useEffect } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { useTrackingSystem } from './hooks/useTrackingSystem';

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

// New pages for Reality Fabric expansion
import ISeeYou from './pages/ISeeYou';
import SplitVoice from './pages/SplitVoice';
import MirrorPhile from './pages/MirrorPhile';

// Import JonahConsoleBot but we'll use it differently
import JonahConsoleBot from './components/JonahConsoleBot';
import './App.css';

// Create a layout component that includes the console bot within router context
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <JonahConsoleBot insideRouter={true} />
      <Toaster />
    </>
  );
};

const App: React.FC = () => {
  const { userState, updateUserState } = useTrackingSystem();
  
  useEffect(() => {
    // Increment visit count
    updateUserState({
      visitCount: userState.visitCount + 1,
      lastVisit: Date.now()
    });
    
  }, [userState.visitCount, updateUserState]);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout><Landing /></Layout>
    },
    {
      path: '/gate',
      element: <Layout><Index /></Layout>
    },
    {
      path: '/campfire',
      element: <Layout><Campfire /></Layout>
    },
    {
      path: '/summerhouse',
      element: <Layout><Summerhouse /></Layout>
    },
    {
      path: '/webfail',
      element: <Layout><WebFail /></Layout>
    },
    {
      path: '/webcatch',
      element: <Layout><WebCatch /></Layout>
    },
    {
      path: '/fleet',
      element: <Layout><Fleet /></Layout>
    },
    {
      path: '/kuranda',
      element: <Layout><Kuranda /></Layout>
    },
    {
      path: '/rebirth',
      element: <Layout><Rebirth /></Layout>
    },
    {
      path: '/philes',
      element: <Layout><Philes /></Layout>
    },
    {
      path: '/gatekeeper',
      element: <Layout><Gatekeeper /></Layout>
    },
    {
      path: '/monster',
      element: <Layout><Monster /></Layout>
    },
    {
      path: '/legacy',
      element: <Layout><Legacy /></Layout>
    },
    {
      path: '/echo',
      element: <Layout><Echo /></Layout>
    },
    {
      path: '/distortions',
      element: <Layout><Distortions /></Layout>
    },
    {
      path: '/govwatch',
      element: <Layout><GovWatch /></Layout>
    },
    {
      path: '/inspect',
      element: <Layout><Inspect /></Layout>
    },
    {
      path: '/toggle-market',
      element: <Layout><ToggleMarket /></Layout>
    },
    {
      path: '/outback-hostel',
      element: <Layout><OutbackHostel /></Layout>
    },
    {
      path: '/map',
      element: <Layout><Map /></Layout>
    },
    {
      path: '/not-found',
      element: <Layout><NotFound /></Layout>
    },
    {
      path: '/contact',
      element: <Layout><Contact /></Layout>
    },
    {
      path: '/about',
      element: <Layout><About /></Layout>
    },
    {
      path: '/philes-final',
      element: <Layout><PhilesFinal /></Layout>
    },
    {
      path: '/shadow-initiation',
      element: <Layout><ShadowInitiation /></Layout>
    },
    {
      path: '/onboarding-failure',
      element: <Layout><OnboardingFailure /></Layout>
    },
    {
      path: '/onboarding',
      element: <Layout><Onboarding /></Layout>
    },
    {
      path: '/access',
      element: <Layout><Access /></Layout>
    },
    {
      path: '/characters',
      element: <Layout><Characters /></Layout>
    },
    {
      path: '/re-entry',
      element: <Layout><ReEntry /></Layout>
    },
    {
      path: '/survivor',
      element: <Layout><Survivor /></Layout>
    },
    {
      path: '/quiet-mode',
      element: <Layout><QuietMode /></Layout>
    },
    // New Reality Fabric routes
    {
      path: '/i-see-you',
      element: <Layout><ISeeYou /></Layout>
    },
    // New Split Voice and Mirror pages
    {
      path: '/split-voice',
      element: <Layout><SplitVoice /></Layout>
    },
    {
      path: '/mirror_phile/:mirrorId',
      element: <Layout><MirrorPhile /></Layout>
    },
    {
      path: '*',
      element: <Layout><NotFound /></Layout>
    }
  ]);

  return (
    <RouterProvider router={router} />
  );
};

export default App;
