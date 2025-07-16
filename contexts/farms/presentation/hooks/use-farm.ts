import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { FarmsApiRepository } from '../../infrastructure/api/farm-api.repository';

const farmsApiRepository = new FarmsApiRepository();

export function useFarm(farmId: string) {
  const queryClient = useQueryClient();

  const getFarmsMutation = useMutation({
    mutationFn: () => farmsApiRepository.getFarms(),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['farms'] });
      return data;
    },
  });

  const getFarmByIdQuery = useQuery({
    queryKey: ['farm', farmId],
    queryFn: () => farmsApiRepository.getFarmById(farmId),
    enabled: !!farmId,
  });

  return { getFarmsMutation, getFarmByIdQuery };
}
