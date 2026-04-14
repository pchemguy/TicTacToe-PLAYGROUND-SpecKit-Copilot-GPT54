import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { useTicTacToeGame } from '../../src/app/hooks/useTicTacToeGame';
import { createInitialGameState } from '../../src/game/core/state';

describe('useTicTacToeGame', () => {
  it('exposes the deterministic initial game state on mount', () => {
    const { result } = renderHook(() => useTicTacToeGame());

    expect(result.current.gameState).toEqual(createInitialGameState());
    expect(typeof result.current.playHumanMove).toBe('function');
    expect(typeof result.current.restartGame).toBe('function');
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
    expect(stateAfterValidMove.currentPlayer).toBe('computer');

    act(() => {
      result.current.playHumanMove(0);
    });

    expect(result.current.gameState).toBe(stateAfterValidMove);

    act(() => {
      result.current.playHumanMove(9);
      result.current.playHumanMove(1.5);
    });

    expect(result.current.gameState).toBe(stateAfterValidMove);
  });
});