import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

interface Histoire {
  id: string;
  titre: string;
  recit: string;
  auteurId: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

const Histoire: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [histoire, setHistoire] = useState<Histoire | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHistoire = async () => {
      try {
        const response = await fetch(`/api/histoires/${id}`);
        if (!response.ok) throw new Error('Failed to fetch histoire');
        const data = await response.json();
        setHistoire(data);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchHistoire();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen page-bg">
        <div className="container mx-auto px-4 py-8 text-center">Loading histoire...</div>
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

  if (!histoire) {
    return (
      <div className="min-h-screen page-bg">
        <div className="container mx-auto px-4 py-8 text-center">Histoire not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen page-bg">
      {/* Header */}
      <header className="troubles-header p-4 flex justify-between items-center shadow-md">
        <div className="flex items-center">
          <img src="/black-logo.png" alt="WaxPsy Logo" className="h-10 mr-4" />
        </div>
        <nav className="hidden md:flex space-x-4 text-sm">
          <a href="/" className="text-green-700 hover:text-green-900">Accueil</a>
          <a href="/troubles" className="text-green-700 hover:text-green-900">Troubles</a>
          <a href="/articles" className="text-green-700 hover:text-green-900">Articles</a>
          <a href="/temoignages" className="text-green-700 hover:text-green-900">Témoignages</a>
          <a href="/professionals" className="text-green-700 hover:text-green-900">Professionnels</a>
          <a href="/glossaire" className="text-green-700 hover:text-green-900">Glossaire</a>
          <a href="/apropos" className="text-green-700 hover:text-green-900">A propos</a>
          <a href="/contact" className="text-green-700 hover:text-green-900">Contact</a>
          <a href="/profil" className="text-green-700 hover:text-green-900">Profil</a>
        </nav>
      </header>

      {/* Main Content */}
      <main className="p-8">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb/Sub-nav */}
          <nav className="flex items-center space-x-4 mb-6 text-sm text-gray-600">
            <span className="font-medium">Lire :</span>
            <a href={`/articles/${id}`} className="text-gray-500 hover:text-green-700">Article</a>
            <a href={`/histoires/${id}`} className="bg-green-100 text-green-800 px-4 py-2 rounded-full font-semibold">Histoire</a>
          </nav>

          {/* Histoire Title */}
          <h1 className="text-3xl font-bold mb-6 troubles-title text-center">{histoire.titre}</h1>

          {/* Histoire Image */}
          <div className="mb-6">
            <img src="/adhd.jpg" alt={`Illustration ${histoire.titre}`} className="w-full h-64 rounded-lg shadow-md object-cover" />
          </div>

          {/* Histoire Content */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <p className="text-gray-700 leading-relaxed mb-4">
              {histoire.recit}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Histoire;
