import React from "react";

const Homepage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section avec Header intégré */}
      <section
        className="relative bg-cover bg-center h-[600px] flex flex-col justify-center items-center text-white"
        style={{ backgroundImage: "url('public/homepage-img.jpg')" }}
      >
        {/* Overlay sombre pour améliorer la lisibilité */}
        <div className="absolute inset-0 bg-black opacity-40"></div>

        {/* Header superposé */}
        <header className="absolute top-0 left-0 right-0 z-20 text-white flex items-center justify-between px-6 py-4">
          <img
            src="/public/black-logo.png"
            alt="WaxPsy Logo"
            className="h-10 w-50 brightness-0 invert"
          />
          <nav className="space-x-4 text-sm">
            <a href="/" className="underline hover:text-gray-300 transition">Accueil</a>
            <a href="/troubles" className="hover:text-gray-300 transition">Troubles</a>
            <a href="/articles" className="hover:text-gray-300 transition">Articles</a>
            <a href="/temoignages" className="hover:text-gray-300 transition">Témoignages</a>
            <a href="/glossaire" className="hover:text-gray-300 transition">Glossaire</a>
            <a href="/quiz" className="hover:text-green-300 transition">Professionnels</a>
            <a href="/apropos" className="hover:text-gray-300 transition">A propos</a>
            <a href="/contact" className="hover:text-gray-300 transition">Contact</a>
            <a href="/profil" className="hover:text-gray-300 transition">Profil</a>
          </nav>
        </header>

        {/* Contenu principal du Hero */}
        <div className="relative z-10 text-center">
          <h1 className="text-5xl font-serif font-bold mb-6 tracking-wide">
            COMPRENDRE LA SANTE MENTALE
          </h1>
          <button className="border-2 border-white rounded-full px-8 py-3 flex items-center space-x-2 hover:bg-white hover:text-black transition mx-auto">
            <span className="text-lg">Lire le Glossaire</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </section>

      {/* About Section */}
      <section className="flex flex-col md:flex-row items-center bg-gradient-to-b from-white to-blue-100 px-6 py-12 space-y-8 md:space-y-0 md:space-x-12">
        <img
          src="/green-ribbon.png"
          alt="Green Ribbon"
          className="w-48 h-auto"
        />
        <div className="max-w-xl">
          <h2 className="text-3xl font-serif font-bold mb-4">C'est quoi WaxPsy ?</h2>
          <p className="text-lg leading-relaxed">
            WaxPsy est une plateforme web sénégalaise dédiée à la sensibilisation aux troubles mentaux méconnus. Elle combine éducation, témoignages authentiques et histoires contextualisées pour démystifier ces troubles dans un contexte culturel africain, mais surtout sénégalais.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Homepage;