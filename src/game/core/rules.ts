import { replaceBoardCell, resolveGameState } from './state';
import {
  ALL_CELL_INDEXES,
  BOARD_CELL_COUNT,
  ONGOING_STATUS,
  WINNING_LINES,
  type Board,
  type BoardCell,
  type CellIndex,
  type CurrentPlayer,
  type GameStatus,
  type GameState,
  type MoveValidationResult,
  type PlayerRole,
} from './types';

function isCellIndex(value: number): value is CellIndex {
  return Number.isInteger(value) && value >= 0 && value < BOARD_CELL_COUNT;
}

function getNextPlayer(player: PlayerRole): CurrentPlayer {
  return player === 'human' ? 'computer' : 'human';
}

function getWinnerFromMark(mark: BoardCell): PlayerRole | null {
  if (mark === 'X') {
    return 'human';
  }

  if (mark === 'O') {
    return 'computer';
  }

  return null;
}

export function evaluateGameStatus(board: Board): GameStatus {
  for (const [firstIndex, secondIndex, thirdIndex] of WINNING_LINES) {
    const firstCell = board[firstIndex];

    if (firstCell === 'empty') {
      continue;
    }

    if (firstCell === board[secondIndex] && firstCell === board[thirdIndex]) {
      return {
        kind: 'won',
        winner: getWinnerFromMark(firstCell) ?? 'human',
      };
    }
  }

  if (board.every((cell) => cell !== 'empty')) {
    return { kind: 'draw' };
  }

  return ONGOING_STATUS;
}

export function validateMove(
  state: GameState,
  player: PlayerRole,
  cellIndex: number,
): MoveValidationResult {
  if (state.status.kind !== 'ongoing') {
    return { isValid: false, reason: 'game-complete' };
  }

  if (state.currentPlayer !== player) {
    return { isValid: false, reason: 'not-human-turn' };
  }

  if (!Number.isInteger(cellIndex)) {
    return { isValid: false, reason: 'non-integer' };
  }

  if (!isCellIndex(cellIndex)) {
    return { isValid: false, reason: 'out-of-range' };
  }

  if (state.board[cellIndex] !== 'empty') {
    return { isValid: false, reason: 'occupied-cell' };
  }

  return { isValid: true };
}

export function isLegalMove(
  state: GameState,
  player: PlayerRole,
  cellIndex: number,
): boolean {
  return validateMove(state, player, cellIndex).isValid;
}

export function getLegalMoves(state: GameState): number[] {
  if (state.status.kind !== 'ongoing') {
    return [];
  }

  return ALL_CELL_INDEXES.filter((cellIndex) => state.board[cellIndex] === 'empty');
}

export function applyMove(
  state: GameState,
  player: PlayerRole,
  cellIndex: number,
): GameState {
  const validation = validateMove(state, player, cellIndex);

  if (!validation.isValid) {
    return state;
  }

  const playerMark = player === 'human' ? state.humanPlayer.mark : state.computerPlayer.mark;
  const nextBoard = replaceBoardCell(state.board, cellIndex as CellIndex, playerMark);
  const nextStatus = evaluateGameStatus(nextBoard);

  return resolveGameState(state, nextBoard, nextStatus, getNextPlayer(player));
}