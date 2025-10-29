import { API_BASE_URL } from "../config";

export interface Avis {
  id: string;
  professionnelId: string;
  utilisateurId: string;
  utilisateurNom: string;
  utilisateurAvatar?: string;
  note: number;
  commentaire?: string;
  date: string;
  statut: "en_attente" | "approuve" | "rejete";
}

export interface CreateAvisData {
  professionnelId: string;
  utilisateurId: string;
  note: number;
  commentaire?: string;
}

export const getAvisByProfessionnel = async (
  professionnelId: string
): Promise<Avis[]> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/avis?professionnelId=${professionnelId}&statut=approuve`
    );

    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des avis");
    }

    return await response.json();
  } catch (error) {
    console.error("Erreur dans getAvisByProfessionnel:", error);
    throw error;
  }
};

export const createAvis = async (data: CreateAvisData): Promise<Avis> => {
  try {
    const response = await fetch(`${API_BASE_URL}/avis`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        date: new Date().toISOString(),
        statut: "en_attente",
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Erreur lors de la création de l'avis"
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Erreur dans createAvis:", error);
    throw error;
  }
};

export const getAvisStats = async (professionnelId: string) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/avis/stats?professionnelId=${professionnelId}`
    );

    if (!response.ok) {
      throw new Error(
        "Erreur lors de la récupération des statistiques des avis"
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Erreur dans getAvisStats:", error);
    throw error;
  }
};

export const canUserReview = async (
  professionnelId: string,
  utilisateurId: string
): Promise<boolean> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/rendezVous?professionnelId=${professionnelId}&utilisateurId=${utilisateurId}&statut=termine`
    );

    if (!response.ok) {
      throw new Error("Erreur lors de la vérification des rendez-vous");
    }

    const rendezVous = await response.json();
    return rendezVous.length > 0;
  } catch (error) {
    console.error("Erreur dans canUserReview:", error);
    return false;
  }
};
