import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CreateCropDto } from '../../domain/dto/create-crop.dto';
import { Crop } from '../../domain/entities/crop.entity';
import { CropsApiRepository } from '../../infrastructure/api/crop-api.repository';

const cropsApiRepository = new CropsApiRepository();

export function useCropsByPlot(plotId?: string | null) {
  const queryClient = useQueryClient();

  const getCropsByPlotIdQuery = useQuery({
    queryKey: ['crops', plotId],
    queryFn: () => cropsApiRepository.getCropsByPlotId(plotId || ''),
    enabled: !!plotId,
  });

  const createCropMutation = useMutation({
    mutationFn: (crop: CreateCropDto) => cropsApiRepository.createCrop(crop),
    onSuccess: (data) => {
      if (plotId) {
        queryClient.refetchQueries({ queryKey: ['crops', plotId] });
      }
      return data;
    },
  });

  const updateCropMutation = useMutation({
    mutationFn: (crop: Crop) => cropsApiRepository.updateCrop(crop),
    onSuccess: (data) => {
      if (plotId) {
        queryClient.refetchQueries({ queryKey: ['crops', plotId] });
      }
      return data;
    },
  });

  const deleteCropMutation = useMutation({
    mutationFn: (cropId: string) => cropsApiRepository.deleteCrop(cropId),
    onSuccess: (data) => {
      if (plotId) {
        queryClient.refetchQueries({ queryKey: ['crops', plotId] });
      }
      return data;
    },
  });

  return {
    getCropsByPlotIdQuery,
    createCropMutation,
    updateCropMutation,
    deleteCropMutation,
  };
}
