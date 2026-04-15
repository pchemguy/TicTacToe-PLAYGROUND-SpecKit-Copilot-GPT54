> [!NOTE] Spec Kit Highlights
> 
> See [SPEC_KIT_NOTES](SPEC_KIT_NOTES.md) for important Spec Kit highlights.

# Classic Tic Tac Toe Against Computer

This repository contains the current browser-only implementation stage of a React and TypeScript Tic Tac Toe game. A human player always uses `X`, the computer always uses `O`, and the computer responds with deterministic minimax-based play that does not lose under valid human play.

## Implemented Scope

- Browser-based local play only
- Pure game rules and state transitions outside the React UI
- Automatic computer turns after accepted human moves
- Restart support for both in-progress and finished games
- Automated validation across unit, integration, and browser UI tests

## Out Of Scope For This Stage

- Electron packaging
- SQLite or any other persistence layer
- Networking, multiplayer, analytics, or saved history

## Requirements

- Node.js 22 or newer
- npm 10 or newer

## Local Setup

```bash
npm install
```

## Run The App

```bash
npm run dev:web
```

Vite will print a local development URL. Open that URL in a browser to play the game.

## How To Play

1. Open the app in the browser.
2. Click any empty cell to place the human `X`.
3. Wait for the automatic computer `O` response.
4. Continue until the status panel reports either a computer win or a draw.
5. Use `Restart Match` to reset the board to the initial state.

## Validation Commands

```bash
npm test
npm run lint
npm run build
```

## Repository Layout

- `src/game/core`: pure types, immutable state helpers, and rule evaluation
- `src/game/ai`: deterministic computer move selection and minimax scoring
- `src/app`: React entry point and orchestration hook
- `src/ui`: render-focused components and styles
- `tests`: unit, integration, and UI coverage
- `specs/001-add-tictactoe-ai`: spec, plan, quickstart, contracts, and task tracking

## Additional Documentation

- `specs/001-add-tictactoe-ai/quickstart.md`: fast local usage and validation path
- `DEVELOPMENT.md`: contributor workflow and module boundaries
- `docs/architecture.md`: implemented architecture and separation of concerns
- `docs/game-rules.md`: delivered rules, state transitions, and edge cases
- `docs/testing.md`: test suite structure and non-loss validation approach