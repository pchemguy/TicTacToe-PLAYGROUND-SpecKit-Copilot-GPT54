interface GameStatusPanelProps {
  detail: string;
  title: string;
}

export function GameStatusPanel({ detail, title }: GameStatusPanelProps) {
  return (
    <section className="status-panel" aria-live="polite">
      <h3>{title}</h3>
      <p>{detail}</p>
    </section>
  );
}