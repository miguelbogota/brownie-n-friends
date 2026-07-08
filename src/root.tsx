import { useEffect } from 'react';
import { AppStateProvider, useAppState, type InitialState } from './state';
import { GameStart } from './components/game-start';
import { LoadingScreen } from './components/loading-screen';
import { Card } from './components/card';

/** Props for the Router component. */
export type RouterProps = InitialState;

/** Main application component that renders the game start screen. */
function App() {
  const { isAppInitialized, initializeApp } = useAppState();

  useEffect(() => {
    initializeApp();
  }, []);

  if (!isAppInitialized) {
    return <LoadingScreen />;
  }

  return (
    <>
      <GameStart />
      <Card
        type="BUENA SUERTE"
        text="De ahora en adelante todos toman siempre que alguien diga la palabra pene"
        penaltyLevel={2}
      />
    </>
  );
}

/** Root component for the application. */
export function Root(props: RouterProps) {
  const {} = props;

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
    <AppStateProvider value={props}>
      <App />
    </AppStateProvider>
  );
}
