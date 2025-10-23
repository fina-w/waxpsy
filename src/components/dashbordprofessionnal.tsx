import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../stores/authStore';
import { useNavigate } from 'react-router-dom';
import {
  PencilIcon,
  CheckIcon,
  XMarkIcon,
  CheckCircleIcon,
  XCircleIcon,
  UserIcon,
  BriefcaseIcon,
  TrashIcon,
  ChartBarIcon,
  EyeIcon,
  Bars3Icon
} from '@heroicons/react/24/outline';

interface RendezVous {
  id: string;
  utilisateurId: number;
  professionnelId: number;
  date: string;
  motif: string;
  statut: string;
}

interface Professional {
  id: number | string;
  nom?: string;
  email?: string;
  imageUrl?: string;
  specialite?: string;
  diplome?: string;
  experience?: string;
  adresse?: string;
  telephone?: string;
  tarif?: string;
  bio?: string;
  langues?: string[];
  creneauxDisponibles?: { jour: string; heures: string[] }[];
}

const DashbordProfessionnal: React.FC = () => {
  const user = useAuthStore((s) => s.user);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('statistics');
  const [rendezVous, setRendezVous] = useState<RendezVous[]>([]);
  const [profile, setProfile] = useState<Professional | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedRdv, setSelectedRdv] = useState<RendezVous | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Modal states
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [editingProfile, setEditingProfile] = useState<Professional | null>(null);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'failed'>('idle');
  const [paymentMethod, setPaymentMethod] = useState<string>('');

  // Form states
  const [profileForm, setProfileForm] = useState({
    nom: '',
    email: '',
    specialite: '',
    diplome: '',
    experience: '',
    adresse: '',
    telephone: '',
    tarif: '',
    bio: '',
    langues: [] as string[],
    creneauxDisponibles: [] as { jour: string; heures: string[] }[]
  });

  useEffect(() => {
    if (!user) {
      // Not logged in -> redirect to login
      navigate('/login');
      return;
    }
    if (user.role !== 'professionnel') {
      // Not a professional -> redirect to home
      navigate('/');
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const resp = await fetch('/db.json');
        if (!resp.ok) throw new Error('Impossible de charger les données');
        const data = await resp.json();
        const allRdv: RendezVous[] = Array.isArray(data.rendezVous) ? data.rendezVous : [];
        const myRdv = allRdv.filter((r) => Number(r.professionnelId) === Number(user.id));
        setRendezVous(myRdv);

        // Load professional full profile from db.json (professionnels)
        const professionnels: Professional[] = Array.isArray(data.professionnels) ? data.professionnels : [];
        const myProfile = professionnels.find((p: Professional) => Number(p.id) === Number(user.id));
        if (myProfile) {
          setProfile(myProfile);
          setProfileForm({
            nom: myProfile.nom || '',
            email: myProfile.email || '',
            specialite: myProfile.specialite || '',
            diplome: myProfile.diplome || '',
            experience: myProfile.experience || '',
            adresse: myProfile.adresse || '',
            telephone: myProfile.telephone || '',
            tarif: myProfile.tarif || '',
            bio: myProfile.bio || '',
            langues: myProfile.langues || [],
            creneauxDisponibles: myProfile.creneauxDisponibles || []
          });
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, navigate]);

  const openProfileModal = (prof?: Professional) => {
    if (prof) {
      setEditingProfile(prof);
      setProfileForm({
        nom: prof.nom || '',
        email: prof.email || '',
        specialite: prof.specialite || '',
        diplome: prof.diplome || '',
        experience: prof.experience || '',
        adresse: prof.adresse || '',
        telephone: prof.telephone || '',
        tarif: prof.tarif || '',
        bio: prof.bio || '',
        langues: prof.langues || [],
        creneauxDisponibles: prof.creneauxDisponibles || []
      });
    } else {
      setEditingProfile(null);
      setProfileForm({
        nom: '',
        email: '',
        specialite: '',
        diplome: '',
        experience: '',
        adresse: '',
        telephone: '',
        tarif: '',
        bio: '',
        langues: [],
        creneauxDisponibles: []
      });
    }
    setShowProfileModal(true);
  };

  const closeProfileModal = () => {
    setShowProfileModal(false);
    setEditingProfile(null);
    setProfileForm({
      nom: '',
      email: '',
      specialite: '',
      diplome: '',
      experience: '',
      adresse: '',
      telephone: '',
      tarif: '',
      bio: '',
      langues: [],
      creneauxDisponibles: []
    });
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingProfile) {
        // Update existing profile
        const updatedProf = { ...editingProfile, ...profileForm };
        await fetch(`/api/professionnels/${editingProfile.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedProf)
        });
        setProfile(updatedProf);
      }
      closeProfileModal();
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  const deleteProfile = async () => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer votre profil ? Cette action est irréversible.')) return;

    try {
      await fetch(`/api/professionnels/${profile?.id}`, {
        method: 'DELETE'
      });
      // Redirect or logout
      navigate('/');
    } catch (error) {
      console.error('Error deleting profile:', error);
    }
  };

  const updateRendezVousStatus = async (rdvId: string, newStatus: string) => {
    try {
      const rdv = rendezVous.find(r => r.id === rdvId);
      if (!rdv) return;

      const updatedRdv = { ...rdv, statut: newStatus };
      await fetch(`/api/rendezVous/${rdvId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedRdv)
      });

      setRendezVous(rendezVous.map(r => r.id === rdvId ? updatedRdv : r));
    } catch (error) {
      console.error('Error updating appointment:', error);
    }
  };

  const deleteRendezVous = async (rdvId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce rendez-vous ?')) return;

    try {
      await fetch(`/api/rendezVous/${rdvId}`, {
        method: 'DELETE'
      });

      setRendezVous(rendezVous.filter(r => r.id !== rdvId));
    } catch (error) {
      console.error('Error deleting appointment:', error);
    }
  };

  const handlePayment = async (method: string) => {
    setPaymentStatus('processing');
    setPaymentMethod(method);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simulate random success/failure (90% success rate)
      const success = Math.random() > 0.1;

      if (success) {
        setPaymentStatus('success');
        // Update user's subscription status
        if (user) {
          const updatedUser = { ...user, subscription: 'pro' as const };
          useAuthStore.getState().setUser(updatedUser);
        }
        alert(`Paiement réussi via ${method}! Votre abonnement Pro est maintenant actif.`);
        setShowSubscriptionModal(false);
        setPaymentStatus('idle');
        setPaymentMethod('');
      } else {
        setPaymentStatus('failed');
        alert(`Échec du paiement via ${method}. Veuillez réessayer.`);
        setPaymentStatus('idle');
        setPaymentMethod('');
      }
    } catch (error) {
      setPaymentStatus('failed');
      alert('Une erreur est survenue lors du paiement. Veuillez réessayer.');
      setPaymentStatus('idle');
      setPaymentMethod('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 shadow-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 sm:py-6">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 bg-white/20 rounded-lg text-white hover:bg-white/30 transition-colors"
              >
                <Bars3Icon className="h-6 w-6" />
              </button>
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <BriefcaseIcon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">Tableau de Bord Professionnel</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-white/10 px-3 sm:px-4 py-2 rounded-full">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <UserIcon className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                </div>
                <span className="text-xs sm:text-sm text-white font-medium truncate">Connecté: {user?.nom}</span>
              </div>
              <button
                onClick={() => navigate('/home')}
                className="px-4 sm:px-6 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-all duration-200 backdrop-blur-sm border border-white/30 text-sm sm:text-base"
              >
                Retour au site
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex min-h-[calc(100vh-80px)]">
        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-40">
            <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsMobileMenuOpen(false)}></div>
            <div className="relative w-64 bg-white/95 backdrop-blur-sm shadow-lg border-r border-gray-200 h-full">
              <div className="p-6">
                <nav className="space-y-2">
                  {[
                    { id: 'statistics', label: 'Statistiques', icon: ChartBarIcon },
                    { id: 'profile', label: 'À propos de moi', icon: UserIcon },
                    { id: 'appointments', label: 'Rendez-vous', icon: BriefcaseIcon, count: rendezVous.length },
                    { id: 'subscription', label: 'Abonnement Pro', icon: ChartBarIcon }
                  ].map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => {
                          setActiveTab(tab.id);
                          setIsMobileMenuOpen(false); // Close mobile menu on tab select
                        }}
                        className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors duration-200 ${
                          activeTab === tab.id
                            ? 'bg-green-50 text-green-700 border-r-4 border-green-500'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        <Icon className="h-5 w-5 mr-3" />
                        {tab.label} {tab.count !== undefined ? `(${tab.count})` : ''}
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>
          </div>
        )}

        {/* Sidebar - Hidden on mobile */}
        <div className="hidden md:block w-64 bg-white shadow-lg border-r border-gray-200 sticky top-20 h-screen overflow-y-auto">
          <div className="p-6">
            <nav className="space-y-2">
              {[
                { id: 'statistics', label: 'Statistiques', icon: ChartBarIcon },
                { id: 'profile', label: 'À propos de moi', icon: UserIcon },
                { id: 'appointments', label: 'Rendez-vous', icon: BriefcaseIcon, count: rendezVous.length },
                { id: 'subscription', label: 'Abonnement Pro', icon: ChartBarIcon }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setIsMobileMenuOpen(false); // Close mobile menu on tab select
                    }}
                    className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors duration-200 ${
                      activeTab === tab.id
                        ? 'bg-green-50 text-green-700 border-r-4 border-green-500'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="h-5 w-5 mr-3" />
                    {tab.label} {tab.count !== undefined ? `(${tab.count})` : ''}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 md:p-8">
          {activeTab === 'profile' && (
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <div className="px-4 py-5 sm:px-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">À propos de moi</h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                      Gérez vos informations personnelles et professionnelles.
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => openProfileModal(profile || undefined)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                    >
                      <PencilIcon className="h-5 w-5 mr-2" />
                      Modifier
                    </button>
                    <button
                      onClick={deleteProfile}
                      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center"
                    >
                      <TrashIcon className="h-5 w-5 mr-2" />
                      Supprimer
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-4 mb-4">
                  {(() => {
                    const displayName = profile?.nom || user?.nom || '';
                    const initial = displayName ? displayName.charAt(0) : '?';
                    return (
                      <>
                        <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100">
                          {(profile?.imageUrl || user?.avatar) ? (
                            <img src={profile?.imageUrl || user?.avatar} alt={displayName || 'Avatar'} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-green-600 font-bold">{initial}</div>
                          )}
                        </div>
                        <div>
                          <div className="font-semibold text-green-800 text-lg">{displayName || 'Utilisateur'}</div>
                          <div className="text-sm text-gray-600">{profile?.email || user?.email}</div>
                        </div>
                      </>
                    );
                  })()}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div><strong>Spécialité:</strong> {profile?.specialite || user?.specialite || 'N/A'}</div>
                  <div><strong>Diplôme:</strong> {profile?.diplome || user?.diplome || 'N/A'}</div>
                  <div><strong>Expérience:</strong> {profile?.experience || user?.experience || 'N/A'}</div>
                  <div><strong>Adresse:</strong> {profile?.adresse || user?.adresse || 'N/A'}</div>
                  <div><strong>Téléphone:</strong> {profile?.telephone || user?.telephone || 'N/A'}</div>
                  <div><strong>Tarif:</strong> {profile?.tarif || user?.tarif || 'N/A'}</div>
                  <div className="md:col-span-2"><strong>Bio:</strong> {profile?.bio || user?.bio || 'N/A'}</div>
                  <div className="md:col-span-2"><strong>Langues:</strong> {(profile?.langues || user?.langues || []).join(', ') || 'N/A'}</div>
                  <div className="md:col-span-2">
                    <strong>Créneaux Disponibles:</strong>
                    <ul className="list-disc list-inside mt-1">
                      {(profile?.creneauxDisponibles || user?.creneauxDisponibles || []).map((creneau, index) => (
                        <li key={index}>{creneau.jour}: {creneau.heures.join(', ')}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'statistics' && (
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Statistiques des Rendez-vous</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Aperçu des statistiques de vos rendez-vous.
                </p>
              </div>
              <div className="px-4 py-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                    <div className="flex items-center">
                      <CheckCircleIcon className="h-8 w-8 text-green-600" />
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Confirmés</p>
                        <p className="text-2xl font-bold text-green-800">
                          {rendezVous.filter(r => r.statut === 'confirmed').length}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
                    <div className="flex items-center">
                      <XCircleIcon className="h-8 w-8 text-yellow-600" />
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">En attente</p>
                        <p className="text-2xl font-bold text-yellow-800">
                          {rendezVous.filter(r => r.statut === 'pending').length}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                    <div className="flex items-center">
                      <XMarkIcon className="h-8 w-8 text-red-600" />
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Annulés</p>
                        <p className="text-2xl font-bold text-red-800">
                          {rendezVous.filter(r => r.statut === 'cancelled').length}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'appointments' && (
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Gestion des Rendez-vous</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Gérez vos rendez-vous programmés.
                </p>
              </div>
              {loading && <p className="px-4 py-4">Chargement des rendez-vous…</p>}
              {error && <div className="px-4 py-4 text-red-600">Erreur: {error}</div>}

              {!loading && rendezVous.length === 0 && (
                <div className="px-4 py-4">Aucun rendez-vous programmé.</div>
              )}

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Motif</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {rendezVous.map((r) => (
                      <tr key={r.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(r.date).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {r.motif}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {r.statut}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => setSelectedRdv(r)}
                              className="text-blue-600 hover:text-blue-900 p-1"
                              title="Détails"
                            >
                              <EyeIcon className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => updateRendezVousStatus(r.id, 'confirmed')}
                              className="text-green-600 hover:text-green-900 p-1"
                              title="Confirmer"
                            >
                              <CheckIcon className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => updateRendezVousStatus(r.id, 'cancelled')}
                              className="text-red-600 hover:text-red-900 p-1"
                              title="Annuler"
                            >
                              <XMarkIcon className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => deleteRendezVous(r.id)}
                              className="text-gray-600 hover:text-gray-900 p-1"
                              title="Supprimer"
                            >
                              <TrashIcon className="h-5 w-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'subscription' && (
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Abonnement Pro</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Gérez votre abonnement professionnel.
                </p>
              </div>
              <div className="px-4 py-4">
                {user?.subscription === 'pro' ? (
                  <div className="text-center">
                    <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full mb-4">
                      <CheckCircleIcon className="h-5 w-5 mr-2" />
                      Abonnement Pro Actif
                    </div>
                    <p className="text-gray-600 mb-4">
                      Votre abonnement Pro est actif. Vous bénéficiez d'une visibilité accrue auprès des patients.
                    </p>
                    <p className="text-sm text-gray-500">
                      Renouvellement automatique le {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                ) : (
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600 mb-4">15 000 CFA / mois</p>
                    <p className="text-gray-600 mb-6">
                      Avec l'abonnement Pro, votre profil sera mis en avant et vous recevrez plus de demandes de rendez-vous.
                    </p>
                    <button
                      onClick={() => setShowSubscriptionModal(true)}
                      className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                    >
                      S'abonner maintenant
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Profile Modal */}
        {showProfileModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Modifier le profil
                </h3>
                <form onSubmit={handleProfileSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Nom</label>
                    <input
                      type="text"
                      value={profileForm.nom}
                      onChange={(e) => setProfileForm({ ...profileForm, nom: e.target.value })}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      value={profileForm.email}
                      onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Spécialité</label>
                    <input
                      type="text"
                      value={profileForm.specialite}
                      onChange={(e) => setProfileForm({ ...profileForm, specialite: e.target.value })}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Diplôme</label>
                    <input
                      type="text"
                      value={profileForm.diplome}
                      onChange={(e) => setProfileForm({ ...profileForm, diplome: e.target.value })}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Expérience</label>
                    <input
                      type="text"
                      value={profileForm.experience}
                      onChange={(e) => setProfileForm({ ...profileForm, experience: e.target.value })}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Adresse</label>
                    <input
                      type="text"
                      value={profileForm.adresse}
                      onChange={(e) => setProfileForm({ ...profileForm, adresse: e.target.value })}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Téléphone</label>
                    <input
                      type="text"
                      value={profileForm.telephone}
                      onChange={(e) => setProfileForm({ ...profileForm, telephone: e.target.value })}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Tarif</label>
                    <input
                      type="text"
                      value={profileForm.tarif}
                      onChange={(e) => setProfileForm({ ...profileForm, tarif: e.target.value })}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Bio</label>
                    <textarea
                      value={profileForm.bio}
                      onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                      rows={3}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Langues (séparées par des virgules)</label>
                    <input
                      type="text"
                      value={profileForm.langues.join(', ')}
                      onChange={(e) => setProfileForm({ ...profileForm, langues: e.target.value.split(',').map(l => l.trim()) })}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={closeProfileModal}
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                    >
                      Sauvegarder
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Appointment Details Modal */}
        {selectedRdv && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow max-w-md w-full">
              <h2 className="text-xl font-bold mb-4">Détails du rendez-vous</h2>
              <p><strong>Date:</strong> {new Date(selectedRdv.date).toLocaleString()}</p>
              <p><strong>Motif:</strong> {selectedRdv.motif}</p>
              <p><strong>Statut:</strong> {selectedRdv.statut}</p>
              <p><strong>Utilisateur ID:</strong> {selectedRdv.utilisateurId}</p>
              <div className="flex space-x-2 mt-4">
                <button
                  onClick={() => {
                    updateRendezVousStatus(selectedRdv.id, 'confirmed');
                    setSelectedRdv(null);
                  }}
                  className="px-3 py-1 bg-green-600 text-white rounded"
                >
                  Confirmer
                </button>
                <button
                  onClick={() => {
                    updateRendezVousStatus(selectedRdv.id, 'pending');
                    setSelectedRdv(null);
                  }}
                  className="px-3 py-1 bg-yellow-600 text-white rounded"
                >
                  En attente
                </button>
                <button
                  onClick={() => {
                    updateRendezVousStatus(selectedRdv.id, 'cancelled');
                    setSelectedRdv(null);
                  }}
                  className="px-3 py-1 bg-red-600 text-white rounded"
                >
                  Annuler
                </button>
                <button className="px-3 py-1 bg-gray-600 text-white rounded" onClick={() => setSelectedRdv(null)}>Fermer</button>
              </div>
            </div>
          </div>
        )}

        {/* Subscription Modal */}
        {showSubscriptionModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow max-w-md w-full mx-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Souscrire à l'Abonnement Pro</h3>
                <button
                  onClick={() => setShowSubscriptionModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                  disabled={paymentStatus === 'processing'}
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
              <p className="text-gray-600 mb-6">
                Choisissez votre méthode de paiement pour l'abonnement Pro à 15 000 CFA / mois.
              </p>
              {paymentStatus === 'processing' && (
                <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
                  <p className="text-blue-800 text-sm">
                    Traitement du paiement via {paymentMethod}...
                  </p>
                </div>
              )}
              <div className="space-y-4">
                <button
                  onClick={() => handlePayment('Wave')}
                  disabled={paymentStatus === 'processing'}
                  className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {paymentStatus === 'processing' && paymentMethod === 'Wave' ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Traitement...
                    </div>
                  ) : (
                    'Payer avec Wave'
                  )}
                </button>
                <button
                  onClick={() => handlePayment('Orange Money')}
                  disabled={paymentStatus === 'processing'}
                  className="w-full px-4 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {paymentStatus === 'processing' && paymentMethod === 'Orange Money' ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Traitement...
                    </div>
                  ) : (
                    'Payer avec Orange Money'
                  )}
                </button>
                <button
                  onClick={() => handlePayment('Carte Bancaire')}
                  disabled={paymentStatus === 'processing'}
                  className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {paymentStatus === 'processing' && paymentMethod === 'Carte Bancaire' ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Traitement...
                    </div>
                  ) : (
                    'Payer par Carte Bancaire'
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashbordProfessionnal;
