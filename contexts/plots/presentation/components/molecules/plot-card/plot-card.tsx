import { Plot } from '@/contexts/plots/domain/entities/plot.entity';
import { PlotCardActions } from '@/contexts/plots/presentation/components/atoms/plot-card-actions/plot-card-actions';
import { PlotCardHeader } from '@/contexts/plots/presentation/components/atoms/plot-card-header/plot-card-header';
import { PlotSizeIndicator } from '@/contexts/plots/presentation/components/atoms/plot-size-indicator/plot-size-indicator';
import { ClickableCard } from '@/contexts/shared/presentation/components/molecules/clickable-card/clickable-card';
import { CardContent } from '@/contexts/shared/presentation/components/ui/card';
import { Separator } from '@/contexts/shared/presentation/components/ui/separator';
import { useTranslations } from 'next-intl';
import React from 'react';
import {
  ActiveCropsSection,
  Crop,
} from '../active-crops-section/active-crops-section';

export interface PlotCardProps {
  plot: Plot;
  crops?: Crop[];
  onViewDetails: (plotId: string) => void;
  onDelete: (plotId: string) => void;
  className?: string;
}

export const PlotCard: React.FC<PlotCardProps> = ({
  plot,
  crops = [],
  onViewDetails,
  onDelete,
  className,
}) => {
  const t = useTranslations();

  return (
    <ClickableCard
      href={`/garden/plots/${plot.id}`}
      className={className}
      srText={t('pages.garden.plots.viewDetails')}
    >
      {/* Header */}
      <PlotCardHeader
        name={plot.name}
        description={plot.description}
        status={plot.status}
      />

      <CardContent className="space-y-3 sm:space-y-4">
        {/* Size */}
        <PlotSizeIndicator dimensions={plot.dimensions} />

        {/* Active Crops Section */}
        <Separator />
        <ActiveCropsSection crops={crops} />

        {/* Actions */}
        <PlotCardActions
          plotId={plot.id}
          plotName={plot.name}
          onViewDetails={onViewDetails}
          onDelete={onDelete}
        />
      </CardContent>
    </ClickableCard>
  );
};

export default PlotCard;
