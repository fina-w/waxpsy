export interface Professionnel {
  id: string;
  nom: string;
  prenom: string;
  specialite: string;
  description: string;
  experience: number;
  note: number;
  avis: number;
  photo: string;
  localisation: string;
  tarif: number;
  langues: string[];
  formations: string[];
  disponibilites: {
    jour: string;
    heures: string[];
  }[];
  services: {
    nom: string;
    duree: number; // en minutes
    prix: number;
  }[];
}
