import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Crop } from '../../domain/entities/crop.entity';
import { CropsApiRepository } from '../../infrastructure/api/crop-api.repository';

const cropsApiRepository = new CropsApiRepository();

export function useCrop(cropId?: string) {
  const queryClient = useQueryClient();

  const getCropByIdQuery = useQuery({
    queryKey: ['crop', cropId],
    queryFn: () => cropsApiRepository.getCropById(cropId || ''),
    enabled: !!cropId,
  });

  const updateCropMutation = useMutation({
    mutationFn: (crop: Crop) => cropsApiRepository.updateCrop(crop),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['crop', data.id] });
      return data;
    },
  });

  const deleteCropMutation = useMutation({
    mutationFn: (cropId: string) => cropsApiRepository.deleteCrop(cropId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['crop', cropId] });
    },
  });

  return {
    getCropByIdQuery,
    updateCropMutation,
    deleteCropMutation,
  };
}
