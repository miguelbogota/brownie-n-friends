import './loading-screen.styles.scss';

/** Loading screen component with spinner and animated text. */
export function LoadingScreen() {
  return (
    <div className="loading-screen">
      <div className="spinner" role="status" aria-label="Loading">
        <div className="spinner-ring"></div>
      </div>
      <p className="loading-text">CARGANDO...</p>
    </div>
  );
}
