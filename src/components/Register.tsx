import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setMessage('All fields are required');
      return;
    }
    try {
      const response = await fetch('http://localhost:3000/utilisateurs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nom: name, email, motDePasse: password }),
      });
      if (response.ok) {
        setMessage('Registration successful');
        setTimeout(() => navigate('/'), 2000);
      } else {
        setMessage('Registration failed');
      }
    } catch {
      setMessage('Error registering user');
    }
  };

  return (
    <div className="flex h-screen bg-[#C8FACC] justify-center items-center font-sans">
      <div className="flex bg-white shadow-lg overflow-hidden w-[900px] h-[550px] rounded-[40px]">
        {/* Image à gauche */}
        <div className="w-1/2 bg-gray-100 flex justify-center items-center rounded-l-[40px] overflow-hidden">
          <img
            src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTgd5dfmmoo97TJzYwUlvGuTZhfAgUvRVnOgUCLr6efsVYg_aET "
            alt="Mental Health Awareness"
            className="w-[90%] h-[90%] object-contain"
          />
        </div>

        {/* Formulaire */}
        <div className="w-1/2 flex flex-col items-center justify-center p-10 rounded-r-[40px]">
          {/* Logo */}
          <div className="flex items-center mb-5">
            <img src="https://previews.123rf.com/images/tmricons/tmricons1510/tmricons151000371/45812514-brain-icon.jpg" alt="Logo" className="w-10 h-10 mr-3" />
            <div className="text-left">
              <h1 className="text-2xl font-bold m-0">WaxPsy</h1>
              <p className="text-xs italic text-gray-600 m-0">
                Mental Health Awareness
              </p>
            </div>
          </div>

          <h2 className="font-bold text-2xl mb-5">Inscription</h2>

          <form onSubmit={handleSubmit} className="w-full max-w-xs">
            <label className="block mb-1 font-semibold text-sm">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 mb-3 rounded-full border border-gray-300 text-sm"
            />

            <label className="block mb-1 font-semibold text-sm">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 mb-3 rounded-full border border-gray-300 text-sm"
            />

            <label className="block mb-1 font-semibold text-sm">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 mb-4 rounded-full border border-gray-300 text-sm"
            />

            <button
              type="submit"
              className="w-full bg-green-800 text-white py-2 rounded-full text-lg hover:bg-green-900 transition-colors"
            >
              S’inscrire
            </button>
          </form>

          {message && <p className="mt-4 text-sm text-red-600">{message}</p>}

          <p className="mt-4 text-xs">
            Déjà un compte ?{" "}
            <Link
              to="/"
              className="text-green-800 font-bold hover:underline"
            >
              Connectez-vous
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
