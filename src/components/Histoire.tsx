import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ArticleDetailSkeleton } from "./skeletons";
import { API_BASE_URL } from "../config";

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
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHistoire = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/histoires/${id}`);
        if (!response.ok)
          throw new Error("Échec de la récupération de l'histoire");
        const histoireData = await response.json();
        setHistoire(histoireData);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err instanceof Error ? err.message : "Erreur inconnue");
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

  if (!histoire) {
    return (
      <div className="min-h-screen page-bg">
        <div className="container mx-auto px-4 py-8 text-center">
          Histoire non trouvée
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen page-bg">
      {/* Main Content */}
      <main className="p-8">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb/Sub-nav */}
          <nav className="flex items-center space-x-4 mb-6 text-sm text-gray-600">
            <span className="font-medium">Lire :</span>
            <a
              href={`/articles/${id}`}
              className="text-gray-500 hover:text-green-700"
            >
              Article
            </a>
            <a
              href={`/histoires/${id}`}
              className="bg-green-100 text-green-800 px-4 py-2 rounded-full font-semibold"
            >
              Histoire
            </a>
          </nav>

          {/* Histoire Title */}
          <h1 className="text-3xl font-bold mb-6 troubles-title text-center">
            {histoire.titre}
          </h1>

          {/* Histoire Image */}
          <div className="mb-6">
            <img
              src="/adhd.jpg"
              alt={`Illustration ${histoire.titre}`}
              className="w-full h-64 rounded-lg shadow-md object-cover bg-gray-200"
              loading="lazy"
            />
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
