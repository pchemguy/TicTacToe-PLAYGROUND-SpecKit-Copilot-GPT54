import { describe, expect, it } from 'vitest';

import { createInitialGameState } from '../../../src/game/core/state';
import { selectComputerMove } from '../../../src/game/ai/selectComputerMove';
import type { BoardCell, GameState } from '../../../src/game/core/types';

function createComputerTurnState(board: BoardCell[]): GameState {
  return {
    ...createInitialGameState(),
    board,
    currentPlayer: 'computer',
  };
}

describe('selectComputerMove', () => {
  it('chooses an immediate winning move when one exists', () => {
    expect(
      selectComputerMove(
        createComputerTurnState(['O', 'O', 'empty', 'X', 'X', 'empty', 'empty', 'empty', 'empty']),
      ),
    ).toBe(2);
  });

  it('blocks an immediate human winning move when no immediate computer win exists', () => {
    expect(
      selectComputerMove(
        createComputerTurnState(['X', 'X', 'empty', 'O', 'empty', 'empty', 'empty', 'empty', 'O']),
      ),
    ).toBe(2);
  });

  it('breaks ties by choosing the lowest row-major legal index', () => {
    const repeatedState = createComputerTurnState([
      'X',
      'empty',
      'empty',
      'empty',
      'O',
      'empty',
      'empty',
      'empty',
      'X',
    ]);

    expect(selectComputerMove(repeatedState)).toBe(1);
    expect(selectComputerMove(repeatedState)).toBe(1);
  });
});