import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config';
import { useNavigate } from 'react-router-dom';
import { TemoignageSkeletonGrid } from './skeletons';

interface UtilisateurTemoignage {
  id?: number;
  nom?: string;
  email?: string;
  role?: string;
  avatar?: string;
}

interface Temoignage {
  id: string;
  utilisateurId: number;
  titre: string;
  contenu: string;
  statut: string;
  createdAt: string;
  updatedAt: string;
  utilisateur?: UtilisateurTemoignage;
}

// Liste des avatars par défaut au cas où l'utilisateur n'en a pas
const DEFAULT_AVATARS = [
  'avatar1.png',
  'avatar2.png',
  'avatar3.png',
  'avatar4.png',
  'avatar5.png',
  'avatar6.png',
  'avatar7.png',
  'avatar8.png'
];

const Temoignages: React.FC = () => {
  const navigate = useNavigate();
  const [temoignages, setTemoignages] = useState<Temoignage[]>([]);
  const [filteredTemoignages, setFilteredTemoignages] = useState<Temoignage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedSort, setSelectedSort] = useState('recent');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const fetchTemoignages = async () => {
      try {
        setLoading(true);
        
        // Récupérer les témoignages
        const [temoignagesResponse, utilisateursResponse] = await Promise.all([
          fetch(`${API_BASE_URL}/temoignages`),
          fetch(`${API_BASE_URL}/utilisateurs`)
        ]);
        
        if (!temoignagesResponse.ok) throw new Error('Échec du chargement des témoignages');
        if (!utilisateursResponse.ok) throw new Error('Échec du chargement des utilisateurs');
        
        const [temoignagesData, utilisateurs] = await Promise.all([
          temoignagesResponse.json(),
          utilisateursResponse.json()
        ]);
        
        // Filtrer et enrichir les témoignages avec les données utilisateur
        const temoignagesTraites: Temoignage[] = Array.isArray(temoignagesData) 
          ? temoignagesData
              .filter((t: Temoignage) => t.statut === 'approuvé')
              .map((temoignage: Temoignage) => {
                const utilisateur = Array.isArray(utilisateurs) 
                  ? utilisateurs.find((u: UtilisateurTemoignage) => u.id === temoignage.utilisateurId) 
                  : null;
                
                const temoignageAvecUtilisateur: Temoignage = {
                  ...temoignage,
                  utilisateur: {
                    id: utilisateur?.id,
                    nom: utilisateur?.nom || 'Utilisateur inconnu',
                    email: utilisateur?.email,
                    role: utilisateur?.role,
                    avatar: utilisateur?.avatar ||
                      `/avatars/${DEFAULT_AVATARS[Math.floor(Math.random() * DEFAULT_AVATARS.length)]}`
                  }
                };
                
                return temoignageAvecUtilisateur;
              })
          : [];
          
        setTemoignages(temoignagesTraites);
        setError('');
      } catch (err) {
        console.error('Erreur de chargement:', err);
        setError('Erreur lors du chargement des témoignages. Veuillez réessayer plus tard.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchTemoignages();
  }, []);

  useEffect(() => {
    let filtered = [...temoignages];

    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(t =>
        t.contenu.toLowerCase().includes(selectedCategory.toLowerCase()) ||
        t.titre.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    }

    // Apply sort
    if (selectedSort === 'recent') {
      filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    setFilteredTemoignages(filtered);
  }, [temoignages, selectedSort, selectedCategory]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-white via-white to-blue-100">
        <div className="container mx-auto px-4 py-8">
          <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-8 animate-pulse"></div>
          <TemoignageSkeletonGrid count={6} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-white via-white to-blue-100">
        <div className="container mx-auto px-4 py-8 text-center">
          <div className="bg-red-50 border-l-4 border-red-400 p-4 max-w-2xl mx-auto">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-red-700">{error}</p>
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
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-12 text-green-800">Les témoignages</h1>

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

        {/* Testimonials Cards */}
        <div className="grid grid-cols-1 gap-6 max-w-4xl mx-auto mb-12">
          {filteredTemoignages.map((temoignage, index) => (
            <div key={temoignage.id} className={`bg-white rounded-xl shadow-lg p-6 relative border border-green-200 z-${index % 10}`}>
              <div className="flex items-start gap-4">
                <div className="relative">
                  <img 
                    src={`/avatars/${temoignage.utilisateur?.avatar || DEFAULT_AVATARS[0]}`} 
                    alt={temoignage.utilisateur?.nom || 'Utilisateur'}
                    loading="lazy"
                    className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md relative z-10 -mt-4"
                    onError={(e) => {
                      // En cas d'erreur de chargement de l'image, utiliser un avatar par défaut
                      const target = e.target as HTMLImageElement;
                      target.src = `/avatars/${DEFAULT_AVATARS[0]}`;
                    }}
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold troubles-title">{temoignage.titre}</h3>
                    <span className="text-sm text-gray-500">{temoignage.utilisateur?.nom}</span>
                  </div>
                  <p className="text-gray-700 mt-2">{temoignage.contenu}</p>
                  <p className="text-sm text-gray-500 mt-2">Publié le {new Date(temoignage.createdAt).toLocaleDateString('fr-FR')}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTemoignages.length === 0 && (
          <p className="text-center text-gray-500 mt-12 text-lg">Aucun témoignage trouvé.</p>
        )}

        {/* CTA Section */}
        <div className="text-center bg-green-100 p-8 rounded-xl max-w-2xl mx-auto">
          <p className="text-lg text-green-800 mb-4">Voulez-vous témoigner, cliquer ici</p>
          <button
            onClick={() => navigate('/share-experience')}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
          >
            Témoigner
          </button>
        </div>
      </div>
    </div>
  );
};

export default Temoignages;