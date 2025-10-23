import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { CardSkeletonGrid } from "./skeletons";
import SearchFilters from "./ui/SearchFilters";

interface CategorieTrouble {
  id: number;
  libelle: string;
}

interface Trouble {
  id: string;
  image: string;
  nom: string;
  description: string;
  symptomes: string[];
  causes: string;
  traitements: string;
  categorieId: number;
}

const Troubles: React.FC = () => {
  const navigate = useNavigate();
  const [troubles, setTroubles] = useState<Trouble[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<number | "">("");
  const [categories, setCategories] = useState<CategorieTrouble[]>([]);

  const itemsPerPage = 6;

  // Chargement initial des données
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Charger les catégories
        const catResponse = await fetch("http://localhost:3000/categoriesTroubles");
        if (!catResponse.ok) throw new Error("Échec du chargement des catégories");
        const categoriesData = await catResponse.json();
        setCategories(categoriesData);

        // Charger les troubles
        const troublesResponse = await fetch("http://localhost:3000/troubles");
        if (!troublesResponse.ok) throw new Error("Échec du chargement des troubles");
        const troublesData = await troublesResponse.json();
        setTroubles(troublesData);

      } catch (err) {
        console.error("Erreur de chargement:", err);
        setError(
          "Erreur lors du chargement des données. Veuillez vérifier que le serveur JSON est en cours d'exécution."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Gestion de la recherche
  const handleSearch = useCallback((searchTerm: string) => {
    setSearchTerm(searchTerm);
    setCurrentPage(1);
  }, []);

  // Gestion du changement de filtre
  const handleFilterChange = useCallback((filterName: string, value: any) => {
    if (filterName === 'categorie') {
      setSelectedCategory(value === '' ? '' : Number(value));
      setCurrentPage(1);
    }
  }, []);

  // Filtrer les troubles en fonction de la recherche et de la catégorie sélectionnée
  const filteredTroubles = React.useMemo(() => {
    return troubles.filter(trouble => {
      const matchesSearch = !searchTerm ||
        trouble.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        trouble.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !selectedCategory || trouble.categorieId === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [troubles, searchTerm, selectedCategory]);

  // Calcul de la pagination
  const totalPages = Math.ceil(filteredTroubles.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTroubles = filteredTroubles.slice(indexOfFirstItem, indexOfLastItem);

  // Gestion du changement de page
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Gestion des erreurs d'image
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.src = "/placeholder.jpg";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-white via-white to-blue-100">
        <div className="container mx-auto px-4 py-8">
          <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-8 animate-pulse"></div>
          <CardSkeletonGrid count={6} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-white via-white to-blue-100">
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

  // Configuration des filtres pour SearchFilters
  const filters = [
    {
      name: 'categorie',
      label: 'catégories',
      type: 'select' as const,
      options: categories.map(cat => ({
        value: cat.id,
        label: cat.libelle
      })),
      placeholder: 'Toutes les catégories'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-white via-white to-blue-100">
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-gray-600 mb-8">
          Explorez notre base de données complète des troubles de santé mentale
        </p>

        {/* Composant de recherche et filtres simplifié */}
        <div className="mb-8 max-w-xl mx-auto">
          <SearchFilters
            onSearch={handleSearch}
            onFilterChange={handleFilterChange}
            filters={filters}
            searchPlaceholder="Rechercher un trouble..."
            className="space-y-4"
          />
        </div>

        {/* Filtres actifs */}
        {(searchTerm || selectedCategory) && (
          <div className="flex flex-wrap gap-2 mb-6">
            {searchTerm && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Recherche : {searchTerm}
                <button
                  onClick={() => handleSearch('')}
                  className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full bg-green-200 text-green-600 hover:bg-green-300 focus:outline-none"
                >
                  ×
                </button>
              </span>
            )}
            {selectedCategory && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Catégorie : {categories.find(c => c.id === selectedCategory)?.libelle}
                <button
                  onClick={() => handleFilterChange('categorie', '')}
                  className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full bg-blue-200 text-blue-600 hover:bg-blue-300 focus:outline-none"
                >
                  
                </button>
              </span>
            )}
          </div>
        )}

        {/* Indicateur de chargement */}
        {loading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-600"></div>
            <p className="mt-2 text-gray-600">Chargement des troubles...</p>
          </div>
        )}

        {/* Liste des troubles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {currentTroubles.map((trouble) => (
            <div
              key={trouble.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-transform duration-300 hover:-translate-y-1 h-full flex flex-col"
            >
              <div className="h-48 bg-gray-100 flex items-center justify-center">
                <img
                  src={trouble.image || "/placeholder.jpg"}
                  alt={trouble.nom || "Image non disponible"}
                  loading="lazy"
                  className="w-full h-full object-cover"
                  onError={handleImageError}
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h2 className="text-xl font-bold text-green-800 mb-3 line-clamp-2">
                  {trouble.nom}
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">
                  {trouble.description}
                </p>
                <button
                  onClick={() => {
                    // Rediriger vers la page d'article avec l'ID du trouble
                    navigate(`/articles/${trouble.id}`);
                    // Faire défiler vers le haut de la page
                    window.scrollTo(0, 0);
                  }}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors w-full mt-auto"
                >
                  En savoir plus
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-12">
            {/* Bouton Précédent */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg border border-green-600 text-green-600 hover:bg-green-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Précédent
            </button>

            {/* Numéros de page */}
            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={`w-10 h-10 rounded-lg transition-colors ${
                    currentPage === pageNumber
                      ? 'bg-green-600 text-white'
                      : 'border border-green-600 text-green-600 hover:bg-green-50'
                  }`}
                >
                  {pageNumber}
                </button>
              ))}
            </div>

            {/* Bouton Suivant */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg border border-green-600 text-green-600 hover:bg-green-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Suivant
            </button>
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
    </div>
  );
};

export default Troubles;
