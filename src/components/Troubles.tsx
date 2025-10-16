import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from './Header';

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
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  // Fonction de chargement des troubles
  const loadTroubles = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/troubles');
      if (!response.ok) throw new Error('Erreur lors du chargement des troubles');
      const data = await response.json();
      setTroubles(data);
    } catch (err) {
      setError('Erreur lors du chargement des troubles');
      console.error('Erreur:', err);
    } finally {
      setLoading(false);
    }
  };

  // Chargement initial des données
  useEffect(() => {
    loadTroubles();
  }, []);

  // Extraction des tags uniques pour les filtres
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    troubles.forEach(trouble => {
      trouble.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags);
  }, [troubles]);

  // Filtrage des troubles en fonction de la recherche et des filtres
  const filteredTroubles = useMemo(() => {
    return troubles.filter(trouble => {
      // Filtre par recherche
      const matchesSearch = !searchQuery || 
        trouble.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trouble.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trouble.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      // Filtre par tag
      const matchesTag = !selectedTag || trouble.tags.includes(selectedTag);
      
      return matchesSearch && matchesTag;
    });
  }, [troubles, searchQuery, selectedTag]);

  // Fonction pour réinitialiser les filtres
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedTag('');
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
    <div className="min-h-screen page-bg">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-green-800">
          Troubles Psychologiques
        </h1>

        {/* Barre de recherche et filtres */}
        <div className="mb-8 bg-white p-4 rounded-lg shadow-md">
          <div className="mb-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher un trouble..."
              className="w-full p-2 border rounded"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Filtrer par tag
              </label>
              <select
                value={filters.tag}
                onChange={(e) => setFilters({...filters, tag: e.target.value})}
                className="w-full p-2 border rounded"
              >
                <option value="">Tous les tags</option>
                {allTags.map(tag => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tri par
              </label>
              <select
                value={`${sortBy}_${sortOrder}`}
                onChange={(e) => {
                  const [sort, order] = e.target.value.split('_');
                  setSortBy(sort);
                  setSortOrder(order as 'asc' | 'desc');
                }}
                className="w-full p-2 border rounded"
              >
                <option value="nom_asc">Nom (A-Z)</option>
                <option value="nom_desc">Nom (Z-A)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Liste des troubles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {troubles.map((trouble, index) => (
            <div 
              key={trouble.id} 
              ref={index === troubles.length - 1 ? lastTroubleRef : null}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-transform duration-300 hover:-translate-y-1"
            >
              <img 
                src={trouble.image} 
                alt={trouble.nom} 
                className="w-full h-48 object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/placeholder.jpg';
                }}
              />
              <div className="p-6">
                <h2 className="text-xl font-bold text-green-800 mb-3">
                  {trouble.nom}
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {trouble.description}
                </p>
                {trouble.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {trouble.tags.map((tag, idx) => (
                      <span 
                        key={idx} 
                        className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs cursor-pointer hover:bg-green-200"
                        onClick={() => setFilters({...filters, tag})}
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

        {/* Bouton "Charger plus" (optionnel) */}
        {!loading && hasMore && (
          <div className="text-center mt-8">
            <button
              onClick={() => loadTroubles(page + 1)}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Charger plus de troubles
            </button>
          </div>
        )}

        {!loading && troubles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Aucun trouble trouvé pour cette recherche.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Troubles;