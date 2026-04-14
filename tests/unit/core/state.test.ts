import { describe, expect, it } from 'vitest';

import {
  createInitialGameState,
  createEmptyBoard,
  INITIAL_COMPUTER_PLAYER,
  INITIAL_CURRENT_PLAYER,
  INITIAL_HUMAN_PLAYER,
  INITIAL_STATUS,
  replaceBoardCell,
} from '../../../src/game/core/state';

describe('core state helpers', () => {
  it('creates an empty 9-cell board for each call', () => {
    const firstBoard = createEmptyBoard();
    const secondBoard = createEmptyBoard();

    expect(firstBoard).toHaveLength(9);
    expect(firstBoard).toEqual([
      'empty',
      'empty',
      'empty',
      'empty',
      'empty',
      'empty',
      'empty',
      'empty',
      'empty',
    ]);
    expect(secondBoard).toEqual(firstBoard);
    expect(secondBoard).not.toBe(firstBoard);
  });

  it('replaces only the targeted board cell without mutating the original board', () => {
    const originalBoard = createEmptyBoard();
    const updatedBoard = replaceBoardCell(originalBoard, 4, 'X');

    expect(updatedBoard).toEqual([
      'empty',
      'empty',
      'empty',
      'empty',
      'X',
      'empty',
      'empty',
      'empty',
      'empty',
    ]);
    expect(originalBoard).toEqual([
      'empty',
      'empty',
      'empty',
      'empty',
      'empty',
      'empty',
      'empty',
      'empty',
      'empty',
    ]);
    expect(updatedBoard).not.toBe(originalBoard);
  });

  it('exports the initial state primitives for the starting match state', () => {
    expect(INITIAL_CURRENT_PLAYER).toBe('human');
    expect(INITIAL_HUMAN_PLAYER).toEqual({ role: 'human', mark: 'X' });
    expect(INITIAL_COMPUTER_PLAYER).toEqual({ role: 'computer', mark: 'O' });
    expect(INITIAL_STATUS).toEqual({ kind: 'ongoing' });
  });

  it('creates the deterministic initial game state for a new match', () => {
    expect(createInitialGameState()).toEqual({
      board: [
        'empty',
        'empty',
        'empty',
        'empty',
        'empty',
        'empty',
        'empty',
        'empty',
        'empty',
      ],
      currentPlayer: 'human',
      humanPlayer: { role: 'human', mark: 'X' },
      computerPlayer: { role: 'computer', mark: 'O' },
      status: { kind: 'ongoing' },
    });
  });
});