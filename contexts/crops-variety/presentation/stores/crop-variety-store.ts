import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CropVariety } from '../../domain/entities/crops-variety.entity';

interface CropVarietyStore {
  currentCropVariety: CropVariety | null;
  setCurrentCropVariety: (cropVariety: CropVariety) => void;
}

export const useCropVarietyStore = create<CropVarietyStore>()(
  persist(
    (set) => ({
      currentCropVariety: null,
      setCurrentCropVariety: (cropVariety) =>
        set({ currentCropVariety: cropVariety }),
    }),
    { name: 'current-crop-variety-store' },
  ),
);
