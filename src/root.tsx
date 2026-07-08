import { useEffect } from 'react';
import { AppStateProvider, useAppState } from './state';
import { GameStart } from './components/game-start';
import { LoadingScreen } from './components/loading-screen';
import { CardSwipe } from './components/card-swipe';

/** Main application component that renders the game start screen. */
function App() {
  const { isAppInitialized, initializeApp, currentView } = useAppState();

  useEffect(() => {
    initializeApp();
  }, []);

  if (!isAppInitialized) {
    return <LoadingScreen />;
  }

  if (currentView === 'card-swipe') {
    return <CardSwipe />;
  }

  return <GameStart />;
}

/** Root component for the application. */
export function Root() {
  /**
   * Fixes the issue where the buttons are not clickable on mobile devices by adding a
   * touchstart listener that triggers a click event.
   */
  useEffect(() => {
    function handleTouchStart(this: Document, event: TouchEvent) {
      const target = event.target as HTMLElement;
      if (target.tagName === 'BUTTON' || target.closest('button')) {
        try {
          event.preventDefault();
          target.click();
        } catch (er) {}
      }
    }

    document.addEventListener('touchstart', handleTouchStart, { passive: false });
    return () => document.removeEventListener('touchstart', handleTouchStart);
  }, []);

  return (
    <AppStateProvider>
      <App />
    </AppStateProvider>
  );
}
