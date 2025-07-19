import { Plot } from '@/contexts/plots/domain/entities/plot.entity';
import { PlotCardActions } from '@/contexts/plots/presentation/components/atoms/plot-card-actions/plot-card-actions';
import { PlotCardHeader } from '@/contexts/plots/presentation/components/atoms/plot-card-header/plot-card-header';
import { PlotSizeIndicator } from '@/contexts/plots/presentation/components/atoms/plot-size-indicator/plot-size-indicator';
import {
  Card,
  CardContent,
} from '@/contexts/shared/presentation/components/ui/card';
import { Separator } from '@/contexts/shared/presentation/components/ui/separator';
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
  return (
    <Card className={`hover:shadow-md transition-shadow ${className}`}>
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
          onViewDetails={onViewDetails}
          onDelete={onDelete}
        />
      </CardContent>
    </Card>
  );
};

export default PlotCard;
