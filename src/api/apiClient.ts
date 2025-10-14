const API_BASE_URL = 'http://localhost:3000';

export const apiClient = {
  async get<T>(endpoint: string, params?: Record<string, string | number>): Promise<T> {
    const url = new URL(`${API_BASE_URL}${endpoint}`);
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, String(value));
      });
    }
    
    const response = await fetch(url.toString());
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }
    
    return response.json();
  },

  async post<T>(endpoint: string, data: unknown): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    return response.json();
  },
};

export const ENDPOINTS = {
  TROUBLES: '/troubles',
  TROUBLE_BY_ID: (id: string | number) => `/troubles/${id}`,
  ARTICLES: '/articles',
  ARTICLE_BY_ID: (id: string | number) => `/articles/${id}`,
  TEMOIGNAGES: '/temoignages',
  PROFESSIONNELS: '/professionnels',
  PROFESSIONNEL_BY_ID: (id: string | number) => `/professionnels/${id}`,
  UTILISATEURS: '/utilisateurs',
  UTILISATEUR_BY_ID: (id: string | number) => `/utilisateurs/${id}`,
  // Ajoutez d'autres endpoints au besoin
};
