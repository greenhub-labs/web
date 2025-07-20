'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

// New reusable components
import { useFarmStore } from '@/contexts/farms/presentation/stores/farm-store';
import PlotsPageComponent from '@/contexts/plots/presentation/components/pages/plots-page/plots-page';
import { usePlotsByFarm } from '@/contexts/plots/presentation/hooks/use-plots-by-farm';

const PlotsPage = () => {
  const t = useTranslations();

  const { currentFarm } = useFarmStore();
  const { getPlotsByFarmIdQuery } = usePlotsByFarm(currentFarm?.id || '');

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const handleCreatePlot = async (plotData: any) => {
    // TODO: Implement plot creation logic
    console.log('Creating plot:', plotData);
    // Here you would typically call an API to create the plot
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'warning':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'available':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'optimal':
        return '✅';
      case 'warning':
        return '⚠️';
      case 'available':
        return '🆕';
      default:
        return '❓';
    }
  };

  const breadcrumbItems = [
    { label: t('navigation.home'), href: '/' },
    { label: t('navigation.garden.title'), href: '#' },
    { label: t('navigation.garden.plots'), href: '/garden/plots' },
  ];

  return (
    <PlotsPageComponent
      plots={getPlotsByFarmIdQuery.data || []}
      isLoading={getPlotsByFarmIdQuery.isLoading}
    />
  );
};

export default PlotsPage;
