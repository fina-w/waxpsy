// AuthModal.tsx - Composant Modal d'authentification sans Framer Motion
import React from "react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  attemptedRoute: string;
  onLogin: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  attemptedRoute,
  onLogin
}) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
      />

      {/* Modal */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl p-8 z-50 max-w-md w-full mx-4">
        {/* Bouton fermer */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Titre */}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-3 mt-4">
          Contenu Protégé
        </h2>

        {/* Message */}
        <p className="text-gray-600 text-center mb-6 leading-relaxed">
          Cette section nécessite une authentification. Veuillez vous connecter pour accéder à{" "}
          <span className="font-semibold text-blue-600">{attemptedRoute}</span>.
        </p>

        {/* Boutons d'action */}
        <div className="space-y-3">
          <button
            onClick={onLogin}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
          >
            Se connecter
          </button>

          <button
            onClick={onClose}
            className="w-full text-gray-500 py-2 text-sm hover:text-gray-700 transition-colors"
          >
            Annuler
          </button>
        </div>

        {/* Message informatif supplémentaire */}
        <p className="text-xs text-gray-400 text-center mt-6">
          La connexion vous donne accès à tous les contenus
        </p>
      </div>
    </>
  );
};