# Implementation Plan: Classic Tic Tac Toe Against Computer

**Branch**: `001-add-tictactoe-ai` | **Date**: 2026-04-14 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-add-tictactoe-ai/spec.md`

## Summary

Build the current stage of the feature as a browser-based React and TypeScript web app with a pure deterministic game engine and a pure unbeatable computer strategy that are independently testable outside the UI shell. The staged delivery path is: deterministic rules and state transitions first, then optimal computer move selection with rigorous non-loss validation, then a minimal playable web UI, then restart flow and exposed status, while Electron packaging and SQLite persistence remain explicitly deferred.

## Technical Context

**Language/Version**: TypeScript 5.x  
**Primary Dependencies**: React 19, React DOM 19, Vite, Vitest, React Testing Library  
**Storage**: N/A for current stage; SQLite explicitly deferred  
**Testing**: Vitest for pure core and orchestration tests, React Testing Library for UI behavior tests  
**Target Platform**: Current stage targets evergreen desktop browsers in a local web app flow; future desktop packaging via Electron is deferred  
**Project Type**: Browser-based web application for the current stage within a browser-oriented desktop-app roadmap  
**Performance Goals**: Human move validation and computer response should complete within a single user interaction cycle, with AI move selection targeting <50 ms on a typical developer machine  
**Constraints**: Offline-capable, deterministic core behavior, no networking, no persistence, no Electron packaging in this stage, pure game engine and AI logic testable without React  
**Scale/Scope**: Single local player session, one 3x3 board, small finite state space, no multi-user concerns

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Pre-Phase 0 Gate

- **Specification and source of truth**: PASS. The feature has an approved specification with explicit clarifications, constraints, and measurable outcomes.
- **Small, testable increments**: PASS. Planned increments are core rules, AI strategy validation, playable UI, then restart/status slice.
- **Code and test inseparability**: PASS. Every planned implementation slice includes paired unit, integration, or UI-adjacent tests.
- **Traceable decisions and assumptions**: PASS. Current-stage browser-only scope, deterministic tie-breaking, board shape, and terminal-state semantics are explicit.
- **Architecture and environment constraints**: PASS. React and TypeScript remain the active stack, browser-first workflow is preserved, and Electron/SQLite are deferred rather than replaced.
- **Separation of concerns**: PASS. The plan isolates pure game rules, pure AI, orchestration, and rendering into separate modules.
- **Early MVP delivery**: PASS. The staged path delivers deterministic core behavior before UI, then a minimal playable shell before restart/status enhancements.

### Post-Phase 1 Re-Check

- **Small increments remain intact**: PASS. Design artifacts preserve the staged execution order without bundling unrelated work.
- **Tests remain inseparable from code changes**: PASS. Contracts and quickstart explicitly pair each implementation area with verification expectations.
- **Decisions and deferrals are explicit**: PASS. Research and data model document the chosen strategy, proof approach, and deferred packaging/persistence work.
- **Architecture boundaries remain enforceable**: PASS. Internal contracts keep pure core logic isolated from React and future runtime integrations.

## Project Structure

### Documentation (this feature)

```text
specs/001-add-tictactoe-ai/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   ├── app-orchestration.md
│   ├── computer-strategy.md
│   └── game-core.md
└── tasks.md
```

### Source Code (repository root)

```text
src/
├── app/
│   ├── App.tsx
│   ├── main.tsx
│   └── hooks/
│       └── useTicTacToeGame.ts
├── game/
│   ├── ai/
│   │   ├── minimax.ts
│   │   └── selectComputerMove.ts
│   └── core/
│       ├── rules.ts
│       ├── state.ts
│       └── types.ts
└── ui/
    ├── components/
    │   ├── GameBoard.tsx
    │   ├── GameCell.tsx
    │   ├── GameStatusPanel.tsx
    │   └── RestartButton.tsx
    └── styles/
        └── app.css

