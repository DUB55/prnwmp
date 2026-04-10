import { LayerType } from '../../stores/layerStore';

interface DataLegendProps {
  counts: Record<LayerType, number>;
}

const layerColors: Record<LayerType, string> = {
  aircraft: '#FFD700',
  earthquake: '#FF4444',
  satellite: '#00CED1',
  maritime: '#4169E1',
  cctv: '#9370DB',
};

export function DataLegend({ counts }: DataLegendProps) {
  const total = Object.values(counts).reduce((sum, count) => sum + count, 0);

  return (
    <div className="data-legend">
      <h4>Live Data</h4>
      <div className="legend-total">
        <span className="total-count">{total}</span>
        <span>entities tracked</span>
      </div>
      <div className="legend-items">
        {(Object.keys(counts) as LayerType[]).map((type) => (
          <div key={type} className="legend-item">
            <span
              className="legend-dot"
              style={{ backgroundColor: layerColors[type] }}
            />
            <span className="legend-label">
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </span>
            <span className="legend-count">{counts[type]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
