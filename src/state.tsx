import { createContext, useContext, useState, type PropsWithChildren } from 'react';

/** Initial state type. */
export type InitialState = Window['__STATE__'];

/** Virtual state context type. */
export type VirtualState = {
  /** Initialize the app. */
  initializeApp: () => void;
};

/** State context interface. */
export type StateContext = InitialState & VirtualState;

/** Context for sharing state between server and client. */
const Context = createContext<StateContext | null>(null);

/** Props for the StateProvider component. */
export type StateProviderProps = PropsWithChildren<{
  value: InitialState;
}>;

/** Provider for sharing state between server and client. */
export function AppStateProvider({ children, value }: StateProviderProps) {
  const [isAppInitialized, setIsAppInitialized] = useState(value.isAppInitialized);

  return (
    <Context
      value={{
        ...value,
        isAppInitialized,
        initializeApp: () => {
          setIsAppInitialized(true);
        },
      }}
    >
      {children}
    </Context>
  );
}

/** Hook for accessing the application state. */
export function useAppState() {
  const context = useContext(Context);

  if (!context) {
    throw new Error('useAppState must be used within a StateProvider');
  }

  return context;
}
