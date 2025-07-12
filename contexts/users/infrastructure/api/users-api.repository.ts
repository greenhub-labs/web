import { UsersRepository } from '../../application/ports/users.repository';
import { User } from '../../domain/entities/user.entity';

/**
 * Implementation of UsersRepository.
 */
export class UsersApiRepository implements UsersRepository {
  async update(user: User): Promise<void> {
    const url = `/api/users/update`;
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({ user }),
      credentials: 'include',
    });
    return response.json();
  }
}
