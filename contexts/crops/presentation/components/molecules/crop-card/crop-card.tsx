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

export interface Crop {
  id: string;
  name: string;
  variety: string;
  icon: string;
  plotId: string;
  plotName: string;
  plantedDate: string;
  harvestDate: string;
  status: 'ready' | 'flowering' | 'growing' | 'seedling';
  growth: number;
  expectedYield: string;
  currentYield: string;
  daysToHarvest: number;
  healthScore: number;
  irrigationNeeds: 'high' | 'medium' | 'low';
  pests: string[];
  diseases: string[];
  temperature: number;
  humidity: number;
}

export interface CropCardProps {
  crop: Crop;
  actions: CardAction[];
  className?: string;
}

export const CropCard: React.FC<CropCardProps> = ({
  crop,
  actions,
  className,
}) => {
  const t = useTranslations();

  const alerts = [
    ...(crop.pests.length > 0
      ? [
          {
            type: 'warning' as const,
            icon: '🐛',
            message: t('pages.garden.crops.pestsDetected'),
          },
        ]
      : []),
    ...(crop.diseases.length > 0
      ? [
          {
            type: 'error' as const,
            icon: '🦠',
            message: t('pages.garden.crops.diseasesDetected'),
          },
        ]
      : []),
  ];

  return (
    <Card className={cn('hover:shadow-md transition-shadow', className)}>
      <EntityCardHeader
        icon={crop.icon}
        title={crop.name}
        subtitle={`${crop.variety} • ${crop.plotName}`}
        status={crop.status}
        statusType="crop"
        statusLabel={t(`pages.garden.crops.status.${crop.status}`)}
      />

      <CardContent className="space-y-3 sm:space-y-4">
        {/* Growth Progress */}
        <ProgressBar
          label={t('pages.garden.crops.growth')}
          value={crop.growth}
          maxValue={100}
          unit="%"
        />

        {/* Yield & Health */}
        <Separator />
        <CropYieldHealthSection
          currentYield={crop.currentYield}
          expectedYield={crop.expectedYield}
          healthScore={crop.healthScore}
        />

        {/* Harvest Status */}
        <CropHarvestStatus daysToHarvest={crop.daysToHarvest} />

        {/* Environmental Data */}
        <Separator />
        <CropEnvironmentalData
          temperature={crop.temperature}
          humidity={crop.humidity}
          irrigationNeeds={crop.irrigationNeeds}
        />

        {/* Alerts */}
        <Separator />
        <AlertsSection alerts={alerts} />

        {/* Actions */}
        <EntityCardActions actions={actions} />
      </CardContent>
    </Card>
  );
};
