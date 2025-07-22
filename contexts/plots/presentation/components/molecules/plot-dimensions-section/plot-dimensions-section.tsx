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

interface PlotDimensionsSectionProps {
  plot: Plot;
  formData: {
    width: string;
    length: string;
    height: string;
    unitMeasurement?: string;
  };
  isEditing: boolean;
  onInputChange: (field: string, value: string) => void;
}

export const PlotDimensionsSection: React.FC<PlotDimensionsSectionProps> = ({
  plot,
  formData,
  isEditing,
  onInputChange,
}) => {
  const t = useTranslations();
  const { unitMeasurementOptions } = usePlotOptions();

  // Safe access to plot dimensions
  const dimensions = plot?.dimensions;
  const unitMeasurement =
    formData.unitMeasurement || dimensions?.unitMeasurement || 'm';

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('pages.garden.plots.detail.dimensions')}</CardTitle>
        <p className="text-sm text-muted-foreground mt-1">
          {t('pages.garden.plots.detail.dimensionsHelper')}
        </p>
        <Separator className="mt-4" />
      </CardHeader>
      <CardContent className="space-y-4 mt-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <FormField
            label={t('pages.garden.plots.detail.width')}
            name="width"
            type="number"
            value={formData.width}
            onChange={(value) => onInputChange('width', value)}
            placeholder="10"
            disabled={!isEditing}
            helperText={t('pages.garden.plots.detail.widthHelper')}
          />

          <FormField
            label={t('pages.garden.plots.detail.length')}
            name="length"
            type="number"
            value={formData.length}
            onChange={(value) => onInputChange('length', value)}
            placeholder="5"
            disabled={!isEditing}
            helperText={t('pages.garden.plots.detail.lengthHelper')}
          />

          <FormField
            label={t('pages.garden.plots.detail.height')}
            name="height"
            type="number"
            value={formData.height}
            onChange={(value) => onInputChange('height', value)}
            placeholder="0.3"
            disabled={!isEditing}
            helperText={t('pages.garden.plots.detail.heightHelper')}
          />

          <SelectField
            label={t('pages.garden.plots.detail.unitMeasurement')}
            options={unitMeasurementOptions}
            value={unitMeasurement}
            onChange={(value) => onInputChange('unitMeasurement', value)}
            disabled={!isEditing}
            helperText={t('pages.garden.plots.detail.unitMeasurementHelper')}
          />
        </div>

        <Separator />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="font-medium text-muted-foreground">
              {t('pages.garden.plots.detail.area')}:
            </span>
            <span className="ml-2">
              {dimensions?.area || 0} {unitMeasurement}²
            </span>
            <div className="text-xs text-muted-foreground mt-1">
              {t('pages.garden.plots.detail.areaHelper')}
            </div>
          </div>

          <div>
            <span className="font-medium text-muted-foreground">
              {t('pages.garden.plots.detail.perimeter')}:
            </span>
            <span className="ml-2">
              {dimensions?.perimeter || 0} {unitMeasurement}
            </span>
            <div className="text-xs text-muted-foreground mt-1">
              {t('pages.garden.plots.detail.perimeterHelper')}
            </div>
          </div>

          <div>
            <span className="font-medium text-muted-foreground">
              {t('pages.garden.plots.detail.volume')}:
            </span>
            <span className="ml-2">
              {dimensions?.volume || 0} {unitMeasurement}³
            </span>
            <div className="text-xs text-muted-foreground mt-1">
              {t('pages.garden.plots.detail.volumeHelper')}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlotDimensionsSection;
