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