import { CROP_PLANTING_METHODS } from '@/contexts/crops/domain/constants/crop-planting-methods.constant';
import { CROP_STATUS } from '@/contexts/crops/domain/constants/crop-status.constant';
import { useTranslations } from 'next-intl';

export const useCropsOptions = () => {
  const t = useTranslations();

  const plantingMethodOptions = Object.values(CROP_PLANTING_METHODS).map(
    (plantingMethod: string) => ({
      value: plantingMethod,
      label: t(
        `pages.garden.crops.form.plantingMethods.${plantingMethod.toLowerCase()}`,
      ),
    }),
  );

  const statusOptions = Object.values(CROP_STATUS).map((status: string) => ({
    value: status,
    label: t(`pages.garden.crops.status.${status.toLowerCase()}`),
  }));

  return {
    plantingMethodOptions,
    statusOptions,
  };
};
