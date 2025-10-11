import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./footer.tsx";
import type { Trouble, Temoignage } from "../types/types";

const Homepage: React.FC = () => {
  const navigate = useNavigate();
  const [troubles, setTroubles] = useState<Trouble[]>([]);
  const [, setTemoignages] = useState<Temoignage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Récupération des troubles
        const troublesRes = await fetch("http://localhost:3000/troubles");
        if (!troublesRes.ok) throw new Error("Erreur lors du chargement des troubles");
        const troublesData = await troublesRes.json();
        
        // Récupération des témoignages approuvés
        const temoignagesRes = await fetch("http://localhost:3000/temoignages?statut=approuvé");
        if (!temoignagesRes.ok) throw new Error("Erreur lors du chargement des témoignages");
        const temoignagesData = await temoignagesRes.json();
        
        setTroubles(troublesData.slice(0, 3));
        setTemoignages(temoignagesData.slice(0, 3));
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


 /**  const getTroubleColor = (tag: string): string => {
    const colors: { [key: string]: string } = {
      "TDAH": "bg-purple-100 text-purple-800",
      "Anxiété": "bg-blue-100 text-blue-800",
      "Dépression": "bg-indigo-100 text-indigo-800",
      "Bipolaire": "bg-yellow-100 text-yellow-800",
      "Schizophrénie": "bg-red-100 text-red-800",
      "Autisme": "bg-green-100 text-green-800",
      "TOC": "bg-pink-100 text-pink-800",
      "default": "bg-gray-100 text-gray-800"
    };
    return colors[tag] || colors.default;
  };*/

  const handleTroubleClick = (id: string) => {
    navigate(`/troubles/${id}`);
  };

  /*const handleTemoignageClick = (id: string) => {
    navigate(`/temoignages/${id}`);
  };*/

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl font-serif">Chargement des données en cours...</div>
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
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-white to-blue-100">
      {/* Hero Section avec Header intégré */}
      <section
        className="relative bg-cover bg-center h-[600px] flex flex-col justify-center items-center text-white"
        style={{ backgroundImage: "url('/public/homepage-img.jpg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>

        {/* Header superposé */}
        <header className="absolute top-0 left-0 right-0 z-20 text-white flex items-center justify-between px-6 py-4">
          <img
            src="/public/black-logo.png"
            alt="WaxPsy Logo"
            className="h-15 w-50 brightness-0 invert"
          />
          <nav className="space-x-4 text-sm">
            <a href="/" className="underline hover:text-gray-300 transition">
              Accueil
            </a>
            <a href="/troubles" className="hover:text-gray-300 transition">
              Troubles
            </a>
            <a href="/articles" className="hover:text-gray-300 transition">
              Articles
            </a>
            <a href="/temoignages" className="hover:text-gray-300 transition">
              Témoignages
            </a>
            <a href="/glossaire" className="hover:text-gray-300 transition">
              Glossaire
            </a>
            <a href="/professionals" className="hover:text-green-300 transition">
              Professionnels
            </a>
            <a href="/apropos" className="hover:text-gray-300 transition">
              A propos
            </a>
            <a href="/contact" className="hover:text-gray-300 transition">
              Contact
            </a>
            <a href="/profil" className="hover:text-gray-300 transition">
              Profil
            </a>
          </nav>
        </header>

  const handleTabClick = (tab: string) => {
    if (!isAuthenticated) {
      navigate('/login', { state: { tab } });
    } else {
      setActiveTab(tab);
    }
  };

  const renderContent = () => {
    const protectedTabs = ['articles'];
    if (protectedTabs.includes(activeTab) && !isAuthenticated) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Accès restreint</h2>
            <p className="mb-4">Veuillez vous connecter pour accéder à cette section.</p>
            <button 
              onClick={() => navigate('/login', { state: { tab: activeTab } })}
              className="bg-green-800 text-white px-6 py-2 rounded-full hover:bg-green-900 transition"
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
      );
    }

    switch (activeTab) {
      case 'troubles':
        return <Troubles />;
      case 'articles':
        return <Articles />;
      case 'temoignages':
        return <Temoignages />;
      case 'professionals':
        return <ProfessionalsList />;
      default:
        return (
          <>
            {/* Hero Section */}
            <section
              className="relative bg-cover bg-center h-[600px] flex flex-col justify-center items-center text-white"
              style={{ backgroundImage: "url('/homepage-img.jpg')" }}
            >
              {/* Overlay sombre pour améliorer la lisibilité */}
              <div className="absolute inset-0 bg-black opacity-40"></div>

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

      {/* Section A propos */}
      <section className="flex flex-col justify-center items-center md:flex-row bg-gradient-to-r from-white to-blue-100 px-6 py-12 space-y-8 md:space-y-0 md:space-x-12">
        <img
          src="/public/c-est-quoi-waxpsy.png"
          alt="Green Ribbon"
          className="w-60 h-auto"
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
      <section className=" px-6 py-16 bg-gradient-to-r from-white to-blue-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-serif">Découvrez</h2>
            <a
              href="/troubles"
              className="text-green-700 font-semibold flex items-center hover:text-green-800 transition"
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {troubles.map((trouble) => (
              <div
                key={trouble.id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => handleTroubleClick(trouble.id)}
              >
                <div className="relative h-48">
                  <img
                    src={trouble.image}
                    alt={trouble.nom}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/public/tdah-card.jpg";
                    }}
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-xl font-semibold mb-2">
                    {trouble.nom}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-green-800 text-white px-6 py-16 relative">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h2 className="text-3xl font-serif mb-8">Pour mieux comprendre</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border-2 border-black rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-shadow">
              <div className="mb-6">
                <img
                  src="public/histoires.png"
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
                  src="public/quiz.png"
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
      </section>
      
      {/* Section Besoin d'aide Immédiate */}
      <section className="bg-gradient-to-r from-white to-blue-100 px-6 py-16">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-serif font-bold mb-4">
            Besoin d'aide Immédiate ?
          </h2>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className=" rounded-3xl p-8 border-2 border-black shadow-lg text-center">
            <div className="mb-6">
              <img
                src="public/doctor.png"
                alt="Doctor"
                className="w-35 h-40 mx-auto"
              />
            </div>
            <h3 className="font-serif text-2xl font-bold mb-4">
              Consulter un Professionnel
            </h3>
            <p className="text-gray-700 text-base leading-relaxed mb-6">
              Vous souhaitez parler à un psychologue ou psychiatre ? Trouvez un
              spécialiste près de vous
            </p>
            <button className="bg-green-800 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-700 transition">
              Voir l'Annuaire
            </button>
          </div>

          <div className=" rounded-3xl p-8 border-4 border-red-500 shadow-lg text-center">
            <div className="mb-6">
              <img
                src="public/sos_button.png"
                alt="SOS Button"
                className="w-32 h-32 mx-auto"
              />
            </div>
            <h3 className="font-serif text-2xl font-bold mb-4 text-red-600">
              Urgence / SOS
            </h3>
            <p className="text-gray-700 text-base leading-relaxed mb-6">
              Vous êtes en détresse ou avez besoin d'aide immédiate ? Accédez
              aux numéros d'urgence 24h/24.
            </p>
            <button className="bg-red-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-red-700 transition">
              Numéros
            </button>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-white to-blue-100">
        <Footer/>
      </section>
      
    </div>
  );
};

export default Homepage;