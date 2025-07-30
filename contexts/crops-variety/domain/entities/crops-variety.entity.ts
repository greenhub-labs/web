import { CROP_VARIETY_TYPE } from '../constants/crop-variety-types.constants';
import { SUN_REQUIREMENTS } from '../constants/sun-requirements.constants';
import { WATER_REQUIREMENTS } from '../constants/water-requirements.constants';

/**
 * CropEntity
 * Entity representation of the Crop entity for domain logic
 *
 * @author GreenHub Labs
 */
export type CropVariety = {
  id: string;
  name: string;
  scientificName: string;
  type: CROP_VARIETY_TYPE;
  description: string;
  averageYield: number;
  daysToMaturity: number;
  plantingDepth: number;
  spacingBetween: number;
  waterRequirements: WATER_REQUIREMENTS;
  sunRequirements: SUN_REQUIREMENTS;
  minIdealTemperature: number;
  maxIdealTemperature: number;
  minIdealPh: number;
  maxIdealPh: number;
  compatibleWith: string[];
  incompatibleWith: string[];
  plantingSeasons: string[];
  harvestSeasons: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
};
