import axios, { AxiosInstance } from 'axios';

const CORS_PROXY = 'https://api.allorigins.win/raw?url=';

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      timeout: 10000,
    });
  }

  private async fetchWithCors<T>(url: string): Promise<T> {
    try {
      const response = await this.client.get<T>(url);
      return response.data;
    } catch (error) {
      console.log(`Direct fetch failed for ${url}, trying CORS proxy...`);
      try {
        const response = await this.client.get<T>(`${CORS_PROXY}${encodeURIComponent(url)}`);
        return response.data;
      } catch (proxyError) {
        console.error(`Failed to fetch from ${url}:`, proxyError);
        throw proxyError;
      }
    }
  }

  async getAircraftData(): Promise<AircraftData[]> {
    try {
      const data = await this.fetchWithCors<any>('https://opensky-network.org/api/states/all');
      if (!data.states) return [];
      return data.states.slice(0, 1000).map((state: any[]) => ({
        id: state[0],
        callsign: state[1]?.trim() || 'N/A',
        originCountry: state[2],
        timePosition: state[4],
        lastContact: state[5],
        longitude: state[5],
        latitude: state[6],
        altitude: state[7],
        onGround: state[8],
        velocity: state[9],
        trueTrack: state[10],
        verticalRate: state[11],
      })).filter((a: AircraftData) => a.latitude !== null && a.longitude !== null);
    } catch {
      return [];
    }
  }

  async getEarthquakeData(): Promise<EarthquakeData[]> {
    try {
      const data = await this.fetchWithCors<any>('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson');
      if (!data.features) return [];
      return data.features.slice(0, 100).map((feature: any) => ({
        id: feature.id,
        magnitude: feature.properties.mag,
        place: feature.properties.place,
        time: feature.properties.time,
        longitude: feature.geometry.coordinates[0],
        latitude: feature.geometry.coordinates[1],
        depth: feature.geometry.coordinates[2],
        url: feature.properties.url,
      }));
    } catch {
      return [];
    }
  }

  async getSatelliteData(): Promise<SatelliteData[]> {
    try {
      const data = await this.fetchWithCors<any>('https://celestrak.org/NORAD/elements/gp.php?GROUP=active&FORMAT=json');
      if (!Array.isArray(data)) return [];
      return data.slice(0, 50).map((sat: any) => ({
        id: sat.NORAD_ID,
        name: sat.SATELLITE_NAME,
        line1: sat.LINE1,
        line2: sat.LINE2,
      }));
    } catch {
      return [];
    }
  }

  async getMaritimeData(): Promise<MaritimeData[]> {
    try {
      const data = await this.fetchWithCors<any>('https://www.aishub.net/ais_export.json');
      if (!Array.isArray(data)) return [];
      return data.slice(0, 100).map((vessel: any) => ({
        id: vessel.mmsi,
        mmsi: vessel.mmsi,
        name: vessel.name || 'Unknown',
        longitude: vessel.lon,
        latitude: vessel.lat,
        speed: vessel.speed,
        course: vessel.course,
        heading: vessel.heading,
        destination: vessel.destination || 'N/A',
        timestamp: vessel.timestamp,
      }));
    } catch {
      return [];
    }
  }

  async getCCTVData(): Promise<CCTVData[]> {
    // Using alternative free webcam API
    try {
      const data = await this.fetchWithCors<any>('https://www.webcamtaxi.com/en/usa/california/san-francisco.html');
      // Fallback mock data since webcam APIs require keys
      return [
        { id: 'cam1', name: 'San Francisco Bay', latitude: 37.8199, longitude: -122.4783, url: 'https://www.webcamtaxi.com/en/usa/california/san-francisco.html' },
        { id: 'cam2', name: 'New York Times Square', latitude: 40.7580, longitude: -73.9855, url: 'https://www.webcamtaxi.com/en/usa/new-york/times-square.html' },
        { id: 'cam3', name: 'Tokyo Shibuya', latitude: 35.6595, longitude: 139.7004, url: 'https://www.webcamtaxi.com/en/japan/tokyo/shibuya-crossing.html' },
        { id: 'cam4', name: 'London Piccadilly', latitude: 51.5099, longitude: -0.1341, url: 'https://www.webcamtaxi.com/en/england/london/piccadilly-circus.html' },
        { id: 'cam5', name: 'Paris Eiffel Tower', latitude: 48.8584, longitude: 2.2945, url: 'https://www.webcamtaxi.com/en/france/paris/eiffel-tower.html' },
      ];
    } catch {
      return [];
    }
  }
}

export interface AircraftData {
  id: string;
  callsign: string;
  originCountry: string;
  timePosition: number;
  lastContact: number;
  longitude: number | null;
  latitude: number | null;
  altitude: number | null;
  onGround: boolean;
  velocity: number | null;
  trueTrack: number | null;
  verticalRate: number | null;
}

export interface EarthquakeData {
  id: string;
  magnitude: number | null;
  place: string;
  time: number;
  longitude: number;
  latitude: number;
  depth: number;
  url: string;
}

export interface SatelliteData {
  id: string;
  name: string;
  line1: string;
  line2: string;
}

export interface MaritimeData {
  id: string;
  mmsi: number;
  name: string;
  longitude: number;
  latitude: number;
  speed: number;
  course: number;
  heading: number;
  destination: string;
  timestamp: number;
}

export interface CCTVData {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  url: string;
}

export const apiClient = new ApiClient();
