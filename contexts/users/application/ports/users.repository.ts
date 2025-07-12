import { User } from '../../domain/entities/user.entity';

export interface UsersRepository {
  update(user: User): Promise<void>;
}
