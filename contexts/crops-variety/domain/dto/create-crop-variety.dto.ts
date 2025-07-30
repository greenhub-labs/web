import { CROP_VARIETY_TYPE } from '../constants/crop-variety-types.constants';

export type CreateCropVarietyDto = {
  name: string;
  scientificName: string;
  type: CROP_VARIETY_TYPE;
  description: string;
  averageYield: number;
  daysToMaturity: number;
  plantingDepth: number;
  spacingBetween: number;
  waterRequirements: string;
  sunRequirements: string;
  minIdealTemperature: number;
  maxIdealTemperature: number;
  minIdealPh: number;
  maxIdealPh: number;
  compatibleWith: string[];
  incompatibleWith: string[];
  plantingSeasons: string[];
  harvestSeasons: string[];
};
