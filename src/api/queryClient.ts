import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes avant que les données ne deviennent obsolètes
      gcTime: 30 * 60 * 1000, // 30 minutes avant que le cache ne soit supprimé
      refetchOnWindowFocus: false, // Ne pas recharger les données lors du retour sur l'onglet
      retry: 1, // Nombre de tentatives en cas d'échec
    },
  },
});
