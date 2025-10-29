import React, { useState, useEffect } from "react";
import { API_BASE_URL } from "../config";
import { useNavigate, Link } from "react-router-dom";
import { ProfileSkeletonList } from "./skeletons";
import Footer from "./footer";

interface UtilisateurTemoignage {
  id: string;
  nom: string;
  email?: string;
  role?: string;
  avatar?: string;
  dateInscription?: string;
  actif?: boolean;
}

interface Temoignage {
  id: string;
  utilisateurId: string;
  titre: string;
  contenu: string;
  statut: string;
  likes?: number;
  userLiked?: boolean;
  commentaires?: unknown[];
  createdAt: string;
  updatedAt: string;
  utilisateur?: UtilisateurTemoignage;
}

// Liste des avatars par défaut au cas où l'utilisateur n'en a pas
const DEFAULT_AVATARS = [
  "avatar1.png",
  "avatar2.png",
  "avatar3.png",
  "avatar4.png",
  "avatar5.png",
  "avatar6.png",
  "avatar7.png",
  "avatar8.png",
];

const Temoignages: React.FC = () => {
  const navigate = useNavigate();
  const [temoignages, setTemoignages] = useState<Temoignage[]>([]);
  const [filteredTemoignages, setFilteredTemoignages] = useState<Temoignage[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedSort, setSelectedSort] = useState("recent");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const fetchTemoignages = async () => {
      try {
        setLoading(true);

        // Récupérer les témoignages et les utilisateurs
        const [temoignagesResponse, utilisateursResponse] = await Promise.all([
          fetch(`${API_BASE_URL}/temoignages`).then((res) => {
            if (!res.ok) throw new Error("Échec du chargement des témoignages");
            return res.json();
          }),
          fetch(`${API_BASE_URL}/utilisateurs`).then((res) => {
            if (!res.ok)
              throw new Error("Échec du chargement des utilisateurs");
            return res.json();
          }),
        ]);

        // Créer une Map pour un accès rapide aux utilisateurs par ID
        const utilisateursMap = new Map(
          Array.isArray(utilisateursResponse)
            ? utilisateursResponse.map((u: UtilisateurTemoignage) => [u.id, u])
            : []
        );

        // Traiter les témoignages
        const temoignagesTraites: Temoignage[] = [];

        if (Array.isArray(temoignagesResponse)) {
          temoignagesResponse.forEach((temoignage: any) => {
            // Vérifier si le témoignage est approuvé
            if (temoignage.statut === "approuvé") {
              const utilisateur = utilisateursMap.get(
                temoignage.utilisateurId?.toString()
              );

              // Créer une copie du témoignage avec les données utilisateur
              const temoignageAvecUtilisateur: Temoignage = {
                ...temoignage,
                likes: temoignage.likes || 0,
                userLiked: temoignage.userLiked || false,
                commentaires: temoignage.commentaires || [],
                utilisateur: {
                  id: utilisateur?.id || "inconnu",
                  nom: utilisateur?.nom || "Utilisateur inconnu",
                  email: utilisateur?.email,
                  role: utilisateur?.role || "utilisateur",
                  avatar:
                    utilisateur?.avatar ||
                    `/avatars/${
                      DEFAULT_AVATARS[
                        Math.floor(Math.random() * DEFAULT_AVATARS.length)
                      ]
                    }`,
                  dateInscription: utilisateur?.dateInscription,
                  actif:
                    utilisateur?.actif !== undefined ? utilisateur.actif : true,
                },
              };

              temoignagesTraites.push(temoignageAvecUtilisateur);
            }
          });
        }

        setTemoignages(temoignagesTraites);
        setError("");
      } catch (err) {
        console.error("Erreur de chargement des témoignages:", err);
        setError(
          "Erreur lors du chargement des témoignages. Veuillez réessayer plus tard."
        );
        // En cas d'erreur, on initialise avec un tableau vide
        setTemoignages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTemoignages();
  }, []);

  useEffect(() => {
    let filtered = [...temoignages];

    // Apply category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (t) =>
          t.contenu.toLowerCase().includes(selectedCategory.toLowerCase()) ||
          t.titre.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    }

    // Apply sort
    if (selectedSort === "recent") {
      filtered.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }

    setFilteredTemoignages(filtered);
  }, [temoignages, selectedSort, selectedCategory]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-white via-white to-blue-100">
        <div className="container mx-auto px-4 py-8">
          <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-8 animate-pulse"></div>
          <ProfileSkeletonList count={6} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-white via-white to-blue-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-green-800">
          Les témoignages
        </h1>
        <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
          Découvrez les expériences partagées par notre communauté et partagez
          la vôtre.
        </p>

        {/* Filters */}
        <div className="flex flex-col md:flex-row items-center justify-between bg-gray-100 rounded-lg px-4 py-3 mb-8 max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 w-full md:w-auto">
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 bg-white text-sm w-full md:w-auto"
            >
              <option value="recent">Filtrer par les plus récents</option>
              <option value="all">Tous</option>
            </select>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 bg-white text-sm w-full md:w-auto"
            >
              <option value="all">Toutes les catégories</option>
              <option value="anxiété">Anxiété</option>
              <option value="dépression">Dépression</option>
              <option value="tdah">TDAH</option>
              <option value="autisme">Autisme</option>
            </select>
          </div>
        </div>

        {/* Liste des témoignages */}
        <div className="space-y-6 max-w-4xl mx-auto mb-12">
          {filteredTemoignages.map((temoignage) => (
            <div
              key={temoignage.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <Link to={`/temoignages/${temoignage.id}`} className="block p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                      {temoignage.utilisateur?.avatar ? (
                        <img
                          src={temoignage.utilisateur.avatar}
                          alt={temoignage.utilisateur.nom || "Utilisateur"}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = `/avatars/${DEFAULT_AVATARS[0]}`;
                          }}
                        />
                      ) : (
                        <span className="text-gray-600 font-medium">
                          {temoignage.utilisateur?.nom
                            ?.charAt(0)
                            ?.toUpperCase() || "U"}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <h3 className="text-xl font-semibold text-gray-800 hover:text-green-600 transition-colors">
                        {temoignage.titre}
                      </h3>
                      <div className="text-sm text-gray-400 ml-auto">
                        {new Date(temoignage.createdAt).toLocaleDateString(
                          "fr-FR",
                          {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          }
                        )}
                      </div>
                    </div>

                    <p className="text-gray-600 mt-2 line-clamp-3">
                      {temoignage.contenu}
                    </p>

                    <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <svg
                          className="w-4 h-4 mr-1 text-red-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                          />
                        </svg>
                        <span>{temoignage.likes || 0} J'aime</span>
                      </div>
                      <div className="flex items-center">
                        <svg
                          className="w-4 h-4 mr-1 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                          />
                        </svg>
                        <span>
                          {temoignage.commentaires?.length || 0} Commentaires
                        </span>
                      </div>
                      
                      <div className="w-full sm:w-auto mt-2 sm:mt-0 ml-auto">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                          Lire la suite →
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {filteredTemoignages.length === 0 && (
          <p className="text-center text-gray-500 mt-12 text-lg">
            Aucun témoignage trouvé.
          </p>
        )}

        {/* CTA Section */}
        <div className="text-center bg-green-100 p-8 rounded-xl max-w-2xl mx-auto">
          <p className="text-lg text-green-800 mb-4">
            Voulez-vous témoigner, cliquer ici
          </p>
          <button
            onClick={() => navigate("/share-experience")}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
          >
            Témoigner
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Temoignages;
