import { z } from 'zod';

export const plotUpdateSchema = z.object({
  id: z.string(),
  name: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  status: z.string().nullable().optional(),
  soilType: z.string().nullable().optional(),
  soilPh: z.number().nullable().optional(),
  farmId: z.string().nullable().optional(),
  dimensions: z.object({
    width: z.number().nullable().optional(),
    length: z.number().nullable().optional(),
    height: z.number().nullable().optional(),
    area: z.number().nullable().optional(),
    perimeter: z.number().nullable().optional(),
    volume: z.number().nullable().optional(),
    unitMeasurement: z.string().nullable().optional(),
  }),
});

export type PlotUpdateSchema = typeof plotUpdateSchema;
