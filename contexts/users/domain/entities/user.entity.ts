export type FarmMembership = {
  farmId: string;
  farmName: string;
  role: string;
};

/**
 * UserEntity
 * Entity representation of the User entity for domain logic
 *
 * @author GreenHub Labs
 */
export type User = {
  id: string;
  firstName?: string | null | undefined;
  lastName?: string | null | undefined;
  bio?: string | null | undefined;
  avatar?: string | null | undefined;
  isActive?: boolean | null | undefined;
  isDeleted?: boolean | null | undefined;
  createdAt?: string | null | undefined;
  updatedAt?: string | null | undefined;
  deletedAt?: string | null | undefined;
  farms?: FarmMembership[] | null | undefined;
};
