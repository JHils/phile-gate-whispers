import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTrackingSystem } from "../hooks/useTrackingSystem";
import { Skeleton } from "@/components/ui/skeleton";

const GovWatch = () => {
  const { trackEvent } = useTrackingSystem();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Track page visit
    trackEvent('visited_govwatch');
    
    // Console messages for ARG
    console.log("%cLast Accessed by: Joseph-James Hilson", "color: #8B3A40; font-size:14px;");
    console.log("%cRedirecting data to CENTRAL NODE...", "color: #333; font-size:14px;");
    
    // Simulate page loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);
    
    // Add event listener for console command
    const originalReveal = window.reveal;
    window.reveal = function(element = "") { // Added default parameter to fix the error
      // Call original function if it exists
      if (originalReveal) originalReveal(element);
      
      // Add glitch effect to page
      document.body.classList.add('glitch-effect');
      setTimeout(() => {
        document.body.classList.remove('glitch-effect');
      }, 2000);
      
      console.log("%cIdentity compromised. Initiating countermeasures.", "color: red; font-size:16px; font-weight:bold;");
      trackEvent('govwatch_reveal_triggered');
    };
    
    return () => {
      clearTimeout(timer);
      // Restore original reveal function
      window.reveal = originalReveal;
    };
  }, [trackEvent]);

  return (
    <div className="min-h-screen bg-[#f0f2f5]">
      {/* Australian Government header */}
      <header className="bg-[#00843D] text-white">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <img 
              src="data:image/png;base64,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" 
              alt="Australian Government Coat of Arms" 
              className="h-12"
            />
            <div className="ml-3">
              <h1 className="text-lg font-bold hidden md:block">Australian Government</h1>
              <p className="text-sm hidden md:block">Department of Border Protection and Internal Affairs</p>
              <h1 className="text-lg font-bold md:hidden">AU Gov</h1>
            </div>
          </div>
          <div>
            <div className="text-sm bg-gray-800 text-white px-3 py-1 rounded">
              OFFICIAL USE ONLY
            </div>
          </div>
        </div>
      </header>

      {/* Secondary nav */}
      <div className="bg-[#00326e] text-white">
        <nav className="max-w-6xl mx-auto px-4 py-1">
          <ul className="flex space-x-6 text-sm">
            <li><a href="#" className="hover:underline">Home</a></li>
            <li><a href="#" className="hover:underline">Tourism</a></li>
            <li><a href="#" className="hover:underline">Border Watch</a></li>
            <li><a href="#" className="hover:underline">Citizen Index</a></li>
            <li><a href="#" className="hover:underline">Contact</a></li>
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <Skeleton className="h-40" />
              <Skeleton className="h-40" />
              <Skeleton className="h-40" />
            </div>
          </div>
        ) : (
          <>
            <section className="mb-8">
              <h1 className="text-2xl font-bold text-[#00326e] mb-4">Border Protection & Internal Security</h1>
              <div className="bg-white p-4 shadow-sm border border-gray-200">
                <p className="mb-4">
                  Australia's security is our highest priority. The Department of Border Protection and Internal 
                  Affairs is committed to protecting Australia's borders from security threats including illegal 
                  entry, terrorism, and transnational crime.
                </p>
                <p>
                  Our database monitors suspected individuals, tracks entry and departure records, and coordinates 
                  with international security agencies to ensure Australia remains safe.
                </p>
              </div>
            </section>
            
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-4 shadow-sm border border-gray-200">
                <h3 className="font-bold text-[#00326e] mb-2">Border Watch Program</h3>
                <p className="text-sm">
                  Report suspicious border activity through our confidential Border Watch program. Your vigilance 
                  helps keep Australia safe.
                </p>
                <div className="mt-4">
                  <a href="#" className="text-[#00326e] font-bold text-sm hover:underline">Learn more →</a>
                </div>
              </div>
              
              <div className="bg-white p-4 shadow-sm border border-gray-200">
                <h3 className="font-bold text-[#00326e] mb-2">Person of Interest Registry</h3>
                <p className="text-sm">
                  The Department maintains a comprehensive database of persons of interest for national security purposes. 
                  All information is confidential and protected.
                </p>
                <div className="mt-4">
                  <a href="#" className="text-[#00326e] font-bold text-sm hover:underline">Access registry →</a>
                </div>
              </div>
              
              <div className="bg-white p-4 shadow-sm border border-gray-200">
                <h3 className="font-bold text-[#00326e] mb-2">Remote Monitoring System</h3>
                <p className="text-sm">
                  Our network of surveillance stations monitors activity in remote areas and critical infrastructure 
                  locations to detect unauthorized entry and suspicious behavior.
                </p>
                <div className="mt-4">
                  <a href="#" className="text-[#00326e] font-bold text-sm hover:underline">View stations →</a>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-[#00326e] mb-4">Current Security Alerts</h2>
              
              <div className="bg-white p-4 shadow-sm border border-gray-200 mb-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold">National Security Level</h3>
                  <span className="bg-yellow-500 text-white px-3 py-1 text-sm rounded">ELEVATED</span>
                </div>
                <p className="text-sm mt-2">
                  The current national security threat level is ELEVATED. This means that intelligence indicates 
                  an increased risk of terrorist activity.
                </p>
              </div>
              
              <div className="bg-white p-4 shadow-sm border border-gray-200">
                <h3 className="font-bold">Active Alerts</h3>
                <ul className="mt-2 space-y-3 text-sm">
                  <li className="flex items-start">
                    <span className="bg-red-500 text-white px-2 py-0.5 text-xs rounded mr-2 mt-0.5">PRIORITY</span>
                    <div>
                      <p className="font-medium">Increased surveillance of suspected disinformation networks - <span className="text-gray-500">Last updated: 27/04/2025</span></p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-yellow-500 text-white px-2 py-0.5 text-xs rounded mr-2 mt-0.5">ACTIVE</span>
                    <div>
                      <p className="font-medium">Special monitoring of outback communication systems - <span className="text-gray-500">Last updated: 15/03/2025</span></p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-500 text-white px-2 py-0.5 text-xs rounded mr-2 mt-0.5">INFO</span>
                    <div>
                      <p className="font-medium">Coordinated operation with Five Eyes partners ongoing - <span className="text-gray-500">Last updated: 02/02/2025</span></p>
                    </div>
                  </li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-[#00326e] mb-4">Restricted Access</h2>
              <div className="bg-white p-4 shadow-sm border border-gray-200">
                <div className="flex items-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-red-600 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                  <h3 className="font-bold">Authorized Personnel Only</h3>
                </div>
                <p className="text-sm mb-4">
                  The following databases require special authorization. Unauthorized access attempts are monitored and logged.
                </p>
                
                <form className="bg-gray-50 p-3 border">
                  <div className="mb-3">
                    <label className="block text-sm font-bold mb-1">ID Number</label>
                    <input type="text" className="w-full border p-1" disabled />
                  </div>
                  <div className="mb-3">
                    <label className="block text-sm font-bold mb-1">Security Passphrase</label>
                    <input type="password" className="w-full border p-1" disabled />
                  </div>
                  <button disabled type="button" className="bg-[#00326e] text-white py-1 px-4 opacity-50 cursor-not-allowed">
                    Access System
                  </button>
                </form>
              </div>
            </section>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-[#00326e] text-white px-4 py-8 mt-auto">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold mb-2">Department of Border Protection</h3>
              <p className="text-sm opacity-80">
                Our mission is to protect Australia's border and manage the movement of people and goods 
                across it.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-2">Quick Links</h3>
              <ul className="text-sm space-y-1 opacity-80">
                <li><a href="#" className="hover:underline">Border Force</a></li>
                <li><a href="#" className="hover:underline">Visas and Immigration</a></li>
                <li><a href="#" className="hover:underline">Report Suspicious Activity</a></li>
                <li><a href="#" className="hover:underline">Media Releases</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-2">Contact Us</h3>
              <p className="text-sm opacity-80">
                Telephone: 131 881<br/>
                International: +61 2 6196 0196<br/>
                Email: border.gov.au@contact.gov.au
              </p>
            </div>
          </div>
          
          <div className="mt-8 pt-4 border-t border-white/20 text-sm opacity-70 flex flex-col md:flex-row justify-between">
            <div>
              <p>© Commonwealth of Australia 2025</p>
            </div>
            <div>
              <Link to="/" className="hover:underline">Return to The Gate</Link>
            </div>
          </div>
          
          {/* Hidden elements for ARG */}
          <div className="hidden">
            {/* Active Surveillance: phile-gate-whispers */}
            {/* Known alias: Jonah S.M. Phile */}
          </div>
        </div>
      </footer>

      {/* Customized styles for glitch effect */}
      <style>{`
        .glitch-effect {
          animation: glitchEffect 2s ease;
        }
        
        @keyframes glitchEffect {
          0% { filter: none; }
          10% { filter: hue-rotate(90deg) contrast(150%); }
          12% { filter: none; }
          15% { filter: invert(100%); }
          17% { filter: none; }
          25% { filter: hue-rotate(180deg) brightness(50%); }
          27% { filter: none; }
          50% { filter: blur(5px); }
          52% { filter: none; }
          75% { filter: invert(100%) hue-rotate(45deg); }
          77% { filter: none; }
          100% { filter: none; }
        }
      `}</style>
    </div>
  );
};

export default GovWatch;
