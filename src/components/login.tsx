import React from 'react';

const Login: React.FC = () => {
  return (
    <div className="flex h-screen bg-green-100 font-sans">
      <div className="flex-1 flex justify-center items-center p-5">
        <img
          src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTgd5dfmmoo97TJzYwUlvGuTZhfAgUvRVnOgUCLr6efsVYg_aET"
          alt="Mental Health Word Cloud"
          className="max-w-full max-h-full object-contain"
          style={{ maxWidth: '100%', maxHeight: '100%' }}
        />
      </div>
      <div className="flex-1 bg-white m-10 rounded-lg p-8 shadow-md flex flex-col items-center">
        <div className="flex items-center mb-5">
          <svg
            className="w-10 h-10 mr-3 text-black"
            fill="currentColor"
            viewBox="0 0 64 64"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="brain"
            role="img"
          >
            <path d="M32 2C18 2 6 14 6 28c0 9 6 16 14 18v8h12v-8c8-2 14-9 14-18 0-14-12-26-26-26zm0 4c11 0 20 9 20 20 0 7-5 13-12 15v7H24v-7c-7-2-12-8-12-15 0-11 9-20 20-20z"/>
            <path d="M22 22h4v20h-4zM38 22h4v20h-4z"/>
          </svg>
          <div className="text-left">
            <h1 className="text-2xl font-bold m-0">WaxPsy</h1>
            <p className="text-xs italic text-gray-600 m-0">Mental Health Awareness</p>
          </div>
        </div>
        <h2 className="font-bold text-2xl mb-5">Connexion</h2>
        <form className="w-full">
          <label htmlFor="email" className="block mb-1 font-semibold">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full p-2 mb-4 rounded border border-gray-300 text-sm"
          />

          <label htmlFor="password" className="block mb-1 font-semibold">password</label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full p-2 mb-4 rounded border border-gray-300 text-sm"
          />

          <button
            type="submit"
            className="w-full bg-green-800 text-white py-2 rounded-full text-lg hover:bg-green-900 transition-colors"
          >
            Se Connecter
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
