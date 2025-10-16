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
  tags: string[];
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
        const response = await fetch("/db.json");
        if (!response.ok) throw new Error("Échec du chargement des données");
        const data = await response.json();
        if (data.troubles) {
          setTroubles(data.troubles);
        } else {
          throw new Error("Format de données inattendu");
        }
      } catch (err) {
        console.error("Erreur de chargement:", err);
        setError(
          "Erreur lors du chargement des troubles. Veuillez réessayer plus tard."
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

  if (error) {
    return (
      <div className="min-h-screen page-bg">
        <div className="container mx-auto px-4 py-8 text-center text-red-600">
          Erreur: {error}
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
                {trouble.tags && trouble.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {trouble.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <button
                  onClick={() => navigate(`/troubles/${trouble.id}`)}
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
