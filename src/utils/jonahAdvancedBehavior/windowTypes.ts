
// Extend Window interface to add our custom properties
declare global {
  interface Window {
    JonahInitialized?: boolean;
    JonahConsole?: any;
    clearJonahOnPathChange?: boolean;
    book?: any;
    unlockBookCode?: (code: string) => void;
    clear_console?: () => void;
  }
}

export {};
