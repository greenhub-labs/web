import { CreateCropVarietyDto } from './create-crop-variety.dto';

export type UpdateCropVarietyDto = Partial<CreateCropVarietyDto> & {
  id: string;
};
