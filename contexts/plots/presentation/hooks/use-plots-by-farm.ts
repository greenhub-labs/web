import { useQuery } from '@tanstack/react-query';
import { PlotsApiRepository } from '../../infrastructure/api/plot-api.repository';

const plotsApiRepository = new PlotsApiRepository();

export function usePlotsByFarm(farmId?: string) {
  const getPlotsByFarmIdQuery = useQuery({
    queryKey: ['plots', farmId],
    queryFn: () => plotsApiRepository.getPlotsByFarmId(farmId || ''),
    enabled: !!farmId,
  });

  return {
    getPlotsByFarmIdQuery,
  };
}
