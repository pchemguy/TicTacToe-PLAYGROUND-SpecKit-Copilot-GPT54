import {
  ALL_CELL_INDEXES,
  type Board,
  type BoardCell,
  BOARD_CELL_COUNT,
  COMPUTER_PLAYER,
  EMPTY_CELL,
  HUMAN_PLAYER,
  ONGOING_STATUS,
  type CellIndex,
  type CurrentPlayer,
  type GameState,
  type GameStatus,
} from './types';

const EMPTY_BOARD_TEMPLATE = Object.freeze(
  ALL_CELL_INDEXES.map(() => EMPTY_CELL) as BoardCell[],
) as Board;

export const INITIAL_BOARD: Board = EMPTY_BOARD_TEMPLATE;
export const INITIAL_CURRENT_PLAYER: CurrentPlayer = 'human';
export const INITIAL_STATUS: GameStatus = ONGOING_STATUS;
export const INITIAL_HUMAN_PLAYER = HUMAN_PLAYER;
export const INITIAL_COMPUTER_PLAYER = COMPUTER_PLAYER;

export function createEmptyBoard(): Board {
  return [...EMPTY_BOARD_TEMPLATE];
}

export function cloneBoard(board: Board): Board {
  if (board.length !== BOARD_CELL_COUNT) {
    throw new Error(`Expected a board with ${BOARD_CELL_COUNT} cells.`);
  }

  return [...board];
}

export function replaceBoardCell(
  board: Board,
  cellIndex: CellIndex,
  nextValue: BoardCell,
): Board {
  const nextBoard = [...cloneBoard(board)];
  nextBoard[cellIndex] = nextValue;
  return nextBoard;
}

export function createInitialGameState(): GameState {
  return {
    board: createEmptyBoard(),
    currentPlayer: INITIAL_CURRENT_PLAYER,
    humanPlayer: INITIAL_HUMAN_PLAYER,
    computerPlayer: INITIAL_COMPUTER_PLAYER,
    status: INITIAL_STATUS,
  };
}

export function resetGameState(): GameState {
  return createInitialGameState();
}

export function resolveGameState(
  state: GameState,
  board: Board,
  status: GameStatus,
  nextCurrentPlayer: CurrentPlayer,
): GameState {
  return {
    ...state,
    board,
    currentPlayer: status.kind === 'ongoing' ? nextCurrentPlayer : 'none',
    status,
  };
}