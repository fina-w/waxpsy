import React from "react";
import { Link } from "react-router-dom";

const Register: React.FC = () => {
  return (
    <div className="flex h-screen bg-[#C8FACC] justify-center items-center font-sans">
      <div className="flex bg-white shadow-lg overflow-hidden w-[900px] h-[550px] rounded-[40px]">
        {/* Image à gauche */}
        <div className="w-1/2 bg-gray-100 flex justify-center items-center rounded-l-[40px] overflow-hidden">
          <img
            src="/mental.svg"
            alt="Mental Health Awareness"
            className="w-[90%] h-[90%] object-contain"
          />
        </div>

        {/* Formulaire */}
        <div className="w-1/2 flex flex-col items-center justify-center p-10 rounded-r-[40px]">
          {/* Logo */}
          <div className="flex items-center mb-5">
            <img src="/logo_brain.svg" alt="Logo" className="w-10 h-10 mr-3" />
            <div className="text-left">
              <h1 className="text-2xl font-bold m-0">WaxPsy</h1>
              <p className="text-xs italic text-gray-600 m-0">
                Mental Health Awareness
              </p>
            </div>
          </div>

          <h2 className="font-bold text-2xl mb-5">Inscription</h2>

          <form className="w-full max-w-xs">
            <label className="block mb-1 font-semibold text-sm">Nom</label>
            <input
              type="text"
              className="w-full p-2 mb-3 rounded-full border border-gray-300 text-sm"
            />

            <label className="block mb-1 font-semibold text-sm">Prénom</label>
            <input
              type="text"
              className="w-full p-2 mb-3 rounded-full border border-gray-300 text-sm"
            />

            <label className="block mb-1 font-semibold text-sm">Téléphone</label>
            <input
              type="tel"
              className="w-full p-2 mb-3 rounded-full border border-gray-300 text-sm"
            />

            <label className="block mb-1 font-semibold text-sm">Email</label>
            <input
              type="email"
              className="w-full p-2 mb-3 rounded-full border border-gray-300 text-sm"
            />

            <label className="block mb-1 font-semibold text-sm">Password</label>
            <input
              type="password"
              className="w-full p-2 mb-4 rounded-full border border-gray-300 text-sm"
            />

            <button
              type="submit"
              className="w-full bg-green-800 text-white py-2 rounded-full text-lg hover:bg-green-900 transition-colors"
            >
              S’inscrire
            </button>
          </form>

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
