import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header';

interface Article {
  id: string;
  titre: string;
  contenu: string;
  auteurId: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

const Articles: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch('/db.json');
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
        const foundArticle = data.articles.find((article: Article) => article.id === id);
        if (!foundArticle) throw new Error('Article not found');
        setArticle(foundArticle);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchArticle();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen page-bg">
        <div className="container mx-auto px-4 py-8 text-center">Loading article...</div>
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

  if (!article) {
    return (
      <div className="min-h-screen page-bg">
        <div className="container mx-auto px-4 py-8 text-center">Article not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen page-bg">
      {/* Header */}
          <Header />

      {/* Main Content */}
      <main className="p-8">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb/Sub-nav */}
          <nav className="flex items-center space-x-4 mb-6 text-sm text-gray-600">
            <span className="font-medium">Lire :</span>
            <a href={`/articles/${id}`} className="bg-green-100 text-green-800 px-4 py-2 rounded-full font-semibold">Article</a>
            <a href={`/histoires/${id}`} className="text-gray-500 hover:text-green-700">Histoire</a>
          </nav>

          {/* Article Title */}
          <h1 className="text-3xl font-bold mb-6 troubles-title text-center">{article.titre}</h1>

          {/* Article Image */}
          <div className="mb-6">
            <img src="/adhd.jpg" alt={`Illustration ${article.titre}`} className="w-full h-64 rounded-lg shadow-md object-cover" />
          </div>

          {/* Article Content */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <p className="text-gray-700 leading-relaxed mb-4">
              {article.contenu}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Articles;