tests/
├── integration/
│   ├── app-flow.test.ts
│   └── restart-flow.test.ts
├── ui/
│   └── playable-game.test.tsx
└── unit/
    ├── ai/
    │   ├── minimax-validation.test.ts
    │   └── select-computer-move.test.ts
    └── core/
        ├── rules.test.ts
        └── state.test.ts
```

**Structure Decision**: Use a single browser-app project with `src/game/core` for pure deterministic rules and state transitions, `src/game/ai` for pure unbeatable move selection, `src/app` for orchestration, and `src/ui` for rendering. This preserves the browser-first current stage and keeps future Electron or persistence work outside the current structure rather than mixing it into the first implementation slice.

## Architecture Decomposition

### Pure Core Logic

- `src/game/core/types.ts`: Domain types for marks, players, game status, terminal outcomes, and cell indexes.
- `src/game/core/state.ts`: Creation of initial state and immutable state helpers.
- `src/game/core/rules.ts`: Move validation, state transitions for a single applied move, win detection, draw detection, legal move enumeration, and terminal-state protection.

### Pure Computer Strategy

- `src/game/ai/minimax.ts`: Exhaustive game-tree scoring with deterministic iteration order.
- `src/game/ai/selectComputerMove.ts`: Public strategy entry point that chooses the best legal move and breaks ties by lowest row-major index.

### Application State Orchestration

- `src/app/hooks/useTicTacToeGame.ts`: Imperative shell that accepts human input, applies core rules, triggers the computer move when required, exposes the fully resolved post-computer state, and provides restart behavior.

### UI And Rendering

- `src/ui/components/*`: Stateless or minimally stateful React components that render board cells, status, and restart controls from orchestration-provided state.
- No UI component may implement win detection, turn logic, or move selection logic directly.

## Delivery Stages

### Stage 1: Deterministic Core Rules MVP

- Implement board representation, player assignment, move validation, turn handling, win detection, draw detection, and terminal-state protection as pure functions.
- Deliver unit tests that cover all win lines, invalid move rejection, draw detection, and terminal-state invariants.

### Stage 2: Unbeatable Computer Strategy

- Implement minimax-based move selection with deterministic lowest-index tie-breaking.
- Add rigorous validation, including exhaustive traversal of valid human move sequences and representative scenario tests for winning, blocking, and repeated-state determinism.

### Stage 3: Minimal Playable Web UI

- Add a minimal React UI that renders the board, status text, and click handling through the orchestration hook.
- Verify the UI can drive a full local human-versus-computer game without embedding domain logic in components.

### Stage 4: Restart And Exposed Status

- Add restart flow, clearly rendered status messages, and tests that confirm the UI and orchestration layer reset cleanly and expose terminal states correctly.

### Deferred Beyond Current Stage

- Electron packaging and runtime integration.
- SQLite persistence and any saved history or preferences.
- Any networking, analytics, or multi-session persistence.

## Test Strategy

- **Core unit tests**: Validate pure rules, board invariants, current-player semantics, terminal-state transitions, and invalid move rejection.
- **AI unit tests**: Validate immediate wins, forced blocks, deterministic tie-breaking, and legal-move selection.
- **AI proof harness**: Exhaustively enumerate valid human move sequences from a new game and assert the computer never reaches a losing terminal outcome.
- **Orchestration integration tests**: Validate human move to computer response flow, fully resolved returned state semantics, and restart behavior.
- **UI behavior tests**: Validate rendering, click-to-move flow, disabled terminal board behavior, and restart from the browser shell.

## Decisions And Assumptions

- Use a flat 9-element row-major board array with cells indexed 0 through 8.
- Keep the human player fixed as X and the computer fixed as O for the initial implementation stage.
- Expose `currentPlayer` as `none` for terminal states.
- Return the fully resolved state after any accepted human move that leaves the game ongoing.
- Do not add packaging, persistence, or cross-session abstractions in this stage; preserve future seams by keeping current logic pure and local.

## Complexity Tracking

No constitution violations or justified complexity exceptions were identified for this plan.
*** Add File: ./research.md

# Phase 0 Research: Classic Tic Tac Toe Against Computer

## Decision 1: Optimal Computer Strategy

- **Decision**: Use minimax with deterministic lowest-index row-major tie-breaking for all equally optimal moves.
- **Rationale**: Tic Tac Toe has a small finite game tree, so minimax can exhaustively evaluate all reachable positions and guarantee the best achievable outcome for the computer. Deterministic iteration order and lowest-index tie-breaking satisfy the specification's requirement that identical states always produce the same move.
- **Alternatives considered**:
  - Precomputed strategy tables: Rejected because they add maintenance overhead without providing clearer correctness than minimax for a 3x3 game.
  - Heuristic move ranking: Rejected because heuristics can fail to guarantee non-loss across all valid human lines.
  - Monte Carlo or probabilistic selection: Rejected because randomness conflicts with deterministic repeated-state behavior and is unnecessary for the small search space.

## Decision 2: Validation Approach For Proving Non-Loss

- **Decision**: Validate the computer strategy with exhaustive traversal of all valid human move sequences from a new game, backed by targeted unit and integration tests for critical scenarios.
- **Rationale**: The state space for classic Tic Tac Toe is small enough to enumerate completely, which provides direct evidence that the computer never reaches a losing terminal state when the rules and move selector are composed correctly. Targeted scenario tests then protect against regressions in immediate win, immediate block, deterministic tie-break, and terminal-state handling.
- **Alternatives considered**:
  - Scenario tests only: Rejected because curated examples alone do not prove non-loss across all valid move sequences.
  - Property-based tests without exhaustive traversal: Rejected because random sampling would provide confidence but not a complete proof for the current feature scope.
  - Manual play testing: Rejected as insufficient durable evidence for an unbeatable strategy claim.

## Decision 3: Boundary Between Pure Core Logic And Web UI Integration

- **Decision**: Keep game rules/state transitions and computer move selection as pure TypeScript modules under `src/game/`, use a thin orchestration hook under `src/app/hooks/`, and keep React components under `src/ui/components/` as render-only consumers of orchestrated state.
- **Rationale**: This boundary preserves independent testability of deterministic logic, keeps React concerns out of the domain layer, and leaves clear seams for later Electron or persistence integration without rewriting the game engine.
- **Alternatives considered**:
  - Embedding move resolution in React components: Rejected because it couples UI events with domain behavior and makes exhaustive testing harder.
  - Merging AI and rules into one module: Rejected because move legality and game-state transitions change for different reasons than search strategy and should be tested independently.
  - Centralized global store first: Rejected because the feature scope is small and a hook-based orchestration layer is sufficient without extra infrastructure.

## Decision 4: Current-Stage Platform Scope

- **Decision**: Deliver the feature as a browser-only React and TypeScript web app in this stage, while explicitly deferring Electron packaging and SQLite persistence.
- **Rationale**: This matches the requested staged path, preserves the repository's browser-first architecture expectation, and avoids speculative packaging or storage work before the playable baseline exists.
- **Alternatives considered**:
  - Adding Electron scaffolding immediately: Rejected because packaging is out of scope for the current stage and would dilute MVP delivery.
  - Adding SQLite or browser persistence now: Rejected because persistence is deferred and the current feature does not require saved state.

## Research Outcome Summary

- The computer strategy will be minimax-based, deterministic, and pure.
- Proof of non-loss will rely on exhaustive traversal plus focused regression tests.
- The feature boundary is explicit: pure domain and AI in `src/game`, orchestration in `src/app`, rendering in `src/ui`.
- Browser-only delivery is the active scope; Electron and SQLite remain deferred.
*** Add File: ./data-model.md

# Data Model: Classic Tic Tac Toe Against Computer

## Overview

The current stage models a single local match with no persistence. The board is a flat 9-element array ordered by row-major index, and all state transitions are deterministic.

## Entities

### BoardCell

- **Purpose**: Represents the value stored at one board index.
- **Allowed values**: `X`, `O`, `empty`
- **Validation rules**:
  - Every game board contains exactly 9 cells.
  - A cell may transition from `empty` to `X` or `O` exactly once per game.
  - A cell value never changes from `X` to `O` or from `O` to `X`.

### Board

- **Purpose**: Represents the current board as a flat row-major array of 9 `BoardCell` values.
- **Fields**:
  - `cells`: ordered collection of 9 cell values indexed `0` through `8`
- **Validation rules**:
  - Indexes `0` through `8` map to the 3x3 grid in row-major order.
  - The difference between counts of `X` and `O` must be consistent with the current progression of a single valid match.
  - A terminal board may not accept additional moves.

### Player

- **Purpose**: Represents one participant and assigned mark.
- **Fields**:
  - `role`: `human` or `computer`
  - `mark`: `X` or `O`
- **Validation rules**:
  - Exactly one human player exists and is assigned `X`.
  - Exactly one computer player exists and is assigned `O`.

### GameStatus

- **Purpose**: Represents whether the game is active or terminal.
- **States**:
  - `ongoing`
  - `won` with `winner = human | computer`
  - `draw`
- **Validation rules**:
  - `won` is set immediately when a row, column, or diagonal is completed.
  - `draw` is set only when all 9 cells are filled and no winner exists.
  - Terminal states require `currentPlayer = none`.

### GameState

- **Purpose**: Represents the full game at a point in time.
- **Fields**:
  - `board`: Board
  - `humanPlayer`: Player
  - `computerPlayer`: Player
  - `currentPlayer`: `human | computer | none`
  - `status`: GameStatus
- **Validation rules**:
  - A new game starts with an empty board, `currentPlayer = human`, and `status = ongoing`.
  - If `status` is terminal, `currentPlayer` must be `none`.
  - If `status = ongoing` after a fully resolved human action, `currentPlayer` must be `human`, because the automatic computer move has already been applied.

### MoveInput

- **Purpose**: Represents a human attempt to play a move.
- **Fields**:
  - `cellIndex`: integer `0` through `8`
- **Validation rules**:
  - The value must be an integer within `0..8`.
  - The targeted cell must be `empty`.
  - The game must be `ongoing` and accept human input.

### ComputerMove

- **Purpose**: Represents the move chosen by the strategy layer.
- **Fields**:
  - `cellIndex`: integer `0` through `8`
  - `reason`: optional classification such as `win`, `block`, `best-available`, or `forced`
- **Validation rules**:
  - The selected cell must be legal in the current board state.
  - If multiple moves have the same optimal score, the chosen index must be the lowest row-major index.

## Relationships

- `GameState` contains one `Board`, one human `Player`, one computer `Player`, one `GameStatus`, and one `currentPlayer` indicator.
- `MoveInput` is consumed by the orchestration layer, which applies pure game rules first and invokes `ComputerMove` selection only if the resulting state remains ongoing.
- `ComputerMove` depends on the pure strategy layer and produces a new `GameState` only through the rules layer.

## State Transitions

### New Game

- Start with all 9 cells `empty`.
- Assign human `X`, computer `O`.
- Set `currentPlayer = human` and `status = ongoing`.

### Valid Human Move

1. Validate that `cellIndex` is in range, the game is ongoing, and the cell is empty.
2. Apply `X` to the targeted cell.
3. Evaluate for immediate human win or draw.
4. If terminal, set `currentPlayer = none` and return the terminal `GameState`.
5. Otherwise invoke the computer strategy, apply the chosen `O` move, and evaluate again.
6. If still ongoing after the computer move, return a fully resolved state with `currentPlayer = human`.

### Invalid Human Move

- Reject the move.
- Return the unchanged `GameState`.

### Restart

- Discard the previous board and terminal details.
- Recreate the initial `GameState`.

## Deferred Data

- No persistence entities are included in this stage.
- No saved preferences, local history, or packaging/runtime metadata are modeled until a later scope explicitly includes them.
*** Add File: ./quickstart.md

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
4. Continue play until the system reports either a computer win, a human win only if allowed by invalid implementation behavior, or a draw.
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
*** Add File: ./contracts/game-core.md

# Internal Contract: Game Core

## Purpose

Define the pure deterministic rules and state-transition boundary for the Tic Tac Toe domain. This module may not import React, browser APIs, Electron APIs, or persistence concerns.

## Inputs

- `GameState`
- `cellIndex` from `0` through `8`
- Explicit acting player when applying a single move

## Outputs

- New immutable `GameState` after a single applied move
- Validation result describing whether a move is legal
- Derived values such as legal moves, winner detection, and terminal status

## Required Behaviors

- Reject out-of-range or occupied-cell moves without mutating state.
- Apply exactly one mark for the acting player.
- Detect wins across 3 rows, 3 columns, and 2 diagonals.
- Detect draw only when the board is full and no winner exists.
- Set `currentPlayer = none` for terminal states.

## Expected Operations

- `createInitialGameState() -> GameState`
- `isLegalMove(state, player, cellIndex) -> boolean`
- `applyMove(state, player, cellIndex) -> GameState`
- `getLegalMoves(state) -> number[]`
- `evaluateGameStatus(board) -> GameStatus`

## Invariants

- Board length is always 9.
- Human player is always `X`; computer player is always `O` for this feature.
- The module does not trigger automatic computer moves; orchestration owns multi-step turn resolution.
*** Add File: ./contracts/computer-strategy.md

# Internal Contract: Computer Strategy

## Purpose

Define the pure move-selection boundary for the unbeatable computer opponent. This module may depend on pure core types and read-only rule helpers, but it may not mutate UI state or call React APIs.

## Inputs

- Current non-terminal `GameState` where it is the computer turn
- Read-only access to legal move generation and terminal-state evaluation

## Outputs

- A single legal `cellIndex` from `0` through `8`
- Optional analysis metadata for tests or debugging, such as strategy score or move classification

## Required Behaviors

- Select only legal moves.
- Never choose a move that allows a forced loss when a draw or win is available.
- Prefer an immediate winning move when one exists.
- Block an immediate human win when no immediate computer win exists.
- Break ties between equally optimal moves by choosing the lowest row-major index.

## Expected Operations

- `selectComputerMove(state) -> number`
- `scorePosition(state, activePlayer) -> number`

## Invariants

- The strategy is deterministic for identical reachable states.
- The strategy remains pure and side-effect free.
- Proof-oriented tests may exhaustively traverse game states without involving the UI shell.
*** Add File: ./contracts/app-orchestration.md

# Internal Contract: Application Orchestration

## Purpose

Define the browser-app shell that composes pure rules and pure strategy into a playable local interaction flow. This layer is the only feature layer that coordinates a full human turn plus automatic computer response.

## Inputs

- Human-selected `cellIndex`
- Current `GameState`
- Restart command from the UI

## Outputs

- Fully resolved `GameState` for the UI to render
- Stable UI callbacks such as `playHumanMove(index)` and `restartGame()`

## Required Behaviors

- Accept human input only while the game is ongoing.
- Apply the human move through the game core.
- If the human move ends the game, return the terminal state without invoking the strategy layer.
- If the game remains ongoing, request exactly one computer move, apply it through the game core, and expose the fully resolved post-computer state.
- Reset to a clean initial state when restart is requested.

## Expected Operations

- `useTicTacToeGame() -> { gameState, playHumanMove, restartGame }`
- `playHumanMove(cellIndex) -> GameState`
- `restartGame() -> GameState`

## Invariants

- React components consume orchestration output but do not embed domain rules or AI logic.
- Orchestration may manage local component-facing state, but it must not redefine win rules or move legality.
- Electron packaging and persistence are not part of this contract in the current stage.
