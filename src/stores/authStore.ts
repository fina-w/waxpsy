import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: number;
  nom: string;
  email: string;
  role: string;
  // Ajoutez d'autres propriétés utilisateur si nécessaire
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (user: User) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage', // nom pour le stockage local
    }
  )
);
