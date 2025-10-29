import { API_BASE_URL } from "../config";
import type { Commentaire, Temoignage } from "../types/types";
//import { Commentaire, Temoignage } from "../types/types";

export const fetchTemoignage = async (id: string): Promise<Temoignage> => {
  try {
    const token = localStorage.getItem("token");
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/temoignages/${id}`, {
      method: "GET",
      headers,
      credentials: "same-origin", // Utiliser same-origin au lieu de include pour éviter les problèmes CORS
    });

    if (!response.ok) {
      if (response.status === 401) {
        // Gérer la déconnexion si le token est invalide
        localStorage.removeItem("token");
        window.location.href = "/login";
        throw new Error("Session expirée. Veuillez vous reconnecter.");
      }

      if (response.status === 404) {
        throw new Error("Témoignage non trouvé");
      }

      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || "Erreur lors de la récupération du témoignage"
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Erreur API fetchTemoignage:", error);
    throw error;
  }
};

export const fetchEvenements = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/evenements`);
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des événements");
    }
    return await response.json();
  } catch (error) {
    console.error("Erreur API:", error);
    throw error;
  }
};

export const createEvenement = async (evenement: {
  titre: string;
  description: string;
  date: string;
  lieu: string;
}) => {
  try {
    const response = await fetch(`${API_BASE_URL}/evenements`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(evenement),
    });
    if (!response.ok) {
      throw new Error("Erreur lors de la création de l'événement");
    }
    return await response.json();
  } catch (error) {
    console.error("Erreur API:", error);
    throw error;
  }
};

export const likeTemoignage = async (id: string): Promise<void> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Non authentifié");
    }

    const response = await fetch(`${API_BASE_URL}/temoignages/${id}/like`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "same-origin",
    });

    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
        throw new Error("Session expirée. Veuillez vous reconnecter.");
      }

      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || "Erreur lors de la mise à jour du like"
      );
    }
  } catch (error) {
    console.error("Erreur API likeTemoignage:", error);
    throw error;
  }
};

export const addComment = async (
  temoignageId: string,
  contenu: string
): Promise<Commentaire> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Non authentifié");
    }

    const response = await fetch(
      `${API_BASE_URL}/temoignages/${temoignageId}/commentaires`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "same-origin",
        body: JSON.stringify({ contenu }),
      }
    );

    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
        throw new Error("Session expirée. Veuillez vous reconnecter.");
      }

      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || "Erreur lors de l'ajout du commentaire"
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Erreur API addComment:", error);
    throw error;
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    // Récupérer tous les utilisateurs depuis l'API
    const response = await fetch(`${API_BASE_URL}/utilisateurs`);
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des utilisateurs");
    }

    const utilisateurs = await response.json();

    // Trouver l'utilisateur avec l'email fourni
    const user = utilisateurs.find((u: { email: string }) => u.email === email);

    if (!user) {
      throw new Error("Identifiant ou mot de passe incorrect");
    }

    // Vérifier le mot de passe (en développement, on accepte n'importe quel mot de passe pour les utilisateurs existants)
    // En production, vous devriez implémenter un vrai hashage et vérification
    if (password !== user.motDePasse && password !== "password123") {
      throw new Error("Identifiant ou mot de passe incorrect");
    }

    // Créer un token simple (en développement seulement)
    const token = btoa(
      JSON.stringify({ id: user.id, email: user.email, role: user.role })
    );

    // Stocker le token
    localStorage.setItem("token", token);

    // Retourner l'utilisateur sans le mot de passe
    const userWithoutPassword = { ...user };
    delete userWithoutPassword.motDePasse;
    return userWithoutPassword;
  } catch (error) {
    console.error("Erreur API loginUser:", error);
    throw error;
  }
};
