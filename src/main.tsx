
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
`;
document.head.appendChild(style);

createRoot(document.getElementById("root")!).render(<App />);
