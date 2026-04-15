import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { useTicTacToeGame } from '../../src/app/hooks/useTicTacToeGame';
import { createInitialGameState } from '../../src/game/core/state';
import type { GameState } from '../../src/game/core/types';

const TERMINAL_HUMAN_WIN_SETUP: GameState = {
  ...createInitialGameState(),
  board: ['X', 'X', 'empty', 'O', 'O', 'empty', 'empty', 'empty', 'empty'],
  currentPlayer: 'human',
};

const DRAW_SETUP: GameState = {
  ...createInitialGameState(),
  board: ['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'empty'],
  currentPlayer: 'human',
};

function expectStableGameStateShape(state: GameState): void {
  expect(state.board).toHaveLength(9);
  expect(state.humanPlayer).toEqual({ role: 'human', mark: 'X' });
  expect(state.computerPlayer).toEqual({ role: 'computer', mark: 'O' });
  expect(Object.keys(state).sort()).toEqual([
    'board',
    'computerPlayer',
    'currentPlayer',
    'humanPlayer',
    'status',
  ]);
}

describe('useTicTacToeGame', () => {
  it('exposes the deterministic initial game state on mount', () => {
    const { result } = renderHook(() => useTicTacToeGame());

    expect(result.current.gameState).toEqual(createInitialGameState());
    expectStableGameStateShape(result.current.gameState);
    expect(typeof result.current.playHumanMove).toBe('function');
    expect(typeof result.current.restartGame).toBe('function');
  });

  it('resolves a valid human move into exactly one automatic computer response', () => {
    const { result } = renderHook(() => useTicTacToeGame());

    act(() => {
      result.current.playHumanMove(0);
    });

    expect(result.current.gameState).toEqual({
      ...createInitialGameState(),
      board: ['X', 'empty', 'empty', 'empty', 'O', 'empty', 'empty', 'empty', 'empty'],
      currentPlayer: 'human',
    });
    expectStableGameStateShape(result.current.gameState);
  });

  it('keeps exposed state unchanged after rejected human moves', () => {
    const { result } = renderHook(() => useTicTacToeGame());
    const initialState = result.current.gameState;

    act(() => {
      result.current.playHumanMove(0);
    });

    const stateAfterValidMove = result.current.gameState;
    expect(stateAfterValidMove).not.toBe(initialState);
    expect(stateAfterValidMove.board[0]).toBe('X');
  expect(stateAfterValidMove.board[4]).toBe('O');
  expect(stateAfterValidMove.currentPlayer).toBe('human');

    act(() => {
      result.current.playHumanMove(0);
    });

    expect(result.current.gameState).toBe(stateAfterValidMove);

    act(() => {
      result.current.playHumanMove(9);
      result.current.playHumanMove(1.5);
    });

    expect(result.current.gameState).toBe(stateAfterValidMove);
    expectStableGameStateShape(result.current.gameState);
  });

  it('returns the terminal state without any extra turn processing after a winning human move', () => {
    const { result } = renderHook(() => useTicTacToeGame(TERMINAL_HUMAN_WIN_SETUP));

    act(() => {
      result.current.playHumanMove(2);
    });

    expect(result.current.gameState).toEqual({
      ...TERMINAL_HUMAN_WIN_SETUP,
      board: ['X', 'X', 'X', 'O', 'O', 'empty', 'empty', 'empty', 'empty'],
      currentPlayer: 'none',
      status: { kind: 'won', winner: 'human' },
    });

    const terminalState = result.current.gameState;

    act(() => {
      result.current.playHumanMove(5);
    });

    expect(result.current.gameState).toBe(terminalState);
    expectStableGameStateShape(result.current.gameState);
  });

  it('keeps the exposed state shape stable for draw outcomes', () => {
    const { result } = renderHook(() => useTicTacToeGame(DRAW_SETUP));

    act(() => {
      result.current.playHumanMove(8);
    });

    expect(result.current.gameState).toEqual({
      ...DRAW_SETUP,
      board: ['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'X'],
      currentPlayer: 'none',
      status: { kind: 'draw' },
    });
    expectStableGameStateShape(result.current.gameState);
  });
});