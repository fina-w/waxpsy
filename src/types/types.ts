interface BaseEntity {
  id: string;
  createdAt?: string;
  updatedAt?: string;
}

export type UserRole = "utilisateur" | "professionnel" | "administrateur";

export interface Utilisateur extends BaseEntity {
  nom: string;
  prenom?: string;
  email: string;
  motDePasse?: string;
  role: UserRole;
  dateInscription?: string;
  actif?: boolean;
  avatar?: string;
  telephone?: string;
  bio?: string;
}

export interface Trouble extends BaseEntity {
  id: string;
  categorieId: number;
  image: string;
  nom: string;
  description: string;
  symptomes?: string[];
  causes?: string[];
  traitements?: string[];
  tags?: string[];
  conseils?: string[];
  ressourcesUtiles?: Array<{
    titre: string;
    url: string;
    type: "article" | "video" | "lien";
  }>;
}

export interface Article extends BaseEntity {
  troubleId: string;
  titre: string;
  contenu: string;
  auteurId?: string;
  imageUrl?: string;
  tags?: string[];
  statut?: "brouillon" | "publié" | "archivé";
  datePublication?: Date;
  vues?: number;
  tempsLecture?: number; // en minutes
}

export interface Temoignage extends BaseEntity {
  utilisateurId: number;
  titre: string;
  contenu: string;
  note?: number;
  statut: "en_attente" | "approuvé" | "rejeté";
  dateCreation?: Date;
  metadonnees?: {
    anonyme?: boolean;
    troubleId?: string;
    professionnelId?: string;
  };
  likes?: number;
  userLiked?: boolean;
  commentaires?: Commentaire[];
  utilisateur?: Utilisateur;
}

export interface Histoire extends BaseEntity {
  troubleId: number;
  titre: string;
  recit: string;
  auteurId?: number;
  statut?: "brouillon" | "publié" | "archivé";
  imageUrl?: string;
  extrait?: string;
  motsCles?: string[];
  updatedAt?: string;
}

export interface Commentaire {
  id: number;
  contenu: string;
  utilisateur: Utilisateur;
  createdAt: Date;
  updatedAt: Date;
}
