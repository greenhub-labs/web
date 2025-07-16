import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Farm } from '../../domain/entities/farm.entity';

interface FarmStore {
  currentFarm: Farm | null;
  setCurrentFarm: (farm: Farm) => void;
}

export const useFarmStore = create<FarmStore>()(
  persist(
    (set) => ({
      currentFarm: null,
      setCurrentFarm: (farm) => set({ currentFarm: farm }),
    }),
    { name: 'current-farm-store' },
  ),
);
