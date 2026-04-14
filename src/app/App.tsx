import { createEmptyBoard } from '../game/core/state';
import { GameBoard } from '../ui/components/GameBoard';
import { GameStatusPanel } from '../ui/components/GameStatusPanel';
import { RestartButton } from '../ui/components/RestartButton';
import { useTicTacToeGame } from './hooks/useTicTacToeGame';

export function App() {
  const { gameState, playHumanMove, restartGame } = useTicTacToeGame();
  const board = gameState?.board ?? createEmptyBoard();

  return (
    <main className="app-shell">
      <section className="app-hero">
        <p className="app-kicker">Browser Stage</p>
        <h1>Classic Tic Tac Toe Against Computer</h1>
        <p className="app-summary">
          The browser shell is ready for the deterministic game core, orchestration hook,
          and unbeatable strategy to be layered in task by task.
        </p>
      </section>

      <section className="app-panel" aria-labelledby="game-shell-title">
        <div className="app-panel-header">
          <div>
            <p className="app-section-label">Application Shell</p>
            <h2 id="game-shell-title">UI and orchestration boundaries are in place</h2>
          </div>
          <RestartButton disabled onRestart={restartGame} />
        </div>

        <GameStatusPanel
          title={gameState ? 'Game state connected' : 'Game state wiring comes next'}
          detail="The core rules, orchestration flow, and automatic computer turns will be implemented in the next phases."
        />

        <GameBoard cells={board} disabled onSelectCell={playHumanMove} />
      </section>

      <section className="app-panel" aria-labelledby="implementation-roadmap-title">
        <h2 id="implementation-roadmap-title">Implementation Roadmap</h2>
        <ol className="app-roadmap">
          <li>Pure game state and rules</li>
          <li>Automatic optimal computer turns</li>
          <li>Minimal playable board UI</li>
          <li>Restart and stable status exposure</li>
        </ol>
      </section>
    </main>
  );
}