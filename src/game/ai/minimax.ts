import { applyMove, getLegalMoves } from '../core/rules';
import type { Board, CurrentPlayer, GameState, PlayerRole } from '../core/types';

const memo = new Map<string, number>();

function boardKey(board: Board, currentPlayer: CurrentPlayer): string {
  return board.join(',') + '|' + currentPlayer;
}

function scoreTerminalState(state: GameState): number {
  if (state.status.kind === 'won') {
    const filledCells = state.board.filter((c) => c !== 'empty').length;
    return state.status.winner === 'computer'
      ? 1 - filledCells / 100
      : filledCells / 100 - 1;
  }

  return 0;
}

export function scorePosition(state: GameState): number {
  if (state.status.kind !== 'ongoing') {
    return scoreTerminalState(state);
  }

  const key = boardKey(state.board, state.currentPlayer);
  const cached = memo.get(key);

  if (cached !== undefined) {
    return cached;
  }

  const activePlayer = state.currentPlayer as PlayerRole;
  const legalMoves = getLegalMoves(state);

  let result: number;

  if (activePlayer === 'computer') {
    let bestScore = Number.NEGATIVE_INFINITY;

    for (const cellIndex of legalMoves) {
      const nextState = applyMove(state, 'computer', cellIndex);
      bestScore = Math.max(bestScore, scorePosition(nextState));
    }

    result = bestScore;
  } else {
    let bestScore = Number.POSITIVE_INFINITY;

    for (const cellIndex of legalMoves) {
      const nextState = applyMove(state, 'human', cellIndex);
      bestScore = Math.min(bestScore, scorePosition(nextState));
    }

    result = bestScore;
  }

  memo.set(key, result);
  return result;
}