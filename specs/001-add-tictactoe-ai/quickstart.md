# Quickstart: Classic Tic Tac Toe Against Computer

## Current Stage Goal

Run and validate a browser-based React and TypeScript implementation of the Tic Tac Toe feature with a pure deterministic game core and unbeatable computer opponent. Electron packaging and SQLite persistence are intentionally out of scope for this stage.

## Prerequisites

- Node.js 22 LTS or newer
- npm 10 or newer
- Bash available on Windows for repository scripts

## Planned Local Workflow

1. Install dependencies.
2. Start the browser development server.
3. Run the automated test suite for core logic, strategy validation, orchestration, and UI behavior.

## Expected Commands After Implementation Scaffold Exists

```bash
npm install
npm run dev:web
npm test
```

## MVP Exercise Path

1. Start a new local game in the browser.
2. Click an empty cell to place the human `X`.
3. Observe the automatic computer `O` response in the fully resolved returned state.
4. Continue play until the system reports either a computer win or a draw, with a human win occurring only if allowed by invalid implementation behavior.
5. Verify that additional moves are blocked after the game ends.
6. Restart the game and confirm the board returns to a clean initial state.

## Validation Checklist

- Core unit tests verify move legality, win detection, draw detection, and terminal-state invariants.
- Strategy tests verify immediate wins, immediate blocks, deterministic tie-breaking, and exhaustive non-loss validation.
- Integration tests verify human move to automatic computer response flow and restart behavior.
- UI tests verify board rendering, click interactions, disabled terminal states, and displayed game status.

## Deferred Work

- No Electron runtime or packaging commands are part of this quickstart.
- No SQLite setup or migration workflow exists in this stage.
- No persistence or networking validation is required.