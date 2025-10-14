import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  id: number;
  nom: string;
  email: string;
  motDePasse: string;
}

interface LoginProps {
  onClose: () => void;
  onSwitchToRegister: () => void;
}

const Login: React.FC<LoginProps> = ({ onClose, onSwitchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setMessage('Tous les champs sont requis');
      return;
    }
    try {
      const response = await fetch('http://localhost:3000/utilisateurs');
      const users = await response.json();
      const user = users.find((u: User) => u.email === email && u.motDePasse === password);
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/home');
      } else {
        setMessage('Identifiants invalides');
      }
    } catch {
      setMessage('Erreur lors de la connexion');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="flex w-full max-w-4xl mx-4 bg-white rounded-lg shadow-xl overflow-hidden">
        {/* Image Section */}
        <div className="hidden md:block w-2/5">
          <img
            src="/login-register.png"
            alt="Login"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Form Section */}
        <div className="w-full md:w-3/5 p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Connexion</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Mot de passe
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>

            {message && (
              <div className="text-red-600 text-sm">{message}</div>
            )}

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Se connecter
            </button>
          </form>

          <div className="mt-4 text-center">
            <button
              onClick={onSwitchToRegister}
              className="text-green-600 hover:text-green-800 text-sm"
            >
              Pas de compte ? S'inscrire
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
