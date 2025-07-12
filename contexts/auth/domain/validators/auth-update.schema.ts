import { z } from 'zod';

export const authUpdateSchema = z.object({
  email: z.string().email().optional(),
  phone: z.string().optional(),
});

export type AuthUpdate = z.infer<typeof authUpdateSchema>;
