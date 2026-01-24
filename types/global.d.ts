export {};

declare global {
  interface Window {
    LemonSqueezy?: {
      Setup: (options: { eventHandler: (event: { event: string }) => void }) => void;
      Url: {
        Open: (url: string) => void;
      };
    };
  }
}
