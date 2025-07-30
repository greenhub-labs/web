import { z } from 'zod';
import { CROP_VARIETY_TYPE } from '../constants/crop-variety-types.constants';

export const cropVarietySchema = z.object({
  id: z.string(),
  name: z.string(),
  scientificName: z.string(),
  type: z.enum(CROP_VARIETY_TYPE),
  description: z.string(),
  averageYield: z.number(),
  daysToMaturity: z.number(),
  plantingDepth: z.number(),
  spacingBetween: z.number(),
  waterRequirements: z.string(),
  sunRequirements: z.string(),
  minIdealTemperature: z.number(),
  maxIdealTemperature: z.number(),
  minIdealPh: z.number(),
  maxIdealPh: z.number(),
  compatibleWith: z.array(z.string()),
  incompatibleWith: z.array(z.string()),
  plantingSeasons: z.array(z.string()),
  harvestSeasons: z.array(z.string()),
  createdAt: z.string().nullable().optional(),
  updatedAt: z.string().nullable().optional(),
  deletedAt: z.string().nullable().optional(),
});

export type CropVarietySchema = typeof cropVarietySchema;
