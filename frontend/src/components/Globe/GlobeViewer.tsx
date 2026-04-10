import { useEffect, useRef } from 'react';
import * as Cesium from 'cesium';
import { AircraftData, EarthquakeData, SatelliteData, MaritimeData, CCTVData } from '../../api/client';

interface GlobeViewerProps {
  aircraftData: AircraftData[];
  earthquakeData: EarthquakeData[];
  satelliteData: SatelliteData[];
  maritimeData: MaritimeData[];
  cctvData: CCTVData[];
  showAircraft: boolean;
  showEarthquake: boolean;
  showSatellite: boolean;
  showMaritime: boolean;
  showCCTV: boolean;
  onEntityClick: (entity: any) => void;
}

export function GlobeViewer({
  aircraftData,
  earthquakeData,
  satelliteData,
  maritimeData,
  cctvData,
  showAircraft,
  showEarthquake,
  showSatellite,
  showMaritime,
  showCCTV,
  onEntityClick,
}: GlobeViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<Cesium.Viewer | null>(null);
  const entitiesRef = useRef<{
    aircraft: Cesium.Entity[];
    earthquake: Cesium.Entity[];
    satellite: Cesium.Entity[];
    maritime: Cesium.Entity[];
    cctv: Cesium.Entity[];
  }>({
    aircraft: [],
    earthquake: [],
    satellite: [],
    maritime: [],
    cctv: [],
  });

  useEffect(() => {
    if (!containerRef.current) return;

    Cesium.Ion.defaultAccessToken = '';

    viewerRef.current = new Cesium.Viewer(containerRef.current, {
      terrainProvider: undefined,
      baseLayerPicker: false,
      navigationHelpButton: false,
      animation: false,
      timeline: false,
      fullscreenButton: false,
      homeButton: false,
      sceneModePicker: false,
      infoBox: false,
      selectionIndicator: false,
      geocoder: false,
      creditContainer: document.createElement('div'),
    });

    const viewer = viewerRef.current;
    viewer.scene.globe.enableLighting = true;
    viewer.camera.setView({
      destination: Cesium.Cartesian3.fromDegrees(0, 20, 20000000),
    });

    const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
    handler.setInputAction((movement: any) => {
      const pickedObject = viewer.scene.pick(movement.position);
      if (pickedObject && pickedObject.id) {
        const entity = pickedObject.id;
        onEntityClick({
          id: entity.id,
          type: entity.properties?.type?.getValue(),
          data: entity.properties?.data?.getValue(),
        });
      }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

    return () => {
      handler.destroy();
      viewer.destroy();
    };
  }, []);

  const clearEntities = (type: keyof typeof entitiesRef.current) => {
    const viewer = viewerRef.current;
    if (!viewer) return;
    entitiesRef.current[type].forEach((entity) => {
      viewer.entities.remove(entity);
    });
    entitiesRef.current[type] = [];
  };

  const addAircraftEntities = (data: AircraftData[]) => {
    const viewer = viewerRef.current;
    if (!viewer || !showAircraft) return;

    clearEntities('aircraft');

    data.forEach((aircraft) => {
      if (aircraft.latitude === null || aircraft.longitude === null) return;

      const entity = viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(aircraft.longitude, aircraft.latitude, aircraft.altitude || 0),
        point: {
          pixelSize: 6,
          color: Cesium.Color.GOLD,
          outlineColor: Cesium.Color.WHITE,
          outlineWidth: 2,
        },
        properties: {
          type: 'aircraft',
          data: aircraft,
        },
      });
      if (entity) entitiesRef.current.aircraft.push(entity);
    });
  };

  const addEarthquakeEntities = (data: EarthquakeData[]) => {
    const viewer = viewerRef.current;
    if (!viewer || !showEarthquake) return;

    clearEntities('earthquake');

    data.forEach((quake) => {
      const magnitude = quake.magnitude || 0;
      const pixelSize = Math.max(5, Math.min(20, magnitude * 3));
      const color = magnitude >= 6 ? Cesium.Color.RED : magnitude >= 4 ? Cesium.Color.ORANGE : Cesium.Color.YELLOW;

      const entity = viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(quake.longitude, quake.latitude, 0),
        point: {
          pixelSize,
          color,
          outlineColor: Cesium.Color.WHITE,
          outlineWidth: 2,
        },
        properties: {
          type: 'earthquake',
          data: quake,
        },
      });
      if (entity) entitiesRef.current.earthquake.push(entity);
    });
  };

  const addSatelliteEntities = (data: SatelliteData[]) => {
    const viewer = viewerRef.current;
    if (!viewer || !showSatellite) return;

    clearEntities('satellite');

    data.forEach((sat) => {
      const lat = (Math.random() - 0.5) * 180;
      const lon = (Math.random() - 0.5) * 360;
      const alt = 400000 + Math.random() * 36000;

      const entity = viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(lon, lat, alt),
        point: {
          pixelSize: 5,
          color: Cesium.Color.CYAN,
          outlineColor: Cesium.Color.WHITE,
          outlineWidth: 2,
        },
        properties: {
          type: 'satellite',
          data: sat,
        },
      });
      if (entity) entitiesRef.current.satellite.push(entity);
    });
  };

  const addMaritimeEntities = (data: MaritimeData[]) => {
    const viewer = viewerRef.current;
    if (!viewer || !showMaritime) return;

    clearEntities('maritime');

    data.forEach((vessel) => {
      const entity = viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(vessel.longitude, vessel.latitude, 0),
        point: {
          pixelSize: 7,
          color: Cesium.Color.BLUE,
          outlineColor: Cesium.Color.WHITE,
          outlineWidth: 2,
        },
        properties: {
          type: 'maritime',
          data: vessel,
        },
      });
      if (entity) entitiesRef.current.maritime.push(entity);
    });
  };

  const addCCTVEntities = (data: CCTVData[]) => {
    const viewer = viewerRef.current;
    if (!viewer || !showCCTV) return;

    clearEntities('cctv');

    data.forEach((cam) => {
      const entity = viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(cam.longitude, cam.latitude, 0),
        point: {
          pixelSize: 8,
          color: Cesium.Color.PURPLE,
          outlineColor: Cesium.Color.WHITE,
          outlineWidth: 2,
        },
        properties: {
          type: 'cctv',
          data: cam,
        },
      });
      if (entity) entitiesRef.current.cctv.push(entity);
    });
  };

  useEffect(() => {
    addAircraftEntities(aircraftData);
  }, [aircraftData, showAircraft]);

  useEffect(() => {
    addEarthquakeEntities(earthquakeData);
  }, [earthquakeData, showEarthquake]);

  useEffect(() => {
    addSatelliteEntities(satelliteData);
  }, [satelliteData, showSatellite]);

  useEffect(() => {
    addMaritimeEntities(maritimeData);
  }, [maritimeData, showMaritime]);

  useEffect(() => {
    addCCTVEntities(cctvData);
  }, [cctvData, showCCTV]);

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;
}
