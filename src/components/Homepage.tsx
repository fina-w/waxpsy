import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";
import type { Trouble, Temoignage } from "../types/types";
import { Header } from "./Header";
import Footer from "./footer";
import { TroublesCarouselSkeleton, TemoignagesCarouselSkeleton } from "./skeletons";
import { useAuthStore } from "../stores/authStore";

const Homepage: React.FC = () => {
  const navigate = useNavigate();
  const [troubles, setTroubles] = useState<Trouble[]>([]);
  const [temoignages, setTemoignages] = useState<Temoignage[]>([]);
  const [faqs, setFaqs] = useState<Array<{id: string, question: string, reponse: string}>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentTroubleIndex, setCurrentTroubleIndex] = useState(0);
  const [currentTemoignageIndex, setCurrentTemoignageIndex] = useState(0);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const nextTroubles = useCallback(() => {
    setCurrentTroubleIndex((prev) =>
      prev + 3 >= troubles.length ? 0 : prev + 3
    );
  }, [troubles.length]);

  const prevTroubles = useCallback(() => {
    setCurrentTroubleIndex((prev) =>
      prev - 3 < 0 ? Math.max(0, troubles.length - 3) : prev - 3
    );
  }, [troubles.length]);

  // Gestion du redimensionnement de l'écran
  useEffect(() => {
    const handleResize = () => {
      // Forcer un recalcul des index lors du redimensionnement
      if (window.innerWidth < 768) {
        setCurrentTroubleIndex(0);
        setCurrentTemoignageIndex(0);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Pour les témoignages
  const nextTemoignages = useCallback(() => {
    const itemsToShow = window.innerWidth < 768 ? 1 : 3;
    setCurrentTemoignageIndex((prev) =>
      prev + itemsToShow >= temoignages.length ? 0 : prev + itemsToShow
    );
  }, [temoignages.length]);

  const prevTemoignages = useCallback(() => {
    const itemsToShow = window.innerWidth < 768 ? 1 : 3;
    setCurrentTemoignageIndex((prev) =>
      prev - itemsToShow < 0 ? Math.max(0, temoignages.length - itemsToShow) : prev - itemsToShow
    );
  }, [temoignages.length]);

  useEffect(() => {
    console.log("Current user in Homepage:", isAuthenticated);
    const fetchData = async () => {
      try {
        setLoading(true);
        const [troublesRes, temoignagesRes, faqsRes] = await Promise.all([
          fetch(`${API_BASE_URL}/troubles`),
          fetch(`${API_BASE_URL}/temoignages`),
          fetch(`${API_BASE_URL}/faq`)
        ]);

        if (!troublesRes.ok || !temoignagesRes.ok || !faqsRes.ok) {
          throw new Error('Erreur lors du chargement des données');
        }

        const [troublesData, temoignagesData, faqsData] = await Promise.all([
          troublesRes.json(),
          temoignagesRes.json(),
          faqsRes.json()
        ]);

        setTroubles(troublesData);
        setTemoignages(temoignagesData);
        setFaqs(faqsData);
        setError(null);
      } catch (err) {
        console.error("Erreur lors du chargement des données:", err);
        setError("Une erreur est survenue lors du chargement des données. Veuillez réessayer plus tard.");
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
  }, [troubles.length, currentTroubleIndex, nextTroubles]);

  // Auto-scroll pour les témoignages (toutes les 5 secondes)
  useEffect(() => {
    if (temoignages.length > 3) {
      const interval = setInterval(() => {
        nextTemoignages();
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [temoignages.length, currentTemoignageIndex, nextTemoignages]);



  const handleTroubleClick = (id: string) => {
    navigate(`/troubles/${id}`);
  };

  const handleProfessionalsClick = () => {
    navigate('/professionals');
  };

  const handleTemoignagesClick = () => {
    navigate('/temoignages');
  };

  const handleUrgenceClick = () => {
    navigate('/urgences');
  };

  // Suppression du loading global - on affiche la page avec des skeletons partiels

  return (
    <div className="min-h-screen flex flex-col w-full bg-gradient-to-r from-white via-white to-blue-100">
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
          <h1 className="text-4xl sm:text-2xl md:text-5xl font-serif font-bold mb-6 tracking-wide">
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
          loading="lazy"
          className="w-70 h-auto"
        />
        <div className="max-w-xl">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            C'est quoi Waxpsy ?
          </h2>
          <p className="text-gray-700 max-w-3xl mx-auto text-lg mb-8">
            Waxpsy est une plateforme sénégalaise dédiée à la sensibilisation et à l'information sur la santé mentale. Notre mission est de briser les tabous et d'offrir un espace sûr pour parler ouvertement de santé mentale au Sénégal.
          </p>
        </div>
      </section>

      {/* Section Découvrez - DYNAMIQUE */}
      {loading || troubles.length === 0 ? (
        <TroublesCarouselSkeleton />
      ) : (
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
                .slice(
                  currentTroubleIndex,
                  window.innerWidth < 768 ? currentTroubleIndex + 1 : currentTroubleIndex + 3
                )
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
                        loading="lazy"
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
      )}

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
            <h2 className="text-3xl font-serif text-white mb-12 mt-10">
              Pour mieux comprendres les troubles mentaux,Explorez
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="border-2 border-black rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-shadow">
                <div className="mb-6">
                  <img
                    src="/histoires.png"
                    alt="Story Book"
                    loading="lazy"
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

              <div
                className="border-2 border-black rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-shadow cursor-pointer"
                onClick={() => navigate('/quizpage')}
              >
                <div className="mb-6">
                  <img
                    src="/quiz.png"
                    alt="Quiz"
                    loading="lazy"
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
        {loading || temoignages.length === 0 ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <TemoignagesCarouselSkeleton />
          </div>
        ) : (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-white">
                Quelques Témoignages
              </h2>
              <button onClick={handleTemoignagesClick} className="text-white font-medium hover:opacity-80 transition-opacity flex items-center gap-2">
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
                .slice(
                  currentTemoignageIndex,
                  window.innerWidth < 768 ? currentTemoignageIndex + 1 : currentTemoignageIndex + 3
                )
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
        )}
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

      {/* Section Statistiques */}
      <section className="mt-12">
        {/* Section Statistiques */}
          <div className="max-w-5xl mx-auto bg-transparent p-8 md:p-12 rounded-xl shadow-lg">
            <div className="text-center mb-10">
              <h3 className="text-3xl font-bold text-gray-800 mb-4">
                La Santé Mentale en Chiffres au Sénégal
              </h3>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Ces chiffres, bien que préoccupants, ne reflètent qu'une partie de la réalité. 
                Beaucoup de cas ne sont pas déclarés en raison de la stigmatisation et du manque d'accès aux soins.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Carte Statistique 1 */}
              <div className="bg-green-50 p-6 rounded-lg border-2 border-[#015635] hover:shadow-md transition-shadow">
                <div className="text-4xl font-bold text-center text-[#015635] mb-2">9.4%</div>
                <p className="text-gray-700">des Sénégalais présentent un risque suicidaire</p>
              </div>
              
              {/* Carte Statistique 2 */}
              <div className="bg-green-50 p-6 rounded-lg border-2 border-[#015635] hover:shadow-md transition-shadow">
                <div className="text-4xl font-bold text-center text-[#015635] mb-2">1.5%</div>
                <p className="text-gray-700">de la population souffre de dépression sévère</p>
              </div>
              
              {/* Carte Statistique 3 */}
              <div className="bg-green-50 p-6 rounded-lg border-2 border-[#015635] hover:shadow-md transition-shadow">
                <div className="text-4xl font-bold text-center text-[#015635] mb-2">3.7%</div>
                <p className="text-gray-700">de la population est atteinte d'épilepsie</p>
              </div>
              
              {/* Carte Statistique 4 */}
              <div className="bg-green-50 p-6 rounded-lg border-2 border-[#015635] hover:shadow-md transition-shadow">
                <div className="text-4xl font-bold text-center text-[#015635] mb-2">0.7%</div>
                <p className="text-gray-700">de consommation de cannabis</p>
              </div>
              
              {/* Carte Statistique 5 */}
              <div className="bg-green-50 p-6 rounded-lg border-2 border-[#015635] hover:shadow-md transition-shadow">
                <div className="text-4xl font-bold text-center text-[#015635] mb-2">0.2%</div>
                <p className="text-gray-700">de consommation de cocaïne</p>
              </div>
              
              {/* Carte Témoignage */}
              <div className="bg-[#015635] p-6 rounded-lg flex flex-col justify-center hover:shadow-md transition-shadow">
                <p className="text-white italic text-center">
                  "Ces chiffres ne sont que la partie visible de l'iceberg. Beaucoup de nos proches souffrent en silence."
                </p>
              </div>
            </div>
            
            <p className="text-sm text-gray-500 text-center mt-8">
              Source : Enquête nationale sur la santé mentale au Sénégal (2023)
            </p>
          </div>
      </section>

      {/* Section Besoin d'aide Immédiate */}
      <section className="bg-gradient-to-r from-white via-white to-blue-100 px-6 py-16">
        <div className="max-w-6xl mx-auto text-center mb-40">
          <h2 className="text-4xl font-serif mb-4">
            Besoin d'aide Immédiate ?
          </h2>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-40">
          <div className=" rounded-3xl p-8 border-2 border-black shadow-lg text-center">
            <div className="bg-transparent">
              <img
                src="/doctor.png"
                alt="Doctor"
                loading="lazy"
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
              onClick={handleProfessionalsClick}
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
                loading="lazy"
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
              onClick={handleUrgenceClick}
              className="bg-red-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-red-700 transition"
            >
              Numéros
            </button>
          </div>
        </div>
      </section>

      {/* Section FAQ */}
      <section className="py-12 ">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Questions fréquemment posées</h2>
          {loading ? (
            <div className="text-center">Chargement des questions...</div>
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : (
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="divide-y divide-gray-100">
                  {faqs.map((faq) => (
                    <details key={faq.id} className="group">
                      <summary className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50">
                        <span className="text-base font-medium text-gray-900">{faq.question}</span>
                        <span className="ml-2 text-[#015635] text-xl transition-transform duration-200 group-open:rotate-180">+</span>
                      </summary>
                      <div className="px-4 pb-4 pt-2 text-gray-600 bg-gray-50">
                        <p>{faq.reponse}</p>
                      </div>
                    </details>
                  ))}
                </div>
                <div className="p-6 text-center bg-gray-50 border-t border-gray-100">
                  <p className="text-gray-600 mb-4">Vous ne trouvez pas de réponse à votre question ?</p>
                  <button
                    onClick={() => navigate('/contact')}
                    className="bg-[#015635] text-white px-6 py-2 rounded-md hover:bg-[#014429] transition-colors"
                  >
                    Contactez-nous
                  </button>
                </div>
            </div>
          )}
        </div>
      </section>

      <section className="bg-gradient-to-r from-white via-white to-blue-100">
        <Footer />
      </section>

    </div>
  );
};

export default Homepage;
