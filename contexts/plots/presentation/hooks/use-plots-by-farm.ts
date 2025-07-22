import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CreatePlotDto } from '../../domain/dto/create-plot.dto';
import { Plot } from '../../domain/entities/plot.entity';
import { PlotsApiRepository } from '../../infrastructure/api/plot-api.repository';

const plotsApiRepository = new PlotsApiRepository();

export function usePlotsByFarm(farmId?: string | null) {
  const queryClient = useQueryClient();

  const getPlotsByFarmIdQuery = useQuery({
    queryKey: ['plots', farmId],
    queryFn: () => plotsApiRepository.getPlotsByFarmId(farmId || ''),
    enabled: !!farmId,
  });

  const createPlotMutation = useMutation({
    mutationFn: (plot: CreatePlotDto) => plotsApiRepository.createPlot(plot),
    onSuccess: (data) => {
      if (farmId) {
        queryClient.refetchQueries({ queryKey: ['plots', farmId] });
      }
      return data;
    },
  });

  const updatePlotMutation = useMutation({
    mutationFn: (plot: Plot) => plotsApiRepository.updatePlot(plot),
    onSuccess: (data) => {
      if (farmId) {
        queryClient.refetchQueries({ queryKey: ['plots', farmId] });
      }
      return data;
    },
  });

  const deletePlotMutation = useMutation({
    mutationFn: (plotId: string) => plotsApiRepository.deletePlot(plotId),
    onSuccess: (data) => {
      if (farmId) {
        queryClient.refetchQueries({ queryKey: ['plots', farmId] });
      }
      return data;
    },
  });

  return {
    getPlotsByFarmIdQuery,
    createPlotMutation,
    updatePlotMutation,
    deletePlotMutation,
  };
}
