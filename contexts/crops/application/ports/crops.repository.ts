import { CreateCropDto } from '../../domain/dto/create-crop.dto';
import { Crop } from '../../domain/entities/crop.entity';

export interface CropsRepository {
  getCrops(): Promise<Crop[]>;
  getCropById(cropId: string): Promise<Crop>;
  getCropsByPlotId(plotId: string): Promise<Crop[]>;
  createCrop(crop: CreateCropDto): Promise<Crop>;
  updateCrop(crop: Crop): Promise<Crop>;
  deleteCrop(cropId: string): Promise<void>;
}
