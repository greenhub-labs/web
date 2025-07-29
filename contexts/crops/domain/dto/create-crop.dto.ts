import { CROP_PLANTING_METHODS } from '../constants/crop-planting-methods.constant';
import { CROP_STATUS } from '../constants/crop-status.constant';

export type CreateCropDto = {
  plotId: string;
  varietyId: string;
  plantingDate: string;
  expectedHarvest: string;
  actualHarvest: string;
  quantity: number;
  status: CROP_STATUS;
  plantingMethod: CROP_PLANTING_METHODS;
  notes: string;
};
