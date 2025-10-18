import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../stores/authStore';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import {
  useUtilisateurs,
  useProfessionnels,
  useTemoignages,
  useUpdateUtilisateur,
  useDeleteUtilisateur,
  useCreateUtilisateur,
  useUpdateProfessionnel,
  useDeleteProfessionnel,
  useCreateProfessionnel,
  useUpdateTemoignageStatus,
} from '../hooks/useApi';
import type { User, Professional, Testimonial } from '../hooks/useApi';
import {
  TrashIcon,
  PencilIcon,
  PlusIcon,
  CheckIcon,
  XMarkIcon,
  CheckCircleIcon,
  XCircleIcon,
  MagnifyingGlassIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';

const Admin: React.FC = () => {
  const { user, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState('users');
  const { data: users = [], isLoading: usersLoading } = useUtilisateurs();
  const { data: professionals = [], isLoading: professionalsLoading } = useProfessionnels();
  const { data: testimonials = [], isLoading: testimonialsLoading } = useTemoignages(1, 1000);
  const updateUtilisateur = useUpdateUtilisateur();
  const deleteUtilisateur = useDeleteUtilisateur();
  const createUtilisateur = useCreateUtilisateur();
  const updateProfessionnel = useUpdateProfessionnel();
  const deleteProfessionnel = useDeleteProfessionnel();
  const createProfessionnel = useCreateProfessionnel();
  const updateTemoignageStatus = useUpdateTemoignageStatus();
  const loading = usersLoading || professionalsLoading || testimonialsLoading;
  const [userSearch, setUserSearch] = useState('');
  const [professionalSearch, setProfessionalSearch] = useState('');

  // Pagination states
  const [currentUserPage, setCurrentUserPage] = useState(1);
  const [currentProfessionalPage, setCurrentProfessionalPage] = useState(1);
  const itemsPerPage = 4;

  // Modal states
  const [showUserModal, setShowUserModal] = useState(false);
  const [showProfessionalModal, setShowProfessionalModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editingProfessional, setEditingProfessional] = useState<Professional | null>(null);

  // Form states
  const [userForm, setUserForm] = useState({ nom: '', email: '', role: 'utilisateur', actif: true });
  const [professionalForm, setProfessionalForm] = useState({ nom: '', email: '', role: 'professionnel', specialite: '', verifiee: false });

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'administrateur') {
      navigate('/login');
      return;
    }
  }, [isAuthenticated, user, navigate]);

  const handleLoginRedirect = () => {
    if (user?.role === 'administrateur') {
      navigate('/admin');
    } else {
      navigate('/home');
    }
  };

  const toggleUserStatus = (userId: string | number) => {
    const user = users.find(u => u.id === userId);
    if (!user) return;
    updateUtilisateur.mutate({ id: userId, data: { actif: !user.actif } });
  };

  const deleteUser = (userId: string | number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) return;
    deleteUtilisateur.mutate(userId);
  };

  const deleteProfessional = (profId: string | number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce professionnel ?')) return;
    deleteProfessionnel.mutate(profId);
  };

  const toggleProfessionalVerification = (profId: string | number) => {
    const prof = professionals.find(p => p.id === profId);
    if (!prof) return;
    updateProfessionnel.mutate({ id: profId, data: { verifiee: !prof.verifiee } });
  };

  const updateTestimonialStatus = (testId: string | number, newStatus: string) => {
    updateTemoignageStatus.mutate({ id: testId, statut: newStatus });
  };

  const filteredUsers = users.filter(user =>
    user.nom.toLowerCase().includes(userSearch.toLowerCase()) ||
    user.email.toLowerCase().includes(userSearch.toLowerCase())
  );

  const filteredProfessionals = professionals.filter(prof =>
    prof.nom.toLowerCase().includes(professionalSearch.toLowerCase()) ||
    prof.email.toLowerCase().includes(professionalSearch.toLowerCase())
  );

  // Pagination logic
  const paginatedUsers = filteredUsers.slice((currentUserPage - 1) * itemsPerPage, currentUserPage * itemsPerPage);
  const totalUserPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const paginatedProfessionals = filteredProfessionals.slice((currentProfessionalPage - 1) * itemsPerPage, currentProfessionalPage * itemsPerPage);
  const totalProfessionalPages = Math.ceil(filteredProfessionals.length / itemsPerPage);

  // Reset to page 1 when search changes
  useEffect(() => {
    setCurrentUserPage(1);
  }, [userSearch]);

  useEffect(() => {
    setCurrentProfessionalPage(1);
  }, [professionalSearch]);

  // Modal handlers
  const openUserModal = (user?: User) => {
    if (user) {
      setEditingUser(user);
      setUserForm({ nom: user.nom, email: user.email, role: user.role, actif: user.actif || true });
    } else {
      setEditingUser(null);
      setUserForm({ nom: '', email: '', role: 'utilisateur', actif: true });
    }
    setShowUserModal(true);
  };

  const openProfessionalModal = (prof?: Professional) => {
    if (prof) {
      setEditingProfessional(prof);
      setProfessionalForm({ nom: prof.nom, email: prof.email, role: prof.role, specialite: prof.specialite, verifiee: prof.verifiee });
    } else {
      setEditingProfessional(null);
      setProfessionalForm({ nom: '', email: '', role: 'professionnel', specialite: '', verifiee: false });
    }
    setShowProfessionalModal(true);
  };

  const closeUserModal = () => {
    setShowUserModal(false);
    setEditingUser(null);
    setUserForm({ nom: '', email: '', role: 'utilisateur', actif: true });
  };

  const closeProfessionalModal = () => {
    setShowProfessionalModal(false);
    setEditingProfessional(null);
    setProfessionalForm({ nom: '', email: '', role: 'professionnel', specialite: '', verifiee: false });
  };

  const handleUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingUser) {
      updateUtilisateur.mutate({ id: editingUser.id, data: userForm });
    } else {
      createUtilisateur.mutate(userForm);
    }
    closeUserModal();
  };

  const handleProfessionalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProfessional) {
      updateProfessionnel.mutate({ id: editingProfessional.id, data: professionalForm });
    } else {
      createProfessionnel.mutate({ ...professionalForm, dateInscription: new Date().toISOString() });
    }
    closeProfessionalModal();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">Panneau d'Administration</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Connecté en tant que: {user?.nom}</span>
              <button
                onClick={() => navigate('/home')}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Retour au site
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'users', label: 'Utilisateurs', count: users.length },
              { id: 'professionals', label: 'Professionnels', count: professionals.length },
              { id: 'testimonials', label: 'Témoignages', count: testimonials.length }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="mt-8">
          {activeTab === 'users' && (
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <div className="px-4 py-5 sm:px-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Gestion des Utilisateurs</h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                      Gérez les comptes utilisateurs et leur statut d'activation.
                    </p>
                  </div>
                  <button
                    onClick={() => openUserModal()}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                  >
                    <PlusIcon className="h-5 w-5 mr-2" />
                    Ajouter Utilisateur
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Rechercher par nom ou email..."
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nom
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Fonction
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date d'Inscription
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {paginatedUsers.map((user) => (
                      <tr key={user.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                                <span className="text-sm font-medium text-gray-700">
                                  {user.nom.charAt(0).toUpperCase()}
                                </span>
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{user.nom}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{user.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.dateInscription ? new Date(user.dateInscription).toLocaleDateString('fr-FR') : 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => openUserModal(user)}
                              className="p-2 bg-yellow-100 text-yellow-800 rounded-md hover:bg-yellow-200"
                              title="Modifier"
                            >
                              <PencilIcon className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => toggleUserStatus(user.id)}
                              className={`p-2 rounded-md ${
                                user.actif
                                  ? 'bg-red-100 text-red-800 hover:bg-red-200'
                                  : 'bg-green-100 text-green-800 hover:bg-green-200'
                              }`}
                              title={user.actif ? 'Désactiver' : 'Activer'}
                            >
                              {user.actif ? <XMarkIcon className="h-4 w-4" /> : <CheckIcon className="h-4 w-4" />}
                            </button>
                            <button
                              onClick={() => deleteUser(user.id)}
                              className="p-2 bg-red-100 text-red-800 rounded-md hover:bg-red-200"
                              title="Supprimer"
                            >
                              <TrashIcon className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Pagination for Users */}
              <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
                <div className="flex items-center">
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">{(currentUserPage - 1) * itemsPerPage + 1}</span> to <span className="font-medium">{Math.min(currentUserPage * itemsPerPage, filteredUsers.length)}</span> of <span className="font-medium">{filteredUsers.length}</span> results
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setCurrentUserPage(Math.max(1, currentUserPage - 1))}
                    disabled={currentUserPage === 1}
                    className="px-3 py-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeftIcon className="w-4 h-4" />
                  </button>
                  <span className="text-sm text-gray-700">Page {currentUserPage} of {totalUserPages}</span>
                  <button
                    onClick={() => setCurrentUserPage(Math.min(totalUserPages, currentUserPage + 1))}
                    disabled={currentUserPage === totalUserPages}
                    className="px-3 py-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRightIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'professionals' && (
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <div className="px-4 py-5 sm:px-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Gestion des Professionnels</h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                      Vérifiez et gérez les comptes professionnels de santé mentale.
                    </p>
                  </div>
                  <button
                    onClick={() => openProfessionalModal()}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                  >
                    <PlusIcon className="h-5 w-5 mr-2" />
                    Ajouter Professionnel
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Rechercher par nom ou email..."
                    value={professionalSearch}
                    onChange={(e) => setProfessionalSearch(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nom
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Fonction
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Spécialité
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date d'Inscription
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {paginatedProfessionals.map((prof) => (
                      <tr key={prof.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <div className="h-10 w-10 rounded-full bg-blue-300 flex items-center justify-center">
                                <span className="text-sm font-medium text-blue-700">
                                  {prof.nom.charAt(0).toUpperCase()}
                                </span>
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{prof.nom}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{prof.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                            {prof.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {prof.specialite}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(prof.dateInscription).toLocaleDateString('fr-FR')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => openProfessionalModal(prof)}
                              className="p-2 bg-yellow-100 text-yellow-800 rounded-md hover:bg-yellow-200"
                              title="Modifier"
                            >
                              <PencilIcon className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => toggleProfessionalVerification(prof.id)}
                              className={`p-2 rounded-md ${
                                prof.verifiee
                                  ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                                  : 'bg-green-100 text-green-800 hover:bg-green-200'
                              }`}
                              title={prof.verifiee ? 'Dé-vérifier' : 'Vérifier'}
                            >
                              {prof.verifiee ? <XMarkIcon className="h-4 w-4" /> : <CheckIcon className="h-4 w-4" />}
                            </button>
                            <button
                              onClick={() => deleteProfessional(prof.id)}
                              className="p-2 bg-red-100 text-red-800 rounded-md hover:bg-red-200"
                              title="Supprimer"
                            >
                              <TrashIcon className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Pagination for Professionals */}
              <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
                <div className="flex items-center">
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">{(currentProfessionalPage - 1) * itemsPerPage + 1}</span> to <span className="font-medium">{Math.min(currentProfessionalPage * itemsPerPage, filteredProfessionals.length)}</span> of <span className="font-medium">{filteredProfessionals.length}</span> results
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setCurrentProfessionalPage(Math.max(1, currentProfessionalPage - 1))}
                    disabled={currentProfessionalPage === 1}
                    className="px-3 py-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeftIcon className="w-4 h-4" />
                  </button>
                  <span className="text-sm text-gray-700">Page {currentProfessionalPage} of {totalProfessionalPages}</span>
                  <button
                    onClick={() => setCurrentProfessionalPage(Math.min(totalProfessionalPages, currentProfessionalPage + 1))}
                    disabled={currentProfessionalPage === totalProfessionalPages}
                    className="px-3 py-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRightIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'testimonials' && (
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Modération des Témoignages</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Approuvez ou rejetez les témoignages soumis par les utilisateurs.
                </p>
              </div>
              <ul className="divide-y divide-gray-200">
                {testimonials.map((test) => (
                  <li key={test.id} className="px-4 py-4 sm:px-6">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">{test.titre}</h4>
                          <p className="text-sm text-gray-500">
                            Soumis le: {new Date(test.createdAt).toLocaleDateString('fr-FR')}
                          </p>
                          <p className="text-sm text-gray-500">
                            Statut: {test.statut}
                          </p>
                        </div>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          test.statut === 'approuvé' ? 'bg-green-100 text-green-800' :
                          test.statut === 'en attente' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {test.statut}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 line-clamp-3">{test.contenu}</p>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => updateTestimonialStatus(test.id, 'approuvé')}
                          className={`p-2 rounded-md ${
                            test.statut === 'approuvé'
                              ? 'bg-green-200 text-green-900 cursor-not-allowed'
                              : 'bg-green-100 text-green-800 hover:bg-green-200'
                          }`}
                          title="Approuver"
                          disabled={test.statut === 'approuvé'}
                        >
                          <CheckCircleIcon className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => updateTestimonialStatus(test.id, 'rejeté')}
                          className={`p-2 rounded-md ${
                            test.statut === 'rejeté'
                              ? 'bg-red-200 text-red-900 cursor-not-allowed'
                              : 'bg-red-100 text-red-800 hover:bg-red-200'
                          }`}
                          title="Rejeter"
                          disabled={test.statut === 'rejeté'}
                        >
                          <XCircleIcon className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => updateTestimonialStatus(test.id, 'en attente')}
                          className={`p-2 rounded-md ${
                            test.statut === 'en attente'
                              ? 'bg-yellow-200 text-yellow-900 cursor-not-allowed'
                              : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                          }`}
                          title="Remettre en attente"
                          disabled={test.statut === 'en attente'}
                        >
                          <XMarkIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* User Modal */}
      {showUserModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {editingUser ? 'Modifier Utilisateur' : 'Ajouter Utilisateur'}
              </h3>
              <form onSubmit={handleUserSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nom</label>
                  <input
                    type="text"
                    value={userForm.nom}
                    onChange={(e) => setUserForm({ ...userForm, nom: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    value={userForm.email}
                    onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Rôle</label>
                  <select
                    value={userForm.role}
                    onChange={(e) => setUserForm({ ...userForm, role: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="utilisateur">Utilisateur</option>
                    <option value="professionnel">Professionnel</option>
                    <option value="administrateur">Administrateur</option>
                  </select>
                </div>
                <div className="flex items-center">
                  <input
                    id="actif"
                    type="checkbox"
                    checked={userForm.actif}
                    onChange={(e) => setUserForm({ ...userForm, actif: e.target.checked })}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label htmlFor="actif" className="ml-2 block text-sm text-gray-900">
                    Actif
                  </label>
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={closeUserModal}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    {editingUser ? 'Modifier' : 'Ajouter'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Professional Modal */}
      {showProfessionalModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {editingProfessional ? 'Modifier Professionnel' : 'Ajouter Professionnel'}
              </h3>
              <form onSubmit={handleProfessionalSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nom</label>
                  <input
                    type="text"
                    value={professionalForm.nom}
                    onChange={(e) => setProfessionalForm({ ...professionalForm, nom: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    value={professionalForm.email}
                    onChange={(e) => setProfessionalForm({ ...professionalForm, email: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Spécialité</label>
                  <input
                    type="text"
                    value={professionalForm.specialite}
                    onChange={(e) => setProfessionalForm({ ...professionalForm, specialite: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    required
                  />
                </div>
                <div className="flex items-center">
                  <input
                    id="verifiee"
                    type="checkbox"
                    checked={professionalForm.verifiee}
                    onChange={(e) => setProfessionalForm({ ...professionalForm, verifiee: e.target.checked })}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label htmlFor="verifiee" className="ml-2 block text-sm text-gray-900">
                    Vérifié
                  </label>
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={closeProfessionalModal}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    {editingProfessional ? 'Modifier' : 'Ajouter'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
