import { Farm } from '@/contexts/farms/domain/entities/farm.entity';
import { useFarmStore } from '@/contexts/farms/presentation/stores/farm-store';
import { Plot } from '@/contexts/plots/domain/entities/plot.entity';
import { usePlotsByFarm } from '@/contexts/plots/presentation/hooks/use-plots-by-farm';
import { PageTemplate } from '@/contexts/shared/presentation/components/templates/page-template';
import { Button } from '@/contexts/shared/presentation/components/ui/button';
import { useTranslations } from 'next-intl';

interface PlotsPageComponentProps {
  plot: Plot | null;
  isEditing: boolean;
  handleEdit: () => void;
  handleCancel: () => void;
  handleSave: () => void;
  handleInputChange: (field: string, value: string) => void;
  formData: Farm | null;
  errors: Record<string, string>;
  isLoading: boolean;
}

const PlotsPageComponent = ({
  plot,
  isEditing,
  handleEdit,
  handleCancel,
  handleSave,
  isLoading,
  handleInputChange,
  formData,
  errors,
}: PlotsPageComponentProps) => {
  const t = useTranslations();

  const { currentFarm } = useFarmStore();
  const { getPlotsByFarmIdQuery } = usePlotsByFarm(currentFarm?.id || '');

  console.log('getPlotsByFarmIdQuery', getPlotsByFarmIdQuery.data);

  const tNavigation = useTranslations('navigation');

  const breadcrumbItems = [
    { label: tNavigation('garden.title'), href: '/garden' },
  ];

  return (
    <PageTemplate
      pageTitle={tNavigation('settings.farm')}
      breadcrumbItems={breadcrumbItems}
      headerActions={
        !isEditing ? (
          <Button onClick={handleEdit} disabled={isLoading}>
            {t('common.edit')}
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleCancel}>
              {t('common.cancel')}
            </Button>
            <Button onClick={handleSave}>{t('common.save')}</Button>
          </div>
        )
      }
    >
      <div>Plots</div>
    </PageTemplate>
  );
};

export default PlotsPageComponent;
