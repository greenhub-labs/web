import { Button } from '@/contexts/shared/presentation/components/ui/button';
import {
  Card,
  CardContent,
} from '@/contexts/shared/presentation/components/ui/card';
import { cn } from '@/contexts/shared/presentation/lib/utils';
import { useTranslations } from 'next-intl';
import { CropCard, type Crop } from '../../molecules/crop-card/crop-card';
import {
  CropFilterGroup,
  type CropFilterType,
} from '../../molecules/crop-filter-group/crop-filter-group';

export interface CropListProps {
  crops: Crop[];
  activeFilter: CropFilterType;
  onFilterChange: (filter: CropFilterType) => void;
  onCreateCrop: () => void;
  onViewCropDetails: (cropId: string) => void;
  onEditCrop: (cropId: string) => void;
  className?: string;
}

export const CropList: React.FC<CropListProps> = ({
  crops,
  activeFilter,
  onFilterChange,
  onCreateCrop,
  onViewCropDetails,
  onEditCrop,
  className,
}) => {
  const t = useTranslations();

  // Filter crops based on selected filter
  const filteredCrops = crops.filter((crop) => {
    if (activeFilter === 'active') return crop.status !== 'ready';
    if (activeFilter === 'ready') return crop.status === 'ready';
    return true;
  });

  const getCropActions = (cropId: string) => [
    {
      label: t('pages.garden.crops.viewDetails'),
      icon: '👁️',
      onClick: () => onViewCropDetails(cropId),
      variant: 'outline' as const,
      isPrimary: true,
    },
    {
      label: t('common.edit'),
      icon: '⚙️',
      onClick: () => onEditCrop(cropId),
      variant: 'outline' as const,
    },
  ];

  return (
    <div className={cn('space-y-3 md:space-y-6', className)}>
      {/* Mobile Filters */}
      <div className="md:hidden">
        <Card>
          <CardContent className="p-3">
            <div className="space-y-2">
              <span className="text-sm font-medium text-muted-foreground">
                {t('pages.garden.crops.filterBy')}:
              </span>
              <div className="flex items-center gap-1">
                <CropFilterGroup
                  activeFilter={activeFilter}
                  onFilterChange={onFilterChange}
                  className="flex-1"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Crops Grid */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {filteredCrops.map((crop) => (
          <CropCard
            key={crop.id}
            crop={crop}
            actions={getCropActions(crop.id)}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredCrops.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No crops found</p>
          <Button onClick={onCreateCrop} className="mt-2">
            ➕ {t('pages.garden.crops.plantNew')}
          </Button>
        </div>
      )}
    </div>
  );
};
