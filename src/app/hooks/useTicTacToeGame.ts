import type { CellIndex, GameState } from '../../game/core/types';

export interface TicTacToeGameController {
  gameState: GameState | null;
  playHumanMove: (cellIndex: CellIndex) => void;
  restartGame: () => void;
}

export function useTicTacToeGame(): TicTacToeGameController {
  return {
    gameState: null,
    playHumanMove: (_cellIndex) => {},
    restartGame: () => {},
  };
}