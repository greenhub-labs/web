export interface FarmResponseDto {
  id: string;
  name: string;
  description: string;
  country: string;
  state: string;
  city: string;
  postalCode: string;
  street: string;
  latitude: number;
  longitude: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
