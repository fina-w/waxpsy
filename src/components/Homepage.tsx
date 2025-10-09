import React from "react";

const Homepage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className=" text-black flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-3">
          <img
            src="/logo.png"
            alt=""
            className="h-10 w-10"
          />
          <div className="text-xl font-script font-semibold">WaxPsy</div>
          <div className="text-xs italic">Mental Health Awareness</div>
        </div>
        <nav className="space-x-4 text-sm">
          <a href="/" className="underline">Accueil</a>
          <a href="/troubles">Troubles</a>
          <a href="/articles">Articles</a>
          <a href="/temoignages">Témoignages</a>
          <a href="/glossaire">Glossaire</a>
          <a href="/apropos">A propos</a>
          <a href="/contact">Contact</a>
          <a href="/profil">Profil</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-[500px] flex flex-col justify-center items-center text-white"
        style={{ backgroundImage: "url('/hero-background.jpg')" }}
      >
        <h1 className="text-4xl font-serif font-bold mb-6">
          COMPRENDRE LA SANTE MENTALE
        </h1>
        <button className="border border-white rounded-full px-6 py-2 flex items-center space-x-2 hover:bg-white hover:text-black transition">
          <span>Lire le Glossaire</span>
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
      </section>

      {/* About Section */}
      <section className="flex flex-col md:flex-row items-center bg-gradient-to-b from-white to-blue-100 px-6 py-12 space-y-8 md:space-y-0 md:space-x-12">
        <img
          src="/green-ribbon.png"
          alt="Green Ribbon"
          className="w-48 h-auto"
        />
        <div className="max-w-xl">
          <h2 className="text-3xl font-serif font-bold mb-4">C’est quoi WaxPsy ?</h2>
          <p className="text-lg leading-relaxed">
            WaxPsy est une plateforme web sénégalaise dédiée à la sensibilisation aux troubles mentaux méconnus. Elle combine éducation, témoignages authentiques et histoires contextualisées pour démystifier ces troubles dans un contexte culturel africain, mais surtout sénégalais.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
