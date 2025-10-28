import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ArticleDetailSkeleton } from "./skeletons";

interface Trouble {
  id: string;
  nom: string;
  description: string;
  symptomes: string[];
  causes: string;
  traitements: string;
  tags: string[];
  image?: string;
}

interface Article {
  id: string;
  troubleId: string;
  titre: string;
  contenu: string;
  auteurId: string;
  tags: string[];
  trouble?: Trouble;
  createdAt: string;
  updatedAt: string;
}

const Articles: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch("/db.json");
        if (!response.ok) throw new Error("Échec du chargement des données");
        const data = await response.json();

        const foundArticle = data.articles.find((a: Article) => a.id === id);
        if (!foundArticle) throw new Error("Article non trouvé");

        // Trouver le trouble associé
        const relatedTrouble = data.troubles.find(
          (t: Trouble) => t.id === foundArticle.troubleId
        );

        // Fusionner les données
        setArticle({
          ...foundArticle,
          trouble: relatedTrouble,
        });
      } catch (err) {
        console.error("Erreur:", err);
        setError(err instanceof Error ? err.message : "Erreur inconnue");
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
      <div className="min-h-screen bg-gradient-to-r from-white via-white to-blue-100">
        <div className="p-8">
          <ArticleDetailSkeleton />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen page-bg">
        <div className="container mx-auto px-4 py-8 text-center text-red-600">
          Erreur: {error}
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen page-bg">
        <div className="container mx-auto px-4 py-8 text-center">
          Article non trouvé
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen page-bg">
      <div className="max-w-4xl mx-auto px-4">
        {/* Navigation */}
        <nav className="flex items-center space-x-4 mb-8 text-sm text-gray-600">
          <span className="font-medium">Lire :</span>
          <a
            href={`/articles/${id}`}
            className="bg-green-100 text-green-800 px-4 py-2 rounded-full font-semibold"
          >
            Article
          </a>
          <a
            href={`/histoires/${id}`}
            className="text-gray-500 hover:text-green-700"
          >
            Histoire
          </a>
        </nav>

        {/* Titre de l'article */}
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          {article.titre}
        </h1>

        {/* Section Trouble associé */}
        {article.trouble && (
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {article.trouble.nom}
              </h1>
              <div className="w-24 h-1 bg-green-500 mx-auto"></div>
            </div>

            {/* Image du trouble */}
            {article.trouble.image && (
              <div className="mb-8 rounded-lg overflow-hidden shadow-md">
                <img
                  src={
                    article.trouble.image.startsWith("http")
                      ? article.trouble.image
                      : `/${article.trouble.image}`
                  }
                  alt={article.trouble.nom}
                  className="w-full h-80 object-cover bg-gray-200"
                  loading="lazy"
                />
              </div>
            )}

            {/* Description */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="w-2 h-6 bg-green-500 mr-2"></span>
                Description
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {article.trouble.description}
              </p>
            </section>

            {/* Symptômes */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="w-2 h-6 bg-green-500 mr-2"></span>
                Symptômes
              </h2>
              <ul className="space-y-2 pl-5">
                {article.trouble.symptomes.map((symptome, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <span className="text-gray-700">{symptome}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Causes */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="w-2 h-6 bg-green-500 mr-2"></span>
                Causes
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {article.trouble.causes}
              </p>
            </section>

            {/* Traitements */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="w-2 h-6 bg-green-500 mr-2"></span>
                Traitements
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {article.trouble.traitements}
              </p>
            </section>

            {/* Tags */}
            {article.trouble.tags && article.trouble.tags.length > 0 && (
              <section className="pt-6 border-t border-gray-200">
                <div className="flex flex-wrap gap-2">
                  {article.trouble.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Articles;
