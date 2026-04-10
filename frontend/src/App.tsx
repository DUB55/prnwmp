import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GlobeViewer } from './components/Globe/GlobeViewer';
import { LayerManager } from './components/Controls/LayerManager';
import { TimelineControls } from './components/Controls/TimelineControls';
import { EntityInfo } from './components/Controls/EntityInfo';
import { DataLegend } from './components/Controls/DataLegend';
import { useAircraftData, useEarthquakeData, useSatelliteData, useMaritimeData, useCCTVData } from './hooks/useData';
import { useLayerStore, LayerType } from './stores/layerStore';
import { useEntitySelection, Entity } from './hooks/useEntitySelection';
import './styles/professional-theme.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30000,
      retry: 2,
    },
  },
});

function App() {
  const [is2DMode, setIs2DMode] = useState(false);
  const { layers } = useLayerStore();
  const { selectedEntity, selectEntity, clearSelection } = useEntitySelection();

  const { data: aircraftData = [] } = useAircraftData();
  const { data: earthquakeData = [] } = useEarthquakeData();
  const { data: satelliteData = [] } = useSatelliteData();
  const { data: maritimeData = [] } = useMaritimeData();
  const { data: cctvData = [] } = useCCTVData();

  const counts: Record<LayerType, number> = {
    aircraft: aircraftData.length,
    earthquake: earthquakeData.length,
    satellite: satelliteData.length,
    maritime: maritimeData.length,
    cctv: cctvData.length,
  };

  const handleEntityClick = (entity: Entity) => {
    selectEntity(entity);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Globe Viewer</h1>
        <p className="subtitle">Real-Time Global Data Visualization</p>
      </header>

      <div className="main-content">
        <aside className="sidebar">
          <DataLegend counts={counts} />
          <LayerManager counts={counts} />
          <TimelineControls
            is2DMode={is2DMode}
            onToggleMode={() => setIs2DMode(!is2DMode)}
          />
        </aside>

        <main className="map-container">
          {is2DMode ? (
            <div className="map-2d">
              <iframe
                src="https://www.openstreetmap.org/export/embed.html?bbox=-180%2C-85%2C180%2C85&layer=mapnik"
                title="2D Map"
                style={{ width: '100%', height: '100%', border: 'none', background: '#000' }}
              />
            </div>
          ) : (
            <GlobeViewer
              aircraftData={aircraftData}
              earthquakeData={earthquakeData}
              satelliteData={satelliteData}
              maritimeData={maritimeData}
              cctvData={cctvData}
              showAircraft={layers.aircraft}
              showEarthquake={layers.earthquake}
              showSatellite={layers.satellite}
              showMaritime={layers.maritime}
              showCCTV={layers.cctv}
              onEntityClick={handleEntityClick}
            />
          )}
        </main>

        {selectedEntity && (
          <EntityInfo entity={selectedEntity} onClose={clearSelection} />
        )}
      </div>
    </div>
  );
}

export default function Root() {
  return (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
}
