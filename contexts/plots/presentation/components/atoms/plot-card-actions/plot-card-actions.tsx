import { DeleteConfirmationDialog } from '@/contexts/shared/presentation/components/molecules/delete-confirmation-dialog/delete-confirmation-dialog';
import { Button } from '@/contexts/shared/presentation/components/ui/button';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';

export interface PlotCardActionsProps {
  plotId: string;
  plotName?: string;
  onViewDetails: (plotId: string) => void;
  onDelete: (plotId: string) => void;
  className?: string;
}

export const PlotCardActions: React.FC<PlotCardActionsProps> = ({
  plotId,
  plotName,
  onViewDetails,
  onDelete,
  className,
}) => {
  const t = useTranslations();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleDeleteClick = () => {
    setIsDeleteDialogOpen(true);
  };

  const handleViewDetailsClick = () => {
    onViewDetails(plotId);
  };

  const handleConfirmDelete = () => {
    onDelete(plotId);
  };

  return (
    <>
      <div className={`flex gap-1 pt-2 relative z-20 ${className}`}>
        <Button
          variant="outline"
          size="sm"
          className="text-xs h-8 flex-1"
          onClick={handleViewDetailsClick}
        >
          👁️ {t('pages.garden.plots.viewDetails')}
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="text-xs h-8 w-8 p-0"
          onClick={handleDeleteClick}
        >
          🗑️
        </Button>
      </div>

      <DeleteConfirmationDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleConfirmDelete}
        title={t('pages.garden.plots.deleteConfirmation.title')}
        description={t('pages.garden.plots.deleteConfirmation.description', {
          plotName: plotName || t('common.plot'),
        })}
      />
    </>
  );
};

export default PlotCardActions;
