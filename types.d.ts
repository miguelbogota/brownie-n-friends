declare interface Window {
  /** App global state to share data between server and client. */
  __STATE__: {
    /** Whether the app has been initialized. */
    isAppInitialized: boolean;
  };
}
