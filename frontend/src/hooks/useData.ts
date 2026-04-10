import { useQuery } from '@tanstack/react-query';
import { apiClient, AircraftData, EarthquakeData, SatelliteData, MaritimeData, CCTVData } from '../api/client';

export function useAircraftData() {
  return useQuery<AircraftData[]>({
    queryKey: ['aircraft'],
    queryFn: () => apiClient.getAircraftData(),
    refetchInterval: 30000,
    retry: 2,
  });
}

export function useEarthquakeData() {
  return useQuery<EarthquakeData[]>({
    queryKey: ['earthquake'],
    queryFn: () => apiClient.getEarthquakeData(),
    refetchInterval: 30000,
    retry: 2,
  });
}

export function useSatelliteData() {
  return useQuery<SatelliteData[]>({
    queryKey: ['satellite'],
    queryFn: () => apiClient.getSatelliteData(),
    refetchInterval: 60000,
    retry: 2,
  });
}

export function useMaritimeData() {
  return useQuery<MaritimeData[]>({
    queryKey: ['maritime'],
    queryFn: () => apiClient.getMaritimeData(),
    refetchInterval: 30000,
    retry: 2,
  });
}

export function useCCTVData() {
  return useQuery<CCTVData[]>({
    queryKey: ['cctv'],
    queryFn: () => apiClient.getCCTVData(),
    refetchInterval: 60000,
    retry: 2,
  });
}
