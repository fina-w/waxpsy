import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Troubles from './Troubles';
import Articles from './Articles';
import Temoignages from './Temoignages';
import ProfessionalsList from './ProfessionalsList';

const Homepage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const location = useLocation();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem('user'));

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(!!localStorage.getItem('user'));
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  useEffect(() => {
    if (location.state?.tab) {
      setActiveTab(location.state.tab);
    }
  }, [location.state]);

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
              Se connecter
            </button>
          </div>
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

            {/* About Section */}
            <section className="flex flex-col md:flex-row items-center bg-gradient-to-b from-white to-blue-100 px-6 py-12 space-y-8 md:space-y-0 md:space-x-12">
              <img
                src="/c-est-quoi-waxpsy.png"
                alt="C'est quoi WaxPsy"
                className="w-48 h-auto"
              />
              <div className="max-w-xl">
                <h2 className="text-3xl font-serif font-bold mb-4">C'est quoi WaxPsy ?</h2>
                <p className="text-lg leading-relaxed">
                  WaxPsy est une plateforme web sénégalaise dédiée à la sensibilisation aux troubles mentaux méconnus. Elle combine éducation, témoignages authentiques et histoires contextualisées pour démystifier ces troubles dans un contexte culturel africain, mais surtout sénégalais.
                </p>
              </div>
            </section>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen">
      <header className="troubles-header p-4 flex justify-between items-center shadow-md">
        <div className="flex items-center">
          <img
            src="/black-logo.png"
            alt="WaxPsy Logo"
            className="h-10 mr-4"
          />
        </div>
        <nav className="hidden md:flex space-x-4 text-sm">
          <a href="/" className="text-green-700 hover:text-green-900">Accueil</a>
          <a href="/troubles" className="text-green-700 hover:text-green-900">Troubles</a>
          <a href="/articles" className="text-green-700 hover:text-green-900">Articles</a>
          <a href="/temoignages" className="text-green-700 hover:text-green-900">Témoignages</a>
          <a href="/professionals" className="text-green-700 hover:text-green-900">Professionnels</a>
          <a href="/glossaire" className="text-green-700 hover:text-green-900">Glossaire</a>
          <a href="/apropos" className="text-green-700 hover:text-green-900">A propos</a>
          <a href="/contact" className="text-green-700 hover:text-green-900">Contact</a>
          <a href="/profil" className="text-green-700 hover:text-green-900">Profil</a>
        </nav>
      </header>
      {renderContent()}
    </div>
  );
};

export default Homepage;