'use client';

import { useFarmStore } from '@/contexts/farms/presentation/stores/farm-store';
import PlotsPageComponent from '@/contexts/plots/presentation/components/pages/plots-page/plots-page';
import { usePlotsByFarm } from '@/contexts/plots/presentation/hooks/use-plots-by-farm';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const PlotsPage = () => {
  const router = useRouter();
  const { currentFarm } = useFarmStore();
  const { getPlotsByFarmIdQuery, createPlotMutation, deletePlotMutation } =
    usePlotsByFarm(currentFarm?.id);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const handleViewDetails = (plotId: string) => {
    router.push(`/garden/plots/${plotId}`);
  };

  const handleDelete = (plotId: string) => {
    deletePlotMutation.mutate(plotId);
  };

  const handleCreatePlot = async (plotData: any) => {
    try {
      createPlotMutation.mutate(plotData);
      setIsCreateDialogOpen(false);
    } catch (error) {
      console.error('Error creating plot:', error);
    }
  };

  return (
    <PlotsPageComponent
      plots={getPlotsByFarmIdQuery.data}
      isLoading={getPlotsByFarmIdQuery.isLoading}
      currentFarm={currentFarm}
      isCreateDialogOpen={isCreateDialogOpen}
      onOpenCreateDialog={setIsCreateDialogOpen}
      onViewDetails={handleViewDetails}
      onDelete={handleDelete}
      onCreatePlot={handleCreatePlot}
    />
  );
};

export default PlotsPage;
