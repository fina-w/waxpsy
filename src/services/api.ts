import { API_BASE_URL } from '../config';

export const fetchEvenements = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/evenements`);
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des événements');
    }
    return await response.json();
  } catch (error) {
    console.error('Erreur API:', error);
    throw error;
  }
};

export const createEvenement = async (evenement: any) => {
  try {
    const response = await fetch(`${API_BASE_URL}/evenements`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(evenement),
    });
    if (!response.ok) {
      throw new Error('Erreur lors de la création de l\'événement');
    }
    return await response.json();
  } catch (error) {
    console.error('Erreur API:', error);
    throw error;
  }
};
