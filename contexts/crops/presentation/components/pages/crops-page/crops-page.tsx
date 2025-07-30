'use client';

import { PageTemplate } from '@/contexts/shared/presentation/components/templates/page-template';
import { Button } from '@/contexts/shared/presentation/components/ui/button';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { CreateCropDialog } from '../../organisms/create-crop-dialog/create-crop-dialog';

// New reusable components
import { Crop } from '@/contexts/crops/domain/entities/crop.entity';
import {
  CropFilterGroup,
  type CropFilterType,
} from '../../molecules/crop-filter-group/crop-filter-group';
import { CropList } from '../../organisms/crop-list/crop-list';

interface CropsPageComponentProps {
  crops: Crop[] | undefined;
}

export const CropsPageComponent = ({ crops }: CropsPageComponentProps) => {
  const t = useTranslations();
  const [filterBy, setFilterBy] = useState<CropFilterType>('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const handleCreateCrop = async (cropData: any) => {
    // TODO: Implement crop creation logic
    console.log('Creating crop:', cropData);
    // Here you would typically call an API to create the crop
  };

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
        crops={crops || []}
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
