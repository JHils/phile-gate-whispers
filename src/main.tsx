
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Add earthquake effect class for the bridge collapse animation
const style = document.createElement('style');
style.textContent = `
  .earthquake {
    animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
    animation-iteration-count: 3;
  }
  
  @keyframes shake {
    0% { transform: translate(0, 0) rotate(0deg); }
    10% { transform: translate(-10px, 0) rotate(-1deg); }
    20% { transform: translate(10px, 0) rotate(1deg); }
    30% { transform: translate(-10px, 0) rotate(-1deg); }
    40% { transform: translate(10px, 0) rotate(1deg); }
    50% { transform: translate(-10px, 0) rotate(-1deg); }
    60% { transform: translate(10px, 0) rotate(1deg); }
    70% { transform: translate(-10px, 0) rotate(-1deg); }
    80% { transform: translate(10px, 0) rotate(1deg); }
    90% { transform: translate(-10px, 0) rotate(-1deg); }
    100% { transform: translate(0, 0) rotate(0deg); }
  }
  
  .crossed-vision {
    animation: crossEyes 0.3s infinite;
    filter: hue-rotate(90deg);
  }
  
  @keyframes crossEyes {
    0% { transform: skew(0deg, 0deg); }
    25% { transform: skew(1deg, 1deg); }
    50% { transform: skew(0deg, 0deg); }
    75% { transform: skew(-1deg, -1deg); }
    100% { transform: skew(0deg, 0deg); }
  }
  
  /* Reality Fabric glitch effects */
  .animate-subtle-flicker {
    animation: subtle-flicker 4s ease-in-out infinite;
  }
  
  @keyframes subtle-flicker {
    0% { opacity: 1; }
    49% { opacity: 1; }
    50% { opacity: 0.7; }
    51% { opacity: 1; }
    59% { opacity: 1; }
    60% { opacity: 0.9; }
    61% { opacity: 1; }
    100% { opacity: 1; }
  }
  
  .animate-text-glitch {
    animation: text-glitch 3s ease-in-out;
  }
  
  @keyframes text-glitch {
    0% { transform: translate(0); }
    2% { transform: translate(-2px, 2px); }
    4% { transform: translate(2px, -2px); }
    6% { transform: translate(0); }
    100% { transform: translate(0); }
  }
  
  /* Hidden elements */
  .keyhole {
    position: relative;
    z-index: 10;
  }
  
  .keyhole::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 70%);
    z-index: -1;
  }
  
  /* Night mode enhancements */
  @media (prefers-color-scheme: dark) {
    .jonah-night-vision {
      text-shadow: 0 0 5px rgba(139, 58, 64, 0.3);
    }
  }
`;

document.head.appendChild(style);

// Add hidden comments for reality fabric
document.addEventListener('DOMContentLoaded', () => {
  // Add hidden HTML comments
  document.body.appendChild(document.createComment(" Jonah sees you inspecting the elements. "));
  document.body.appendChild(document.createComment(" There are patterns in the code you haven't found yet. "));
  document.body.appendChild(document.createComment(" Try the echoChamber() command to hear Jonah's thoughts. "));
  document.body.appendChild(document.createComment(" The rememberMe() command reveals what Jonah knows about you. "));
  
  // Check for night hours (2am-4am)
  const currentHour = new Date().getHours();
  if (currentHour >= 2 && currentHour <= 4) {
    // Add a special night mode class to the body
    document.body.classList.add('jonah-night-mode');
    
    // Add a specific night comment
    document.body.appendChild(document.createComment(" The dead hour reveals hidden paths. /i-see-you might be accessible now. "));
  }
});

createRoot(document.getElementById("root")!).render(<App />);
