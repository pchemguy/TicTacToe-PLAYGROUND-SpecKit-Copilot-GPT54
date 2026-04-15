import type { GameState } from '../game/core/types';
import { GameBoard } from '../ui/components/GameBoard';
import { GameStatusPanel } from '../ui/components/GameStatusPanel';
import { RestartButton } from '../ui/components/RestartButton';
import { useTicTacToeGame } from './hooks/useTicTacToeGame';

interface AppProps {
  initialGameState?: GameState;
}

export function App({ initialGameState }: AppProps = {}) {
  const { gameState, playHumanMove, restartGame } = useTicTacToeGame(initialGameState);

  return (
    <main className="app-shell">
      <section className="app-hero">
        <p className="app-kicker">Browser Stage</p>
        <h1>Classic Tic Tac Toe Against Computer</h1>
        <p className="app-summary">
          Play against the unbeatable computer opponent. The computer uses the minimax
          algorithm to guarantee it never loses.
        </p>
      </section>

      <section className="app-panel" aria-labelledby="game-shell-title">
        <div className="app-panel-header">
          <div>
            <h2 id="game-shell-title">Game</h2>
          </div>
          <RestartButton onRestart={restartGame} />
        </div>

        <GameStatusPanel currentPlayer={gameState.currentPlayer} status={gameState.status} />

        <GameBoard
          cells={gameState.board}
          disabled={gameState.status.kind !== 'ongoing'}
          onSelectCell={playHumanMove}
        />
      </section>
    </main>
  );
}
