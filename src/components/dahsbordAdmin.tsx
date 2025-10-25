/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import {
  UsersIcon,
  BriefcaseIcon,
  ChatBubbleLeftRightIcon,
  ChartBarIcon,
  PencilIcon,
  TrashIcon,
  PlusIcon,
  CheckIcon,
  XMarkIcon,
  ClockIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const DahsbordAdmin: React.FC = () => {
  const { user, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  const [utilisateurs, setUtilisateurs] = useState<any[]>([]);
  const [professionnels, setProfessionnels] = useState<any[]>([]);
  const [temoignages, setTemoignages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('statistiques');

  // Modal / form state for Add / Edit
  const [modalOpen, setModalOpen] = useState(false);
  const [modalEntity, setModalEntity] = useState<'utilisateur' | 'professionnel' | 'temoignage' | null>(null);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [formData, setFormData] = useState<any>(null);

  const [utilisateursPage, setUtilisateursPage] = useState(1);
  const [professionnelsPage, setProfessionnelsPage] = useState(1);
  const [temoignagesPage, setTemoignagesPage] = useState(1);

  // Search inputs
  const [utilisateursQuery, setUtilisateursQuery] = useState('');
  const [professionnelsQuery, setProfessionnelsQuery] = useState('');
  const [temoignagesQuery, setTemoignagesQuery] = useState('');

  const itemsPerPage = 5;

  // Filtered lists (apply search queries)
  const filteredUtilisateurs = utilisateurs.filter(u => {
    const q = utilisateursQuery.trim().toLowerCase();
    if (!q) return true;
    return (u.nom || '').toLowerCase().includes(q) || (u.email || '').toLowerCase().includes(q);
  });

  const filteredProfessionnels = professionnels.filter(p => {
    const q = professionnelsQuery.trim().toLowerCase();
    if (!q) return true;
    return (p.nom || '').toLowerCase().includes(q) || (p.email || '').toLowerCase().includes(q) || (p.specialite || '').toLowerCase().includes(q);
  });

  const filteredTemoignages = temoignages.filter(t => {
    const q = temoignagesQuery.trim().toLowerCase();
    if (!q) return true;
    return (t.titre || '').toLowerCase().includes(q) || (t.contenu || '').toLowerCase().includes(q) || (t.auteur || '').toLowerCase().includes(q);
  });

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'administrateur') {
      navigate('/login');
      return;
    }

    const load = async () => {
      setLoading(true);
      try {
        const [uRes, pRes, tRes] = await Promise.all([
          fetch('/api/utilisateurs'),
          fetch('/api/professionnels'),
          fetch('/api/temoignages')
        ]);

        if (uRes.ok && pRes.ok && tRes.ok) {
          setUtilisateurs(await uRes.json());
          setProfessionnels(await pRes.json());
          setTemoignages(await tRes.json());
          setLoading(false);
          return;
        }
      } catch (err) {
        // fallback to db.json (log for debugging)
        console.error(err);
      }

      try {
        const res = await fetch('/db.json');
        if (res.ok) {
          const db = await res.json();
          setUtilisateurs(db.utilisateurs || []);
          setProfessionnels(db.professionnels || []);
          setTemoignages(db.temoignages || []);
        }
      } catch (err) {
        console.error('Failed to load admin data', err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [isAuthenticated, user, navigate]);

  const tryDelete = async (url: string) => {
    try {
      const res = await fetch(url, { method: 'DELETE' });
      return res.ok;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  const tryPatch = async (url: string, body: object) => {
    try {
      const res = await fetch(url, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      return res.ok;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const tryPost = async (url: string, body: object) => {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      if (res.ok) return await res.json();
      return null;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  // Open modal helpers
  const openAdd = (entity: 'utilisateur' | 'professionnel' | 'temoignage') => {
    setModalEntity(entity);
    setModalMode('add');
    setFormData({});
    setModalOpen(true);
  };

  const openEdit = (entity: 'utilisateur' | 'professionnel' | 'temoignage', item: any) => {
    setModalEntity(entity);
    setModalMode('edit');
    setFormData({ ...item });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalEntity(null);
    setFormData(null);
  };

  const saveEntity = async () => {
    if (!modalEntity) return;
    // UTILISATEUR
    if (modalEntity === 'utilisateur') {
      if (modalMode === 'add') {
        const created = await tryPost('/api/utilisateurs', formData || {});
        if (created) setUtilisateurs(prev => [...prev, created]);
        else setUtilisateurs(prev => [...prev, { id: Date.now(), ...(formData || {}) }]);
      } else {
        // edit
        await fetch(`/api/utilisateurs/${formData.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) }).catch(err => console.error(err));
        setUtilisateurs(prev => prev.map(u => u.id === formData.id ? formData : u));
      }
    }

    if (modalEntity === 'professionnel') {
      if (modalMode === 'add') {
        const created = await tryPost('/api/professionnels', formData || {});
        if (created) setProfessionnels(prev => [...prev, created]);
        else setProfessionnels(prev => [...prev, { id: Date.now(), ...(formData || {}) }]);
      } else {
        await fetch(`/api/professionnels/${formData.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) }).catch(err => console.error(err));
        setProfessionnels(prev => prev.map(p => p.id === formData.id ? formData : p));
      }
    }

    if (modalEntity === 'temoignage') {
        if (modalMode === 'add') {
        const created = await tryPost('/api/temoignages', formData || {});
        if (created) setTemoignages(prev => [...prev, created]);
        else setTemoignages(prev => [...prev, { id: Date.now(), ...(formData || {}) }]);
      } else {
        await fetch(`/api/temoignages/${formData.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) }).catch(err => console.error(err));
        setTemoignages(prev => prev.map(t => t.id === formData.id ? formData : t));
      }
    }

    closeModal();
  };

  const deleteUtilisateur = async (id: string | number) => {
    if (!confirm('Supprimer cet utilisateur ?')) return;
    await tryDelete(`/api/utilisateurs/${id}`);
    setUtilisateurs(prev => prev.filter(u => u.id !== id));
  };

  const deleteProfessionnel = async (id: string | number) => {
    if (!confirm('Supprimer ce professionnel ?')) return;
    await tryDelete(`/api/professionnels/${id}`);
    setProfessionnels(prev => prev.filter(p => p.id !== id));
  };

  const deleteTemoignage = async (id: string | number) => {
    if (!confirm('Supprimer ce témoignage ?')) return;
    await tryDelete(`/api/temoignages/${id}`);
    setTemoignages(prev => prev.filter(t => t.id !== id));
  };

  const approveTemoignage = async (id: string | number) => {
    await tryPatch(`/api/temoignages/${id}`, { status: 'approved' });
    setTemoignages(prev => prev.map(t => t.id === id ? { ...t, status: 'approved' } : t));
  };

  const rejectTemoignage = async (id: string | number) => {
    await tryPatch(`/api/temoignages/${id}`, { status: 'rejected' });
    setTemoignages(prev => prev.map(t => t.id === id ? { ...t, status: 'rejected' } : t));
  };

  const putOnHoldTemoignage = async (id: string | number) => {
    await tryPatch(`/api/temoignages/${id}`, { status: 'on_hold' });
    setTemoignages(prev => prev.map(t => t.id === id ? { ...t, status: 'on_hold' } : t));
  };

  const verifyProfessionnel = async (id: string | number) => {
    await tryPatch(`/api/professionnels/${id}`, { verified: true });
    setProfessionnels(prev => prev.map(p => p.id === id ? { ...p, verified: true } : p));
  };

  const unverifyProfessionnel = async (id: string | number) => {
    await tryPatch(`/api/professionnels/${id}`, { verified: false });
    setProfessionnels(prev => prev.map(p => p.id === id ? { ...p, verified: false } : p));
  };

  if (loading) return <div className="p-8">Chargement...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 text-gray-800">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <div className="w-72 bg-white/80 backdrop-blur-sm shadow-lg border-r border-gray-200">
          <div className="p-6">
            <nav className="space-y-2">
              {[
                { id: 'statistiques', label: 'Statistiques', icon: ChartBarIcon },
                { id: 'utilisateurs', label: 'Gestion utilisateurs', icon: UsersIcon, count: utilisateurs.length },
                { id: 'professionnels', label: 'Gestion professionnels', icon: BriefcaseIcon, count: professionnels.length },
                { id: 'temoignages', label: 'Gestion des témoignages', icon: ChatBubbleLeftRightIcon, count: temoignages.length }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-4 py-3 text-left rounded-xl transition-all duration-200 transform ${
                      activeTab === tab.id
                        ? 'bg-white shadow-sm text-blue-700 translate-x-1 border-l-4 border-blue-500'
                        : 'text-gray-600 hover:bg-gray-100 hover:translate-x-0'
                    }`}
                  >
                    <Icon className="h-5 w-5 mr-3 text-indigo-500" />
                    <div className="flex-1 flex justify-between items-center">
                      <span>{tab.label}</span>
                      {tab.count !== undefined && <span className="text-xs text-gray-500">{tab.count}</span>}
                    </div>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {activeTab === 'statistiques' && (
            <div>
              <header className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl leading-7 font-extrabold text-gray-900 mb-1">Tableau de bord administrateur</h3>
                  <p className="text-sm text-gray-600">Vue d'ensemble et gestion rapide</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className="text-xs text-gray-500">Connecté en tant que</div>
                    <div className="text-sm font-medium">{user?.nom || user?.email}</div>
                  </div>
                </div>
              </header>

              <h4 className="sr-only">Statistiques</h4>
              {/* Statistics Section */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div onClick={() => setActiveTab('utilisateurs')} className="bg-gradient-to-br from-white to-blue-50 p-6 rounded-2xl shadow-xl transform hover:-translate-y-1 transition-transform cursor-pointer">
                  <div className="flex items-center">
                    <div className="p-3 bg-white rounded-full shadow">
                      <UsersIcon className="h-8 w-8 text-indigo-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-indigo-700">Utilisateurs</p>
                      <p className="text-2xl font-bold text-gray-900">{utilisateurs.length}</p>
                    </div>
                  </div>
                </div>
                <div onClick={() => setActiveTab('professionnels')} className="bg-gradient-to-br from-white to-green-50 p-6 rounded-2xl shadow-xl transform hover:-translate-y-1 transition-transform cursor-pointer">
                  <div className="flex items-center">
                    <div className="p-3 bg-white rounded-full shadow">
                      <BriefcaseIcon className="h-8 w-8 text-green-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-green-700">Professionnels</p>
                      <p className="text-2xl font-bold text-gray-900">{professionnels.length}</p>
                    </div>
                  </div>
                </div>
                <div onClick={() => setActiveTab('temoignages')} className="bg-gradient-to-br from-white to-purple-50 p-6 rounded-2xl shadow-xl transform hover:-translate-y-1 transition-transform cursor-pointer">
                  <div className="flex items-center">
                    <div className="p-3 bg-white rounded-full shadow">
                      <ChatBubbleLeftRightIcon className="h-8 w-8 text-purple-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-purple-700">Témoignages</p>
                      <p className="text-2xl font-bold text-gray-900">{temoignages.length}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Bar Chart */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Répartition des Entités</h4>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={[
                      { name: 'Utilisateurs', value: utilisateurs.length },
                      { name: 'Professionnels', value: professionnels.length },
                      { name: 'Témoignages', value: temoignages.length }
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#3B82F6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Pie Chart */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Proportion des Entités</h4>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Utilisateurs', value: utilisateurs.length },
                          { name: 'Professionnels', value: professionnels.length },
                          { name: 'Témoignages', value: temoignages.length }
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${((percent as number) * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        <Cell fill="#3B82F6" />
                        <Cell fill="#10B981" />
                        <Cell fill="#8B5CF6" />
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {/* Content based on active tab */}
          {activeTab === 'utilisateurs' && (
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Gestion des Utilisateurs</h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    Gérez les comptes utilisateurs.
                  </p>
                </div>
                <button onClick={() => openAdd('utilisateur')} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                  <PlusIcon className="h-5 w-5 mr-2" />
                  Ajouter
                </button>
              </div>
              <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                <div className="flex items-center">
                  <div className="relative flex-1">
                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      value={utilisateursQuery}
                      onChange={e => { setUtilisateursQuery(e.target.value); setUtilisateursPage(1); }}
                      placeholder="Rechercher par nom ou email..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm shadow-sm"
                    />
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Téléphone</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Adresse</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredUtilisateurs.slice((utilisateursPage - 1) * itemsPerPage, utilisateursPage * itemsPerPage).map(u => (
                      <tr key={u.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{u.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{u.nom}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{u.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{u.telephone || 'N/A'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{u.adresse || 'N/A'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button onClick={() => openEdit('utilisateur', u)} className="text-blue-600 hover:text-blue-900 flex items-center">
                              <PencilIcon className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => deleteUtilisateur(u.id)}
                              className="text-red-600 hover:text-red-900 flex items-center"
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
              <div className="flex justify-between items-center mt-4 px-4 py-3 bg-gray-50">
                <button
                  onClick={() => setUtilisateursPage(prev => Math.max(1, prev - 1))}
                  disabled={utilisateursPage === 1}
                  className="flex items-center px-3 py-1 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeftIcon className="h-4 w-4 mr-1" />
                  Précédent
                </button>
                <span className="text-sm text-gray-700">
                  Page {utilisateursPage} sur {Math.max(1, Math.ceil(filteredUtilisateurs.length / itemsPerPage))}
                </span>
                <button
                  onClick={() => setUtilisateursPage(prev => Math.min(Math.ceil(utilisateurs.length / itemsPerPage), prev + 1))}
                  disabled={utilisateursPage === Math.ceil(filteredUtilisateurs.length / itemsPerPage)}
                  className="flex items-center px-3 py-1 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Suivant
                  <ChevronRightIcon className="h-4 w-4 ml-1" />
                </button>
              </div>
            </div>
          )}

          {activeTab === 'professionnels' && (
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Gestion des Professionnels</h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    Gérez les comptes professionnels.
                  </p>
                </div>
                <button onClick={() => openAdd('professionnel')} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                  <PlusIcon className="h-5 w-5 mr-2" />
                  Ajouter
                </button>
              </div>
              <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                <div className="flex items-center">
                  <div className="relative flex-1">
                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      value={professionnelsQuery}
                      onChange={e => { setProfessionnelsQuery(e.target.value); setProfessionnelsPage(1); }}
                      placeholder="Rechercher par nom, email ou spécialité..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm shadow-sm"
                    />
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Spécialité</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Téléphone</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredProfessionnels.slice((professionnelsPage - 1) * itemsPerPage, professionnelsPage * itemsPerPage).map(p => (
                      <tr key={p.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{p.nom}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{p.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{p.specialite || 'N/A'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{p.telephone || 'N/A'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            {p.verified ? (
                              <button
                                onClick={() => unverifyProfessionnel(p.id)}
                                className="text-red-600 hover:text-red-900 flex items-center"
                              >
                                <XMarkIcon className="h-5 w-5" />
                              </button>
                            ) : (
                              <button
                                onClick={() => verifyProfessionnel(p.id)}
                                className="text-green-600 hover:text-green-900 flex items-center"
                              >
                                <CheckIcon className="h-5 w-5" />
                              </button>
                            )}
                            <button onClick={() => openEdit('professionnel', p)} className="text-blue-600 hover:text-blue-900 flex items-center">
                              <PencilIcon className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => deleteProfessionnel(p.id)}
                              className="text-red-600 hover:text-red-900 flex items-center"
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
              <div className="flex justify-between items-center mt-4 px-4 py-3 bg-gray-50">
                <button
                  onClick={() => setProfessionnelsPage(prev => Math.max(1, prev - 1))}
                  disabled={professionnelsPage === 1}
                  className="flex items-center px-3 py-1 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeftIcon className="h-4 w-4 mr-1" />
                  Précédent
                </button>
                <span className="text-sm text-gray-700">
                  Page {professionnelsPage} sur {Math.ceil(professionnels.length / itemsPerPage)}
                </span>
                <button
                  onClick={() => setProfessionnelsPage(prev => Math.min(Math.ceil(professionnels.length / itemsPerPage), prev + 1))}
                  disabled={professionnelsPage === Math.ceil(professionnels.length / itemsPerPage)}
                  className="flex items-center px-3 py-1 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Suivant
                  <ChevronRightIcon className="h-4 w-4 ml-1" />
                </button>
              </div>
            </div>
          )}

          {activeTab === 'temoignages' && (
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <div className="px-4 py-5 sm:px-6">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Gestion des Témoignages</h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    Gérez les témoignages des utilisateurs.
                  </p>
                </div>
              </div>
              <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                <div className="flex items-center">
                  <div className="relative w-64">
                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      value={temoignagesQuery}
                      onChange={e => { setTemoignagesQuery(e.target.value); setTemoignagesPage(1); }}
                      placeholder="Rechercher par titre, contenu ou auteur..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm shadow-sm"
                    />
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Titre</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contenu</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Auteur</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredTemoignages.slice((temoignagesPage - 1) * itemsPerPage, temoignagesPage * itemsPerPage).map(t => (
                      <tr key={t.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{t.id}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{t.titre}</td>
                          <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{t.contenu || 'N/A'}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{t.auteur || 'Anonyme'}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {t.status ? (
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-all duration-200 transform ${t.status === 'approved' ? 'bg-green-100 text-green-800 hover:scale-105' : t.status === 'rejected' ? 'bg-red-100 text-red-800 hover:scale-105' : 'bg-yellow-100 text-yellow-800 hover:scale-105'}`}>
                                {t.status === 'approved' ? 'Approuvé' : t.status === 'rejected' ? 'Rejeté' : 'En attente'}
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 transition transform duration-200 hover:scale-105">Non traité</span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2 items-center">
                              {/* edit removed for témoignages per request */}
                              <button
                                title="Approuver"
                                onClick={() => approveTemoignage(t.id)}
                                className={`px-2 py-1 rounded text-sm flex items-center transition transform duration-150 ${t.status === 'approved' ? 'bg-green-50 text-green-700 scale-100' : 'bg-transparent text-green-600 hover:bg-green-100 hover:scale-105'}`}
                              >
                                <CheckIcon className="h-4 w-4" />
                              </button>
                              <button
                                title="Rejeter"
                                onClick={() => rejectTemoignage(t.id)}
                                className={`px-2 py-1 rounded text-sm flex items-center transition transform duration-150 ${t.status === 'rejected' ? 'bg-red-50 text-red-700' : 'bg-transparent text-red-600 hover:bg-red-100 hover:scale-105'}`}
                              >
                                <XMarkIcon className="h-4 w-4" />
                              </button>
                              <button
                                title="Mettre en attente"
                                onClick={() => putOnHoldTemoignage(t.id)}
                                className={`px-2 py-1 rounded text-sm flex items-center transition transform duration-150 ${t.status === 'on_hold' ? 'bg-yellow-50 text-yellow-700' : 'bg-transparent text-yellow-600 hover:bg-yellow-100 hover:scale-105'}`}
                              >
                                <ClockIcon className="h-4 w-4" />
                              </button>
                              <button
                                title="Supprimer"
                                onClick={() => deleteTemoignage(t.id)}
                                className="px-2 py-1 bg-red-50 text-red-700 rounded hover:bg-red-100 text-sm flex items-center transition transform active:scale-95"
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

              <div className="flex justify-between items-center mt-4 px-4 py-3 bg-gray-50">
                <button
                  onClick={() => setTemoignagesPage(prev => Math.max(1, prev - 1))}
                  disabled={temoignagesPage === 1}
                  className="flex items-center px-3 py-1 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeftIcon className="h-4 w-4 mr-1" />
                  Précédent
                </button>
                <span className="text-sm text-gray-700">
                  Page {temoignagesPage} sur {Math.ceil(temoignages.length / itemsPerPage)}
                </span>
                <button
                  onClick={() => setTemoignagesPage(prev => Math.min(Math.ceil(temoignages.length / itemsPerPage), prev + 1))}
                  disabled={temoignagesPage === Math.ceil(temoignages.length / itemsPerPage)}
                  className="flex items-center px-3 py-1 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Suivant
                  <ChevronRightIcon className="h-4 w-4 ml-1" />
                </button>
              </div>
            </div>
          )}
          {/* Modal (simple) */}
          {modalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-lg w-full max-w-xl p-6">
                <h3 className="text-lg font-medium mb-4">{modalMode === 'add' ? 'Ajouter' : 'Modifier'} {modalEntity}</h3>
                <div className="space-y-4">
                  {/* Common fields: nom, email, telephone, specialite, titre, contenu */}
                  {modalEntity === 'utilisateur' && (
                    <>
                      <input value={formData?.nom || ''} onChange={e => setFormData({ ...formData, nom: e.target.value })} placeholder="Nom" className="w-full border px-3 py-2 rounded" />
                      <input value={formData?.email || ''} onChange={e => setFormData({ ...formData, email: e.target.value })} placeholder="Email" className="w-full border px-3 py-2 rounded" />
                    </>
                  )}
                  {modalEntity === 'professionnel' && (
                    <>
                      <input value={formData?.nom || ''} onChange={e => setFormData({ ...formData, nom: e.target.value })} placeholder="Nom" className="w-full border px-3 py-2 rounded" />
                      <input value={formData?.email || ''} onChange={e => setFormData({ ...formData, email: e.target.value })} placeholder="Email" className="w-full border px-3 py-2 rounded" />
                      <input value={formData?.specialite || ''} onChange={e => setFormData({ ...formData, specialite: e.target.value })} placeholder="Spécialité" className="w-full border px-3 py-2 rounded" />
                    </>
                  )}
                  {modalEntity === 'temoignage' && (
                    <>
                      <input value={formData?.titre || ''} onChange={e => setFormData({ ...formData, titre: e.target.value })} placeholder="Titre" className="w-full border px-3 py-2 rounded" />
                      <textarea value={formData?.contenu || ''} onChange={e => setFormData({ ...formData, contenu: e.target.value })} placeholder="Contenu" className="w-full border px-3 py-2 rounded" />
                    </>
                  )}
                </div>
                <div className="mt-4 flex justify-end space-x-2">
                  <button onClick={closeModal} className="px-4 py-2 bg-gray-200 rounded">Annuler</button>
                  <button onClick={saveEntity} className="px-4 py-2 bg-blue-600 text-white rounded">Enregistrer</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DahsbordAdmin;
