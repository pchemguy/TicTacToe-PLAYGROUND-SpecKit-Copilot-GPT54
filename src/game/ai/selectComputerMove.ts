import { applyMove, getLegalMoves } from '../core/rules';
import { scorePosition } from './minimax';
import type { GameState } from '../core/types';

export function selectComputerMove(state: GameState): number {
  if (state.status.kind !== 'ongoing' || state.currentPlayer !== 'computer') {
    throw new Error('selectComputerMove requires an ongoing game state on the computer turn.');
  }

  const legalMoves = getLegalMoves(state);
  let bestMove = legalMoves[0];
  let bestScore = Number.NEGATIVE_INFINITY;

  for (const cellIndex of legalMoves) {
    const nextState = applyMove(state, 'computer', cellIndex);
    const score = scorePosition(nextState);

    if (score > bestScore) {
      bestScore = score;
      bestMove = cellIndex;
    }
  }

  return bestMove;
}
