import React from "react";
import { Header } from "./Header";
import { PhoneIcon, ExclamationTriangleIcon, ShieldExclamationIcon, HeartIcon, UserGroupIcon, ChatBubbleLeftRightIcon } from "@heroicons/react/24/solid";
import db from "../../db.json";
import Footer from "./footer";

const UrgenceSOS: React.FC = () => {
  const { ressourcesSOS } = db;

  const handleCall = (phoneNumber: string) => {
    window.location.href = `tel:${phoneNumber}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-white via-white to-blue-100">
      <Header />
      <main className="pt-20">
        {/* Bannière d'urgence */}
        <div className="bg-red-600 text-white py-4 px-4">
          <div className="container mx-auto flex items-center justify-center">
            <ExclamationTriangleIcon className="h-8 w-8 mr-2 text-white" />
            <h1 className="text-2xl md:text-3xl font-bold text-center">
              URGENCE - AIDE IMMÉDIATE DISPONIBLE
            </h1>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* En-tête */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8 border-l-4 border-red-500">
            <div className="flex items-center text-center flex-col mx-10">
              <div className="ml-4 flex flex-row">
                <div className="flex-shrink-0">
                <ShieldExclamationIcon className="h-10 w-10 text-red-600" />
              </div>
                <h1 className="text-2xl md:text-3xl font-bold text-red-700 mb-2">
                  Vous avez besoin d'aide immédiate ?
                </h1>
              </div>
              <p className="text-gray-700 text-lg">
                  Si vous ou un proche êtes en situation de détresse ou de danger immédiat, 
                  contactez immédiatement les services d'urgence. Vous n'êtes pas seul(e), 
                  de l'aide est disponible 24h/24.
              </p>
            </div>
          </div>
          </div>

        {/* Numéros d'urgence */}
        <section className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-red-700 mb-2">
              <PhoneIcon className="h-8 w-8 inline-block mr-2" />
              NUMÉROS D'URGENCE
            </h2>
            <p className="text-gray-600">Appelez immédiatement en cas de détresse ou de danger</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {ressourcesSOS.numerosUrgence.map((urgence, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl shadow-md overflow-hidden border-l-4 border-red-500 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-red-100 p-3 rounded-full">
                      <PhoneIcon className="h-6 w-6 text-red-600" />
                    </div>
                    <h3 className="ml-3 text-lg font-bold text-gray-900">{urgence.nom}</h3>
                  </div>
                  <p className="text-gray-700 mb-4">{urgence.description || 'Service d\'urgence disponible 24h/24'}</p>
                  <button
                    onClick={() => handleCall(urgence.numero.replace(/\s+/g, ''))}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center transition-colors duration-200"
                  >
                    <PhoneIcon className="h-5 w-5 mr-2" />
                    Appeler le {urgence.numero}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Centres spécialisés */}
        <section className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-[#015635] mb-2">
              <UserGroupIcon className="h-8 w-8 inline-block mr-2" />
              CENTRES DE CRISE ET SOUTIEN
            </h2>
            <p className="text-gray-600">Centres spécialisés en santé mentale et soutien psychologique</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {ressourcesSOS.centresCrise.map((centre, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl shadow-md overflow-hidden border-l-4 border-[#037147] hover:shadow-lg transition-shadow duration-300"
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <HeartIcon className="h-6 w-6 text-[#015635]" />
                    </div>
                    <h3 className="ml-3 text-lg font-bold text-gray-900">{centre.nom}</h3>
                  </div>
                  <div className="space-y-2 text-gray-700">
                    <p><span className="font-semibold">Adresse :</span> {centre.adresse}</p>
                    <p><span className="font-semibold">Téléphone :</span> {centre.telephone}</p>
                    <p><span className="font-semibold">Horaires :</span> {centre.horaires}</p>
                  </div>
                  <button
                    onClick={() => handleCall(centre.telephone.replace(/\s+/g, ''))}
                    className="mt-4 w-full bg-[#015635] hover:bg-[#013f27] text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center transition-colors duration-200 text-sm"
                  >
                    <PhoneIcon className="h-4 w-4 mr-2" />
                    Appeler ce centre
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Protocole et signes de crise */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
          {/* Protocole de crise */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden border-l-4 border-amber-500">
            <div className="bg-amber-100 px-6 py-4">
              <h2 className="text-xl font-bold text-amber-800">
                <ExclamationTriangleIcon className="h-6 w-6 inline-block mr-2" />
                QUE FAIRE EN CAS DE CRISE ?
              </h2>
            </div>
            <div className="p-6">
              <div className="prose max-w-none">
                {typeof ressourcesSOS.protocolesCrise === 'string' ? (
                  <p className="text-gray-700">{ressourcesSOS.protocolesCrise}</p>
                ) : (
                  <ul className="space-y-3">
                    {ressourcesSOS.protocolesCrise.map((etape, i) => (
                      <li key={i} className="flex items-start">
                        <span className="bg-amber-100 text-amber-700 font-bold rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1 mr-2">
                          {i + 1}
                        </span>
                        <span>{etape}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>

          {/* Signes de crise */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden border-l-4 border-red-500">
            <div className="bg-red-100 px-6 py-4">
              <h2 className="text-xl font-bold text-red-800">
                <ExclamationTriangleIcon className="h-6 w-6 inline-block mr-2" />
                SIGNES D'UNE CRISE
              </h2>
            </div>
            <div className="p-6">
              <ul className="space-y-3">
                {ressourcesSOS.signesCrise.map((signe, index) => (
                  <li key={index} className="flex items-start">
                    <span className="bg-red-100 text-red-600 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1 mr-2">
                      <ExclamationTriangleIcon className="h-3 w-3" />
                    </span>
                    <span className="texttext-[#015635]-gray-700">{signe}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Ressources supplémentaires */}
        <section className="bg-blue-50 rounded-xl p-8 max-w-5xl mx-auto mb-12 border border-blue-200">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold ">
              <ChatBubbleLeftRightIcon className="h-8 w-8 inline-block mr-2" />
              BESOIN DE PARLER ?
            </h2>
            <p className="text-[#015635]">Vous n'êtes pas seul(e). Des professionnels sont là pour vous écouter.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <PhoneIcon className="h-6 w-6 text-[#015635]" />
              </div>
              <h3 className="font-bold text-[#014129] mb-2">Lignes d'écoute</h3>
              <p className="text-sm text-gray-600">Des écoutants formés sont disponibles 24h/24 pour vous écouter.</p>
            </div>
            
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <UserGroupIcon className="h-6 w-6 text-[#015635]" />
              </div>
              <h3 className="font-bold text-[#014129] mb-2">Groupes de soutien</h3>
              <p className="text-sm text-gray-600">Rencontrez d'autres personnes qui vivent des situations similaires.</p>
            </div>
            
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <HeartIcon className="h-6 w-6 text-[#015635]" />
              </div>
              <h3 className="font-bold text-[#014129] mb-2">Accompagnement</h3>
              <p className="text-sm text-gray-600">Un suivi personnalisé pour vous aider à traverser cette épreuve.</p>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600 mb-4">
              N'hésitez pas à contacter un professionnel de santé si vous avez des questions ou des inquiétudes.
            </p>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-[#015635] hover:bg-[#015635] text-white font-bold py-2 px-6 rounded-full inline-flex items-center transition-colors duration-200"
            >
              <ArrowUpIcon className="h-4 w-4 mr-2" />
              Voir les numéros d'urgence
            </button>
          </div>
        </section>

        {/* Pied de page */}
        <Footer />
      </main>
    </div>
  );
};

// Composant pour l'icône de flèche vers le haut (ajoutez-le à la fin du fichier)
const ArrowUpIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 10l7-7m0 0l7 7m-7-7v18"
    />
  </svg>
);

export default UrgenceSOS;
