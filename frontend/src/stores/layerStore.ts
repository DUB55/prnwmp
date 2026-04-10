import { create } from 'zustand';

export type LayerType = 'aircraft' | 'earthquake' | 'satellite' | 'maritime' | 'cctv';

interface LayerState {
  layers: Record<LayerType, boolean>;
  toggleLayer: (layerType: LayerType) => void;
  setLayer: (layerType: LayerType, value: boolean) => void;
}

export const useLayerStore = create<LayerState>((set) => ({
  layers: {
    aircraft: true,
    earthquake: true,
    satellite: true,
    maritime: true,
    cctv: true,
  },
  toggleLayer: (layerType) =>
    set((state) => ({
      layers: { ...state.layers, [layerType]: !state.layers[layerType] },
    })),
  setLayer: (layerType, value) =>
    set((state) => ({
      layers: { ...state.layers, [layerType]: value },
    })),
}));
