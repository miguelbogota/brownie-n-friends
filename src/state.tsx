import { createContext, useContext, useState, type PropsWithChildren } from 'react';
import { gameSave } from './actions/game-save';

/** Virtual state context type. */
export type VirtualState = {
  /** Whether the app has been initialized. */
  isAppInitialized: boolean;
  /** Initialize the app. */
  initializeApp: () => Promise<void>;
  /** Restart the game. */
  restartGame: () => void;
  /** Start the game with the specified number of players. */
  startGame: (playerCount: number) => void;
  /** Current view of the application. */
  currentView: 'game-start' | 'card-swipe';
  /** Total number of players in the game. */
  playerCount: number;
  /** Current player number (1-indexed). */
  currentPlayer: number;
  /** Move to the next player. */
  nextPlayer: () => void;
};

/** State context interface. */
export type StateContext = VirtualState;

/** Context for sharing state between server and client. */
const Context = createContext<StateContext | null>(null);

/** Props for the StateProvider component. */
export type StateProviderProps = PropsWithChildren;

/** Provider for sharing state between server and client. */
export function AppStateProvider({ children }: StateProviderProps) {
  const [isAppInitialized, setIsAppInitialized] = useState(false);
  const [currentView, setCurrentView] = useState<'game-start' | 'card-swipe'>('game-start');
  const [playerCount, setPlayerCount] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState(1);

  return (
    <Context
      value={{
        isAppInitialized,
        currentView,
        playerCount,
        currentPlayer,
        initializeApp: async () => {
          const savedGame = gameSave.load();
          if (savedGame) {
            setPlayerCount(savedGame.players);
            setCurrentPlayer(savedGame.currentPlayer);
            setCurrentView('card-swipe');
          }

          await new Promise((resolve) => setTimeout(resolve, 500));
          setIsAppInitialized(true);
        },
        startGame: (count) => {
          setPlayerCount(count);
          setCurrentPlayer(1);
          setCurrentView('card-swipe');
          gameSave.save({
            currentPlayer: 1,
            players: count,
          });
        },
        nextPlayer: () => {
          setCurrentPlayer((prev) => {
            const nextPlayer = (prev % playerCount) + 1;

            gameSave.update(() => ({
              currentPlayer: nextPlayer,
            }));

            return nextPlayer;
          });
        },
        restartGame: () => {
          setPlayerCount(0);
          setCurrentPlayer(1);
          setCurrentView('game-start');
          gameSave.save(null);
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
