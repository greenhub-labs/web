import { CROP_PLANTING_METHODS } from '../constants/crop-planting-methods.constant';
import { CROP_STATUS } from '../constants/crop-status.constant';

/**
 * CropEntity
 * Entity representation of the Crop entity for domain logic
 *
 * @author GreenHub Labs
 */
export type Crop = {
  id: string;
  plotId: string;
  varietyId: string;
  plantingDate: string;
  expectedHarvest: string;
  actualHarvest: string;
  quantity: number;
  status: CROP_STATUS;
  plantingMethod: CROP_PLANTING_METHODS;
  notes: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
};
