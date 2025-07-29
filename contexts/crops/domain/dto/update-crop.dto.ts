import { CreateCropDto } from './create-crop.dto';

export type UpdateCropDto = Partial<CreateCropDto> & {
  id: string;
};
