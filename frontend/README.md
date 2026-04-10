# Globe Viewer - Real-Time Global Data Visualization

A professional, real-time 3D/2D global data visualization platform that displays live tracking data from multiple free sources.

## Features

- **Dual Map Modes**: 3D Globe (CesiumJS) and 2D Map (OpenStreetMap)
- **Real-Time Data Sources**:
  - ✈️ Aircraft Tracking via OpenSky Network
  - 🚢 Maritime Vessels via AIS Hub
  - 🛰️ Satellite Monitoring via CelesTrak
  - 🌍 Earthquake Monitoring via USGS
  - 📹 CCTV/Webcams via public feeds
- **Professional UI**: Black & white theme with Inter typography
- **Layer Controls**: Toggle visibility of each data type
- **Interactive Entities**: Click on entities for detailed information

## Quick Start

```bash
cd frontend
npm install
npm run dev
```

Then open http://localhost:5173 in your browser.

## Tech Stack

- React 18 + TypeScript
- CesiumJS for 3D globe rendering
- Leaflet for 2D maps
- TanStack Query for data fetching
- Zustand for state management
- Vite for build tooling

## API Sources

All data sources are completely free and require no API keys:

- OpenSky Network: Live flight data
- USGS: Earthquake data
- CelesTrak: Satellite TLE data
- AIS Hub: Maritime vessel tracking
- WebcamTaxi: Public webcam feeds

## License

MIT License - Free for personal and commercial use.
