Create a specification for a classic Tic Tac Toe game played against the computer.

The system must implement a deterministic single-player game on a 3×3 grid, where a human player competes against the computer. Players alternate turns placing their marks (X and O) into empty cells. The objective is to align three marks horizontally, vertically, or diagonally.

The computer player MUST use an optimal strategy that guarantees it never loses.

## User Scenarios & Testing (mandatory)

Define prioritized user stories:

* P1: A human player can start a new game against the computer
* P1: The human player can make a move by selecting an empty cell
* P1: The system enforces valid moves (no overwriting occupied cells)
* P1: The computer automatically makes a move after the human turn
* P1: The computer always selects a move consistent with optimal play (never loses)
* P1: The system detects a win condition immediately after each move
* P1: The system detects a draw when the grid is full with no winner
* P2: The system prevents further moves after game over
* P2: The system allows restarting a new game from a clean state
* P2: The system defines which player (human or computer) goes first
* P3: The system exposes the current game state (board, current player, status)

Each story must include acceptance scenarios using Given/When/Then format and be independently testable.

## Functional Requirements

Define clear, testable requirements:

* The system MUST represent a 3×3 grid with 9 addressable cells
* The system MUST assign roles: human player and computer player (X or O)
* The system MUST track whose turn it is
* The system MUST reject moves to already occupied cells without mutating state
* The system MUST alternate turns strictly after valid moves only
* The system MUST trigger the computer move automatically after a valid human move when the game is not in a terminal state
* The system MUST ensure the computer selects only valid moves
* The system MUST ensure the computer strategy is optimal:
    * the computer MUST never lose under any sequence of valid human moves
    * the computer MUST choose a winning move if one exists
    * the computer MUST block an immediate opponent win if present
* The system MUST detect winning configurations (rows, columns, diagonals)
* The system MUST detect draw condition when all cells are filled and no winner exists
* The system MUST transition to a terminal state (win or draw) and prevent further moves
* The system MUST provide a way to initialize/reset the game state
* The system MUST expose the current state in a deterministic structure

## Key Entities

Define core entities and their roles (no implementation):

* GameState: represents the full state of the game (grid, current player, status)
* Player: represents human or computer (with assigned mark X or O)
* Move/Input: represents a human action targeting a cell
* ComputerMove: represents a system-generated move
* GameStatus: represents ongoing, win (with winner), or draw

## Success Criteria

Define measurable criteria:

* The computer never loses across all possible valid human move sequences
* All valid sequences of moves produce deterministic and correct outcomes
* Invalid human moves do not alter game state
* All winning conditions are correctly detected across all possible board states
* Draw is correctly identified only when no winning condition exists
* Computer moves are always valid and consistent with optimal strategy
* Game state transitions are consistent and reproducible

## Assumptions & Constraints

* The game is strictly single-player (human vs computer)
* The grid size is fixed at 3×3
* The computer strategy must be optimal (unbeatable)
* No UI, rendering, or input method is specified
* No persistence or networking is required

## Out of Scope

* Multiplayer (human vs human)
* Suboptimal or difficulty-based AI strategies
* Variable grid sizes
* UI/UX, rendering, or animations
* Multiplayer over network
