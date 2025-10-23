import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bars3Icon, HomeIcon, UserIcon, BriefcaseIcon, ChatBubbleLeftRightIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

const ShareExperience: React.FC = () => {
  const [experience, setExperience] = useState('');
  const [titre, setTitre] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!experience.trim()) {
      alert('Veuillez partager votre expérience.');
      return;
    }
    // Simulate submission
    console.log('Témoignage soumis:', { titre, email, experience });
    alert('Votre témoignage a été soumis avec succès !');
    navigate('/temoignages');
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-white via-white to-blue-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 shadow-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 sm:py-6">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <svg className="h-5 w-5 sm:h-6 sm:w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">Partager mon expérience</h1>
            </div>
            <div className="flex items-center space-x-4">
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

      {/* Main Content */}
      <div className="p-4 md:p-8">
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-4 md:p-6 space-y-6">
            {/* Titre Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Titre de votre expérience (optionnel)</label>
              <input
                type="text"
                value={titre}
                onChange={(e) => setTitre(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Ex: Mon parcours avec l'anxiété"
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
      </div>
    </div>
  );
};

export default ShareExperience;
