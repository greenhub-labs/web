import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Auth } from '@/contexts/auth/domain/entities/auth.entity';

interface AuthStore {
  currentUser: Auth | null;
  setCurrentUser: (user: Auth) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      currentUser: null,
      setCurrentUser: (user: Auth) => set({ currentUser: user }),
    }),
    {
      name: 'current-auth-store',
    },
  ),
);
