const API_BASE_URL = '/api';

export const apiClient = {
  async get<T>(endpoint: string, params?: Record<string, string | number>): Promise<T> {
    let url = `${API_BASE_URL}${endpoint}`;

    if (params) {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        searchParams.append(key, String(value));
      });
      url += `?${searchParams.toString()}`;
    }

    const response = await fetch(url);

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

  async patch<T>(endpoint: string, data: unknown): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PATCH',
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

  async delete<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
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
