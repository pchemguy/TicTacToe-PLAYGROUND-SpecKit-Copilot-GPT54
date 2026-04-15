# Implemented Architecture

This stage delivers a browser-only React application with a strict boundary between pure game logic and UI rendering. The architecture is intentionally small, but each layer has a distinct job and corresponding tests.

## Module Layout

- `src/game/core/types.ts`: shared domain types, player identities, game status, and winning-line constants
- `src/game/core/state.ts`: immutable board helpers, initial-state creation, and resolved-state assembly
- `src/game/core/rules.ts`: move validation, legal move enumeration, win detection, draw detection, and single-move application
- `src/game/ai/minimax.ts`: recursive scoring for perfect-information play
- `src/game/ai/selectComputerMove.ts`: public computer move selector that iterates legal moves in row-major order and chooses the highest minimax score
- `src/app/hooks/useTicTacToeGame.ts`: orchestration layer that applies the human move, runs the automatic computer response for ongoing games, and exposes restart behavior
- `src/app/App.tsx`: top-level browser composition of status, board, and restart controls
- `src/ui/components/*`: render-focused components for the board, cells, status panel, and restart button
- `tests/*`: coverage split by unit, integration, and browser UI behavior

## Runtime Flow

1. `src/app/main.tsx` mounts `App` into the browser root element.
2. `App` creates a controller through `useTicTacToeGame()`.
3. The hook exposes `gameState`, `playHumanMove()`, and `restartGame()`.
4. `GameBoard` renders the current board and forwards cell clicks back to the hook.
5. The hook applies the human move through `src/game/core/rules.ts`.
6. If the resulting state is still ongoing, the hook selects a computer move through `src/game/ai/selectComputerMove.ts` and applies that move through the same pure rule layer.
7. `GameStatusPanel` renders either the current player or the terminal outcome from the exposed `GameState`.

## Separation Of Concerns

### Pure Core

`src/game/core` owns the game model and rule semantics. It does not depend on React, browser APIs, or rendering concerns. This is where move validity, win lines, draw detection, and terminal-state behavior live.

### Pure Strategy

`src/game/ai` depends on the core rules and state shape, but it remains UI-agnostic. The strategy layer only answers one question: which legal move produces the best deterministic outcome for the computer.

### Orchestration

`src/app/hooks/useTicTacToeGame.ts` bridges pure logic into React state updates. It is responsible for the full turn loop, not the UI components.

### Rendering

`src/ui/components` renders the board and status from already-resolved state. These components should not implement move legality, terminal detection, or computer strategy.

## Current Enforced Boundaries

- Rule changes should start in `src/game/core`.
- Computer behavior changes should start in `src/game/ai`.
- Full-turn flow changes should be isolated to `src/app/hooks/useTicTacToeGame.ts`.
- Text, layout, and interaction wiring should stay in `src/app/App.tsx` and `src/ui/components`.

## Deferred Concerns

The following areas are explicitly outside the implemented architecture for this stage:

- Electron runtime integration
- Any `window.desktopApi` bridge or preload boundary
- Persistence, saved games, settings, or SQLite integration
- Networking or multiplayer behavior

The current codebase should continue to preserve a pure browser workflow until a separate implementation stage introduces those capabilities.