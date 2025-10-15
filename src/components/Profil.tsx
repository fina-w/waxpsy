import React, { useState, useEffect } from 'react';

interface User {
  id: number;
  nom: string;
  email: string;
  motDePasse: string;
  role: string;
  dateInscription: string;
  actif: boolean;
}

const Profil: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen page-bg">
        <div className="container mx-auto px-4 py-8 text-center">Chargement du profil...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen page-bg">
        <div className="container mx-auto px-4 py-8 text-center">Utilisateur non trouvé</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen page-bg">
      {/* Header */}
      <header className="troubles-header p-4 flex justify-between items-center shadow-md">
        <div className="flex items-center">
          <img src="/black-logo.png" alt="WaxPsy Logo" className="h-10 mr-4" />
        </div>
        <nav className="hidden md:flex space-x-4 text-sm">
          <a href="/" className="text-green-700 hover:text-green-900">Accueil</a>
          <a href="/troubles" className="text-green-700 hover:text-green-900">Troubles</a>
          <a href="/articles" className="text-green-700 hover:text-green-900">Articles</a>
          <a href="/temoignages" className="text-green-700 hover:text-green-900">Témoignages</a>
          <a href="/professionals" className="text-green-700 hover:text-green-900">Professionnels</a>
          <a href="/glossaire" className="text-green-700 hover:text-green-900">Glossaire</a>
          <a href="/apropos" className="text-green-700 hover:text-green-900">A propos</a>
          <a href="/contact" className="text-green-700 hover:text-green-900">Contact</a>
          <a href="/profil" className="bg-green-100 text-green-800 px-4 py-2 rounded-full font-semibold">Profil</a>
        </nav>
      </header>

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
                    <p className="mt-1 text-sm text-gray-900">{new Date(user.dateInscription).toLocaleDateString('fr-FR')}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Statut</label>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${user.actif ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {user.actif ? 'Actif' : 'Inactif'}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4 text-green-800">Actions</h2>
                <div className="space-y-3">
                  <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
                    Modifier le profil
                  </button>
                  <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                    Changer le mot de passe
                  </button>
                  <button
                    onClick={() => {
                      localStorage.removeItem('user');
                      window.location.href = '/';
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
    </div>
  );
};

export default Profil;
