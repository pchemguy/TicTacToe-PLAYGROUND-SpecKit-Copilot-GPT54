# Quickstart: Classic Tic Tac Toe Against Computer

## Goal

Run and validate the implemented browser-based React and TypeScript Tic Tac Toe app with a pure deterministic game core and an unbeatable computer opponent. Electron packaging, persistence, and networking remain out of scope for this stage.

## Prerequisites

- Node.js 22 LTS or newer
- npm 10 or newer
- Bash on Windows only if you need to run repository helper scripts under `.specify/`

## Local Workflow

1. Install dependencies.
2. Start the browser development server.
3. Open the local Vite URL in a browser.
4. Run the automated test suite and type-check validation.

## Commands

```bash
npm install
npm run dev:web
npm test
npm run lint
npm run build
```

## Manual Exercise Path

1. Start a new local game in the browser.
2. Click an empty cell to place the human `X`.
3. Observe the automatic computer `O` response immediately after the accepted move.
4. Continue play until the system reports either a computer win or a draw.
5. Verify that additional moves are blocked after the game ends.
6. Restart the game and confirm the board returns to a clean initial state.

## Validation Checklist

- `npm test` covers core rules, computer strategy, orchestration flow, restart behavior, and browser UI behavior.
- `npm run lint` runs TypeScript no-emit validation for the project.
- `npm run build` verifies the Vite production build succeeds.
- The browser UI should show `Current player: human` at the start of a match and render either a winner or draw message at the end.

## Deferred Scope

- No Electron runtime or packaging commands are part of this quickstart.
- No SQLite setup or migration workflow exists in this stage.
- No persistence or networking validation is required.