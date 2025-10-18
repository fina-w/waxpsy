import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "./Header";

interface Trouble {
  id: string;
  image: string;
  nom: string;
  description: string;
  symptomes: string[];
  causes: string;
  traitements: string;
}

const Troubles: React.FC = () => {
  const navigate = useNavigate();
  const [troubles, setTroubles] = useState<Trouble[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Chargement initial des données
  useEffect(() => {
    const fetchTroubles = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:3000/troubles");
        if (!response.ok) throw new Error("Échec du chargement des données");
        const data = await response.json();
        setTroubles(data);
      } catch (err) {
        console.error("Erreur de chargement:", err);
        setError(
          "Erreur lors du chargement des troubles. Veuillez vérifier que le serveur JSON est en cours d'exécution."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTroubles();
  }, []);

  // Gestion des erreurs d'image
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.src = "/placeholder.jpg";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-white via-white to-blue-100">
        <Header />
        <div className="container mx-auto px-4 py-8 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-6">
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
                    <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-white via-white to-blue-100">
        <Header />
        <div className="container mx-auto px-4 py-8 text-center">
          <div className="bg-red-50 border-l-4 border-red-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">
                  {error}
                </p>
                <div className="mt-4">
                  <button
                    onClick={() => window.location.reload()}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Réessayer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-white via-white to-blue-100">
        <Header />

      <main className="pt-24">
        <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-green-800">
          Troubles Psychologiques
        </h1>

        {/* Liste des troubles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {troubles.map((trouble) => (
            <div
              key={trouble.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="h-48 bg-gray-100 flex items-center justify-center">
                <img
                  src={trouble.image || "/placeholder.jpg"}
                  alt={trouble.nom || "Image non disponible"}
                  className="w-full h-full object-cover"
                  onError={handleImageError}
                />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold text-green-800 mb-3">
                  {trouble.nom}
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {trouble.description}
                </p>
                <button
                  onClick={() => {
                    // Rediriger vers la page d'article avec l'ID du trouble
                    navigate(`/articles/${trouble.id}`);
                    // Faire défiler vers le haut de la page
                    window.scrollTo(0, 0);
                  }}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors w-full"
                >
                  En savoir plus
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Indicateur de chargement */}
        {loading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-600"></div>
            <p className="mt-2 text-gray-600">Chargement des troubles...</p>
          </div>
        )}

        {!loading && troubles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              Aucun trouble trouvé pour cette recherche.
            </p>
          </div>
        )}
      </div>
      </main>
    </div>
  );
};

export default Troubles;
