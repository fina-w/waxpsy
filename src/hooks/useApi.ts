import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient, ENDPOINTS } from '../api/apiClient';

export const useTroubles = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: ['troubles', { page, limit }],
    queryFn: () => 
      apiClient.get(ENDPOINTS.TROUBLES, { _page: page, _limit: limit }),
  });
};

export const useTroubleById = (id: string | number) => {
  return useQuery({
    queryKey: ['trouble', id],
    queryFn: () => apiClient.get(ENDPOINTS.TROUBLE_BY_ID(id)),
    enabled: !!id, // Ne s'exécute que si l'ID est fourni
  });
};

export const useTemoignages = (page = 1, limit = 5) => {
  return useQuery({
    queryKey: ['temoignages', { page, limit }],
    queryFn: () => 
      apiClient.get(ENDPOINTS.TEMOIGNAGES, { 
        _page: page, 
        _limit: limit,
        _sort: 'id',
        _order: 'desc',
      }),
  });
};

export const useProfessionnels = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: ['professionnels', { page, limit }],
    queryFn: () => 
      apiClient.get(ENDPOINTS.PROFESSIONNELS, { 
        _page: page, 
        _limit: limit,
        _sort: 'id',
        _order: 'desc',
      }),
  });
};

export const useCreateTemoignage = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: { utilisateurId: number; titre: string; contenu: string }) =>
      apiClient.post(ENDPOINTS.TEMOIGNAGES, {
        ...data,
        statut: 'en_attente',
        dateCreation: new Date().toISOString(),
      }),
    onSuccess: () => {
      // Invalider et rafraîchir les témoignages
      queryClient.invalidateQueries({ queryKey: ['temoignages'] });
    },
  });
};

// Ajoutez d'autres hooks au besoin
