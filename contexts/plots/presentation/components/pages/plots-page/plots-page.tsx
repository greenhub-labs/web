import { useFarmStore } from '@/contexts/farms/presentation/stores/farm-store';
import { Plot } from '@/contexts/plots/domain/entities/plot.entity';
import { PlotCard } from '@/contexts/plots/presentation/components/molecules/plot-card/plot-card';
import { CreatePlotDialog } from '@/contexts/plots/presentation/components/organisms/create-plot-dialog/create-plot-dialog';
import { PageTemplate } from '@/contexts/shared/presentation/components/templates/page-template';
import { Button } from '@/contexts/shared/presentation/components/ui/button';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { usePlot } from '../../../hooks/use-plot';

interface PlotsPageComponentProps {
  plots: Plot[];
  isLoading: boolean;
}

const PlotsPageComponent = ({ plots, isLoading }: PlotsPageComponentProps) => {
  const t = useTranslations();
  const router = useRouter();
  const tNavigation = useTranslations('navigation');

  const { currentFarm } = useFarmStore();

  const { createPlotMutation } = usePlot();

  const breadcrumbItems = [
    { label: tNavigation('garden.title'), href: '/garden' },
  ];

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const handleViewDetails = (plotId: string) => {
    router.push(`/garden/plots/${plotId}`);
  };

  const handleDelete = (plotId: string) => {
    console.log('Delete plot', plotId);
  };

  const handleCreatePlot = async (plotData: any) => {
    try {
      console.log('Creating plot:', plotData);
      createPlotMutation.mutate(plotData);
    } catch (error) {
      console.error('Error creating plot:', error);
    }
  };

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
              onClick={() => setIsCreateDialogOpen(true)}
            >
              ➕ {t('pages.garden.plots.createPlot')}
            </Button>
          </div>

          {/* Mobile: Solo View Toggle + Add */}
          <div className="md:hidden flex items-center gap-2">
            <Button
              className="h-8 w-8 p-0"
              onClick={() => setIsCreateDialogOpen(true)}
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
          {plots.map((plot) => (
            <PlotCard
              key={plot.id}
              plot={plot}
              onViewDetails={handleViewDetails}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>

      {/* Create Plot Dialog */}
      <CreatePlotDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onCreatePlot={handleCreatePlot}
        farmId={currentFarm?.id || ''}
      />
    </PageTemplate>
  );
};

export default PlotsPageComponent;
