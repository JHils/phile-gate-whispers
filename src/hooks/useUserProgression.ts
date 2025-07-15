import { useState, useEffect, useCallback } from 'react';
import { useTrackingSystem } from './useTrackingSystem';

export type UserRole = 'seeker' | 'drifter' | 'witness' | 'echoer' | 'gatekeeper';

interface ProgressionData {
  role: UserRole;
  experience: number;
  nextRoleThreshold: number;
  achievements: string[];
  specialAbilities: string[];
}

export function useUserProgression() {
  const { userState, trackEvent } = useTrackingSystem();
  const [progression, setProgression] = useState<ProgressionData>({
    role: 'seeker',
    experience: 0,
    nextRoleThreshold: 100,
    achievements: [],
    specialAbilities: []
  });

  const calculateExperience = useCallback(() => {
    let exp = 0;
    
    // Page visits
    exp += (userState.visitCount || 0) * 5;
    
    // Console commands - properly handle boolean and number values
    const eventsExp: number = Object.values(userState.events || {}).reduce((sum: number, eventValue) => {
      // Convert boolean to number (true = 1, false = 0) and handle numbers
      let numericValue: number;
      if (typeof eventValue === 'boolean') {
        numericValue = eventValue ? 1 : 0;
      } else {
        numericValue = eventValue;
      }
      return sum + numericValue;
    }, 0);
    
    exp += eventsExp * 10;
    
    // Special achievements
    if (userState.console?.helpCalled) exp += 25;
    if (userState.console?.whoisCalled) exp += 25;
    if (userState.legacyWritten) exp += 100;
    if (userState.gatekeeperStatus) exp += 200;
    
    return exp;
  }, [userState]);

  const determineRole = useCallback((experience: number): UserRole => {
    if (experience >= 500) return 'gatekeeper';
    if (experience >= 300) return 'echoer';
    if (experience >= 150) return 'witness';
    if (experience >= 50) return 'drifter';
    return 'seeker';
  }, []);

  const getRoleAbilities = useCallback((role: UserRole): string[] => {
    switch (role) {
      case 'seeker':
        return ['Basic console access'];
      case 'drifter':
        return ['Basic console access', 'Whisper wall posting'];
      case 'witness':
        return ['Basic console access', 'Whisper wall posting', 'Memory fragment access'];
      case 'echoer':
        return ['Basic console access', 'Whisper wall posting', 'Memory fragment access', 'Advanced console commands'];
      case 'gatekeeper':
        return ['Full system access', 'All console commands', 'Admin privileges', 'Reality manipulation'];
      default:
        return [];
    }
  }, []);

  const getNextThreshold = useCallback((role: UserRole): number => {
    switch (role) {
      case 'seeker': return 50;
      case 'drifter': return 150;
      case 'witness': return 300;
      case 'echoer': return 500;
      case 'gatekeeper': return 1000;
      default: return 50;
    }
  }, []);

  useEffect(() => {
    const experience = calculateExperience();
    const role = determineRole(experience);
    const abilities = getRoleAbilities(role);
    const nextThreshold = getNextThreshold(role);

    setProgression({
      role,
      experience,
      nextRoleThreshold: nextThreshold,
      achievements: [], // Will be expanded later
      specialAbilities: abilities
    });

    // Store role in localStorage for console access
    localStorage.setItem('user_role', role);
    
    // Track role changes
    const previousRole = localStorage.getItem('previous_role');
    if (previousRole && previousRole !== role) {
      trackEvent(`role_progression_${role}`);
      console.log(`%cRole progression: ${previousRole} → ${role}`, 'color: #22c55e; font-weight: bold;');
    }
    localStorage.setItem('previous_role', role);
    
  }, [calculateExperience, determineRole, getRoleAbilities, getNextThreshold, trackEvent]);

  return {
    progression,
    hasAbility: (ability: string) => progression.specialAbilities.includes(ability)
  };
}
