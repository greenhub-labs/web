/**
 * PlotEntity
 * Entity representation of the Plot entity for domain logic
 *
 * @author GreenHub Labs
 */
export type Plot = {
  id: string;
  name: string;
  description: string;
  status: string;
  soilType: string;
  soilPh: number;
  farmId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  dimensions: PlotDimensions;
};

export type PlotDimensions = {
  width: number;
  length: number;
  height: number;
  area: number;
  perimeter: number;
  volume: number;
  unitMeasurement: string;
  unitMeasurementCategory?: string;
};
