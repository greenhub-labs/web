import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CropVariety } from '../../domain/entities/crops-variety.entity';
import { CropsVarietyApiRepository } from '../../infrastructure/api/crop-variety-api.repository';

const cropsVarietyApiRepository = new CropsVarietyApiRepository();

export function useCropVariety(cropVarietyId?: string) {
  const queryClient = useQueryClient();

  const getCropVarietyByIdQuery = useQuery({
    queryKey: ['crop-variety', cropVarietyId],
    queryFn: () =>
      cropsVarietyApiRepository.getCropVarietyById(cropVarietyId || ''),
    enabled: !!cropVarietyId,
  });

  const updateCropVarietyMutation = useMutation({
    mutationFn: (cropVariety: CropVariety) =>
      cropsVarietyApiRepository.updateCropVariety(cropVariety),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['crop-variety', data.id] });
      return data;
    },
  });

  const deleteCropVarietyMutation = useMutation({
    mutationFn: (cropVarietyId: string) =>
      cropsVarietyApiRepository.deleteCropVariety(cropVarietyId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['crop-variety', cropVarietyId],
      });
    },
  });

  return {
    getCropVarietyByIdQuery,
    updateCropVarietyMutation,
    deleteCropVarietyMutation,
  };
}
