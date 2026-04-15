import { applyMove, getLegalMoves } from '../core/rules';
import type { GameState, PlayerRole } from '../core/types';

function scoreTerminalState(state: GameState): number {
  if (state.status.kind === 'won') {
    return state.status.winner === 'computer' ? 1 : -1;
  }

  return 0;
}

export function scorePosition(state: GameState, activePlayer: PlayerRole): number {
  if (state.status.kind !== 'ongoing') {
    return scoreTerminalState(state);
  }

  if (state.currentPlayer !== activePlayer) {
    throw new Error('The active player does not match the provided game state.');
  }

  const legalMoves = getLegalMoves(state);

  if (legalMoves.length === 0) {
    return 0;
  }

  if (activePlayer === 'computer') {
    let bestScore = Number.NEGATIVE_INFINITY;

    for (const cellIndex of legalMoves) {
      const nextState = applyMove(state, 'computer', cellIndex);
      bestScore = Math.max(bestScore, scorePosition(nextState, 'human'));
    }

    return bestScore;
  }

  let bestScore = Number.POSITIVE_INFINITY;

  for (const cellIndex of legalMoves) {
    const nextState = applyMove(state, 'human', cellIndex);
    bestScore = Math.min(bestScore, scorePosition(nextState, 'computer'));
  }

  return bestScore;
}