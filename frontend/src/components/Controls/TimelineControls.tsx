interface TimelineControlsProps {
  is2DMode: boolean;
  onToggleMode: () => void;
}

export function TimelineControls({ is2DMode, onToggleMode }: TimelineControlsProps) {
  return (
    <div className="timeline-controls">
      <button
        className={`mode-toggle ${is2DMode ? 'active' : ''}`}
        onClick={onToggleMode}
      >
        {is2DMode ? '🌍 3D Globe' : '🗺️ 2D Map'}
      </button>
    </div>
  );
}
