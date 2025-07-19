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

  // Mock data for plots
  const plots = [
    {
      id: 'plot-a',
      name: 'Bancal A',
      nodeId: 'node-a',
      size: '4x3m',
      status: 'optimal',
      crops: [
        {
          name: 'Tomates',
          plantedDate: '2024-01-15',
          harvestDate: '2024-04-15',
          icon: '🍅',
        },
        {
          name: 'Albahaca',
          plantedDate: '2024-01-20',
          harvestDate: '2024-03-30',
          icon: '🌿',
        },
      ],
      soilMoisture: 68,
      temperature: 24,
      batteryLevel: 85,
      powerGeneration: 240,
      irrigationStatus: 'scheduled',
      nextIrrigation: '2 horas',
    },
    {
      id: 'plot-b',
      name: 'Bancal B',
      nodeId: 'node-b',
      size: '3x4m',
      status: 'warning',
      crops: [
        {
          name: 'Maíz',
          plantedDate: '2024-02-01',
          harvestDate: '2024-05-15',
          icon: '🌽',
        },
        {
          name: 'Lechugas',
          plantedDate: '2024-02-10',
          harvestDate: '2024-03-25',
          icon: '🥬',
        },
        {
          name: 'Zanahorias',
          plantedDate: '2024-01-25',
          harvestDate: '2024-04-25',
          icon: '🥕',
        },
      ],
      soilMoisture: 45,
      temperature: 26,
      batteryLevel: 62,
      powerGeneration: 180,
      irrigationStatus: 'needed',
      nextIrrigation: 'Inmediato',
    },
    {
      id: 'plot-c',
      name: 'Bancal C',
      nodeId: 'node-d',
      size: '5x2m',
      status: 'optimal',
      crops: [
        {
          name: 'Espinacas',
          plantedDate: '2024-01-20',
          harvestDate: '2024-03-20',
          icon: '🥬',
        },
        {
          name: 'Rábanos',
          plantedDate: '2024-02-05',
          harvestDate: '2024-03-10',
          icon: '🔴',
        },
      ],
      soilMoisture: 72,
      temperature: 23,
      batteryLevel: 91,
      powerGeneration: 265,
      irrigationStatus: 'optimal',
      nextIrrigation: '6 horas',
    },
    {
      id: 'plot-d',
      name: 'Bancal D',
      nodeId: 'node-e',
      size: '4x4m',
      status: 'available',
      crops: [],
      soilMoisture: 55,
      temperature: 22,
      batteryLevel: 78,
      powerGeneration: 195,
      irrigationStatus: 'disabled',
      nextIrrigation: null,
    },
  ];

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
