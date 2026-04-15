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
**Performance Goals**: No formal benchmarked latency target is defined for this stage. The previous `<50 ms on a typical developer machine` value was removed as a formal requirement because this phase does not establish a repeatable measurement harness or enforcement threshold across browser environments. Developers should still treat local play as needing to feel effectively instantaneous, with move application and AI response remaining roughly in line with the earlier sub-50 ms expectation on a typical developer machine.  
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
