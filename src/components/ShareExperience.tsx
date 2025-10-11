import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ShareExperience: React.FC = () => {
  const [experience, setExperience] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!experience.trim()) {
      alert('Veuillez partager votre expérience.');
      return;
    }
    // Simulate submission
    console.log('Témoignage soumis:', { name, email, experience });
    alert('Votre témoignage a été soumis avec succès !');
    navigate('/temoignages');
  };

  return (
    <div className="min-h-screen bg-blue-50">
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
          <a href="/profil" className="text-green-700 hover:text-green-900">Profil</a>
        </nav>
      </header>

      {/* Main Content */}
      <main className="p-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8 troubles-title">Partager mon expérience</h1>
          
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 space-y-6">
            {/* Name Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Votre nom (optionnel)</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Ex: Marie Dupont"
              />
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Votre email (optionnel)</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="exemple@email.com"
              />
            </div>

            {/* Experience Textarea */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                Votre expérience <span className="ml-1 text-red-500 text-xs">*</span>
              </label>
              <textarea
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                required
                rows={10}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                placeholder="Racontez votre histoire... (trouble, symptômes, parcours, conseils...)"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Témoigner
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default ShareExperience;
