import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { useTicTacToeGame } from '../../src/app/hooks/useTicTacToeGame';
import { createInitialGameState } from '../../src/game/core/state';
import type { GameState } from '../../src/game/core/types';

describe('restart flow', () => {
  it('resets to the initial state from an in-progress game', () => {
    const { result } = renderHook(() => useTicTacToeGame());

    act(() => {
      result.current.playHumanMove(0);
    });

    expect(result.current.gameState).not.toEqual(createInitialGameState());

    act(() => {
      result.current.restartGame();
    });

    expect(result.current.gameState).toEqual(createInitialGameState());
  });

  it('resets to the initial state from a finished game', () => {
    const finishedState: GameState = {
      ...createInitialGameState(),
      board: ['X', 'X', 'X', 'O', 'O', 'empty', 'empty', 'empty', 'empty'],
      currentPlayer: 'none' as const,
      status: { kind: 'won' as const, winner: 'human' as const },
    };

    const { result } = renderHook(() => useTicTacToeGame(finishedState));

    act(() => {
      result.current.restartGame();
    });

    expect(result.current.gameState).toEqual(createInitialGameState());
  });
});