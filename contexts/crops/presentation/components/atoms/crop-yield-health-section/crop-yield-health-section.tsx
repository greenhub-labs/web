import { cn } from '@/contexts/shared/presentation/lib/utils';
import { useTranslations } from 'next-intl';

export interface CropYieldHealthSectionProps {
  currentYield: string;
  expectedYield: string;
  healthScore: number;
  className?: string;
}

export const CropYieldHealthSection: React.FC<CropYieldHealthSectionProps> = ({
  currentYield,
  expectedYield,
  healthScore,
  className,
}) => {
  const t = useTranslations();

  return (
    <div className={cn('grid grid-cols-2 gap-3 text-xs sm:text-sm', className)}>
      <div>
        <p className="text-muted-foreground mb-1">
          {t('pages.garden.crops.yield')}
        </p>
        <p className="font-medium">
          {currentYield}/{expectedYield}
        </p>
      </div>
      <div>
        <p className="text-muted-foreground mb-1">
          {t('pages.garden.crops.health')}
        </p>
        <p className="font-medium">{healthScore}%</p>
      </div>
    </div>
  );
};
