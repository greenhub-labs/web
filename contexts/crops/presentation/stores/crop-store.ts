import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Crop } from '../../domain/entities/crop.entity';

interface CropStore {
  currentCrop: Crop | null;
  setCurrentCrop: (crop: Crop) => void;
}

export const useCropStore = create<CropStore>()(
  persist(
    (set) => ({
      currentCrop: null,
      setCurrentCrop: (crop) => set({ currentCrop: crop }),
    }),
    { name: 'current-crop-store' },
  ),
);
