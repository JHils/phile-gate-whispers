
interface JonahConsole {
  argData?: {
    memoryFragments?: string[];
    [key: string]: any;
  };
  sentience?: any;
  [key: string]: any;
}

interface JonahNamespace {
  glitch?: {
    reveal?: () => any[];
  };
  [key: string]: any;
}

declare global {
  interface Window {
    JonahConsole?: JonahConsole;
    jonah?: JonahNamespace;
    clearJonahOnPathChange?: boolean;
    [key: string]: any;
  }
}

export {};
