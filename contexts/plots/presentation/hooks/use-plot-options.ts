import { PLOT_SOIL_TYPES } from '@/contexts/plots/domain/constants/plot-soil-types.constants';
import { PlotStatus } from '@/contexts/plots/domain/constants/plot-status.constants';
import { UNIT_MEASUREMENT } from '@/contexts/plots/domain/constants/unit-measurement.constants';
import { useTranslations } from 'next-intl';

export const usePlotOptions = () => {
  const t = useTranslations();

  const soilTypeOptions = Object.values(PLOT_SOIL_TYPES).map(
    (soilType: string) => ({
      value: soilType,
      label: t(`pages.garden.plots.form.soilTypes.${soilType.toLowerCase()}`),
    }),
  );

  const statusOptions = Object.values(PlotStatus).map((status: string) => ({
    value: status,
    label: t(`pages.garden.plots.status.${status.toLowerCase()}`),
  }));

  const unitMeasurementOptions = Object.values(UNIT_MEASUREMENT).map(
    (unit: string) => ({
      value: unit,
      label: t(`pages.garden.plots.form.unitMeasurement.${unit.toLowerCase()}`),
    }),
  );

  return {
    soilTypeOptions,
    statusOptions,
    unitMeasurementOptions,
  };
};
