import { applyMove, getLegalMoves } from '../core/rules';
import type { GameState } from '../core/types';

function scoreTerminalState(state: GameState): number {
  if (state.status.kind === 'won') {
    return state.status.winner === 'computer' ? 1 : -1;
  }

  return 0;
}

export function scorePosition(state: GameState): number {
  if (state.status.kind !== 'ongoing') {
    return scoreTerminalState(state);
  }

  const legalMoves = getLegalMoves(state);

  if (state.currentPlayer === 'computer') {
    let bestScore = Number.NEGATIVE_INFINITY;

    for (const cellIndex of legalMoves) {
      const nextState = applyMove(state, 'computer', cellIndex);
      bestScore = Math.max(bestScore, scorePosition(nextState));
    }

    return bestScore;
  }

  let bestScore = Number.POSITIVE_INFINITY;

  for (const cellIndex of legalMoves) {
    const nextState = applyMove(state, 'human', cellIndex);
    bestScore = Math.min(bestScore, scorePosition(nextState));
  }

  return bestScore;
}