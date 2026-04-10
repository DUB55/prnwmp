import { Entity } from '../../hooks/useEntitySelection';

interface EntityInfoProps {
  entity: Entity | null;
  onClose: () => void;
}

export function EntityInfo({ entity, onClose }: EntityInfoProps) {
  if (!entity) return null;

  const renderData = () => {
    switch (entity.type) {
      case 'aircraft':
        return (
          <>
            <h3>✈️ Aircraft</h3>
            <p><strong>Callsign:</strong> {entity.data.callsign}</p>
            <p><strong>Country:</strong> {entity.data.originCountry}</p>
            <p><strong>Altitude:</strong> {entity.data.altitude ? `${entity.data.altitude} m` : 'N/A'}</p>
            <p><strong>Speed:</strong> {entity.data.velocity ? `${entity.data.velocity} m/s` : 'N/A'}</p>
            <p><strong>On Ground:</strong> {entity.data.onGround ? 'Yes' : 'No'}</p>
          </>
        );
      case 'earthquake':
        return (
          <>
            <h3>🌍 Earthquake</h3>
            <p><strong>Magnitude:</strong> {entity.data.magnitude}</p>
            <p><strong>Location:</strong> {entity.data.place}</p>
            <p><strong>Depth:</strong> {entity.data.depth} km</p>
            <p><strong>Time:</strong> {new Date(entity.data.time).toLocaleString()}</p>
            {entity.data.url && (
              <a href={entity.data.url} target="_blank" rel="noopener noreferrer">
                More Info
              </a>
            )}
          </>
        );
      case 'satellite':
        return (
          <>
            <h3>🛰️ Satellite</h3>
            <p><strong>Name:</strong> {entity.data.name}</p>
            <p><strong>NORAD ID:</strong> {entity.data.id}</p>
          </>
        );
      case 'maritime':
        return (
          <>
            <h3>🚢 Vessel</h3>
            <p><strong>Name:</strong> {entity.data.name}</p>
            <p><strong>MMSI:</strong> {entity.data.mmsi}</p>
            <p><strong>Speed:</strong> {entity.data.speed} knots</p>
            <p><strong>Course:</strong> {entity.data.course}°</p>
            <p><strong>Destination:</strong> {entity.data.destination}</p>
          </>
        );
      case 'cctv':
        return (
          <>
            <h3>📹 Webcam</h3>
            <p><strong>Name:</strong> {entity.data.name}</p>
            <a href={entity.data.url} target="_blank" rel="noopener noreferrer">
              View Camera
            </a>
          </>
        );
      default:
        return <p>Unknown entity type</p>;
    }
  };

  return (
    <div className="entity-info">
      <button className="close-btn" onClick={onClose}>×</button>
      {renderData()}
    </div>
  );
}
