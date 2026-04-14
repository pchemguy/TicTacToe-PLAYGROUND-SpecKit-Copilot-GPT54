# Tasks: Classic Tic Tac Toe Against Computer

**Input**: Design documents from `/specs/001-add-tictactoe-ai/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: Every behavior-changing task in this file includes corresponding automated test work in the same task to satisfy the constitution requirement that code and test development remain inseparable.

**Organization**: Tasks are grouped by phase and by user story so each story remains independently testable and aligned to the planned architecture boundaries.

## Phase 1: Setup

**Purpose**: Establish the browser-only React and TypeScript workspace for this implementation phase.

- [x] T001 Create the browser app toolchain configuration in package.json, tsconfig.json, vite.config.ts, and index.html
- [x] T002 [P] Configure browser test bootstrap in tests/setup.ts and package.json
- [x] T003 [P] Create the application entry shell in src/app/main.tsx, src/app/App.tsx, and src/ui/styles/app.css

---

## Phase 2: Foundational

**Purpose**: Define shared domain structure and architecture seams that all user stories depend on.

**⚠️ CRITICAL**: No user story work should begin until this phase is complete.

- [x] T004 Create shared game domain types and constants in src/game/core/types.ts
- [x] T005 Create shared immutable state helpers and exported initial-state primitives in src/game/core/state.ts
- [x] T006 Create the empty orchestration hook and UI component shells in src/app/hooks/useTicTacToeGame.ts, src/ui/components/GameBoard.tsx, src/ui/components/GameCell.tsx, src/ui/components/GameStatusPanel.tsx, and src/ui/components/RestartButton.tsx

**Checkpoint**: Browser app scaffold and architecture seams are in place for story-by-story implementation.

---

## Phase 3: User Story 1 - Start a New Match (Priority: P1) 🎯 MVP

**Goal**: A human can start a deterministic new single-player match with the defined initial state.

**Independent Test**: Run the unit and integration coverage for initialization and verify the system exposes an empty 9-cell board, human `X`, computer `O`, human turn, and ongoing status without making any moves.

- [x] T007 [US1] Add initialization unit coverage in tests/unit/core/state.test.ts and implement the new-game state factory in src/game/core/state.ts
- [x] T008 [US1] Add initialization orchestration coverage in tests/integration/app-flow.test.ts and implement initial exposed state in src/app/hooks/useTicTacToeGame.ts

**Checkpoint**: User Story 1 is independently functional through pure state creation and orchestration exposure.

---

## Phase 4: User Story 2 - Make a Valid Human Move (Priority: P1) 🎯 MVP

**Goal**: A human can submit moves only to legal cells, and invalid input leaves the game state unchanged.

**Independent Test**: Run the move-validation unit and orchestration tests and verify legal moves mutate only the targeted empty cell while occupied, out-of-range, and non-integer inputs leave the full state unchanged.

- [x] T009 [US2] Add move-validation unit coverage for valid moves, occupied cells, out-of-range indexes, and non-integer inputs in tests/unit/core/rules.test.ts and implement single-move validation and human move application in src/game/core/rules.ts
- [ ] T010 [US2] Add orchestration coverage for unchanged state after rejected moves in tests/integration/app-flow.test.ts and implement rejected-input handling in src/app/hooks/useTicTacToeGame.ts

**Checkpoint**: User Story 2 is independently functional through the pure engine and orchestration layer without UI dependency.

---

## Phase 5: User Story 4 - End the Game Correctly (Priority: P1)

**Goal**: The deterministic engine detects wins and draws immediately, exposes terminal state correctly, and blocks further moves before later AI/UI milestones depend on that behavior.

**Independent Test**: Run the terminal-state unit and orchestration coverage and verify all win lines, draw states, final-cell win precedence, `currentPlayer = none`, no computer move after a terminal human move, and blocked post-game input behavior.

- [ ] T011 [US4] Add terminal-state unit coverage for row, column, diagonal, draw, final-cell win precedence, and terminal-state invariants in tests/unit/core/rules.test.ts and implement terminal evaluation semantics in src/game/core/rules.ts and src/game/core/state.ts
- [ ] T012 [US4] Add terminal-state orchestration coverage in tests/integration/app-flow.test.ts and implement no-AI-on-terminal-human-move handling plus post-game input blocking in src/app/hooks/useTicTacToeGame.ts

**Checkpoint**: The deterministic core rules stage is complete and safe for AI and playable UI work.

---

## Phase 6: User Story 3 - Receive an Optimal Computer Response (Priority: P1)

**Goal**: After each valid human move in a non-terminal game, the computer responds automatically with deterministic unbeatable play, and the browser UI becomes minimally playable.

**Independent Test**: Run the strategy unit tests, exhaustive non-loss validation, orchestration flow tests, and browser UI test to verify the computer always responds legally, prefers winning or blocking moves correctly, breaks ties by lowest row-major index, and never loses across deterministic validation.

- [ ] T013 [US3] Add strategy unit coverage for immediate wins, immediate blocks, and lowest-index tie-breaking in tests/unit/ai/select-computer-move.test.ts and implement deterministic move selection in src/game/ai/selectComputerMove.ts
- [ ] T014 [US3] Add exhaustive non-loss validation in tests/unit/ai/minimax-validation.test.ts and implement minimax scoring in src/game/ai/minimax.ts
- [ ] T015 [US3] Add full-turn orchestration coverage in tests/integration/app-flow.test.ts and implement automatic computer-turn resolution in src/app/hooks/useTicTacToeGame.ts
- [ ] T016 [US3] Add playable browser flow coverage in tests/ui/playable-game.test.tsx and implement the minimal clickable board UI in src/ui/components/GameBoard.tsx, src/ui/components/GameCell.tsx, and src/app/App.tsx

**Checkpoint**: User Story 3 delivers the first fully playable browser MVP with an unbeatable computer opponent.

---

## Phase 7: User Story 5 - Restart From a Clean State (Priority: P2)

**Goal**: A player can restart from either an in-progress or finished game and receive a clean deterministic initial state.

**Independent Test**: Run the restart integration and UI coverage and verify restart clears the board, restores player defaults, resets status, and removes all prior terminal details.

- [ ] T017 [US5] Add restart integration coverage in tests/integration/restart-flow.test.ts and implement restart state reset in src/app/hooks/useTicTacToeGame.ts and src/game/core/state.ts
- [ ] T018 [US5] Add restart browser coverage in tests/ui/playable-game.test.tsx and implement the restart control in src/ui/components/RestartButton.tsx and src/app/App.tsx

**Checkpoint**: User Story 5 is independently testable through restart behavior in the browser app.

---

## Phase 8: User Story 6 - Inspect Current Game State (Priority: P3)

**Goal**: The current deterministic game state is consistently exposed and rendered for initialization, ongoing play, invalid moves, and terminal outcomes.

**Independent Test**: Run the state-exposure integration and UI coverage and verify the exposed state shape remains stable after initialization, rejected moves, automatic computer turns, wins, and draws.

- [ ] T019 [US6] Add state-exposure integration coverage in tests/integration/app-flow.test.ts and implement stable current-state exposure in src/app/hooks/useTicTacToeGame.ts
- [ ] T020 [US6] Add state-rendering browser coverage in tests/ui/playable-game.test.tsx and implement current-player and outcome presentation in src/ui/components/GameStatusPanel.tsx and src/app/App.tsx

**Checkpoint**: User Story 6 completes the requested exposed-state behavior for the browser app.

---

## Phase 9: Documentation & Developer Experience

**Purpose**: Document the implemented system and developer workflow after the feature behavior is complete.

- [ ] T021 Update browser-only usage, setup, and test commands in README.md and specs/001-add-tictactoe-ai/quickstart.md
- [ ] T022 Create implementation-focused developer workflow notes in DEVELOPMENT.md
- [ ] T023 [P] Document the implemented architecture and separation of concerns in docs/architecture.md
- [ ] T024 [P] Document the implemented game rules, state transitions, and edge cases in docs/game-rules.md
- [ ] T025 [P] Document the implemented strategy testing and optimality validation approach in docs/testing.md
- [ ] T026 Review README.md, DEVELOPMENT.md, specs/001-add-tictactoe-ai/quickstart.md, and docs/ content against the implemented code and test workflow to remove speculation and correct mismatches

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies.
- **Foundational (Phase 2)**: Depends on Setup and blocks all user stories.
- **User Story 1 (Phase 3)**: Depends on Foundational.
- **User Story 2 (Phase 4)**: Depends on User Story 1 because move handling requires initialized game state.
- **User Story 4 (Phase 5)**: Depends on User Story 2 because deterministic terminal-state behavior is part of the core rules stage.
- **User Story 3 (Phase 6)**: Depends on User Story 4 because the computer-response loop and playable UI rely on completed terminal-state semantics.
- **User Story 5 (Phase 7)**: Depends on User Story 3 because restart must reset both in-progress and terminal playable states.
- **User Story 6 (Phase 8)**: Depends on User Story 3 and User Story 5 because stable state exposure is finalized after the playable flow and restart behavior are both complete.
- **Documentation & Developer Experience (Phase 9)**: Depends on all implementation phases so docs reflect the implemented system rather than speculation.

### User Story Dependencies

- **US1**: First independently testable engine slice.
- **US2**: Builds on US1 state initialization but remains testable without UI.
- **US4**: Builds on US2 and completes terminal-state engine behavior before AI/UI depend on it.
- **US3**: Builds on US4 and delivers the first playable browser MVP.
- **US5**: Builds on US3 terminal and in-progress flows.
- **US6**: Builds on the stabilized orchestration and UI state presentation from US3 and US5.

### Within Each User Story

- Every behavior-changing task combines automated tests and implementation in the same task.
- Pure core logic changes occur before orchestration changes.
- Orchestration changes occur before UI rendering changes.
- Exhaustive strategy validation is required before declaring the unbeatable AI complete.
- Documentation review must occur after documentation creation tasks and before the feature is considered complete.

### Parallel Opportunities

- `T002` and `T003` can run in parallel after `T001`.
- `T023`, `T024`, and `T025` can run in parallel after `T021` and `T022` are complete.

---

## Parallel Example: Documentation & Developer Experience

```bash
Task: "Document the implemented architecture and separation of concerns in docs/architecture.md"
Task: "Document the implemented game rules, state transitions, and edge cases in docs/game-rules.md"
Task: "Document the implemented strategy testing and optimality validation approach in docs/testing.md"
```

---

## Implementation Strategy

### MVP First

1. Complete Setup and Foundational phases.
2. Complete User Stories 1, 2, and 4 to establish deterministic engine behavior, including terminal-state rules.
3. Complete User Story 3 to deliver the first playable browser MVP with unbeatable AI.
4. Stop and validate the playable flow before proceeding.

### Incremental Delivery

1. Deterministic engine: User Stories 1, 2, and 4.
2. Unbeatable computer strategy and playable web flow: User Story 3.
3. Restart and exposed-status enhancements: User Stories 5 and 6.
4. Documentation and developer experience updates and review: Phase 9.

---

## Notes

- All tasks stay within the current browser-only React and TypeScript scope.
- Electron, SQLite, persistence, and networking are intentionally excluded from this task list.
- No task should introduce game-rule logic into UI components or React-specific behavior into the pure engine or strategy modules.