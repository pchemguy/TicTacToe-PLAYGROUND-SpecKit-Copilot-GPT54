import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { App } from '../../src/app/App';
import { createInitialGameState } from '../../src/game/core/state';
import type { GameState } from '../../src/game/core/types';

const FINISHED_HUMAN_WIN_STATE: GameState = {
  ...createInitialGameState(),
  board: ['X', 'X', 'X', 'O', 'O', 'empty', 'empty', 'empty', 'empty'],
  currentPlayer: 'none',
  status: { kind: 'won', winner: 'human' },
};

describe('playable game UI', () => {
  it('lets a human click an empty cell and renders the automatic computer response', () => {
    render(<App />);

    expect(screen.getByText('Current player: human')).toBeInTheDocument();

    const firstCell = screen.getByLabelText('Cell 0');
    const centerCell = screen.getByLabelText('Cell 4');

    fireEvent.click(firstCell);

    expect(firstCell).toHaveTextContent('X');
    expect(centerCell).toHaveTextContent('O');
    expect(screen.getByText('Current player: human')).toBeInTheDocument();
  });

  it('resets the rendered board when the restart control is used', () => {
    render(<App />);

    const firstCell = screen.getByLabelText('Cell 0');
    const centerCell = screen.getByLabelText('Cell 4');
    const restartButton = screen.getByRole('button', { name: 'Restart Match' });

    fireEvent.click(firstCell);
    fireEvent.click(restartButton);

    expect(firstCell).not.toHaveTextContent('X');
    expect(centerCell).not.toHaveTextContent('O');
  });

  it('renders terminal outcome information for completed games', () => {
    render(<App initialGameState={FINISHED_HUMAN_WIN_STATE} />);

    expect(screen.getByText('Winner: human')).toBeInTheDocument();
    expect(screen.getByText('Game over. Restart to play another round.')).toBeInTheDocument();
  });
});