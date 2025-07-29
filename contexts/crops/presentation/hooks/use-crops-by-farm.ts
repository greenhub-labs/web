import { useQuery, useQueryClient } from '@tanstack/react-query';
import { CropsApiRepository } from '../../infrastructure/api/crop-api.repository';

const cropsApiRepository = new CropsApiRepository();

export function useCropsByFarm(farmId?: string | null) {
  const queryClient = useQueryClient();

  const getCropsByFarmIdQuery = useQuery({
    queryKey: ['crops', farmId],
    queryFn: () => cropsApiRepository.getCropsByFarmId(farmId || ''),
    enabled: !!farmId,
  });

  return {
    getCropsByFarmIdQuery,
  };
}
