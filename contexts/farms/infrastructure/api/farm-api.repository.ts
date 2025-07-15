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
}
