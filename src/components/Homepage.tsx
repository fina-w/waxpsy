import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./footer.tsx";
import type { Trouble, Temoignage } from "../types/types";
import Header from "./Header.tsx";

const Homepage: React.FC = () => {
  const navigate = useNavigate();
  const [troubles, setTroubles] = useState<Trouble[]>([]);
  const [temoignages, setTemoignages] = useState<Temoignage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentTroubleIndex, setCurrentTroubleIndex] = useState(0);
  const [currentTemoignageIndex, setCurrentTemoignageIndex] = useState(0);

  const nextTroubles = () => {
    setCurrentTroubleIndex((prev) =>
      prev + 3 >= troubles.length ? 0 : prev + 3
    );
  };

  const prevTroubles = () => {
    setCurrentTroubleIndex((prev) =>
      prev - 3 < 0 ? Math.max(0, troubles.length - 3) : prev - 3
    );
  };

  // Pour les témoignages
  const nextTemoignages = () => {
    setCurrentTemoignageIndex((prev) =>
      prev + 3 >= temoignages.length ? 0 : prev + 3
    );
  };

  const prevTemoignages = () => {
    setCurrentTemoignageIndex((prev) =>
      prev - 3 < 0 ? Math.max(0, temoignages.length - 3) : prev - 3
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Récupération des troubles
        const troublesRes = await fetch("http://localhost:3000/troubles");
        if (!troublesRes.ok)
          throw new Error("Erreur lors du chargement des troubles");
        const troublesData = await troublesRes.json();

        // Récupération des témoignages approuvés
        const temoignagesRes = await fetch(
          "http://localhost:3000/temoignages?statut=approuvé"
        );
        if (!temoignagesRes.ok)
          throw new Error("Erreur lors du chargement des témoignages");
        const temoignagesData = await temoignagesRes.json();

        setTroubles(troublesData); // NOUVEAU - charge tous les troubles
        setTemoignages(temoignagesData); // NOUVEAU - charge tous les témoignages
        setError(null);
      } catch (err) {
        console.error("Erreur lors du chargement des données:", err);
        setError(
          "Une erreur est survenue lors du chargement des données. Veuillez réessayer plus tard."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Auto-scroll pour les troubles (toutes les 5 secondes)
  useEffect(() => {
    if (troubles.length > 3) {
      const interval = setInterval(() => {
        nextTroubles();
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [troubles.length, currentTroubleIndex]);

  // Auto-scroll pour les témoignages (toutes les 5 secondes)
  useEffect(() => {
    if (temoignages.length > 3) {
      const interval = setInterval(() => {
        nextTemoignages();
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [temoignages.length, currentTemoignageIndex]);

  const handleTroubleClick = (id: string) => {
    navigate(`/troubles/${id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl font-serif">
          Chargement des données en cours...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600 text-lg p-4 border border-red-300 rounded bg-red-50">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col container bg-gradient-to-r from-white via-white to-blue-100">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-[600px] flex flex-col  text-white"
        style={{ backgroundImage: "url('/homepage-img.jpg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>

        {/* Header superposé */}
        <Header />

        {/* Contenu principal du Hero */}
        <div className="relative z-10 justify-center items-center text-center mt-50">
          <h1 className="text-5xl font-serif font-bold mb-6 tracking-wide">
            COMPRENDRE LA SANTE MENTALE
          </h1>
          <button
            onClick={() => navigate("/glossaire")}
            className="border-2 border-white rounded-full px-8 py-3 flex items-center space-x-2 hover:bg-white hover:text-black transition mx-auto"
          >
            <span className="text-lg">Lire le Glossaire</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </section>

      {/* Section A propos */}
      <section className="flex flex-col justify-center items-center md:flex-row bg-gradient-to-r from-white via-white to-blue-100 px-6 py-12 space-y-8 md:space-y-0 md:space-x-12">
        <img
          src="/c-est-quoi-waxpsy.png"
          alt="Green Ribbon"
          className="w-70 h-auto"
        />
        <div className="max-w-xl">
          <h2 className="text-4xl font-serif font-bold mb-4">
            C'est quoi WaxPsy ?
          </h2>
          <p className="text-lg leading-relaxed">
            WaxPsy est une plateforme web sénégalaise dédiée à la
            sensibilisation aux troubles mentaux méconnus. Elle combine
            éducation, témoignages authentiques et histoires contextualisées
            pour démystifier ces troubles dans un contexte culturel africain,
            mais surtout sénégalais.
          </p>
        </div>
      </section>

      {/* Section Découvrez - DYNAMIQUE */}
      <section className="px-6 py-6 bg-gradient-to-r from-white via-white to-blue-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-serif">Découvrez</h2>
            <a
              href="/troubles"
              className="text-green-700 font-semibold flex items-center hover:text-[#015635] transition"
            >
              Voir tous les troubles
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          </div>
          <div className="relative px-16">
            {/* Boutons de navigation */}
            {troubles.length > 3 && (
              <>
                <button
                  onClick={prevTroubles}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-10 bg-[#015635] rounded-full p-3 shadow-lg hover:bg-gray-100 transition z-10"
                  aria-label="Trouble précédent"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  onClick={nextTroubles}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-10 bg-[#015635] rounded-full p-3 shadow-lg hover:bg-gray-100 transition z-10"
                  aria-label="Trouble suivant"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </>
            )}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-500 ease-in-out">
              {troubles
                .slice(currentTroubleIndex, currentTroubleIndex + 3)
                .map((trouble) => (
                  <div
                    key={trouble.id}
                    className="bg-transparent cursor-pointer group"
                    onClick={() => handleTroubleClick(trouble.id)}
                  >
                    <div className="relative h-50 overflow-hidden">
                      <img
                        src={trouble.image}
                        alt={trouble.nom}
                        className="w-full h-full object-cover transition-all duration-300 group-hover:brightness-50 group-hover:blur-sm"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/adhd.jpg";
                        }}
                      />
                      {/* Bouton Lire qui apparaît au survol */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button className="bg-transparent border-2 border-white text-white font-semibold px-8 py-3 rounded-full hover:bg-white hover:text-gray-900 transition-colors duration-300">
                          Lire
                        </button>
                      </div>
                    </div>
                    <div className="p-auto">
                      <h3 className="font-serif text-xl font-medium mb-2">
                        {trouble.nom}
                      </h3>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section Pour mieux comprendre */}
      <section className="bg-[#015635] text-white px-6 py-16 relative ">
        <div>
          {/* La vague SVG en haut */}
          <div
            className="absolute top-0 left-0 w-full bg-[#015635] overflow-hidden leading-none"
            style={{ lineHeight: 0 }}
          >
            <svg
              className="relative block w-full h-24"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient
                  id="waveGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop
                    offset="60%"
                    style={{ stopColor: "#ffffff", stopOpacity: 1 }}
                  />
                  <stop
                    offset="60%"
                    style={{ stopColor: "#ffffff", stopOpacity: 1 }}
                  />
                  <stop
                    offset="100%"
                    style={{ stopColor: "#dbeafe", stopOpacity: 1 }}
                  />
                </linearGradient>
              </defs>
              <path
                d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                fill="url(#waveGradient)"
              ></path>
            </svg>
          </div>
          <div className="max-w-5xl mx-auto text-center relative mt-[-500] ">
            <h2 className="text-3xl font-serif text-white mb-12">
              Pour mieux comprendres les troubles mentaux,Explorez
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="border-2 border-black rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-shadow">
                <div className="mb-6">
                  <img
                    src="/histoires.png"
                    alt="Story Book"
                    className="w-32 h-32 mx-auto"
                  />
                </div>
                <h3 className="font-serif text-2xl font-bold mb-3 text-white">
                  Nos Histoires Sénégalaises
                </h3>
                <p className="text-white text-lg leading-relaxed">
                  Récits contextualisés avec des personnages locaux
                </p>
              </div>

              <div className="border-2 border-black rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-shadow">
                <div className="mb-6">
                  <img
                    src="/quiz.png"
                    alt="Quiz"
                    className="w-32 h-32 mx-auto"
                  />
                </div>
                <h3 className="font-serif text-2xl font-bold mb-3 text-white">
                  Testez vos connaissances
                </h3>
                <p className="text-white text-lg leading-relaxed">
                  Évaluez votre compréhension des troubles mentaux
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Témoignages */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-white">
              Quelques Témoignages
            </h2>
            <button className="text-white font-medium hover:opacity-80 transition-opacity flex items-center gap-2">
              Tout Voir <span className="text-xl">→</span>
            </button>
          </div>

          <div className="relative px-16">
            {/* Boutons de navigation pour les témoignages */}
            {temoignages.length > 3 && (
              <>
                <button
                  onClick={prevTemoignages}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-10 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition z-10"
                  aria-label="Témoignage précédent"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  onClick={nextTemoignages}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-10 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition z-10"
                  aria-label="Témoignage suivant"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </>
            )}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-500 ease-in-out">
              {temoignages
                .slice(currentTemoignageIndex, currentTemoignageIndex + 3)
                .map((temoignage) => (
                <div
                  key={temoignage.id}
                  className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow flex flex-col"
                >
                  {/* En-tête avec nom et date */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-semibold text-sm text-gray-800">
                        {temoignage.utilisateurId
                          ? `Utilisateur ${temoignage.utilisateurId}`
                          : "Anonyme"}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">
                        Il y a 2 jours
                      </p>
                    </div>
                  </div>

                  {/* Titre avec badge */}
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="font-bold text-base text-gray-900 flex-grow">
                      {temoignage.titre}
                    </h3>
                    <span className="bg-purple-200 text-purple-800 text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap">
                      TDAH
                    </span>
                  </div>

                  {/* Contenu */}
                  <p className="text-gray-700 text-sm mb-6 flex-grow leading-relaxed">
                    {temoignage.contenu.substring(0, 150)}...
                  </p>

                  {/* Footer avec likes et bouton */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <span className="text-red-500 text-xl">❤️</span>
                      <span className="text-sm font-medium text-gray-600">
                        12
                      </span>
                    </div>
                    <button className="bg-teal-700 hover:bg-teal-800 text-white text-sm font-medium px-6 py-2 rounded-lg transition-colors">
                      Lire la suite
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
        </div>
        {/* La vague SVG en bas */}
        <div
          className="absolute bottom-0 left-0 w-full bg-gradient-to-r from-white via-white to-blue-100  overflow-hidden leading-none"
          style={{ lineHeight: 0 }}
        >
          <svg
            className="relative block w-full h-24"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              fill="#015635"
            ></path>
          </svg>
        </div>
      </section>

      {/* Section Besoin d'aide Immédiate */}
      <section className="bg-gradient-to-r from-white via-white to-blue-100 px-6 py-16">
        <div className="max-w-6xl mx-auto text-center mb-40">
          <h2 className="text-4xl font-serif mb-4">
            Besoin d'aide Immédiate ?
          </h2>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20">
          <div className=" rounded-3xl p-8 border-2 border-black shadow-lg text-center">
            <div className="bg-transparent">
              <img
                src="/doctor.png"
                alt="Doctor"
                className="w-45 h-60 mx-auto mt-[-160px] mb-2 shadow-neutral-400 "
              />
            </div>
            <h3 className="font-serif text-2xl font-bold mb-4">
              Consulter un Professionnel
            </h3>
            <p className="text-gray-700 text-base leading-relaxed mb-6">
              Vous souhaitez parler à un psychologue ou psychiatre ? Trouvez un
              spécialiste près de vous
            </p>
            <button
              onClick={() => navigate("/professionals")}
              className="bg-[#015635] text-white px-6 py-3 rounded-full font-semibold hover:bg-green-700 transition"
            >
              Voir l'Annuaire
            </button>
          </div>

          <div className=" rounded-3xl p-8 border-4 border-red-500 shadow-lg text-center">
            <div className="mb-6">
              <img
                src="/sos_button.png"
                alt="SOS Button"
                className="w-60 h-auto mx-auto mt-[-140px]"
              />
            </div>
            <h3 className="font-serif text-2xl font-bold mb-4 text-red-600">
              Urgence / SOS
            </h3>
            <p className="text-gray-700 text-base leading-relaxed mb-6">
              Vous êtes en détresse ou avez besoin d'aide immédiate ? Accédez
              aux numéros d'urgence 24h/24.
            </p>
            <button
              onClick={() => navigate("/urgence")}
              className="bg-red-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-red-700 transition"
            >
              Numéros
            </button>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-white to-blue-100">
        <Footer />
      </section>
    </div>
  );
};

export default Homepage;
