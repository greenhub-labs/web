import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FarmsApiRepository } from '../../infrastructure/api/farm-api.repository';
import { Farm } from '../../domain/entities/farm.entity';

const farmsApiRepository = new FarmsApiRepository();

export function useFarm() {
  const queryClient = useQueryClient();

  const getFarmsMutation = useMutation({
    mutationFn: () => farmsApiRepository.getFarms(),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['farms'] });
      return data;
    },
  });
  return { getFarmsMutation };
}
