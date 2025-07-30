import { z } from 'zod';
import { CROP_VARIETY_TYPE } from '../constants/crop-variety-types.constants';

export const cropVarietyUpdateSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  scientificName: z.string().optional(),
  type: z.enum(CROP_VARIETY_TYPE).optional(),
  description: z.string().optional(),
  averageYield: z.number().optional(),
  daysToMaturity: z.number().optional(),
  plantingDepth: z.number().optional(),
  spacingBetween: z.number().optional(),
  waterRequirements: z.string().optional(),
  sunRequirements: z.string().optional(),
  minIdealTemperature: z.number().optional(),
  maxIdealTemperature: z.number().optional(),
  minIdealPh: z.number().optional(),
  maxIdealPh: z.number().optional(),
  compatibleWith: z.array(z.string()).optional(),
  incompatibleWith: z.array(z.string()).optional(),
  plantingSeasons: z.array(z.string()).optional(),
  harvestSeasons: z.array(z.string()).optional(),
  createdAt: z.string().nullable().optional(),
  updatedAt: z.string().nullable().optional(),
  deletedAt: z.string().nullable().optional(),
});

export type CropUpdateSchema = typeof cropVarietyUpdateSchema;
