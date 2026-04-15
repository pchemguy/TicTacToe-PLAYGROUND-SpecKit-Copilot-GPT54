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