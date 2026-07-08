export interface SavedGame {
  currentPlayer: number;
  players: number;
}

export const gameSave = {
  save: (currentGame: SavedGame | null) => {
    if (!currentGame) {
      localStorage.removeItem('saved-game');
      return;
    }
    localStorage.setItem('saved-game', JSON.stringify(currentGame));
  },
  load: () => {
    const savedGame = localStorage.getItem('saved-game');
    return savedGame ? (JSON.parse(savedGame) as SavedGame) : null;
  },
  update: (currentGame: (current: SavedGame) => Partial<SavedGame>) => {
    const savedGame = gameSave.load();
    if (!savedGame) {
      return;
    }
    gameSave.save({ ...savedGame, ...currentGame(savedGame) });
  },
};
