import { useState, useRef, useEffect, useMemo } from 'react';
import './card-swipe.styles.scss';
import { Card, type CardProps } from '../card/card.component';
import { CARDS, shuffleArray } from '../../data';
import { useAppState } from '@/state';

/** Card swipe component with tinder-like swipe functionality. */
export function CardSwipe() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const { currentPlayer, playerCount, nextPlayer, restartGame } = useAppState();
  const cards = useMemo(
    () => shuffleArray(CARDS, Math.floor(playerCount / 2.5), playerCount),
    [playerCount],
  );
  const currentCard = cards[currentIndex] as CardProps;

  const cardRef = useRef<HTMLDivElement>(null);
  const startX = useRef(0);
  const startY = useRef(0);

  const handleSwipe = (direction: 'left' | 'right') => {
    if (isAnimating || currentIndex >= cards.length - 1) return;

    setIsAnimating(true);
    setSwipeDirection(direction);

    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
      setIsAnimating(false);
      setSwipeDirection(null);
      setDragPosition({ x: 0, y: 0 });
      nextPlayer();
    }, 300);
  };

  const handleDragStart = (clientX: number, clientY: number) => {
    if (isAnimating || currentIndex >= cards.length - 1) return;
    setIsDragging(true);
    startX.current = clientX;
    startY.current = clientY;
  };

  const handleDragMove = (clientX: number, clientY: number) => {
    if (!isDragging) return;
    const deltaX = clientX - startX.current;
    const deltaY = clientY - startY.current;
    setDragPosition({ x: deltaX, y: deltaY });
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const threshold = 150;
    if (dragPosition.x > threshold) {
      handleSwipe('right');
    } else if (dragPosition.x < -threshold) {
      handleSwipe('left');
    } else {
      setDragPosition({ x: 0, y: 0 });
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    handleDragStart(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleDragMove(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    handleDragEnd();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    if (touch) {
      handleDragStart(touch.clientX, touch.clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    if (touch) {
      handleDragMove(touch.clientX, touch.clientY);
    }
  };

  const handleTouchEnd = () => {
    handleDragEnd();
  };

  useEffect(() => {
    if (isDragging) {
      const handleMouseMoveGlobal = (e: MouseEvent) => {
        handleDragMove(e.clientX, e.clientY);
      };
      const handleMouseUpGlobal = () => {
        handleDragEnd();
      };

      window.addEventListener('mousemove', handleMouseMoveGlobal);
      window.addEventListener('mouseup', handleMouseUpGlobal);

      return () => {
        window.removeEventListener('mousemove', handleMouseMoveGlobal);
        window.removeEventListener('mouseup', handleMouseUpGlobal);
      };
    }
    return undefined;
  }, [isDragging, dragPosition]);

  const transformStyle = isDragging
    ? `translate(${dragPosition.x}px, ${dragPosition.y}px) rotate(${dragPosition.x * 0.1}deg)`
    : isAnimating
      ? `translateX(${swipeDirection === 'left' ? '-150%' : '150%'}) rotate(${swipeDirection === 'left' ? '-30' : '30'}deg)`
      : 'translate(0, 0)';

  const opacityStyle = isDragging ? 1 : isAnimating ? 0 : 1;

  const swipeHintColor = isDragging
    ? dragPosition.x > 0
      ? 'var(--green)'
      : dragPosition.x < 0
        ? 'var(--red)'
        : 'transparent'
    : 'transparent';

  return (
    <div className="card-swipe">
      <div className="player-display">
        <span className="player-label">JUGADOR</span>
        <span className="player-number">
          {currentPlayer} / {playerCount}
        </span>
      </div>

      <div className="card-stack">
        <div
          className="swipe-hint"
          style={{
            backgroundColor: swipeHintColor,
            opacity: isDragging ? Math.min(Math.abs(dragPosition.x) / 100, 0.5) : 0,
          }}
        />
        <article
          ref={cardRef}
          className={`card-container ${isAnimating ? `swiping-${swipeDirection}` : ''} ${isDragging ? 'dragging' : ''}`}
          style={{
            transform: transformStyle,
            opacity: opacityStyle,
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <Card {...currentCard} />
        </article>
      </div>

      <button className="restart-button" onClick={() => restartGame()}>
        Restart
      </button>
    </div>
  );
}
