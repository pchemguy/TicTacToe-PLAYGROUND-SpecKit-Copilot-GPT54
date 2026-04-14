export function App() {
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