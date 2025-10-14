import React from 'react';
import { Shield, Mail, Users, Database, Server, ArrowUpRight, ShieldCheck, UserCheck } from 'lucide-react';
import { Header } from './Header';

const Confidentialite: React.FC = () => {
  const developpeurs = [
    {
      nom: "Ndeye Binta BADIANE",
      telephone: "+221 78 016 64 06",
      email: "binetabadiane6@gmail.com"
    },
    {
      nom: "Safiétou DIANGAR",
      telephone: "774833965",
      email: "safietoudiangarecfpt@gmail.com"
    }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollToTopBtn = document.querySelector('[aria-label="Retour en haut de la page"]');
      if (scrollToTopBtn) {
        if (scrollTop > 300) {
          scrollToTopBtn.classList.remove('opacity-0', 'invisible');
          scrollToTopBtn.classList.add('opacity-100', 'visible');
        } else {
          scrollToTopBtn.classList.remove('opacity-100', 'visible');
          scrollToTopBtn.classList.add('opacity-0', 'invisible');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
      <Header />  
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Section Développeurs */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
        <div className="bg-gradient-to-r from-green-600 to-emerald-800 p-6 text-white">
          <div className="flex items-center space-x-3">
            <UserCheck className="h-8 w-8 text-green-100" />
            <h2 className="text-2xl font-bold">Équipe de Développement</h2>
          </div>
          <p className="text-green-100 mt-2">Contactez-nous pour toute question relative à la confidentialité</p>
        </div>
        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            {developpeurs.map((dev, index) => (
              <div key={index} className="bg-gray-50 p-5 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">{dev.nom}</h3>
                <div className="flex items-center text-gray-600 mb-2">
                  <Mail className="h-4 w-4 mr-2 text-green-600" />
                  <a href={`mailto:${dev.email}`} className="hover:underline">{dev.email}</a>
                </div>
                <div className="flex items-center text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <a href={`tel:${dev.telephone.replace(/\s+/g, '')}`} className="hover:underline">{dev.telephone}</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* En-tête avec dégradé */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-800 p-8 text-white">
          <div className="flex items-center space-x-4">
            <ShieldCheck className="h-10 w-10 text-blue-100" />
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">Politique de Confidentialité</h1>
              <p className="text-blue-100 mt-2">Comment nous protégeons et gérons vos données personnelles</p>
            </div>
          </div>
        </div>

        <div className="p-8">
          {/* Section Introduction */}
          <section className="mb-12 group">
            <div className="flex items-start mb-4">
              <div className="bg-blue-100 p-3 rounded-lg mr-4 group-hover:bg-blue-200 transition-colors">
                <Shield className="h-6 w-6 text-blue-700" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                  1. Introduction
                  <ArrowUpRight className="ml-2 h-5 w-5 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h2>
                <div className="mt-4 text-gray-700">
                  <p>
                    La présente politique de confidentialité définit et vous informe de la manière dont WaxPsy utilise et protège les informations que vous nous transmettez lors de votre visite sur notre site web.
                  </p>
                  <p className="mt-3 text-gray-600">
                    Nous nous engageons à assurer que votre vie privée est protégée. Si nous vous demandons de fournir certaines informations par lesquelles vous pouvez être identifié lors de l'utilisation de ce site web, vous pouvez être assuré qu'elles ne seront utilisées que conformément à la présente déclaration de confidentialité.
                  </p>
                </div>
              </div>
            </div>
          </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Introduction</h2>
        <p className="text-gray-700 mb-4">
          La présente politique de confidentialité définit et vous informe de la manière dont WaxPsy utilise et protège les informations que vous nous transmettez lors de votre visite sur notre site web.
        </p>
      </section>

          <section className="mb-12 group">
            <div className="flex items-start mb-4">
              <div className="bg-indigo-100 p-3 rounded-lg mr-4 group-hover:bg-indigo-200 transition-colors">
                <Database className="h-6 w-6 text-indigo-700" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                  2. Données personnelles collectées
                  <ArrowUpRight className="ml-2 h-5 w-5 text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h2>
                <div className="mt-4">
                  <p className="text-gray-700 mb-4">
                    Nous pouvons collecter et traiter les catégories de données suivantes :
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center mb-3">
                        <div className="bg-indigo-100 p-2 rounded-lg mr-3">
                          <Users className="h-5 w-5 text-indigo-600" />
                        </div>
                        <h3 className="font-semibold text-gray-800">Données d'identification</h3>
                      </div>
                      <ul className="space-y-2 text-gray-600">
                        <li className="flex items-start">
                          <span className="text-indigo-500 mr-2">•</span>
                          <span>Nom et prénom</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-indigo-500 mr-2">•</span>
                          <span>Adresse e-mail</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-indigo-500 mr-2">•</span>
                          <span>Numéro de téléphone</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center mb-3">
                        <div className="bg-blue-100 p-2 rounded-lg mr-3">
                          <Server className="h-5 w-5 text-blue-600" />
                        </div>
                        <h3 className="font-semibold text-gray-800">Données techniques</h3>
                      </div>
                      <ul className="space-y-2 text-gray-600">
                        <li className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span>
                          <span>Adresse IP</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span>
                          <span>Type et version du navigateur</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span>
                          <span>Pages visitées et durée de visite</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-yellow-700">
                          Nous ne collectons que les données strictement nécessaires et avec votre consentement explicite lorsque requis par la loi.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12 group">
            <div className="flex items-start mb-4">
              <div className="bg-purple-100 p-3 rounded-lg mr-4 group-hover:bg-purple-200 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                  3. Utilisation de vos données
                  <ArrowUpRight className="ml-2 h-5 w-5 text-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h2>
                <div className="mt-4">
                  <p className="text-gray-700 mb-6">
                    Nous utilisons vos données personnelles pour vous fournir un service de qualité et améliorer continuellement votre expérience. Voici comment nous les utilisons :
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    {[
                      {
                        icon: (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        ),
                        title: "Service client",
                        description: "Répondre à vos demandes et vous fournir un support personnalisé."
                      },
                      {
                        icon: (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        ),
                        title: "Amélioration continue",
                        description: "Analyser l'utilisation du site pour améliorer nos services."
                      },
                      {
                        icon: (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2z" />
                          </svg>
                        ),
                        title: "Communication",
                        description: "Vous envoyer des mises à jour et des informations importantes."
                      },
                      {
                        icon: (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        ),
                        title: "Personnalisation",
                        description: "Adapter le contenu selon vos préférences et centres d'intérêt."
                      }
                    ].map((item, index) => (
                      <div key={index} className="bg-white p-5 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-start">
                          <div className="p-2 rounded-lg bg-opacity-20 mr-4" style={{ backgroundColor: `${item.icon.props.className.includes('text-green-600') ? 'rgba(5, 150, 105, 0.1)' : 
                                                                                               item.icon.props.className.includes('text-blue-600') ? 'rgba(37, 99, 235, 0.1)' :
                                                                                               item.icon.props.className.includes('text-purple-600') ? 'rgba(124, 58, 237, 0.1)' :
                                                                                               'rgba(217, 119, 6, 0.1)'}` }}>
                            {item.icon}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-800">{item.title}</h3>
                            <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h.01a1 1 0 100-2H10V9z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-blue-700">
                          Nous ne vendons, n'échangeons ni ne transférons vos informations personnelles à des tiers sans votre consentement, sauf pour répondre à des obligations légales.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

      <section className="mb-12 group">
        <div className="flex items-start mb-4">
          <div className="bg-red-100 p-3 rounded-lg mr-4 group-hover:bg-red-200 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              4. Sécurité de vos données
              <ArrowUpRight className="ml-2 h-5 w-5 text-red-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            </h2>
            <div className="mt-4">
              <p className="text-gray-700 mb-6">
                La sécurité de vos données personnelles est notre priorité absolue. Nous avons mis en place des mesures de sécurité techniques et organisationnelles robustes pour protéger vos informations contre tout accès non autorisé, modification, divulgation ou destruction.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {/* Carte 1 : Chiffrement */}
                <div className="bg-white p-6 rounded-xl border border-gray-100 hover:shadow-lg transition-all transform hover:-translate-y-1">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 text-red-600 mb-4 mx-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-center text-gray-800 mb-2">Chiffrement SSL/TLS</h3>
                  <p className="text-sm text-gray-600 text-center">
                    Toutes les données transmises entre votre navigateur et nos serveurs sont chiffrées avec des protocoles de sécurité avancés.
                  </p>
                </div>

                {/* Carte 2 : Protection des données */}
                <div className="bg-white p-6 rounded-xl border border-gray-100 hover:shadow-lg transition-all transform hover:-translate-y-1">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 mb-4 mx-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-center text-gray-800 mb-2">Protection avancée</h3>
                  <p className="text-sm text-gray-600 text-center">
                    Nous utilisons des pare-feu et des systèmes de détection d'intrusion pour protéger nos systèmes contre les accès non autorisés.
                  </p>
                </div>

                {/* Carte 3 : Accès sécurisé */}
                <div className="bg-white p-6 rounded-xl border border-gray-100 hover:shadow-lg transition-all transform hover:-translate-y-1">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-600 mb-4 mx-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-center text-gray-800 mb-2">Accès restreint</h3>
                  <p className="text-sm text-gray-600 text-center">
                    Seul le personnel autorisé ayant besoin d'accéder à vos données pour fournir nos services peut y accéder.
                  </p>
                </div>
              </div>

              <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-amber-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-amber-700">
                      <span className="font-medium">Conseil de sécurité :</span> Bien que nous mettions tout en œuvre pour protéger vos données, aucune méthode de transmission sur Internet n'est sécurisée à 100%. Nous vous recommandons de ne jamais partager vos identifiants et de choisir des mots de passe complexes.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-5 bg-gray-50 rounded-lg border border-gray-200">
                <h4 className="font-medium text-gray-800 mb-3 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Que faire en cas de violation de données ?
                </h4>
                <p className="text-sm text-gray-600">
                  En cas de violation de données susceptible d'engendrer un risque élevé pour vos droits et libertés, nous nous engageons à vous en informer dans les meilleurs délais, ainsi que les autorités compétentes, conformément aux exigences légales en vigueur.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12 group">
        <div className="flex items-start mb-4">
          <div className="bg-amber-100 p-3 rounded-lg mr-4 group-hover:bg-amber-200 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              5. Politique relative aux cookies
              <ArrowUpRight className="ml-2 h-5 w-5 text-amber-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            </h2>
            <div className="mt-4">
              <p className="text-gray-700 mb-6">
                Les cookies sont de petits fichiers texte stockés sur votre appareil lorsque vous visitez notre site web. Ils nous aident à améliorer votre expérience en mémorisant vos préférences et en analysant l'utilisation du site.
              </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Types de cookies */}
            <div className="bg-white p-6 rounded-xl border border-gray-100 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Types de cookies utilisés
              </h3>
              <ul className="space-y-3">
                {[
                  {
                    name: "Cookies essentiels",
                    description: "Nécessaires au bon fonctionnement du site (ex: connexion sécurisée)",
                    icon: "🔒"
                  },
                  {
                    name: "Cookies de préférences",
                    description: "Mémorisent vos choix (langue, paramètres d'affichage)",
                    icon: "⚙️"
                  },
                  {
                    name: "Cookies statistiques",
                    description: "Nous aident à comprendre comment vous utilisez notre site",
                    icon: "📊"
                  },
                  {
                    name: "Cookies marketing",
                    description: "Utilisés pour personnaliser les publicités",
                    icon: "📢"
                  }
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-xl mr-3 mt-0.5">{item.icon}</span>
                    <div>
                      <span className="font-medium text-gray-800">{item.name}</span>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Gestion des cookies */}
            <div className="bg-white p-6 rounded-xl border border-gray-100 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Gestion de vos préférences
              </h3>
              <p className="text-gray-700 mb-4">
                Vous pouvez contrôler et/ou supprimer les cookies comme vous le souhaitez. Vous pouvez supprimer tous les cookies déjà sur votre ordinateur et configurer la plupart des navigateurs pour les empêcher d'être enregistrés.
              </p>
              
              <div className="bg-blue-50 p-4 rounded-lg mb-4">
                <h4 className="font-medium text-blue-800 mb-2 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Comment gérer les cookies ?
                </h4>
                <ul className="list-disc pl-5 text-sm text-blue-700 space-y-1">
                  <li>Dans les paramètres de votre navigateur</li>
                  <li>Via notre bannière de consentement aux cookies</li>
                  <li>En utilisant des outils tiers de gestion des cookies</li>
                </ul>
              </div>

              <button className="w-full bg-amber-100 hover:bg-amber-200 text-amber-800 font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Gérer mes préférences de cookies
              </button>
            </div>
          </div>

          <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h.01a1 1 0 100-2H10V9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-600">
                  En utilisant notre site, vous acceptez notre utilisation des cookies conformément à notre politique de confidentialité. Vous pouvez modifier vos paramètres de cookies à tout moment via les paramètres de votre navigateur ou via notre bannière de consentement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

      <section className="mb-12 group">
        <div className="flex items-start mb-4">
          <div className="bg-indigo-100 p-3 rounded-lg mr-4 group-hover:bg-indigo-200 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              6. Liens vers d'autres sites
              <ArrowUpRight className="ml-2 h-5 w-5 text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            </h2>
            <div className="mt-4">
              <p className="text-gray-700 mb-6">
                Notre site web peut contenir des liens vers des sites externes qui pourraient vous intéresser. Cependant, il est important de noter que ces sites ne sont pas sous notre contrôle.
              </p>

              <div className="bg-indigo-50 border-l-4 border-indigo-400 p-4 rounded-r-lg mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-indigo-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h.01a1 1 0 100-2H10V9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-indigo-700">
                      <span className="font-medium">Important :</span> Lorsque vous quittez notre site via ces liens, nous ne sommes plus responsables de la protection et de la confidentialité des informations que vous fournissez. Veuillez consulter la politique de confidentialité du site en question avant de partager des informations personnelles.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white p-5 rounded-xl border border-gray-100">
                  <h3 className="font-medium text-gray-800 mb-3 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Sites tiers
                  </h3>
                  <p className="text-sm text-gray-600">
                    Nous ne contrôlons pas le contenu ou les pratiques de confidentialité des sites tiers. Nous vous recommandons de lire attentivement leur politique de confidentialité avant de partager des informations personnelles.
                  </p>
                </div>
                <div className="bg-white p-5 rounded-xl border border-gray-100">
                  <h3 className="font-medium text-gray-800 mb-3 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Sécurité des liens
                  </h3>
                  <p className="text-sm text-gray-600">
                    Nous nous efforçons de ne fournir que des liens vers des sites de confiance. Cependant, veuillez noter que nous ne pouvons pas garantir la sécurité de ces sites externes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12 group">
        <div className="flex items-start mb-4">
          <div className="bg-green-100 p-3 rounded-lg mr-4 group-hover:bg-green-200 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              7. Contrôle de vos données personnelles
              <ArrowUpRight className="ml-2 h-5 w-5 text-green-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            </h2>
            <div className="mt-4">
              <p className="text-gray-700 mb-6">
                Vous avez des droits concernant vos données personnelles. Voici comment vous pouvez les exercer :
              </p>

              <div className="bg-white rounded-xl border border-gray-100 overflow-hidden mb-6">
                <div className="bg-gray-50 px-6 py-3 border-b border-gray-100">
                  <h3 className="font-medium text-gray-800">Vos droits RGPD</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {[
                      {
                        title: "Droit d'accès",
                        description: "Obtenir une copie de vos données personnelles",
                        icon: "🔍"
                      },
                      {
                        title: "Droit de rectification",
                        description: "Faire corriger des informations inexactes",
                        icon: "✏️"
                      },
                      {
                        title: "Droit à l'oubli",
                        description: "Demander la suppression de vos données",
                        icon: "🗑️"
                      },
                      {
                        title: "Droit d'opposition",
                        description: "Vous opposer au traitement de vos données",
                        icon: "✋"
                      },
                      {
                        title: "Portabilité des données",
                        description: "Obtenir vos données dans un format lisible",
                        icon: "📤"
                      }
                    ].map((right, index) => (
                      <div key={index} className="flex items-start p-3 hover:bg-gray-50 rounded-lg transition-colors">
                        <span className="text-2xl mr-3 mt-0.5">{right.icon}</span>
                        <div>
                          <h4 className="font-medium text-gray-800">{right.title}</h4>
                          <p className="text-sm text-gray-600">{right.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h.01a1 1 0 100-2H10V9z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-blue-700">
                          Pour exercer l'un de ces droits, veuillez nous contacter à l'adresse <a href="mailto:donnees@waxpsy.ch" className="text-blue-600 hover:underline font-medium">donnees@waxpsy.ch</a>. Nous traiterons votre demande dans les meilleurs délais, généralement sous 30 jours.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-800">Engagement de confidentialité</h3>
                    <div className="mt-1 text-sm text-green-700">
                      <p>Nous nous engageons à ne pas vendre, louer ou échanger vos données personnelles avec des tiers à des fins de marketing sans votre consentement explicite. Toutes les informations que vous nous fournissez sont stockées sur des serveurs sécurisés et traitées conformément au RGPD.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Contact */}
      <section className="mb-12 group">
        <div className="flex items-start mb-4">
          <div className="bg-purple-100 p-3 rounded-lg mr-4 group-hover:bg-purple-200 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              8. Contact et questions
              <ArrowUpRight className="ml-2 h-5 w-5 text-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            </h2>
            <div className="mt-4">
              <p className="text-gray-700 mb-6">
                Nous accordons une grande importance à vos questions et commentaires concernant notre politique de confidentialité. Notre équipe est à votre disposition pour toute demande d'information ou d'assistance.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl border border-gray-100 hover:shadow-lg transition-shadow">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Contact rapide
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2z" />
                      </svg>
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <a href="mailto:contact@waxpsy.ch" className="text-purple-600 hover:underline font-medium">contact@waxpsy.ch</a>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <div>
                        <p className="text-sm text-gray-500">Adresse</p>
                        <p className="text-gray-700">[Adresse complète]</p>
                        <p className="text-gray-700">[Code postal] [Ville], Suisse</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-100 hover:shadow-lg transition-shadow">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Questions fréquentes
                  </h3>
                  <div className="space-y-3">
                    {[
                      "Comment exercer mes droits RGPD ?",
                      "Combien de temps conservez-vous mes données ?",
                      "Puis-je refuser les cookies ?"
                    ].map((question, index) => (
                      <div key={index} className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-200 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        <p className="text-gray-700">{question}</p>
                      </div>
                    ))}
                    <div className="pt-2">
                      <a href="/faq" className="text-purple-600 hover:underline text-sm font-medium flex items-center">
                        Voir toutes les questions
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 border-l-4 border-purple-400 p-4 rounded-r-lg">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-purple-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h.01a1 1 0 100-2H10V9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-purple-700">
                      Nous nous engageons à vous répondre dans les plus brefs délais, généralement sous 48 heures ouvrées. Pour les demandes concernant vos données personnelles, nous traiterons votre demande dans un délai maximum de 30 jours à compter de sa réception.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pied de page avec date de mise à jour */}
      <div className="mt-16 pt-8 border-t border-gray-200">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-500 mb-4 md:mb-0">
            Dernière mise à jour : <span className="font-medium">1er janvier 2023</span>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-sm text-purple-600 hover:underline">Version imprimable</a>
            <span className="text-gray-300">|</span>
            <a href="#" className="text-sm text-purple-600 hover:underline">Télécharger en PDF</a>
          </div>
        </div>
      </div>

      {/* Bouton de retour en haut */}
      <button 
        onClick={scrollToTop}
        aria-label="Retour en haut de la page"
        className="fixed bottom-8 right-8 bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-full shadow-lg opacity-0 invisible transition-all duration-300 transform hover:scale-110"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Confidentialite;
