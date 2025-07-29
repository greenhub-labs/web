'use client';

import { PageTemplate } from '@/contexts/shared/presentation/components/templates/page-template';
import { Button } from '@/contexts/shared/presentation/components/ui/button';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { CreateCropDialog } from '../../organisms/create-crop-dialog/create-crop-dialog';

// New reusable components
import type { Crop } from '../../molecules/crop-card/crop-card';
import {
  CropFilterGroup,
  type CropFilterType,
} from '../../molecules/crop-filter-group/crop-filter-group';
import { CropList } from '../../organisms/crop-list/crop-list';

export const CropsPageComponent = () => {
  const t = useTranslations();
  const [filterBy, setFilterBy] = useState<CropFilterType>('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const handleCreateCrop = async (cropData: any) => {
    // TODO: Implement crop creation logic
    console.log('Creating crop:', cropData);
    // Here you would typically call an API to create the crop
  };

  // Mock data for crops
  const crops: Crop[] = [
    {
      id: 'crop-1',
      name: 'Tomates Cherry',
      variety: 'Sweet 100',
      icon: '🍅',
      plotId: 'plot-a',
      plotName: 'Bancal A',
      plantedDate: '2024-01-15',
      harvestDate: '2024-04-15',
      status: 'flowering',
      growth: 75,
      expectedYield: '2.5kg',
      currentYield: '0.8kg',
      daysToHarvest: 12,
      healthScore: 92,
      irrigationNeeds: 'medium',
      pests: [],
      diseases: [],
      temperature: 24,
      humidity: 68,
    },
    {
      id: 'crop-2',
      name: 'Albahaca',
      variety: 'Genovese',
      icon: '🌿',
      plotId: 'plot-a',
      plotName: 'Bancal A',
      plantedDate: '2024-01-20',
      harvestDate: '2024-03-30',
      status: 'ready',
      growth: 100,
      expectedYield: '0.8kg',
      currentYield: '0.8kg',
      daysToHarvest: 0,
      healthScore: 88,
      irrigationNeeds: 'low',
      pests: [],
      diseases: [],
      temperature: 22,
      humidity: 65,
    },
    {
      id: 'crop-3',
      name: 'Lechugas',
      variety: 'Batavia',
      icon: '🥬',
      plotId: 'plot-b',
      plotName: 'Bancal B',
      plantedDate: '2024-02-01',
      harvestDate: '2024-04-01',
      status: 'growing',
      growth: 60,
      expectedYield: '1.2kg',
      currentYield: '0.3kg',
      daysToHarvest: 25,
      healthScore: 85,
      irrigationNeeds: 'high',
      pests: ['aphids'],
      diseases: [],
      temperature: 18,
      humidity: 72,
    },
    {
      id: 'crop-4',
      name: 'Zanahorias',
      variety: 'Nantes',
      icon: '🥕',
      plotId: 'plot-c',
      plotName: 'Bancal C',
      plantedDate: '2024-01-10',
      harvestDate: '2024-05-10',
      status: 'growing',
      growth: 45,
      expectedYield: '3.0kg',
      currentYield: '0kg',
      daysToHarvest: 45,
      healthScore: 90,
      irrigationNeeds: 'medium',
      pests: [],
      diseases: [],
      temperature: 20,
      humidity: 70,
    },
    {
      id: 'crop-5',
      name: 'Espinacas',
      variety: 'Baby Leaf',
      icon: '🥬',
      plotId: 'plot-b',
      plotName: 'Bancal B',
      plantedDate: '2024-02-15',
      harvestDate: '2024-04-15',
      status: 'seedling',
      growth: 25,
      expectedYield: '1.5kg',
      currentYield: '0kg',
      daysToHarvest: 35,
      healthScore: 95,
      irrigationNeeds: 'medium',
      pests: [],
      diseases: [],
      temperature: 16,
      humidity: 68,
    },
  ];

  // Breadcrumb configuration
  const breadcrumbItems = [
    {
      label: t('navigation.garden.title'),
      href: '/garden',
    },
  ];

  const handleViewCropDetails = (cropId: string) => {
    console.log('View details for', cropId);
  };

  const handleEditCrop = (cropId: string) => {
    console.log('Edit crop', cropId);
  };

  return (
    <PageTemplate
      pageTitle={t('navigation.garden.crops')}
      breadcrumbItems={breadcrumbItems}
      headerActions={
        <div className="flex items-center gap-2">
          {/* Desktop: All controls */}
          <div className="hidden md:flex items-center gap-3">
            <CropFilterGroup
              activeFilter={filterBy}
              onFilterChange={setFilterBy}
            />
            <Button
              className="px-3 py-2 text-sm"
              onClick={() => setIsCreateDialogOpen(true)}
            >
              ➕ {t('pages.garden.crops.plantNew')}
            </Button>
          </div>

          {/* Mobile: View Toggle + Add */}
          <div className="md:hidden flex items-center gap-2">
            <Button
              className="h-8 w-8 p-0"
              onClick={() => setIsCreateDialogOpen(true)}
            >
              ➕
            </Button>
          </div>
        </div>
      }
    >
      <CropList
        crops={crops}
        activeFilter={filterBy}
        onFilterChange={setFilterBy}
        onCreateCrop={() => setIsCreateDialogOpen(true)}
        onViewCropDetails={handleViewCropDetails}
        onEditCrop={handleEditCrop}
      />

      {/* Create Crop Dialog */}
      <CreateCropDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onCreateCrop={handleCreateCrop}
      />
    </PageTemplate>
  );
};
