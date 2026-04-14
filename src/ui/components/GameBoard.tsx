import type { Board, CellIndex } from '../../game/core/types';
import { GameCell } from './GameCell';

interface GameBoardProps {
  cells: Board;
  disabled?: boolean;
  onSelectCell: (cellIndex: CellIndex) => void;
}

export function GameBoard({ cells, disabled = false, onSelectCell }: GameBoardProps) {
  return (
    <div className="game-board" role="grid" aria-label="Tic Tac Toe board">
      {cells.map((cellValue, index) => (
        <GameCell
          key={index}
          cellIndex={index as CellIndex}
          disabled={disabled}
          onSelect={onSelectCell}
          value={cellValue}
        />
      ))}
    </div>
  );
}