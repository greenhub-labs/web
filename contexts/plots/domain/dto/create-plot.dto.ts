export interface CreatePlotDto {
  name: string | null | undefined;
  farmId: string;
  length: number;
  height: number;
  width: number;
  status: string | null | undefined;
  soilPh: number | null | undefined;
  soilType: string | null | undefined;
  unitMeasurement: string | null | undefined;
  description: string | null | undefined;
}
