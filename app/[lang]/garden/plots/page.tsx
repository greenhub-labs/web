'use client';

import { CreatePlotDialog } from '@/contexts/shared/presentation/components/organisms/CreatePlotDialog';
import { PageTemplate } from '@/contexts/shared/presentation/components/templates/page-template';
import { Button } from '@/contexts/shared/presentation/components/ui/button';
import {
  Card,
  CardContent,
} from '@/contexts/shared/presentation/components/ui/card';
import { Separator } from '@/contexts/shared/presentation/components/ui/separator';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

// New reusable components
import { StatCard } from '@/contexts/shared/presentation/components/atoms';
import {
  EntityCardActions,
  EntityCardHeader,
  type CardAction,
} from '@/contexts/shared/presentation/components/molecules';

const PlotsPage = () => {
  const t = useTranslations();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const handleCreatePlot = async (plotData: any) => {
    // TODO: Implement plot creation logic
    console.log('Creating plot:', plotData);
    // Here you would typically call an API to create the plot
  };

  // Mock data for plots
  const plots = [
    {
      id: 'plot-a',
      name: 'Bancal A',
      nodeId: 'node-a',
      size: '4x3m',
      status: 'optimal',
      crops: [
        {
          name: 'Tomates',
          plantedDate: '2024-01-15',
          harvestDate: '2024-04-15',
          icon: '🍅',
        },
        {
          name: 'Albahaca',
          plantedDate: '2024-01-20',
          harvestDate: '2024-03-30',
          icon: '🌿',
        },
      ],
      soilMoisture: 68,
      temperature: 24,
      batteryLevel: 85,
      powerGeneration: 240,
      irrigationStatus: 'scheduled',
      nextIrrigation: '2 horas',
    },
    {
      id: 'plot-b',
      name: 'Bancal B',
      nodeId: 'node-b',
      size: '3x4m',
      status: 'warning',
      crops: [
        {
          name: 'Maíz',
          plantedDate: '2024-02-01',
          harvestDate: '2024-05-15',
          icon: '🌽',
        },
        {
          name: 'Lechugas',
          plantedDate: '2024-02-10',
          harvestDate: '2024-03-25',
          icon: '🥬',
        },
        {
          name: 'Zanahorias',
          plantedDate: '2024-01-25',
          harvestDate: '2024-04-25',
          icon: '🥕',
        },
      ],
      soilMoisture: 45,
      temperature: 26,
      batteryLevel: 62,
      powerGeneration: 180,
      irrigationStatus: 'needed',
      nextIrrigation: 'Inmediato',
    },
    {
      id: 'plot-c',
      name: 'Bancal C',
      nodeId: 'node-d',
      size: '5x2m',
      status: 'optimal',
      crops: [
        {
          name: 'Espinacas',
          plantedDate: '2024-01-20',
          harvestDate: '2024-03-20',
          icon: '🥬',
        },
        {
          name: 'Rábanos',
          plantedDate: '2024-02-05',
          harvestDate: '2024-03-10',
          icon: '🔴',
        },
      ],
      soilMoisture: 72,
      temperature: 23,
      batteryLevel: 91,
      powerGeneration: 265,
      irrigationStatus: 'optimal',
      nextIrrigation: '6 horas',
    },
    {
      id: 'plot-d',
      name: 'Bancal D',
      nodeId: 'node-e',
      size: '4x4m',
      status: 'available',
      crops: [],
      soilMoisture: 55,
      temperature: 22,
      batteryLevel: 78,
      powerGeneration: 195,
      irrigationStatus: 'disabled',
      nextIrrigation: null,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'warning':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'available':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'optimal':
        return '✅';
      case 'warning':
        return '⚠️';
      case 'available':
        return '🆕';
      default:
        return '❓';
    }
  };

  const breadcrumbItems = [
    { label: t('navigation.home'), href: '/' },
    { label: t('navigation.garden.title'), href: '#' },
    { label: t('navigation.garden.plots'), href: '/garden/plots' },
  ];

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
        {/* Summary Stats */}
        <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
          <StatCard
            title={t('pages.garden.plots.stats.totalPlots')}
            value="4"
            icon="🗺️"
          />

          <StatCard
            title={t('pages.garden.plots.stats.activeCrops')}
            value={plots.reduce((total, plot) => total + plot.crops.length, 0)}
            icon="🌱"
          />

          <StatCard
            title={t('pages.garden.plots.stats.avgMoisture')}
            value="62%"
            icon="💧"
          />

          <StatCard
            title={t('pages.garden.plots.stats.nodesOnline')}
            value="4/4"
            icon="📡"
          />
        </div>

        {/* Plots Grid/List */}
        <div
          className={
            viewMode === 'grid'
              ? 'grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
              : 'space-y-4'
          }
        >
          {plots.map((plot) => {
            const plotActions: CardAction[] = [
              {
                label: t('pages.garden.plots.viewDetails'),
                icon: '👁️',
                onClick: () => console.log('View details for', plot.id),
                variant: 'outline',
                isPrimary: true,
              },
              {
                label: t('common.edit'),
                icon: '⚙️',
                onClick: () => console.log('Settings for', plot.id),
                variant: 'outline',
              },
            ];

            return (
              <Card key={plot.id} className="hover:shadow-md transition-shadow">
                <EntityCardHeader
                  icon="🌱"
                  title={plot.name}
                  subtitle={`${t(
                    'pages.garden.plots.nodeId',
                  )}: ${plot.nodeId.toUpperCase()}`}
                  status={plot.status}
                  statusType="plot"
                  statusLabel={t(`pages.garden.plots.status.${plot.status}`)}
                />

                <CardContent className="space-y-3 sm:space-y-4">
                  {/* Plot Info */}
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-muted-foreground">
                      {t('pages.garden.plots.size')}
                    </span>
                    <span className="font-medium">{plot.size}</span>
                  </div>

                  {/* Crops Section - Fixed Height */}
                  <Separator />
                  <div className="space-y-2 sm:space-y-3">
                    <p className="text-xs sm:text-sm font-medium flex items-center gap-2">
                      🌾 {t('pages.garden.plots.activeCrops')} (
                      {plot.crops.length})
                    </p>
                    {plot.crops.length > 0 ? (
                      <div className="h-28 sm:h-32 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                        <div className="space-y-1.5 sm:space-y-2 pr-2">
                          {plot.crops.map((crop, index) => (
                            <div
                              key={index}
                              className="p-1.5 sm:p-2 bg-accent/30 rounded-lg"
                            >
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm">{crop.icon}</span>
                                <span className="font-medium text-xs sm:text-sm">
                                  {crop.name}
                                </span>
                              </div>
                              <div className="grid grid-cols-2 gap-1 sm:gap-2 text-xs text-muted-foreground">
                                <div>
                                  <p className="text-xs">
                                    {t('pages.garden.plots.planted')}
                                  </p>
                                  <p className="font-medium text-foreground text-xs">
                                    {crop.plantedDate}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-xs">
                                    {t('pages.garden.plots.harvest')}
                                  </p>
                                  <p className="font-medium text-foreground text-xs">
                                    {crop.harvestDate}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="h-28 sm:h-32 flex items-center justify-center text-muted-foreground">
                        <div className="text-center">
                          <span className="text-xl sm:text-2xl mb-2 block">
                            🌱
                          </span>
                          <p className="text-xs sm:text-sm">
                            {t('pages.garden.plots.noCrops')}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  <Separator />

                  {/* Node Sensors */}
                  <div className="space-y-2">
                    <p className="text-xs sm:text-sm font-medium">
                      {t('pages.garden.plots.nodeData')}
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="flex items-center gap-1">
                        <span>💧</span>
                        <span>{plot.soilMoisture}%</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span>🌡️</span>
                        <span>{plot.temperature}°C</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span>🔋</span>
                        <span>{plot.batteryLevel}%</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span>⚡</span>
                        <span>{plot.powerGeneration}W</span>
                      </div>
                    </div>
                  </div>

                  {/* Irrigation Status */}
                  {plot.irrigationStatus !== 'disabled' && (
                    <>
                      <Separator />
                      <div className="flex items-center justify-between text-xs sm:text-sm">
                        <span className="text-muted-foreground">
                          {t('pages.garden.plots.nextIrrigation')}
                        </span>
                        <span
                          className={`font-medium ${
                            plot.irrigationStatus === 'needed'
                              ? 'text-orange-600'
                              : 'text-green-600'
                          }`}
                        >
                          {plot.nextIrrigation}
                        </span>
                      </div>
                    </>
                  )}

                  {/* Actions */}
                  <EntityCardActions actions={plotActions} />
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Create Plot Dialog */}
      <CreatePlotDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onCreatePlot={handleCreatePlot}
      />
    </PageTemplate>
  );
};

export default PlotsPage;
