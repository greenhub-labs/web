export interface CropResponseDto {
  id: string;
  plotId: string;
  varietyId: string;
  plantingDate: string;
  expectedHarvest: string;
  actualHarvest: string;
  quantity: number;
  status: string;
  plantingMethod: string;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
