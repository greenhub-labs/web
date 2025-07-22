import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Plot } from '../../domain/entities/plot.entity';

interface PlotStore {
  currentPlot: Plot | null;
  setCurrentPlot: (plot: Plot) => void;
}

export const usePlotStore = create<PlotStore>()(
  persist(
    (set) => ({
      currentPlot: null,
      setCurrentPlot: (plot) => set({ currentPlot: plot }),
    }),
    { name: 'current-plot-store' },
  ),
);
