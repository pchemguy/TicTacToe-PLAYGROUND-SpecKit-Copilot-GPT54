import { applyMove, getLegalMoves } from '../core/rules';
import { scorePosition } from './minimax';
import type { GameState } from '../core/types';

export function selectComputerMove(state: GameState): number {
  const legalMoves = getLegalMoves(state);

  if (legalMoves.length === 0) {
    throw new Error('No legal computer move is available for the provided state.');
  }

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