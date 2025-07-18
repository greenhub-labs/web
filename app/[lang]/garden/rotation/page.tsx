'use client';

import { PageTemplate } from '@/contexts/shared/presentation/components/templates/page-template';
import { Button } from '@/contexts/shared/presentation/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/contexts/shared/presentation/components/ui/card';
import { Separator } from '@/contexts/shared/presentation/components/ui/separator';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

// Reusable components
import {
  ProgressBar,
  StatCard,
} from '@/contexts/shared/presentation/components/atoms';
import {
  EntityCardActions,
  EntityCardHeader,
  type CardAction,
} from '@/contexts/shared/presentation/components/molecules';

interface RotationPlan {
  id: string;
  name: string;
  plotId: string;
  plotName: string;
  status: 'active' | 'planned' | 'completed' | 'overdue';
  currentCrop: {
    name: string;
    category: string;
    icon: string;
    plantedDate: string;
    daysRemaining: number;
  };
  nextCrop: {
    name: string;
    category: string;
    icon: string;
    estimatedPlantDate: string;
  };
  cycleDuration: number; // seasons
  cycleProgress: number; // percentage
  soilHealth: number; // percentage
  rotationHistory: Array<{
    year: number;
    season: string;
    crop: string;
    category: string;
    icon: string;
  }>;
  benefits: {
    pestControl: number;
    soilNutrients: number;
    diseaseManagement: number;
    yieldImprovement: number;
  };
  notes: string;
}

