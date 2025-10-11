// src/components/Footer.tsx

import React from 'react';

// Structure des données pour une maintenance facile
const footerSections = [
  {
    title: 'À Propos',
    links: ['Notre Mission', 'L’Équipe', 'Contact', 'Partenaires'],
  },
  {
    title: 'Contenus',
    links: ['Articles', 'Histoires', 'Quiz', 'Témoignages'],
  },
  {
    title: 'Aide & Support',
    links: ['🇨🇭 Urgence', 'Annuaire', 'FAQ', 'Nous Contacter'],
  },
  {
    title: 'Suivez-nous',
    links: ['Facebook', 'Instagram', 'Twitter', 'LinkedIn'],
  },
];

const Footer: React.FC = () => {
  return (
    <footer className="bg-green-800 text-white font-serif relative pt-20 pb-8">
      {/* La vague SVG en haut */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-[75px] " // Ajustez la hauteur de la vague
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-current text-brand-green bg-green-800"
          ></path>
        </svg>
      </div>

      {/* Contenu principal du footer */}
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          
          {/* Section Logo */}
          <div className="col-span-2 md:col-span-1 mb-6 md:mb-0">
            <img src="public/white-logo.png" alt="WaxPsy Logo" className="h-16 mb-4" />
            <p className="text-sm">Mental Health Awareness</p>
          </div>

          {/* Sections de liens générées dynamiquement */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-lg font-bold mb-4 underline decoration-2 underline-offset-4">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="hover:underline text-gray-200">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Ligne et mentions légales */}
        <hr className="my-8 border-gray-400" />
        <div className="text-center text-sm text-gray-300">
          <p>© 2025 WaxPsy - Tous droits réservés</p>
          <div className="mt-2 space-x-2">
            <a href="#" className="hover:underline">Mentions Légales</a>
            <span>|</span>
            <a href="#" className="hover:underline">Confidentialité</a>
            <span>|</span>
            <a href="#" className="hover:underline">Conditions d'Utilisation</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;