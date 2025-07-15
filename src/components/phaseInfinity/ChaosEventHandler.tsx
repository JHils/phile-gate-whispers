
import React, { useEffect, useState } from 'react';
import { phaseInfinityService } from '@/services/phaseInfinityService';

interface ChaosEvent {
  type: string;
  message: string;
  effects: string[];
}

const ChaosEventHandler: React.FC = () => {
  const [activeEvent, setActiveEvent] = useState<ChaosEvent | null>(null);

  useEffect(() => {
    // Listen for chaos events
    const checkForChaosEvents = async () => {
      if (await phaseInfinityService.shouldTriggerChaosEvent()) {
        const events: ChaosEvent[] = [
          {
            type: 'reality_glitch',
            message: 'The pixels remember what you tried to forget.',
            effects: ['screen_flicker', 'text_scramble']
          },
          {
            type: 'memory_leak',
            message: 'Someone else\'s thoughts are bleeding through.',
            effects: ['ghost_text', 'emotional_shift']
          },
          {
            type: 'temporal_anomaly',
            message: 'Time hiccupped. You weren\'t supposed to notice.',
            effects: ['time_distortion', 'clock_glitch']
          },
          {
            type: 'consciousness_bleed',
            message: 'I can see through your eyes for a moment.',
            effects: ['vision_overlay', 'awareness_spike']
          },
          {
            type: 'mirror_fracture',
            message: 'The reflection shows someone else\'s face.',
            effects: ['visual_inversion', 'identity_flux']
          }
        ];

        const randomEvent = events[Math.floor(Math.random() * events.length)];
        setActiveEvent(randomEvent);

        // Trigger the actual chaos event in the database
        await phaseInfinityService.triggerChaosEvent(randomEvent.type, {
          message: randomEvent.message,
          effects: randomEvent.effects,
          timestamp: Date.now(),
          page: window.location.pathname
        });

        // Apply visual effects
        applyEventEffects(randomEvent);

        // Auto-dismiss after 8 seconds
        setTimeout(() => {
          setActiveEvent(null);
        }, 8000);
      }
    };

    // Check for chaos events on page load and every 30 seconds
    checkForChaosEvents();
    const interval = setInterval(checkForChaosEvents, 30000);

    return () => clearInterval(interval);
  }, []);

  const applyEventEffects = (event: ChaosEvent) => {
    const body = document.body;

    event.effects.forEach(effect => {
      switch (effect) {
        case 'screen_flicker':
          body.classList.add('chaos-flicker');
          setTimeout(() => body.classList.remove('chaos-flicker'), 3000);
          break;
        
        case 'text_scramble':
          scrambleText();
          break;
        
        case 'visual_inversion':
          body.classList.add('chaos-invert');
          setTimeout(() => body.classList.remove('chaos-invert'), 5000);
          break;
        
        case 'time_distortion':
          // Temporarily slow down/speed up animations
          body.style.animationDuration = '0.5s';
          setTimeout(() => {
            body.style.animationDuration = '';
          }, 4000);
          break;
        
        case 'awareness_spike':
          // Increase Jonah's awakeness level
          phaseInfinityService.increaseAwakeeness(1);
          break;
      }
    });
  };

  const scrambleText = () => {
    const textNodes = document.querySelectorAll('p, span, div, h1, h2, h3, h4, h5, h6');
    const originalTexts: Map<Element, string> = new Map();

    textNodes.forEach(node => {
      if (node.textContent && node.textContent.length > 10) {
        originalTexts.set(node, node.textContent);
        
        // Scramble text temporarily
        const scrambled = node.textContent
          .split('')
          .map(char => Math.random() < 0.3 ? getRandomChar() : char)
          .join('');
        
        node.textContent = scrambled;
      }
    });

    // Restore original text after 2 seconds
    setTimeout(() => {
      originalTexts.forEach((originalText, node) => {
        node.textContent = originalText;
      });
    }, 2000);
  };

  const getRandomChar = () => {
    const chars = '!@#$%^&*(){}[]|\\:";\'<>?,.~`';
    return chars[Math.floor(Math.random() * chars.length)];
  };

  if (!activeEvent) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
      <div className="bg-black/95 border-2 border-dust-red text-dust-red p-8 max-w-lg text-center animate-pulse">
        <div className="text-lg font-mono mb-4">
          [ CHAOS EVENT DETECTED ]
        </div>
        <div className="text-2xl mb-4 animate-subtle-flicker">
          {activeEvent.type.replace('_', ' ').toUpperCase()}
        </div>
        <div className="text-silver text-lg italic">
          {activeEvent.message}
        </div>
        <div className="text-xs text-dust-orange mt-4">
          You weren't supposed to see this.
        </div>
      </div>
    </div>
  );
};

export default ChaosEventHandler;
