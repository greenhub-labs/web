import { cn } from '@/contexts/shared/presentation/lib/utils';
import { useTranslations } from 'next-intl';

export interface CropEnvironmentalDataProps {
  temperature: number;
  humidity: number;
  irrigationNeeds: string;
  className?: string;
}

export const CropEnvironmentalData: React.FC<CropEnvironmentalDataProps> = ({
  temperature,
  humidity,
  irrigationNeeds,
  className,
}) => {
  const t = useTranslations();

  const getIrrigationColor = (needs: string) => {
    switch (needs) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-orange-600';
      case 'low':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className={cn('grid grid-cols-3 gap-2 text-xs', className)}>
      <div className="flex items-center gap-1">
        <span>🌡️</span>
        <span>{temperature}°C</span>
      </div>
      <div className="flex items-center gap-1">
        <span>💧</span>
        <span>{humidity}%</span>
      </div>
      <div className="flex items-center gap-1">
        <span>💦</span>
        <span className={getIrrigationColor(irrigationNeeds)}>
          {t(`pages.garden.crops.irrigation.${irrigationNeeds}`)}
        </span>
      </div>
    </div>
  );
};
