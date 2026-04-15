import type { GameState } from '../../game/core/types';

interface GameStatusPanelProps {
  currentPlayer: GameState['currentPlayer'];
  status: GameState['status'];
}

function getStatusCopy(currentPlayer: GameState['currentPlayer'], status: GameState['status']) {
  if (status.kind === 'won') {
    return {
      title: `Winner: ${status.winner}`,
      detail: 'Game over. Restart to play another round.',
    };
  }

  if (status.kind === 'draw') {
    return {
      title: 'Result: draw',
      detail: 'The board is full. Restart to play another round.',
    };
  }

  return {
    title: `Current player: ${currentPlayer}`,
    detail:
      currentPlayer === 'human'
        ? 'Click an empty cell to place X. The computer will respond automatically as O.'
        : 'Computer is resolving its move.',
  };
}

export function GameStatusPanel({ currentPlayer, status }: GameStatusPanelProps) {
  const { title, detail } = getStatusCopy(currentPlayer, status);

  return (
    <section className="status-panel" aria-live="polite">
      <h3>{title}</h3>
      <p>{detail}</p>
    </section>
  );
}