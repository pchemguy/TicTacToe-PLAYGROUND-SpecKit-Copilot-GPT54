import { describe, expect, it } from 'vitest';

import { selectComputerMove } from '../../../src/game/ai/selectComputerMove';
import { scorePosition } from '../../../src/game/ai/minimax';
import { applyMove, getLegalMoves } from '../../../src/game/core/rules';
import { createInitialGameState } from '../../../src/game/core/state';
import type { GameState } from '../../../src/game/core/types';

function assertComputerNeverLoses(state: GameState): void {
  if (state.status.kind === 'won') {
    expect(state.status.winner).not.toBe('human');
    return;
  }

  if (state.status.kind === 'draw') {
    return;
  }

  if (state.currentPlayer !== 'human') {
    throw new Error('Validation should only branch on human turns.');
  }

  for (const humanMove of getLegalMoves(state)) {
    const afterHumanMove = applyMove(state, 'human', humanMove);

    if (afterHumanMove.status.kind !== 'ongoing') {
      assertComputerNeverLoses(afterHumanMove);
      continue;
    }

    const computerMove = selectComputerMove(afterHumanMove);
    expect(getLegalMoves(afterHumanMove)).toContain(computerMove);

    const afterComputerMove = applyMove(afterHumanMove, 'computer', computerMove);
    assertComputerNeverLoses(afterComputerMove);
  }
}

describe('minimax validation', () => {
  it('scores representative terminal states correctly', () => {
    const terminalBase = createInitialGameState();

    expect(scorePosition({ ...terminalBase, currentPlayer: 'none', status: { kind: 'won', winner: 'computer' } })).toBe(1);
    expect(scorePosition({ ...terminalBase, currentPlayer: 'none', status: { kind: 'won', winner: 'human' } })).toBe(-1);
    expect(scorePosition({ ...terminalBase, currentPlayer: 'none', status: { kind: 'draw' } })).toBe(0);
  });

  it('never allows the computer to lose from a new game under valid human play', () => {
    assertComputerNeverLoses(createInitialGameState());
  });
});