import { Farm } from '@/contexts/farms/domain/entities/farm.entity';
import { Plot } from '@/contexts/plots/domain/entities/plot.entity';
import { PlotCard } from '@/contexts/plots/presentation/components/molecules/plot-card/plot-card';
import { CreatePlotDialog } from '@/contexts/plots/presentation/components/organisms/create-plot-dialog/create-plot-dialog';
import { PageTemplate } from '@/contexts/shared/presentation/components/templates/page-template';
import { Button } from '@/contexts/shared/presentation/components/ui/button';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { PlotsPageSkeleton } from './plots-page-skeleton';

interface PlotsPageComponentProps {
  plots?: Plot[];
  isLoading: boolean;
  currentFarm: Farm | null;
  isCreateDialogOpen: boolean;
  onOpenCreateDialog: (open: boolean) => void;
  onViewDetails: (plotId: string) => void;
  onDelete: (plotId: string) => void;
  onCreatePlot: (plotData: any) => void;
}

const PlotsPageComponent = ({
  plots,
  isLoading,
  currentFarm,
  isCreateDialogOpen,
  onOpenCreateDialog,
  onViewDetails,
  onDelete,
  onCreatePlot,
}: PlotsPageComponentProps) => {
  const t = useTranslations();
  const tNavigation = useTranslations('navigation');

  const breadcrumbItems = [
    { label: tNavigation('garden.title'), href: '/garden' },
  ];

  // Show skeleton if no current farm is selected or if loading
  if (!currentFarm || isLoading) {
    return <PlotsPageSkeleton />;
  }

  return (
    <PageTemplate
      pageTitle={tNavigation('garden.plots')}
      breadcrumbItems={breadcrumbItems}
      headerActions={
        <div className="flex items-center gap-2">
          {/* Desktop: Todos los controles */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              className="px-3 py-2 text-sm"
              onClick={() => onOpenCreateDialog(true)}
            >
              ➕ {t('pages.garden.plots.createPlot')}
            </Button>
          </div>

          {/* Mobile: Solo View Toggle + Add */}
          <div className="md:hidden flex items-center gap-2">
            <Button
              className="h-8 w-8 p-0"
              onClick={() => onOpenCreateDialog(true)}
            >
              ➕
            </Button>
          </div>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Plots Grid/List */}
        <div
          className={`grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3`}
        >
          {plots?.map((plot) => (
            <Link href={`/garden/plots/${plot.id}`} key={plot.id}>
              <PlotCard
                key={plot.id}
                plot={plot}
                onViewDetails={onViewDetails}
                onDelete={onDelete}
              />
            </Link>
          ))}
        </div>
      </div>

      {/* Create Plot Dialog */}
      <CreatePlotDialog
        open={isCreateDialogOpen}
        onOpenChange={onOpenCreateDialog}
        onCreatePlot={onCreatePlot}
        farmId={currentFarm?.id || ''}
      />
    </PageTemplate>
  );
};

export default PlotsPageComponent;
