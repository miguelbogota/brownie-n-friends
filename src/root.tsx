import { useEffect } from 'react';
import { AppStateProvider, type InitialState } from './state';

/** Props for the Router component. */
export type RouterProps = InitialState;

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
      <div>Home</div>
    </AppStateProvider>
  );
}
