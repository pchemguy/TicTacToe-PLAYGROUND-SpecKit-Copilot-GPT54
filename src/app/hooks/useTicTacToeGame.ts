import { useState } from 'react';

import { createInitialGameState } from '../../game/core/state';
import type { CellIndex, GameState } from '../../game/core/types';

export interface TicTacToeGameController {
  gameState: GameState;
  playHumanMove: (cellIndex: CellIndex) => void;
  restartGame: () => void;
}

export function useTicTacToeGame(): TicTacToeGameController {
  const [gameState] = useState(createInitialGameState);

  return {
    gameState,
    playHumanMove: (_cellIndex) => {},
    restartGame: () => {},
  };
}