/**
 * AuthEntity
 * Entity representation of the Auth entity for domain logic
 *
 * @author GreenHub Labs
 */
export type Auth = {
  id: string;
  userId: string;
  email: string;
  phone?: string;
  isVerified: boolean;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
};
