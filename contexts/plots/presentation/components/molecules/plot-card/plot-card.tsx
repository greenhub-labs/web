import { Plot } from '@/contexts/plots/domain/entities/plot.entity';
import { PlotStatusBadge } from '@/contexts/plots/presentation/components/atoms/plot-status-badge/plot-status-badge';
import { Button } from '@/contexts/shared/presentation/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/contexts/shared/presentation/components/ui/card';
import { Separator } from '@/contexts/shared/presentation/components/ui/separator';
import { useTranslations } from 'next-intl';
import React from 'react';
import { ActiveCropsSection } from '../active-crops-section/active-crops-section';

export interface PlotCardProps {
  plot: Plot;
  onViewDetails: (plotId: string) => void;
  onDelete: (plotId: string) => void;
  className?: string;
}

export const PlotCard: React.FC<PlotCardProps> = ({
  plot,
  onViewDetails,
  onDelete,
  className,
}) => {
  const t = useTranslations();

  const formatDimensions = (dimensions: Plot['dimensions']) => {
    return `${dimensions.width}x${dimensions.length}${dimensions.unitMeasurement}`;
  };

  return (
    <Card className={`hover:shadow-md transition-shadow ${className}`}>
      {/* Header */}
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <span className="text-xl flex-shrink-0">🌱</span>
            <div className="min-w-0 flex-1">
              <CardTitle className="text-base truncate">{plot.name}</CardTitle>
              <p className="text-xs text-muted-foreground truncate">
                {plot.description}
              </p>
            </div>
          </div>
          <PlotStatusBadge status={plot.status} />
        </div>
      </CardHeader>

      <CardContent className="space-y-3 sm:space-y-4">
        {/* Size */}
        <div className="flex items-center justify-between text-xs sm:text-sm">
          <span className="text-muted-foreground">
            {t('pages.garden.plots.size')}
          </span>
          <span className="font-medium">
            {formatDimensions(plot.dimensions)}
          </span>
        </div>

        {/* Active Crops Section */}
        <Separator />
        <ActiveCropsSection crops={[]} />

        {/* Actions */}
        <div className="flex gap-1 pt-2">
          <Button
            variant="outline"
            size="sm"
            className="text-xs h-8 flex-1"
            onClick={() => onViewDetails(plot.id)}
          >
            👁️ {t('pages.garden.plots.viewDetails')}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-xs h-8 w-8 p-0"
            onClick={() => onDelete(plot.id)}
          >
            🗑️
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlotCard;
