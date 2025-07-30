'use client';

import { CropsPageComponent } from '@/contexts/crops/presentation/components/pages/crops-page/crops-page';
import { useCropsByFarm } from '@/contexts/crops/presentation/hooks/use-crops-by-farm';
import { useFarmStore } from '@/contexts/farms/presentation/stores/farm-store';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CropsPage() {
  const router = useRouter();
  const { currentFarm } = useFarmStore();
  const { getCropsByFarmIdQuery } = useCropsByFarm(currentFarm?.id);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const handleViewDetails = (cropId: string) => {
    router.push(`/garden/crops/${cropId}`);
  };

  const handleDelete = (cropId: string) => {};

  const handleCreateCrop = async (cropData: any) => {
    try {
      setIsCreateDialogOpen(false);
    } catch (error) {
      console.error('Error creating plot:', error);
    }
  };

  if (getCropsByFarmIdQuery.isLoading) {
    return <div>Loading...</div>;
  }

  return <CropsPageComponent crops={getCropsByFarmIdQuery.data} />;
}
