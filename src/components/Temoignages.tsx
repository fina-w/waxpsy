import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import { useTemoignages, type Testimonial } from '../hooks/useApi';

interface Temoignage {
  id: string;
  utilisateurId: number;
  titre: string;
  contenu: string;
  statut: string;
  createdAt: string;
  updatedAt: string;
}

const Temoignages: React.FC = () => {
  const navigate = useNavigate();
  const { data: temoignages, isLoading: loading, error } = useTemoignages(1, 1000, 'approuvé');
  const [filteredTemoignages, setFilteredTemoignages] = useState<Testimonial[]>([]);
  const [selectedSort, setSelectedSort] = useState('recent');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    if (!temoignages || !Array.isArray(temoignages)) return;

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
      <div className="min-h-screen page-bg">
        <div className="container mx-auto px-4 py-8 text-center">Loading testimonials...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen page-bg">
        <div className="container mx-auto px-4 py-8 text-center text-red-600">Error: {error.message}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen page-bg">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="p-8">
        <h1 className="text-4xl font-bold text-center mb-8 troubles-title">Les témoignages</h1>

        {/* Filters */}
        <div className="flex flex-row items-center justify-between bg-gray-100 rounded-lg px-4 py-3 mb-8 max-w-4xl mx-auto">
          <div className="flex items-center space-x-4">
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 bg-white text-sm"
            >
              <option value="recent">Filtrer par les plus récents</option>
              <option value="all">Tous</option>
            </select>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 bg-white text-sm"
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
                <img src={`https://via.placeholder.com/80x80?text=User`} alt="User" className="w-20 h-20 rounded-full object-cover relative z-10 -mt-4 border-4 border-white shadow-md" />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold troubles-title">{temoignage.titre}</h3>
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
      </main>
    </div>
  );
};

export default Temoignages;
