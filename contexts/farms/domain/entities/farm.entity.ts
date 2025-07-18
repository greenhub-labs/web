/**
 * FarmEntity
 * Entity representation of the Farm entity for domain logic
 *
 * @author GreenHub Labs
 */
export type Farm = {
  id: string | null | undefined;
  name: string | null | undefined;
  description: string | null | undefined;
  country: string | null | undefined;
  state: string | null | undefined;
  city: string | null | undefined;
  postalCode: string | null | undefined;
  street: string | null | undefined;
  latitude: number | null | undefined;
  longitude: number | null | undefined;
  isActive: boolean | null | undefined;
  createdAt: string | null | undefined;
  updatedAt: string | null | undefined;
  deletedAt: string | null | undefined;
  members: FarmMember[];
};

export type FarmMember = {
  id: string;
  firstName: string;
  createdAt: string;
  lastName: string;
  avatar: string;
  bio: string;
  phone: string;
  email: string;
  isActive: boolean;
  isDeleted: boolean;
  updatedAt: string;
  deletedAt: string;
  role: string;
};
