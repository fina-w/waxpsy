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
    <div className="min-h-screen bg-gradient-to-r from-white via-white to-blue-100 flex items-center justify-center p-4">
      {/* Modal Overlay */}
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
          {/* Modal Header */}
          <div className="flex justify-between items-center p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Partager mon expérience</h2>
            <button
              onClick={() => navigate('/home')}
              className="text-gray-400 hover:text-gray-600 transition"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Modal Content */}
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
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
                rows={6}
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
    </div>
  );
};

export default ShareExperience;
