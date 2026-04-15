import type { BoardCell, CellIndex } from '../../game/core/types';

interface GameCellProps {
  cellIndex: CellIndex;
  disabled?: boolean;
  onSelect: (cellIndex: CellIndex) => void;
  value: BoardCell;
}

export function GameCell({ cellIndex, disabled = false, onSelect, value }: GameCellProps) {
  return (
    <button
      type="button"
      className="game-cell"
      aria-label={`Cell ${cellIndex}`}
      disabled={disabled}
      onClick={() => onSelect(cellIndex)}
    >
      {value === 'empty' ? '' : value}
    </button>
  );
}