import { applyMove, getLegalMoves } from '../core/rules';
import type { GameState } from '../core/types';

function findWinningMove(state: GameState, player: 'human' | 'computer'): number | null {
  for (const cellIndex of getLegalMoves(state)) {
    const nextState = applyMove(state, player, cellIndex);

    if (nextState.status.kind === 'won' && nextState.status.winner === player) {
      return cellIndex;
    }
  }

  return null;
}

export function selectComputerMove(state: GameState): number {
  const immediateWin = findWinningMove(state, 'computer');

  if (immediateWin !== null) {
    return immediateWin;
  }

  const immediateBlock = findWinningMove(state, 'human');

  if (immediateBlock !== null) {
    return immediateBlock;
  }

  const legalMoves = getLegalMoves(state);

  if (legalMoves.length === 0) {
    throw new Error('No legal computer move is available for the provided state.');
  }

  return legalMoves[0];
}