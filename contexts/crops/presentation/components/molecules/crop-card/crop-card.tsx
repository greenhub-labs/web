import { CropResponseDto } from '@/contexts/crops/infrastructure/graphql/responses/crop.response.dto';
import { ProgressBar } from '@/contexts/shared/presentation/components/atoms';
import {
  AlertsSection,
  EntityCardActions,
  EntityCardHeader,
  type CardAction,
} from '@/contexts/shared/presentation/components/molecules';
import {
  Card,
  CardContent,
} from '@/contexts/shared/presentation/components/ui/card';
import { Separator } from '@/contexts/shared/presentation/components/ui/separator';
import { cn } from '@/contexts/shared/presentation/lib/utils';
import { useTranslations } from 'next-intl';
import { CropEnvironmentalData } from '../../atoms/crop-environmental-data/crop-environmental-data';
import { CropHarvestStatus } from '../../atoms/crop-harvest-status/crop-harvest-status';
import { CropYieldHealthSection } from '../../atoms/crop-yield-health-section/crop-yield-health-section';

export interface CropCardProps {
  crop: CropResponseDto;
  actions: CardAction[];
  className?: string;
}

export const CropCard: React.FC<CropCardProps> = ({
  crop,
  actions,
  className,
}) => {
  const t = useTranslations();

  // Calculate days to harvest based on expected harvest date
  const calculateDaysToHarvest = (): number => {
    const expectedDate = new Date(crop.expectedHarvest);
    const today = new Date();
    const diffTime = expectedDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  // Calculate growth percentage based on planting date and expected harvest
  const calculateGrowthPercentage = (): number => {
    const plantingDate = new Date(crop.plantingDate);
    const expectedDate = new Date(crop.expectedHarvest);
    const today = new Date();

    const totalDays =
      (expectedDate.getTime() - plantingDate.getTime()) / (1000 * 60 * 60 * 24);
    const elapsedDays =
      (today.getTime() - plantingDate.getTime()) / (1000 * 60 * 60 * 24);

    const percentage = Math.min(
      100,
      Math.max(0, (elapsedDays / totalDays) * 100),
    );
    return Math.round(percentage);
  };

  // Get crop icon based on variety
  const getCropIcon = (): string => {
    const variety = crop.varietyId.toLowerCase();
    if (variety.includes('tomato')) return '🍅';
    if (variety.includes('lettuce')) return '🥬';
    if (variety.includes('carrot')) return '🥕';
    if (variety.includes('pepper')) return '🌶️';
    if (variety.includes('herb')) return '🌿';
    if (variety.includes('bean')) return '🫘';
    return '🌱';
  };

  // Calculate health score based on status and dates
  const calculateHealthScore = (): number => {
    const daysToHarvest = calculateDaysToHarvest();
    const growthPercentage = calculateGrowthPercentage();

    // Base health on growth progress and time remaining
    let health = 85; // Base health

    if (growthPercentage > 80) health += 10;
    if (daysToHarvest < 7) health += 5;
    if (crop.status === 'GROWING') health += 5;

    return Math.min(100, Math.max(0, health));
  };

  const daysToHarvest = calculateDaysToHarvest();
  const growthPercentage = calculateGrowthPercentage();
  const healthScore = calculateHealthScore();
  const cropIcon = getCropIcon();

  return (
    <Card className={cn('hover:shadow-md transition-shadow', className)}>
      <EntityCardHeader
        icon={cropIcon}
        title={crop.cropVariety.name}
        subtitle={crop.cropVariety.scientificName}
        status={crop.status}
        statusType="crop"
        statusLabel={t(
          `pages.garden.crops.status.${crop.status.toLowerCase()}`,
        )}
      />

      <CardContent className="space-y-3 sm:space-y-4">
        {/* Growth Progress */}
        <ProgressBar
          label={t('pages.garden.crops.growth')}
          value={growthPercentage}
          maxValue={100}
          unit="%"
        />

        {/* Yield & Health */}
        <Separator />
        <CropYieldHealthSection
          currentYield={`${crop.actualHarvest || 0}kg`}
          expectedYield={`${crop.quantity}kg`}
          healthScore={healthScore}
        />

        {/* Harvest Status */}
        <CropHarvestStatus daysToHarvest={daysToHarvest} />

        {/* Environmental Data */}
        <Separator />
        <CropEnvironmentalData
          temperature={24} // TODO: Get from sensors
          humidity={68} // TODO: Get from sensors
          irrigationNeeds={crop.cropVariety.waterRequirements} // TODO: Calculate based on crop needs
        />

        {/* Alerts */}
        <Separator />
        <AlertsSection alerts={[]} />

        {/* Actions */}
        <EntityCardActions actions={actions} />
      </CardContent>
    </Card>
  );
};
