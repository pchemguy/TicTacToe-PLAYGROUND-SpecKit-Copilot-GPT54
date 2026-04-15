import { describe, expect, it } from 'vitest';

import { createInitialGameState } from '../../../src/game/core/state';
import { applyMove, evaluateGameStatus, isLegalMove } from '../../../src/game/core/rules';
import type { BoardCell, GameState } from '../../../src/game/core/types';

function createState(board: BoardCell[], currentPlayer: GameState['currentPlayer'] = 'human') {
  return {
    ...createInitialGameState(),
    board,
    currentPlayer,
  };
}

describe('core rules', () => {
  it('applies a valid human move to an empty in-range cell', () => {
    const initialState = createInitialGameState();

    expect(isLegalMove(initialState, 'human', 4)).toBe(true);

    expect(applyMove(initialState, 'human', 4)).toEqual({
      ...initialState,
      board: [
        'empty',
        'empty',
        'empty',
        'empty',
        'X',
        'empty',
        'empty',
        'empty',
        'empty',
      ],
      currentPlayer: 'computer',
    });
  });

  it('rejects a move to an occupied cell without mutating state', () => {
    const stateAfterMove = applyMove(createInitialGameState(), 'human', 0);

    expect(isLegalMove(stateAfterMove, 'human', 0)).toBe(false);
    expect(applyMove(stateAfterMove, 'human', 0)).toBe(stateAfterMove);
  });

  it('rejects an out-of-range move without mutating state', () => {
    const initialState = createInitialGameState();

    expect(isLegalMove(initialState, 'human', 9)).toBe(false);
    expect(applyMove(initialState, 'human', 9)).toBe(initialState);
  });

  it('rejects a non-integer move without mutating state', () => {
    const initialState = createInitialGameState();

    expect(isLegalMove(initialState, 'human', 1.5)).toBe(false);
    expect(applyMove(initialState, 'human', 1.5)).toBe(initialState);
  });

  it.each([
    {
      label: 'top row',
      board: ['X', 'X', 'X', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
      winner: 'human',
    },
    {
      label: 'middle row',
      board: ['empty', 'empty', 'empty', 'O', 'O', 'O', 'empty', 'empty', 'empty'],
      winner: 'computer',
    },
    {
      label: 'bottom row',
      board: ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'X', 'X', 'X'],
      winner: 'human',
    },
    {
      label: 'left column',
      board: ['O', 'empty', 'empty', 'O', 'empty', 'empty', 'O', 'empty', 'empty'],
      winner: 'computer',
    },
    {
      label: 'middle column',
      board: ['empty', 'X', 'empty', 'empty', 'X', 'empty', 'empty', 'X', 'empty'],
      winner: 'human',
    },
    {
      label: 'right column',
      board: ['empty', 'empty', 'O', 'empty', 'empty', 'O', 'empty', 'empty', 'O'],
      winner: 'computer',
    },
    {
      label: 'primary diagonal',
      board: ['X', 'empty', 'empty', 'empty', 'X', 'empty', 'empty', 'empty', 'X'],
      winner: 'human',
    },
    {
      label: 'secondary diagonal',
      board: ['empty', 'empty', 'O', 'empty', 'O', 'empty', 'O', 'empty', 'empty'],
      winner: 'computer',
    },
  ])('detects $label as a win for $winner', ({ board, winner }) => {
    expect(evaluateGameStatus(board as BoardCell[])).toEqual({ kind: 'won', winner });
  });

  it('recognizes a draw only when the board is full and no winner exists', () => {
    expect(
      evaluateGameStatus(['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'X']),
    ).toEqual({ kind: 'draw' });
  });

  it('treats a final-cell winning move as a win instead of a draw', () => {
    const almostFullBoard = createState(['X', 'O', 'O', 'O', 'X', 'X', 'O', 'X', 'empty']);

    expect(applyMove(almostFullBoard, 'human', 8)).toEqual({
      ...almostFullBoard,
      board: ['X', 'O', 'O', 'O', 'X', 'X', 'O', 'X', 'X'],
      currentPlayer: 'none',
      status: { kind: 'won', winner: 'human' },
    });
  });

  it('sets currentPlayer to none for draw outcomes and blocks later moves', () => {
    const almostDrawState = createState(['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'empty']);
    const drawState = applyMove(almostDrawState, 'human', 8);

    expect(drawState).toEqual({
      ...almostDrawState,
      board: ['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'X'],
      currentPlayer: 'none',
      status: { kind: 'draw' },
    });
    expect(applyMove(drawState, 'human', 0)).toBe(drawState);
  });
});