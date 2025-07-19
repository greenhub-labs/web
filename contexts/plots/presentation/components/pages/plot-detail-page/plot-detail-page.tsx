import { Plot } from '@/contexts/plots/domain/entities/plot.entity';
import { PlotDimensionsSection } from '@/contexts/plots/presentation/components/molecules/plot-dimensions-section/plot-dimensions-section';
import { PlotGeneralInfoSection } from '@/contexts/plots/presentation/components/molecules/plot-general-info-section/plot-general-info-section';
import { PageTemplate } from '@/contexts/shared/presentation/components/templates/page-template';
import { Button } from '@/contexts/shared/presentation/components/ui/button';
import { Skeleton } from '@/contexts/shared/presentation/components/ui/skeleton';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

interface PlotDetailPageComponentProps {
  plot: Plot | null;
  isLoading: boolean;
}

const PlotDetailLoading = () => {
  const t = useTranslations();
  const tNavigation = useTranslations('navigation');

  const breadcrumbItems = [
    { label: tNavigation('garden.title'), href: '/garden' },
    { label: tNavigation('garden.plots'), href: '/garden/plots' },
    { label: t('common.loading'), href: '#' },
  ];

  return (
    <PageTemplate
      pageTitle={t('common.loading')}
      breadcrumbItems={breadcrumbItems}
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <Skeleton className="h-6 w-32" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
          <Skeleton className="h-24 w-full" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>

        <div className="space-y-4">
          <Skeleton className="h-6 w-32" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
      </div>
    </PageTemplate>
  );
};

const PlotDetailPageComponent = ({
  plot,
  isLoading,
}: PlotDetailPageComponentProps) => {
  const t = useTranslations();
  const tNavigation = useTranslations('navigation');

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: plot?.name || '',
    description: plot?.description || '',
    soilType: plot?.soilType || '',
    soilPh: plot?.soilPh?.toString() || '',
    status: plot?.status || '',
    width: plot?.dimensions?.width?.toString() || '',
    length: plot?.dimensions?.length?.toString() || '',
    height: plot?.dimensions?.height?.toString() || '',
    unitMeasurement: plot?.dimensions?.unitMeasurement || 'm',
  });

  const breadcrumbItems = [
    { label: tNavigation('garden.title'), href: '/garden' },
    { label: tNavigation('garden.plots'), href: '/garden/plots' },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    // TODO: Implementar lógica de guardado
    console.log('Saving plot data:', formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: plot?.name || '',
      description: plot?.description || '',
      soilType: plot?.soilType || '',
      soilPh: plot?.soilPh?.toString() || '',
      status: plot?.status || '',
      width: plot?.dimensions?.width?.toString() || '',
      length: plot?.dimensions?.length?.toString() || '',
      height: plot?.dimensions?.height?.toString() || '',
      unitMeasurement: plot?.dimensions?.unitMeasurement || 'm',
    });
    setIsEditing(false);
  };

  if (isLoading) {
    return <PlotDetailLoading />;
  }

  if (!plot) {
    return (
      <PageTemplate
        pageTitle={t('pages.garden.plots.detail.notFound')}
        breadcrumbItems={breadcrumbItems}
      >
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            {t('pages.garden.plots.detail.notFoundMessage')}
          </p>
        </div>
      </PageTemplate>
    );
  }

  return (
    <PageTemplate
      pageTitle={plot.name}
      breadcrumbItems={breadcrumbItems}
      headerActions={
        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <Button
                variant="outline"
                onClick={handleCancel}
                className="px-3 py-2 text-sm"
              >
                {t('common.cancel')}
              </Button>
              <Button onClick={handleSave} className="px-3 py-2 text-sm">
                {t('common.save')}
              </Button>
            </>
          ) : (
            <Button
              onClick={() => setIsEditing(true)}
              className="px-3 py-2 text-sm"
            >
              {t('common.edit')}
            </Button>
          )}
        </div>
      }
    >
      <div className="space-y-6">
        {/* Información General */}
        <PlotGeneralInfoSection
          plot={plot}
          formData={{
            name: formData.name,
            description: formData.description,
            soilType: formData.soilType,
            soilPh: formData.soilPh,
            status: formData.status,
          }}
          isEditing={isEditing}
          onInputChange={handleInputChange}
        />

        {/* Dimensiones */}
        <PlotDimensionsSection
          plot={plot}
          formData={{
            width: formData.width,
            length: formData.length,
            height: formData.height,
            unitMeasurement: formData.unitMeasurement,
          }}
          isEditing={isEditing}
          onInputChange={handleInputChange}
        />
      </div>
    </PageTemplate>
  );
};

export default PlotDetailPageComponent;
