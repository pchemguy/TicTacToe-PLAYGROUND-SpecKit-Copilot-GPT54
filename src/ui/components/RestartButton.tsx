interface RestartButtonProps {
  disabled?: boolean;
  onRestart: () => void;
}

export function RestartButton({ disabled = false, onRestart }: RestartButtonProps) {
  return (
    <button
      type="button"
      className="restart-button"
      disabled={disabled}
      onClick={onRestart}
    >
      Restart Match
    </button>
  );
}