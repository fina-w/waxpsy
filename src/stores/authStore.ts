import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: number;
  nom: string;
  email: string;
  telephone?: string;
  role: string;
  avatar?: string;
  // Ajoutez d'autres propriétés utilisateur si nécessaire
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  setUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (user: User) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
      setUser: (user: User) => set({ user }),
    }),
    {
      name: 'auth-storage', // nom pour le stockage local
    }
  )
);
