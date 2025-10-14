import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: number;
  nom: string;
  email: string;
  role: string;
  // Ajoutez d'autres propriétés utilisateur au besoin
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
  login: (userData: User) => void;
  logout: () => void;
  initialize: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isInitialized: false,
      login: (userData) =>
        set({
          user: userData,
          isAuthenticated: true,
          isInitialized: true,
        }),
      logout: () =>
        set({
          user: null,
          isAuthenticated: false,
          isInitialized: true,
        }),
      initialize: () => {
        // Vérifier si l'utilisateur est déjà connecté (par exemple, via localStorage)
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          try {
            const userData = JSON.parse(storedUser);
            set({
              user: userData,
              isAuthenticated: true,
              isInitialized: true,
            });
            return;
          } catch (error) {
            console.error('Erreur lors de la lecture des données utilisateur:', error);
          }
        }
        set({ isInitialized: true });
      },
    }),
    {
      name: 'auth-storage', // Nom de la clé dans le stockage local
      // Ne pas persister l'état d'initialisation
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
