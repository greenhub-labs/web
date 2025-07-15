import { Farm } from '@/contexts/farms/domain/entities/farm.entity';

export interface FarmsRepository {
  getFarms(): Promise<Farm[]>;
}
