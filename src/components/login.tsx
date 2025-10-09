import React from "react";

const Login: React.FC = () => {
  return (
    <div className="flex h-screen bg-[#C8FACC] justify-center items-center font-sans">
      {/* Conteneur principal */}
      <div className="flex bg-white rounded-lg shadow-lg overflow-hidden w-[900px] h-[500px]">
        
        {/* Image à gauche */}
        <div className="w-1/2 bg-gray-100 flex justify-center items-center">
          <img
            src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTgd5dfmmoo97TJzYwUlvGuTZhfAgUvRVnOgUCLr6efsVYg_aET" // 🔹 place ton SVG noir ici (dans /public)
            alt="Mental Health Awareness"
            className="w-[90%] h-[90%] object-contain"
          />
        </div>

        {/* Formulaire à droite */}
        <div className="w-1/2 flex flex-col items-center justify-center p-10">
          {/* Logo + titre */}
          <div className="flex items-center mb-5">
            <img
              src="https://previews.123rf.com/images/tmricons/tmricons1510/tmricons151000371/45812514-brain-icon.jpg"
              alt="Logo WaxPsy"
              className="w-10 h-10 mr-3"
            />
            <div className="text-left">
              <h1 className="text-2xl font-bold m-0">WaxPsy</h1>
              <p className="text-xs italic text-gray-600 m-0">
                Mental Health Awareness
              </p>
            </div>
          </div>

          <h2 className="font-bold text-2xl mb-5">Connexion</h2>

          <form className="w-full max-w-xs">
            <label htmlFor="email" className="block mb-1 font-semibold text-sm">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-2 mb-4 rounded border border-gray-300 text-sm"
              placeholder="Entrez votre email"
            />

            <label htmlFor="password" className="block mb-1 font-semibold text-sm">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-2 mb-3 rounded border border-gray-300 text-sm"
              placeholder="Entrez votre mot de passe"
            />

            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center text-xs">
                <input type="checkbox" id="remember" className="mr-2" />
                <label htmlFor="remember">Se souvenir de moi</label>
              </div>
              <a href="#" className="text-red-600 text-xs hover:underline">
                Mot de passe oublié
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-green-800 text-white py-2 rounded-full text-lg hover:bg-green-900 transition-colors"
            >
              Se Connecter
            </button>
          </form>

          <p className="mt-4 text-xs">
            Pas de compte ?{" "}
            <a href="#" className="text-green-800 font-bold hover:underline">
              S'inscrire
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
