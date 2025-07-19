import { useFarmStore } from '@/contexts/farms/presentation/stores/farm-store';
import { Plot } from '@/contexts/plots/domain/entities/plot.entity';
import { PlotCard } from '@/contexts/plots/presentation/components/molecules/plot-card/plot-card';
import { usePlotsByFarm } from '@/contexts/plots/presentation/hooks/use-plots-by-farm';
import { CreatePlotDialog } from '@/contexts/shared/presentation/components/organisms/CreatePlotDialog';
import { PageTemplate } from '@/contexts/shared/presentation/components/templates/page-template';
import { Button } from '@/contexts/shared/presentation/components/ui/button';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

interface PlotsPageComponentProps {
  plots: Plot[];
  isLoading: boolean;
}

const PlotsPageComponent = ({ plots, isLoading }: PlotsPageComponentProps) => {
  const t = useTranslations();

  const { currentFarm } = useFarmStore();
  const { getPlotsByFarmIdQuery } = usePlotsByFarm(currentFarm?.id || '');

  const tNavigation = useTranslations('navigation');

  const breadcrumbItems = [
    { label: tNavigation('garden.title'), href: '/garden' },
  ];

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const handleViewDetails = (plotId: string) => {
    console.log('View details for', plotId);
  };

  const handleDelete = (plotId: string) => {
    console.log('Delete plot', plotId);
  };

  return (
    <PageTemplate
      pageTitle={t('pages.garden.plots.title')}
      breadcrumbItems={breadcrumbItems}
      headerActions={
        <div className="flex items-center gap-2">
          {/* Desktop: Todos los controles */}
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-0.5 bg-background border rounded-md p-1">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="px-3 py-2 text-sm"
              >
                🔲 {t('pages.garden.plots.gridView')}
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="px-3 py-2 text-sm"
              >
                📋 {t('pages.garden.plots.listView')}
              </Button>
            </div>
            <Button
              className="px-3 py-2 text-sm"
              onClick={() => setIsCreateDialogOpen(true)}
            >
              ➕ {t('pages.garden.plots.createPlot')}
            </Button>
          </div>

          {/* Mobile: Solo View Toggle + Add */}
          <div className="md:hidden flex items-center gap-2">
            <div className="flex items-center gap-0.5 bg-background border rounded-md p-0.5">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="h-8 w-8 p-0"
              >
                🔲
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="h-8 w-8 p-0"
              >
                📋
              </Button>
            </div>
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
        onCreatePlot={() => {}}
      />
    </PageTemplate>
  );
};

export default PlotsPageComponent;
