import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from './Header';

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
    <div className="min-h-screen bg-gradient-to-r from-white via-white to-blue-100">
      {/* Header */}
      <Header />

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
