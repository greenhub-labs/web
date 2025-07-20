import { Plot } from '@/contexts/plots/domain/entities/plot.entity';
import { usePlotOptions } from '@/contexts/plots/presentation/hooks/use-plot-options';
import { FormField } from '@/contexts/shared/presentation/components/molecules/form-field/form-field';
import { SelectField } from '@/contexts/shared/presentation/components/molecules/select-field/select-field';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/contexts/shared/presentation/components/ui/card';
import { Separator } from '@/contexts/shared/presentation/components/ui/separator';
import { useTranslations } from 'next-intl';

interface PlotGeneralInfoSectionProps {
  plot: Plot;
  formData: {
    name: string;
    description: string;
    soilType: string;
    soilPh: string;
    status: string;
  };
  isEditing: boolean;
  onInputChange: (field: string, value: string) => void;
}

export const PlotGeneralInfoSection: React.FC<PlotGeneralInfoSectionProps> = ({
  plot,
  formData,
  isEditing,
  onInputChange,
}) => {
  const t = useTranslations();
  const { soilTypeOptions, statusOptions } = usePlotOptions();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('pages.garden.plots.detail.generalInfo')}</CardTitle>
        <p className="text-sm text-muted-foreground mt-1">
          {t('pages.garden.plots.detail.generalInfoDescription')}
        </p>
        <Separator className="mt-4" />
      </CardHeader>
      <CardContent className="space-y-4 mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label={t('pages.garden.plots.form.name')}
            name="name"
            type="text"
            value={formData.name}
            onChange={(value) => onInputChange('name', value)}
            placeholder={t('pages.garden.plots.form.namePlaceholder')}
            disabled={!isEditing}
            required
            helperText={t('pages.garden.plots.form.nameHelper')}
          />

          <SelectField
            label={t('pages.garden.plots.form.soilType')}
            options={soilTypeOptions}
            value={formData.soilType}
            onChange={(value) => onInputChange('soilType', value)}
            placeholder={t('pages.garden.plots.form.soilTypePlaceholder')}
            disabled={!isEditing}
            helperText={t('pages.garden.plots.form.soilTypeHelper')}
          />
        </div>

        <FormField
          label={t('pages.garden.plots.form.description')}
          name="description"
          type="textarea"
          value={formData.description}
          onChange={(value) => onInputChange('description', value)}
          placeholder={t('pages.garden.plots.form.descriptionPlaceholder')}
          disabled={!isEditing}
          rows={3}
          helperText={t('pages.garden.plots.form.descriptionHelper')}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SelectField
            label={t('pages.garden.plots.status.title')}
            options={statusOptions}
            value={formData.status}
            onChange={(value) => onInputChange('status', value)}
            disabled={!isEditing}
            helperText={t('pages.garden.plots.status.helper')}
          />

          <FormField
            label={t('pages.garden.plots.detail.soilPh')}
            name="soilPh"
            type="number"
            value={formData.soilPh}
            onChange={(value) => onInputChange('soilPh', value)}
            placeholder="6.5"
            disabled={!isEditing}
            helperText={t('pages.garden.plots.detail.soilPhHelper')}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default PlotGeneralInfoSection;
