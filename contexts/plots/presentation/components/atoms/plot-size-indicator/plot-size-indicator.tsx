import { Plot } from '@/contexts/plots/domain/entities/plot.entity';
import { useTranslations } from 'next-intl';
import React from 'react';

export interface PlotSizeIndicatorProps {
  dimensions: Plot['dimensions'];
  className?: string;
}

export const PlotSizeIndicator: React.FC<PlotSizeIndicatorProps> = ({
  dimensions,
  className,
}) => {
  const t = useTranslations();

  const formatDimensions = (dimensions: Plot['dimensions']) => {
    return `${dimensions.width}x${dimensions.length}${dimensions.unitMeasurement}`;
  };

  return (
    <div
      className={`flex items-center justify-between text-xs sm:text-sm ${className}`}
    >
      <span className="text-muted-foreground">
        {t('pages.garden.plots.size')}
      </span>
      <span className="font-medium">{formatDimensions(dimensions)}</span>
    </div>
  );
};

export default PlotSizeIndicator;
