export type CellIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export type PlayerMark = 'X' | 'O';
export type BoardCell = PlayerMark | 'empty';
export type PlayerRole = 'human' | 'computer';
export type CurrentPlayer = PlayerRole | 'none';
export type MoveRejectionReason =
  | 'game-complete'
  | 'not-human-turn'
  | 'occupied-cell'
  | 'out-of-range'
  | 'non-integer';

export interface Player {
  role: PlayerRole;
  mark: PlayerMark;
}

export interface ComputerMove {
  cellIndex: CellIndex;
  reason?: 'best-available' | 'block' | 'forced' | 'win';
}

export interface ValidMoveResult {
  isValid: true;
}

export interface InvalidMoveResult {
  isValid: false;
  reason: MoveRejectionReason;
}

export type MoveValidationResult = ValidMoveResult | InvalidMoveResult;

export interface OngoingGameStatus {
  kind: 'ongoing';
}

export interface DrawGameStatus {
  kind: 'draw';
}

export interface WonGameStatus {
  kind: 'won';
  winner: PlayerRole;
}

export type GameStatus = OngoingGameStatus | DrawGameStatus | WonGameStatus;
export type Board = readonly BoardCell[];
export type WinningLine = readonly [CellIndex, CellIndex, CellIndex];

export interface GameState {
  board: Board;
  currentPlayer: CurrentPlayer;
  humanPlayer: Player;
  computerPlayer: Player;
  status: GameStatus;
}

export const BOARD_DIMENSION = 3;
export const BOARD_CELL_COUNT = BOARD_DIMENSION * BOARD_DIMENSION;
export const EMPTY_CELL: BoardCell = 'empty';
export const HUMAN_PLAYER: Player = { role: 'human', mark: 'X' };
export const COMPUTER_PLAYER: Player = { role: 'computer', mark: 'O' };
export const ALL_CELL_INDEXES: readonly CellIndex[] = [0, 1, 2, 3, 4, 5, 6, 7, 8];
export const WINNING_LINES: readonly WinningLine[] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
export const ONGOING_STATUS: OngoingGameStatus = { kind: 'ongoing' };
export const DRAW_STATUS: DrawGameStatus = { kind: 'draw' };