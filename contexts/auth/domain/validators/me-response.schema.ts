import { z } from 'zod';
import { userSchema } from '@/contexts/users/domain/validators/user.schema';

export const meResponseSchema = userSchema.extend({
  email: z.string().email(),
  phone: z.string().nullable(),
});

export type MeResponse = z.infer<typeof meResponseSchema>;
