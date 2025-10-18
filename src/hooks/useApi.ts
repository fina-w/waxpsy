import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient, ENDPOINTS } from '../api/apiClient';

export interface User {
  id: string | number;
  nom: string;
  email: string;
  role: string;
  actif?: boolean;
  dateInscription?: string;
}

export interface Professional {
  id: string | number;
  nom: string;
  email: string;
  role: string;
  specialite: string;
  verifiee: boolean;
  dateInscription: string;
}

export interface Testimonial {
  id: string | number;
  titre: string;
  contenu: string;
  statut: string;
  createdAt: string;
  updatedAt: string;
  utilisateurId: string | number;
}

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

export const useTemoignages = (page = 1, limit = 5, statut?: string) => {
  return useQuery<Testimonial[]>({
    queryKey: ['temoignages', { page, limit, statut }],
    queryFn: () =>
      apiClient.get(ENDPOINTS.TEMOIGNAGES, {
        _page: page,
        _limit: limit,
        _sort: 'id',
        _order: 'desc',
        ...(statut && { statut }),
      }),
  });
};

export const useUtilisateurs = () => {
  return useQuery<User[]>({
    queryKey: ['utilisateurs'],
    queryFn: () => apiClient.get(ENDPOINTS.UTILISATEURS),
  });
};

export const useProfessionnels = () => {
  return useQuery<Professional[]>({
    queryKey: ['professionnels'],
    queryFn: () => apiClient.get(ENDPOINTS.PROFESSIONNELS),
  });
};

export const useUpdateUtilisateur = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string | number; data: any }) =>
      apiClient.patch(ENDPOINTS.UTILISATEUR_BY_ID(id), data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['utilisateurs'] });
    },
  });
};

export const useDeleteUtilisateur = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string | number) =>
      apiClient.delete(ENDPOINTS.UTILISATEUR_BY_ID(id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['utilisateurs'] });
    },
  });
};

export const useCreateUtilisateur = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => apiClient.post(ENDPOINTS.UTILISATEURS, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['utilisateurs'] });
    },
  });
};

export const useUpdateProfessionnel = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string | number; data: any }) =>
      apiClient.patch(ENDPOINTS.PROFESSIONNEL_BY_ID(id), data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['professionnels'] });
    },
  });
};

export const useDeleteProfessionnel = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string | number) =>
      apiClient.delete(ENDPOINTS.PROFESSIONNEL_BY_ID(id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['professionnels'] });
    },
  });
};

export const useCreateProfessionnel = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => apiClient.post(ENDPOINTS.PROFESSIONNELS, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['professionnels'] });
    },
  });
};

export const useCreateTemoignage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { utilisateurId: number; titre: string; contenu: string }) =>
      apiClient.post(ENDPOINTS.TEMOIGNAGES, {
        ...data,
        statut: 'en attente',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }),
    onSuccess: () => {
      // Invalider et rafraîchir les témoignages
      queryClient.invalidateQueries({ queryKey: ['temoignages'] });
    },
  });
};

export const useUpdateTemoignageStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, statut }: { id: string | number; statut: string }) =>
      apiClient.patch(ENDPOINTS.TEMOIGNAGES + `/${id}`, {
        statut,
        updatedAt: new Date().toISOString(),
      }),
    onSuccess: () => {
      // Invalider et rafraîchir les témoignages
      queryClient.invalidateQueries({ queryKey: ['temoignages'] });
    },
  });
};

// Ajoutez d'autres hooks au besoin
