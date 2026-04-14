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