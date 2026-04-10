import { LayerType, useLayerStore } from '../../stores/layerStore';

interface LayerManagerProps {
  counts: Record<LayerType, number>;
}

const layerConfig: Record<LayerType, { label: string; color: string }> = {
  aircraft: { label: 'Aircraft', color: '#FFD700' },
  earthquake: { label: 'Earthquakes', color: '#FF4444' },
  satellite: { label: 'Satellites', color: '#00CED1' },
  maritime: { label: 'Vessels', color: '#4169E1' },
  cctv: { label: 'Webcams', color: '#9370DB' },
};

export function LayerManager({ counts }: LayerManagerProps) {
  const { layers, toggleLayer } = useLayerStore();

  return (
    <div className="layer-manager">
      <h3>Layers</h3>
      {(Object.keys(layerConfig) as LayerType[]).map((type) => (
        <label key={type} className="layer-item">
          <input
            type="checkbox"
            checked={layers[type]}
            onChange={() => toggleLayer(type)}
          />
          <span
            className="layer-color"
            style={{ backgroundColor: layerConfig[type].color }}
          />
          <span className="layer-label">{layerConfig[type].label}</span>
          <span className="layer-count">{counts[type]}</span>
        </label>
      ))}
    </div>
  );
}
