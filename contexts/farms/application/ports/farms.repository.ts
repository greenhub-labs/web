import { Farm } from '@/contexts/farms/domain/entities/farm.entity';
import { CreateFarmDto } from '../../domain/dto/create-farm.dto';

export interface FarmsRepository {
  getFarms(): Promise<Farm[]>;
  createFarm(farm: CreateFarmDto): Promise<Farm>;
}
