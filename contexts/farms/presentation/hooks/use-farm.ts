import { CreateFarmDto } from '@/contexts/farms/domain/dto/create-farm.dto';
import { Farm } from '@/contexts/farms/domain/entities/farm.entity';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { FarmsApiRepository } from '../../infrastructure/api/farm-api.repository';

const farmsApiRepository = new FarmsApiRepository();

export function useFarm(farmId?: string) {
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
    queryFn: () => farmsApiRepository.getFarmById(farmId || ''),
    enabled: !!farmId,
  });

  const createFarmMutation = useMutation({
    mutationFn: (farm: CreateFarmDto) => farmsApiRepository.createFarm(farm),
    onSuccess: (data) => {
      queryClient.refetchQueries({ queryKey: ['farm', data.id] });
      queryClient.refetchQueries({ queryKey: ['me'] });
      return data;
    },
  });

  const updateFarmMutation = useMutation({
    mutationFn: (farm: Farm) => farmsApiRepository.updateFarm(farm),
    onSuccess: (data) => {
      queryClient.refetchQueries({ queryKey: ['farm', data.id] });
      queryClient.refetchQueries({ queryKey: ['me'] });
      return data;
    },
  });

  return {
    getFarmsMutation,
    getFarmByIdQuery,
    createFarmMutation,
    updateFarmMutation,
  };
}
