import React, { useState, useEffect } from 'react';
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTroubles = async () => {
      try {
        const response = await fetch('/api/troubles');
        if (!response.ok) throw new Error('Failed to fetch troubles');
        const data = await response.json();
        setTroubles(data);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };
    fetchTroubles();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen page-bg">
        <div className="container mx-auto px-4 py-8 text-center">Loading troubles...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen page-bg">
        <div className="container mx-auto px-4 py-8 text-center text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen page-bg">
      {/* Header */}
      <Header />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-12 text-green-800">Troubles Psychologiques</h1>

        {/* Troubles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {troubles.map((trouble) => (
            <div key={trouble.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow">
              <img src={trouble.image} alt={trouble.nom} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h2 className="text-xl font-bold text-green-800 mb-3">{trouble.nom}</h2>
                <p className="text-gray-600 mb-4">{trouble.description}</p>
                {trouble.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {trouble.tags.map((tag, idx) => (
                      <span key={idx} className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">{tag}</span>
                    ))}
                  </div>
                )}
                <button
                  onClick={() => navigate(`/articles/${trouble.id}`)}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Lire l'article
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Troubles;
