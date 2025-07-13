import { UsersRepository } from '../../application/ports/users.repository';
import { User } from '../../domain/entities/user.entity';
import { fetchWithAutoRefresh } from '@/contexts/shared/infrastructure/lib/fetch-with-auto-refresh';

/**
 * Implementation of UsersRepository.
 */
export class UsersApiRepository implements UsersRepository {
  async update(user: User): Promise<void> {
    const url = `/api/users/update`;
    await fetchWithAutoRefresh(url, {
      method: 'POST',
      body: JSON.stringify({ user }),
    });
  }
}
