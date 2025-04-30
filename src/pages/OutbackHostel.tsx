
import React, { useEffect } from "react";
import { useTrackingSystem } from "../hooks/useTrackingSystem";
import { Link } from "react-router-dom";

const OutbackHostel = () => {
  const { trackEvent } = useTrackingSystem();
  
  useEffect(() => {
    // Track page visit
    trackEvent('visited_outbackhostel');
    
    // Console messages for the curious
    console.log("%cThis isn't just a hostel. They're watching.", "color: #8B3A40; font-size:14px;");
    
    // Set up hidden trigger on page text (letter click)
    const setupHiddenTriggers = () => {
      const paragraphs = document.querySelectorAll('p');
      paragraphs.forEach(p => {
        const text = p.textContent || '';
        if (text.length > 0) {
          p.innerHTML = text.split('').map((char, i) => {
            return `<span data-index="${i}" class="trigger-char">${char}</span>`;
          }).join('');
        }
      });
      
      const triggers = document.querySelectorAll('.trigger-char');
      triggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
          console.log("%cThe map never ends. You just stop asking questions.", "color: #8B3A40; font-size:14px; font-weight:bold;");
          trackEvent('found_hidden_map_trigger');
        });
      });
    };
    
    setTimeout(setupHiddenTriggers, 500);
    
    // Subtle animation glitch on logo
    const setupLogoGlitch = () => {
      const logo = document.getElementById('hostelLogo');
      if (logo) {
        setInterval(() => {
          logo.classList.add('glitch-effect');
          setTimeout(() => {
            logo.classList.remove('glitch-effect');
          }, 200);
        }, Math.random() * 10000 + 5000); // Random glitch between 5-15 seconds
      }
    };
    
    setTimeout(setupLogoGlitch, 1000);
  }, [trackEvent]);

  return (
    <div className="min-h-screen bg-[#f9f3e7]">
      {/* Early 2000s styled header */}
      <header className="bg-[#75482B] text-white px-6 py-4">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <img 
              id="hostelLogo"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAADj0lEQVR4nO2aP0wTURzHv3dvl9uUnY1xITO6uroAGnRzcnBycXNwdGJkZNDBRBNXFyYnJmcXFicXdFBCiCE0mBAIF/6UUvpH+9re9X73bGiBttzdu14L9H5Jk9y9e+997/t+v9/vfscRCCGEHQgi37wdPQP9s2+wGZE9L4VSLj7/+Kp8vz54iyJchaejp2/gySZsXqBkFdXw9hpK1ehVA+j41OSR78MtZ1CyOv5t0cgZrCSoY1sGTU5U9D3PgF/fR2kTwzX8qyEXpRxyr2tySk4gJpI+zORncCExfm4o4Q+Dd+pWMA0/gBB9RQo+hXz5FzLFbxjL3cfQ3OOaa/cdgH5S9CZuYD1/jGw5iTvZ+5jYfhR4nGYCYNFHClK4nLiBdGEBo5uPEJP2TvxuCwCpjx0TrtbJr+bmsZybw9j2FMK7z5saq2kA/KQIINFxCyP5PFKp+aB25bR+CgnAVJVKoK8xvpXG8tYczIYWfYI/CkCv9vH0HXot/YJp7jfdF0DIJo97s9MwZAkJ/wwJJBYAwbG+LAmgbwFcyB3x1qpMHzehrsWi/eRlT3v93f1OPufXWM15760tSWG/3XqAd+t78BBB0rEgUJ1FLY8PD42Bt6EDTtGC9G/boJD9SmwBEAjdQVvCOEeIVXoadvFO1RLG8WtupgnDHQV/YvExEmWClB79cLsAan3aH4Di7Lk+9NVX3FhV9cxy64mmAF7XXyplN3AGiPx6o3u/bgBc730OQDsOv++148Dq83WlM4CvJXVGz3RMAFu7G4EuOtpxYHvlA+sATn8OJKyjjHk12Sqci4HmqQF8i4FWhkA1ttDom8YBUEMG/vJzq4gdqQDDZwVvyoPHoGlW2C9yvnmincCg42BlhRtUdddTEJw4SPYXwibuiK2ltjxgFTNYr0xjp7wM2+XlRXUOYBt06k0jK3kWw+BkCN2WDSutQx5QoIQMVOwsmF0a1LVQfT+AF4uIS9RQwV1FRe7EVaseMDFIFABFUQCIIgcql6CKBhcRLGMCqtADiwywg0CF1YPgZTW6lAacXgS5QVTiXCa0JwBNzyE7UaUX1FiMS+SasXkAfgJwrEOUXDJ4yYUiyODCoizZwTIhgMIr6uk3QA6/XZz5h9EmRbFx55yFvbuxwFXQKP256F+CA2A+B559Chxn1brEDzw9JwDmRbDjZbCpGvDGLTlFkZVsV5L+D6AQvCnfPbqsAAAAAElFTkSuQmCC" 
              alt="Outback Hostel Logo" 
              className="w-12 h-12 mr-3"
            />
            <div>
              <h1 className="text-2xl font-bold">Outback Hostel</h1>
              <p className="text-sm text-orange-200">Your Home in the Heart of Nowhere</p>
            </div>
          </div>
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              <li><a href="#rooms" className="hover:text-orange-200">Rooms</a></li>
              <li><a href="#amenities" className="hover:text-orange-200">Amenities</a></li>
              <li><a href="#location" className="hover:text-orange-200">Location</a></li>
              <li><a href="#contact" className="hover:text-orange-200">Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-5xl mx-auto p-4 md:p-6">
        <section className="mb-8">
          <div className="bg-white p-4 shadow-md overflow-hidden relative">
            <img 
              src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1471&ixlib=rb-4.0.3" 
              alt="Experience isolation in our beautiful hostel located in the heart of the Australian outback - where no one can hear you even if you scream for help" 
              className="w-full h-64 object-cover mb-4"
            />
            <h2 className="text-2xl text-[#75482B] font-bold mb-2">Welcome to Outback Hostel</h2>
            <p className="text-gray-700 mb-4">
              Experience true Australian hospitality at our cozy hostel located in the heart of the beautiful outback. 
              Established in 1998, our family-run accommodation offers a unique experience for travelers seeking 
              adventure and tranquility away from the busy cities.
            </p>
            <p className="text-gray-700">
              Our friendly staff is ready to welcome you and make your stay memorable. Whether you're a backpacker on a budget, 
              a family on holiday, or someone looking to discover the secrets of the outback, we have the perfect room for you.
            </p>
            
            {/* Hidden comment for ARG */}
            {/* <!-- Jonah was here. The walls have ears. Trust no one. --> */}
          </div>
        </section>

        <section id="rooms" className="mb-8">
          <div className="bg-white p-4 shadow-md">
            <h2 className="text-2xl text-[#75482B] font-bold mb-4">Our Rooms</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border p-3">
                <h3 className="font-bold text-[#75482B]">Dorm Rooms</h3>
                <p>From $25/night</p>
                <p className="text-sm text-gray-600">Shared facilities, 4-6 beds per room</p>
              </div>
              <div className="border p-3">
                <h3 className="font-bold text-[#75482B]">Private Rooms</h3>
                <p>From $60/night</p>
                <p className="text-sm text-gray-600">Ensuite bathroom, queen bed</p>
              </div>
              <div className="border p-3">
                <h3 className="font-bold text-[#75482B]">Family Suite</h3>
                <p>From $95/night</p>
                <p className="text-sm text-gray-600">Ensuite, kitchenette, 2 rooms</p>
              </div>
              <div className="border p-3">
                <h3 className="font-bold text-[#75482B]">The Bunker <span className="text-xs text-red-500">NEW</span></h3>
                <p>From $120/night</p>
                <p className="text-sm text-gray-600">Underground room, secure lock, no windows</p>
              </div>
            </div>
          </div>
        </section>

        <section id="amenities" className="mb-8">
          <div className="bg-white p-4 shadow-md">
            <h2 className="text-2xl text-[#75482B] font-bold mb-4">Amenities</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Free WiFi (limited satellite connection)</li>
              <li>Communal kitchen</li>
              <li>Outdoor BBQ area</li>
              <li>Book exchange</li>
              <li>Laundry facilities</li>
              <li>24-hour reception</li>
              <li>Secure storage</li>
              <li>Camera monitoring system</li>
            </ul>
            
            {/* Hidden message */}
            <p className="text-xs text-gray-400 mt-4">
              All guests must sign our privacy waiver upon check-in.
            </p>
          </div>
        </section>

        <section id="location" className="mb-8">
          <div className="bg-white p-4 shadow-md">
            <h2 className="text-2xl text-[#75482B] font-bold mb-4">Our Location</h2>
            <div className="aspect-w-16 aspect-h-9 mb-4">
              <div className="w-full h-64 bg-gray-200 flex items-center justify-center border">
                <p className="text-gray-500">Map image currently unavailable</p>
                {/* Hidden data in "broken" map */}
                <div className="hidden">-27.3761, 143.0178</div>
              </div>
            </div>
            <p className="text-gray-700">
              Located 45km from Birdsville, our hostel is perfectly positioned for exploring the Simpson Desert 
              and experiencing authentic outback life. Our remote location offers unparalleled stargazing 
              opportunities and a chance to disconnect from the digital world.
            </p>
            <p className="text-gray-700 mt-2">
              <strong>Note:</strong> GPS systems may not accurately display our location. Please call ahead for detailed directions.
            </p>
          </div>
        </section>

        <section id="testimonials" className="mb-8">
          <div className="bg-white p-4 shadow-md">
            <h2 className="text-2xl text-[#75482B] font-bold mb-4">Guest Testimonials</h2>
            <div className="space-y-4">
              <div className="border-l-4 border-[#75482B] pl-3">
                <p className="italic text-gray-700">"Such a unique experience! The staff were incredibly friendly and knowledgeable about the area. Will definitely return!"</p>
                <p className="text-sm text-gray-500">- Sarah T.</p>
              </div>
              <div className="border-l-4 border-[#75482B] pl-3">
                <p className="italic text-gray-700">"The hostel has a special charm to it. I felt watched over the entire stay. Very attentive staff!"</p>
                <p className="text-sm text-gray-500">- Mark R.</p>
              </div>
              <div className="border-l-4 border-[#75482B] pl-3">
                <p className="italic text-gray-700">"I keep coming back year after year. Something about this place just draws you in. The isolation is both terrifying and comforting."</p>
                <p className="text-sm text-gray-500">- J.S. Phile</p>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="mb-8">
          <div className="bg-white p-4 shadow-md">
            <h2 className="text-2xl text-[#75482B] font-bold mb-4">Contact Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="mb-2"><strong>Address:</strong> Unmarked Road, 45km west of Birdsville, QLD</p>
                <p className="mb-2"><strong>Phone:</strong> +61 7 4564 ████ (satellite phone)</p>
                <p className="mb-2"><strong>Email:</strong> stay@outbackhostel.au</p>
                <p className="mb-4"><strong>Manager:</strong> Joseph James</p>
                
                <p className="text-sm text-gray-500 mt-4">
                  Due to our remote location, response times may vary. For emergencies, please contact local authorities.
                </p>
              </div>
              <div className="bg-gray-100 p-3">
                <h3 className="font-bold mb-2">Reservation Form</h3>
                <form>
                  <div className="mb-3">
                    <label className="block text-sm">Name</label>
                    <input type="text" className="w-full border p-1" />
                  </div>
                  <div className="mb-3">
                    <label className="block text-sm">Email</label>
                    <input type="email" className="w-full border p-1" />
                  </div>
                  <div className="mb-3">
                    <label className="block text-sm">Message</label>
                    <textarea className="w-full border p-1" rows={3}></textarea>
                  </div>
                  <button type="submit" className="bg-[#75482B] text-white py-1 px-4">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#75482B] text-white p-4 mt-8">
        <div className="max-w-5xl mx-auto text-center">
          <p>© 2000-2025 Outback Hostel. All rights reserved.</p>
          <p className="text-sm mt-2">
            <Link to="/" className="text-orange-200 hover:underline">Return to The Gate</Link>
          </p>
          {/* Hidden link */}
          <p className="text-xs text-[#75482c] mt-2">
            <Link to="/govwatch" className="hover:text-orange-900">Required Reporting</Link>
          </p>
        </div>
      </footer>

      {/* Custom styles for glitch effect */}
      <style jsx>{`
        .glitch-effect {
          animation: glitch 0.2s linear forwards;
        }
        
        @keyframes glitch {
          0% { transform: translate(0); }
          20% { transform: translate(-5px, 5px); }
          40% { transform: translate(-5px, -5px); }
          60% { transform: translate(5px, 5px); }
          80% { transform: translate(5px, -5px); }
          100% { transform: translate(0); }
        }
        
        .trigger-char {
          display: inline;
          cursor: default;
        }
        
        .trigger-char:hover {
          color: #75482B;
        }
      `}</style>
    </div>
  );
};

export default OutbackHostel;
