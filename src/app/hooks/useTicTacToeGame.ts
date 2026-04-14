import { useState } from 'react';

import { selectComputerMove } from '../../game/ai/selectComputerMove';
import { applyMove } from '../../game/core/rules';
import { createInitialGameState } from '../../game/core/state';
import type { GameState } from '../../game/core/types';

export interface TicTacToeGameController {
  gameState: GameState;
  playHumanMove: (cellIndex: number) => void;
  restartGame: () => void;
}

export function useTicTacToeGame(initialGameState?: GameState): TicTacToeGameController {
  const [gameState, setGameState] = useState(() => initialGameState ?? createInitialGameState());

  return {
    gameState,
    playHumanMove: (cellIndex) => {
      setGameState((currentState) => {
        const stateAfterHumanMove = applyMove(currentState, 'human', cellIndex);

        if (stateAfterHumanMove === currentState || stateAfterHumanMove.status.kind !== 'ongoing') {
          return stateAfterHumanMove;
        }

        const computerMove = selectComputerMove(stateAfterHumanMove);
        return applyMove(stateAfterHumanMove, 'computer', computerMove);
      });
    },
    restartGame: () => {},
  };
}