import { cn } from '@/contexts/shared/presentation/lib/utils';
import { useTranslations } from 'next-intl';

export interface CropHarvestStatusProps {
  daysToHarvest: number;
  className?: string;
}

export const CropHarvestStatus: React.FC<CropHarvestStatusProps> = ({
  daysToHarvest,
  className,
}) => {
  const t = useTranslations();

  return (
    <div className={cn('bg-accent/50 p-2 rounded-lg', className)}>
      <div className="flex items-center gap-2">
        <span className="text-sm">📅</span>
        <span className="text-xs sm:text-sm font-medium">
          {daysToHarvest > 0 ? (
            <>
              {daysToHarvest} {t('pages.garden.crops.daysToHarvest')}
            </>
          ) : (
            <>✅ {t('pages.garden.crops.readyToHarvest')}</>
          )}
        </span>
      </div>
    </div>
  );
};
