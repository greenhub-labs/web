import { FarmsRepository } from '../../application/ports/farms.repository';
import { Farm } from '../../domain/entities/farm.entity';
import { fetchWithAutoRefresh } from '@/contexts/shared/infrastructure/lib/fetch-with-auto-refresh';
import { useFarmStore } from '../../presentation/stores/farm-store';
import { CreateFarmDto } from '../../domain/dto/create-farm.dto';

/**
 * Implementation of UsersRepository.
 */
export class FarmsApiRepository implements FarmsRepository {
  async getFarms(): Promise<Farm[]> {
    const url = `/api/farms`;
    const response = await fetchWithAutoRefresh(url, {
      method: 'GET',
    });
    const data: Farm[] = await response.json();
    return data;
  }

  async getFarmById(farmId: string): Promise<Farm> {
    const url = `/api/farms/get-farm-by-id`;
    const response = await fetchWithAutoRefresh(url, {
      method: 'POST',
      body: JSON.stringify({ id: farmId }),
      headers: { 'Content-Type': 'application/json' },
    });
    const data: Farm = await response.json();
    return data;
  }

  async createFarm(farm: CreateFarmDto): Promise<Farm> {
    const url = `/api/farms/create-farm`;
    const response = await fetchWithAutoRefresh(url, {
      method: 'POST',
      body: JSON.stringify({ farm, userId: farm.userId }),
      headers: { 'Content-Type': 'application/json' },
    });
    const data: Farm = await response.json();
    return data;
  }

  async updateFarm(farm: Farm): Promise<Farm> {
    const url = `/api/farms/update-farm`;
    const response = await fetchWithAutoRefresh(url, {
      method: 'POST',
      body: JSON.stringify({ farm }),
    });
    const data: Farm = await response.json();
    return data;
  }
}
