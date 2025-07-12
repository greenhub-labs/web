import { User } from '@/contexts/users/domain/entities/user.entity';

/**
 * AuthEntity
 * Entity representation of the Auth entity for domain logic
 *
 * @author GreenHub Labs
 */
export type Auth = User & {
  email: string;
  phone?: string;
};
