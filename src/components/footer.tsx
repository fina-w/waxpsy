// src/components/Footer.tsx

import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

// Structure des données pour une maintenance facile
const footerSections = [
  {
    title: 'À Propos',
    links: ['Notre Mission', 'L\'Équipe', 'Contact', 'Partenaires'],
  },
  {
    title: 'Contenus',
    links: ['Articles', 'Histoires', 'Quiz', 'Témoignages'],
  },
  {
    title: 'Aide & Support',
    links: ['SOS/Urgence', 'Annuaire', 'FAQ', 'Nous Contacter'],
  },
  {
    title: 'Suivez-nous',
    links: ['Facebook', 'Instagram', 'Twitter', 'LinkedIn'],
  },
];

const Footer: React.FC = () => {
  const renderSocialIcon = (platform: string) => {
    const baseClasses = "text-lg transition-colors duration-200";
    
    switch (platform) {
      case 'Facebook':
        return <FaFacebookF className={`${baseClasses} hover:text-blue-600`} />;
      case 'Twitter':
        return <FaTwitter className={`${baseClasses} hover:text-blue-400`} />;
      case 'Instagram':
        return <FaInstagram className={`${baseClasses} hover:text-pink-600`} />;
      case 'LinkedIn':
        return <FaLinkedinIn className={`${baseClasses} hover:text-blue-700`} />;
      default:
        return null;
    }
  };

  return (
    <footer className="bg-[#015635] text-white font-serif relative pt-16 sm:pt-20 pb-8">
      {/* Vague décorative en haut */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-16 sm:h-20 md:h-24"
        >
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="60%" style={{ stopColor: '#ffffff', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#dbeafe', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            fill="url(#waveGradient)"
          />
        </svg>
      </div>

      {/* Contenu principal du footer */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Première rangée : Logo + Liens */}
        <div className="flex flex-col lg:flex-row items-start">
          {/* Section Logo */}
          <div className="w-full lg:w-auto lg:flex-none mb-6 lg:mb-0 lg:mr-12">
            <div className="max-w-xs">
              <img 
                src="/white-logo.png" 
                alt="WaxPsy Logo" 
                className="h-14 sm:h-16 mb-3 mx-auto" 
              />
              <p className="text-xs sm:text-sm text-center text-gray-300">
                Plateforme de sensibilisation à la santé mentale
              </p>
            </div>
          </div>

          {/* Sections de liens */}
          <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {footerSections.map((section) => (
              <div key={section.title} className="text-center sm:text-left">
                <h3 className="text-sm sm:text-base font-bold mb-2 sm:mb-3 pb-1 border-b border-gray-600 inline-block">
                  {section.title}
                </h3>
                <ul className="space-y-1">
                  {section.links.map((link) => (
                    <li key={link}>
                      {section.title === 'Suivez-nous' ? (
                        <a 
                          href="#" 
                          className="text-gray-200 hover:text-white transition-colors flex items-center justify-center sm:justify-start"
                          aria-label={link}
                          title={link}
                        >
                          {renderSocialIcon(link)}
                          <span className="ml-2 hidden sm:inline text-sm">{link}</span>
                        </a>
                      ) : (
                        <a 
                          href="#" 
                          className="text-xs sm:text-sm text-gray-200 hover:text-white hover:underline transition-colors"
                        >
                          {link}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Deuxième rangée : Mentions légales */}
        <div className="mt-8">
          {/* Ligne de séparation */}
          <hr className="w-full my-6 sm:my-8 border-gray-600" />

          {/* Mentions légales */}
          <div className="w-full text-center">
            <p className="text-xs sm:text-sm text-gray-300 mb-3">
              &copy; {new Date().getFullYear()} WaxPsy - Tous droits réservés
            </p>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 text-xs sm:text-sm">
              {['Mentions Légales', 'Confidentialité', 'Conditions d\'Utilisation'].map((item) => (
                <React.Fragment key={item}>
                  <a 
                    href={`/${item.toLowerCase().replace(/\s+/g, '-').replace('\'', '')}`} 
                    className="text-gray-300 hover:text-white hover:underline transition-colors"
                  >
                    {item}
                  </a>
                  <span className="text-gray-500 last:hidden">•</span>
                </React.Fragment>
              ))}
            </div>
            
            {/* Bouton retour en haut */}
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="mt-6 text-xs text-gray-300 hover:text-white flex items-center justify-center mx-auto"
              aria-label="Retour en haut de la page"
            >
              <span className="mr-1">Haut de page</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