const RotationPage = () => {
  const t = useTranslations();
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'timeline'>(
    'grid',
  );
  const [filterBy, setFilterBy] = useState<
    'all' | 'active' | 'planned' | 'completed' | 'overdue'
  >('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  // Mock data for rotation plans
  const rotationPlans: RotationPlan[] = [
    {
      id: 'rotation-1',
      name: 'Rotación de Verduras de 4 Estaciones',
      plotId: 'plot-a',
      plotName: 'Bancal A',
      status: 'active',
      currentCrop: {
        name: 'Tomates',
        category: 'nightshades',
        icon: '🍅',
        plantedDate: '2024-01-15',
        daysRemaining: 45,
      },
      nextCrop: {
        name: 'Judías',
        category: 'legumes',
        icon: '🫘',
        estimatedPlantDate: '2024-04-15',
      },
      cycleDuration: 4,
      cycleProgress: 75,
      soilHealth: 85,
      rotationHistory: [
        {
          year: 2023,
          season: 'Primavera',
          crop: 'Lechugas',
          category: 'leafy',
          icon: '🥬',
        },
        {
          year: 2023,
          season: 'Verano',
          crop: 'Zanahorias',
          category: 'roots',
          icon: '🥕',
        },
        {
          year: 2023,
          season: 'Otoño',
          crop: 'Brócoli',
          category: 'brassicas',
          icon: '🥦',
        },
        {
          year: 2024,
          season: 'Invierno',
          crop: 'Tomates',
          category: 'nightshades',
          icon: '🍅',
        },
      ],
      benefits: {
        pestControl: 88,
        soilNutrients: 92,
        diseaseManagement: 85,
        yieldImprovement: 78,
      },
      notes:
        'Rotación clásica que alterna familias de plantas para optimizar nutrientes del suelo.',
    },
    {
      id: 'rotation-2',
      name: 'Rotación de Raíces y Leguminosas',
      plotId: 'plot-b',
      plotName: 'Bancal B',
      status: 'planned',
      currentCrop: {
        name: 'Espinacas',
        category: 'leafy',
        icon: '🥬',
        plantedDate: '2024-02-01',
        daysRemaining: 20,
      },
      nextCrop: {
        name: 'Rábanos',
        category: 'roots',
        icon: '🔴',
        estimatedPlantDate: '2024-03-15',
      },
      cycleDuration: 3,
      cycleProgress: 33,
      soilHealth: 78,
      rotationHistory: [
        {
          year: 2023,
          season: 'Verano',
          crop: 'Calabacines',
          category: 'cucurbits',
          icon: '🥒',
        },
        {
          year: 2023,
          season: 'Otoño',
          crop: 'Guisantes',
          category: 'legumes',
          icon: '🫛',
        },
        {
          year: 2024,
          season: 'Invierno',
          crop: 'Espinacas',
          category: 'leafy',
          icon: '🥬',
        },
      ],
      benefits: {
        pestControl: 72,
        soilNutrients: 85,
        diseaseManagement: 80,
        yieldImprovement: 65,
      },
      notes:
        'Enfoque en fijación de nitrógeno y cultivos de raíz para mejorar estructura del suelo.',
    },
    {
      id: 'rotation-3',
      name: 'Rotación Intensiva de Hojas Verdes',
      plotId: 'plot-c',
      plotName: 'Bancal C',
      status: 'completed',
      currentCrop: {
        name: 'Descanso',
        category: 'rest',
        icon: '🌿',
        plantedDate: '2024-01-01',
        daysRemaining: 0,
      },
      nextCrop: {
        name: 'Albahaca',
        category: 'leafy',
        icon: '🌿',
        estimatedPlantDate: '2024-03-01',
      },
      cycleDuration: 2,
      cycleProgress: 100,
      soilHealth: 65,
      rotationHistory: [
        {
          year: 2023,
          season: 'Primavera',
          crop: 'Lechugas',
          category: 'leafy',
          icon: '🥬',
        },
        {
          year: 2023,
          season: 'Verano',
          crop: 'Acelgas',
          category: 'leafy',
          icon: '🥬',
        },
        {
          year: 2023,
          season: 'Otoño',
          crop: 'Espinacas',
          category: 'leafy',
          icon: '🥬',
        },
        {
          year: 2024,
          season: 'Invierno',
          crop: 'Descanso',
          category: 'rest',
          icon: '🌿',
        },
      ],
      benefits: {
        pestControl: 45,
        soilNutrients: 55,
        diseaseManagement: 40,
        yieldImprovement: 85,
      },
      notes:
        'Ciclo completado. Requiere período de descanso para recuperar nutrientes.',
    },
    {
      id: 'rotation-4',
      name: 'Rotación de Solanáceas y Brasicáceas',
      plotId: 'plot-d',
      plotName: 'Bancal D',
      status: 'overdue',
      currentCrop: {
        name: 'Pimientos',
        category: 'nightshades',
        icon: '🌶️',
        plantedDate: '2023-11-01',
        daysRemaining: -15,
      },
      nextCrop: {
        name: 'Coliflor',
        category: 'brassicas',
        icon: '🥦',
        estimatedPlantDate: '2024-02-15',
      },
      cycleDuration: 4,
      cycleProgress: 25,
      soilHealth: 55,
      rotationHistory: [
        {
          year: 2023,
          season: 'Primavera',
          crop: 'Berenjenas',
          category: 'nightshades',
          icon: '🍆',
        },
        {
          year: 2023,
          season: 'Verano',
          crop: 'Tomates',
          category: 'nightshades',
          icon: '🍅',
        },
        {
          year: 2023,
          season: 'Otoño',
          crop: 'Pimientos',
          category: 'nightshades',
          icon: '🌶️',
        },
      ],
      benefits: {
        pestControl: 35,
        soilNutrients: 40,
        diseaseManagement: 30,
        yieldImprovement: 45,
      },
      notes:
        'ATENCIÓN: Rotación atrasada. Múltiples solanáceas consecutivas afectan salud del suelo.',
    },
  ];

  const breadcrumbItems = [
    { label: t('navigation.home'), href: '/' },
    { label: t('navigation.garden.title'), href: '/garden' },
    { label: t('navigation.garden.rotation'), href: '/garden/rotation' },
  ];

  const handleCreateRotationPlan = async (planData: any) => {
    console.log('Creating rotation plan:', planData);
    // Add rotation plan creation logic here
  };

  // Filter plans based on selected filter and search query
  const filteredPlans = rotationPlans.filter((plan) => {
    // Status filter
    const matchesStatus = filterBy === 'all' || plan.status === filterBy;

    // Search filter
    const matchesSearch =
      searchQuery === '' ||
      [
        plan.name.toLowerCase(),
        plan.plotName.toLowerCase(),
        plan.currentCrop.name.toLowerCase(),
        plan.nextCrop.name.toLowerCase(),
        plan.notes.toLowerCase(),
      ].some((field) => field.includes(searchQuery.toLowerCase()));

    return matchesStatus && matchesSearch;
  });

  // Status helpers
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'planned':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'overdue':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return '🟢';
      case 'planned':
        return '📅';
      case 'completed':
        return '✅';
      case 'overdue':
        return '⚠️';
      default:
        return '❓';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'legumes':
        return '🫘';
      case 'brassicas':
        return '🥦';
      case 'nightshades':
        return '🍅';
      case 'roots':
        return '🥕';
      case 'alliums':
        return '🧄';
      case 'cucurbits':
        return '🥒';
      case 'leafy':
        return '🥬';
      case 'rest':
        return '🌿';
      default:
        return '🌱';
    }
  };

  const getCategoryName = (category: string) => {
    return t(`pages.garden.rotation.categories.${category}`);
  };

  // Calculate overall stats
  const stats = {
    activePlans: rotationPlans.filter((p) => p.status === 'active').length,
    completedCycles: rotationPlans.filter((p) => p.status === 'completed')
      .length,
    avgSoilHealth: Math.round(
      rotationPlans.reduce((acc, p) => acc + p.soilHealth, 0) /
        rotationPlans.length,
    ),
    nextRotations: rotationPlans.filter(
      (p) => p.currentCrop.daysRemaining <= 30,
    ).length,
  };

  return (
    <PageTemplate
      pageTitle={t('pages.garden.rotation.title')}
      breadcrumbItems={breadcrumbItems}
      headerActions={
        <div className="flex items-center gap-2">
          {/* Desktop: All controls */}
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-0.5 bg-background border rounded-md p-1">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="px-3 py-2 text-sm"
              >
                🔲 {t('pages.garden.rotation.gridView')}
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="px-3 py-2 text-sm"
              >
                📋 {t('pages.garden.rotation.listView')}
              </Button>
              <Button
                variant={viewMode === 'timeline' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('timeline')}
                className="px-3 py-2 text-sm"
              >
                📅 {t('pages.garden.rotation.timelineView')}
              </Button>
            </div>
            <Button
              onClick={() => setIsCreateDialogOpen(true)}
              className="px-3 py-2 text-sm"
            >
              ➕ {t('pages.garden.rotation.addRotationPlan')}
            </Button>
          </div>

          {/* Mobile: Only View Toggle + Add */}
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
              <Button
                variant={viewMode === 'timeline' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('timeline')}
                className="h-8 w-8 p-0"
              >
                📅
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
      <div className="space-y-4 md:space-y-6">
        {/* Mobile Filters */}
        <div className="md:hidden">
          <Card>
            <CardContent className="p-3">
              <div className="space-y-3">
                <span className="text-sm font-medium text-muted-foreground">
                  Filtrar por estado:
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant={filterBy === 'all' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setFilterBy('all')}
                    className="h-9 text-xs px-2 justify-start"
                  >
                    🌐 Todos
                  </Button>
                  <Button
                    variant={filterBy === 'active' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setFilterBy('active')}
                    className="h-9 text-xs px-2 justify-start"
                  >
                    🟢 {t('pages.garden.rotation.status.active')}
                  </Button>
                  <Button
                    variant={filterBy === 'planned' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setFilterBy('planned')}
                    className="h-9 text-xs px-2 justify-start"
                  >
                    📅 {t('pages.garden.rotation.status.planned')}
                  </Button>
                  <Button
                    variant={filterBy === 'overdue' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setFilterBy('overdue')}
                    className="h-9 text-xs px-2 justify-start"
                  >
                    ⚠️ {t('pages.garden.rotation.status.overdue')}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
          <StatCard
            title={t('pages.garden.rotation.stats.activePlans')}
            value={stats.activePlans.toString()}
            icon="🟢"
          />
          <StatCard
            title={t('pages.garden.rotation.stats.completedCycles')}
            value={stats.completedCycles.toString()}
            icon="✅"
          />
          <StatCard
            title={t('pages.garden.rotation.stats.soilHealth')}
            value={`${stats.avgSoilHealth}%`}
            icon="🌱"
          />
          <StatCard
            title={t('pages.garden.rotation.stats.nextRotations')}
            value={stats.nextRotations.toString()}
            icon="🔄"
          />
        </div>

        {/* Rotation Plans Grid/List */}
        <div
          className={`grid gap-6 ${
            viewMode === 'grid' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'
          }`}
        >
          {filteredPlans.map((plan) => {
            const cardActions: CardAction[] = [
              {
                label: t('pages.garden.rotation.viewDetails'),
                icon: '👁️',
                onClick: () => console.log('View details', plan.id),
                variant: 'default',
                isPrimary: true,
              },
              {
                label: t('pages.garden.rotation.editPlan'),
                icon: '⚙️',
                onClick: () => console.log('Edit plan', plan.id),
                variant: 'outline',
              },
            ];

            return (
              <Card key={plan.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <EntityCardHeader
                    title={plan.name}
                    subtitle={plan.plotName}
                    icon={getCategoryIcon(plan.currentCrop.category)}
                    status={plan.status}
                    statusType="planting"
                    statusLabel={t(
                      `pages.garden.rotation.status.${plan.status}`,
                    )}
                  />
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        {t('pages.garden.rotation.currentCrop')}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-lg">{plan.currentCrop.icon}</span>
                        <div>
                          <p className="font-medium">{plan.currentCrop.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {getCategoryName(plan.currentCrop.category)}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        {t('pages.garden.rotation.nextCrop')}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-lg">{plan.nextCrop.icon}</span>
                        <div>
                          <p className="font-medium">{plan.nextCrop.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {getCategoryName(plan.nextCrop.category)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <ProgressBar
                    label={t('pages.garden.rotation.rotationCycle')}
                    value={plan.cycleProgress}
                    colorType="blue"
                  />

                  <ProgressBar
                    label={t('pages.garden.rotation.soilHealth')}
                    value={plan.soilHealth}
                    colorType={
                      plan.soilHealth >= 70
                        ? 'green'
                        : plan.soilHealth >= 50
                        ? 'yellow'
                        : 'red'
                    }
                  />

                  {plan.currentCrop.daysRemaining > 0 ? (
                    <div className="text-sm text-muted-foreground">
                      {plan.currentCrop.daysRemaining}{' '}
                      {t('pages.garden.rotation.daysRemaining')}
                    </div>
                  ) : plan.currentCrop.daysRemaining === 0 ? (
                    <div className="text-sm text-green-600 font-medium">
                      {t('pages.garden.rotation.readyToRotate')}
                    </div>
                  ) : (
                    <div className="text-sm text-red-600 font-medium">
                      {Math.abs(plan.currentCrop.daysRemaining)} días atrasado
                    </div>
                  )}

                  <Separator />
                  <EntityCardActions actions={cardActions} />
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* No results message */}
        {filteredPlans.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <p>No se encontraron planes de rotación</p>
          </div>
        )}

        {/* AI Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              🤖 {t('pages.garden.rotation.recommendations.title')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid gap-3 md:grid-cols-2">
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">ℹ️</span>
                  <div>
                    <p className="font-medium text-blue-800 text-sm">
                      {t(
                        'pages.garden.rotation.recommendations.rotateTomatoes',
                      )}
                    </p>
                    <p className="text-blue-700 text-xs">
                      {t(
                        'pages.garden.rotation.recommendations.rotateTomatoesDesc',
                      )}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-start gap-2">
                  <span className="text-yellow-600 mt-0.5">⚠️</span>
                  <div>
                    <p className="font-medium text-yellow-800 text-sm">
                      {t('pages.garden.rotation.recommendations.addRestPeriod')}
                    </p>
                    <p className="text-yellow-700 text-xs">
                      {t(
                        'pages.garden.rotation.recommendations.addRestPeriodDesc',
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Benefits Section */}
        <Card>
          <CardHeader>
            <CardTitle>{t('pages.garden.rotation.benefits.title')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl mb-2">🛡️</div>
                <h4 className="font-medium">
                  {t('pages.garden.rotation.benefits.pestControl')}
                </h4>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">🌱</div>
                <h4 className="font-medium">
                  {t('pages.garden.rotation.benefits.soilNutrients')}
                </h4>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">🩺</div>
                <h4 className="font-medium">
                  {t('pages.garden.rotation.benefits.diseaseManagement')}
                </h4>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">📈</div>
                <h4 className="font-medium">
                  {t('pages.garden.rotation.benefits.yieldImprovement')}
                </h4>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageTemplate>
  );
};

export default RotationPage;
