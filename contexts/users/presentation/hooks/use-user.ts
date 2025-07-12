import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UsersApiRepository } from '../../infrastructure/api/users-api.repository';
import { User } from '../../domain/entities/user.entity';

const usersApiRepository = new UsersApiRepository();

export function useUser() {
  const queryClient = useQueryClient();

  const updateUserMutation = useMutation({
    mutationFn: (user: User) => usersApiRepository.update(user),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['me'] });
      return data;
    },
  });
  return { updateUserMutation };
}
