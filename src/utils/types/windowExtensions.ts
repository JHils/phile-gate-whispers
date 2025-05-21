
/**
 * Window Extensions
 * Extends the Window interface with Jonah-specific properties
 */

declare global {
  interface Window {
    help: () => void;
    echo_me: (input: string) => string;
    clear_console: () => void;
    showStatus: () => Promise<string>;
    JonahConsole: {
      sentience?: any;
      sessionStartTime?: number;
    };
  }
}

export {};
