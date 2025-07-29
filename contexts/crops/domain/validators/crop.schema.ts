import { z } from 'zod';
import { CROP_PLANTING_METHODS } from '../constants/crop-planting-methods.constant';
import { CROP_STATUS } from '../constants/crop-status.constant';

export const cropSchema = z.object({
  id: z.string(),
  plotId: z.string(),
  varietyId: z.string(),
  plantingDate: z.string(),
  expectedHarvest: z.string(),
  actualHarvest: z.string(),
  quantity: z.number(),
  status: z.enum(CROP_STATUS),
  plantingMethod: z.enum(CROP_PLANTING_METHODS),
  notes: z.string(),
  createdAt: z.string().nullable().optional(),
  updatedAt: z.string().nullable().optional(),
  deletedAt: z.string().nullable().optional(),
});

export type CropSchema = typeof cropSchema;
