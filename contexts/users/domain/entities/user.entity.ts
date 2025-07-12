/**
 * UserEntity
 * Entity representation of the User entity for domain logic
 *
 * @author GreenHub Labs
 */
export type User = {
  id: string;
  firstName?: string;
  lastName?: string;
  bio?: string;
  avatar?: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
};
