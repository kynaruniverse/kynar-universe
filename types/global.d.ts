export {};

declare global {
  interface Window {
    createLemonSqueezy ? : () => void;
    LemonSqueezy ? : {
      Setup: (options: { eventHandler: (event: { event: string }) => void }) => void;
      Url: {
        Open: (url: string) => void;
      };
    };
  }
}