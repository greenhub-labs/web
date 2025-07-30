import { CreateCropVarietyDto } from '../../domain/dto/create-crop-variety.dto';
import { UpdateCropVarietyDto } from '../../domain/dto/update-crop-variety.dto';
import { CropVariety } from '../../domain/entities/crops-variety.entity';

export interface CropsVarietyRepository {
  getCropsVarieties(): Promise<CropVariety[]>;
  getCropVarietyById(cropVarietyId: string): Promise<CropVariety>;
  createCropVariety(cropVariety: CreateCropVarietyDto): Promise<CropVariety>;
  updateCropVariety(cropVariety: UpdateCropVarietyDto): Promise<CropVariety>;
  deleteCropVariety(cropVarietyId: string): Promise<void>;
}
