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