import React, { useState, useEffect } from "react";
import Header from "./Header";
import { useAuthStore } from "../stores/authStore";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { API_BASE_URL } from "../config";
import {
  PencilIcon,
  LockClosedIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/solid";

// Liste des avatars disponibles
const AVATARS = [
  "avatar1.png",
  "avatar4.png",
  "avatar5.png",
  "avatar6.png",
  "avatar7.png",
  "avatar8.png",
  "avatar9.png",
  "avatar10.png",
];

const Profil: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(
    user?.avatar || AVATARS[0]
  );
  const [editForm, setEditForm] = useState({
    nom: user?.nom || "",
    email: user?.email || "",
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (user?.avatar) setSelectedAvatar(user.avatar);
  }, [user]);

  const handleAvatarSelect = async (avatar: string) => {
    if (!user) return;
    try {
      const response = await fetch(`${API_BASE_URL}/utilisateurs/${user.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ avatar }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour de l'avatar");
      }

      setSelectedAvatar(avatar);
      const updatedUser = { ...user, avatar };
      useAuthStore.getState().setUser(updatedUser);

      await Swal.fire("Succès", "Avatar mis à jour avec succès", "success");
      setShowAvatarModal(false);
    } catch (error) {
      console.error("Erreur:", error);
      await Swal.fire(
        "Erreur",
        "Impossible de mettre à jour l'avatar",
        "error"
      );
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      const response = await fetch(`${API_BASE_URL}/utilisateurs/${user.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nom: editForm.nom, email: editForm.email }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour du profil");
      }

      const updatedUser = { ...user, nom: editForm.nom, email: editForm.email };
      useAuthStore.getState().setUser(updatedUser);

      await Swal.fire("Succès", "Profil mis à jour avec succès", "success");
      setShowEditModal(false);
    } catch (error) {
      console.error("Erreur:", error);
      await Swal.fire(
        "Erreur",
        "Impossible de mettre à jour le profil",
        "error"
      );
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      await Swal.fire(
        "Erreur",
        "Les mots de passe ne correspondent pas",
        "error"
      );
      return;
    }

    // simulation de changement de mot de passe
    await Swal.fire("Succès", "Mot de passe changé avec succès", "success");
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setShowPasswordModal(false);
  };

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        Utilisateur non trouvé
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-r from-gray-50 to-white px-4 py-10 flex items-center justify-center">
        <div className="bg-white border border-gray-100 rounded-3xl shadow-lg w-full max-w-5xl p-10">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
            {/* Avatar et nom */}
            <div className="flex flex-col items-center md:w-1/3">
              <img
                src={`/avatars/${selectedAvatar}`}
                alt="avatar"
                className="w-40 h-40 rounded-full border-4 border-gray-300 object-cover shadow-md"
                loading="lazy"
              />
              <h2 className="mt-4 text-2xl font-semibold text-gray-800">
                {user.nom}
              </h2>
              <p className="text-gray-500 mt-1 text-sm">Utilisateur</p>
              <button
                onClick={() => setShowAvatarModal(true)}
                className="mt-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors text-sm font-medium"
              >
                Changer d'avatar
              </button>
            </div>

            {/* Infos utilisateur */}
            <div className="md:w-2/3 w-full">
              <h3 className="text-lg font-semibold text-gray-700 border-b border-gray-200 pb-2 mb-4">
                Détails du profil
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6">
                <div>
                  <p className="text-sm text-gray-600">Nom complet</p>
                  <p className="text-base font-medium text-gray-900">
                    {user.nom}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="text-base font-medium text-gray-900">
                    {user.email}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Rôle</p>
                  <p className="text-base font-medium text-gray-900">
                    {user.role}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Date d’inscription</p>
                  <p className="text-base font-medium text-gray-900">
                    {user.dateInscription
                      ? new Date(user.dateInscription).toLocaleDateString(
                          "fr-FR"
                        )
                      : "Non disponible"}
                  </p>
                </div>
              </div>

              {/* Boutons d'action */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setShowEditModal(true)}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                >
                  <PencilIcon className="h-5 w-5" /> Modifier le profil
                </button>
                <button
                  onClick={() => setShowPasswordModal(true)}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                >
                  <LockClosedIcon className="h-5 w-5" /> Changer le mot de passe
                </button>
                <button
                  onClick={async () => {
                    logout();
                    await Swal.fire("Déconnecté", "À bientôt !", "success");
                    navigate("/home");
                  }}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                >
                  <ArrowRightOnRectangleIcon className="h-5 w-5" /> Se
                  déconnecter
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Avatar */}
        {showAvatarModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-gray-800 p-6 rounded-xl w-full max-w-md shadow-xl border border-gray-700">
              <h2 className="text-xl font-semibold text-green-400 mb-4">
                Choisissez votre avatar
              </h2>
              <div className="grid grid-cols-4 gap-3">
                {AVATARS.map((avatar) => (
                  <button
                    key={avatar}
                    onClick={() => handleAvatarSelect(avatar)}
                    className={`p-1 rounded-full transition-all duration-200 transform hover:scale-105 ${
                      selectedAvatar === avatar
                        ? "ring-4 ring-green-500 ring-offset-2"
                        : "hover:ring-2 hover:ring-green-300"
                    }`}
                  >
                    <img
                      src={`/avatars/${avatar}`}
                      alt={avatar}
                      className="w-16 h-16 rounded-full object-cover"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setShowAvatarModal(false)}
                  className="px-4 py-2 text-sm text-gray-300 hover:text-white"
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal Modifier Profil */}
        {showEditModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-xl border border-gray-200">
              <h2 className="text-xl font-semibold text-green-800 mb-4">
                Modifier le profil
              </h2>
              <form onSubmit={handleEditSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="nom"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Nom complet
                  </label>
                  <input
                    type="text"
                    id="nom"
                    value={editForm.nom}
                    onChange={(e) =>
                      setEditForm({ ...editForm, nom: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={editForm.email}
                    onChange={(e) =>
                      setEditForm({ ...editForm, email: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                  >
                    Sauvegarder
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal Changer Mot de Passe */}
        {showPasswordModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-xl border border-gray-200">
              <h2 className="text-xl font-semibold text-blue-800 mb-4">
                Changer le mot de passe
              </h2>
              <form onSubmit={handlePasswordSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="currentPassword"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Mot de passe actuel
                  </label>
                  <input
                    type="password"
                    id="currentPassword"
                    value={passwordForm.currentPassword}
                    onChange={(e) =>
                      setPasswordForm({
                        ...passwordForm,
                        currentPassword: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="newPassword"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Nouveau mot de passe
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    value={passwordForm.newPassword}
                    onChange={(e) =>
                      setPasswordForm({
                        ...passwordForm,
                        newPassword: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Confirmer le nouveau mot de passe
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    value={passwordForm.confirmPassword}
                    onChange={(e) =>
                      setPasswordForm({
                        ...passwordForm,
                        confirmPassword: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowPasswordModal(false)}
                    className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                  >
                    Changer
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Profil;
