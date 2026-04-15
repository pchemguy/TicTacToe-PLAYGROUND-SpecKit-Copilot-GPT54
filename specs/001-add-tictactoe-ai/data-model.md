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
  - `reason`: optional diagnostic-only classification such as `win`, `block`, `best-available`, or `forced`; this metadata is not part of the exposed contract and may be omitted or changed without affecting behavior
- **Validation rules**:
  - The selected cell must be legal in the current board state.
  - If multiple moves have the same optimal score, the chosen index must be the lowest row-major index.
  - If present, `reason` is informational only and must not be used to determine move legality, game outcomes, or UI behavior.

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