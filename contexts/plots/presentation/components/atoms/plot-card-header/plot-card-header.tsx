import { PlotStatusBadge } from '@/contexts/plots/presentation/components/atoms/plot-status-badge/plot-status-badge';
import {
  CardHeader,
  CardTitle,
} from '@/contexts/shared/presentation/components/ui/card';
import React from 'react';

export interface PlotCardHeaderProps {
  name: string;
  description: string;
  status: string;
  className?: string;
}

export const PlotCardHeader: React.FC<PlotCardHeaderProps> = ({
  name,
  description,
  status,
  className,
}) => {
  return (
    <CardHeader className={`pb-3 ${className}`}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <span className="text-xl flex-shrink-0">🌱</span>
          <div className="min-w-0 flex-1">
            <CardTitle className="text-base truncate">{name}</CardTitle>
            <p className="text-xs text-muted-foreground truncate">
              {description}
            </p>
          </div>
        </div>
        <PlotStatusBadge status={status} />
      </div>
    </CardHeader>
  );
};

export default PlotCardHeader;
