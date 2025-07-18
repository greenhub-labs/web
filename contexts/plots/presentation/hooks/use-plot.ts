import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CreatePlotDto } from '../../domain/dto/create-plot.dto';
import { Plot } from '../../domain/entities/plot.entity';
import { PlotsApiRepository } from '../../infrastructure/api/plot-api.repository';

const plotsApiRepository = new PlotsApiRepository();

export function usePlot(plotId?: string) {
  const queryClient = useQueryClient();

  const getPlotsMutation = useMutation({
    mutationFn: () => plotsApiRepository.getPlots(),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['plots'] });
      return data;
    },
  });

  const getPlotByIdQuery = useQuery({
    queryKey: ['plot', plotId],
    queryFn: () => plotsApiRepository.getPlotById(plotId || ''),
    enabled: !!plotId,
  });

  const createPlotMutation = useMutation({
    mutationFn: (plot: CreatePlotDto) => plotsApiRepository.createPlot(plot),
    onSuccess: (data) => {
      queryClient.refetchQueries({ queryKey: ['plot', data.id] });
      queryClient.refetchQueries({ queryKey: ['me'] });
      return data;
    },
  });

  const updatePlotMutation = useMutation({
    mutationFn: (plot: Plot) => plotsApiRepository.updatePlot(plot),
    onSuccess: (data) => {
      queryClient.refetchQueries({ queryKey: ['plot', data.id] });
      queryClient.refetchQueries({ queryKey: ['me'] });
      return data;
    },
  });

  return {
    getPlotsMutation,
    getPlotByIdQuery,
    createPlotMutation,
    updatePlotMutation,
  };
}
