import { useState, useCallback } from 'react';
import { LayerType } from '../stores/layerStore';

export interface Entity {
  id: string;
  type: LayerType;
  data: any;
}

export function useEntitySelection() {
  const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null);

  const selectEntity = useCallback((entity: Entity) => {
    setSelectedEntity(entity);
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedEntity(null);
  }, []);

  return { selectedEntity, selectEntity, clearSelection };
}
