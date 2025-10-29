import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchTemoignage } from "../services/api";

import type { Temoignage } from "../types/types";

const TemoignageDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [temoignage, setTemoignage] = useState<Temoignage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadTemoignage = async () => {
      if (!id) {
        setError("Aucun identifiant de témoignage fourni");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        // Récupérer le témoignage depuis l'API
        const temoignageData = await fetchTemoignage(id);
        setTemoignage(temoignageData);
        setError("");
      } catch (err) {
        console.error("Erreur lors du chargement du témoignage:", err);
        setError(
          "Impossible de charger le témoignage. Veuillez réessayer plus tard."
        );
        setTemoignage(null);
      } finally {
        setLoading(false);
      }
    };

    loadTemoignage();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto p-4 max-w-4xl">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="flex items-center space-x-4">
            <div className="rounded-full bg-gray-200 h-12 w-12"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/3"></div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 max-w-4xl">
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">
                {error}{" "}
                <Link
                  to="/temoignages"
                  className="font-medium underline text-red-700 hover:text-red-600"
                >
                  Retour aux témoignages
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!temoignage) {
    return (
      <div className="container mx-auto p-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <h2 className="text-xl font-semibold mb-4">Témoignage non trouvé</h2>
          <Link
            to="/temoignages"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retour aux témoignages
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Link
        to="/temoignages"
        className="inline-flex items-center text-blue-500 hover:text-blue-700 mb-4 transition-colors"
      >
        <svg
          className="w-5 h-5 mr-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Retour aux témoignages
      </Link>

      <article className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          {temoignage.titre}
        </h1>

        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mr-3">
            {temoignage.utilisateur?.avatar ? (
              <img
                src={temoignage.utilisateur.avatar}
                alt={temoignage.utilisateur.nom || "Utilisateur"}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-600 font-medium">
                {(temoignage.utilisateur?.nom || "U").charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          <div>
            <p className="font-medium text-gray-800">
              {temoignage.utilisateur?.nom || "Utilisateur anonyme"}
            </p>
            <p className="text-sm text-gray-500">
              {temoignage.dateCreation?.toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              }) || "Date inconnue"}
            </p>
          </div>
        </div>

        <div className="prose max-w-none mb-6 text-gray-700">
          <p className="whitespace-pre-line">{temoignage.contenu}</p>
        </div>

        <div className="flex items-center border-t border-b border-gray-100 py-3 my-4">
          <button
            className={`flex items-center ${
              temoignage.userLiked
                ? "text-red-500"
                : "text-gray-500 hover:text-red-500"
            } transition-colors`}
            disabled={true}
            title="Connectez-vous pour aimer"
          >
            <svg
              className="w-6 h-6 mr-1"
              fill={temoignage.userLiked ? "currentColor" : "none"}
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            {temoignage.likes || 0}{" "}
            {(temoignage.likes || 0) <= 1 ? "J'aime" : "J'aime"}
          </button>
        </div>
      </article>

      <section className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Commentaires ({temoignage.commentaires?.length || 0})
        </h2>

        <div className="space-y-4">
          {!temoignage.commentaires || temoignage.commentaires.length === 0 ? (
            <p className="text-gray-500 text-center py-4">
              Aucun commentaire pour le moment. Soyez le premier à réagir !
            </p>
          ) : (
            temoignage.commentaires.map((comment) => (
              <div key={comment.id} className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                    {comment.utilisateur?.avatar ? (
                      <img
                        src={comment.utilisateur.avatar}
                        alt={comment.utilisateur.nom || "Utilisateur"}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-gray-600 text-sm">
                        {(comment.utilisateur?.nom || "U")
                          .charAt(0)
                          .toUpperCase()}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex-1 bg-gray-50 rounded-lg p-3">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <h3 className="font-medium text-gray-800">
                      {comment.utilisateur?.nom || "Utilisateur anonyme"}
                    </h3>
                    <span className="text-xs text-gray-500">
                      {comment.createdAt
                        ? new Date(comment.createdAt).toLocaleDateString(
                            "fr-FR",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )
                        : "Date inconnue"}
                    </span>
                  </div>
                  <p className="mt-1 text-gray-700">{comment.contenu}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default TemoignageDetail;
