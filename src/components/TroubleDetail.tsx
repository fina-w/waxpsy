import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
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

interface Article {
  id: string;
  troubleId: string;
  titre: string;
  contenu: string;
}

const TroubleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [trouble, setTrouble] = useState<Trouble | null>(null);
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/db.json');
        if (!response.ok) throw new Error('Échec du chargement des données');
        
        const data = await response.json();
        
        // Trouver le trouble correspondant
        const foundTrouble = data.troubles.find((t: Trouble) => t.id === id);
        if (!foundTrouble) throw new Error('Trouble non trouvé');
        
        setTrouble(foundTrouble);
        
        // Trouver l'article associé
        const foundArticle = data.articles.find(
          (a: Article) => a.troubleId === id
        );
        
        if (foundArticle) {
          setArticle(foundArticle);
        }
        
      } catch (err) {
        console.error('Erreur de chargement:', err);
        setError(
          err instanceof Error ? err.message : 'Une erreur est survenue'
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-white via-white to-blue-100">
        <Header />
        <div className="pt-24 text-center py-20">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
          <p className="mt-4 text-gray-600">Chargement en cours...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-white via-white to-blue-100">
        <Header />
        <div className="pt-24 text-center py-20">
          <p className="text-red-600">Erreur : {error}</p>
          <button
            onClick={() => navigate('/troubles')}
            className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Retour à la liste des troubles
          </button>
        </div>
      </div>
    );
  }

  if (!trouble) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-white via-white to-blue-100">
        <Header />
        <div className="pt-24 text-center py-20">
          <p className="text-gray-700">Aucun trouble trouvé avec cet identifiant.</p>
          <button
            onClick={() => navigate('/troubles')}
            className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Retour à la liste des troubles
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-white via-white to-blue-100">
      <Header />
      
      <main className="pt-24 px-4 py-8">
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          {/* En-tête avec image */}
          <div className="h-64 bg-gray-100 relative">
            <img
              src={trouble.image || '/placeholder.jpg'}
              alt={trouble.nom}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/placeholder.jpg';
              }}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                {trouble.nom}
              </h1>
            </div>
          </div>

          <div className="p-6 md:p-8">
            {/* Tags */}
            {trouble.tags && trouble.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {trouble.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Description */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-green-800 mb-4">Description</h2>
              <p className="text-gray-700 leading-relaxed">
                {trouble.description}
              </p>
            </section>

            {/* Symptômes */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-green-800 mb-4">Symptômes</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                {trouble.symptomes.map((symptome, idx) => (
                  <li key={idx}>{symptome}</li>
                ))}
              </ul>
            </section>

            {/* Causes */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-green-800 mb-4">Causes</h2>
              <p className="text-gray-700 leading-relaxed">
                {trouble.causes}
              </p>
            </section>

            {/* Traitements */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-green-800 mb-4">Traitements</h2>
              <p className="text-gray-700 leading-relaxed">
                {trouble.traitements}
              </p>
            </section>

            {/* Article associé */}
            {article && (
              <section className="mt-12 bg-green-50 p-6 rounded-lg">
                <h2 className="text-2xl font-bold text-green-800 mb-4">Article associé</h2>
                <h3 className="text-xl font-semibold mb-2">{article.titre}</h3>
                <p className="text-gray-700 mb-4 line-clamp-3">
                  {article.contenu.substring(0, 200)}...
                </p>
                <Link
                  to={`/articles/${article.id}`}
                  className="text-green-600 hover:text-green-800 font-medium inline-flex items-center"
                >
                  Lire l'article complet
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </section>
            )}

            {/* Bouton de retour */}
            <div className="mt-12 text-center">
              <button
                onClick={() => navigate('/troubles')}
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors inline-flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                Retour à la liste des troubles
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TroubleDetail;
