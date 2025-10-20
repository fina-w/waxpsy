export interface Trouble {
  id: string;
  image: string;
  nom: string;
  description: string;
  symptomes?: string[];
  causes?: string;
  traitements?: string;
  tags?: string[];
}

export interface Article {
  id: string;
  troubleId: string;
  titre: string;
  contenu: string;
  auteurId?: number;
  tags?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Temoignage {
  id: string;
  utilisateurId: number | string;
  titre: string;
  contenu: string;
  statut: string;
  createdAt?: string;
  updatedAt: string;
  dateCreation?: string;
}

export interface Utilisateur {
  id: string;
  nom: string;
  email?: string;
  motDePasse?: string;
  role?: string;
  createdAt?: string;
}

export interface Histoire {
  id: string;
  troubleId: number;
  titre: string;
  recit: string;
  auteurId?: number;
  statut?: string;
  createdAt?: string;
  updatedAt?: string;
}
