# Implemented Game Rules

This document describes the delivered Tic Tac Toe behavior for the current browser stage.

## Board And Players

- The board is a flat nine-cell row-major array.
- Valid cell indexes are `0` through `8`.
- The human player is always `X`.
- The computer player is always `O`.
- A new match always starts with the human turn.

## Initial State

A fresh game state contains:

- an empty board
- `currentPlayer: human`
- `humanPlayer: { role: 'human', mark: 'X' }`
- `computerPlayer: { role: 'computer', mark: 'O' }`
- `status: { kind: 'ongoing' }`

## Human Move Rules

A human move is accepted only when all of the following are true:

- the game status is still ongoing
- it is currently the human turn
- the provided cell index is an integer
- the cell index is within `0` through `8`
- the targeted cell is empty

Rejected moves leave the existing state unchanged.

## Computer Move Rules

- The computer only moves after an accepted human move that leaves the game ongoing.
- The computer move is selected deterministically from the current state.
- If multiple moves have the same best outcome, the lowest row-major index is chosen.

## Win And Draw Detection

The engine checks the standard eight winning lines:

- three rows
- three columns
- two diagonals

If any line contains the same non-empty mark, the game becomes `status: { kind: 'won', winner: ... }`.

If the board is full and no win line exists, the game becomes `status: { kind: 'draw' }`.

If the final empty cell also completes a winning line, the result is a win, not a draw.

## Terminal State Semantics

- Terminal states always expose `currentPlayer: none`.
- No further human or computer moves are accepted after a win or draw.
- The browser board disables interaction when the game is no longer ongoing.
- The status panel renders either `Winner: ...` or `Result: draw` for terminal games.

## Restart Behavior

- Restart is available from both in-progress and finished games.
- Restart discards the current board and recreates the same deterministic initial state.
- No move history or prior result is preserved after restart.

## Edge Cases Covered By The Implementation

- Occupied-cell input is rejected without mutation.
- Out-of-range input is rejected without mutation.
- Non-integer input is rejected without mutation.
- A terminal human move does not trigger an extra computer turn.
- A finished game remains locked even if additional move requests are attempted.
- The exposed `GameState` shape remains stable across initialization, invalid moves, computer turns, wins, draws, and restart.