import React, { useState, useEffect } from 'react';
import Header from './Header.tsx';
import { useAuthStore } from '../stores/authStore';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

// Liste des avatars disponibles
const AVATARS = [
  'avatar1.png',
  'avatar4.png',
  'avatar5.png',
  'avatar6.png',
  'avatar7.png',
  'avatar8.png',
  'avatar9.png',
  'avatar10.png'
];

import type { User } from '../stores/authStore';

const Profil: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [editForm, setEditForm] = useState({
    nom: user?.nom || '',
    email: user?.email || ''
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [selectedAvatar, setSelectedAvatar] = useState(user?.avatar || AVATARS[0]);

  // Mettre à jour l'avatar sélectionné quand l'utilisateur change
  useEffect(() => {
    if (user?.avatar) {
      setSelectedAvatar(user.avatar);
    }
  }, [user]);

  const handleAvatarSelect = async (avatar: string) => {
    if (!user) return;
    
    try {
      // Mettre à jour l'état local immédiatement pour un retour visuel rapide
      setSelectedAvatar(avatar);
      
      // Créer un utilisateur mis à jour avec les champs obligatoires
      const updatedUser: User = {
        id: user.id,
        nom: user.nom,
        email: user.email,
        role: user.role,
        avatar: avatar
      };
      
      // Mettre à jour l'utilisateur dans le store
      useAuthStore.getState().setUser(updatedUser);
      
      // Mettre à jour dans la base de données (simulé ici avec un timeout)
      // Dans une vraie application, vous feriez un appel API ici
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mettre à jour la liste des utilisateurs dans le localStorage
      const db = JSON.parse(localStorage.getItem('db') || '{}');
      if (db.utilisateurs) {
        db.utilisateurs = db.utilisateurs.map((u: any) => 
          u.id === user.id ? { ...u, avatar } : u
        );
        localStorage.setItem('db', JSON.stringify(db));
      }
      
      await Swal.fire({
        title: 'Succès',
        text: 'Votre avatar a été mis à jour avec succès !',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      
      setShowAvatarModal(false);
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'avatar :', error);
      Swal.fire({
        title: 'Erreur',
        text: 'Une erreur est survenue lors de la mise à jour de l\'avatar.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-white via-white to-blue-100">
        <div className="container mx-auto px-4 py-8 text-center">Utilisateur non trouvé</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-white via-white to-blue-100">
      <Header currentPath="/profil" />

      {/* Main Content */}
      <main className="p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 troubles-title text-center">Mon Profil</h1>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-xl font-semibold mb-4 text-green-800">Informations Personnelles</h2>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Nom</label>
                    <p className="mt-1 text-sm text-gray-900">{user.nom}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <p className="mt-1 text-sm text-gray-900">{user.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Rôle</label>
                    <p className="mt-1 text-sm text-gray-900">{user.role}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Date d'inscription</label>
                    <p className="mt-1 text-sm text-gray-900">{(user as any).dateInscription ? new Date((user as any).dateInscription).toLocaleDateString('fr-FR') : 'Non disponible'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Statut</label>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${(user as any).actif ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {(user as any).actif !== undefined ? ((user as any).actif ? 'Actif' : 'Inactif') : 'Non disponible'}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Avatar</label>
                    <div className="flex items-center space-x-4">
                      <img 
                        src={`/avatars/${user.avatar || AVATARS[0]}`} 
                        alt="Avatar" 
                        className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                      />
                      <button
                        type="button"
                        onClick={() => setShowAvatarModal(true)}
                        className="text-sm text-blue-600 hover:text-blue-800"
                      >
                        Changer d'avatar
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4 text-green-800">Actions</h2>
                <div className="space-y-3">
                  <button
                    onClick={() => setShowEditModal(true)}
                    className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Modifier le profil
                  </button>
                  <button
                    onClick={() => setShowPasswordModal(true)}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Changer le mot de passe
                  </button>
                  <button
                    onClick={async () => {
                      logout();
                      await Swal.fire({
                        title: 'Déconnecté',
                        text: 'Vous avez été déconnecté avec succès.',
                        icon: 'success',
                        confirmButtonText: 'OK'
                      });
                      navigate('/home');
                    }}
                    className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Se déconnecter
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Modifier le profil</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nom</label>
                <input
                  type="text"
                  value={editForm.nom}
                  onChange={(e) => setEditForm({ ...editForm, nom: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200"
              >
                Annuler
              </button>
              <button
                onClick={() => {
                  // TODO: Implement profile update logic
                  alert('Fonctionnalité à implémenter');
                  setShowEditModal(false);
                }}
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700"
              >
                Sauvegarder
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Changer le mot de passe</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Mot de passe actuel</label>
                <input
                  type="password"
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Nouveau mot de passe</label>
                <input
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Confirmer le nouveau mot de passe</label>
                <input
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowPasswordModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200"
              >
                Annuler
              </button>
              <button
                onClick={() => {
                  // TODO: Implement password change logic
                  alert('Fonctionnalité à implémenter');
                  setShowPasswordModal(false);
                }}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
              >
                Changer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Avatar Selection Modal */}
      {showAvatarModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm">
          <div className="bg-white rounded-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Choisissez votre avatar</h2>
              <button 
                onClick={() => setShowAvatarModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Fermer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="grid grid-cols-4 gap-4">
              {AVATARS.map((avatar) => (
                <button
                  key={avatar}
                  onClick={() => handleAvatarSelect(avatar)}
                  className={`p-1 rounded-full transition-all duration-200 transform hover:scale-105 ${
                    selectedAvatar === avatar 
                      ? 'ring-3 ring-blue-500 ring-offset-2' 
                      : 'hover:ring-2 hover:ring-blue-200'
                  }`}
                >
                  <img 
                    src={`/avatars/${avatar}`} 
                    alt={avatar} 
                    className="w-16 h-16 rounded-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `/avatars/avatar1.png`;
                    }}
                  />
                </button>
              ))}
            </div>
            
            <div className="mt-8 flex justify-end">
              <button
                onClick={() => setShowAvatarModal(false)}
                className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profil;
