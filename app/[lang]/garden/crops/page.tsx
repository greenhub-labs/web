import { CropsPageComponent } from '@/contexts/crops/presentation/components/pages/crops-page/crops-page';
import { useCropsByFarm } from '@/contexts/crops/presentation/hooks/use-crops-by-farm';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CropsPage() {
  const router = useRouter();
  const { getCropsByPlotIdQuery, createCropMutation, deleteCropMutation } =
    useCropsByFarm(farmId);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const handleViewDetails = (cropId: string) => {
    router.push(`/garden/crops/${cropId}`);
  };

  const handleDelete = (cropId: string) => {
    deleteCropMutation.mutate(cropId);
  };

  const handleCreateCrop = async (cropData: any) => {
    try {
      createCropMutation.mutate(cropData);
      setIsCreateDialogOpen(false);
    } catch (error) {
      console.error('Error creating plot:', error);
    }
  };
  return <CropsPageComponent />;
}
