import { Button } from '@/contexts/shared/presentation/components/ui/button';
import { useTranslations } from 'next-intl';
import React from 'react';

export interface PlotCardActionsProps {
  plotId: string;
  onViewDetails: (plotId: string) => void;
  onDelete: (plotId: string) => void;
  className?: string;
}

export const PlotCardActions: React.FC<PlotCardActionsProps> = ({
  plotId,
  onViewDetails,
  onDelete,
  className,
}) => {
  const t = useTranslations();

  return (
    <div className={`flex gap-1 pt-2 ${className}`}>
      <Button
        variant="outline"
        size="sm"
        className="text-xs h-8 flex-1"
        onClick={() => onViewDetails(plotId)}
      >
        👁️ {t('pages.garden.plots.viewDetails')}
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="text-xs h-8 w-8 p-0"
        onClick={() => onDelete(plotId)}
      >
        🗑️
      </Button>
    </div>
  );
};

export default PlotCardActions;
