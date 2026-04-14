import { renderHook } from '@testing-library/react';
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
});