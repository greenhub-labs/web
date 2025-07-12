// contexts/auth/presentation/hooks/use-auth.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AuthApiRepository } from '@/contexts/auth/infrastructure/api/auth-api.repository';
import type { Auth } from '@/contexts/auth/domain/entities/auth.entity';

const authApi = new AuthApiRepository();

export function useAuth() {
  const queryClient = useQueryClient();

  // Login
  const loginMutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      authApi.login(email, password),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['me'] });
      return data;
    },
  });

  // Register
  const registerMutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      authApi.register(email, password),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['me'] });
      return data;
    },
  });

  // Logout
  const logoutMutation = useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['me'] });
    },
  });

  // Refresh Token
  const refreshTokenMutation = useMutation({
    mutationFn: (token: string) => authApi.refreshToken(token),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['me'] });
      return data;
    },
  });

  // Verify Token
  const verifyTokenMutation = useMutation({
    mutationFn: (token: string) => authApi.verifyToken(token),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['me'] });
      return data;
    },
  });

  // Me (usuario actual)
  const {
    data: user,
    isLoading: isUserLoading,
    refetch: refetchUser,
  } = useQuery<Auth>({
    queryKey: ['me'],
    queryFn: () => authApi.me(),
    retry: false,
  });

  return {
    user,
    isUserLoading,
    refetchUser,
    login: loginMutation.mutateAsync,
    loginStatus: loginMutation.status,
    register: registerMutation.mutateAsync,
    registerStatus: registerMutation.status,
    logout: logoutMutation.mutateAsync,
    logoutStatus: logoutMutation.status,
    refreshToken: refreshTokenMutation.mutateAsync,
    refreshTokenStatus: refreshTokenMutation.status,
    verifyToken: verifyTokenMutation.mutateAsync,
    verifyTokenStatus: verifyTokenMutation.status,
  };
}
