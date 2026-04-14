import { describe, expect, it } from 'vitest';

import { createInitialGameState } from '../../../src/game/core/state';
import { applyMove, isLegalMove } from '../../../src/game/core/rules';

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
});