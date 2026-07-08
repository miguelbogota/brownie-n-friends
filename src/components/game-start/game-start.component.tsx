import './game-start.styles.scss';

import { useState } from 'react';
import { useAppState } from '@/state';

// Minimum number of players required to start the game
const minPlayers = 2;

/** Game start screen component with title, logo, player selection, and start button. */
export function GameStart() {
  const [playerCount, setPlayerCount] = useState(minPlayers);
  const { startGame } = useAppState();

  const handleDecreasePlayers = () => {
    setPlayerCount((prev) => Math.max(minPlayers, prev - 1));
  };

  const handleIncreasePlayers = () => {
    setPlayerCount((prev) => prev + 1);
  };

  const handleStartGame = () => {
    startGame(playerCount);
  };

  return (
    <div className="game-start">
      <header>
        <h1>
          Brownie N'
          <br />
          Friends
        </h1>
        <img src="/logo.svg" alt="Logo" />
      </header>

      <div className="player-section">
        <div className="header">
          <h2>JUGADORES</h2>
          <i className="bxf bx-group" />
        </div>

        <div className="player-controls">
          <button
            className="control-button"
            onClick={handleDecreasePlayers}
            aria-label="Decrease players"
            disabled={playerCount <= minPlayers}
          >
            −
          </button>
          <div className="player-count">{playerCount}</div>
          <button
            className="control-button"
            onClick={handleIncreasePlayers}
            aria-label="Increase players"
          >
            +
          </button>
        </div>

        <div className="player-limit">MIN: {minPlayers}</div>
      </div>

      <button className="start-button" onClick={handleStartGame}>
        Start Game
      </button>
    </div>
  );
}
