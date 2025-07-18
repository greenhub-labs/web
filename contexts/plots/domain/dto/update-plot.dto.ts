export interface UpdatePlotDto {
  id: string;
  name?: string | null;
  farmId?: string;
  length?: number;
  height?: number;
  width?: number;
  status?: string | null;
  soilPh?: number | null;
  soilType?: string | null;
  unitMeasurement?: string | null;
  description?: string | null;
}
