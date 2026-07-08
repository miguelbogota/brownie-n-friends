import './card.styles.scss';

import { clsx } from 'clsx';

/** Props for the Card component. */
export interface CardProps {
  /** Text to display in the bar at the top. */
  type: 'REGLA' | 'JUEGO' | 'DESAFÍO' | 'MALA SUERTE' | 'BUENA SUERTE' | 'MISIÓN SECRETA';
  /** Title text to display in the center. */
  text: string;
  /** Penalty level (1-4) to determine number of active icons. */
  penaltyLevel: 1 | 2 | 3 | 4;
}

const CARD_TYPE_MAP = {
  REGLA: 'rule',
  JUEGO: 'game',
  DESAFÍO: 'challenge',
  'MALA SUERTE': 'bad-luck',
  'BUENA SUERTE': 'good-luck',
  'MISIÓN SECRETA': 'secret-mission',
} as const;

/** Card component with bar, title, and penalty level indicators. */
export function Card({ type: barText, text: title, penaltyLevel }: CardProps) {
  const clampedLevel = Math.max(0, Math.min(4, penaltyLevel));

  const cardClasses = clsx('card', CARD_TYPE_MAP[barText]);

  return (
    <div className={cardClasses}>
      <span className="type">{barText}</span>

      <div className="content">
        <h2>{title}</h2>

        <div className="penalty">
          <h3>PENALIZACIÓN</h3>
          <div className="icons">
            {[1, 2, 3, 4].map((level) => (
              <i
                key={level}
                className={`bx bx-wine icon ${level <= clampedLevel ? 'active' : ''}`}
                aria-label={`Penalty level ${level}`}
              ></i>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
