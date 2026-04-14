import { useState } from 'react';

import { applyMove } from '../../game/core/rules';
import { createInitialGameState } from '../../game/core/state';
import type { GameState } from '../../game/core/types';

export interface TicTacToeGameController {
  gameState: GameState;
  playHumanMove: (cellIndex: number) => void;
  restartGame: () => void;
}

export function useTicTacToeGame(): TicTacToeGameController {
  const [gameState, setGameState] = useState(createInitialGameState);

  return {
    gameState,
    playHumanMove: (cellIndex) => {
      setGameState((currentState) => applyMove(currentState, 'human', cellIndex));
    },
    restartGame: () => {},
  };
}