import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Plot } from '../../domain/entities/plot.entity';
import { PlotsApiRepository } from '../../infrastructure/api/plot-api.repository';

const plotsApiRepository = new PlotsApiRepository();

export function usePlot(plotId?: string) {
  const queryClient = useQueryClient();

  const getPlotByIdQuery = useQuery({
    queryKey: ['plot', plotId],
    queryFn: () => plotsApiRepository.getPlotById(plotId || ''),
    enabled: !!plotId,
  });

  const updatePlotMutation = useMutation({
    mutationFn: (plot: Plot) => plotsApiRepository.updatePlot(plot),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['plot', data.id] });
      return data;
    },
  });

  return {
    getPlotByIdQuery,
    updatePlotMutation,
  };
}
