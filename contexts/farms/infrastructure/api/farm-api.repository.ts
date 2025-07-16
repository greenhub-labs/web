import { FarmsRepository } from '../../application/ports/farms.repository';
import { Farm } from '../../domain/entities/farm.entity';
import { fetchWithAutoRefresh } from '@/contexts/shared/infrastructure/lib/fetch-with-auto-refresh';

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
}
