export interface CropVarietyResponseDto {
  id: string;
  name: string;
  scientificName: string;
  type: string;
  description: string;
  averageYield: number;
  daysToMaturity: number;
  plantingDepth: number;
  spacingBetween: number;
  waterRequirements: string;
  sunRequirements: string;
  minIdealTemperature: number;
  maxIdealTemperature: number;
  minIdealPh: number;
  maxIdealPh: number;
  compatibleWith: string[];
  incompatibleWith: string[];
  plantingSeasons: string[];
  harvestSeasons: string[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
