export interface CreateFarmDto {
  name: string;
  description: string;
  country: string;
  longitude: number;
  latitude: number;
  street: string;
  postalCode: string;
  city: string;
  state: string;
  userId: string;
}
